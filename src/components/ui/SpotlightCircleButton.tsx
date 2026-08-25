'use client';

import React, { useState, useRef, useCallback } from 'react';
import { audioManager } from '@/lib/audioManager';

export interface SpotlightCircleButtonProps {
  onClick?: () => void;
  href?: string;
  accent: string;
  bg: string;
  border: string;
  glow: string;
  spotlightColor: string;
  ariaLabel: string;
  children: React.ReactNode;
  sizeClass?: string;
}

export const SpotlightCircleButton: React.FC<SpotlightCircleButtonProps> = ({
  onClick,
  href,
  accent,
  bg,
  border,
  glow,
  spotlightColor,
  ariaLabel,
  children,
  sizeClass = 'h-12 w-12',
}) => {
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0, isHovered: false });
  const btnRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setSpotPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setSpotPos((prev) => ({ ...prev, isHovered: true }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotPos((prev) => ({ ...prev, isHovered: false }));
  }, []);

  const content = (
    <div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative ${sizeClass} rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 active:scale-95 cursor-pointer shrink-0 shadow-lg`}
      style={{
        background: bg,
        border: `1px solid ${spotPos.isHovered ? accent : border}`,
        boxShadow: spotPos.isHovered ? `0 0 24px ${glow}` : '0 4px 14px rgba(0,0,0,0.35)',
        color: accent,
      }}
    >
      {/* Dynamic Cursor Spotlight Overlay (Radial light following cursor) */}
      {spotPos.isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-150 z-10"
          style={{
            background: `radial-gradient(38px circle at ${spotPos.x}px ${spotPos.y}px, ${spotlightColor}, transparent 75%)`,
          }}
        />
      )}

      {/* Glossy top specular reflection rim */}
      <div className="pointer-events-none absolute inset-0 rounded-full border-t border-white/25 opacity-70 z-10" />

      {/* Button Icon / Content */}
      <div className="relative z-20 flex items-center justify-center">
        {children}
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B0F17] rounded-full"
        style={{ outlineColor: accent }}
        aria-label={ariaLabel}
      >
        {content}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => audioManager.playClick()}
      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B0F17] rounded-full"
      style={{ outlineColor: accent }}
      aria-label={ariaLabel}
    >
      {content}
    </a>
  );
};
