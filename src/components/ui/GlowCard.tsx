'use client';

import React, { useRef, useState, useCallback } from 'react';

export interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. 'rgba(0, 163, 255, 0.16)'
  borderColor?: string; // e.g. 'rgba(0, 163, 255, 0.45)'
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(0, 163, 255, 0.18)',
  borderColor = 'rgba(0, 163, 255, 0.45)',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-2xl bg-[#0B0F17]/90 border border-white/10 transition-all duration-300 backdrop-blur-md ${className}`}
      style={{
        borderColor: isHovered ? borderColor : undefined,
        boxShadow: isHovered ? `0 8px 32px rgba(0, 163, 255, 0.12)` : undefined
      }}
      {...props}
    >
      {/* Radial Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 80%)`
        }}
      />

      {/* Subtle Top-Rim Highlight */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:via-[#00A3FF]/50 transition-all duration-500 z-10" />

      {/* Inner Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
