'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ALL_DIMENSIONS } from './data';
import { MirrorSceneCanvas } from './scene3d/MirrorSceneCanvas';
import { MirrorDimensionPills } from './hud/MirrorDimensionPills';
import { MirrorSubNav } from './hud/MirrorSubNav';
import { MirrorKineticHeader } from './hud/MirrorKineticHeader';
import { MirrorSpecAccordion } from './hud/MirrorSpecAccordion';
import { useLanguage, Locale } from '@/context/LanguageContext';

const SLOGANS: Record<Locale, string> = {
  ka: 'მოძრაობა იბადება კავშირში',
  en: 'Motion is born in connection',
  ru: 'Движение рождается в связи',
};

export const PureSportsMirror: React.FC = () => {
  const { locale } = useLanguage();
  const [dimIndex, setDimIndex] = useState<number>(0);
  const [modIndex, setModIndex] = useState<number>(0);
  const [tileIndex, setTileIndex] = useState<number | null>(null);

  const currentDim = ALL_DIMENSIONS[dimIndex];
  const currentMod = currentDim.modules[modIndex];
  const currentSlogan = SLOGANS[locale] || SLOGANS.ka;

  // Navigation steps
  const step = useCallback(
    (dir: number) => {
      setModIndex((prevM) => {
        const nextM = prevM + dir;
        const total = currentDim.modules.length;
        if (nextM >= total) {
          setDimIndex((prevD) => (prevD + 1) % ALL_DIMENSIONS.length);
          return 0;
        } else if (nextM < 0) {
          const prevD = (dimIndex + ALL_DIMENSIONS.length - 1) % ALL_DIMENSIONS.length;
          setDimIndex(prevD);
          return ALL_DIMENSIONS[prevD].modules.length - 1;
        }
        return nextM;
      });
      setTileIndex(null);
    },
    [currentDim.modules.length, dimIndex]
  );

  const handleSelectDim = (index: number) => {
    setDimIndex(index);
    setModIndex(0);
    setTileIndex(null);
  };

  const handleSelectMod = (index: number) => {
    setModIndex(index);
    setTileIndex(null);
  };

  const handleToggleTile = (index: number) => {
    setTileIndex((prev) => (prev === index ? null : index));
  };

  // Keyboard navigation (Arrow keys & Esc)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'Escape') setTileIndex(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [step]);

  return (
    <section
      id="pure-sports-mirror"
      aria-label="SPORT-OS Systemic Mirror"
      className="relative w-full h-[calc(100vh-88px)] min-h-[640px] xl:min-h-[700px] max-h-[1080px] bg-[#060911] text-[#EAF2F8] overflow-hidden select-none scroll-mt-[88px] flex flex-col justify-between p-3 sm:p-5 lg:p-6"
    >
      {/* Layer 1: Procedural WebGL 3D Canvas (80% Visual Dominance with off-axis frustum) */}
      <MirrorSceneCanvas
        variant={currentMod.sceneVariant}
        accent={currentDim.accentColor}
        focusTileIndex={tileIndex}
        shift={0.42}
      />

      {/* Layer 2: Vignette Depth Gradient (Matching Claude Design) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(115% 85% at 62% 18%, rgba(6,9,17,0) 38%, rgba(4,6,12,0.62) 82%, rgba(3,5,10,0.9) 100%)',
        }}
      />

      {/* Layer 3: Top Navigation Bar (Dimension Pills & SubNav) */}
      <div className="relative z-10 flex flex-col gap-2.5 pointer-events-auto max-w-full">
        <MirrorDimensionPills
          dimensions={ALL_DIMENSIONS}
          activeDimensionIndex={dimIndex}
          onSelectDimension={handleSelectDim}
        />

        <MirrorSubNav
          modules={currentDim.modules}
          activeModuleIndex={modIndex}
          accentColor={currentDim.accentColor}
          onSelectModule={handleSelectMod}
          onNextModule={() => step(1)}
        />
      </div>

      {/* Layer 4: Floating Glassmorphic HUD (20% Text) & Footer Watermark */}
      <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-4 pointer-events-none min-h-0 mt-auto">
        {/* Left Floating Cockpit HUD (Matching Claude Design hudW & hudMax) */}
        <div
          className="pointer-events-auto w-full lg:max-w-[480px] max-h-[min(640px,calc(100vh-200px))] overflow-y-auto rounded-[26px] p-4 sm:p-5 lg:p-6 border border-white/[0.12] backdrop-blur-[28px] shadow-[0_26px_70px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.07)] scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
          style={{
            background: `radial-gradient(130% 80% at 0% 0%, ${currentDim.accentColor}1f, rgba(255,255,255,0) 62%), linear-gradient(150deg, rgba(255,255,255,0.08), rgba(255,255,255,0.022))`,
          }}
        >
          <MirrorKineticHeader
            headline={currentMod.headline}
            kicker={currentMod.kicker}
            accentColor={currentDim.accentColor}
            currentIndex={modIndex}
            totalCount={currentDim.modules.length}
          />

          <p className="text-xs sm:text-[13px] leading-[1.68] text-[#E6EFF6]/80 mb-3.5 font-normal max-w-[62ch]">
            {currentMod.description}
          </p>

          <MirrorSpecAccordion
            specRows={currentMod.specRows}
            cameraTags={currentMod.cameraTags}
            notes={currentMod.notes}
            accentColor={currentDim.accentColor}
            activeTileIndex={tileIndex}
            onToggleTile={handleToggleTile}
          />
        </div>

        {/* Right Watermark - ARTRON Brand & Localized Slogan */}
        <div className="flex flex-col items-end gap-1 pb-1 text-right pointer-events-none select-none md:mr-16 lg:mr-20">
          <span className="font-mono text-base sm:text-lg lg:text-xl font-bold tracking-[0.25em] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            <span className="text-white">AR</span><span className="text-[#00FF88]">T</span><span className="text-white">RON</span>
          </span>
          <span className="text-xs sm:text-[13px] font-normal tracking-wide text-slate-300/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            {currentSlogan}
          </span>
        </div>
      </div>
    </section>
  );
};
