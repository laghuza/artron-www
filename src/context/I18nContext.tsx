"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import geDict from "@/dictionaries/ge.json";
import enDict from "@/dictionaries/en.json";

export type Language = "GE" | "EN";

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => any;
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

  const t = (key: string): any => {
    const resolveFromDict = (dict: Record<string, any>) => {
      if (!dict) return undefined;
      if (key in dict) return dict[key];
      const keys = key.split(".");
      let current: any = dict;
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (current && typeof current === "object") {
          if (k in current) {
            current = current[k];
          } else {
            const rest = keys.slice(i).join(".");
            if (rest in current) {
              return current[rest];
            }
            return undefined;
          }
        } else {
          return undefined;
        }
      }
      return current;
    };

    const res = resolveFromDict(dictionaries[lang]);
    if (res !== undefined) return res;
    const fallback = resolveFromDict(dictionaries.EN);
    return fallback !== undefined ? fallback : key;
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
