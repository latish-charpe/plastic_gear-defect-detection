import { Info, Wrench, AlertCircle, Sliders, Hammer, ShieldAlert } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { AudioSpeakButton } from "./AudioSpeakButton";
import {
  buildConciseInspectionNarration,
  getSpokenDefectName,
  cleanTextForSpeech
} from "../utils/speechNarrator";

function formatPoint(rawPoint) {
  if (!rawPoint) return { title: null, desc: "" };
  const clean = rawPoint.replace(/^[•\-\*\d+\.]\s*/, "").trim();
  const colonIndex = clean.indexOf(":");
  if (colonIndex > 0 && colonIndex < 45) {
    return {
      title: clean.substring(0, colonIndex).trim(),
      desc: clean.substring(colonIndex + 1).trim(),
    };
  }
  return { title: null, desc: clean };
}

function parsePoints(items) {
  if (!items) return [];
  if (Array.isArray(items)) return items.map(formatPoint);
  if (typeof items === "string") {
    let rawList = [];
    if (items.includes("•")) {
      rawList = items.split("•").map((s) => s.trim()).filter(Boolean);
    } else if (items.includes("\n")) {
      rawList = items.split("\n").map((s) => s.trim()).filter(Boolean);
    } else {
      const sentences = items.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
      rawList = sentences.length > 1 ? sentences : [items];
    }
    return rawList.map(formatPoint);
  }
  return [];
}

export function ProcessCorrection({ result }) {
  if (!result || result.total_detections === 0) return null;

  const { getDefectText, ui, language } = useLanguage();

  const defectName = result.main_defect
    ? result.main_defect.charAt(0).toUpperCase() + result.main_defect.slice(1)
    : "—";

  const defectInfo = getDefectText(
    result.main_defect,
    result.main_possible_cause,
    result.main_suggested_action
  );

  // Root causes points
  const rootCausesList =
    defectInfo.rootCauses && defectInfo.rootCauses.length > 0
      ? defectInfo.rootCauses
      : defectInfo.detailedCause || defectInfo.cause;
  const rootCauses = parsePoints(rootCausesList);

  // Process parameter adjustments points
  const processAdjList =
    defectInfo.processAdjustments && defectInfo.processAdjustments.length > 0
      ? defectInfo.processAdjustments
      : [];
  const processAdjustments = parsePoints(processAdjList);

  // Practical & tooling remedies points
  const toolingRemList =
    defectInfo.toolingRemedies && defectInfo.toolingRemedies.length > 0
      ? defectInfo.toolingRemedies
      : defectInfo.detailedAction || defectInfo.action;
  const toolingRemedies = parsePoints(toolingRemList);

  // Fallback combined action if sub-lists are empty
  const hasSubCategories = processAdjustments.length > 0 && toolingRemedies.length > 0;

  // Total occurrences of main defect
  const mainCount = (result.detections || []).filter(
    (d) => (d.defect || "").toLowerCase() === (result.main_defect || "").toLowerCase()
  ).length;

  // Distinct other detections
  const otherDefectsMap = new Map();
  (result.detections || []).forEach((det) => {
    const key = (det.defect || "").toLowerCase();
    if (key && key !== (result.main_defect || "").toLowerCase()) {
      if (!otherDefectsMap.has(key)) {
        otherDefectsMap.set(key, {
          defect: det.defect,
          count: 1,
          maxConf: det.confidence != null ? det.confidence : 0,
          possible_cause: det.possible_cause,
          suggested_action: det.suggested_action,
        });
      } else {
        const item = otherDefectsMap.get(key);
        item.count += 1;
        if (det.confidence != null && det.confidence > item.maxConf) {
          item.maxConf = det.confidence;
        }
      }
    }
  });
  const otherDefects = Array.from(otherDefectsMap.values()).sort(
    (a, b) => b.maxConf - a.maxConf
  );

  const spokenDefect = getSpokenDefectName(defectName, language);

  const fullReportSpeech = buildConciseInspectionNarration({
    defectName: result.main_defect,
    confidence: result.overall_confidence || result.detections?.[0]?.confidence,
    defectCount: mainCount || 1,
    rootCauses,
    processAdjustments,
    toolingRemedies,
    lang: language,
  });

  const rootCausesSpeech = cleanTextForSpeech(
    language === "hi"
      ? `${spokenDefect} का मुख्य संभावित कारण: ${rootCauses.map((p) => p.desc).join(". ")}`
      : language === "mr"
      ? `${spokenDefect}चे संभाव्य मुख्य कारण: ${rootCauses.map((p) => p.desc).join(". ")}`
      : `Possible root causes for ${spokenDefect}: ${rootCauses.map((p) => p.desc).join(". ")}`,
    language
  );

  const processSpeech = cleanTextForSpeech(
    language === "hi"
      ? `${spokenDefect} के लिए अनुशंसित प्रक्रिया सुधार: ${processAdjustments.map((p) => p.desc).join(". ")}`
      : language === "mr"
      ? `${spokenDefect}साठी प्रक्रिया सुधारणा: ${processAdjustments.map((p) => p.desc).join(". ")}`
      : `Recommended process parameter adjustments for ${spokenDefect}: ${processAdjustments.map((p) => p.desc).join(". ")}`,
    language
  );

  const toolingSpeech = cleanTextForSpeech(
    language === "hi"
      ? `${spokenDefect} के लिए टूलींग सुधार उपाय: ${toolingRemedies.map((p) => p.desc).join(". ")}`
      : language === "mr"
      ? `${spokenDefect}साठी टूलींग उपाय: ${toolingRemedies.map((p) => p.desc).join(". ")}`
      : `Tooling and maintenance remedies for ${spokenDefect}: ${toolingRemedies.map((p) => p.desc).join(". ")}`,
    language
  );

  return (
    <section className="section correction-clean-section">
      {/* Open Typographic Section Header */}
      <div className="section-head">
        <div>
          <div className="section-eyebrow">
            <span className="section-eyebrow-dot"></span>
            {ui?.module_correction || "04 / PROCESS CORRECTION"}
          </div>
          <div className="section-title-row">
            <h2 className="section-title">{ui?.remedies_heading || "Process Correction & Remedies"}</h2>
            <span className="correction-defect-pill">
              {defectName}
              {mainCount > 1 ? ` (${mainCount}× detected)` : ""}
            </span>
          </div>
          <p className="section-subtitle">
            {defectInfo.description || `Engineering root causes and corrections for ${defectName}`}
          </p>
        </div>
        <div className="section-head-aside" style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <AudioSpeakButton
            text={fullReportSpeech}
            langCode={language}
            variant="pill"
            label={language === "hi" ? "AI रिपोर्ट सुनें" : language === "mr" ? "AI अहवाल ऐका" : "Listen to AI Report"}
          />
          <span className="section-status-pill">
            <span className="status-live-dot" />
            <span>ENGINEERING GUIDE</span>
          </span>
        </div>
      </div>

      {/* 3-Pillar Engineering Layout */}
      {hasSubCategories ? (
        <div className="correction-tri-grid">
          {/* Card 1: Root Causes */}
          <div className="correction-pillar-card">
            <div className="correction-card-header">
              <div className="correction-card-title-group">
                <div className="correction-header-icon-pod correction-icon--cause">
                  <AlertCircle size={15} />
                </div>
                <div>
                  <h3 className="correction-card-title">
                    {ui.possible_cause || "Root Causes"}
                  </h3>
                  <span className="correction-card-subtitle">
                    {rootCauses.length} Identified Triggers
                  </span>
                </div>
              </div>
              <AudioSpeakButton
                text={rootCausesSpeech}
                langCode={language}
                size="sm"
                title="Listen to root causes"
              />
            </div>

            <div className="correction-items-list">
              {rootCauses.map((item, idx) => (
                <div key={idx} className="correction-item correction-item--cause">
                  <span className="correction-item-num correction-num--cause">{idx + 1}</span>
                  <div className="correction-item-text">
                    {item.title && (
                      <strong className="correction-item-title">{item.title}: </strong>
                    )}
                    <span>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Process Parameter Adjustments */}
          <div className="correction-pillar-card">
            <div className="correction-card-header">
              <div className="correction-card-title-group">
                <div className="correction-header-icon-pod correction-icon--proc">
                  <Sliders size={15} />
                </div>
                <div>
                  <h3 className="correction-card-title">
                    {ui.process_adjustments || "Process Adjustments"}
                  </h3>
                  <span className="correction-card-subtitle">
                    {processAdjustments.length} Machine Parameter Tweaks
                  </span>
                </div>
              </div>
              <AudioSpeakButton
                text={processSpeech}
                langCode={language}
                size="sm"
                title="Listen to process parameter adjustments"
              />
            </div>

            <div className="correction-items-list">
              {processAdjustments.map((item, idx) => (
                <div key={idx} className="correction-item correction-item--proc">
                  <span className="correction-item-num correction-num--proc">{idx + 1}</span>
                  <div className="correction-item-text">
                    {item.title && (
                      <strong className="correction-item-title">{item.title}: </strong>
                    )}
                    <span>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Practical & Tooling Remedies */}
          <div className="correction-pillar-card">
            <div className="correction-card-header">
              <div className="correction-card-title-group">
                <div className="correction-header-icon-pod correction-icon--tool">
                  <Hammer size={15} />
                </div>
                <div>
                  <h3 className="correction-card-title">
                    {ui.tooling_remedies || "Tooling & Mold Remedies"}
                  </h3>
                  <span className="correction-card-subtitle">
                    {toolingRemedies.length} Maintenance Actions
                  </span>
                </div>
              </div>
              <AudioSpeakButton
                text={toolingSpeech}
                langCode={language}
                size="sm"
                title="Listen to tooling and mold remedies"
              />
            </div>

            <div className="correction-items-list">
              {toolingRemedies.map((item, idx) => (
                <div key={idx} className="correction-item correction-item--tool">
                  <span className="correction-item-num correction-num--tool">{idx + 1}</span>
                  <div className="correction-item-text">
                    {item.title && (
                      <strong className="correction-item-title">{item.title}: </strong>
                    )}
                    <span>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Fallback 2-Column Grid */
        <div className="correction-dual-grid">
          <div className="correction-pillar-card">
            <div className="correction-card-header">
              <div className="correction-card-title-group">
                <div className="correction-header-icon-pod correction-icon--cause">
                  <AlertCircle size={15} />
                </div>
                <div>
                  <h3 className="correction-card-title">
                    {ui.possible_cause || "Root Causes"}
                  </h3>
                  <span className="correction-card-subtitle">
                    {rootCauses.length} Identified Triggers
                  </span>
                </div>
              </div>
              <AudioSpeakButton
                text={rootCausesSpeech}
                langCode={language}
                size="sm"
                title="Listen to root causes"
              />
            </div>

            <div className="correction-items-list">
              {rootCauses.map((item, idx) => (
                <div key={idx} className="correction-item correction-item--cause">
                  <span className="correction-item-num correction-num--cause">{idx + 1}</span>
                  <div className="correction-item-text">
                    {item.title && (
                      <strong className="correction-item-title">{item.title}: </strong>
                    )}
                    <span>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="correction-pillar-card">
            <div className="correction-card-header">
              <div className="correction-card-title-group">
                <div className="correction-header-icon-pod correction-icon--tool">
                  <Hammer size={15} />
                </div>
                <div>
                  <h3 className="correction-card-title">
                    {ui.suggested_action || "Suggested Remedies"}
                  </h3>
                  <span className="correction-card-subtitle">
                    {toolingRemedies.length} Corrective Steps
                  </span>
                </div>
              </div>
              <AudioSpeakButton
                text={toolingSpeech}
                langCode={language}
                size="sm"
                title="Listen to tooling remedies"
              />
            </div>

            <div className="correction-items-list">
              {toolingRemedies.map((item, idx) => (
                <div key={idx} className="correction-item correction-item--tool">
                  <span className="correction-item-num correction-num--tool">{idx + 1}</span>
                  <div className="correction-item-text">
                    {item.title && (
                      <strong className="correction-item-title">{item.title}: </strong>
                    )}
                    <span>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Safety & Engineering Disclaimer Strip */}
      <div className="correction-disclaimer-strip">
        <div className="correction-disclaimer-icon">
          <Info size={16} />
        </div>
        <p className="correction-disclaimer-text">
          These are engineering recommendations for <strong>{defectName}</strong>
          {mainCount > 1 ? ` (${mainCount} instances detected on this component)` : ""}.
          {" "}Always verify machine safety interlocks before adjusting mechanical or hydraulic tooling parameters.
        </p>
      </div>

      {/* Additional distinct detections */}
      {otherDefects.length > 0 && (
        <div className="ref-secondary-card">
          <div className="ref-secondary-title">
            <AlertCircle size={14} style={{ marginRight: 6 }} />
            {ui.other_detections}
          </div>
          <div className="ref-secondary-list">
            {otherDefects.map((det, i) => {
              const transOther = getDefectText(det.defect, det.possible_cause, det.suggested_action);
              return (
                <div key={i} className="ref-secondary-row" style={{ alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 120 }}>
                    <span className="defect-tag">{capitalise(det.defect)}</span>
                    {det.count > 1 && (
                      <span className="table-count-badge table-count-badge--multi">
                        {det.count}×
                      </span>
                    )}
                  </div>
                  <span className="ref-secondary-conf" style={{ minWidth: 60 }}>
                    {det.maxConf != null ? (det.maxConf * 100).toFixed(1) + "%" : "—"}
                  </span>
                  <div style={{ flex: 1, fontSize: "13px", color: "var(--text-dark)", lineHeight: 1.5 }}>
                    {transOther.action || "—"}
                  </div>
                  <AudioSpeakButton
                    text={`${capitalise(det.defect)}. ${transOther.action}`}
                    langCode={language}
                    size="sm"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

function capitalise(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
