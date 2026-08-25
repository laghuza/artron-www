'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import kaDict from '@/dictionaries/ge.json';
import enDict from '@/dictionaries/en.json';
import ruDict from '@/dictionaries/ru.json';

export type Locale = 'ka' | 'en' | 'ru';

const translations: Record<Locale, Record<string, string>> = {
  ka: kaDict as unknown as Record<string, string>,
  en: enDict as unknown as Record<string, string>,
  ru: ruDict as unknown as Record<string, string>,
};

interface LanguageContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('ka');

  useEffect(() => {
    const saved = localStorage.getItem('artron_lang');
    if (saved === 'ka' || saved === 'en' || saved === 'ru') {
      setLocaleState(saved);
    } else {
      const browserLang = navigator.language.substring(0, 2);
      if (browserLang === 'ru') {
        setLocaleState('ru');
      } else if (browserLang === 'en') {
        setLocaleState('en');
      } else {
        setLocaleState('ka');
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('artron_lang', newLocale);
  };

  const t = (key: string, fallback?: string): string => {
    const resolveFromDict = (dict: Record<string, any> | undefined) => {
      if (!dict) return undefined;
      // 1. Direct top-level match
      if (key in dict && typeof dict[key] === 'string') return dict[key];

      // 2. Dot-separated path match (e.g. 'ps5_onboarding.hud_step1' or 'audit.title')
      const parts = key.split('.');
      let current: any = dict;
      for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          current = undefined;
          break;
        }
      }
      if (typeof current === 'string') return current;

      // 3. Fallback search across nested section dictionaries (e.g. 'ps5_onboarding', 'audit', etc.)
      for (const sectionKey of Object.keys(dict)) {
        const section = dict[sectionKey];
        if (section && typeof section === 'object' && !Array.isArray(section)) {
          if (key in section && typeof section[key] === 'string') {
            return section[key];
          }
          // If key has prefix like 'audit_title', check if 'title' or 'audit_title' exists inside section
          if (key.startsWith(`${sectionKey}_`)) {
            const subKey = key.slice(sectionKey.length + 1);
            if (subKey in section && typeof section[subKey] === 'string') {
              return section[subKey];
            }
          }
        }
      }

      return undefined;
    };

    const resolved = resolveFromDict(translations[locale]) || resolveFromDict(translations['en']) || resolveFromDict(translations['ka']);
    if (resolved !== undefined) return resolved;
    if (fallback !== undefined) return fallback;
    return key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
