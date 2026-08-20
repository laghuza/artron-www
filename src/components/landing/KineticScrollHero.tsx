'use client';

import React, { useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Header } from '@/components/Header';
import { KineticTypoHeader } from './kinetic/KineticTypoHeader';
import { KineticCentralMesh } from './kinetic/KineticCentralMesh';
import { KineticPillarCards } from './kinetic/KineticPillarCards';
import { KineticProgressRail } from './kinetic/KineticProgressRail';
import { ChevronDown } from 'lucide-react';

export const KineticScrollHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { locale } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(1);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track progress step for vertical rail
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.25) setActiveStep(1);
    else if (latest < 0.55) setActiveStep(2);
    else if (latest < 0.85) setActiveStep(3);
    else setActiveStep(4);
  });

  // --- Sasaki Typography Kinematics ---
  // Letter spacing expands from 0.05em to 0.55em (Desktop)
  const letterSpacing = useTransform(scrollYProgress, [0, 0.35], ['0.05em', '0.55em']);
  // Title scales up as letters disperse
  const titleScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.45]);
  // Title fades out as cards emerge
  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.45], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.45], ['0%', '-20%']);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // --- Central Cyber Mesh Kinematics ---
  const meshScale = useTransform(scrollYProgress, [0.15, 0.55, 0.9], [0.6, 1.15, 0.9]);
  const meshOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.85], [0, 0.95, 0.3]);
  const meshRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  // --- Pillar Cards Cascading Kinematics ---
  // Bottom-up entrance from 80vh to 0vh
  const cardsY = useTransform(scrollYProgress, [0.4, 0.75], ['80vh', '0vh']);
  const cardsOpacity = useTransform(scrollYProgress, [0.38, 0.65], [0, 1]);

  // Scroll Hint fading
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <div 
      id="hero" 
      ref={containerRef} 
      className="relative w-full h-[280vh] md:h-[320vh] bg-[#080B10] max-w-[100vw] overflow-x-hidden"
    >
      {/* Sticky Viewport Stage with Hardware Acceleration */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center select-none studio-perspective gpu-accelerated max-w-full">
        {/* Ambient Studio Backgrounds */}
        <div className="absolute inset-0 studio-grid-bg opacity-40 pointer-events-none will-change-opacity" />
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#080B10] to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#080B10] to-transparent z-20 pointer-events-none" />

        {/* Global Navigation Header */}
        <div className="w-full relative z-40 px-2 sm:px-4 pt-2">
          <Header />
        </div>

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

        {/* Layer 3: Cascading Studio Pillar Cards */}
        <KineticPillarCards
          cardsY={cardsY}
          cardsOpacity={cardsOpacity}
          locale={locale}
        />

        {/* Layer 4: Vertical Progress Rail */}
        <KineticProgressRail
          scrollYProgress={scrollYProgress}
          activeStep={activeStep}
        />

        {/* Layer 5: Initial Scroll Prompt */}
        <motion.div 
          style={{ opacity: shouldReduceMotion ? 0.7 : scrollHintOpacity }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none font-mono text-[9px] sm:text-[10px] tracking-widest text-slate-500 uppercase will-change-opacity px-4 text-center whitespace-nowrap"
        >
          <span>{locale === 'ka' ? 'ჩამოსქროლეთ ეკოსისტემის გასაშლელად' : locale === 'ru' ? 'Листайте вниз для открытия' : 'Scroll to explore ecosystem'}</span>
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 animate-bounce" />
        </motion.div>
      </div>
    </div>
  );
};
