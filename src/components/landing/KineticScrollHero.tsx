'use client';

import React, { useRef, useState } from 'react';
import { useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { DaisiSpatialCanvas } from './kinetic/DaisiSpatialCanvas';
import { ArtronMonolithFacets } from './kinetic/ArtronMonolithFacets';
import { ManifestoSloganAssembly } from './kinetic/ManifestoSloganAssembly';
import { ChevronDown } from 'lucide-react';

export const KineticScrollHero: React.FC = () => {
  const { locale } = useLanguage();
  const shouldReduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [letterBounds, setLetterBounds] = useState<{
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;
  }>({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 0,
    height: 0,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (shouldReduce) {
      setScrollProgress(1);
      return;
    }
    setScrollProgress(latest);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('artron-hero-progress', { detail: { progress: latest } })
      );
    }
  });

  const p = shouldReduce ? 0 : scrollProgress;
  const auroraTransform = `scale(${1 + p * 0.35}) translate3d(0, ${-30 * p}px, 0)`;
  const scrollGuideOpacity = Math.max(0, 1 - p * 4);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-[160vh] md:h-[170vh] bg-[#020407] select-none"
      aria-label="ARTRON Daisi Choreography Hero"
    >
      {/* Pinned 100vh Stage Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#020407] perspective-[1800px] z-10 contain-paint">
        {/* Deep Multi-Layered Cosmic Radial Gradient Background */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 50% at 50% 30%, rgba(186, 230, 253, 0.045) 0%, transparent 75%),
              radial-gradient(ellipse 65% 45% at 50% 70%, rgba(133, 77, 14, 0.06) 0%, transparent 70%),
              radial-gradient(ellipse 95% 75% at 50% 50%, #0A0F1D 0%, #050811 55%, #020407 100%)
            `,
          }}
        />

        {/* Ambient Noise / Studio Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.028] pointer-events-none z-[1] studio-grain" />

        {/* Deep Horizon Vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-[3]"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(2, 4, 7, 0.65) 100%)',
          }}
        />

        {/* Alpenglow Horizon Atmospheric Glow */}
        <div
          className="absolute w-[1260px] h-[700px] rounded-full filter blur-[120px] pointer-events-none z-[2] will-change-transform"
          style={{
            background: `
              radial-gradient(ellipse 60% 45% at 50% 65%, rgba(212, 175, 55, 0.15) 0%, transparent 70%),
              radial-gradient(ellipse 85% 55% at 50% 30%, rgba(56, 189, 248, 0.08) 0%, transparent 75%)
            `,
            transform: auroraTransform,
          }}
        />

        {/* 1 · 3D Daisi Spatial Particle Canvas (3,000 Particles & 11 Sports Sculptures) */}
        <DaisiSpatialCanvas
          scrollProgress={p}
          letterBounds={letterBounds}
        />

        {/* 2 · Chiseled Titanium Monolith Wordmark (A-R-T-R-O-N Facet Explosion) */}
        <ArtronMonolithFacets
          scrollProgress={p}
          onBoundsChange={setLetterBounds}
        />

        {/* 3 · 3-Language Staggered Glyph Assembly & Slogan Ascension */}
        <ManifestoSloganAssembly
          scrollProgress={p}
          locale={locale}
        />

        {/* Bottom Initial Scroll Guidance */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 pointer-events-none font-mono text-[9px] sm:text-[10px] tracking-[0.35em] text-[#64748B] uppercase font-bold text-center whitespace-nowrap transition-opacity duration-150"
          style={{ opacity: scrollGuideOpacity }}
        >
          <span>
            {locale === 'ka'
              ? 'ჩამოსქროლეთ შესაძლებლობების სანახავად'
              : locale === 'ru'
              ? 'ЛИСТАЙТЕ ДЛЯ ОБЗОРА ВОЗМОЖНОСТЕЙ'
              : 'SCROLL TO EXPLORE CAPABILITIES'}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
