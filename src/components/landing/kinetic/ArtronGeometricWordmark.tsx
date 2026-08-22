'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface ArtronGeometricWordmarkProps {
  scrollYProgress?: MotionValue<number>;
  shouldReduceMotion?: boolean | null;
  className?: string;
}

export const ArtronGeometricWordmark: React.FC<ArtronGeometricWordmarkProps> = ({
  scrollYProgress,
  shouldReduceMotion,
  className = '',
}) => {
  // Default fallback if scrollYProgress is not passed
  const defaultProgress = useTransform(() => 0);
  const progress = scrollYProgress || defaultProgress;

  /* ─────────────────────────────────────────────────────────────
     PER-LETTER KINETIC DISASSEMBLY / SCATTER TRANSFORMS (Scroll 0 -> 0.48)
     Each letter flies apart along distinct 3D-feeling trajectories!
  ───────────────────────────────────────────────────────────── */

  // Letter A: Flies Up-Left, rotates counter-clockwise, scales slightly down
  const xA = useTransform(progress, [0, 0.45], [0, -180]);
  const yA = useTransform(progress, [0, 0.45], [0, -90]);
  const rotA = useTransform(progress, [0, 0.45], [0, -18]);
  const scaleA = useTransform(progress, [0, 0.45], [1, 0.82]);
  const opA = useTransform(progress, [0, 0.35, 0.48], [1, 0.8, 0]);

  // Letter R1: Drops Down-Left, rotates clockwise
  const xR1 = useTransform(progress, [0, 0.45], [0, -90]);
  const yR1 = useTransform(progress, [0, 0.45], [0, 110]);
  const rotR1 = useTransform(progress, [0, 0.45], [0, 15]);
  const scaleR1 = useTransform(progress, [0, 0.45], [1, 0.9]);
  const opR1 = useTransform(progress, [0, 0.35, 0.48], [1, 0.8, 0]);

  // Letter T: Rockets Straight Up, expands and fades with a slight tilt
  const xT = useTransform(progress, [0, 0.45], [0, 0]);
  const yT = useTransform(progress, [0, 0.45], [0, -160]);
  const rotT = useTransform(progress, [0, 0.45], [0, -6]);
  const scaleT = useTransform(progress, [0, 0.45], [1, 1.2]);
  const opT = useTransform(progress, [0, 0.32, 0.45], [1, 0.75, 0]);

  // Letter R2: Drops Down-Right, rotates counter-clockwise
  const xR2 = useTransform(progress, [0, 0.45], [0, 80]);
  const yR2 = useTransform(progress, [0, 0.45], [0, 130]);
  const rotR2 = useTransform(progress, [0, 0.45], [0, -14]);
  const scaleR2 = useTransform(progress, [0, 0.45], [1, 0.88]);
  const opR2 = useTransform(progress, [0, 0.35, 0.48], [1, 0.8, 0]);

  // Letter O: Expands in place like a shockwave ring and lifts up
  const xO = useTransform(progress, [0, 0.45], [0, 110]);
  const yO = useTransform(progress, [0, 0.45], [0, -70]);
  const rotO = useTransform(progress, [0, 0.45], [0, 40]);
  const scaleO = useTransform(progress, [0, 0.45], [1, 1.35]);
  const opO = useTransform(progress, [0, 0.32, 0.45], [1, 0.7, 0]);

  // Letter N: Flies Far Down-Right, rotates clockwise
  const xN = useTransform(progress, [0, 0.45], [0, 200]);
  const yN = useTransform(progress, [0, 0.45], [0, 80]);
  const rotN = useTransform(progress, [0, 0.45], [0, 22]);
  const scaleN = useTransform(progress, [0, 0.45], [1, 0.8]);
  const opN = useTransform(progress, [0, 0.35, 0.48], [1, 0.8, 0]);

  return (
    <div
      className={`relative inline-flex items-center justify-center gap-1.5 sm:gap-3 md:gap-5 lg:gap-7 select-none gpu-accelerated ${className}`}
      style={{
        filter: 'drop-shadow(0 0 35px rgba(0, 163, 255, 0.35)) drop-shadow(0 0 70px rgba(0, 102, 255, 0.2))',
      }}
    >
      {/* ── Letter A ── */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : xA,
          y: shouldReduceMotion ? 0 : yA,
          rotate: shouldReduceMotion ? 0 : rotA,
          scale: shouldReduceMotion ? 1 : scaleA,
          opacity: shouldReduceMotion ? 1 : opA,
        }}
        className="w-10 sm:w-16 md:w-24 lg:w-32 xl:w-36 aspect-[100/120] will-change-transform shrink-0"
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

      {/* ── Letter R (First) ── */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : xR1,
          y: shouldReduceMotion ? 0 : yR1,
          rotate: shouldReduceMotion ? 0 : rotR1,
          scale: shouldReduceMotion ? 1 : scaleR1,
          opacity: shouldReduceMotion ? 1 : opR1,
        }}
        className="w-10 sm:w-16 md:w-24 lg:w-32 xl:w-36 aspect-[100/120] will-change-transform shrink-0"
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

      {/* ── Letter T ── */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : xT,
          y: shouldReduceMotion ? 0 : yT,
          rotate: shouldReduceMotion ? 0 : rotT,
          scale: shouldReduceMotion ? 1 : scaleT,
          opacity: shouldReduceMotion ? 1 : opT,
        }}
        className="w-10 sm:w-16 md:w-24 lg:w-32 xl:w-36 aspect-[100/120] will-change-transform shrink-0"
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

      {/* ── Letter R (Second) ── */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : xR2,
          y: shouldReduceMotion ? 0 : yR2,
          rotate: shouldReduceMotion ? 0 : rotR2,
          scale: shouldReduceMotion ? 1 : scaleR2,
          opacity: shouldReduceMotion ? 1 : opR2,
        }}
        className="w-10 sm:w-16 md:w-24 lg:w-32 xl:w-36 aspect-[100/120] will-change-transform shrink-0"
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

      {/* ── Letter O ── */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : xO,
          y: shouldReduceMotion ? 0 : yO,
          rotate: shouldReduceMotion ? 0 : rotO,
          scale: shouldReduceMotion ? 1 : scaleO,
          opacity: shouldReduceMotion ? 1 : opO,
        }}
        className="w-10 sm:w-16 md:w-24 lg:w-32 xl:w-36 aspect-[100/120] will-change-transform shrink-0"
      >
        <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="oLeftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00D2FF" />
              <stop offset="100%" stopColor="#0066FF" />
            </linearGradient>
            <linearGradient id="oRightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
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

      {/* ── Letter N ── */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : xN,
          y: shouldReduceMotion ? 0 : yN,
          rotate: shouldReduceMotion ? 0 : rotN,
          scale: shouldReduceMotion ? 1 : scaleN,
          opacity: shouldReduceMotion ? 1 : opN,
        }}
        className="w-10 sm:w-16 md:w-24 lg:w-32 xl:w-36 aspect-[100/120] will-change-transform shrink-0"
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
    </div>
  );
};
