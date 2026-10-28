# Backend — AI Plastic Defect Detection API

FastAPI backend for the AI-Based Plastic Defect Detection dashboard.

## Structure

```
backend/
├── main.py            ← FastAPI app + /analyze endpoint
├── expert_system.py   ← Rule-based polymer expert system (16 defect classes)
├── gradcam.py         ← Grad-CAM heatmap generation (PyTorch hooks on YOLO11m)
├── requirements.txt   ← Python dependencies
├── start_server.bat   ← Windows one-click startup script
├── outputs/           ← Auto-created: annotated detection images + Grad-CAM heatmaps
└── uploads/           ← Auto-created: temporary uploaded images
```

## Quick Start

### Option 1 — Double-click (Windows)
```
Double-click:  start_server.bat
```

### Option 2 — Manual
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

Server will be available at: **http://127.0.0.1:8000**

---

## Requirements

- Python 3.9 or later
- Model file: `../models/yolo11m_targeted_best.pt` (already present)
- GPU recommended (CUDA); CPU will work but inference will be slower

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/` | Health check + class list |
| `GET`  | `/health` | Simple OK response |
| `POST` | `/analyze` | Main defect detection endpoint |
| `GET`  | `/outputs/{filename}` | Serve detection / Grad-CAM images |

### POST /analyze

**Request:** `multipart/form-data` with field `file` = image (JPG/PNG)

**Response:**
```json
{
  "status": "success",
  "filename": "gear_image.jpg",
  "model": "YOLO11m",
  "total_detections": 1,
  "main_defect": "darkspot",
  "main_confidence": 0.9614,
  "main_possible_cause": "Material contamination or thermal degradation...",
  "main_suggested_action": "Check material quality, hopper, nozzle...",
  "detections": [
    {
      "defect": "darkspot",
      "confidence": 0.9614,
      "possible_cause": "...",
      "suggested_action": "..."
    }
  ],
  "detection_image": "detection_1234567890_abc123.jpg",
  "gradcam_generated": true,
  "gradcam_filename": "gradcam_1234567890_abc123.jpg",
  "gradcam_error": null
}
```

---

## Notes

- Detection images and Grad-CAM heatmaps are saved to `outputs/` and served at `/outputs/{filename}`
- YOLO inference runs at **832×832** (matching training resolution)
- Confidence threshold: **0.25** | NMS IoU threshold: **0.45**
- Grad-CAM uses PyTorch hooks on the last `Conv2d` in the YOLO11m backbone
- CORS is configured to allow the Vite frontend at `localhost:5173`
