import { useRef, useState, useCallback } from "react";
import { Upload, X, Image as ImageIcon, Loader2, AlertCircle, ScanLine } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function UploadWorkspace({ onAnalyze, isLoading, error }) {
  const { ui } = useLanguage();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageDimensions, setImageDimensions] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.type)) {
      alert("Please upload a JPG, JPEG, or PNG image.");
      return;
    }
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
    // Get image dimensions
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ w: img.naturalWidth, h: img.naturalHeight });
    };
    img.src = url;
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setImageDimensions(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAnalyze = () => {
    if (selectedFile) onAnalyze(selectedFile);
  };

  return (
    <section id="analysis" className="section">
      <div className="section-head">
        <div>
          <div className="section-eyebrow">
            <span className="section-eyebrow-dot"></span>
            {ui.module_inspect || "01 / IMAGE INSPECTION"}
          </div>
          <h2 className="section-title">{ui.inspect_title || "Gear Component Inspection"}</h2>
          <p className="section-subtitle">
            {ui.inspect_subtitle || "Upload or drag & drop high-resolution gear component photos for automated defect localization"}
          </p>
        </div>
        <div className="section-head-aside">
          <span className="section-status-pill">
            <span className="status-live-dot" />
            <span>AI SCAN READY</span>
          </span>
        </div>
      </div>

      {!preview ? (
        /* Drop zone — clean, prominent dashed outline only around actual drop area */
        <div
          className={`drop-zone ${dragOver ? "drop-zone--active" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
          aria-label="Upload image drop zone"
        >
          <div className="drop-zone-icon-wrap">
            <Upload size={22} className="drop-zone-icon-svg" />
          </div>
          <div className="drop-zone-title">Upload or Drop Gear Component Image</div>
          <div className="drop-zone-subtitle">High-resolution optical inspection of injection-molded plastic components</div>
          
          <div className="drop-zone-pills">
            <span className="drop-pill">JPG</span>
            <span className="drop-pill">JPEG</span>
            <span className="drop-pill">PNG</span>
          </div>

          <button
            type="button"
            className="btn-secondary drop-browse-btn"
            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
          >
            <ImageIcon size={15} style={{ marginRight: 6 }} />
            Browse Gear Image
          </button>
        </div>
      ) : (
        /* Preview — Open industrial layout */
        <div className="preview-area">
          <div className="preview-image-wrap">
            <img src={preview} alt="Selected gear component" className="preview-image" />
          </div>
          <div className="preview-info-col">
            <div className="preview-header-row">
              <span className="preview-badge-status">
                <span className="status-live-dot" />
                Component Loaded &bull; Ready For Inference
              </span>
              <button
                className="btn-ghost reset-btn"
                onClick={handleReset}
                disabled={isLoading}
                aria-label="Remove image"
              >
                <X size={14} style={{ marginRight: 5 }} />
                Remove
              </button>
            </div>

            <div className="preview-meta-grid">
              <div className="preview-meta-item">
                <span className="preview-meta-k">File Name</span>
                <span className="preview-meta-v preview-meta-v--mono">{selectedFile?.name}</span>
              </div>
              <div className="preview-meta-item">
                <span className="preview-meta-k">File Size</span>
                <span className="preview-meta-v">
                  {selectedFile ? (selectedFile.size / 1024).toFixed(1) + " KB" : "—"}
                </span>
              </div>
              {imageDimensions && (
                <div className="preview-meta-item">
                  <span className="preview-meta-k">Dimensions</span>
                  <span className="preview-meta-v">
                    {imageDimensions.w} × {imageDimensions.h} px
                  </span>
                </div>
              )}
            </div>

            {/* Error inside preview if any */}
            {error && (
              <div className="upload-error">
                <AlertCircle size={15} style={{ marginRight: 6, flexShrink: 0 }} />
                {error}
              </div>
            )}

            <div className="upload-actions">
              <button
                id="analyze-btn"
                className="btn-primary analyze-btn"
                disabled={!selectedFile || isLoading}
                onClick={handleAnalyze}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="spin" style={{ marginRight: 8 }} />
                    Inspecting gear image...
                  </>
                ) : (
                  <>
                    <Upload size={16} style={{ marginRight: 8 }} />
                    Run Defect Inspection
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        id="gear-file-input"
        type="file"
        accept=".jpg,.jpeg,.png"
        style={{ display: "none" }}
        onChange={handleInputChange}
        aria-hidden="true"
      />

      {/* Global Error if outside preview */}
      {!preview && error && (
        <div className="upload-error">
          <AlertCircle size={15} style={{ marginRight: 6, flexShrink: 0 }} />
          {error}
        </div>
      )}
    </section>
  );
}
