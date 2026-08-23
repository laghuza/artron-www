'use client';

import React, { useRef } from 'react';
import { useScroll, useTransform, motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { KineticTypoHeader } from './kinetic/KineticTypoHeader';
import { KineticCentralMesh } from './kinetic/KineticCentralMesh';
import { IgnitionButton } from '@/components/ui/IgnitionButton';
import { ChevronDown } from 'lucide-react';

export const KineticScrollHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // --- Sasaki Typography Kinematics ---
  const letterSpacing = useTransform(scrollYProgress, [0, 0.5], ['0.05em', '0.25em']);
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [1, 0.8, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.7], ['0%', '-10%']);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // --- Central Cyber Mesh / Logo Kinematics ---
  const meshScale = useTransform(scrollYProgress, [0, 0.5, 0.85], [0.85, 1.05, 0.75]);
  const meshOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7], [0.45, 0.65, 0.1]);
  const meshRotate = useTransform(scrollYProgress, [0, 1], [0, 60]);

  // Scroll Hint fading
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div 
      id="hero" 
      ref={containerRef} 
      className="relative w-full h-[125vh] sm:h-[135vh] bg-[#080B10] max-w-[100vw] overflow-x-hidden studio-grain"
    >
      {/* Sticky Viewport Stage with Hardware Acceleration */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center select-none studio-perspective gpu-accelerated max-w-full">
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
          scrollYProgress={scrollYProgress}
          locale={locale}
        />

        {/* Layer 2: Central Cyber Mesh */}
        <KineticCentralMesh
          meshScale={meshScale}
          meshOpacity={meshOpacity}
          meshRotate={meshRotate}
        />

        {/* Layer 3: Interactive Hero Ignition Trigger */}
        <motion.div
          suppressHydrationWarning
          style={{ opacity: shouldReduceMotion ? 1 : subtitleOpacity }}
          className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-30 flex flex-col sm:flex-row items-center gap-3 px-4 max-w-full"
        >
          <IgnitionButton
            href="/sports-os"
            variant="emerald"
            size="md"
            className="shadow-[0_0_35px_rgba(0,255,135,0.4)]"
            aria-label="Sport OS Ignition Hero"
          >
            {locale === 'ka'
              ? 'Sport OS-ის ჩართვა'
              : locale === 'ru'
              ? 'Запуск Sport OS'
              : 'Launch Sport OS'}
          </IgnitionButton>
        </motion.div>

        {/* Layer 4: Initial Scroll Prompt */}
        <motion.div 
          suppressHydrationWarning
          style={{ opacity: shouldReduceMotion ? 0.7 : scrollHintOpacity }}
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 pointer-events-none font-mono text-[8.5px] sm:text-[9.5px] tracking-widest text-slate-500 uppercase will-change-opacity px-4 text-center whitespace-nowrap"
        >
          <span>{locale === 'ka' ? 'ჩამოსქროლეთ ეკოსისტემის გასაშლელად' : locale === 'ru' ? 'Листайте вниз для открытия' : 'Scroll to explore ecosystem'}</span>
          <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00A3FF] animate-bounce" />
        </motion.div>
      </div>
    </div>
  );
};

