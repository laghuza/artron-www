'use client';

import React from 'react';
import { motion, MotionValue, useReducedMotion } from 'framer-motion';
import { ArtronGeometricWordmark } from './ArtronGeometricWordmark';

interface KineticTypoHeaderProps {
  letterSpacing: MotionValue<string>;
  titleScale: MotionValue<number>;
  titleOpacity: MotionValue<number>;
  titleY: MotionValue<string>;
  subtitleOpacity: MotionValue<number>;
  scrollYProgress?: MotionValue<number>;
  locale: string;
}

export const KineticTypoHeader: React.FC<KineticTypoHeaderProps> = ({
  titleScale,
  titleOpacity,
  titleY,
  subtitleOpacity,
  scrollYProgress,
  locale
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      suppressHydrationWarning
      style={{
        opacity: shouldReduceMotion ? 1 : titleOpacity,
        scale: shouldReduceMotion ? 1 : titleScale,
        y: shouldReduceMotion ? '0%' : titleY,
      }}
      className="absolute inset-0 flex flex-col items-center justify-center z-20 px-3 sm:px-4 text-center gpu-accelerated overflow-visible max-w-full"
    >
      {/* Studio Micro-Index Badge */}
      <motion.div
        suppressHydrationWarning
        style={{ opacity: shouldReduceMotion ? 1 : subtitleOpacity }}
        className="flex items-center gap-2.5 px-3.5 py-1 mb-4 sm:mb-6 rounded-full border border-cyan-500/20 bg-cyan-950/20 backdrop-blur-md will-change-opacity pointer-events-none"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
        <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-cyan-400 uppercase">
          {locale === 'ka' ? 'სპორტული ეკოსისტემა // 2026' : locale === 'ru' ? 'СПОРТИВНАЯ ЭКОСИСТЕМА // 2026' : 'SPORTS ECOSYSTEM // 2026'}
        </span>
      </motion.div>

      {/* Monumental Kinetic Geometric Wordmark (A R T R O N) */}
      <div className="flex justify-center items-center w-full max-w-full pointer-events-none">
        <ArtronGeometricWordmark
          scrollYProgress={scrollYProgress}
          shouldReduceMotion={shouldReduceMotion}
          className="my-1 sm:my-2"
        />
      </div>
    </motion.div>
  );
};

