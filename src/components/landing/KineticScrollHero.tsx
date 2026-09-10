'use client';

import React, { useRef } from 'react';
import { useScroll, useTransform, motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { KineticTypoHeader } from './kinetic/KineticTypoHeader';
import { KineticCentralMesh } from './kinetic/KineticCentralMesh';
import { ChevronDown } from 'lucide-react';

export const KineticScrollHero: React.FC = () => {
  const { locale } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();

  // --- Sasaki Typography Kinematics (Direct window.scrollY sync [0 -> 260px]) ---
  const letterSpacing = useTransform(scrollY, [0, 260], ['0.05em', '0.20em'], { clamp: true });
  const titleScale = useTransform(scrollY, [0, 260], [1, 1.05], { clamp: true });
  const titleOpacity = useTransform(scrollY, [0, 180, 260], [1, 0.85, 0], { clamp: true });
  const titleY = useTransform(scrollY, [0, 260], ['0%', '-6%'], { clamp: true });
  const subtitleOpacity = useTransform(scrollY, [0, 100], [1, 0], { clamp: true });

  // --- Central Cyber Mesh / Logo Kinematics ---
  const meshScale = useTransform(scrollY, [0, 140, 260], [0.85, 1.04, 0.75], { clamp: true });
  const meshOpacity = useTransform(scrollY, [0, 120, 260], [0.35, 0.65, 0], { clamp: true });
  const meshRotate = useTransform(scrollY, [0, 260], [0, 30], { clamp: true });

  // Scroll Hint fading
  const scrollHintOpacity = useTransform(scrollY, [0, 70], [1, 0], { clamp: true });

  return (
    <div 
      id="hero" 
      className="relative w-full min-h-screen bg-[#080B10] max-w-[100vw] overflow-hidden studio-grain flex flex-col justify-between items-center select-none studio-perspective gpu-accelerated"
    >
      {/* Ambient Studio Backgrounds */}
      <div className="absolute inset-0 studio-grid-bg opacity-15 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none will-change-opacity" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#080B10] to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#080B10] to-transparent z-20 pointer-events-none" />

      {/* Layer 1: Monumental Kinetic Typography */}
      <KineticTypoHeader
        letterSpacing={letterSpacing}
        titleScale={titleScale}
        titleOpacity={titleOpacity}
        titleY={titleY}
        subtitleOpacity={subtitleOpacity}
        scrollYProgress={scrollY}
        locale={locale}
      />

      {/* Layer 2: Central Cyber Mesh */}
      <KineticCentralMesh
        meshScale={meshScale}
        meshOpacity={meshOpacity}
        meshRotate={meshRotate}
      />

      {/* Initial Scroll Prompt */}
      <motion.div 
        suppressHydrationWarning
        style={{ opacity: shouldReduceMotion ? 0.7 : scrollHintOpacity }}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 pointer-events-none font-mono text-[8.5px] sm:text-[9.5px] tracking-widest text-slate-500 uppercase will-change-opacity px-4 text-center whitespace-nowrap"
      >
        <span>{locale === 'ka' ? 'ჩამოსქროლეთ ეკოსისტემის გასაშლელად' : locale === 'ru' ? 'Листайте вниз для открытия' : 'Scroll to explore ecosystem'}</span>
        <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00A3FF] animate-bounce" />
      </motion.div>
    </div>
  );
};

