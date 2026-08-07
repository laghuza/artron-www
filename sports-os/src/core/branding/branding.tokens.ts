/**
 * ARTRON SPORTS OS // ATOMIC BRANDING & BUTTON TOKEN ENGINE
 * Defines ARTRON UI signature tokens, button variants, neon glow levels, scanline presets & SVG brand signatures.
 * Soft Target: < 120 lines
 */

export type ButtonVariant = 'NEON_PRIMARY' | 'GLASS_OUTLINE' | 'DANGER_PURGE' | 'HUD_PILL' | 'CYBER_CARD';
export type NeonGlowLevel = 'LOW' | 'MEDIUM' | 'HIGH_CYBER';
export type ScanlineOpacityPreset = 'SUBTLE' | 'MEDIUM' | 'HEAVY';

export interface ButtonTokenConfig {
  background: string;
  border: string;
  text: string;
  hoverBackground: string;
  boxShadow: string;
  transition: string;
}

export const BUTTON_VARIANTS: Record<ButtonVariant, ButtonTokenConfig> = {
  NEON_PRIMARY: {
    background: 'linear-gradient(135deg, rgba(64, 145, 108, 0.9), rgba(45, 106, 79, 0.95))',
    border: '1px solid rgba(82, 183, 136, 0.6)',
    text: '#FFFFFF',
    hoverBackground: 'linear-gradient(135deg, rgba(82, 183, 136, 1), rgba(64, 145, 108, 1))',
    boxShadow: '0 0 15px rgba(64, 145, 108, 0.4), inset 0 0 10px rgba(82, 183, 136, 0.2)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  GLASS_OUTLINE: {
    background: 'rgba(26, 29, 35, 0.4)',
    border: '1px solid rgba(156, 163, 175, 0.25)',
    text: '#F5F5F3',
    hoverBackground: 'rgba(26, 29, 35, 0.7)',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.05)',
    transition: 'all 0.2s ease-in-out'
  },
  DANGER_PURGE: {
    background: 'rgba(184, 91, 73, 0.15)',
    border: '1px solid rgba(231, 111, 81, 0.7)',
    text: '#E76F51',
    hoverBackground: 'rgba(184, 91, 73, 0.35)',
    boxShadow: '0 0 20px rgba(231, 111, 81, 0.4)',
    transition: 'all 0.2s ease-in-out'
  },
  HUD_PILL: {
    background: 'rgba(18, 20, 24, 0.85)',
    border: '1px solid rgba(64, 145, 108, 0.4)',
    text: '#52B788',
    hoverBackground: 'rgba(45, 106, 79, 0.3)',
    boxShadow: '0 0 12px rgba(82, 183, 136, 0.25)',
    transition: 'all 0.3s ease'
  },
  CYBER_CARD: {
    background: 'rgba(26, 29, 35, 0.75)',
    border: '1px solid rgba(142, 125, 190, 0.3)',
    text: '#A594F9',
    hoverBackground: 'rgba(142, 125, 190, 0.2)',
    boxShadow: '0 0 25px rgba(142, 125, 190, 0.2)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  }
};

export const NEON_GLOW_LEVELS: Record<NeonGlowLevel, string> = {
  LOW: '0 0 8px rgba(64, 145, 108, 0.2)',
  MEDIUM: '0 0 16px rgba(64, 145, 108, 0.45)',
  HIGH_CYBER: '0 0 30px rgba(82, 183, 136, 0.75), 0 0 10px rgba(255, 255, 255, 0.3)'
};

export const SCANLINE_OPACITY_PRESETS: Record<ScanlineOpacityPreset, number> = {
  SUBTLE: 0.03,
  MEDIUM: 0.07,
  HEAVY: 0.15
};

export const ARTRON_SVG_SIGNATURES = {
  enneaLogo: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="14" stroke="#40916C" stroke-width="1.5" stroke-dasharray="4 2"/><polygon points="16,6 25,23 7,23" stroke="#52B788" stroke-width="1.5" fill="rgba(64,145,108,0.1)"/><circle cx="16" cy="16" r="3" fill="#52B788"/></svg>`,
  hudGridPattern: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(156, 163, 175, 0.08)" stroke-width="0.5"/></svg>`,
  cyberPulseRing: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="20" stroke="#8E7DBE" stroke-width="1" opacity="0.6"/><circle cx="24" cy="24" r="12" stroke="#A594F9" stroke-width="1.5"/></svg>`
};
