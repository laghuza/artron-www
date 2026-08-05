"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import geDict from "@/dictionaries/ge.json";
import enDict from "@/dictionaries/en.json";

export type Language = "GE" | "EN";

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const dictionaries: Record<Language, Record<string, any>> = {
  GE: geDict,
  EN: enDict,
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = "artron_lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("GE");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved === "GE" || saved === "EN") {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch (e) {
      // localStorage error fallback
    }
  };

  const toggleLang = () => {
    setLang(lang === "GE" ? "EN" : "GE");
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let current: any = dictionaries[lang];
    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        let fallback: any = dictionaries.EN;
        for (const fk of keys) {
          if (fallback && typeof fallback === "object" && fk in fallback) {
            fallback = fallback[fk];
          } else {
            return key;
          }
        }
        return typeof fallback === "string" ? fallback : key;
      }
    }
    return typeof current === "string" ? current : key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
