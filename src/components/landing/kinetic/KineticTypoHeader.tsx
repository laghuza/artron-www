'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, MotionValue, useReducedMotion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';


interface KineticTypoHeaderProps {
  letterSpacing: MotionValue<string>;
  titleScale: MotionValue<number>;
  titleOpacity: MotionValue<number>;
  titleY: MotionValue<string>;
  subtitleOpacity: MotionValue<number>;
  scrollYProgress?: MotionValue<number>;
  locale: string;
}

/* ─── Magnetic Neon Pulse CTA ─── */
const MagneticCTA: React.FC<{ locale: string; subtitleOpacity: MotionValue<number>; shouldReduceMotion: boolean | null }> = ({
  locale, subtitleOpacity, shouldReduceMotion
}) => {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 260, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 260, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!btnRef.current || shouldReduceMotion) return;
    const rect = btnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set((e.clientX - cx) * 0.35);
    rawY.set((e.clientY - cy) * 0.35);
  }, [rawX, rawY, shouldReduceMotion]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.div
      suppressHydrationWarning
      style={{ opacity: shouldReduceMotion ? 1 : subtitleOpacity }}
      className="mt-8 sm:mt-10 flex items-center justify-center gap-3 flex-wrap will-change-opacity pointer-events-auto"
    >
      {/* Primary Neon Pulse CTA */}
      <motion.a
        ref={btnRef}
        href="/get-started"
        style={{
          x: shouldReduceMotion ? 0 : springX,
          y: shouldReduceMotion ? 0 : springY,
          background: 'linear-gradient(135deg, #0066FF, #00A3FF, #00D2FF)',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="group relative inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm text-white overflow-hidden cta-neon-border cursor-pointer"
        role="link"
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(135deg, #0066FF, #00A3FF, #00D2FF)' }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        {/* Shimmer layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-full" />
        {/* Neon glow ring */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: '0 0 28px rgba(0,163,255,0.7), 0 0 60px rgba(0,163,255,0.35), inset 0 0 20px rgba(0,163,255,0.1)' }}
        />
        <Zap className="relative w-4 h-4 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
        <span className="relative drop-shadow-[0_0_8px_rgba(0,163,255,0.5)]">
          {locale === 'ka' ? 'მოითხოვეთ დემო' : locale === 'ru' ? 'Запросить демо' : 'Request Demo'}
        </span>
        <ArrowRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </motion.a>

      {/* Ghost secondary CTA */}
      <motion.a
        href="#dual-core"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-medium text-slate-300 border border-white/[0.14] backdrop-blur-sm hover:border-cyan-500/40 hover:text-white hover:bg-cyan-950/20 transition-all duration-300 cursor-pointer"
        role="link"
      >
        {locale === 'ka' ? 'ეკოსისტემა იხილეთ' : locale === 'ru' ? 'Смотреть экосистему' : 'Explore Ecosystem'}
        <ArrowRight className="w-3.5 h-3.5" />
      </motion.a>
    </motion.div>
  );
};

import { ArtronGeometricWordmark } from './ArtronGeometricWordmark';

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
      className="absolute inset-0 flex flex-col items-center justify-center z-20 px-3 sm:px-4 text-center gpu-accelerated overflow-hidden max-w-full"
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
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-center items-center w-full max-w-full pointer-events-none"
      >
        <ArtronGeometricWordmark
          scrollYProgress={scrollYProgress}
          shouldReduceMotion={shouldReduceMotion}
          className="my-1 sm:my-2"
        />
      </motion.div>

      {/* Editorial Sub-Headline */}
      <motion.p
        suppressHydrationWarning
        style={{ opacity: shouldReduceMotion ? 1 : subtitleOpacity }}
        className="mt-4 sm:mt-6 max-w-xl md:max-w-2xl text-xs sm:text-sm md:text-lg text-slate-400 font-light tracking-wide px-3 sm:px-4 will-change-opacity pointer-events-none"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
      >
        {locale === 'ka'
          ? 'ფიტნეს დარბაზების, აუზებისა და სპორტკომპლექსების მართვის ავტომატიზაცია. B2B სამართავი პანელი, IoT ტურნიკეტები და B2C მობილური აპლიკაცია.'
          : locale === 'ru'
          ? 'Автоматизация управления фитнес-клубами, бассейнами и спорткомплексами. B2B панель управления, IoT турникеты и B2C мобильное приложение.'
          : 'Next-Generation Operating System for Fitness Clubs, Pools & Sports Complexes. Cloud ERP, IoT Turnstile Relays & Athlete Mobile App.'}
      </motion.p>

      {/* Magnetic Neon Pulse CTA */}
      <MagneticCTA locale={locale} subtitleOpacity={subtitleOpacity} shouldReduceMotion={shouldReduceMotion} />
    </motion.div>
  );
};
