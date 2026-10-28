"""
main.py — FastAPI backend for AI Plastic Defect Detection Dashboard
====================================================================

Endpoint
--------
POST /analyze
  - Accepts a multipart image upload (field: "file")
  - Runs YOLO11m inference on the image
  - Annotates the image with bounding boxes (saved to outputs/)
  - Generates a Grad-CAM heatmap overlay (saved to outputs/)
  - Queries the rule-based polymer expert system for each detected defect
  - Returns a JSON response consumed by the React dashboard

Static files
------------
GET /outputs/{filename}
  - Serves saved detection and Grad-CAM images to the frontend
"""

import os
import uuid
import time
import traceback
from pathlib import Path

import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, Response
from ultralytics import YOLO

from pydantic import BaseModel
from typing import Optional
from expert_system import get_defect_info
from part_validator import validate_plastic_part
from sarvam_service import (
    translate_with_sarvam,
    get_sarvam_api_key,
)

from contextlib import asynccontextmanager
from typing import Optional

# ── Paths & Storage ───────────────────────────────────────────────────────────
BASE_DIR        = Path(__file__).resolve().parent
OUTPUTS_DIR     = BASE_DIR / "outputs"
UPLOADS_DIR     = BASE_DIR / "uploads"

# Ensure all writable directories exist at startup
OUTPUTS_DIR.mkdir(parents=True, exist_ok=True)
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

# ── YOLO Model Path Resolution ────────────────────────────────────────────────
def find_model_path() -> Path:
    """
    Locates the YOLO11m weights file reliably relative to the backend directory,
    environment variables, or project root across different deployment configurations.
    """
    candidates = []

    # 1. Environment variable override
    env_override = os.getenv("YOLO_MODEL_PATH")
    if env_override:
        candidates.append(Path(env_override))
        candidates.append(BASE_DIR / env_override)

    # 2. Inside backend/models/ (e.g. Render with Root Directory set to 'backend')
    candidates.append(BASE_DIR / "models" / "yolo11m_targeted_best.pt")

    # 3. Inside repo root models/ (e.g. Render with Root Directory set to repo root)
    candidates.append(BASE_DIR.parent / "models" / "yolo11m_targeted_best.pt")

    # 4. Fallbacks relative to working directory
    candidates.append(Path("models/yolo11m_targeted_best.pt"))
    candidates.append(Path("backend/models/yolo11m_targeted_best.pt"))
    candidates.append(Path("yolo11m_targeted_best.pt"))

    for p in candidates:
        try:
            resolved = p.resolve()
            if resolved.is_file():
                return resolved
        except Exception:
            continue

    return (BASE_DIR / "models" / "yolo11m_targeted_best.pt").resolve()


# Module-level model references (safely loaded once in lifespan)
model: Optional[YOLO] = None
model_load_error: Optional[str] = None
model_resolved_path: Optional[str] = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global model, model_load_error, model_resolved_path

    # Ensure writable directories are available on Render's filesystem
    OUTPUTS_DIR.mkdir(parents=True, exist_ok=True)
    UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

    resolved_path = find_model_path()
    model_resolved_path = str(resolved_path)
    print(f"[Startup] Resolving YOLO model path: {resolved_path}")

    if not resolved_path.exists():
        model_load_error = (
            f"Model file not found at '{resolved_path}'. "
            "Ensure 'yolo11m_targeted_best.pt' is in 'models/' or 'backend/models/'."
        )
        print(f"[Startup ERROR] {model_load_error}")
    else:
        try:
            print(f"[Startup] Loading YOLO11m weights safely from: {resolved_path}")
            model = YOLO(str(resolved_path))
            print(f"[Startup] YOLO11m loaded successfully ({len(model.names)} defect classes registered).")
        except Exception as exc:
            model_load_error = f"Failed to initialize YOLO model: {exc}"
            print(f"[Startup ERROR] {model_load_error}")
            traceback.print_exc()

    yield
    print("[Shutdown] Cleaning up application resources.")


# ── FastAPI app ───────────────────────────────────────────────────────────────
app = FastAPI(
    title="GearDefect AI — Industrial Quality Assurance API",
    description=(
        "YOLO11m-based defect detection for injection-molded plastic gear surfaces. "
        "Returns bounding-box annotations, Grad-CAM heatmaps, and rule-based "
        "process correction recommendations."
    ),
    version="1.0.0",
    lifespan=lifespan,
)

# ── CORS Configuration ────────────────────────────────────────────────────────
# Allow the deployed Vercel frontend origin and local development origins
default_local_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
]

env_frontend_origin = os.getenv("FRONTEND_ORIGIN", "").strip()
env_allowed_origins = os.getenv("ALLOWED_ORIGINS", "").strip()

raw_origins = []
if env_frontend_origin:
    raw_origins.extend([o.strip() for o in env_frontend_origin.split(",") if o.strip()])
if env_allowed_origins:
    raw_origins.extend([o.strip() for o in env_allowed_origins.split(",") if o.strip()])

if "*" in raw_origins:
    cors_origins = ["*"]
    cors_credentials = False
else:
    # Normalize origins (strip trailing slashes) and include local development
    cleaned_origins = [o.rstrip("/") for o in raw_origins]
    cors_origins = list(dict.fromkeys(default_local_origins + cleaned_origins))
    cors_credentials = True

# Allow all Vercel deployment preview domains (*.vercel.app) automatically unless wildcard is active
cors_regex = os.getenv("CORS_ORIGIN_REGEX", r"^https:\/\/.*\.vercel\.app$") if not ("*" in cors_origins) else None

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_origin_regex=cors_regex,
    allow_credentials=cors_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Serve output images statically
app.mount("/outputs", StaticFiles(directory=str(OUTPUTS_DIR)), name="outputs")


def compute_box_overlap(r1, r2):
    x1 = max(r1[0], r2[0])
    y1 = max(r1[1], r2[1])
    x2 = min(r1[2], r2[2])
    y2 = min(r1[3], r2[3])
    if x2 <= x1 or y2 <= y1:
        return 0
    return (x2 - x1) * (y2 - y1)


def compute_iou(b1, b2):
    area1 = max(0, b1[2] - b1[0]) * max(0, b1[3] - b1[1])
    area2 = max(0, b2[2] - b2[0]) * max(0, b2[3] - b2[1])
    inter = compute_box_overlap(b1, b2)
    union = area1 + area2 - inter
    return inter / union if union > 0 else 0.0


# ── Utility: draw bounding boxes ──────────────────────────────────────────────
def draw_detections(image_bgr: np.ndarray, items_or_results, class_names=None) -> np.ndarray:
    """
    Draw high-precision bounding boxes with collision-free labels.

    Key Features:
      - Tight proportional padding so small defects are unobstructed
      - High-contrast 2px colored border with 1px dark outer edge
      - Corner target reticles for optical inspection clarity
      - Smart collision avoidance: dynamically positions labels (top/bottom/side/staggered)
        so multiple close defects do NOT overlap or obscure each other
      - Semi-transparent HUD badge (85% alpha dark background with colored outline)
      - Leader lines connecting offset labels directly to their defect box
    """
    img = image_bgr.copy()
    h, w = img.shape[:2]

    # Colour palette (BGR) — 16 distinct colours for 16 classes
    PALETTE = [
        (59, 130, 246),   # blue        broken
        (16, 185, 129),   # emerald     bulge
        (239, 68, 68),    # red         burn
        (245, 158, 11),   # amber       damage
        (139, 92, 246),   # violet      darkspot
        (236, 72, 153),   # pink        dirt
        (6, 182, 212),    # cyan        flash
        (34, 197, 94),    # green       flow
        (251, 146, 60),   # orange      hair
        (220, 38, 38),    # dark red    missing
        (37, 99, 235),    # indigo      overflow
        (168, 85, 247),   # purple      perforation
        (20, 184, 166),   # teal        reverse
        (234, 179, 8),    # yellow      shortshot
        (99, 102, 241),   # indigo-500  void
        (203, 213, 225),  # slate       white
    ]

    # Normalise input items
    items_to_draw = []
    if isinstance(items_or_results, list) and (len(items_or_results) == 0 or isinstance(items_or_results[0], dict)):
        items_to_draw = items_or_results
    elif hasattr(items_or_results, "__getitem__") and len(items_or_results) > 0 and hasattr(items_or_results[0], "boxes"):
        boxes_obj = items_or_results[0].boxes
        if boxes_obj is not None and len(boxes_obj) > 0:
            xyxy = boxes_obj.xyxy.cpu().numpy()
            confs = boxes_obj.conf.cpu().numpy()
            cls_ids = boxes_obj.cls.cpu().numpy().astype(int)
            for idx, (box, conf, cid) in enumerate(zip(xyxy, confs, cls_ids), start=1):
                name = class_names[cid] if class_names and cid in class_names else f"class_{cid}"
                items_to_draw.append({
                    "box": [int(v) for v in box],
                    "cls_id": cid,
                    "defect": name,
                    "conf": float(conf),
                    "rank": idx,
                })

    if not items_to_draw:
        return img

    # Step 1: Pre-calculate tight bounding boxes (never artificially inflate into neighboring teeth)
    prepared_items = []
    defect_boxes = []

    for item in items_to_draw:
        x1, y1, x2, y2 = item["box"]
        bw = x2 - x1
        bh = y2 - y1
        cx = (x1 + x2) // 2
        cy = (y1 + y2) // 2

        # Tight, proportional padding (2-5px)
        pad = max(2, min(5, int(min(bw, bh) * 0.08)))
        bx1 = max(0, x1 - pad)
        by1 = max(0, y1 - pad)
        bx2 = min(w - 1, x2 + pad)
        by2 = min(h - 1, y2 + pad)

        # Minimum dimension for ultra-tiny specks
        if bx2 - bx1 < 14:
            bx1 = max(0, cx - 7)
            bx2 = min(w - 1, cx + 7)
        if by2 - by1 < 14:
            by1 = max(0, cy - 7)
            by2 = min(h - 1, cy + 7)

        colour = PALETTE[item["cls_id"] % len(PALETTE)]
        label_text = f"#{item['rank']} {item['defect']} {item['conf']:.2f}"

        prepared_items.append({
            "box": (bx1, by1, bx2, by2),
            "orig_box": (x1, y1, x2, y2),
            "colour": colour,
            "label_text": label_text,
            "rank": item["rank"],
            "defect": item["defect"],
            "conf": item["conf"],
        })
        defect_boxes.append((bx1, by1, bx2, by2))

    # Step 2: Draw all bounding boxes with high-contrast styling and corner reticles
    for item in prepared_items:
        bx1, by1, bx2, by2 = item["box"]
        colour = item["colour"]
        bw = bx2 - bx1
        bh = by2 - by1

        # 1px dark contrast outline so box pops on bright white plastic
        cv2.rectangle(img, (max(0, bx1 - 1), max(0, by1 - 1)), (min(w - 1, bx2 + 1), min(h - 1, by2 + 1)), (15, 23, 42), 1, cv2.LINE_AA)
        # 2px clean class colour outline
        cv2.rectangle(img, (bx1, by1), (bx2, by2), colour, 2, cv2.LINE_AA)

        # Corner reticle brackets (open center ensures defect is fully visible)
        corner_len = min(8, max(4, min(bw, bh) // 4))
        # Top-left
        cv2.line(img, (bx1, by1), (bx1 + corner_len, by1), colour, 3, cv2.LINE_AA)
        cv2.line(img, (bx1, by1), (bx1, by1 + corner_len), colour, 3, cv2.LINE_AA)
        # Top-right
        cv2.line(img, (bx2, by1), (bx2 - corner_len, by1), colour, 3, cv2.LINE_AA)
        cv2.line(img, (bx2, by1), (bx2, by1 + corner_len), colour, 3, cv2.LINE_AA)
        # Bottom-left
        cv2.line(img, (bx1, by2), (bx1 + corner_len, by2), colour, 3, cv2.LINE_AA)
        cv2.line(img, (bx1, by2), (bx1, by2 - corner_len), colour, 3, cv2.LINE_AA)
        # Bottom-right
        cv2.line(img, (bx2, by2), (bx2 - corner_len, by2), colour, 3, cv2.LINE_AA)
        cv2.line(img, (bx2, by2), (bx2 - corner_len, by2), colour, 3, cv2.LINE_AA)

    # Step 3: Smart collision-free label placement
    placed_labels = []

    for i, item in enumerate(prepared_items):
        bx1, by1, bx2, by2 = item["box"]
        colour = item["colour"]
        label_text = item["label_text"]

        font_scale = 0.44
        thickness = 1
        (tw, th), baseline = cv2.getTextSize(label_text, cv2.FONT_HERSHEY_SIMPLEX, font_scale, thickness)
        pad_x, pad_y = 5, 4
        lw = tw + pad_x * 2
        lh = th + pad_y * 2

        other_boxes = [b for j, b in enumerate(defect_boxes) if j != i]

        # Multi-angle candidate label positions
        candidates = [
            (bx1, by1 - lh - 4),                     # Preferred: Above left
            (bx2 - lw, by1 - lh - 4),                 # Above right
            (bx1, by2 + 4),                          # Below left
            (bx2 - lw, by2 + 4),                     # Below right
            (bx2 + 6, by1),                          # Right side
            (bx1 - lw - 6, by1),                     # Left side
            (bx1, by1 - lh * 2 - 8),                 # Staggered high
            (bx1, by2 + lh + 8),                     # Staggered low
        ]

        best_rect = None
        best_score = float("inf")

        for c_idx, (cx, cy) in enumerate(candidates):
            clx = max(2, min(w - lw - 2, cx))
            cly = max(2, min(h - lh - 2, cy))
            cand_rect = (clx, cly, clx + lw, cly + lh)

            # Preference penalty (order in list)
            score = c_idx * 3.0

            # Heavy penalty if colliding with already placed labels
            for pl in placed_labels:
                ov = compute_box_overlap(cand_rect, pl)
                if ov > 0:
                    score += ov * 150.0

            # Heavy penalty if covering other defect bounding boxes
            for ob in other_boxes:
                ov = compute_box_overlap(cand_rect, ob)
                if ov > 0:
                    score += ov * 60.0

            if score < best_score:
                best_score = score
                best_rect = cand_rect

        lx1, ly1, lx2, ly2 = best_rect
        placed_labels.append(best_rect)

        # Draw leader pointer line if label was offset to avoid covering nearby defects
        is_offset = (ly2 < by1 - 5) or (ly1 > by2 + 5) or (lx1 > bx2 + 5) or (lx2 < bx1 - 5)
        if is_offset:
            label_anchor = ((lx1 + lx2) // 2, ly2 if ly2 <= by1 else ly1)
            box_anchor = ((bx1 + bx2) // 2, by1 if ly2 <= by1 else by2)
            cv2.line(img, label_anchor, box_anchor, colour, 1, cv2.LINE_AA)

        # Semi-transparent HUD pill badge (85% alpha dark slate with colored outline)
        overlay = img.copy()
        cv2.rectangle(overlay, (lx1, ly1), (lx2, ly2), (15, 23, 42), -1)
        cv2.addWeighted(overlay, 0.85, img, 0.15, 0, img)

        # 1px border matching class colour
        cv2.rectangle(img, (lx1, ly1), (lx2, ly2), colour, 1, cv2.LINE_AA)

        # Text inside pill badge
        text_y = ly1 + th + pad_y - 1
        cv2.putText(
            img,
            label_text,
            (lx1 + pad_x, text_y),
            cv2.FONT_HERSHEY_SIMPLEX,
            font_scale,
            (255, 255, 255),
            1,
            cv2.LINE_AA,
        )

    return img


# ── /analyze endpoint ─────────────────────────────────────────────────────────
@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    """
    Analyze a plastic gear image for surface defects.

    1. Validates the uploaded file (JPG/PNG only).
    2. Saves the image to uploads/.
    3. Runs YOLO11m inference at 832×832.
    4. Draws bounding boxes and saves the annotated image to outputs/.
    5. Generates Grad-CAM heatmap and saves to outputs/.
    6. Queries the expert system for causes and corrections.
    7. Returns JSON with all results for the dashboard.
    """

    # ── Validate file type ────────────────────────────────────────────────
    allowed_content_types = {"image/jpeg", "image/jpg", "image/png"}
    content_type = (file.content_type or "").lower()
    if content_type not in allowed_content_types:
        filename_lower = (file.filename or "").lower()
        if not filename_lower.endswith((".jpg", ".jpeg", ".png")):
            raise HTTPException(
                status_code=400,
                detail="Invalid file type. Please upload a JPG, JPEG, or PNG image.",
            )

    # ── Unique ID for this request ────────────────────────────────────────
    req_id    = uuid.uuid4().hex[:12]
    timestamp = int(time.time())
    tag       = f"{timestamp}_{req_id}"

    # ── Save upload ───────────────────────────────────────────────────────
    ext        = Path(file.filename or "image.jpg").suffix.lower() or ".jpg"
    upload_path = UPLOADS_DIR / f"upload_{tag}{ext}"
    image_bytes = await file.read()
    upload_path.write_bytes(image_bytes)

    # ── Decode image with OpenCV ──────────────────────────────────────────
    nparr  = np.frombuffer(image_bytes, np.uint8)
    img_bgr = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img_bgr is None:
        raise HTTPException(status_code=400, detail="Could not decode the uploaded image.")

    # ── Validate that uploaded image is a plastic gear / component ─────────
    is_valid, rejection_msg = validate_plastic_part(img_bgr)
    if not is_valid:
        try:
            upload_path.unlink(missing_ok=True)
        except Exception:
            pass
        raise HTTPException(status_code=400, detail=rejection_msg)

    # ── Verify Model Availability ─────────────────────────────────────────
    if model is None:
        raise HTTPException(
            status_code=503,
            detail=f"Defect detection model is currently unavailable. {model_load_error or 'Check backend logs.'}",
        )

    # ── YOLO inference ────────────────────────────────────────────────────
    try:
        results = model.predict(
            source=str(upload_path),
            imgsz=832,
            conf=0.25,       # detection confidence threshold
            iou=0.45,        # NMS IoU threshold
            verbose=False,
        )
        class_names = model.names  # dict {int: str}
    except Exception as exc:
        print(f"[YOLO Inference Error]: {exc}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Inference processing failed: {exc}")

    # ── Parse detections with intelligent deduplication ───────────────────
    detections = []
    items_to_draw = []
    main_defect      = None
    main_confidence  = None
    main_cause       = None
    main_action      = None

    if results and results[0].boxes is not None and len(results[0].boxes) > 0:
        boxes   = results[0].boxes
        xyxy    = boxes.xyxy.cpu().numpy()
        confs   = boxes.conf.cpu().numpy()
        cls_ids = boxes.cls.cpu().numpy().astype(int)

        # Sort by confidence descending
        order = np.argsort(confs)[::-1]
        kept_indices = []

        # Deduplicate same-class redundant boxes that overlap on the same spot
        for idx in order:
            box_a = xyxy[idx]
            cls_a = cls_ids[idx]
            is_dup = False
            for k_idx in kept_indices:
                if cls_ids[k_idx] == cls_a:
                    box_k = xyxy[k_idx]
                    iou = compute_iou(box_a, box_k)
                    area_a = max(1, (box_a[2] - box_a[0]) * (box_a[3] - box_a[1]))
                    area_k = max(1, (box_k[2] - box_k[0]) * (box_k[3] - box_k[1]))
                    inter = compute_box_overlap(box_a, box_k)
                    containment = inter / min(area_a, area_k)
                    if iou > 0.40 or containment > 0.65:
                        is_dup = True
                        break
            if not is_dup:
                kept_indices.append(idx)

        for rank, idx in enumerate(kept_indices, start=1):
            cls_id    = cls_ids[idx]
            conf_val  = float(confs[idx])
            defect    = class_names[cls_id]
            info      = get_defect_info(defect)

            det = {
                "defect":           defect,
                "confidence":       round(conf_val, 4),
                "possible_cause":   info["possible_cause"],
                "suggested_action": info["suggested_action"],
            }
            detections.append(det)

            items_to_draw.append({
                "box": [int(v) for v in xyxy[idx]],
                "cls_id": cls_id,
                "defect": defect,
                "conf": conf_val,
                "rank": rank,
            })

            if rank == 1:
                main_defect     = defect
                main_confidence = round(conf_val, 4)
                main_cause      = info["possible_cause"]
                main_action     = info["suggested_action"]

    total_detections = len(detections)

    # ── Draw bounding boxes & save ────────────────────────────────────────
    annotated = draw_detections(img_bgr, items_to_draw)
    detection_filename = f"detection_{tag}.jpg"
    detection_path     = OUTPUTS_DIR / detection_filename
    cv2.imwrite(str(detection_path), annotated, [cv2.IMWRITE_JPEG_QUALITY, 94])

    # ── Build response ────────────────────────────────────────────────────
    response = {
        "status":                "success",
        "filename":              file.filename,
        "model":                 "YOLO11m",
        "total_detections":      total_detections,
        "main_defect":           main_defect,
        "main_confidence":       main_confidence,
        "main_possible_cause":   main_cause,
        "main_suggested_action": main_action,
        "detections":            detections,
        "detection_image":       detection_filename,
    }

    return JSONResponse(content=response)



# ── Sarvam AI Language Translation & Status ──────────────────────────────────
class TranslationRequest(BaseModel):
    text: str
    target_lang: str
    source_lang: str = "en"
    mode: str = "formal"

@app.post("/api/translate")
def translate_endpoint(req: TranslationRequest):
    """
    Translate text using Sarvam AI (Mayura translation model).
    Supports Hindi, Marathi, Gujarati, and other Indic languages.
    """
    res = translate_with_sarvam(
        text=req.text,
        target_lang=req.target_lang,
        source_lang=req.source_lang,
        mode=req.mode,
    )
    return res


# ── Health-check ──────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {
        "message": "GearDefect AI Quality Assurance API is running.",
        "model": "YOLO11m",
        "model_loaded": model is not None,
        "classes": list(model.names.values()) if model is not None else [],
        "model_path": model_resolved_path,
    }


@app.get("/health")
def health():
    """
    Lightweight health endpoint for Render health checks and uptime monitoring.
    Reports API operational status and model readiness without executing expensive inference.
    """
    return {
        "status": "ok" if model is not None else "degraded",
        "api_running": True,
        "model_loaded": model is not None,
        "model_name": "YOLO11m",
        "classes_count": len(model.names) if model is not None else 0,
        "error": model_load_error,
    }


# ── Production / Dev server entry point ───────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    # Render assigns the listening port via the $PORT environment variable
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    print(f"[Server Entry] Launching Uvicorn server on {host}:{port}...")
    uvicorn.run("main:app", host=host, port=port, reload=False)
