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

  const t = (key: string): string => {
    return translations[locale]?.[key] || translations['en']?.[key] || key;
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
