import { Shield, ExternalLink } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Shield size={16} style={{ marginRight: 8 }} />
          AI Plastic Defect Diagnosis
        </div>
        <div className="footer-info">
          <div className="footer-project">
            AI-Based Plastic Defect Detection and Process Correction
          </div>
          <div className="footer-subtitle">
            Final Year Project · Automated Quality Control · Polymer Expert System
          </div>
        </div>
        <div className="footer-note">
          All defect detections and process recommendations are generated in real-time.
        </div>
        <div className="footer-copy">
          © {year} &mdash; Academic Project Prototype. Not for commercial use.
        </div>
      </div>
    </footer>
  );
}
