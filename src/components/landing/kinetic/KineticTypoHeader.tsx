'use client';

import React, { useEffect, useState } from 'react';
import { motion, MotionValue, useReducedMotion, useTransform } from 'framer-motion';

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
  letterSpacing,
  titleScale,
  titleOpacity,
  titleY,
  subtitleOpacity,
  scrollYProgress,
  locale
}) => {
  const letters = ['A', 'R', 'T', 'R', 'O', 'N'];
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Vertical letter dispersion offsets for mobile (< 768px)
  // Maps scroll progress [0, 0.4] to staggered vertical pixel offsets
  const mobileVerticalProgress = scrollYProgress || titleScale;
  
  // Staggered Y offsets per letter to achieve vertical dispersion on mobile
  const yOffset0 = useTransform(mobileVerticalProgress, [0, 0.4], [0, -32]);
  const yOffset1 = useTransform(mobileVerticalProgress, [0, 0.4], [0, 24]);
  const yOffset2 = useTransform(mobileVerticalProgress, [0, 0.4], [0, -40]);
  const yOffset3 = useTransform(mobileVerticalProgress, [0, 0.4], [0, 36]);
  const yOffset4 = useTransform(mobileVerticalProgress, [0, 0.4], [0, -22]);
  const yOffset5 = useTransform(mobileVerticalProgress, [0, 0.4], [0, 28]);
  const mobileYOffsets = [yOffset0, yOffset1, yOffset2, yOffset3, yOffset4, yOffset5];

  // Mobile-safe letter spacing (never exceeds 0.08em on mobile to prevent clipping)
  const mobileLetterSpacing = useTransform(
    mobileVerticalProgress, 
    [0, 0.35], 
    ['0.02em', '0.08em']
  );

  return (
    <motion.div 
      style={{ 
        opacity: shouldReduceMotion ? 1 : titleOpacity, 
        scale: shouldReduceMotion ? 1 : titleScale, 
        y: shouldReduceMotion ? '0%' : titleY 
      }}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-3 sm:px-4 text-center gpu-accelerated overflow-hidden max-w-full"
    >
      {/* Studio Micro-Index Badge */}
      <motion.div 
        style={{ opacity: shouldReduceMotion ? 1 : subtitleOpacity }}
        className="flex items-center gap-2.5 px-3.5 py-1 mb-4 sm:mb-5 rounded-full border border-cyan-500/20 bg-cyan-950/20 backdrop-blur-md will-change-opacity"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
        <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-cyan-400 uppercase">
          {locale === 'ka' ? 'სპორტული ეკოსისტემა // 2026' : locale === 'ru' ? 'СПОРТИВНАЯ ЭКОСИСТЕМА // 2026' : 'SPORTS ECOSYSTEM // 2026'}
        </span>
      </motion.div>

      {/* Monumental Kinetic Typo - GPU Accelerated with Vertical Dispersal on Mobile */}
      <motion.h1 
        style={{ letterSpacing: isMobile ? mobileLetterSpacing : letterSpacing }}
        className="text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-black tracking-tight text-white select-none transition-all duration-75 flex justify-center items-center font-sans drop-shadow-[0_0_45px_rgba(0,163,255,0.25)] will-change-transform max-w-full"
      >
        {letters.map((char, index) => (
          <motion.span
            key={index}
            style={{
              y: isMobile && !shouldReduceMotion ? mobileYOffsets[index] : 0,
            }}
            className="inline-block transition-transform duration-100 hover:text-cyan-400 gpu-accelerated"
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>

      {/* Editorial Sub-Headline */}
      <motion.p 
        style={{ opacity: shouldReduceMotion ? 1 : subtitleOpacity }}
        className="mt-4 sm:mt-6 max-w-xl md:max-w-2xl text-xs sm:text-sm md:text-lg text-slate-400 font-light tracking-wide px-3 sm:px-4 will-change-opacity"
      >
        {locale === 'ka' 
          ? 'ფიტნეს დარბაზების, აუზებისა და სპორტკომპლექსების მართვის ავტომატიზაცია. B2B სამართავი პანელი, IoT ტურნიკეტები და B2C მობილური აპლიკაცია.'
          : locale === 'ru'
          ? 'Автоматизация управления фитнес-клубами, бассейнами и спорткомплексами. B2B панель управления, IoT турникеты и B2C мобильное приложение.'
          : 'Next-Generation Operating System for Fitness Clubs, Pools & Sports Complexes. Cloud ERP, IoT Turnstile Relays & Athlete Mobile App.'}
      </motion.p>
    </motion.div>
  );
};
