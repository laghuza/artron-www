/**
 * ARTRON SPORTS OS // ISOLATED i18n REGISTRY
 * Isolating language definitions, dictionary loaders, and fallback resolvers.
 * Soft Target: < 100 lines
 */

import geDict from '@/dictionaries/ge.json';
import enDict from '@/dictionaries/en.json';

export type SupportedLanguage = 'GE' | 'EN' | 'ge' | 'en';

export interface LanguageDefinition {
  code: 'GE' | 'EN';
  iso: string;
  name: string;
  nativeName: string;
  isRTL: boolean;
}

export const SUPPORTED_LANGUAGES: Record<'GE' | 'EN', LanguageDefinition> = {
  GE: {
    code: 'GE',
    iso: 'ka-GE',
    name: 'Georgian',
    nativeName: 'ქართული',
    isRTL: false
  },
  EN: {
    code: 'EN',
    iso: 'en-US',
    name: 'English',
    nativeName: 'English',
    isRTL: false
  }
};

export const DEFAULT_LANGUAGE: 'GE' = 'GE';

export const DICTIONARY_REGISTRY: Record<'GE' | 'EN', Record<string, any>> = {
  GE: geDict,
  EN: enDict
};

/**
 * Normalizes input language string to canonical 'GE' | 'EN' format.
 */
export function resolveLanguage(lang?: string): 'GE' | 'EN' {
  if (!lang) return DEFAULT_LANGUAGE;
  const upper = lang.toUpperCase();
  if (upper === 'GE' || upper === 'KA' || upper === 'GEORGIAN') return 'GE';
  if (upper === 'EN' || upper === 'ENGLISH') return 'EN';
  return DEFAULT_LANGUAGE;
}

/**
 * Returns fallback language.
 */
export function getFallbackLanguage(): 'GE' | 'EN' {
  return DEFAULT_LANGUAGE;
}

/**
 * Loads dictionary for requested language, falling back to DEFAULT_LANGUAGE if unavailable.
 */
export function getDictionary(lang?: string): Record<string, any> {
  const target = resolveLanguage(lang);
  return DICTIONARY_REGISTRY[target] || DICTIONARY_REGISTRY[DEFAULT_LANGUAGE];
}

/**
 * Utility to resolve nested translation keys with fallback resolution.
 */
export function getTranslationKey(dict: Record<string, any>, keyPath: string, fallbackDict?: Record<string, any>): any {
  const parts = keyPath.split('.');
  let current: any = dict;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      if (fallbackDict) {
        return getTranslationKey(fallbackDict, keyPath);
      }
      return keyPath;
    }
  }
  return current !== undefined ? current : keyPath;
}
