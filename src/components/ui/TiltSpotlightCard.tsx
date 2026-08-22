'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

export interface TiltSpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  maxTilt?: number;
  scaleOnHover?: number;
  enableSpotlight?: boolean;
  enableTilt?: boolean;
  disabled?: boolean;
}

export const TiltSpotlightCard: React.FC<TiltSpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(0, 163, 255, 0.18)',
  maxTilt = 8,
  scaleOnHover = 1.015,
  enableSpotlight = true,
  enableTilt = true,
  disabled = false,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Normalized mouse coords (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Exact pixel coords for spotlight
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  // Spring physics for smooth 60 FPS tilt
  const springConfig = { damping: 22, stiffness: 220, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const spotlightBg = useTransform(
    [spotX, spotY],
    ([x, y]) =>
      `radial-gradient(400px circle at ${x}px ${y}px, ${spotlightColor}, transparent 70%)`
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || shouldReduceMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const xFromCenter = e.clientX - rect.left - width / 2;
    const yFromCenter = e.clientY - rect.top - height / 2;

    mouseX.set(xFromCenter / width);
    mouseY.set(yFromCenter / height);

    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  }, [disabled, shouldReduceMotion, mouseX, mouseY, spotX, spotY]);

  const handleMouseEnter = useCallback(() => {
    if (!disabled) setIsHovered(true);
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const isActiveTilt = enableTilt && !shouldReduceMotion && !disabled;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={
        isActiveTilt
          ? {
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              perspective: 1000,
            }
          : undefined
      }
      animate={{
        scale: isHovered && scaleOnHover ? scaleOnHover : 1,
      }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-2xl will-change-transform ${className}`}
      {...(props as any)}
    >
      {/* 3D Content Wrapper */}
      <div 
        style={isActiveTilt ? { transform: 'translateZ(12px)', transformStyle: 'preserve-3d' } : undefined}
        className="w-full h-full"
      >
        {children}
      </div>

      {/* Radial Spotlight Overlay */}
      {enableSpotlight && isHovered && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300 z-20"
          style={{
            background: spotlightBg,
          }}
        />
      )}

      {/* Subtle Ambient Border Glow on Hover */}
      {enableSpotlight && isHovered && (
        <div 
          className="pointer-events-none absolute inset-0 rounded-2xl border border-cyan-500/30 transition-all duration-300 z-20"
        />
      )}
    </motion.div>
  );
};
