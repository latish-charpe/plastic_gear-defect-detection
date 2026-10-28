"""
sarvam_service.py
Integration with Sarvam AI (https://www.sarvam.ai) for multilingual Indic language translation.
"""

import os
import re
import requests
from dotenv import load_dotenv
from pathlib import Path
from typing import Optional

# Load backend/.env if present
load_dotenv(Path(__file__).parent / ".env")

SARVAM_TRANSLATE_URL = "https://api.sarvam.ai/translate"

# Standard Indic language mapping
SARVAM_LANG_MAP = {
    "en": "en-IN",
    "hi": "hi-IN",
    "mr": "mr-IN",
    "gu": "gu-IN",
    "bn": "bn-IN",
    "kn": "kn-IN",
    "ml": "ml-IN",
    "od": "od-IN",
    "pa": "pa-IN",
    "ta": "ta-IN",
    "te": "te-IN",
}

# Number-to-words maps
EN_ONES = [
    "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
]
EN_TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]

def number_to_words_en(n: int) -> str:
    if 0 <= n < 20:
        return EN_ONES[n]
    if 20 <= n < 100:
        tens = EN_TENS[n // 10]
        rem = n % 10
        return f"{tens}-{EN_ONES[rem]}" if rem else tens
    if n == 100:
        return "one hundred"
    return str(n)

HI_NUMS = {
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
}

MR_NUMS = {
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
}

_translation_cache: dict[tuple[str, str, str], str] = {}


def get_sarvam_api_key() -> str:
    """Retrieve Sarvam AI API subscription key from environment or backend/.env."""
    key = os.getenv("SARVAM_API_KEY", "").strip()
    if not key:
        load_dotenv(Path(__file__).parent / ".env", override=True)
        key = os.getenv("SARVAM_API_KEY", "").strip()
    return key


def translate_with_sarvam(
    text: str,
    target_lang: str,
    source_lang: str = "en",
    mode: str = "formal",
) -> dict:
    """Translate text using Sarvam AI Mayura model."""
    if not text or not text.strip():
        return {"translated_text": text, "source": "empty"}

    clean_text = text.strip()
    src_code = SARVAM_LANG_MAP.get(source_lang.lower().split("-")[0], "en-IN")
    tgt_code = SARVAM_LANG_MAP.get(target_lang.lower().split("-")[0], target_lang)

    if src_code == tgt_code:
        return {"translated_text": clean_text, "source": "identity"}

    cache_key = (src_code, tgt_code, clean_text)
    if cache_key in _translation_cache:
        return {"translated_text": _translation_cache[cache_key], "source": "cache"}

    api_key = get_sarvam_api_key()
    if not api_key:
        return {
            "translated_text": clean_text,
            "source": "fallback",
            "warning": "SARVAM_API_KEY not set. Add SARVAM_API_KEY to backend/.env",
        }

    headers = {
        "api-subscription-key": api_key,
        "Content-Type": "application/json",
    }
    payload = {
        "input": clean_text,
        "source_language_code": src_code,
        "target_language_code": tgt_code,
        "mode": mode,
        "model": "mayura:v1",
        "enable_preprocessing": True,
    }

    try:
        response = requests.post(
            SARVAM_TRANSLATE_URL,
            json=payload,
            headers=headers,
            timeout=8,
        )
        if response.status_code == 200:
            result = response.json()
            translated = result.get("translated_text", clean_text)
            _translation_cache[cache_key] = translated
            return {"translated_text": translated, "source": "sarvam_ai"}
        else:
            print(f"[Sarvam AI Error] Status {response.status_code}: {response.text}")
            return {
                "translated_text": clean_text,
                "source": "fallback",
                "error": f"Sarvam AI HTTP {response.status_code}: {response.text}",
            }
    except Exception as e:
        print(f"[Sarvam AI Request Exception] {e}")
        return {"translated_text": clean_text, "source": "fallback", "error": str(e)}
