/**
 * ARTRON SPORTS OS // BRAND IDENTITY TOKENS ENGINE
 * Shared token design system for Tailwind CSS v4 & NativeWind compatibility.
 * Soft Target: < 200 lines
 */

export interface ColorPaletteToken {
  hex: string;
  rgba?: string;
  description: string;
}

export const BRAND_COLOR_PALETTE = {
  background: {
    hex: '#090A0F',
    rgba: 'rgba(9, 10, 15, 1)',
    description: 'Dark-Futurist deep space core canvas'
  },
  surfaceGlass: {
    hex: '#12141D',
    rgba: 'rgba(18, 20, 29, 0.7)',
    description: 'Glassmorphic frosted surface overlay'
  },
  primaryNeon: {
    hex: '#00FF87',
    rgba: 'rgba(0, 255, 135, 1)',
    description: 'High-intensity electric signal green'
  },
  accentCyan: {
    hex: '#00E5FF',
    rgba: 'rgba(0, 229, 255, 1)',
    description: 'High-tech telemetry cyan accent'
  },
  borderGlow: {
    hex: '#00FF87',
    rgba: 'rgba(0, 255, 135, 0.15)',
    description: 'Subtle neon border glow container'
  },
  textPrimary: {
    hex: '#F8FAFC',
    rgba: 'rgba(248, 250, 252, 1)',
    description: 'Slate 50 high-contrast primary text'
  },
  textSecondary: {
    hex: '#94A3B8',
    rgba: 'rgba(148, 163, 184, 1)',
    description: 'Slate 400 muted secondary metadata'
  }
} as const;

export const GLASSMORPHISM_PRESETS = {
  card: {
    backdropFilter: 'blur(24px)',
    backgroundColor: 'rgba(18, 20, 29, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.10)',
    borderRadius: '12px'
  },
  sidebar: {
    backdropFilter: 'blur(32px)',
    backgroundColor: 'rgba(18, 20, 29, 0.85)',
    borderRight: '1px solid rgba(0, 255, 135, 0.15)'
  },
  modal: {
    backdropFilter: 'blur(40px)',
    backgroundColor: 'rgba(18, 20, 29, 0.9)',
    border: '1px solid rgba(0, 229, 255, 0.25)',
    borderRadius: '16px'
  }
} as const;

export const NEON_SHADOW_PRESETS = {
  subtle: '0 0 15px rgba(0, 255, 135, 0.15)',
  medium: '0 0 20px rgba(0, 255, 135, 0.25)',
  cyanGlow: '0 0 25px rgba(0, 229, 255, 0.25)',
  intense: '0 0 35px rgba(0, 255, 135, 0.4), inset 0 0 15px rgba(0, 229, 255, 0.2)'
} as const;

export const TYPOGRAPHY_TOKENS = {
  fontSans: '"Inter", "Space Grotesk", sans-serif',
  fontHeading: '"Space Grotesk", "Inter", sans-serif',
  fontMono: '"JetBrains Mono", monospace',
  h1Bold: {
    fontSize: '3.75rem',
    fontWeight: '800',
    letterSpacing: '-0.025em',
    lineHeight: '1'
  },
  h2Bold: {
    fontSize: '2.25rem',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    lineHeight: '1.2'
  },
  badgeMono: {
    fontSize: '0.75rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase'
  }
} as const;

export const NATIVEWIND_THEME_TOKENS = {
  colors: {
    bgDark: BRAND_COLOR_PALETTE.background.hex,
    surfaceGlass: 'rgba(18, 20, 29, 0.7)',
    primaryNeon: BRAND_COLOR_PALETTE.primaryNeon.hex,
    accentCyan: BRAND_COLOR_PALETTE.accentCyan.hex,
    borderGlow: 'rgba(0, 255, 135, 0.15)',
    textPrimary: BRAND_COLOR_PALETTE.textPrimary.hex,
    textSecondary: BRAND_COLOR_PALETTE.textSecondary.hex
  }
} as const;
