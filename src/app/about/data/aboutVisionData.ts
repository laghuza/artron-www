import type { Locale } from '@/context/LanguageContext';
import { AboutVisionLocaleData } from './types';
import { ABOUT_VISION_KA } from './aboutVisionKa';
import { ABOUT_VISION_EN } from './aboutVisionEn';
import { ABOUT_VISION_RU } from './aboutVisionRu';

export * from './types';

export const MATRIX_RING_ORDER = [0, 1, 2, 7, 8, 3, 6, 5, 4];

/**
 * Returns strongly-typed localized About & Vision dataset for the selected locale.
 */
export function getAboutVisionData(locale?: string): AboutVisionLocaleData {
  if (locale === 'en') return ABOUT_VISION_EN;
  if (locale === 'ru') return ABOUT_VISION_RU;
  return ABOUT_VISION_KA;
}

// Backward-compatible exports (defaults to KA)
export const VISION_NODES = ABOUT_VISION_KA.nodes;
export const FRAGMENTED_ACTORS = ABOUT_VISION_KA.manifesto.actors;
export const FRAGMENTED_CONSEQUENCES = ABOUT_VISION_KA.manifesto.consequences;
export const RELIABILITY_VAULT_CARDS = ABOUT_VISION_KA.vaultCards;
export const UNITY_CTAS = ABOUT_VISION_KA.unityCtas;
