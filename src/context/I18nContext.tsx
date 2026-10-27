"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useLanguage, Locale } from "@/context/LanguageContext";

export type Language = "GE" | "EN" | "RU";

export interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string, fallback?: string) => any;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const langToLocale = (lang: Language): Locale => {
  if (lang === "EN") return "en";
  if (lang === "RU") return "ru";
  return "ka";
};

export const localeToLang = (locale: Locale): Language => {
  if (locale === "en") return "EN";
  if (locale === "ru") return "RU";
  return "GE";
};

/**
 * Adapter Provider: Bridges existing components without breaking.
 * If LanguageProvider is already present at the root, simply passes children through.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

/**
 * useI18n Adapter Hook:
 * Connects directly to the single source of truth in `LanguageContext`.
 */
export function useI18n(): I18nContextType {
  const directContext = useContext(I18nContext);
  if (directContext) {
    return directContext;
  }

  const { locale, setLocale, t } = useLanguage();

  const lang = localeToLang(locale);

  const setLang = (newLang: Language) => {
    setLocale(langToLocale(newLang));
  };

  const toggleLang = () => {
    const nextLocale: Locale = locale === "ka" ? "en" : locale === "en" ? "ru" : "ka";
    setLocale(nextLocale);
  };

  return {
    lang,
    setLang,
    toggleLang,
    t,
  };
}
