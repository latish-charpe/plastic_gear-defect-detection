"""
part_validator.py — Domain validator for plastic gear and injection-molded components.
=====================================================================================
Validates uploaded images to ensure they belong to the plastic gear/part inspection
domain and rejects arbitrary random uploads (animals, humans, vehicles, food, landscapes,
blank images, documents, everyday non-industrial items, etc.).
"""

from pathlib import Path
import cv2
import numpy as np
import torch
import torchvision.models as models
from PIL import Image

# ── Load MobileNetV3-small as feature extractor & classifier ──────────────────
_WEIGHTS = models.MobileNet_V3_Small_Weights.DEFAULT
_classifier = models.mobilenet_v3_small(weights=_WEIGHTS).eval()
_feature_extractor = torch.nn.Sequential(
    _classifier.features,
    _classifier.avgpool,
    torch.nn.Flatten(),
).eval()
_preprocess = _WEIGHTS.transforms()
_categories = _WEIGHTS.meta["categories"]

# ── Load precomputed gear centroid ───────────────────────────────────────────
_CENTROID_PATH = Path(__file__).parent.parent / "models" / "gear_centroid.pt"
if _CENTROID_PATH.exists():
    _GEAR_CENTROID = torch.load(str(_CENTROID_PATH), map_location="cpu", weights_only=True)
else:
    _GEAR_CENTROID = None

# Specific ImageNet category indices for non-industrial objects
# (Avoids buggy substring matches like 'train' in 'strainer')
VEHICLE_INDICES = {
    404, 407, 436, 511, 609, 627, 656, 670, 671, 705, 717, 734, 751, 817, 829, 830, 864, 867, 895
}
APPAREL_INDICES = {
    400, 411, 442, 459, 474, 501, 614, 617, 652, 697, 737, 788, 834, 842, 903
}


def validate_plastic_part(image_bgr: np.ndarray) -> tuple[bool, str]:
    """
    Validates whether the provided image is a genuine plastic gear / component
    or an arbitrary random image (animal, human, food, car, blank, etc.).

    Returns:
        (is_valid: bool, rejection_message: str)
    """
    h, w = image_bgr.shape[:2]

    # 1. Minimum dimension check
    if h < 80 or w < 80:
        return False, "Image resolution is too low. Please upload a clear image of a plastic gear."

    # 2. Blank / uniform / flat image check
    gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)
    std_dev = float(gray.std())
    if std_dev < 12.0:
        return (
            False,
            "The uploaded image appears blank or lacks contrast. Please upload a clear image of a plastic gear.",
        )

    # 3. MobileNet ImageNet feature extraction & classification
    img_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
    pil_img = Image.fromarray(img_rgb)
    tensor = _preprocess(pil_img).unsqueeze(0)

    with torch.no_grad():
        logits = _classifier(tensor).squeeze(0)
        emb = _feature_extractor(tensor).squeeze(0)
        emb = emb / emb.norm()

    probs = torch.softmax(logits, dim=0)
    top_prob, top_idx = torch.topk(probs, 3)
    i0 = top_idx[0].item()
    p0 = top_prob[0].item()
    cat0 = _categories[i0]

    # Rule 1: Animals / living organisms (ImageNet index 0-397)
    if i0 < 398 and p0 > 0.25:
        return (
            False,
            f"Invalid image: Living subject detected ('{cat0}'). Please upload an image of an injection-molded plastic gear.",
        )

    # Rule 2: Food & produce (ImageNet index 924-969)
    if 924 <= i0 <= 969 and p0 > 0.25:
        return (
            False,
            f"Invalid image: Food item detected ('{cat0}'). Please upload an image of a plastic gear.",
        )

    # Rule 3: Scenery & natural landscapes (ImageNet index 970-980)
    if 970 <= i0 <= 980 and p0 > 0.25:
        return (
            False,
            f"Invalid image: Outdoor/landscape scene detected ('{cat0}'). Please upload an image of a plastic gear.",
        )

    # Rule 4: Vehicles (explicit index set, prevents false positives on 'strainer')
    if i0 in VEHICLE_INDICES and p0 > 0.25:
        return (
            False,
            f"Invalid image: Vehicle detected ('{cat0}'). Please upload an image of a plastic gear.",
        )

    # Rule 5: Apparel / Clothing
    if i0 in APPAREL_INDICES and p0 > 0.25:
        return (
            False,
            f"Invalid image: Apparel or person detected ('{cat0}'). Please upload an image of a plastic gear.",
        )

    # Rule 6: Domain Centroid Similarity (plastic gear vs arbitrary random textures)
    if _GEAR_CENTROID is not None:
        sim = float(torch.dot(emb, _GEAR_CENTROID).item())
        if sim < 0.45:
            return (
                False,
                "Invalid image: The uploaded image does not appear to be a plastic gear or molded component. Please upload a clear plastic gear image.",
            )

    return True, "Valid"
