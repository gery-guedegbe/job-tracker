import { en } from "./locales/en";
import { fr, type Translation } from "./locales/fr";
import { createContext, useContext, type ReactNode } from "react";

type Language = "fr" | "en";

interface I18nContextType {
  language: Language;
  locale: Language;
  t: Translation;
}

const I18nContext = createContext<I18nContextType | null>(null);

const translations: Record<Language, Translation> = {
  fr,
  en,
};

interface I18nProviderProps {
  children: ReactNode;
  language: Language;
}

export function I18nProvider({ children, language }: I18nProviderProps) {
  const t = translations[language] || translations.fr;

  return (
    <I18nContext.Provider value={{ language, locale: language, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
