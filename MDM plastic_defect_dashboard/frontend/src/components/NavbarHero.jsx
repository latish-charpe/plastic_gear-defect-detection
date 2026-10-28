import { useState } from "react";
import {
  Shield,
  Sparkles,
  ArrowRight,
  Layers,
  BookOpen,
  ScanLine,
  Info,
  Settings2,
  Zap,
  ScanSearch,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "../context/LanguageContext";
import heroBg from "../assets/hero-bg.png";

// ─── Navbar ──────────────────────────────────────────────────────────────────
export function Navbar({ currentView = "inspection", onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { ui } = useLanguage();

  const handleNavClick = (viewId, anchorId) => {
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(viewId);
    }
    if (anchorId) {
      setTimeout(() => {
        document.querySelector(anchorId)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div
          className="navbar-brand"
          onClick={() => handleNavClick("inspection", "#hero")}
          style={{ cursor: "pointer" }}
        >
          <div className="brand-icon">
            <Shield size={19} strokeWidth={2.2} />
          </div>
          <div>
            <div className="brand-title">
              GearDefect AI
            </div>
            <div className="brand-subtitle">INDUSTRIAL QUALITY ASSURANCE</div>
          </div>
        </div>

        <div className="nav-links-desktop">
          <button
            onClick={() => handleNavClick("inspection", "#analysis")}
            className={`nav-link ${currentView === "inspection" ? "nav-link--active" : ""}`}
          >
            <ScanLine size={14} style={{ marginRight: 6 }} />
            <span>{ui.inspect_nav || "Inspect Image"}</span>
          </button>

          <button
            onClick={() => handleNavClick("catalog", "#about")}
            className={`nav-link ${currentView === "catalog" || currentView === "detail" ? "nav-link--active" : ""}`}
          >
            <BookOpen size={14} style={{ marginRight: 6 }} />
            <span>{ui.defect_kb || "Defect Knowledge Base"}</span>
          </button>

          <button
            onClick={() => handleNavClick("about")}
            className={`nav-link ${currentView === "about" ? "nav-link--active" : ""}`}
          >
            <Info size={14} style={{ marginRight: 6 }} />
            <span>{ui.about_nav || "About System"}</span>
          </button>
        </div>

        <div className="nav-right">
          <LanguageSelector />

          <div className="nav-status-badge">
            <span className="status-dot-wrap">
              <span className="status-dot-ping" />
              <span className="status-dot" />
            </span>
            <span className="nav-status-text">Online <span className="nav-status-sep">·</span> Inspection Ready</span>
          </div>

          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="nav-mobile-menu">
          <div style={{ padding: "8px 12px 12px" }}>
            <LanguageSelector />
          </div>
          <button
            onClick={() => handleNavClick("inspection", "#analysis")}
            className="nav-link-mobile"
          >
            <ScanLine size={14} style={{ marginRight: 6 }} />
            <span>{ui.inspect_nav || "Inspect Image"}</span>
          </button>
          <button
            onClick={() => handleNavClick("catalog", "#about")}
            className="nav-link-mobile"
          >
            <BookOpen size={14} style={{ marginRight: 6 }} />
            <span>{ui.defect_kb || "Defect Knowledge Base"}</span>
          </button>
          <button
            onClick={() => handleNavClick("about")}
            className="nav-link-mobile"
          >
            <Info size={14} style={{ marginRight: 6 }} />
            <span>{ui.about_nav || "About System"}</span>
          </button>
        </div>
      )}
    </nav>
  );
}

// ─── HeroSection ─────────────────────────────────────────────────────────────
export function HeroSection({ onStartAnalysis }) {
  const { language } = useLanguage();

  const heroLabels = {
    en: {
      badge: "AI-Powered Quality Inspection",
      model: "YOLOv8 Vision",
      line1: "Plastic Gear",
      highlight: "Defect Diagnosis",
      subtitle:
        "An AI-based system for detecting surface defects in injection-molded plastic components and providing process correction suggestions to improve product quality.",
      ctaPrimary: "Inspect Gear Image",
      ctaSecondary: "Defect Catalog (16 Types)",
      stat1Val: "16 Defect Classes",
      stat1Lbl: "Full Defect Catalog",
      stat2Val: "AI Defect Detection",
      stat2Lbl: "High-Precision YOLO",
      stat3Val: "Bounding Box Localization",
      stat3Lbl: "Visual Defect Overlays",
      stat4Val: "Process Correction Tips",
      stat4Lbl: "Polymer Remedies",
    },
    hi: {
      badge: "स्वचालित पॉलिमर गुणवत्ता नियंत्रण",
      model: "YOLOv8 विज़न",
      line1: "प्लास्टिक गियर सतह",
      highlight: "दोष निदान व पहचान",
      subtitle:
        "इंजेक्शन-मोल्डेड प्लास्टिक गियर घटकों पर सतह के दोषों की सटीक पहचान और मशीन ऑपरेटरों के लिए विशेषज्ञ प्रक्रिया सुधार सुझाव।",
      ctaPrimary: "गियर छवि जांचें",
      ctaSecondary: "दोष कैटलॉग (16 श्रेणियां)",
      stat1Val: "16 श्रेणियां",
      stat1Lbl: "संपूर्ण दोष ज्ञानकोश",
      stat2Val: "AI डिटेक्शन",
      stat2Lbl: "सटीक YOLO विज़न",
      stat3Val: "लोकेलाइजेशन",
      stat3Lbl: "सटीक बाउंडिंग बॉक्स",
      stat4Val: "सुधार उपाय",
      stat4Lbl: "पॉलिमर प्रक्रिया गाइड",
    },
    mr: {
      badge: "स्वयंचलित पॉलिमर गुणवत्ता हमी",
      model: "YOLOv8 व्हिजन",
      line1: "प्लास्टिक गियर पृष्ठभाग",
      highlight: "दोष निदान व तपासणी",
      subtitle:
        "इंजेक्शन-मोल्डेड गियर घटकांवरील पृष्ठभागावरील दोषांची अचूक तपासणी आणि प्रक्रिया सुधारणेसाठी तज्ज्ञ अभियांत्रिकी उपाय.",
      ctaPrimary: "गियर इमेज तपासा",
      ctaSecondary: "दोष कॅटलॉग (16 प्रकार)",
      stat1Val: "16 प्रकार",
      stat1Lbl: "संपूर्ण दोष ज्ञानकोश",
      stat2Val: "AI डिटेक्शन",
      stat2Lbl: "अचूक YOLO मॉडेल",
      stat3Val: "लोकलायझेशन",
      stat3Lbl: "अचूक बाउंडिंग बॉक्सेस",
      stat4Val: "दुरुस्ती उपाय",
      stat4Lbl: "प्रक्रिया दुरुस्ती मार्गदर्शक",
    },
    gu: {
      badge: "સ્વચાલિત પોલિમર ગુણવત્તા ખાતરી",
      model: "YOLOv8 વિઝન",
      line1: "પ્લાસ્ટિક ગિયર સપાટી",
      highlight: "ખામી નિદાન અને તપાસ",
      subtitle:
        "ઇન્જેક્શન-મોલ્ડેડ ગિયર ઘટકો પર સપાટીની ખામીઓની ઉચ્ચ-ચોકસાઇ તપાસ અને પ્રક્રિયા સુધારવા માટે નિષ્ણાત ઇજનેરી ઉપાયો.",
      ctaPrimary: "ગિયર ઇમેજ તપાસો",
      ctaSecondary: "ખામી કેટલોગ (16 પ્રકારો)",
      stat1Val: "16 વર્ગો",
      stat1Lbl: "સંપૂર્ણ ખામી કેટલોગ",
      stat2Val: "AI ડિટેક્શન",
      stat2Lbl: "હાઇ-ચોકસાઇ YOLO",
      stat3Val: "લોકલાઇઝેશન",
      stat3Lbl: "ચોક્કસ બાઉન્ડિંગ બોક્સ",
      stat4Val: "સુધારાઓ",
      stat4Lbl: "પ્રક્રિયા સુધારણા માર્ગદર્શિકા",
    },
  };

  const current = heroLabels[language] || heroLabels.en;

  const scrollToCatalog = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.54), rgba(255, 255, 255, 0.62)), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="hero-mesh-background" />

      <div className="hero-content">
        {/* Restrained Technical Kicker */}
        <div className="hero-kicker">
          <span className="hero-kicker-dot" />
          <span>{current.badge}</span>
          <span className="hero-kicker-sep">/</span>
          <span className="hero-kicker-model">{current.model}</span>
        </div>

        {/* High-Impact Heading with 'Defect Diagnosis' as main focus */}
        <h1 className="hero-title">
          <span className="hero-title-prefix">{current.line1}</span>
          <span className="hero-title-highlight">{current.highlight}</span>
        </h1>

        {/* Balanced Subtitle */}
        <p className="hero-subtitle">{current.subtitle}</p>

        {/* Clean CTA Actions */}
        <div className="hero-actions">
          <button className="hero-btn-primary" onClick={onStartAnalysis}>
            <ScanLine size={16} />
            <span>{current.ctaPrimary}</span>
            <ArrowRight size={15} className="hero-btn-arrow" />
          </button>
          <button className="hero-btn-secondary" onClick={scrollToCatalog}>
            <Layers size={15} />
            <span>{current.ctaSecondary}</span>
          </button>
        </div>

        {/* Clean Feature Highlights Row — Open layout, no enclosing box container */}
        <div className="hero-features-strip">
          <div className="hero-feature-item">
            <Settings2 size={17} className="hero-feature-icon" />
            <div className="hero-feature-text">
              <span className="hero-feature-val">{current.stat1Val}</span>
              <span className="hero-feature-lbl">{current.stat1Lbl}</span>
            </div>
          </div>

          <div className="hero-feature-sep" />

          <div className="hero-feature-item">
            <Zap size={17} className="hero-feature-icon" />
            <div className="hero-feature-text">
              <span className="hero-feature-val">{current.stat2Val}</span>
              <span className="hero-feature-lbl">{current.stat2Lbl}</span>
            </div>
          </div>

          <div className="hero-feature-sep" />

          <div className="hero-feature-item">
            <ScanSearch size={17} className="hero-feature-icon" />
            <div className="hero-feature-text">
              <span className="hero-feature-val">{current.stat3Val}</span>
              <span className="hero-feature-lbl">{current.stat3Lbl}</span>
            </div>
          </div>

          <div className="hero-feature-sep" />

          <div className="hero-feature-item">
            <Wrench size={17} className="hero-feature-icon" />
            <div className="hero-feature-text">
              <span className="hero-feature-val">{current.stat4Val}</span>
              <span className="hero-feature-lbl">{current.stat4Lbl}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
