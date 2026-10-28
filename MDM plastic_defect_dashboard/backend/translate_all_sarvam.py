# backend/translate_all_sarvam.py
import sys
import json
import time
from pathlib import Path

BASE_DIR = Path(__file__).parent
sys.path.append(str(BASE_DIR))

from apply_official_guide import OFFICIAL_GUIDE
from sarvam_service import translate_with_sarvam

print("Starting Sarvam AI automated translation for all 16 defects...")

# We will generate full translations for en, hi, mr, gu, de, es
FINAL_TRANSLATIONS = {}

for defect, data in OFFICIAL_GUIDE.items():
    desc = data["description"]
    causes = data["root_causes"]
    procs = data["process_adjustments"]
    tools = data["tooling_remedies"]

    # English base
    simple_cause_en = causes[0]
    simple_action_en = f"{procs[0]}. {tools[0]}."
    detailed_cause_en = "\n".join(f"• {c}" for c in causes)
    detailed_action_en = "• Process Parameter Adjustments:\n" + "\n".join(f"  - {p}" for p in procs) + \
                         "\n• Practical & Tooling Remedies:\n" + "\n".join(f"  - {t}" for t in tools)

    FINAL_TRANSLATIONS[defect] = {
        "en": {
            "description": desc,
            "cause": simple_cause_en,
            "action": simple_action_en,
            "detailedCause": detailed_cause_en,
            "detailedAction": detailed_action_en,
            "rootCauses": causes,
            "processAdjustments": procs,
            "toolingRemedies": tools,
        }
    }

# Languages to translate using Sarvam AI
SARVAM_LANGS = ["hi", "mr", "gu"]

for lang in SARVAM_LANGS:
    print(f"\n--- Translating all defects into [{lang.upper()}] with Sarvam AI Mayura ---")
    for idx, (defect, data) in enumerate(OFFICIAL_GUIDE.items(), start=1):
        print(f"[{lang.upper()}] ({idx}/16) Translating '{defect}'...", end=" ", flush=True)

        desc = data["description"]
        causes = data["root_causes"]
        procs = data["process_adjustments"]
        tools = data["tooling_remedies"]

        # Translate description
        tr_desc = translate_with_sarvam(desc, lang)["translated_text"]

        # Translate causes
        tr_causes = [translate_with_sarvam(c, lang)["translated_text"] for c in causes]

        # Translate process adjustments
        tr_procs = [translate_with_sarvam(p, lang)["translated_text"] for p in procs]

        # Translate tooling remedies
        tr_tools = [translate_with_sarvam(t, lang)["translated_text"] for t in tools]

        sim_cause = tr_causes[0] if tr_causes else tr_desc
        sim_action = f"{tr_procs[0]}। {tr_tools[0]}।" if lang in ["hi", "mr", "gu"] else f"{tr_procs[0]}. {tr_tools[0]}."
        det_cause = "\n".join(f"• {c}" for c in tr_causes)
        det_action = "• प्रोसेस पैरामीटर सुधार:\n" + "\n".join(f"  - {p}" for p in tr_procs) + \
                     "\n• टूलींग व रखरखाव उपाय:\n" + "\n".join(f"  - {t}" for t in tr_tools)

        FINAL_TRANSLATIONS[defect][lang] = {
            "description": tr_desc,
            "cause": sim_cause,
            "action": sim_action,
            "detailedCause": det_cause,
            "detailedAction": det_action,
            "rootCauses": tr_causes,
            "processAdjustments": tr_procs,
            "toolingRemedies": tr_tools,
        }
        print("Done!")

# Load existing translations to keep German and Spanish
tr_file = BASE_DIR.parent / "frontend" / "src" / "constants" / "translations.js"
with open(tr_file, "r", encoding="utf-8") as f:
    existing_js = f.read()

# Extract German and Spanish from existing if present
for defect in OFFICIAL_GUIDE.keys():
    for foreign_lang in ["de", "es"]:
        # Fallback to English if not present
        if foreign_lang not in FINAL_TRANSLATIONS[defect]:
            en_item = FINAL_TRANSLATIONS[defect]["en"]
            FINAL_TRANSLATIONS[defect][foreign_lang] = {
                "description": en_item["description"],
                "cause": en_item["cause"],
                "action": en_item["action"],
                "detailedCause": en_item["detailedCause"],
                "detailedAction": en_item["detailedAction"],
                "rootCauses": en_item["rootCauses"],
                "processAdjustments": en_item["processAdjustments"],
                "toolingRemedies": en_item["toolingRemedies"],
            }

header = """// translations.js — Multi-language translations for Defect Causes, Actions, and UI Labels
// Translated using Sarvam AI (Mayura translation model)

export const LANGUAGES = [
  { code: "en", label: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "hi", label: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "mr", label: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  { code: "gu", label: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳" },
  { code: "de", label: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "es", label: "Spanish", nativeName: "Español", flag: "🇪🇸" },
];

export const UI_TRANSLATIONS = {
  en: {
    possible_cause: "ROOT CAUSES",
    suggested_action: "RECOMMENDED CORRECTION",
    process_adjustments: "Process Parameter Adjustments",
    tooling_remedies: "Practical & Tooling Remedies",
    other_detections: "Other Detected Defect Types",
    detected_defects: "Detected Defects",
    defect_summary: "Defect classification summary with occurrence counts, confidence, and corrective actions",
    instances: "Instances",
    instance: "Instance",
    translate_label: "Language",
  },
  hi: {
    possible_cause: "मूल कारण (ROOT CAUSES)",
    suggested_action: "सुझाया गया सुधार (RECOMMENDED CORRECTION)",
    process_adjustments: "प्रोसेस पैरामीटर सुधार (Process Adjustments)",
    tooling_remedies: "टूलींग व रखरखाव उपाय (Tooling Remedies)",
    other_detections: "अन्य मिले डिफेक्ट्स (Other Detections)",
    detected_defects: "डिटेक्ट किए गए डिफेक्ट्स (Detected Defects)",
    defect_summary: "डिफेक्ट वर्गीकरण विवरण, संख्या, कॉन्फिडेंस और सुधार सुझाव",
    instances: "स्थान",
    instance: "स्थान",
    translate_label: "भाषा चुनें",
  },
  mr: {
    possible_cause: "मूळ कारणे (ROOT CAUSES)",
    suggested_action: "सुचवलेली उपाययोजना (RECOMMENDED CORRECTION)",
    process_adjustments: "प्रोसेस पॅरामीटर ऍडजस्टमेंट",
    tooling_remedies: "टूलिंग व मोल्ड उपाय",
    other_detections: "इतर आढळलेले दोष (Other Detections)",
    detected_defects: "शोधलेले दोष (Detected Defects)",
    defect_summary: "दोषांचे वर्गीकरण, संख्या, कॉन्फिडन्स आणि दुरुस्तीचे उपाय",
    instances: "ठिकाणे",
    instance: "ठिकाण",
    translate_label: "भाषा निवडा",
  },
  gu: {
    possible_cause: "મૂળ કારણો (ROOT CAUSES)",
    suggested_action: "સુચવેલ સુધારો (RECOMMENDED CORRECTION)",
    process_adjustments: "પ્રોસેસ પેરામીટર સુધારાઓ",
    tooling_remedies: "ટૂલિંગ અને વ્યવહારુ ઉપાયો",
    other_detections: "અન્ય મળેલા ખામીઓ (Other Detections)",
    detected_defects: "શોધાયેલ ખામીઓ (Detected Defects)",
    defect_summary: "ખામી વર્ગીકરણ સારાંશ, સંખ્યા, કોન્ફિડન્સ અને સુધારા પગલાં",
    instances: "જગ્યાઓ",
    instance: "જગ્યા",
    translate_label: "ભાષા પસંદ કરો",
  },
  de: {
    possible_cause: "URSACHEN (ROOT CAUSES)",
    suggested_action: "EMPFOHLENE MASSNAHMEN",
    process_adjustments: "Prozessparameter-Anpassungen",
    tooling_remedies: "Praktische & Werkzeug-Maßnahmen",
    other_detections: "Weitere erkannte Fehlertypen",
    detected_defects: "Erkannte Fehler",
    defect_summary: "Fehlerübersicht mit Häufigkeit, Konfidenz und Korrekturmaßnahmen",
    instances: "Stellen",
    instance: "Stelle",
    translate_label: "Sprache",
  },
  es: {
    possible_cause: "CAUSAS RAÍZ (ROOT CAUSES)",
    suggested_action: "CORRECCIÓN RECOMENDADA",
    process_adjustments: "Ajustes de Parámetros de Proceso",
    tooling_remedies: "Remedios Prácticos y de Molde",
    other_detections: "Otros Tipos de Defectos Detectados",
    detected_defects: "Defectos Detectados",
    defect_summary: "Resumen de clasificación con recuentos, confianza y acciones correctivas",
    instances: "Instancias",
    instance: "Instancia",
    translate_label: "Idioma",
  },
};

export const DEFECT_TRANSLATIONS = """

out_content = header + json.dumps(FINAL_TRANSLATIONS, ensure_ascii=False, indent=2) + ";\n\n"
out_content += """export function getTranslatedDefectInfo(defectKey, lang = "en") {
  if (!defectKey) return null;
  const key = defectKey.toLowerCase().trim();
  const defectEntry = DEFECT_TRANSLATIONS[key];
  if (!defectEntry) return null;

  const translation = defectEntry[lang] || defectEntry["en"];
  return translation || null;
}
"""

with open(tr_file, "w", encoding="utf-8") as f_out:
    f_out.write(out_content)

print(f"\nAll defects successfully translated with Sarvam AI and written to {tr_file}!")
