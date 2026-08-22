'use client';

import React from 'react';
import { motion, MotionValue, useReducedMotion } from 'framer-motion';
import { useGlyphKinematics } from './glyphs/useGlyphKinematics';

interface KineticArtronGlyphsProps {
  scrollYProgress: MotionValue<number>;
  titleOpacity: MotionValue<number>;
  isMobile?: boolean;
}

export const KineticArtronGlyphs: React.FC<KineticArtronGlyphsProps> = ({
  scrollYProgress,
  titleOpacity,
  isMobile = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const k = useGlyphKinematics(scrollYProgress, isMobile);

  const glyphSize = isMobile
    ? 'w-11 h-16 sm:w-16 sm:h-24'
    : 'w-16 h-24 md:w-24 md:h-36 lg:w-32 lg:h-48';

  return (
    <motion.div
      style={{
        x: shouldReduceMotion ? 0 : k.globalAscendX,
        y: shouldReduceMotion ? 0 : k.globalAscendY,
        scale: shouldReduceMotion ? 1 : k.globalGlyphScale,
        opacity: shouldReduceMotion ? titleOpacity : k.glyphsAlpha,
      }}
      className="relative flex items-center justify-center gap-1.5 sm:gap-3 md:gap-4 lg:gap-6 pointer-events-none select-none will-change-transform z-20"
    >
      {/* ════ LETTER A ════ */}
      <div className={`relative ${glyphSize} shrink-0`}>
        <svg viewBox="0 0 100 140" className="w-full h-full overflow-visible drop-shadow-[0_0_25px_rgba(0,163,255,0.45)]">
          <defs>
            <linearGradient id="grad-a-left" x1="0%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#0055E5" />
              <stop offset="100%" stopColor="#00A3FF" />
            </linearGradient>
            <linearGradient id="grad-a-right" x1="50%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00A3FF" />
              <stop offset="100%" stopColor="#00E5FF" />
            </linearGradient>
            <linearGradient id="grad-a-bar" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#00A3FF" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 50 12 L 10 132 L 28 132 L 50 48 Z"
            fill="url(#grad-a-left)"
            style={{
              x: shouldReduceMotion ? 0 : k.a.aLeftX,
              y: shouldReduceMotion ? 0 : k.a.aLeftY,
              rotate: shouldReduceMotion ? 0 : k.a.aLeftRot,
            }}
            className="will-change-transform"
          />
          <motion.path
            d="M 50 12 L 50 48 L 72 132 L 90 132 Z"
            fill="url(#grad-a-right)"
            style={{
              x: shouldReduceMotion ? 0 : k.a.aRightX,
              y: shouldReduceMotion ? 0 : k.a.aRightY,
              rotate: shouldReduceMotion ? 0 : k.a.aRightRot,
            }}
            className="will-change-transform"
          />
          <motion.rect
            x="26"
            y="82"
            width="48"
            height="18"
            rx="4"
            fill="url(#grad-a-bar)"
            style={{
              x: shouldReduceMotion ? 0 : k.a.aBarX,
              y: shouldReduceMotion ? 0 : k.a.aBarY,
              rotate: shouldReduceMotion ? 0 : k.a.aBarRot,
            }}
            className="will-change-transform"
          />
        </svg>
      </div>

      {/* ════ LETTER R (1) ════ */}
      <div className={`relative ${glyphSize} shrink-0`}>
        <svg viewBox="0 0 100 140" className="w-full h-full overflow-visible drop-shadow-[0_0_25px_rgba(0,163,255,0.45)]">
          <defs>
            <linearGradient id="grad-r-stem" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#0055E5" />
            </linearGradient>
            <linearGradient id="grad-r-loop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00A3FF" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
            <linearGradient id="grad-r-leg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00A3FF" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          <motion.rect
            x="10"
            y="12"
            width="20"
            height="120"
            rx="4"
            fill="url(#grad-r-stem)"
            style={{
              x: shouldReduceMotion ? 0 : k.r1.r1StemX,
              y: shouldReduceMotion ? 0 : k.r1.r1StemY,
              rotate: shouldReduceMotion ? 0 : k.r1.r1StemRot,
            }}
            className="will-change-transform"
          />
          <motion.path
            d="M 30 12 L 68 12 C 84 12 92 24 92 42 C 92 60 84 72 68 72 L 30 72 Z M 30 30 L 62 30 C 69 30 73 34 73 42 C 73 50 69 54 62 54 L 30 54 Z"
            fill="url(#grad-r-loop)"
            style={{
              x: shouldReduceMotion ? 0 : k.r1.r1LoopX,
              y: shouldReduceMotion ? 0 : k.r1.r1LoopY,
              rotate: shouldReduceMotion ? 0 : k.r1.r1LoopRot,
            }}
            className="will-change-transform"
          />
          <motion.path
            d="M 48 68 L 74 132 L 94 132 L 66 68 Z"
            fill="url(#grad-r-leg)"
            style={{
              x: shouldReduceMotion ? 0 : k.r1.r1LegX,
              y: shouldReduceMotion ? 0 : k.r1.r1LegY,
              rotate: shouldReduceMotion ? 0 : k.r1.r1LegRot,
            }}
            className="will-change-transform"
          />
        </svg>
      </div>

      {/* ════ LETTER T ════ */}
      <div className={`relative ${glyphSize} shrink-0`}>
        <svg viewBox="0 0 100 140" className="w-full h-full overflow-visible drop-shadow-[0_0_25px_rgba(0,163,255,0.45)]">
          <defs>
            <linearGradient id="grad-t-top" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#00A3FF" />
            </linearGradient>
            <linearGradient id="grad-t-stem" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00A3FF" />
              <stop offset="100%" stopColor="#0055E5" />
            </linearGradient>
          </defs>
          <motion.rect
            x="8"
            y="12"
            width="84"
            height="20"
            rx="4"
            fill="url(#grad-t-top)"
            style={{
              x: shouldReduceMotion ? 0 : k.t.tTopX,
              y: shouldReduceMotion ? 0 : k.t.tTopY,
              rotate: shouldReduceMotion ? 0 : k.t.tTopRot,
            }}
            className="will-change-transform"
          />
          <motion.rect
            x="40"
            y="32"
            width="20"
            height="100"
            rx="4"
            fill="url(#grad-t-stem)"
            style={{
              x: shouldReduceMotion ? 0 : k.t.tStemX,
              y: shouldReduceMotion ? 0 : k.t.tStemY,
              rotate: shouldReduceMotion ? 0 : k.t.tStemRot,
            }}
            className="will-change-transform"
          />
        </svg>
      </div>

      {/* ════ LETTER R (2) ════ */}
      <div className={`relative ${glyphSize} shrink-0`}>
        <svg viewBox="0 0 100 140" className="w-full h-full overflow-visible drop-shadow-[0_0_25px_rgba(0,163,255,0.45)]">
          <motion.rect
            x="10"
            y="12"
            width="20"
            height="120"
            rx="4"
            fill="url(#grad-r-stem)"
            style={{
              x: shouldReduceMotion ? 0 : k.r2.r2StemX,
              y: shouldReduceMotion ? 0 : k.r2.r2StemY,
              rotate: shouldReduceMotion ? 0 : k.r2.r2StemRot,
            }}
            className="will-change-transform"
          />
          <motion.path
            d="M 30 12 L 68 12 C 84 12 92 24 92 42 C 92 60 84 72 68 72 L 30 72 Z M 30 30 L 62 30 C 69 30 73 34 73 42 C 73 50 69 54 62 54 L 30 54 Z"
            fill="url(#grad-r-loop)"
            style={{
              x: shouldReduceMotion ? 0 : k.r2.r2LoopX,
              y: shouldReduceMotion ? 0 : k.r2.r2LoopY,
              rotate: shouldReduceMotion ? 0 : k.r2.r2LoopRot,
            }}
            className="will-change-transform"
          />
          <motion.path
            d="M 48 68 L 74 132 L 94 132 L 66 68 Z"
            fill="url(#grad-r-leg)"
            style={{
              x: shouldReduceMotion ? 0 : k.r2.r2LegX,
              y: shouldReduceMotion ? 0 : k.r2.r2LegY,
              rotate: shouldReduceMotion ? 0 : k.r2.r2LegRot,
            }}
            className="will-change-transform"
          />
        </svg>
      </div>

      {/* ════ LETTER O ════ */}
      <div className={`relative ${glyphSize} shrink-0`}>
        <svg viewBox="0 0 100 140" className="w-full h-full overflow-visible drop-shadow-[0_0_25px_rgba(0,163,255,0.45)]">
          <defs>
            <linearGradient id="grad-o-left" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#0055E5" />
            </linearGradient>
            <linearGradient id="grad-o-right" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00A3FF" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 50 12 C 24 12 10 38 10 72 C 10 106 24 132 50 132 L 50 112 C 34 112 28 92 28 72 C 28 52 34 32 50 32 Z"
            fill="url(#grad-o-left)"
            style={{
              x: shouldReduceMotion ? 0 : k.o.oLeftX,
              y: shouldReduceMotion ? 0 : k.o.oLeftY,
              rotate: shouldReduceMotion ? 0 : k.o.oLeftRot,
            }}
            className="will-change-transform"
          />
          <motion.path
            d="M 50 12 C 76 12 90 38 90 72 C 90 106 76 132 50 132 L 50 112 C 66 112 72 92 72 72 C 72 52 66 32 50 32 Z"
            fill="url(#grad-o-right)"
            style={{
              x: shouldReduceMotion ? 0 : k.o.oRightX,
              y: shouldReduceMotion ? 0 : k.o.oRightY,
              rotate: shouldReduceMotion ? 0 : k.o.oRightRot,
            }}
            className="will-change-transform"
          />
        </svg>
      </div>

      {/* ════ LETTER N ════ */}
      <div className={`relative ${glyphSize} shrink-0`}>
        <svg viewBox="0 0 100 140" className="w-full h-full overflow-visible drop-shadow-[0_0_25px_rgba(0,163,255,0.45)]">
          <defs>
            <linearGradient id="grad-n-left" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#00A3FF" />
            </linearGradient>
            <linearGradient id="grad-n-diag" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00A3FF" />
              <stop offset="100%" stopColor="#0055E5" />
            </linearGradient>
            <linearGradient id="grad-n-right" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#00A3FF" />
            </linearGradient>
          </defs>
          <motion.rect
            x="10"
            y="12"
            width="20"
            height="120"
            rx="4"
            fill="url(#grad-n-left)"
            style={{
              x: shouldReduceMotion ? 0 : k.n.nLeftX,
              y: shouldReduceMotion ? 0 : k.n.nLeftY,
              rotate: shouldReduceMotion ? 0 : k.n.nLeftRot,
            }}
            className="will-change-transform"
          />
          <motion.path
            d="M 18 12 L 82 126 L 82 132 L 64 132 L 10 22 Z"
            fill="url(#grad-n-diag)"
            style={{
              x: shouldReduceMotion ? 0 : k.n.nDiagX,
              y: shouldReduceMotion ? 0 : k.n.nDiagY,
              rotate: shouldReduceMotion ? 0 : k.n.nDiagRot,
            }}
            className="will-change-transform"
          />
          <motion.rect
            x="70"
            y="12"
            width="20"
            height="120"
            rx="4"
            fill="url(#grad-n-right)"
            style={{
              x: shouldReduceMotion ? 0 : k.n.nRightX,
              y: shouldReduceMotion ? 0 : k.n.nRightY,
              rotate: shouldReduceMotion ? 0 : k.n.nRightRot,
            }}
            className="will-change-transform"
          />
        </svg>
      </div>
    </motion.div>
  );
};
