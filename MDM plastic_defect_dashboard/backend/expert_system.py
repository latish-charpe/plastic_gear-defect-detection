"""
expert_system.py
Rule-based Polymer Expert System for injection-molded plastic gear defects.
Data populated directly from the official Plastic Gear Injection Molding Defect Guide.

Maps each of the 16 YOLO11m defect classes to:
  - description         : Concise definition of the defect appearance
  - possible_cause      : Simple root cause summary (for tables/cards)
  - suggested_action    : Simple corrective action summary (for tables/cards)
  - root_causes         : List of verified root cause points
  - process_adjustments : Machine/process parameter corrections
  - tooling_remedies    : Tooling, mold, and handling corrections
  - detailed_cause      : Bulleted string of root causes
  - detailed_action     : Bulleted string of adjustments & tooling remedies
"""

from apply_official_guide import OFFICIAL_GUIDE

DEFECT_KNOWLEDGE = {}

for defect, data in OFFICIAL_GUIDE.items():
    desc = data["description"]
    causes = data["root_causes"]
    proc = data["process_adjustments"]
    tool = data["tooling_remedies"]

    # Simple concise summaries for tables
    simple_cause = causes[0] if causes else desc
    simple_action = f"{proc[0] if proc else ''}. {tool[0] if tool else ''}".strip(". ")

    # Detailed bullet strings for process correction section
    detailed_cause_str = "\n".join(f"• {c}" for c in causes)
    detailed_action_str = "• Process Parameter Adjustments:\n" + "\n".join(f"  - {p}" for p in proc) + \
                          "\n• Practical & Tooling Remedies:\n" + "\n".join(f"  - {t}" for t in tool)

    DEFECT_KNOWLEDGE[defect] = {
        "description": desc,
        "possible_cause": simple_cause,
        "suggested_action": simple_action,
        "root_causes": causes,
        "process_adjustments": proc,
        "tooling_remedies": tool,
        "detailed_cause": detailed_cause_str,
        "detailed_action": detailed_action_str,
    }

_UNKNOWN = {
    "description": "Uncataloged surface anomaly.",
    "possible_cause": "Defect cause not available in the expert system.",
    "suggested_action": "Consult standard operating procedures for this defect.",
    "root_causes": ["Uncataloged anomaly"],
    "process_adjustments": ["Consult process engineer"],
    "tooling_remedies": ["Inspect mold cavity"],
    "detailed_cause": "• Unidentified Defect: Cause not in standard catalog.",
    "detailed_action": "• Consult standard injection molding procedures.",
}


def get_defect_info(defect_class: str) -> dict:
    key = defect_class.strip().lower()
    return DEFECT_KNOWLEDGE.get(key, _UNKNOWN)
