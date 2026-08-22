'use client';

import React, { useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
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
    else if (latest < 0.5) setActiveStep(2);
    else if (latest < 0.75) setActiveStep(3);
    else setActiveStep(4);
  });

  // --- Sasaki Typography Kinematics ---
  const letterSpacing = useTransform(scrollYProgress, [0, 0.4], ['0.05em', '0.25em']);
  const titleScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.08]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35, 0.65], [1, 0.85, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.65], ['0%', '-8%']);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.18, 0.45], [1, 0.7, 0]);

  // --- Central Cyber Mesh / Logo Kinematics ---
  const meshScale = useTransform(scrollYProgress, [0, 0.4, 0.8], [0.85, 1, 0.8]);
  const meshOpacity = useTransform(scrollYProgress, [0, 0.3, 0.65], [0.4, 0.7, 0.15]);
  const meshRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  // --- Pillar Cards Cascading Kinematics (Appears quickly to eliminate dead space) ---
  const cardsY = useTransform(scrollYProgress, [0.04, 0.28], ['20vh', '0vh']);
  const cardsOpacity = useTransform(scrollYProgress, [0.04, 0.22], [0, 1]);

  // Scroll Hint fading
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <div 
      id="hero" 
      ref={containerRef} 
      className="relative w-full h-[110vh] sm:h-[120vh] bg-[#080B10] max-w-[100vw] overflow-x-hidden studio-grain"
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
          suppressHydrationWarning
          style={{ opacity: shouldReduceMotion ? 0.7 : scrollHintOpacity }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none font-mono text-[9px] sm:text-[10px] tracking-widest text-slate-500 uppercase will-change-opacity px-4 text-center whitespace-nowrap"
        >
          <span>{locale === 'ka' ? 'ჩამოსქროლეთ ეკოსისტემის გასაშლელად' : locale === 'ru' ? 'Листайте вниз для открытия' : 'Scroll to explore ecosystem'}</span>
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00A3FF] animate-bounce" />
        </motion.div>
      </div>
    </div>
  );
};
