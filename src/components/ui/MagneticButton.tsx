'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

interface ShockwaveRing {
  id: number;
  x: number;
  y: number;
}

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  magneticStrength?: number;
  shockwaveColor?: string;
  variant?: 'primary' | 'secondary' | 'glow' | 'emerald' | 'ghost';
  disabled?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
  'aria-label'?: string;
  'data-testid'?: string;
  id?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  target,
  rel,
  type = 'button',
  magneticStrength = 0.35,
  shockwaveColor = 'rgba(0, 163, 255, 0.6)',
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  style,
  'aria-label': ariaLabel,
  'data-testid': dataTestId,
  id,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [shockwaves, setShockwaves] = useState<ShockwaveRing[]>([]);

  // Motion values for magnetic displacement
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Motion values for inner text parallax
  const textX = useMotionValue(0);
  const textY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 180, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);
  const smoothTextX = useSpring(textX, springConfig);
  const smoothTextY = useSpring(textY, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || shouldReduceMotion || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;

    // Cap max displacement
    const maxDistance = 18;
    const clampedX = Math.max(-maxDistance, Math.min(maxDistance, deltaX));
    const clampedY = Math.max(-maxDistance, Math.min(maxDistance, deltaY));

    x.set(clampedX);
    y.set(clampedY);
    textX.set(clampedX * 0.4);
    textY.set(clampedY * 0.4);
  }, [disabled, shouldReduceMotion, magneticStrength, x, y, textX, textY]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    textX.set(0);
    textY.set(0);
  }, [x, y, textX, textY]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;

    // Trigger shockwave at click point
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const newRing: ShockwaveRing = { id: Date.now() + Math.random(), x: clickX, y: clickY };

      setShockwaves((prev) => [...prev.slice(-2), newRing]);

      setTimeout(() => {
        setShockwaves((prev) => prev.filter((r) => r.id !== newRing.id));
      }, 700);
    }

    if (onClick) onClick(e);
  }, [disabled, onClick]);

  // Variant classes
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white shadow-[0_4px_24px_rgba(0,163,255,0.35)] hover:shadow-[0_8px_32px_rgba(0,163,255,0.55)] border border-[#00D2FF]/40 hover:brightness-110',
    secondary:
      'bg-[#121824]/90 hover:bg-[#1A2234] text-white border border-white/10 hover:border-[#00A3FF]/40 shadow-[0_4px_20px_rgba(0,0,0,0.4)]',
    glow:
      'bg-cyan-500/10 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/20 hover:border-cyan-400 shadow-[0_0_25px_rgba(0,163,255,0.25)]',
    emerald:
      'bg-gradient-to-r from-[#052e16]/90 via-[#064e3b]/80 to-[#022c22]/90 text-white border border-[#10B981]/60 hover:border-[#10B981] shadow-[0_0_24px_rgba(16,185,129,0.3)] hover:shadow-[0_0_32px_rgba(16,185,129,0.5)]',
    ghost:
      'bg-transparent text-slate-300 hover:text-white border border-transparent hover:border-white/10',
  };

  const isMagneticActive = !shouldReduceMotion && !disabled;

  const content = (
    <motion.div
      style={isMagneticActive ? { x: smoothTextX, y: smoothTextY } : undefined}
      className="relative z-10 flex items-center justify-center gap-2 select-none w-full h-full"
    >
      {children}
    </motion.div>
  );

  const innerButton = href ? (
    <Link
      href={href}
      target={target}
      rel={rel}
      onClick={handleClick as any}
      aria-label={ariaLabel}
      data-testid={dataTestId}
      id={id}
      className={`relative inline-flex items-center justify-center rounded-2xl font-bold cursor-pointer overflow-hidden transition-all duration-300 ${fullWidth ? 'w-full' : ''} ${variantStyles[variant]} ${className}`}
      style={style}
    >
      {content}
      {/* Shockwave Rings */}
      {shockwaves.map((ring) => (
        <span
          key={ring.id}
          className="pointer-events-none absolute rounded-full animate-shockwave z-20"
          style={{
            left: ring.x,
            top: ring.y,
            borderColor: shockwaveColor,
            boxShadow: `0 0 20px ${shockwaveColor}`,
          }}
        />
      ))}
    </Link>
  ) : (
    <button
      type={type}
      onClick={handleClick as any}
      disabled={disabled}
      aria-label={ariaLabel}
      data-testid={dataTestId}
      id={id}
      className={`relative inline-flex items-center justify-center rounded-2xl font-bold cursor-pointer overflow-hidden transition-all duration-300 ${fullWidth ? 'w-full' : ''} ${variantStyles[variant]} ${className}`}
      style={style}
    >
      {content}
      {/* Shockwave Rings */}
      {shockwaves.map((ring) => (
        <span
          key={ring.id}
          className="pointer-events-none absolute rounded-full animate-shockwave z-20"
          style={{
            left: ring.x,
            top: ring.y,
            borderColor: shockwaveColor,
            boxShadow: `0 0 20px ${shockwaveColor}`,
          }}
        />
      ))}
    </button>
  );

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={isMagneticActive ? { x: smoothX, y: smoothY } : undefined}
      whileTap={{ scale: 0.96 }}
      className={`will-change-transform ${fullWidth ? 'w-full block' : 'inline-block'}`}
    >
      {innerButton}
    </motion.div>
  );
};
