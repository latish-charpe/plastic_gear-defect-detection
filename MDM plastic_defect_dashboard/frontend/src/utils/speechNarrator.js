/**
 * speechNarrator.js
 * Generates natural, concise, professional inspection narration for Sarvam AI TTS (bulbul:v4-flash).
 * Fully supports English (en-IN), Hindi (hi-IN), and Marathi (mr-IN) in native Devanagari script.
 */

// Full number-to-words map for confidence percentages (0 to 100)
const EN_ONES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const EN_TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

export function numberToWordsEn(n) {
  const num = Math.round(n);
  if (num < 0) return "zero";
  if (num < 20) return EN_ONES[num];
  if (num < 100) {
    const tens = EN_TENS[Math.floor(num / 10)];
    const rem = num % 10;
    return rem ? `${tens}-${EN_ONES[rem]}` : tens;
  }
  if (num === 100) return "one hundred";
  return String(num);
}

const HI_NUMS = {
  0: "शून्य", 1: "एक", 2: "दो", 3: "तीन", 4: "चार", 5: "पांच", 6: "छह", 7: "सात", 8: "आठ", 9: "नौ", 10: "दस",
  11: "ग्यारह", 12: "बारह", 13: "तेरह", 14: "चौदह", 15: "पंद्रह", 16: "सोलह", 17: "सत्रह", 18: "अठारह", 19: "उन्नीस", 20: "बीस",
  21: "इक्कीस", 22: "बाईस", 23: "तेईस", 24: "चौबीस", 25: "पच्चीस", 26: "छब्बीस", 27: "सत्ताईस", 28: "अट्ठाईस", 29: "उनतीस", 30: "तीस",
  31: "इकतीस", 32: "बत्तीस", 33: "तैंतीस", 34: "चौंतीस", 35: "पैंतीस", 36: "छत्तीस", 37: "सैंतीस", 38: "अड़तीस", 39: "उनतालीस", 40: "चालीस",
  41: "इकतालीस", 42: "बयालीस", 43: "तैंतालीस", 44: "चवालीस", 45: "पैंतालीस", 46: "छियालीस", 47: "सैंतालीस", 48: "अड़तालीस", 49: "उनचास", 50: "पचास",
  51: "इक्यावन", 52: "बावन", 53: "तिरपन", 54: "चौवन", 55: "पचपन", 56: "छप्पन", 57: "सत्तावन", 58: "अट्ठावन", 59: "उनसठ", 60: "साठ",
  61: "इकसठ", 62: "बासठ", 63: "तिरसठ", 64: "चौंसठ", 65: "पैंसठ", 66: "छियासठ", 67: "सरसठ", 68: "अड़सठ", 69: "उनहत्तर", 70: "सत्तर",
  71: "इकहत्तर", 72: "बहत्तर", 73: "तिहत्तर", 74: "चौहत्तर", 75: "पचहत्तर", 76: "छिहत्तर", 77: "सतहत्तर", 78: "अठहत्तर", 79: "उन्यासी", 80: "अस्सी",
  81: "इक्यासी", 82: "बयासी", 83: "तिरासी", 84: "चौरासी", 85: "पचासी", 86: "छियासी", 87: "सत्तासी", 88: "अट्ठासी", 89: "नवासी", 90: "नब्बे",
  91: "इक्यानवे", 92: "बानवे", 93: "तिरानवे", 94: "चौरानवे", 95: "पचानवे", 96: "छियानवे", 97: "सत्तानवे", 98: "अट्ठानवे", 99: "निन्यानवे", 100: "सौ"
};

const MR_NUMS = {
  0: "शून्य", 1: "एक", 2: "दोन", 3: "तीन", 4: "चार", 5: "पाच", 6: "सहा", 7: "सात", 8: "आठ", 9: "नऊ", 10: "दहा",
  11: "अकरा", 12: "बारा", 13: "तेरा", 14: "चौदा", 15: "पंधरा", 16: "सोळा", 17: "सतरा", 18: "अठरा", 19: "एकोणीस", 20: "वीस",
  21: "एकवीस", 22: "बावीस", 23: "तेवीस", 24: "चोवीस", 25: "पंचवीस", 26: "सव्वीस", 27: "सत्तावीस", 28: "अठ्ठावीस", 29: "एकोणतीस", 30: "तीस",
  31: "एकतीस", 32: "बत्तीस", 33: "तेहेतीस", 34: "चौतीस", 35: "पस्तीस", 36: "छत्तीस", 37: "सदतीस", 38: "अडतीस", 39: "एकोणचाळीस", 40: "चाळीस",
  41: "एक्केचाळीस", 42: "बेचाळीस", 43: "त्रेचाळीस", 44: "चव्वेचाळीस", 45: "पंचेचाळीस", 46: "शेहेचाळीस", 47: "सत्तेचाळीस", 48: "अठ्ठेचाळीस", 49: "एकोणपन्नास", 50: "पन्नास",
  51: "एक्कावन्न", 52: "बावन्न", 53: "त्रेपन्न", 54: "चौपन्न", 55: "पंचावन्न", 56: "छप्पन्न", 57: "सत्तावन्न", 58: "अठ्ठावन्न", 59: "एकोणसाठ", 60: "साठ",
  61: "एकसष्ठ", 62: "बासष्ठ", 63: "त्रेसष्ठ", 64: "चौसष्ठ", 65: "पासष्ठ", 66: "सहासष्ठ", 67: "सदुसष्ठ", 68: "अडुसष्ठ", 69: "एकोणसत्तर", 70: "सत्तर",
  71: "एकाहत्तर", 72: "बहात्तर", 73: "त्र्याहत्तर", 74: "चौऱ्याहत्तर", 75: "पंच्याहत्तर", 76: "शहात्तर", 77: "सत्याहत्तर", 78: "अठ्ठ्याहत्तर", 79: "एकोणऐंशी", 80: "ऐंशी",
  81: "एक्याऐंशी", 82: "ब्याऐंशी", 83: "त्र्याऐंशी", 84: "चौऱ्याऐंशी", 85: "पंच्याऐंशी", 86: "शहाऐंशी", 87: "सत्याऐंशी", 88: "अठ्ठ्याऐंशी", 89: "एकोणनव्वद", 90: "नव्वद",
  91: "एक्याण्णव", 92: "ब्याण्णव", 93: "त्र्याण्णव", 94: "चौऱ्याण्णव", 95: "पंच्याण्णव", 96: "शहाण्णव", 97: "सत्याण्णव", 98: "अठ्ठ्याण्णव", 99: "नव्व्याण्णव", 100: "शंभर"
};

export function getConfidenceInWords(confVal, lang = "en") {
  const num = Math.round(confVal <= 1.0 ? confVal * 100 : confVal);
  if (lang === "hi") {
    return `${HI_NUMS[num] || num} प्रतिशत`;
  }
  if (lang === "mr") {
    return `${MR_NUMS[num] || num} टक्के`;
  }
  return `${numberToWordsEn(num)} percent`;
}

// Technical vocabulary & defect name mappings
export const TECHNICAL_DEFECT_TERMS = {
  overflow: { en: "overflow", hi: "ओवरफ्लो", mr: "ओव्हरफ्लो" },
  shortshot: { en: "short shot", hi: "शॉर्ट शॉट", mr: "शॉर्ट शॉट" },
  darkspot: { en: "dark spot", hi: "डार्क स्पॉट", mr: "डार्क स्पॉट" },
  flash: { en: "flash", hi: "फ्लैश", mr: "फ्लॅश" },
  broken: { en: "broken gear tooth", hi: "टूटा हुआ दांत", mr: "तुटलेला दात" },
  bulge: { en: "bulge", hi: "उभार या बल्ज", mr: "फुगवटा" },
  burn: { en: "burn mark", hi: "बर्न या जला हुआ निशान", mr: "बर्न डाग" },
  damage: { en: "surface damage", hi: "सतह क्षति", mr: "पृष्ठभागाचे नुकसान" },
  dirt: { en: "contamination or dirt", hi: "धूल या ग्रीस", mr: "धूळ किंवा वंगण" },
  flow: { en: "flow lines", hi: "फ्लो लाइन्स", mr: "फ्लो लाईन्स" },
  hair: { en: "stringing hair", hi: "प्लास्टिक धागा", mr: "प्लॅस्टिक धागा" },
  missing: { en: "missing tooth", hi: "छूटा हुआ दांत", mr: "अपूर्ण दात" },
  perforation: { en: "perforation", hi: "छिद्र", mr: "छिद्र" },
  reverse: { en: "reverse distortion", hi: "विकृत मोड़", mr: "वाकलेला भाग" },
  void: { en: "internal air void", hi: "आंतरिक हवा का बुलबुला", mr: "हवेची पोकळी" },
  white: { en: "stress whitening", hi: "तनाव सफेदी", mr: "स्ट्रेस पांढरा डाग" },
};

export function getSpokenDefectName(defectKey, lang = "en") {
  if (!defectKey) return lang === "hi" ? "दोष" : lang === "mr" ? "दोष" : "defect";
  const key = defectKey.toLowerCase().replace(/[^a-z]/g, "");
  const entry = TECHNICAL_DEFECT_TERMS[key];
  if (entry && entry[lang]) return entry[lang];
  return defectKey;
}

/**
 * Clean text for audio synthesis:
 * - Removes markdown, HTML, parentheses
 * - Replaces percentages with words
 * - Keeps sentences short and punctuation natural
 */
export function cleanTextForSpeech(text, lang = "en") {
  if (!text) return "";
  let clean = text
    .replace(/<[^>]*>?/gm, " ")
    .replace(/[`*#_~[\]{}]/g, " ")
    .replace(/\s*\([A-Za-z0-9\s&_\-—/.,;:!?]+\)/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  // Replace raw numbers followed by % with full words
  clean = clean.replace(/\b(\d{1,3})\s*%/g, (match, p1) => {
    return getConfidenceInWords(parseInt(p1, 10), lang);
  });

  if (lang === "hi") {
    clean = clean.replace(/\bYOLO11m\b/gi, "योलो ग्यारह एम");
    clean = clean.replace(/\bYOLO\b/gi, "योलो");
    clean = clean.replace(/\bflash\b/gi, "फ्लैश");
    clean = clean.replace(/\bshort\s*shot\b/gi, "शॉर्ट शॉट");
    clean = clean.replace(/\boverflow\b/gi, "ओवरफ्लो");
    clean = clean.replace(/\bdark\s*spot\b/gi, "डार्क स्पॉट");
    clean = clean.replace(/\binjection\s*molding\b/gi, "इंजेक्शन मोल्डिंग");
    clean = clean.replace(/\bshot\s*size\b/gi, "शॉट साइज");
    clean = clean.replace(/\bmachine\s*settings\b/gi, "मशीन सेटिंग्स");
  } else if (lang === "mr") {
    clean = clean.replace(/\bYOLO11m\b/gi, "योलो अकरा एम");
    clean = clean.replace(/\bYOLO\b/gi, "योलो");
    clean = clean.replace(/\bflash\b/gi, "फ्लॅश");
    clean = clean.replace(/\bshort\s*shot\b/gi, "शॉर्ट शॉट");
    clean = clean.replace(/\boverflow\b/gi, "ओव्हरफ्लो");
    clean = clean.replace(/\bdark\s*spot\b/gi, "डार्क स्पॉट");
    clean = clean.replace(/\binjection\s*molding\b/gi, "इंजेक्शन मोल्डिंग");
    clean = clean.replace(/\bshot\s*size\b/gi, "शॉट साईझ");
    clean = clean.replace(/\bmachine\s*settings\b/gi, "मशीन सेटिंग्ज");
  } else {
    clean = clean.replace(/\bYOLO11m\b/gi, "YOLO 11 M");
  }

  // Ensure clean punctuation without awkward double periods
  clean = clean.replace(/([.।])\s*([.।])+/g, "$1");
  return clean.trim();
}

/**
 * Builds the concise, natural inspection narration requested:
 * Example:
 * "One defect was detected: overflow. The model confidence is eighty-two percent.
 * A possible cause is excessive material filling. Recommended actions include checking the shot size and reviewing the machine settings."
 */
export function buildConciseInspectionNarration({
  defectName,
  confidence,
  defectCount = 1,
  rootCauses = [],
  processAdjustments = [],
  toolingRemedies = [],
  lang = "en",
}) {
  const spokenName = getSpokenDefectName(defectName, lang);
  const confWords = getConfidenceInWords(confidence != null ? confidence : 0.82, lang);

  // Extract first concise cause sentence
  let primaryCause = "";
  if (Array.isArray(rootCauses) && rootCauses.length > 0) {
    const first = rootCauses[0];
    primaryCause = typeof first === "string" ? first : first.desc || first.title || "";
  } else if (typeof rootCauses === "string") {
    primaryCause = rootCauses;
  }
  // Remove trailing periods and prefixes
  primaryCause = primaryCause.replace(/^[^:]+:\s*/, "").split(".")[0].trim();

  // Extract first concise action sentence
  let primaryAction = "";
  const allRemedies = [...(processAdjustments || []), ...(toolingRemedies || [])];
  if (allRemedies.length > 0) {
    const first = allRemedies[0];
    primaryAction = typeof first === "string" ? first : first.desc || first.title || "";
  }
  primaryAction = primaryAction.replace(/^[^:]+:\s*/, "").split(".")[0].trim();

  if (lang === "hi") {
    // Hindi narration in proper Devanagari script
    const defectSentence = defectCount <= 1
      ? `घटक में एक दोष पहचाना गया: ${spokenName}।`
      : `घटक में ${HI_NUMS[defectCount] || defectCount} दोष पहचाने गए, जिसमें मुख्य दोष ${spokenName} है।`;

    const confSentence = `मॉडल सटीकता ${confWords} है।`;
    const causeSentence = primaryCause
      ? `इसका संभावित कारण ${primaryCause} है।`
      : "इसका संभावित कारण प्रक्रिया पैरामीटर्स में असंतुलन हो सकता है।";
    const actionSentence = primaryAction
      ? `अनुशंसित सुधार में ${primaryAction} शामिल हैं।`
      : "अनुशंसित सुधार में मशीन सेटिंग्स की समीक्षा शामिल है।";

    return cleanTextForSpeech(`${defectSentence} ${confSentence} ${causeSentence} ${actionSentence}`, "hi");
  }

  if (lang === "mr") {
    // Marathi narration in proper Devanagari script
    const defectSentence = defectCount <= 1
      ? `घटकामध्ये एक दोष आढळला: ${spokenName}.`
      : `घटकामध्ये ${MR_NUMS[defectCount] || defectCount} दोष आढळले, ज्यामध्ये मुख्य दोष ${spokenName} आहे.`;

    const confSentence = `मॉडेल अचूकता ${confWords} आहे.`;
    const causeSentence = primaryCause
      ? `संभाव्य मुख्य कारण ${primaryCause} असू शकते.`
      : "संभाव्य मुख्य कारण प्रक्रिया पॅरामीटर्समधील असंतुलन असू शकते.";
    const actionSentence = primaryAction
      ? `शिफारस केलेल्या उपायांमध्ये ${primaryAction} समाविष्ट आहे.`
      : "शिफारस केलेल्या उपायांमध्ये मशीन सेटिंग्ज तपासणे समाविष्ट आहे.";

    return cleanTextForSpeech(`${defectSentence} ${confSentence} ${causeSentence} ${actionSentence}`, "mr");
  }

  // English default
  const defectSentence = defectCount <= 1
    ? `One defect was detected: ${spokenName}.`
    : `${numberToWordsEn(defectCount)} defects were detected, primarily ${spokenName}.`;

  const confSentence = `The model confidence is ${confWords}.`;
  const causeSentence = primaryCause
    ? `A possible cause is ${primaryCause.toLowerCase().startsWith("a ") ? primaryCause.slice(2) : primaryCause}.`
    : "A possible cause is parameter imbalance during injection molding.";
  const actionSentence = primaryAction
    ? `Recommended actions include ${primaryAction.toLowerCase().startsWith("to ") ? primaryAction.slice(3) : primaryAction}.`
    : "Recommended actions include reviewing machine settings and mold alignment.";

  return cleanTextForSpeech(`${defectSentence} ${confSentence} ${causeSentence} ${actionSentence}`, "en");
}

// Backward-compatible alias
export const buildFullInspectionReportSpeech = buildConciseInspectionNarration;
