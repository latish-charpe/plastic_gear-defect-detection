# backend/apply_official_guide.py
# Ground-truth Plastic Gear Injection Molding Defect Guide data from user manual

OFFICIAL_GUIDE = {
    "broken": {
        "description": "Cracked, broken, or snapped gear tooth, rim, or hub.",
        "root_causes": [
            "Gear teeth stick in cavity undercut",
            "High internal molded-in stress",
            "Excessive holding/packing pressure",
            "Degraded or brittle material / excess regrind"
        ],
        "process_adjustments": [
            "Decrease holding pressure and holding time",
            "Reduce injection pressure",
            "Reduce ejector forward speed and force",
            "Increase mold temperature slightly"
        ],
        "tooling_remedies": [
            "Increase draft angle on gear teeth flanks",
            "Polish cavity surface in draw direction",
            "Check ejector pin alignment & stroke balance",
            "Verify regrind ratio and dry resin properly"
        ]
    },
    "bulge": {
        "description": "Swollen or raised bump on gear face or wall.",
        "root_causes": [
            "Insufficient cooling time",
            "Part interior remains molten after mold opening",
            "Excessive packing pressure at gate area"
        ],
        "process_adjustments": [
            "Increase cooling time",
            "Lower mold cooling water temperature",
            "Decrease holding / packing pressure",
            "Optimize VP changeover position"
        ],
        "tooling_remedies": [
            "Balance cooling channels between core and cavity",
            "Add baffles / bubblers near thick hub sections",
            "Ensure uniform wall thickness in gear design"
        ]
    },
    "burn": {
        "description": "Dark brown or black charred burn mark on plastic surface.",
        "root_causes": [
            "Trapped air dieseling effect",
            "Excessive barrel melt temperature",
            "High shear heating at narrow gate"
        ],
        "process_adjustments": [
            "Decrease injection speed (fill profile: fast to slow)",
            "Reduce barrel temperature in front zones & nozzle",
            "Lower back pressure and screw RPM",
            "Reduce shot cushion size"
        ],
        "tooling_remedies": [
            "Clean blocked air vents thoroughly",
            "Deepen mold vents (0.015 - 0.030 mm per resin)",
            "Add vacuum venting if air traps persist",
            "Check nozzle shut-off for resin dead spots"
        ]
    },
    "damage": {
        "description": "Scratches, gouges, cuts, or dents on the gear.",
        "root_causes": [
            "Robotic arm gripper scratch or misalignment",
            "Part falling roughly on conveyor edges/chute",
            "Rough manual handling by operator"
        ],
        "process_adjustments": [
            "Adjust robot takeaway stroke and gripper pressure",
            "Synchronize mold opening stroke with robot entry",
            "Slow down robot extraction speed"
        ],
        "tooling_remedies": [
            "Add soft silicone/urethane pads to gripper fingers",
            "Install soft chute/cushion on conveyor drop zone",
            "Train operators on careful handling and packaging"
        ]
    },
    "darkspot": {
        "description": "Small black or dark speck embedded in the plastic.",
        "root_causes": [
            "Degraded resin particles in screw barrel",
            "Scorched additive or contaminated regrind",
            "Screw check-ring dead spots"
        ],
        "process_adjustments": [
            "Lower overall barrel temperature",
            "Reduce screw rotation speed (RPM)",
            "Decrease back pressure",
            "Avoid keeping machine in idle cycle with hot barrel"
        ],
        "tooling_remedies": [
            "Purge barrel with high-viscosity purging compound",
            "Clean hopper, vacuum loader, and dryer filter",
            "Pull screw and barrel for mechanical cleaning",
            "Verify regrind quality and purity"
        ]
    },
    "dirt": {
        "description": "Foreign dust particles or oily grease marks on surface.",
        "root_causes": [
            "Dust particles settled inside mold cavity",
            "Excess grease/oil leaking from ejector pins",
            "Ambient airborne dust entering open hopper"
        ],
        "process_adjustments": [
            "Minimize cycle interruption time",
            "Maintain steady automatic running cycle"
        ],
        "tooling_remedies": [
            "Wipe mold cavity with clean lint-free cloth & mold cleaner",
            "Apply minimal high-temp food-grade grease to ejector pins",
            "Keep hopper lid sealed and clean air filters",
            "Use laminar flow enclosure if cleanroom gear"
        ]
    },
    "flash": {
        "description": "Thin extra plastic sheet sticking out along edges or seams.",
        "root_causes": [
            "Clamping force lower than cavity pressure",
            "Over-packing / over-filling cavity",
            "Mold parting line wear or damage"
        ],
        "process_adjustments": [
            "Increase clamping force (tonnage)",
            "Switch to holding pressure earlier (adjust VP point)",
            "Decrease injection and holding pressure",
            "Lower melt and mold temperatures"
        ],
        "tooling_remedies": [
            "Inspect parting line for burrs, chips, or flash buildup",
            "Check machine platen parallelism and tie-bar tension",
            "Check mold shut-off face contact using blue bluing paste"
        ]
    },
    "flow": {
        "description": "Wavy circular ripples or flow lines on gear surface.",
        "root_causes": [
            "Melt front cools too quickly while filling teeth",
            "Injection fill speed too slow",
            "Low mold surface temperature"
        ],
        "process_adjustments": [
            "Increase injection fill speed",
            "Increase melt and nozzle temperature",
            "Increase mold temperature",
            "Increase holding pressure"
        ],
        "tooling_remedies": [
            "Increase gate size or modify gate location",
            "Enlarge cold slug well opposite to sprue",
            "Improve venting at the end of flow path"
        ]
    },
    "hair": {
        "description": "Fine, hair-like plastic threads or fibers stuck to part.",
        "root_causes": [
            "Molten resin drooling out of nozzle/sprue",
            "Inadequate screw decompression (suck-back)",
            "Hot runner tip overheating"
        ],
        "process_adjustments": [
            "Increase suck-back distance and speed",
            "Lower nozzle temperature zone",
            "Lower hot runner gate tip temperature",
            "Increase cooling time slightly before screw recovery"
        ],
        "tooling_remedies": [
            "Use reverse-taper nozzle tip or shut-off nozzle",
            "Clean nozzle orifice and remove damaged burrs",
            "Ensure sprue bush radius matches machine nozzle"
        ]
    },
    "missing": {
        "description": "A missing gear tooth, boss, or incomplete section.",
        "root_causes": [
            "Severe short-shot condition",
            "Gate or runner completely clogged",
            "Broken core pin or fragment left in cavity"
        ],
        "process_adjustments": [
            "Increase shot size (metering distance)",
            "Increase injection pressure and fill speed",
            "Increase VP transfer position"
        ],
        "tooling_remedies": [
            "Inspect and clear gate/runner obstruction",
            "Inspect mold core pins and ejector pin integrity",
            "Ensure mold opening stroke allows complete part ejection"
        ]
    },
    "overflow": {
        "description": "Excess plastic overflowing heavily outside mold shape.",
        "root_causes": [
            "Extreme over-injection beyond cavity volume",
            "Clamping lock cylinder pressure loss",
            "VP switchover failure (machine filled on pressure)"
        ],
        "process_adjustments": [
            "Lower metering stroke (shot size)",
            "Move VP switchover earlier (cut-off at 95% full)",
            "Lower 1st-stage injection pressure limit"
        ],
        "tooling_remedies": [
            "Calibrate machine linear position transducer",
            "Inspect toggle mechanism or clamping hydraulic valves",
            "Check mold base alignment and interlock pillars"
        ]
    },
    "perforation": {
        "description": "Unwanted small hole or puncture through plastic wall.",
        "root_causes": [
            "Ejector pin pushes through soft, hot plastic wall",
            "Extremely thin wall section design",
            "Excessive ejection force or speed"
        ],
        "process_adjustments": [
            "Increase cooling time",
            "Decrease ejection forward speed and force",
            "Lower melt temperature",
            "Delay ejection start time"
        ],
        "tooling_remedies": [
            "Increase diameter of ejector pins (larger contact area)",
            "Add more ejector pins or use sleeve ejector on gear hub",
            "Ensure ejector pin face is perfectly flush with cavity"
        ]
    },
    "reverse": {
        "description": "Part or insert placed backwards or in wrong direction.",
        "root_causes": [
            "Metal insert placed in wrong orientation",
            "Asymmetrical gear insert loaded backwards manually"
        ],
        "process_adjustments": [
            "Interlock machine cycle with auto-detection sensor",
            "Program robot to abort cycle upon optical mismatch"
        ],
        "tooling_remedies": [
            "Add mechanical Poka-Yoke (foolproof guide pin) in cavity",
            "Install optical vision camera to verify orientation",
            "Use custom insertion nest for operator loading"
        ]
    },
    "shortshot": {
        "description": "Incomplete part where plastic stopped before filling teeth.",
        "root_causes": [
            "Insufficient melt volume",
            "Low injection pressure or speed",
            "Trapped air creating back-pressure in teeth"
        ],
        "process_adjustments": [
            "Increase shot size (metering stroke)",
            "Increase injection fill speed and pressure",
            "Increase mold and melt temperature",
            "Move VP switchover closer to final position"
        ],
        "tooling_remedies": [
            "Clean and deepen air vents on gear tooth tips",
            "Enlarge runner and gate cross-sectional area",
            "Inspect screw non-return check ring for back-flow leakage"
        ]
    },
    "void": {
        "description": "Hollow bubble inside plastic or sunken dent on surface.",
        "root_causes": [
            "Thermal shrinkage in thick sections (vacuum void)",
            "Trapped moisture or volatiles (gas void)",
            "Inadequate packing pressure"
        ],
        "process_adjustments": [
            "Increase holding pressure and holding time",
            "Lower melt temperature",
            "Lower mold temperature",
            "Increase cooling time"
        ],
        "tooling_remedies": [
            "Dry raw material thoroughly according to spec (POM/PA/PBT)",
            "Add coring to thick gear hub for uniform wall thickness",
            "Move gate closer to the thick section of the gear"
        ]
    },
    "white": {
        "description": "White stretch marks or stress marks left by ejector pins.",
        "root_causes": [
            "High localized stress from pins pushing stuck part",
            "Insufficient draft angle on core/teeth",
            "Over-packing inside cavity"
        ],
        "process_adjustments": [
            "Increase cooling time so part becomes rigid",
            "Decrease holding / packing pressure",
            "Decrease ejector forward speed",
            "Optimize mold temperature"
        ],
        "tooling_remedies": [
            "Increase draft angle on inner ribs and gear teeth",
            "Enlarge ejector pin head area (use flat blades or rings)",
            "Polish mold core surface in draw direction",
            "Apply mold release coating if necessary"
        ]
    }
}

if __name__ == "__main__":
    print(f"Total verified defect entries: {len(OFFICIAL_GUIDE)}")
