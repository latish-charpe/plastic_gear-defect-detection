import { Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function LanguageSelector({ size = "normal" }) {
  const { language, setLanguage, languages } = useLanguage();

  return (
    <div className={`lang-selector-pill ${size === "small" ? "lang-selector-pill--sm" : ""}`}>
      <Globe size={size === "small" ? 13 : 15} className="lang-selector-icon" />
      <select
        className="lang-selector-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        aria-label="Select dashboard translation language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.nativeName} ({lang.label})
          </option>
        ))}
      </select>
    </div>
  );
}
