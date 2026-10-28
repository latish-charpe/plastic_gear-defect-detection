"""
gradcam.py — EigenCAM for YOLO11m (Ultralytics)
================================================

Uses EigenCAM instead of gradient-based Grad-CAM.
EigenCAM extracts the first principal component (SVD) of the feature
maps from the last backbone Conv2d layer.  It produces heatmaps that
are equivalent to Grad-CAM for localisation tasks — without needing a
backward pass, making it robust to complex detection-head architectures
like YOLO11m where gradient flow can be unpredictable.

Reference: Muhammad & Yeasin, "EigenCAM: Class Activation Map using
           Principal Components", IJCNN 2020.
"""

import cv2
import numpy as np
import torch
import torch.nn as nn


# ── helpers ───────────────────────────────────────────────────────────────────

def _find_target_layer(torch_model: nn.Module) -> nn.Module | None:
    """
    Return the last Conv2d BEFORE the Detect head.

    YOLO11m stores its layers in torch_model.model (a ModuleList).
    The very last element is always the Detect head.
    We skip it and search backwards for the deepest Conv2d.
    """
    try:
        all_layers = list(torch_model.model)
        backbone_and_neck = all_layers[:-1]           # exclude Detect head
        for layer in reversed(backbone_and_neck):
            for m in reversed(list(layer.modules())):
                if isinstance(m, nn.Conv2d):
                    return m
    except Exception:
        pass

    # Hard fallback — last Conv2d anywhere in the model
    target = None
    for m in torch_model.modules():
        if isinstance(m, nn.Conv2d):
            target = m
    return target


def _eigen_cam(act: torch.Tensor) -> np.ndarray:
    """
    Compute EigenCAM from a (C, H, W) activation tensor.

    Steps
    -----
    1. Reshape to (C, H*W).
    2. SVD → first right singular vector encodes the dominant spatial pattern.
    3. Reshape back to (H, W) and ReLU.
    """
    C, H, W = act.shape
    flat = act.reshape(C, -1).float()               # (C, H*W)

    try:
        _, _, Vt = torch.linalg.svd(flat, full_matrices=False)
        cam = Vt[0].reshape(H, W).numpy()           # first principal component
    except Exception:
        # SVD failed → fall back to max-channel pooling
        cam = act.max(dim=0)[0].numpy()

    cam = np.maximum(cam, 0)                        # ReLU
    return cam


def _normalise(cam: np.ndarray) -> np.ndarray | None:
    """Min-max normalise to [0, 1].  Returns None if the map is flat."""
    mn, mx = cam.min(), cam.max()
    if mx - mn < 1e-8:
        return None
    return (cam - mn) / (mx - mn)


# ── public API ────────────────────────────────────────────────────────────────

def generate_gradcam(
    model,
    image_path: str,
    output_path: str,
    img_size: int = 832,
    alpha: float = 0.45,
) -> bool:
    """
    Generate an EigenCAM heatmap overlay and save to *output_path*.

    Parameters
    ----------
    model       : Loaded Ultralytics YOLO model.
    image_path  : Path to the input image.
    output_path : Destination JPEG path.
    img_size    : Inference size (should match training: 832).
    alpha       : Heatmap opacity [0 = invisible, 1 = solid].

    Returns
    -------
    True on success, False on any failure.
    """
    torch_model = model.model
    device      = next(torch_model.parameters()).device
    hook_handle = None

    try:
        # ── 1. Locate target layer ────────────────────────────────────────
        target = _find_target_layer(torch_model)
        if target is None:
            print("[EigenCAM] Could not find a Conv2d layer.")
            return False
        print(f"[EigenCAM] Target layer: {target}")

        # ── 2. Register forward hook ──────────────────────────────────────
        act_buf: list[torch.Tensor] = []

        def _hook(module, inp, out):
            act_buf.clear()
            act_buf.append(out.detach().cpu())

        hook_handle = target.register_forward_hook(_hook)

        # ── 3. Load original image ────────────────────────────────────────
        orig_bgr = cv2.imread(image_path)
        if orig_bgr is None:
            print(f"[EigenCAM] Cannot read image: {image_path}")
            return False
        orig_h, orig_w = orig_bgr.shape[:2]

        # ── 4. Pre-process for inference ──────────────────────────────────
        img_rgb   = cv2.cvtColor(orig_bgr, cv2.COLOR_BGR2RGB)
        img_small = cv2.resize(img_rgb, (img_size, img_size))
        tensor    = (
            torch.from_numpy(img_small.astype(np.float32) / 255.0)
            .permute(2, 0, 1)
            .unsqueeze(0)
            .to(device)
        )

        # ── 5. Forward pass (eval + no_grad) ─────────────────────────────
        torch_model.eval()
        with torch.no_grad():
            torch_model(tensor)

        hook_handle.remove()
        hook_handle = None

        if not act_buf:
            print("[EigenCAM] Forward hook captured nothing.")
            return False

        # ── 6. Compute EigenCAM ───────────────────────────────────────────
        act = act_buf[0].squeeze(0)           # (C, H, W)
        cam = _eigen_cam(act)

        norm = _normalise(cam)
        if norm is None:
            # Fallback: mean pooling across channels
            cam  = act.mean(dim=0).numpy()
            cam  = np.maximum(cam, 0)
            norm = _normalise(cam)
            if norm is None:
                print("[EigenCAM] Activation map is flat — no salient region.")
                return False
        cam = norm

        # ── 7. Resize to original resolution ─────────────────────────────
        cam_up  = cv2.resize(cam, (orig_w, orig_h))

        # ── 8. Colour-map + blend ─────────────────────────────────────────
        heat    = cv2.applyColorMap(np.uint8(255 * cam_up), cv2.COLORMAP_JET)
        overlay = cv2.addWeighted(orig_bgr, 1.0 - alpha, heat, alpha, 0)

        cv2.imwrite(output_path, overlay, [cv2.IMWRITE_JPEG_QUALITY, 92])
        print(f"[EigenCAM] Heatmap saved → {output_path}")
        return True

    except Exception as exc:
        print(f"[EigenCAM] Error: {exc}")
        import traceback
        traceback.print_exc()
        return False

    finally:
        torch_model.eval()
        if hook_handle is not None:
            try:
                hook_handle.remove()
            except Exception:
                pass
