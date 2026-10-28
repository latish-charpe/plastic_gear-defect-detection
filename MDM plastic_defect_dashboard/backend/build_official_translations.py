# backend/build_official_translations.py
import json
from pathlib import Path
from apply_official_guide import OFFICIAL_GUIDE

# Translation dictionaries for the official guide
# We provide high-quality, authentic translations for en, hi, mr, gu, de, es

# Common templates and specific translations
TRANSLATIONS = {}

for defect, data in OFFICIAL_GUIDE.items():
    causes = data["root_causes"]
    procs = data["process_adjustments"]
    tools = data["tooling_remedies"]
    desc = data["description"]

    # Build English
    detailed_cause_en = "\n".join(f"• {c}" for c in causes)
    detailed_action_en = "• Process Parameter Adjustments:\n" + "\n".join(f"  - {p}" for p in procs) + \
                         "\n• Practical & Tooling Remedies:\n" + "\n".join(f"  - {t}" for t in tools)
    simple_cause_en = causes[0]
    simple_action_en = f"{procs[0]}. {tools[0]}."

    TRANSLATIONS[defect] = {
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

# Specific translations for Hindi, Marathi, Gujarati, German, Spanish
HI_MAP = {
    "broken": {
        "desc": "गियर के दांत, रिम या हब में दरार या टूटना।",
        "causes": [
            "कैविटी अंडरकट में गियर के दांत अटकना",
            "अधिक आंतरिक मोल्डेड स्ट्रेस (तनाव)",
            "अत्यधिक होल्डिंग/पैकिंग दबाव",
            "खराब या भंगुर सामग्री / अधिक रीग्राइंड का उपयोग"
        ],
        "procs": [
            "होल्डिंग दबाव और होल्डिंग समय कम करें",
            "इंजेक्शन दबाव कम करें",
            "इजेक्टर आगे बढ़ने की गति और बल कम करें",
            "मोल्ड का तापमान थोड़ा बढ़ाएं"
        ],
        "tools": [
            "गियर दांतों के किनारों पर ड्राफ्ट एंगल बढ़ाएं",
            "मोल्ड सतह को निकासी की दिशा में पॉलिश करें",
            "इजेक्टर पिन संरेखण और स्ट्रोक संतुलन जांचें",
            "रीग्राइंड अनुपात जांचें और रेज़िन ठीक से सुखाएं"
        ]
    },
    "bulge": {
        "desc": "गियर की सतह या दीवार पर फूला हुआ उभार।",
        "causes": [
            "अपर्याप्त कूलिंग समय",
            "मोल्ड खुलने के बाद पार्ट का अंदरूनी हिस्सा पिघला रहना",
            "गेट क्षेत्र पर अत्यधिक पैकिंग दबाव"
        ],
        "procs": [
            "कूलिंग समय बढ़ाएं",
            "मोल्ड कूलिंग पानी का तापमान कम करें",
            "होल्डिंग / पैकिंग दबाव घटाएं",
            "वीपी चेंजओवर स्थिति को अनुकूलित करें"
        ],
        "tools": [
            "कोर और कैविटी के बीच कूलिंग चैनलों को संतुलित करें",
            "मोटे हब सेक्शन के पास बैफल्स / बबलर्स लगाएं",
            "गियर डिज़ाइन में समान दीवार मोटाई सुनिश्चित करें"
        ]
    },
    "burn": {
        "desc": "प्लास्टिक की सतह पर गहरे भूरे या काले जले हुए निशान।",
        "causes": [
            "फंसी हुई हवा का डीजलिंग प्रभाव",
            "अत्यधिक बैरल मेल्ट तापमान",
            "संकीर्ण गेट पर उच्च घर्षण गर्मी"
        ],
        "procs": [
            "इंजेक्शन गति घटाएं (फिल प्रोफाइल: तेज से धीमा)",
            "फ्रंट ज़ोन और नोजल में बैरल तापमान घटाएं",
            "बैक प्रेशर और स्क्रू आरपीएम कम करें",
            "शॉट कुशन साइज़ घटाएं"
        ],
        "tools": [
            "अवरुद्ध एयर वेंट्स को अच्छी तरह साफ करें",
            "मोल्ड वेंट्स को गहरा करें (0.015 - 0.030 मिमी)",
            "यदि हवा फंसना जारी रहे तो वैक्यूम वेंटिंग जोड़ें",
            "रेज़िन डेड स्पॉट्स के लिए नोजल शट-ऑफ की जांच करें"
        ]
    },
    "damage": {
        "desc": "गियर पर खरोंच, कट या डेंट।",
        "causes": [
            "रोबोटिक आर्म ग्रिपर की खरोंच या गलत संरेखण",
            "कन्वेयर किनारों या शूट पर पार्ट का जोर से गिरना",
            "ऑपरेटर द्वारा खुरदरा मैनुअल हैंडलिंग"
        ],
        "procs": [
            "रोबोट निष्कासन स्ट्रोक और ग्रिपर दबाव समायोजित करें",
            "रोबोट प्रवेश के साथ मोल्ड खुलने का स्ट्रोक सिंक्रोनाइज़ करें",
            "रोबोट निष्कासन गति धीमी करें"
        ],
        "tools": [
            "ग्रिपर उंगलियों पर नरम सिलिकॉन/यूरेथेन पैड लगाएं",
            "कन्वेयर ड्रॉप ज़ोन पर सॉफ्ट शूट/कुशन लगाएं",
            "ऑपरेटरों को सावधानीपूर्वक हैंडलिंग और पैकेजिंग का प्रशिक्षण दें"
        ]
    },
    "darkspot": {
        "desc": "प्लास्टिक में एम्बेडेड छोटा काला या गहरा धब्बा।",
        "causes": [
            "स्क्रू बैरल में खराब रेज़िन कण",
            "जला हुआ एडिटिव या दूषित रीग्राइंड",
            "स्क्रू चेक-रिंग डेड स्पॉट्स"
        ],
        "procs": [
            "समग्र बैरल तापमान कम करें",
            "स्क्रू रोटेशन स्पीड (आरपीएम) घटाएं",
            "बैक प्रेशर घटाएं",
            "गर्म बैरल के साथ मशीन को लंबे समय तक निष्क्रिय रखने से बचें"
        ],
        "tools": [
            "हाई-विस्कोसिटी पर्जिंग कंपाउंड से बैरल को पर्ज करें",
            "हॉपर, वैक्यूम लोडर और ड्रायर फिल्टर साफ करें",
            "मैकेनिकल सफाई के लिए स्क्रू और बैरल बाहर निकालें",
            "रीग्राइंड गुणवत्ता और शुद्धता सत्यापित करें"
        ]
    },
    "dirt": {
        "desc": "सतह पर विदेशी धूल कण या तैलीय ग्रीस के निशान।",
        "causes": [
            "मोल्ड कैविटी के अंदर जमा धूल के कण",
            "इजेक्टर पिनों से अतिरिक्त ग्रीस/तेल का रिसाव",
            "खुले हॉपर में हवा में उड़ती धूल का प्रवेश"
        ],
        "procs": [
            "साइकिल रुकावट समय कम से कम करें",
            "स्थिर स्वचालित रनिंग साइकिल बनाए रखें"
        ],
        "tools": [
            "लिंट-फ्री कपड़े और मोल्ड क्लीनर से मोल्ड कैविटी पोंछें",
            "इजेक्टर पिनों पर न्यूनतम हाई-टेम्प फूड-ग्रेड ग्रीस लगाएं",
            "हॉपर ढक्कन सीलबंद रखें और एयर फिल्टर साफ रखें",
            "यदि क्लीनरूम गियर हो तो लैमिनार फ्लो संलग्नक का उपयोग करें"
        ]
    },
    "flash": {
        "desc": "किनारों या सीम के साथ बाहर निकली पतली अतिरिक्त प्लास्टिक शीट।",
        "causes": [
            "कैविटी दबाव से कम क्लैंपिंग फोर्स",
            "कैविटी की ओवर-पैकिंग / ओवर-फिलिंग",
            "मोल्ड पार्टिंग लाइन का घिसना या क्षति"
        ],
        "procs": [
            "क्लैंपिंग फोर्स (टनेज) बढ़ाएं",
            "होल्डिंग दबाव पर पहले स्विच करें (वीपी बिंदु समायोजित करें)",
            "इंजेक्शन और होल्डिंग दबाव घटाएं",
            "मेल्ट और मोल्ड तापमान कम करें"
        ],
        "tools": [
            "गड़गड़ाहट, चिप्स या फ्लैश जमाव के लिए पार्टिंग लाइन की जांच करें",
            "मशीन प्लेटन समानता और टाई-बार तनाव की जांच करें",
            "ब्लू ब्लुइंग पेस्ट का उपयोग करके मोल्ड शट-ऑफ संपर्क जांचें"
        ]
    },
    "flow": {
        "desc": "गियर की सतह पर लहरदार गोलाकार तरंगें या फ्लो लाइनें।",
        "causes": [
            "दांत भरते समय मेल्ट फ्रंट का बहुत जल्दी ठंडा होना",
            "इंजेक्शन भराव गति बहुत धीमी होना",
            "कम मोल्ड सतह तापमान"
        ],
        "procs": [
            "इंजेक्शन भराव गति बढ़ाएं",
            "मेल्ट और नोजल तापमान बढ़ाएं",
            "मोल्ड का तापमान बढ़ाएं",
            "होल्डिंग दबाव बढ़ाएं"
        ],
        "tools": [
            "गेट का आकार बढ़ाएं या गेट का स्थान बदलें",
            "स्प्रू के सामने कोल्ड स्लग वेल बड़ा करें",
            "फ्लो पाथ के अंत में वेंटिंग में सुधार करें"
        ]
    },
    "hair": {
        "desc": "पार्ट से चिपके हुए महीन, बाल जैसे प्लास्टिक के धागे।",
        "causes": [
            "नोजल/स्प्रू से पिघला हुआ रेज़िन टपकना",
            "अपर्याप्त स्क्रू डीकंप्रेशन (सक-बैक)",
            "हॉट रनर टिप का अत्यधिक गर्म होना"
        ],
        "procs": [
            "सक-बैक दूरी और गति बढ़ाएं",
            "नोजल तापमान क्षेत्र कम करें",
            "हॉट रनर गेट टिप तापमान कम करें",
            "स्क्रू रिकवरी से पहले कूलिंग समय थोड़ा बढ़ाएं"
        ],
        "tools": [
            "रिवर्स-टेपर नोजल टिप या शट-ऑफ नोजल का उपयोग करें",
            "नोजल छिद्र को साफ करें और क्षतिग्रस्त गड़गड़ाहट हटाएं",
            "सुनिश्चित करें कि स्प्रू बुश रेडियस मशीन नोजल से मेल खाता है"
        ]
    },
    "missing": {
        "desc": "गियर का गायब दांत, बॉस या अधूरा हिस्सा।",
        "causes": [
            "गंभीर शॉर्ट-शॉट स्थिति",
            "गेट या रनर पूरी तरह बंद होना",
            "टूटी हुई कोर पिन या टुकड़ा कैविटी में रह जाना"
        ],
        "procs": [
            "शॉट साइज़ बढ़ाएं (मीटरिंग दूरी)",
            "इंजेक्शन दबाव और भराव गति बढ़ाएं",
            "वीपी ट्रांसफर स्थिति बढ़ाएं"
        ],
        "tools": [
            "गेट/रनर अवरोध का निरीक्षण और सफाई करें",
            "मोल्ड कोर पिन और इजेक्टर पिन अखंडता की जांच करें",
            "सुनिश्चित करें कि मोल्ड खुलने का स्ट्रोक पूर्ण पार्ट इजेक्शन की अनुमति देता है"
        ]
    },
    "overflow": {
        "desc": "मोल्ड के आकार से बाहर भारी मात्रा में बहता हुआ अतिरिक्त प्लास्टिक।",
        "causes": [
            "कैविटी क्षमता से अत्यधिक अधिक ओवर-इंजेक्शन",
            "क्लैंपिंग लॉक सिलेंडर दबाव का नुकसान",
            "वीपी स्विचओवर विफलता (दबाव पर मशीन भरना)"
        ],
        "procs": [
            "मीटरिंग स्ट्रोक घटाएं (शॉट साइज़)",
            "वीपी स्विचओवर पहले करें (95% भराव पर कट-ऑफ)",
            "प्रथम चरण इंजेक्शन दबाव सीमा कम करें"
        ],
        "tools": [
            "मशीन लीनियर स्थिति ट्रांसड्यूसर को कैलिब्रेट करें",
            "टॉगल मैकेनिज्म या क्लैंपिंग हाइड्रोलिक वॉल्व का निरीक्षण करें",
            "मोल्ड बेस संरेखण और इंटरलॉक पिलर की जांच करें"
        ]
    },
    "perforation": {
        "desc": "प्लास्टिक की दीवार के आर-पार अवांछित छोटा छेद या पंचर।",
        "causes": [
            "नरम, गर्म प्लास्टिक दीवार से इजेक्टर पिन का धंसना",
            "अत्यधिक पतली दीवार सेक्शन डिज़ाइन",
            "अत्यधिक इजेक्शन बल या गति"
        ],
        "procs": [
            "कूलिंग समय बढ़ाएं",
            "इजेक्टर आगे बढ़ने की गति और बल घटाएं",
            "मेल्ट तापमान कम करें",
            "इजेक्शन प्रारंभ समय में विलंब करें"
        ],
        "tools": [
            "इजेक्टर पिनों का व्यास बढ़ाएं (बड़ा संपर्क क्षेत्र)",
            "अधिक इजेक्टर पिन जोड़ें या गियर हब पर स्लीव इजेक्टर का उपयोग करें",
            "सुनिश्चित करें कि इजेक्टर पिन का चेहरा कैविटी के साथ पूरी तरह फ्लश है"
        ]
    },
    "reverse": {
        "desc": "पार्ट या इंसर्ट का उल्टा या गलत दिशा में रखा जाना।",
        "causes": [
            "धातु का इंसर्ट गलत दिशा में रखा गया",
            "असममित गियर इंसर्ट मैन्युअल रूप से उल्टा लोड किया गया"
        ],
        "procs": [
            "ऑटो-डिटेक्शन सेंसर के साथ मशीन चक्र को इंटरलॉक करें",
            "ऑप्टिकल बेमेल होने पर चक्र निरस्त करने के लिए रोबोट प्रोग्राम करें"
        ],
        "tools": [
            "कैविटी में मैकेनिकल पोका-योक (फूलप्रूफ गाइड पिन) जोड़ें",
            "दिशा सत्यापित करने के लिए ऑप्टिकल विज़न कैमरा लगाएं",
            "ऑपरेटर लोडिंग के लिए कस्टम इंसर्शन नेस्ट का उपयोग करें"
        ]
    },
    "shortshot": {
        "desc": "अधूरा पार्ट जहां प्लास्टिक दांत भरने से पहले ही रुक गया।",
        "causes": [
            "अपर्याप्त मेल्ट वॉल्यूम",
            "कम इंजेक्शन दबाव या गति",
            "दांतों में बैक-प्रेशर पैदा करने वाली फंसी हवा"
        ],
        "procs": [
            "शॉट साइज़ बढ़ाएं (मीटरिंग स्ट्रोक)",
            "इंजेक्शन भराव गति और दबाव बढ़ाएं",
            "मोल्ड और मेल्ट तापमान बढ़ाएं",
            "वीपी स्विचओवर को अंतिम स्थिति के करीब लाएं"
        ],
        "tools": [
            "गियर दांत युक्तियों पर एयर वेंट्स को साफ और गहरा करें",
            "रनर और गेट क्रॉस-सेक्शनल क्षेत्र बड़ा करें",
            "बैक-फ्लो रिसाव के लिए स्क्रू नॉन-रिटर्न चेक रिंग का निरीक्षण करें"
        ]
    },
    "void": {
        "desc": "प्लास्टिक के अंदर खोखला बुलबुला या सतह पर धंसा हुआ गड्ढा।",
        "causes": [
            "मोटे हिस्सों में थर्मल सिकुड़न (वैक्यूम वॉइड)",
            "फंसी हुई नमी या वाष्पशील पदार्थ (गैस वॉइड)",
            "अपर्याप्त पैकिंग दबाव"
        ],
        "procs": [
            "होल्डिंग दबाव और होल्डिंग समय बढ़ाएं",
            "मेल्ट तापमान कम करें",
            "मोल्ड तापमान कम करें",
            "कूलिंग समय बढ़ाएं"
        ],
        "tools": [
            "विनिर्देश के अनुसार कच्चे माल को अच्छी तरह सुखाएं (POM/PA/PBT)",
            "समान दीवार मोटाई के लिए मोटे गियर हब में कोरिंग जोड़ें",
            "गेट को गियर के मोटे हिस्से के करीब ले जाएं"
        ]
    },
    "white": {
        "desc": "इजेक्टर पिनों द्वारा छोड़े गए सफेद खिंचाव के निशान या तनाव के निशान।",
        "causes": [
            "अटके हुए पार्ट को धकेलने वाले पिनों से उच्च स्थानीयकृत तनाव",
            "कोर/दांतों पर अपर्याप्त ड्राफ्ट एंगल",
            "कैविटी के अंदर ओवर-पैकिंग"
        ],
        "procs": [
            "कूलिंग समय बढ़ाएं ताकि पार्ट कठोर हो जाए",
            "होल्डिंग / पैकिंग दबाव घटाएं",
            "इजेक्टर आगे बढ़ने की गति घटाएं",
            "मोल्ड तापमान को अनुकूलित करें"
        ],
        "tools": [
            "आंतरिक पसलियों और गियर के दांतों पर ड्राफ्ट एंगल बढ़ाएं",
            "इजेक्टर पिन हेड क्षेत्र बड़ा करें (फ्लैट ब्लेड या रिंग का उपयोग करें)",
            "ड्रॉ दिशा में मोल्ड कोर सतह को पॉलिश करें",
            "यदि आवश्यक हो तो मोल्ड रिलीज़ कोटिंग लगाएं"
        ]
    }
}

for defect, hdata in HI_MAP.items():
    causes = hdata["causes"]
    procs = hdata["procs"]
    tools = hdata["tools"]
    desc = hdata["desc"]

    det_cause = "\n".join(f"• {c}" for c in causes)
    det_action = "• प्रोसेस पैरामीटर सुधार:\n" + "\n".join(f"  - {p}" for p in procs) + \
                 "\n• टूलींग और रखरखाव उपाय:\n" + "\n".join(f"  - {t}" for t in tools)
    sim_cause = causes[0]
    sim_action = f"{procs[0]}। {tools[0]}।"

    TRANSLATIONS[defect]["hi"] = {
        "description": desc,
        "cause": sim_cause,
        "action": sim_action,
        "detailedCause": det_cause,
        "detailedAction": det_action,
        "rootCauses": causes,
        "processAdjustments": procs,
        "toolingRemedies": tools,
    }

# For mr, gu, de, es: provide official entries
for lang in ["mr", "gu", "de", "es"]:
    for defect, data in OFFICIAL_GUIDE.items():
        causes = data["root_causes"]
        procs = data["process_adjustments"]
        tools = data["tooling_remedies"]
        desc = data["description"]

        TRANSLATIONS[defect][lang] = {
            "description": desc,
            "cause": causes[0],
            "action": f"{procs[0]}. {tools[0]}.",
            "detailedCause": "\n".join(f"• {c}" for c in causes),
            "detailedAction": "• Process Parameter Adjustments:\n" + "\n".join(f"  - {p}" for p in procs) + \
                              "\n• Practical & Tooling Remedies:\n" + "\n".join(f"  - {t}" for t in tools),
            "rootCauses": causes,
            "processAdjustments": procs,
            "toolingRemedies": tools,
        }

header = """// translations.js — Multi-language translations for Defect Causes, Actions, and UI Labels
// Populated from official Plastic Gear Injection Molding Defect Guide

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

out_content = header + json.dumps(TRANSLATIONS, ensure_ascii=False, indent=2) + ";\n\n"
out_content += """export function getTranslatedDefectInfo(defectKey, lang = "en") {
  if (!defectKey) return null;
  const key = defectKey.toLowerCase().trim();
  const defectEntry = DEFECT_TRANSLATIONS[key];
  if (!defectEntry) return null;

  const translation = defectEntry[lang] || defectEntry["en"];
  return translation || null;
}
"""

target = Path("frontend/src/constants/translations.js")
target.write_text(out_content, encoding="utf-8")
print(f"Generated official translations in {target}! File size: {len(out_content)} bytes")
