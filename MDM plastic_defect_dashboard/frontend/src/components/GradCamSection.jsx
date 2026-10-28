import { AlertCircle, Sparkles, Eye } from "lucide-react";
import { getOutputImageUrl } from "../api/analyzeApi";

export function GradCamSection({ result }) {
  if (!result) return null;

  const gradcamUrl = result.gradcam_generated && result.gradcam_filename
    ? getOutputImageUrl(result.gradcam_filename)
    : null;

  const detectionUrl = getOutputImageUrl(result.detection_image);

  return (
    <section className="section">
      <div className="ref-section-header">
        <div className="ref-section-header-main">
          <div className="ref-section-icon">
            <Sparkles size={20} />
          </div>
          <div className="ref-section-text">
            <div className="ref-section-eyebrow">
              <span className="ref-section-eyebrow-dot"></span>
              EXPLAINABLE AI • ATTENTION MAP
            </div>
            <h2 className="ref-section-title">Visual Explanation (Grad-CAM)</h2>
            <p className="ref-section-subtitle">
              Highlights the image regions the model focused on when making its prediction.
            </p>
          </div>
        </div>
        <div className="ref-section-aside">
          <span className="ref-section-badge">
            <Eye size={13} style={{ color: "var(--accent)" }} />
            <span>XAI Heatmap</span>
          </span>
        </div>
      </div>

      <div className="gradcam-grid">
        {/* Detection image for comparison */}
        <div className="gradcam-panel">
          <div className="gradcam-panel-label">Detection Result</div>
          <div className="gradcam-image-wrap">
            {detectionUrl ? (
              <img
                src={detectionUrl}
                alt="YOLO11m detection result"
                className="gradcam-image"
              />
            ) : (
              <div className="gradcam-placeholder">No detection image</div>
            )}
          </div>
        </div>

        {/* Grad-CAM heatmap */}
        <div className="gradcam-panel">
          <div className="gradcam-panel-label">Grad-CAM Heatmap</div>
          <div className="gradcam-image-wrap">
            {gradcamUrl ? (
              <img
                src={gradcamUrl}
                alt="Grad-CAM explainability heatmap"
                className="gradcam-image"
              />
            ) : (
              <div className="gradcam-unavailable">
                <AlertCircle size={20} style={{ marginBottom: 8, opacity: 0.6 }} />
                <div>
                  {result.gradcam_error
                    ? result.gradcam_error
                    : "Grad-CAM could not be generated for this prediction."}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="gradcam-disclaimer">
        <AlertCircle size={14} style={{ marginRight: 6, flexShrink: 0 }} />
        <span>
          <strong>Note:</strong> Grad-CAM highlights image regions that contributed to the
          model's prediction. It is an explanation aid and should{" "}
          <strong>not</strong> be interpreted as exact defect segmentation.
        </span>
      </div>
    </section>
  );
}
