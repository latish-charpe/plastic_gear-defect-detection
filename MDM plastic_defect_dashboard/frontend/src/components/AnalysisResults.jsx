import { useState } from "react";
import { Info, ZoomIn, X, ShieldAlert, ShieldCheck } from "lucide-react";
import { getOutputImageUrl } from "../api/analyzeApi";
import { useLanguage } from "../context/LanguageContext";

/* ── Polished Circular Confidence Ring ────────────────────────────────────── */
function ConfidenceRing({ value }) {
  const numVal = Number(value);
  const pct = Math.min(Math.max(isNaN(numVal) ? 0 : numVal, 0), 100);
  const size = 110;
  const strokeWidth = 9;
  const cx = size / 2;
  const r = (size - strokeWidth) / 2 - 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  // User-requested Blue aesthetic for confidence visualization
  const strokeColor = "#0284c7";
  const trackColor  = "#e0f2fe";

  return (
    <div className="ar-conf-ring-wrap" title={`Model Confidence: ${pct.toFixed(1)}%`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          strokeDashoffset={0}
          transform={`rotate(-90 ${cx} ${cx})`}
          style={{ transition: "stroke-dasharray 0.7s cubic-bezier(.4,0,.2,1)" }}
        />
      </svg>
      <div className="ar-conf-ring-inner">
        <span className="ar-conf-ring-pct" style={{ color: strokeColor }}>
          {pct.toFixed(1)}<span className="ar-conf-ring-unit">%</span>
        </span>
        <span className="ar-conf-ring-label">Confidence</span>
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────────────── */
export function AnalysisResults({ result, originalPreview }) {
  const { ui, getDefectText } = useLanguage();
  const [modalImage, setModalImage] = useState(null);

  if (!result) return null;

  const totalDetections = result.total_detections ?? (result.detections ? result.detections.length : 0);
  const hasDefects     = totalDetections > 0;
  const detectedImgUrl = getOutputImageUrl(result.detection_image);

  // Extract primary detection data
  const detections = result.detections || [];
  const primary = detections.length > 0
    ? [...detections].sort((a, b) => (b.confidence ?? 0) - (a.confidence ?? 0))[0]
    : result.main_defect
    ? {
        defect: result.main_defect,
        confidence: result.main_confidence,
        possible_cause: result.main_possible_cause,
        suggested_action: result.main_suggested_action,
      }
    : null;

  const confVal = primary?.confidence != null
    ? primary.confidence <= 1
      ? primary.confidence * 100
      : primary.confidence
    : result.main_confidence != null
    ? result.main_confidence <= 1
      ? result.main_confidence * 100
      : result.main_confidence
    : hasDefects
    ? 0
    : 100;

  const defectInfo = primary?.defect && getDefectText
    ? getDefectText(primary.defect, primary.possible_cause, primary.suggested_action)
    : null;

  const defectNameDisplay = hasDefects
    ? (primary?.defect
        ? primary.defect.charAt(0).toUpperCase() + primary.defect.slice(1)
        : result.main_defect
        ? result.main_defect.charAt(0).toUpperCase() + result.main_defect.slice(1)
        : "Defect Anomaly")
    : "Zero Defects Detected";

  return (
    <section className="section">
      {/* 1. Section Header */}
      <div className="section-head">
        <div>
          <div className="section-eyebrow">
            <span className="section-eyebrow-dot"></span>
            {ui?.module_inference || "MODULE 02 • AI INFERENCE"}
          </div>
          <h2 className="section-title">{ui?.analysis_results_title || "Analysis Results"}</h2>
          <p className="section-subtitle">{ui?.analysis_results_sub || "AI-assisted defect detection and classification"}</p>
        </div>
        <div className="section-head-aside">
          <span className={`section-status-pill ${hasDefects ? "section-status-pill--defect" : "section-status-pill--ok"}`}>
            {hasDefects ? (
              <>
                <span className="status-live-dot status-live-dot--defect" />
                <span>
                  {totalDetections} {totalDetections === 1 ? (ui?.instance || "Defect") : (ui?.instances || "Defects")} Detected
                </span>
              </>
            ) : (
              <>
                <span className="status-live-dot status-live-dot--ok" />
                <span>0 Defects Detected • Passed Inspection</span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* 2. Main Result Layout: Responsive Two-Column Arrangement */}
      <div className={`ar-main-card ${hasDefects ? "" : "ar-main-card--ok"}`}>
        <div className="ar-layout-grid">
          {/* Left Column: Identified Defect Details */}
          <div className="ar-col-left">
            <div className="ar-status-row">
              <span className={`ar-status-tag ${hasDefects ? "ar-status-tag--defect" : "ar-status-tag--ok"}`}>
                {hasDefects ? (
                  <>
                    <ShieldAlert size={13} />
                    <span>Defect Identified</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={13} />
                    <span>Passed Inspection</span>
                  </>
                )}
              </span>
              <span className="ar-class-index">
                {hasDefects ? "Primary Detection • Review Required" : "Nominal Specification Compliant"}
              </span>
            </div>

            <h3 className="ar-defect-name">{defectNameDisplay}</h3>

            <p className="ar-defect-desc">
              {hasDefects
                ? (defectInfo?.description || "Automated optical inspection flagged an anomaly on this gear component. Detailed root-cause diagnostics and shop-floor remediation parameters are available in Module 04 below.")
                : "No surface anomalies or structural defects detected by the YOLO11m vision model. Component geometry complies with nominal engineering tolerances."}
            </p>

            <div className="ar-defect-guidance">
              <Info size={14} className="ar-guidance-icon" />
              <span>Full root-cause diagnostics &amp; parameter adjustments are compiled in <strong>Module 04</strong> below.</span>
            </div>
          </div>

          {/* Right Column: Confidence Score Visualization & Detection Summary */}
          <div className="ar-col-right">
            {/* Confidence Score Visualization */}
            <div className="ar-conf-block">
              <div className="ar-conf-ring-container">
                <ConfidenceRing value={confVal} />
              </div>
              <div className="ar-conf-info">
                <span className="ar-conf-header-label">Model Confidence</span>
                <h4 className="ar-conf-headline">
                  {hasDefects
                    ? confVal >= 75
                      ? "High Confidence Prediction"
                      : confVal >= 50
                      ? "Moderate Confidence Prediction"
                      : "Low Confidence Anomaly"
                    : "Optimal Quality Confidence"}
                </h4>
                <p className="ar-conf-subtext">
                  {hasDefects
                    ? confVal >= 75
                      ? "Strong optical feature alignment with trained injection defect patterns."
                      : confVal >= 50
                      ? "Defect classified within standard industrial detection tolerance."
                      : "Uncertain detection signature; secondary manual audit suggested."
                    : "Part verified against nominal gear tooth profile without defects."}
                </p>
              </div>
            </div>

            {/* Detection Summary Area */}
            <div className="ar-summary-card">
              <div className="ar-summary-header">
                <span className="ar-summary-title">Detection Summary</span>
                <span className={`ar-summary-badge ${hasDefects ? "ar-summary-badge--defect" : "ar-summary-badge--ok"}`}>
                  {hasDefects ? `${totalDetections} ${totalDetections === 1 ? "Defect" : "Defects"}` : "Zero Defects"}
                </span>
              </div>

              <div className="ar-summary-grid">
                <div className="ar-summary-item">
                  <span className="ar-summary-k">Total Detections</span>
                  <span className="ar-summary-v">{totalDetections}</span>
                </div>
                <div className="ar-summary-item">
                  <span className="ar-summary-k">Defect Class</span>
                  <span className="ar-summary-v ar-summary-v--cap">
                    {hasDefects ? (primary?.defect || result.main_defect || "—") : "None (Passed)"}
                  </span>
                </div>
                <div className="ar-summary-item">
                  <span className="ar-summary-k">Inference Engine</span>
                  <span className="ar-summary-v ar-summary-v--mono">{result.model || "YOLO11m"}</span>
                </div>
                <div className="ar-summary-item">
                  <span className="ar-summary-k">QA Assessment</span>
                  <span className={`ar-summary-v ${hasDefects ? "ar-status-text--defect" : "ar-status-text--ok"}`}>
                    {hasDefects ? "Action Required" : "Tolerance OK"}
                  </span>
                </div>
              </div>

              <div className="ar-summary-note">
                <Info size={13} className="ar-summary-note-icon" />
                <span>AI-assisted prediction; results may require expert verification.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Images */}
      <div className="inspection-panels-row">
        {/* Panel 1: Original Image */}
        <div className="inspection-panel-card">
          <div className="inspection-panel-header">
            <div className="inspection-panel-title-group">
              <span className="inspection-panel-indicator inspection-panel-indicator--raw" />
              <span className="inspection-panel-heading">ORIGINAL COMPONENT IMAGE</span>
            </div>
            <div className="inspection-panel-actions">
              <span className="inspection-panel-badge">RAW OPTICAL FEED</span>
              {originalPreview && (
                <button
                  type="button"
                  className="inspection-zoom-btn"
                  onClick={() => setModalImage({ label: "ORIGINAL COMPONENT IMAGE", src: originalPreview })}
                  title="Expand to Fullscreen Lightbox"
                >
                  <ZoomIn size={13} style={{ marginRight: 4 }} />
                  Zoom View
                </button>
              )}
            </div>
          </div>
          <div 
            className="inspection-viewport"
            onClick={() => originalPreview && setModalImage({ label: "ORIGINAL COMPONENT IMAGE", src: originalPreview })}
            style={{ cursor: originalPreview ? "zoom-in" : "default" }}
          >
            {originalPreview ? (
              <img src={originalPreview} alt="Original gear component" className="inspection-viewport-img" />
            ) : (
              <div className="inspection-viewport-placeholder">No raw image preview available</div>
            )}
            <div className="inspection-crosshair inspection-crosshair--tl" />
            <div className="inspection-crosshair inspection-crosshair--tr" />
            <div className="inspection-crosshair inspection-crosshair--bl" />
            <div className="inspection-crosshair inspection-crosshair--br" />
          </div>
          <div className="inspection-panel-footer">
            <span>INPUT: DIRECT INDUSTRIAL CAMERA / UPLOAD</span>
            <span>STATUS: PRE-PROCESSED</span>
          </div>
        </div>

        {/* Panel 2: AI Detected Image */}
        <div className={`inspection-panel-card ${hasDefects ? "inspection-panel-card--defect" : "inspection-panel-card--ok"}`}>
          <div className="inspection-panel-header">
            <div className="inspection-panel-title-group">
              <span className={`inspection-panel-indicator ${hasDefects ? "inspection-panel-indicator--defect" : "inspection-panel-indicator--ok"}`} />
              <span className="inspection-panel-heading">AI DEFECT DETECTION (YOLO11m)</span>
            </div>
            <div className="inspection-panel-actions">
              <span className={`inspection-panel-badge ${hasDefects ? "inspection-panel-badge--defect" : "inspection-panel-badge--ok"}`}>
                {hasDefects ? `${result.total_detections} DEFECT BOXES` : "ZERO DEFECTS"}
              </span>
              {detectedImgUrl && (
                <button
                  type="button"
                  className="inspection-zoom-btn"
                  onClick={() => setModalImage({ label: "AI DEFECT DETECTION (YOLO11m)", src: detectedImgUrl })}
                  title="Expand to Fullscreen Lightbox"
                >
                  <ZoomIn size={13} style={{ marginRight: 4 }} />
                  Zoom View
                </button>
              )}
            </div>
          </div>
          <div 
            className="inspection-viewport"
            onClick={() => detectedImgUrl && setModalImage({ label: "AI DEFECT DETECTION (YOLO11m)", src: detectedImgUrl })}
            style={{ cursor: detectedImgUrl ? "zoom-in" : "default" }}
          >
            {detectedImgUrl ? (
              <img src={detectedImgUrl} alt="YOLO11 defect detection overlay" className="inspection-viewport-img" />
            ) : (
              <div className="inspection-viewport-placeholder">Inference visualization unavailable</div>
            )}
            <div className="inspection-crosshair inspection-crosshair--tl" />
            <div className="inspection-crosshair inspection-crosshair--tr" />
            <div className="inspection-crosshair inspection-crosshair--bl" />
            <div className="inspection-crosshair inspection-crosshair--br" />
          </div>
          <div className="inspection-panel-footer">
            <span>MODEL: YOLO11m QUALITY ASSURANCE</span>
            <span>ANNOTATION: BOUNDING BOX &amp; CONFIDENCE OVERLAY</span>
          </div>
        </div>
      </div>


      {/* High-Resolution Inspection Lightbox Modal */}
      {modalImage && (
        <div
          className="defect-modal-backdrop"
          onClick={() => setModalImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.88)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "94vw",
              maxHeight: "92vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#0f172a",
              borderRadius: 12,
              padding: 12,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
              border: "1px solid #334155",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
                padding: "2px 6px",
              }}
            >
              <div style={{ color: "#f8fafc", fontWeight: 600, fontSize: 13, letterSpacing: "0.04em" }}>
                {modalImage.label} — DETAILED DEFECT INSPECTION
              </div>
              <button
                type="button"
                onClick={() => setModalImage(null)}
                style={{
                  background: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: "50%",
                  width: 28,
                  height: 28,
                  color: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                title="Close Inspection View"
              >
                <X size={15} />
              </button>
            </div>
            <img
              src={modalImage.src}
              alt="High-resolution defect inspection"
              style={{
                maxWidth: "100%",
                maxHeight: "82vh",
                objectFit: "contain",
                borderRadius: 8,
                border: "1px solid #1e293b",
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}

function ResultImage({ label, src, alt, highlight, onInspect }) {
  return (
    <div
      className={`result-img-card ${highlight ? "result-img-card--highlight" : ""}`}
      onClick={onInspect}
      style={{ cursor: src ? "zoom-in" : "default", position: "relative" }}
      title={src ? "Click to inspect in high resolution" : ""}
    >
      <div className="result-img-label" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>{label}</span>
        {src && (
          <span style={{ fontSize: 10, display: "inline-flex", alignItems: "center", gap: 3, opacity: 0.85 }}>
            <ZoomIn size={11} /> Zoom
          </span>
        )}
      </div>
      <div className="result-img-wrap">
        {src
          ? <img src={src} alt={alt} className="result-img" />
          : <div className="result-img-placeholder">Image unavailable</div>}
      </div>
    </div>
  );
}
