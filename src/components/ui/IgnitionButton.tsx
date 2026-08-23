'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { Zap, Sparkles } from 'lucide-react';
import { soundEngine } from '@/core';
import { usePortalIgnition } from './GlobalPortalIgnition';

interface ShockwaveRing {
  id: number;
  x: number;
  y: number;
}

export interface IgnitionButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  variant?: 'emerald' | 'cyan' | 'violet';
  size?: 'sm' | 'md' | 'lg';
  showReadyBeacon?: boolean;
  beaconLabel?: string;
  enablePortalTransition?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
  'aria-label'?: string;
  'data-testid'?: string;
  id?: string;
}

export const IgnitionButton: React.FC<IgnitionButtonProps> = ({
  children,
  className = '',
  onClick,
  href = '/sports-os',
  variant = 'emerald',
  size = 'md',
  showReadyBeacon = true,
  beaconLabel,
  enablePortalTransition = true,
  disabled = false,
  fullWidth = false,
  style,
  'aria-label': ariaLabel,
  'data-testid': dataTestId,
  id,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [shockwaves, setShockwaves] = useState<ShockwaveRing[]>([]);

  // Safe portal ignition hook
  let portalIgnition: ReturnType<typeof usePortalIgnition> | null = null;
  try {
    portalIgnition = usePortalIgnition();
  } catch {
    // Graceful fallback if rendered outside provider
    portalIgnition = null;
  }

  // Magnetic displacement physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const textX = useMotionValue(0);
  const textY = useMotionValue(0);

  const springConfig = { damping: 14, stiffness: 190, mass: 0.45 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);
  const smoothTextX = useSpring(textX, springConfig);
  const smoothTextY = useSpring(textY, springConfig);

  const isMagneticActive = !shouldReduceMotion && !disabled;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isMagneticActive || !buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.32;
      const deltaY = (e.clientY - centerY) * 0.32;

      const maxDisplacement = 14;
      const clampedX = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaX));
      const clampedY = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaY));

      x.set(clampedX);
      y.set(clampedY);
      textX.set(clampedX * 0.35);
      textY.set(clampedY * 0.35);
    },
    [isMagneticActive, x, y, textX, textY]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    try {
      soundEngine.playHover();
    } catch {
      // Audio fallback
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    textX.set(0);
    textY.set(0);
  }, [x, y, textX, textY]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      // 1. Trigger local button shockwave
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const localX = clientX - rect.left;
        const localY = clientY - rect.top;
        const newRing: ShockwaveRing = { id: Date.now() + Math.random(), x: localX, y: localY };
        setShockwaves((prev) => [...prev.slice(-1), newRing]);

        setTimeout(() => {
          setShockwaves((prev) => prev.filter((r) => r.id !== newRing.id));
        }, 650);
      }

      // 2. Trigger Global Portal Transition
      if (enablePortalTransition && portalIgnition) {
        e.preventDefault();
        portalIgnition.triggerIgnition({
          targetHref: href,
          origin: { x: clientX, y: clientY },
          color: variant === 'emerald' ? 'emerald' : 'cyan',
          onComplete: () => {
            if (onClick) onClick(e);
          },
        });
        return;
      }

      // Fallback click
      if (onClick) onClick(e);
    },
    [disabled, enablePortalTransition, portalIgnition, href, variant, onClick]
  );

  // Variant Visual Palettes
  const variantStyles = {
    emerald: {
      btnBg:
        'bg-gradient-to-r from-[#032115]/95 via-[#064e3b]/90 to-[#022c22]/95 border-[#10B981]/70 hover:border-[#00ff87]',
      glow: 'shadow-[0_0_24px_rgba(16,185,129,0.35)] hover:shadow-[0_0_40px_rgba(0,255,135,0.75)]',
      beaconDot: 'bg-[#00ff87] shadow-[0_0_12px_#00ff87]',
      beaconPing: 'bg-[#10B981]',
      laserColor: 'linear-gradient(90deg, transparent, #00ff87, transparent)',
      shockwaveColor: 'rgba(0, 255, 135, 0.85)',
      iconColor: 'text-[#00ff87]',
    },
    cyan: {
      btnBg:
        'bg-gradient-to-r from-[#003B73]/95 via-[#0066FF]/90 to-[#00A3FF]/95 border-[#00A3FF]/70 hover:border-[#00D2FF]',
      glow: 'shadow-[0_0_24px_rgba(0,163,255,0.4)] hover:shadow-[0_0_42px_rgba(0,210,255,0.8)]',
      beaconDot: 'bg-[#00D2FF] shadow-[0_0_12px_#00D2FF]',
      beaconPing: 'bg-[#00A3FF]',
      laserColor: 'linear-gradient(90deg, transparent, #00D2FF, transparent)',
      shockwaveColor: 'rgba(0, 210, 255, 0.85)',
      iconColor: 'text-[#00D2FF]',
    },
    violet: {
      btnBg:
        'bg-gradient-to-r from-[#2e1065]/95 via-[#581c87]/90 to-[#3b0764]/95 border-purple-500/70 hover:border-fuchsia-400',
      glow: 'shadow-[0_0_24px_rgba(168,85,247,0.4)] hover:shadow-[0_0_42px_rgba(217,70,239,0.8)]',
      beaconDot: 'bg-fuchsia-400 shadow-[0_0_12px_#e879f9]',
      beaconPing: 'bg-purple-500',
      laserColor: 'linear-gradient(90deg, transparent, #e879f9, transparent)',
      shockwaveColor: 'rgba(217, 70, 239, 0.85)',
      iconColor: 'text-fuchsia-400',
    },
  }[variant];

  // Sizing matrix
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs min-h-[36px] rounded-xl',
    md: 'px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm min-h-[44px] rounded-2xl',
    lg: 'px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base min-h-[52px] rounded-2xl',
  }[size];

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={isMagneticActive ? { x: smoothX, y: smoothY } : undefined}
      whileTap={{ scale: 0.95 }}
      className={`relative select-none will-change-transform ${fullWidth ? 'w-full block' : 'inline-block'}`}
    >
      {/* Outer Neon Aura Breathing Layer on Hover */}
      {isHovered && !shouldReduceMotion && (
        <div
          className={`absolute -inset-1 rounded-2xl opacity-80 blur-md pointer-events-none transition-opacity duration-300 animate-ignition-pulse ${
            variant === 'emerald' ? 'bg-[#00ff87]/30' : 'bg-[#00A3FF]/35'
          }`}
          aria-hidden="true"
        />
      )}

      {/* Main Ignition Button Interactive Shell */}
      <a
        href={href}
        onClick={handleClick}
        aria-label={ariaLabel}
        data-testid={dataTestId}
        id={id}
        className={`group relative inline-flex items-center justify-center font-black tracking-wide text-white cursor-pointer overflow-hidden border transition-all duration-300 ${variantStyles.btnBg} ${variantStyles.glow} ${sizeStyles} ${fullWidth ? 'w-full' : ''} ${className}`}
        style={style}
      >
        {/* Rotating Energy Perimeter Laser Sweep */}
        {isHovered && !shouldReduceMotion && (
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-inherit"
            aria-hidden="true"
          >
            <div
              className="absolute -inset-[100%] animate-ignition-laser-spin opacity-70"
              style={{
                background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${
                  variant === 'emerald' ? '#00ff87' : '#00D2FF'
                } 60deg, transparent 120deg)`,
              }}
            />
          </div>
        )}

        {/* Content Container with Parallax Effect */}
        <motion.div
          style={isMagneticActive ? { x: smoothTextX, y: smoothTextY } : undefined}
          className="relative z-10 flex items-center justify-center gap-2 select-none w-full"
        >
          {/* Live Status Beacon */}
          {showReadyBeacon && (
            <span className="relative flex h-2 w-2 mr-0.5 shrink-0" title={beaconLabel || 'Core Ready'}>
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${variantStyles.beaconPing}`}
              />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${variantStyles.beaconDot}`} />
            </span>
          )}

          {/* Electric Zap / Sparkles Icon */}
          <Zap
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 ${variantStyles.iconColor}`}
          />

          {/* Button Text */}
          <span className="tracking-wide whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-bold">
            {children}
          </span>

          {/* Micro Sparkle Indicator on Hover */}
          <Sparkles className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white/80 shrink-0" />
        </motion.div>

        {/* Localized Shockwave Ripple Rings on Click */}
        {shockwaves.map((ring) => (
          <span
            key={ring.id}
            className="pointer-events-none absolute rounded-full animate-shockwave z-20"
            style={{
              left: ring.x,
              top: ring.y,
              borderColor: variantStyles.shockwaveColor,
              boxShadow: `0 0 30px ${variantStyles.shockwaveColor}`,
            }}
          />
        ))}
      </a>
    </motion.div>
  );
};
