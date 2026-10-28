import { List, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { AudioSpeakButton } from "./AudioSpeakButton";
import { getSpokenDefectName, cleanTextForSpeech } from "../utils/speechNarrator";

export function DetectionTable({ detections }) {
  if (!detections || detections.length === 0) return null;

  const { getDefectText, ui, language } = useLanguage();

  // Group detections by defect class so multiple instances of the same defect
  // are consolidated into one row with total occurrence count and peak confidence
  const groupedMap = new Map();
  detections.forEach((det) => {
    const key = (det.defect || "unknown").toLowerCase();
    if (!groupedMap.has(key)) {
      groupedMap.set(key, {
        defect: det.defect,
        count: 1,
        confidences: det.confidence != null ? [det.confidence] : [],
        possible_cause: det.possible_cause,
        suggested_action: det.suggested_action,
      });
    } else {
      const entry = groupedMap.get(key);
      entry.count += 1;
      if (det.confidence != null) {
        entry.confidences.push(det.confidence);
      }
    }
  });

  const groupedList = Array.from(groupedMap.values())
    .map((item) => {
      const maxConf = item.confidences.length > 0 ? Math.max(...item.confidences) : 0;
      const minConf = item.confidences.length > 0 ? Math.min(...item.confidences) : 0;
      return {
        ...item,
        maxConf,
        minConf,
      };
    })
    .sort((a, b) => b.maxConf - a.maxConf);

  return (
    <section className="section">
      {/* Open Typographic Section Header */}
      <div className="section-head">
        <div>
          <div className="section-eyebrow">
            <span className="section-eyebrow-dot"></span>
            {ui?.module_breakdown || "03 / DEFECT BREAKDOWN"}
          </div>
          <h2 className="section-title">{ui.detected_defects || "Identified Defect Instances"}</h2>
          <p className="section-subtitle">
            {ui.defect_summary || "Multi-instance breakdown with confidence distributions and immediate corrective guidelines"}
          </p>
        </div>
        <div className="section-head-aside">
          <span className="section-status-pill">
            <span className="status-live-dot" />
            <span>{groupedList.length} {groupedList.length === 1 ? (ui?.instance ? `${ui.instance} Type` : "Defect Type") : (ui?.instances ? `${ui.instances} Types` : "Defect Types")}</span>
          </span>
        </div>
      </div>

      <div className="table-card">
        <div className="table-scroll">
          <table className="defect-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Defect</th>
                <th>Count</th>
                <th>Confidence</th>
                <th>{ui.possible_cause}</th>
                <th>{ui.suggested_action}</th>
              </tr>
            </thead>
            <tbody>
              {groupedList.map((item, idx) => {
                const confValue = item.maxConf * 100;
                const confFormatted = confValue.toFixed(2) + "%";
                const isMulti = item.count > 1;
                const transText = getDefectText(item.defect, item.possible_cause, item.suggested_action);
                const spokenDefect = getSpokenDefectName(item.defect, language);
                const roundedConf = Math.round(confValue);

                const rowDefectSpeech = cleanTextForSpeech(
                  language === "hi"
                    ? `${spokenDefect}। कुल ${item.count} बार पहचाना गया। अधिकतम सटीकता ${roundedConf} प्रतिशत।`
                    : language === "mr"
                    ? `${spokenDefect}. एकूण ${item.count} वेळा आढळला. कमाल अचूकता ${roundedConf} टक्के.`
                    : `${capitalise(item.defect || "Defect")}. Detected ${item.count} ${item.count === 1 ? "time" : "times"} with peak confidence of ${roundedConf} percent.`,
                  language
                );

                const rowCauseSpeech = cleanTextForSpeech(
                  language === "hi"
                    ? `${spokenDefect} का संभावित कारण: ${transText.cause}`
                    : language === "mr"
                    ? `${spokenDefect}चे संभाव्य कारण: ${transText.cause}`
                    : `${capitalise(item.defect)}. Possible root cause: ${transText.cause}`,
                  language
                );

                const rowActionSpeech = cleanTextForSpeech(
                  language === "hi"
                    ? `${spokenDefect} के लिए अनुशंसित सुधार: ${transText.action}`
                    : language === "mr"
                    ? `${spokenDefect}साठी शिफारस केलेली कृती: ${transText.action}`
                    : `${capitalise(item.defect)}. Recommended action: ${transText.action}`,
                  language
                );

                return (
                  <tr key={idx}>
                    <td className="table-idx">{idx + 1}</td>
                    <td className="table-defect">
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span className="defect-tag">{capitalise(item.defect || "—")}</span>
                        <AudioSpeakButton
                          text={rowDefectSpeech}
                          langCode={language}
                          size="sm"
                          title={`Listen to ${capitalise(item.defect)} detection details`}
                        />
                      </div>
                    </td>
                    <td>
                      <span className={`table-count-badge ${isMulti ? "table-count-badge--multi" : ""}`}>
                        {item.count} {item.count === 1 ? "Instance" : "Instances"}
                      </span>
                    </td>
                    <td>
                      <div className="conf-cell-multi">
                        {item.confidences
                          .slice()
                          .sort((a, b) => b - a)
                          .map((conf, cIdx) => {
                            const val = conf * 100;
                            const badgeClass =
                              val >= 80
                                ? "conf-badge--high"
                                : val >= 50
                                ? "conf-badge--mid"
                                : "conf-badge--low";

                            return (
                              <div key={cIdx} className="conf-score-row">
                                {isMulti && (
                                  <span className="conf-score-tag">#{cIdx + 1}</span>
                                )}
                                <span className={`conf-badge ${badgeClass}`}>
                                  {val.toFixed(2)}%
                                </span>
                                <div className="conf-bar-wrap conf-bar-wrap--sm">
                                  <div
                                    className="conf-bar-fill"
                                    style={{ width: `${Math.min(val, 100)}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </td>
                    <td className="table-cause">
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                        <div style={{ whiteSpace: "pre-line", lineHeight: 1.55 }}>{transText.cause || "—"}</div>
                        <AudioSpeakButton
                          text={rowCauseSpeech}
                          langCode={language}
                          size="sm"
                          title="Listen to possible root causes"
                        />
                      </div>
                    </td>
                    <td className="table-action">
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                        <div style={{ whiteSpace: "pre-line", lineHeight: 1.55 }}>{transText.action || "—"}</div>
                        <AudioSpeakButton
                          text={rowActionSpeech}
                          langCode={language}
                          size="sm"
                          title="Listen to recommended actions"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function capitalise(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
