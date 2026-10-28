import { useMemo, useEffect } from "react";
import { 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  Wrench
} from "lucide-react";
import { DEFECT_KNOWLEDGE_BASE, getDefectKnowledge } from "../constants/defectKnowledge";
import { useLanguage } from "../context/LanguageContext";
import { AudioSpeakButton } from "./AudioSpeakButton";

export function DefectDetailPage({ defectId, onBack, onSelectDefect, onGoToInspection }) {
  const { language, ui } = useLanguage();

  const defectData = useMemo(() => {
    return getDefectKnowledge(defectId || "broken", language);
  }, [defectId, language]);

  // Scroll to top when defect changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [defectId]);

  if (!defectData) return null;

  // Find previous and next defect for sequential navigation
  const currentIndex = DEFECT_KNOWLEDGE_BASE.findIndex(d => d.id === defectData.id);
  const prevDefect = currentIndex > 0 ? DEFECT_KNOWLEDGE_BASE[currentIndex - 1] : null;
  const nextDefect = currentIndex < DEFECT_KNOWLEDGE_BASE.length - 1 ? DEFECT_KNOWLEDGE_BASE[currentIndex + 1] : null;

  const separator = language === "hi" ? "। " : ". ";

  const sectionTitles = {
    en: {
      causes: "DETAILED ROOT CAUSES",
      avoid: "HOW TO AVOID & REMEDIES",
      descTitle: "DEFECT DEFINITION & SYMPTOMS",
      quickBrowse: "Explore Other Gear Defect Classes",
      backBtn: "Back to Catalog",
      inspectionBtn: "Inspect Gear Image",
      step: "Cause",
      remedy: "Action",
    },
    hi: {
      causes: "विस्तृत मूल कारण",
      avoid: "रोकथाम और उपाय",
      descTitle: "दोष परिभाषा एवं लक्षण",
      quickBrowse: "अन्य गियर दोष देखें",
      backBtn: "कैटलॉग पर वापस जाएं",
      inspectionBtn: "गियर छवि की जांच करें",
      step: "कारण",
      remedy: "उपाय",
    },
    mr: {
      causes: "तपशीलवार मूळ कारणे",
      avoid: "कसे टाळावे आणि उपाय",
      descTitle: "दोष व्याख्या आणि लक्षणे",
      quickBrowse: "इतर गियर दोष पहा",
      backBtn: "कॅटलॉगवर परत जा",
      inspectionBtn: "गियर तपासणी करा",
      step: "कारण",
      remedy: "उपाय",
    },
    gu: {
      causes: "વિગતવાર મૂળ કારણો",
      avoid: "કેવી રીતે બચવું અને ઉપાયો",
      descTitle: "ખામીની વ્યાખ્યા અને લક્ષણો",
      quickBrowse: "અન્ય ગિયર ખામીઓ જુઓ",
      backBtn: "કેટલોગ પર પાછા જાઓ",
      inspectionBtn: "ગિયર ઇન્સ્પેક્શન કરો",
      step: "કારણ",
      remedy: "ઉપાય",
    },
  };

  const t = sectionTitles[language] || sectionTitles.en;

  // Pure speech title (without English in parentheses if language is not English)
  const cleanSpeechName = language === "en"
    ? defectData.name
    : (defectData.name || "").replace(/\s*\([A-Za-z0-9\s&_\-—/]+\)/g, "").trim();

  const descSpeech = `${cleanSpeechName}${language === "hi" ? "।" : "."} ${t.descTitle}: ${defectData.description}`;
  const causesSpeech = `${cleanSpeechName}${language === "hi" ? "।" : "."} ${t.causes}: ${defectData.causes.join(separator)}`;
  const avoidSpeech = `${cleanSpeechName}${language === "hi" ? "।" : "."} ${t.avoid}: ${defectData.avoid.join(separator)}`;

  return (
    <div className="defect-detail-page">
      {/* Top Header / Breadcrumbs */}
      <div className="defect-detail-nav">
        <button 
          onClick={onBack}
          className="btn-secondary defect-detail-back-btn"
          aria-label="Back to Catalog"
        >
          <ArrowLeft size={16} style={{ marginRight: 6 }} />
          <span>{t.backBtn}</span>
        </button>

        <div className="defect-detail-nav-actions">
          {prevDefect && (
            <button 
              onClick={() => onSelectDefect(prevDefect.id)}
              className="btn-ghost defect-nav-arrow"
              title={`Previous: ${prevDefect.name}`}
            >
              <ChevronLeft size={16} />
              <span className="defect-nav-text">{prevDefect.name}</span>
            </button>
          )}

          {nextDefect && (
            <button 
              onClick={() => onSelectDefect(nextDefect.id)}
              className="btn-ghost defect-nav-arrow"
              title={`Next: ${nextDefect.name}`}
            >
              <span className="defect-nav-text">{nextDefect.name}</span>
              <ChevronRight size={16} />
            </button>
          )}

          <button
            onClick={onGoToInspection}
            className="btn-primary defect-nav-inspect-btn"
          >
            <Sparkles size={14} style={{ marginRight: 6 }} />
            <span>{t.inspectionBtn}</span>
          </button>
        </div>
      </div>

      {/* Main Defect Hero Card */}
      <div 
        className="defect-hero-card"
        style={{ borderTop: `4px solid ${defectData.accentColor}` }}
      >
        <div className="defect-hero-header">
          <div className="defect-hero-title-group">
            <div 
              className="defect-hero-dot" 
              style={{ backgroundColor: defectData.accentColor }} 
            />
            <div>
              <div className="defect-hero-category">{defectData.category}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <h1 className="defect-hero-title" style={{ marginBottom: 0 }}>{defectData.name}</h1>
                <AudioSpeakButton
                  text={cleanSpeechName}
                  langCode={language}
                  size="sm"
                />
              </div>
            </div>
          </div>

          <div className="defect-hero-audio-wrap">
            <AudioSpeakButton
              text={defectData.narrationText}
              langCode={language}
              size="normal"
            />
          </div>
        </div>

        {/* Description Banner */}
        <div className="defect-description-banner">
          <div className="defect-desc-header">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <HelpCircle size={16} style={{ color: defectData.accentColor }} />
              <span className="defect-desc-heading">{t.descTitle}</span>
            </div>
            <AudioSpeakButton
              text={descSpeech}
              langCode={language}
              size="sm"
            />
          </div>
          <p className="defect-desc-paragraph">{defectData.description}</p>
        </div>
      </div>

      {/* 2-Column Deep Knowledge Grid: Causes & How to Avoid */}
      <div className="defect-details-grid">
        {/* Column 1: Detailed Root Causes */}
        <div className="defect-card-column defect-card-column--cause">
          <div className="defect-column-header">
            <div className="defect-column-title-wrap">
              <div className="defect-column-icon defect-column-icon--cause">
                <AlertCircle size={18} />
              </div>
              <div>
                <h2 className="defect-column-title">{t.causes}</h2>
                <span className="defect-column-count">{defectData.causes.length} physical factors</span>
              </div>
            </div>
            <AudioSpeakButton text={causesSpeech} langCode={language} size="sm" />
          </div>

          <div className="defect-points-container">
            {defectData.causes.map((cause, idx) => (
              <div key={idx} className="defect-point-card defect-point-card--cause">
                <span className="defect-point-num defect-point-num--cause">{idx + 1}</span>
                <p className="defect-point-text">{cause}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: How to Avoid & Tooling Remedies */}
        <div className="defect-card-column defect-card-column--avoid">
          <div className="defect-column-header">
            <div className="defect-column-title-wrap">
              <div className="defect-column-icon defect-column-icon--avoid">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h2 className="defect-column-title">{t.avoid}</h2>
                <span className="defect-column-count">{defectData.avoid.length} corrective actions</span>
              </div>
            </div>
            <AudioSpeakButton text={avoidSpeech} langCode={language} size="sm" />
          </div>

          <div className="defect-points-container">
            {defectData.avoid.map((action, idx) => (
              <div key={idx} className="defect-point-card defect-point-card--avoid">
                <span className="defect-point-num defect-point-num--avoid">{idx + 1}</span>
                <p className="defect-point-text">{action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Defect Quick-Browse Strip */}
      <div className="defect-quick-browse-section">
        <div className="quick-browse-header">
          <Layers size={17} style={{ color: "var(--teal)" }} />
          <h3>{t.quickBrowse}</h3>
        </div>

        <div className="defect-strip-grid">
          {DEFECT_KNOWLEDGE_BASE.map((item) => {
            const isCurrent = item.id === defectData.id;
            const trName = item.translations[language]?.name || item.name;
            return (
              <button
                key={item.id}
                onClick={() => onSelectDefect(item.id)}
                className={`defect-strip-pill ${isCurrent ? "defect-strip-pill--active" : ""}`}
                style={{
                  "--pill-color": item.accentColor,
                  borderLeftColor: item.accentColor
                }}
              >
                <span 
                  className="defect-strip-indicator" 
                  style={{ backgroundColor: item.accentColor }} 
                />
                <span className="defect-strip-name">{trName}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
