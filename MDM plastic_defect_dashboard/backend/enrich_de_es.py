# backend/enrich_de_es.py
import os
import sys
import json
import urllib.parse
import urllib.request
from pathlib import Path

BASE_DIR = Path(__file__).parent
sys.path.append(str(BASE_DIR))

from apply_official_guide import OFFICIAL_GUIDE
TR_FILE = BASE_DIR.parent / "frontend" / "src" / "constants" / "translations.js"

def google_translate(text: str, target_lang: str) -> str:
    if not text or not text.strip():
        return text
    try:
        url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl={target_lang}&dt=t&q={urllib.parse.quote(text)}"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            return "".join(segment[0] for segment in data[0] if segment and segment[0])
    except Exception as e:
        print(f"Translation error ({target_lang}): {e}")
        return text

def enrich_languages():
    print(f"Reading translations file: {TR_FILE}")
    content = TR_FILE.read_text(encoding="utf-8")
    
    # Extract DEFECT_TRANSLATIONS JSON
    marker = "export const DEFECT_TRANSLATIONS = "
    if marker not in content:
        print("Marker not found in translations.js")
        return
    
    parts = content.split(marker)
    prefix = parts[0] + marker
    rest = parts[1]
    
    # The JSON ends before export function
    end_marker = ";\n\nexport function getTranslatedDefectInfo"
    if end_marker not in rest:
        end_marker = ";\nexport function getTranslatedDefectInfo"
        if end_marker not in rest:
            print("End marker not found")
            return
            
    json_str, suffix = rest.split(end_marker, 1)
    translations = json.loads(json_str)
    
    for lang in ["de", "es"]:
        print(f"\nTranslating into [{lang.upper()}] for all 16 defects...")
        for defect, data in OFFICIAL_GUIDE.items():
            if defect not in translations:
                continue
            
            desc = data["description"]
            causes = data["root_causes"]
            procs = data["process_adjustments"]
            tools = data["tooling_remedies"]
            
            tr_desc = google_translate(desc, lang)
            tr_causes = [google_translate(c, lang) for c in causes]
            tr_procs = [google_translate(p, lang) for p in procs]
            tr_tools = [google_translate(t, lang) for t in tools]
            
            sim_cause = tr_causes[0] if tr_causes else tr_desc
            sim_action = f"{tr_procs[0]}. {tr_tools[0]}."
            det_cause = "\n".join(f"• {c}" for c in tr_causes)
            
            if lang == "de":
                det_action = "• Prozessparameter-Anpassungen:\n" + "\n".join(f"  - {p}" for p in tr_procs) + \
                             "\n• Praktische & Werkzeug-Maßnahmen:\n" + "\n".join(f"  - {t}" for t in tr_tools)
            else:
                det_action = "• Ajustes de Parámetros de Proceso:\n" + "\n".join(f"  - {p}" for p in tr_procs) + \
                             "\n• Remedios Prácticos y de Molde:\n" + "\n".join(f"  - {t}" for t in tr_tools)
                             
            translations[defect][lang] = {
                "description": tr_desc,
                "cause": sim_cause,
                "action": sim_action,
                "detailedCause": det_cause,
                "detailedAction": det_action,
                "rootCauses": tr_causes,
                "processAdjustments": tr_procs,
                "toolingRemedies": tr_tools,
            }
            print(f"[{lang.upper()}] '{defect}' done.")
            
    new_content = prefix + json.dumps(translations, ensure_ascii=False, indent=2) + end_marker + suffix
    TR_FILE.write_text(new_content, encoding="utf-8")
    print(f"\nSuccessfully enriched all 16 defects for German and Spanish in {TR_FILE}!")

if __name__ == "__main__":
    enrich_languages()
