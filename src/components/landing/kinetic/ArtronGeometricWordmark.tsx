'use client';

import React from 'react';
import { motion, MotionValue, useTransform, useReducedMotion, Variants } from 'framer-motion';

interface ArtronGeometricWordmarkProps {
  scrollYProgress?: MotionValue<number>;
  shouldReduceMotion?: boolean | null;
  className?: string;
}

/* ─────────────────────────────────────────────────────────────
   STAGGERED ENTRANCE VARIANTS (Mount / Initial Reveal)
   Provides 60-120 FPS hardware-accelerated cascading entrance.
───────────────────────────────────────────────────────────── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const letterEntranceVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const ArtronGeometricWordmark: React.FC<ArtronGeometricWordmarkProps> = ({
  scrollYProgress,
  shouldReduceMotion,
  className = '',
}) => {
  const fallbackReduced = useReducedMotion();
  const isReduced = shouldReduceMotion ?? fallbackReduced;

  // Default fallback if scrollYProgress is not passed
  const defaultProgress = useTransform(() => 0);
  const progress = scrollYProgress || defaultProgress;

  /* ─────────────────────────────────────────────────────────────
     PER-LETTER KINETIC 3D AIR SCATTERING (Scroll 0px -> 260px)
     Letters disperse across aerodynamic 3D trajectories upon scroll,
     dissolving into the cyber void before header docks.
     T-collision is eliminated with gentle upward drift.
  ───────────────────────────────────────────────────────────── */

  // Global letter fade-out curve (smoothly dissolves across 0 -> 160px -> 260px)
  const letterOpacity = useTransform(progress, [0, 160, 260], [1, 0.85, 0], { clamp: true });

  // Letter A: Curves Up-Left, rotates counter-clockwise
  const xA = useTransform(progress, [0, 260], [0, -95], { clamp: true });
  const yA = useTransform(progress, [0, 260], [0, -32], { clamp: true });
  const rotA = useTransform(progress, [0, 260], [0, -10], { clamp: true });
  const scaleA = useTransform(progress, [0, 260], [1, 0.92], { clamp: true });

  // Letter R1: Drops Down-Left, rotates clockwise
  const xR1 = useTransform(progress, [0, 260], [0, -55], { clamp: true });
  const yR1 = useTransform(progress, [0, 260], [0, 52], { clamp: true });
  const rotR1 = useTransform(progress, [0, 260], [0, 8], { clamp: true });
  const scaleR1 = useTransform(progress, [0, 260], [1, 0.94], { clamp: true });

  // Letter T: Lifts slightly and expands with cyber scale (Safe zone, no header collision)
  const xT = useTransform(progress, [0, 260], [0, 0], { clamp: true });
  const yT = useTransform(progress, [0, 260], [0, -26], { clamp: true });
  const rotT = useTransform(progress, [0, 260], [0, -2], { clamp: true });
  const scaleT = useTransform(progress, [0, 260], [1, 1.06], { clamp: true });

  // Letter R2: Drops Down-Right, rotates counter-clockwise
  const xR2 = useTransform(progress, [0, 260], [0, 55], { clamp: true });
  const yR2 = useTransform(progress, [0, 260], [0, 52], { clamp: true });
  const rotR2 = useTransform(progress, [0, 260], [0, -8], { clamp: true });
  const scaleR2 = useTransform(progress, [0, 260], [1, 0.94], { clamp: true });

  // Letter O: Expands outward like a cyber shockwave ring
  const xO = useTransform(progress, [0, 260], [0, 68], { clamp: true });
  const yO = useTransform(progress, [0, 260], [0, -22], { clamp: true });
  const rotO = useTransform(progress, [0, 260], [0, 12], { clamp: true });
  const scaleO = useTransform(progress, [0, 260], [1, 1.10], { clamp: true });

  // Letter N: Flies Down-Right, rotates clockwise
  const xN = useTransform(progress, [0, 260], [0, 95], { clamp: true });
  const yN = useTransform(progress, [0, 260], [0, 42], { clamp: true });
  const rotN = useTransform(progress, [0, 260], [0, 10], { clamp: true });
  const scaleN = useTransform(progress, [0, 260], [1, 0.92], { clamp: true });

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Zero-Overhead Ambient Backlight Glow (Hardware-accelerated, eliminates drop-shadow jank) */}
      <div 
        className="absolute -inset-4 sm:-inset-8 bg-gradient-to-r from-[#0066FF]/20 via-[#00A3FF]/25 to-[#00D2FF]/20 blur-2xl rounded-full pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <motion.div
        variants={isReduced ? undefined : containerVariants}
        initial={isReduced ? undefined : 'hidden'}
        animate={isReduced ? undefined : 'visible'}
        className={`relative inline-flex items-center justify-center gap-1.5 sm:gap-3 md:gap-5 lg:gap-7 select-none gpu-accelerated ${className}`}
      >
      {/* ── Letter A ── */}
      <motion.div
        variants={isReduced ? undefined : letterEntranceVariants}
        className="w-10 sm:w-16 md:w-24 lg:w-32 xl:w-36 aspect-[100/120] shrink-0"
      >
        <motion.div
          style={{
            x: isReduced ? 0 : xA,
            y: isReduced ? 0 : yA,
            rotate: isReduced ? 0 : rotA,
            scale: isReduced ? 1 : scaleA,
            opacity: isReduced ? 1 : letterOpacity,
          }}
          className="w-full h-full will-change-transform"
        >
          <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="aLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D2FF" />
                <stop offset="100%" stopColor="#0077FF" />
              </linearGradient>
              <linearGradient id="aRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D2FF" />
                <stop offset="100%" stopColor="#00C8FF" />
              </linearGradient>
              <linearGradient id="aBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00E676" />
                <stop offset="100%" stopColor="#00A3FF" />
              </linearGradient>
            </defs>
            {/* Left Leg */}
            <line x1="50" y1="14" x2="16" y2="106" stroke="url(#aLeftGrad)" strokeWidth="15" strokeLinecap="round" />
            {/* Right Leg */}
            <line x1="50" y1="14" x2="84" y2="106" stroke="url(#aRightGrad)" strokeWidth="15" strokeLinecap="round" />
            {/* Translucent Horizontal Crossbar Pill */}
            <rect x="20" y="66" width="60" height="15" rx="7.5" fill="url(#aBarGrad)" opacity="0.9" />
          </svg>
        </motion.div>
      </motion.div>

      {/* ── Letter R (First) ── */}
      <motion.div
        variants={isReduced ? undefined : letterEntranceVariants}
        className="w-10 sm:w-16 md:w-24 lg:w-32 xl:w-36 aspect-[100/120] shrink-0"
      >
        <motion.div
          style={{
            x: isReduced ? 0 : xR1,
            y: isReduced ? 0 : yR1,
            rotate: isReduced ? 0 : rotR1,
            scale: isReduced ? 1 : scaleR1,
            opacity: isReduced ? 1 : letterOpacity,
          }}
          className="w-full h-full will-change-transform"
        >
          <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="rPillarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00A3FF" />
                <stop offset="100%" stopColor="#0055FF" />
              </linearGradient>
              <linearGradient id="rLoopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D2FF" />
                <stop offset="100%" stopColor="#0088FF" />
              </linearGradient>
              <linearGradient id="rLegGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00A3FF" />
                <stop offset="100%" stopColor="#00E676" />
              </linearGradient>
            </defs>
            {/* Left Vertical Pillar */}
            <rect x="14" y="12" width="16" height="96" rx="8" fill="url(#rPillarGrad)" />
            {/* Upper Rounded Loop Bulb */}
            <path
              d="M 22 12 H 58 C 76 12 88 24 88 41 C 88 58 76 70 58 70 H 22 Z"
              fill="url(#rLoopGrad)"
            />
            {/* Diagonal Slanted Leg */}
            <line x1="54" y1="62" x2="84" y2="106" stroke="url(#rLegGrad)" strokeWidth="15" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>

      {/* ── Letter T ── */}
      <motion.div
        variants={isReduced ? undefined : letterEntranceVariants}
        className="w-10 sm:w-16 md:w-24 lg:w-32 xl:w-36 aspect-[100/120] shrink-0"
      >
        <motion.div
          style={{
            x: isReduced ? 0 : xT,
            y: isReduced ? 0 : yT,
            rotate: isReduced ? 0 : rotT,
            scale: isReduced ? 1 : scaleT,
            opacity: isReduced ? 1 : letterOpacity,
          }}
          className="w-full h-full will-change-transform"
        >
          <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="tTopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0088FF" />
                <stop offset="50%" stopColor="#00C8FF" />
                <stop offset="100%" stopColor="#0088FF" />
              </linearGradient>
              <linearGradient id="tStemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0099FF" />
                <stop offset="100%" stopColor="#0055FF" />
              </linearGradient>
            </defs>
            {/* Horizontal Top Bar */}
            <rect x="8" y="12" width="84" height="16" rx="8" fill="url(#tTopGrad)" />
            {/* Center Vertical Stem */}
            <rect x="42" y="24" width="16" height="84" rx="8" fill="url(#tStemGrad)" />
          </svg>
        </motion.div>
      </motion.div>

      {/* ── Letter R (Second) ── */}
      <motion.div
        variants={isReduced ? undefined : letterEntranceVariants}
        className="w-10 sm:w-16 md:w-24 lg:w-32 xl:w-36 aspect-[100/120] shrink-0"
      >
        <motion.div
          style={{
            x: isReduced ? 0 : xR2,
            y: isReduced ? 0 : yR2,
            rotate: isReduced ? 0 : rotR2,
            scale: isReduced ? 1 : scaleR2,
            opacity: isReduced ? 1 : letterOpacity,
          }}
          className="w-full h-full will-change-transform"
        >
          <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
            {/* Left Vertical Pillar */}
            <rect x="14" y="12" width="16" height="96" rx="8" fill="url(#rPillarGrad)" />
            {/* Upper Rounded Loop Bulb */}
            <path
              d="M 22 12 H 58 C 76 12 88 24 88 41 C 88 58 76 70 58 70 H 22 Z"
              fill="url(#rLoopGrad)"
            />
            {/* Diagonal Slanted Leg */}
            <line x1="54" y1="62" x2="84" y2="106" stroke="url(#rLegGrad)" strokeWidth="15" strokeLinecap="round" />
          </svg>
        </motion.div>
      </motion.div>

      {/* ── Letter O ── */}
      <motion.div
        variants={isReduced ? undefined : letterEntranceVariants}
        className="w-10 sm:w-16 md:w-24 lg:w-32 xl:w-36 aspect-[100/120] shrink-0"
      >
        <motion.div
          style={{
            x: isReduced ? 0 : xO,
            y: isReduced ? 0 : yO,
            rotate: isReduced ? 0 : rotO,
            scale: isReduced ? 1 : scaleO,
            opacity: isReduced ? 1 : letterOpacity,
          }}
          className="w-full h-full will-change-transform"
        >
          <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="oLeftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00D2FF" />
                <stop offset="100%" stopColor="#0066FF" />
              </linearGradient>
              <linearGradient id="oRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D2FF" />
                <stop offset="100%" stopColor="#00E676" />
              </linearGradient>
            </defs>
            {/* Left Half Semi-Ring */}
            <path
              d="M 50 12 C 27 12 14 30 14 60 C 14 90 27 108 50 108"
              stroke="url(#oLeftGrad)"
              strokeWidth="16"
              strokeLinecap="butt"
              fill="none"
            />
            {/* Right Half Semi-Ring */}
            <path
              d="M 50 108 C 73 108 86 90 86 60 C 86 30 73 12 50 12"
              stroke="url(#oRightGrad)"
              strokeWidth="16"
              strokeLinecap="butt"
              fill="none"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* ── Letter N ── */}
      <motion.div
        variants={isReduced ? undefined : letterEntranceVariants}
        className="w-10 sm:w-16 md:w-24 lg:w-32 xl:w-36 aspect-[100/120] shrink-0"
      >
        <motion.div
          style={{
            x: isReduced ? 0 : xN,
            y: isReduced ? 0 : yN,
            rotate: isReduced ? 0 : rotN,
            scale: isReduced ? 1 : scaleN,
            opacity: isReduced ? 1 : letterOpacity,
          }}
          className="w-full h-full will-change-transform"
        >
          <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="nLeftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00C8FF" />
                <stop offset="100%" stopColor="#0066FF" />
              </linearGradient>
              <linearGradient id="nSlashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D2FF" />
                <stop offset="100%" stopColor="#0088FF" />
              </linearGradient>
              <linearGradient id="nRightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00E676" />
                <stop offset="100%" stopColor="#00A3FF" />
              </linearGradient>
            </defs>
            {/* Left Vertical Pillar */}
            <rect x="14" y="12" width="16" height="96" rx="8" fill="url(#nLeftGrad)" />
            {/* Diagonal Slanted Slash */}
            <line x1="20" y1="14" x2="80" y2="106" stroke="url(#nSlashGrad)" strokeWidth="15" strokeLinecap="round" opacity="0.95" />
            {/* Right Vertical Pillar */}
            <rect x="70" y="12" width="16" height="96" rx="8" fill="url(#nRightGrad)" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  </div>
  );
};
