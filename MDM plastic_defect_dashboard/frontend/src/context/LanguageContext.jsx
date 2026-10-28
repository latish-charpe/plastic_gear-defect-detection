import { createContext, useContext, useState, useEffect } from "react";
import { LANGUAGES, UI_TRANSLATIONS, getTranslatedDefectInfo } from "../constants/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const stored = localStorage.getItem("preferred_language");
      if (stored && LANGUAGES.some((l) => l.code === stored)) {
        return stored;
      }
      return "en";
    } catch {
      return "en";
    }
  });

  const setLanguage = (langCode) => {
    setLanguageState(langCode);
    try {
      localStorage.setItem("preferred_language", langCode);
    } catch {
      // ignore
    }
  };

  const getDefectText = (defectKey, defaultCause, defaultAction) => {
    const translated = getTranslatedDefectInfo(defectKey, language);
    if (!translated) {
      return {
        cause: defaultCause,
        action: defaultAction,
        detailedCause: defaultCause,
        detailedAction: defaultAction,
        rootCauses: [],
        processAdjustments: [],
        toolingRemedies: [],
        description: "",
      };
    }
    return {
      cause: translated.cause || defaultCause,
      action: translated.action || defaultAction,
      detailedCause: translated.detailedCause || translated.cause || defaultCause,
      detailedAction: translated.detailedAction || translated.action || defaultAction,
      rootCauses: translated.rootCauses || [],
      processAdjustments: translated.processAdjustments || [],
      toolingRemedies: translated.toolingRemedies || [],
      description: translated.description || "",
    };
  };

  const ui = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        languages: LANGUAGES,
        ui,
        getDefectText,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
