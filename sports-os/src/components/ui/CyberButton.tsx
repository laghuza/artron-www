'use client';

import React from 'react';
import { BUTTON_VARIANTS, NEON_GLOW_LEVELS, ButtonVariant, NeonGlowLevel } from '@/core/branding/branding.tokens';

export interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  glow?: NeonGlowLevel;
  soundOnClick?: boolean;
}

const playCyberClickSound = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {}
};

export const CyberButton: React.FC<CyberButtonProps> = ({
  variant = 'NEON_PRIMARY',
  glow = 'MEDIUM',
  soundOnClick = true,
  children,
  onClick,
  className = '',
  style,
  ...props
}) => {
  const token = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.NEON_PRIMARY;
  const glowShadow = NEON_GLOW_LEVELS[glow] || NEON_GLOW_LEVELS.MEDIUM;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (soundOnClick) playCyberClickSound();
    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center px-4 py-2 text-xs font-mono tracking-wider uppercase font-semibold rounded transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{
        background: token.background,
        border: token.border,
        color: token.text,
        boxShadow: `${token.boxShadow}, ${glowShadow}`,
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};
