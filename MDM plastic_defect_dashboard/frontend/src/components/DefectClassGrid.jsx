import { useState, useMemo } from "react";
import {
  Search,
  Layers,
  ChevronRight,
  X,
  AlertTriangle,
  Maximize2,
  Flame,
  Wrench,
  Crosshair,
  Sparkles,
  Zap,
  Waves,
  Activity,
  AlertCircle,
  Droplets,
  Target,
  RotateCcw,
  Gauge,
  CircleDot,
  Sun,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import { DEFECT_CLASSES } from "../constants/defectData";
import { getDefectKnowledge } from "../constants/defectKnowledge";
import { useLanguage } from "../context/LanguageContext";

const DEFECT_ICONS = {
  broken: AlertTriangle,
  bulge: Maximize2,
  burn: Flame,
  damage: Wrench,
  darkspot: Crosshair,
  dirt: Sparkles,
  flash: Zap,
  flow: Waves,
  hair: Activity,
  missing: AlertCircle,
  overflow: Droplets,
  perforation: Target,
  reverse: RotateCcw,
  shortshot: Gauge,
  void: CircleDot,
  white: Sun,
};

export function DefectClassGrid({ onSelectDefect }) {
  const [search, setSearch] = useState("");
  const { language } = useLanguage();

  const labels = {
    en: {
      eyebrow: "MODULE 05 • KNOWLEDGE ARCHIVE",
      title: "Defect Knowledge Base & Catalog",
      subtitle:
        "Click any plastic gear defect to view detailed root causes and engineering remedies.",
      searchPlaceholder: "Search defect name or keyword (e.g. Broken, Burn, Flash)...",
      showing: "Showing",
      of: "of",
      defectClasses: "defect classes",
      noResults: "No defect classes match",
      resetSearch: "Clear search",
      aboutTitle: "About This Quality Inspection System",
      aboutDesc:
        "An automated visual quality inspection system for injection-molded plastic gear components. It accurately localizes surface defects using high-precision bounding boxes and matches each defect with domain-expert polymer process corrections to help machine operators maintain zero-defect production.",
      tag1: "Quality Assurance",
      tag2: "Defect Localization",
      tag3: "Polymer Engineering",
      tag4: "Process Optimization",
      tag5: "Injection Molding QC",
    },
    hi: {
      eyebrow: "मॉड्यूल 05 • दोष ज्ञानकोश",
      title: "दोष ज्ञानकोश और कैटलॉग (Defect Catalog)",
      subtitle:
        "विस्तृत मूल कारण और सुधार उपाय देखने के लिए किसी भी दोष पर क्लिक करें।",
      searchPlaceholder: "दोष का नाम खोजें (जैसे: Broken, Burn, Flash)...",
      showing: "प्रदर्शित",
      of: "कुल",
      defectClasses: "दोष श्रेणियां",
      noResults: "कोई परिणाम नहीं मिला:",
      resetSearch: "सर्च साफ़ करें",
      aboutTitle: "इस गुणवत्ता निरीक्षण प्रणाली के बारे में",
      aboutDesc:
        "इंजेक्शन-मोल्डेड प्लास्टिक गियर घटकों के लिए एक स्वचालित दृश्य गुणवत्ता निरीक्षण प्रणाली। यह सतह के दोषों को सटीक रूप से पहचानती है और ऑपरेटरों को शून्य-दोष उत्पादन के लिए विशेषज्ञ प्रक्रिया सुधार प्रदान करती है।",
      tag1: "गुणवत्ता आश्वासन",
      tag2: "दोष पहचान",
      tag3: "पॉलिमर इंजीनियरिंग",
      tag4: "प्रक्रिया अनुकूलन",
      tag5: "इंजेक्शन मोल्डिंग क्यूसी",
    },
    mr: {
      eyebrow: "मॉड्यूल 05 • दोष ज्ञानकोश",
      title: "दोष माहिती ज्ञानकोश व कॅटलॉग (Defect Catalog)",
      subtitle:
        "तपशीलवार मूळ कारणे आणि दुरुस्ती उपाय पाहण्यासाठी कोणत्याही दोषावर क्लिक करा.",
      searchPlaceholder: "दोषाचे नाव शोधा (उदा. Broken, Burn, Flash)...",
      showing: "दर्शवित आहे",
      of: "पैकी",
      defectClasses: "दोष प्रकार",
      noResults: "कोणताही दोष आढळला नाही:",
      resetSearch: "शोध साफ करा",
      aboutTitle: "या गुणवत्ता तपासणी प्रणालीबद्दल",
      aboutDesc:
        "इंजेक्शन-मोल्डेड प्लास्टिक गियर घटकांसाठी स्वयंचलित गुणवत्ता तपासणी प्रणाली. हे पृष्ठभागावरील दोष शोधते आणि ऑपरेटरना शून्य-दोष उत्पादन राखण्यास मदत करते.",
      tag1: "गुणवत्ता हमी",
      tag2: "दोष ओळख",
      tag3: "पॉलिमर अभियांत्रिकी",
      tag4: "प्रक्रिया ऑप्टिमायझेशन",
      tag5: "मोल्डिंग क्यूसी",
    },
    gu: {
      eyebrow: "મોડ્યુલ 05 • ખામી જ્ઞાનકોશ",
      title: "ખામી જ્ઞાનકોશ અને કેટલોગ (Defect Catalog)",
      subtitle:
        "વિગતવાર મૂળ કારણો અને ઇજનેરી ઉપાયો જોવા માટે કોઈપણ ખામી પર ક્લિક કરો.",
      searchPlaceholder: "ખામીનું નામ શોધો (દા.ત. Broken, Burn, Flash)...",
      showing: "દર્શાવી રહ્યું છે",
      of: "માંથી",
      defectClasses: "ખામી વર્ગો",
      noResults: "કોઈ પરિણામ મળ્યું નથી:",
      resetSearch: "શોધ સાફ કરો",
      aboutTitle: "આ ગુણવત્તા નિરીક્ષણ સિસ્ટમ વિશે",
      aboutDesc:
        "ઇન્જેક્શન-મોલ્ડેડ પ્લાસ્ટિક ગિયર ઘટકો માટે સ્વચાલિત ગુણવત્તા નિરીક્ષણ સિસ્ટમ. તે સપાટીની ખામીઓને ઓળખીને શૂન્ય-ખામી ઉત્પાદન માટે સુધારાઓ પૂરા પાડે છે.",
      tag1: "ગુણવત્તા ખાતરી",
      tag2: "ખામી સ્થાનીકરણ",
      tag3: "પોલિમર એન્જિનિયરિંગ",
      tag4: "પ્રક્રિયા ઑપ્ટિમાઇઝેશન",
      tag5: "મોલ્ડિંગ ક્યુસી",
    },
  };

  const currentLabels = labels[language] || labels.en;

  const defectList = useMemo(() => {
    return DEFECT_CLASSES.map((defect) => {
      const kData = getDefectKnowledge(defect.id, language);
      const Icon = DEFECT_ICONS[defect.id] || CircleDot;
      return {
        id: defect.id,
        name: kData?.name || defect.name,
        description: kData?.description || defect.description,
        causes: kData?.causes || [],
        Icon,
      };
    });
  }, [language]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return defectList;
    return defectList.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.causes.some((c) => c.toLowerCase().includes(q))
    );
  }, [defectList, search]);

  return (
    <section id="about" className="section defect-catalog-section">
      {/* Open Typographic Section Header */}
      <div className="section-head">
        <div>
          <div className="section-eyebrow">
            <span className="section-eyebrow-dot"></span>
            {currentLabels.eyebrow || "05 / KNOWLEDGE ARCHIVE"}
          </div>
          <h2 className="section-title">{currentLabels.title}</h2>
          <p className="section-subtitle">{currentLabels.subtitle}</p>
        </div>
        <div className="section-head-aside">
          <span className="section-status-pill">
            <span className="status-live-dot" />
            <span>{DEFECT_CLASSES.length} Defect Classes</span>
          </span>
        </div>
      </div>

      {/* Clean, Simple Search Bar */}
      <div className="defect-simple-search-wrap">
        <Search size={16} className="defect-simple-search-icon" />
        <input
          type="text"
          id="defect-search"
          className="defect-simple-search-input"
          placeholder={currentLabels.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search defect classes"
        />
        {search && (
          <button
            className="defect-simple-search-clear"
            onClick={() => setSearch("")}
            aria-label="Clear search"
            title="Clear search"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Count Indicator */}
      <div className="defect-count-row">
        <span>
          {currentLabels.showing} <strong>{filtered.length}</strong> {currentLabels.of}{" "}
          {DEFECT_CLASSES.length} {currentLabels.defectClasses}
        </span>
      </div>

      {/* Clean, Clear 16 Defect Tiles Grid */}
      <div className="defect-simple-grid">
        {filtered.length === 0 ? (
          <div className="defect-simple-empty">
            <p>
              {currentLabels.noResults} "<strong>{search}</strong>"
            </p>
            <button
              className="defect-simple-empty-btn"
              onClick={() => setSearch("")}
            >
              {currentLabels.resetSearch}
            </button>
          </div>
        ) : (
          filtered.map((defect) => {
            const Icon = defect.Icon;
            return (
              <div
                key={defect.id}
                className="defect-simple-tile"
                onClick={() => onSelectDefect && onSelectDefect(defect.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") &&
                  onSelectDefect &&
                  onSelectDefect(defect.id)
                }
                title={`Click to view inspection guide for ${defect.name}`}
              >
                <div className="defect-simple-tile-left">
                  <div className="defect-simple-tile-icon">
                    <Icon size={17} strokeWidth={2} />
                  </div>
                  <span className="defect-simple-tile-name">{defect.name}</span>
                </div>
                <ChevronRight size={17} className="defect-simple-tile-arrow" />
              </div>
            );
          })
        )}
      </div>

      {/* About Box at Bottom */}
      <div className="about-card" id="about-desc">
        <div className="about-card-header">
          <HelpCircle size={18} style={{ color: "var(--accent)" }} />
          <div className="about-card-title">{currentLabels.aboutTitle}</div>
        </div>
        <p className="about-card-text">{currentLabels.aboutDesc}</p>
        <div className="about-tags">
          <span className="about-tag">{currentLabels.tag1}</span>
          <span className="about-tag">{currentLabels.tag2}</span>
          <span className="about-tag">{currentLabels.tag3}</span>
          <span className="about-tag">{currentLabels.tag4}</span>
          <span className="about-tag">{currentLabels.tag5}</span>
        </div>
      </div>
    </section>
  );
}
