'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ALL_DIMENSIONS } from './data';
import { MirrorSceneCanvas } from './scene3d/MirrorSceneCanvas';
import { MirrorUnifiedCockpitDeck } from './hud/MirrorUnifiedCockpitDeck';
import { useLanguage, Locale } from '@/context/LanguageContext';

const SLOGANS: Record<Locale, string> = {
  ka: 'არვის მეგობარი — ყველას მოკავშირე.',
  en: 'Friend to none — ally to all.',
  ru: 'Никому не друг — союзник всем.',
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
      className="relative w-full min-h-[560px] lg:min-h-[640px] xl:min-h-[720px] h-auto lg:h-[calc(100vh-88px)] max-h-[1080px] bg-[#060911] text-[#EAF2F8] overflow-hidden select-none scroll-mt-[88px] flex flex-col justify-between p-3 sm:p-4 lg:p-5"
    >
      {/* Layer 1: Procedural WebGL 3D Canvas (Preserved 3D visual dominance) */}
      <MirrorSceneCanvas
        variant={currentMod.sceneVariant}
        accent={currentDim.accentColor}
        focusTileIndex={tileIndex}
        shift={0.44}
      />

      {/* Layer 2: Vignette Depth Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(115% 85% at 62% 18%, rgba(6,9,17,0) 38%, rgba(4,6,12,0.62) 82%, rgba(3,5,10,0.9) 100%)',
        }}
      />

      {/* Layer 3: Unified Cyber Cockpit Deck (Centered Navigation + Left Data Flank + Visual Bridge) */}
      <MirrorUnifiedCockpitDeck
        dimensions={ALL_DIMENSIONS}
        activeDimensionIndex={dimIndex}
        currentDimension={currentDim}
        currentModule={currentMod}
        activeModuleIndex={modIndex}
        activeTileIndex={tileIndex}
        accentColor={currentDim.accentColor}
        onSelectDimension={handleSelectDim}
        onSelectModule={handleSelectMod}
        onNextModule={() => step(1)}
        onToggleTile={handleToggleTile}
      />

      {/* Layer 4: Right Watermark - ARTRON Brand & Localized Slogan */}
      <div className="absolute right-4 bottom-4 lg:right-6 lg:bottom-5 z-10 flex flex-col items-end gap-1.5 text-right pointer-events-none select-none">
        <span className="text-[11px] sm:text-xs font-light tracking-[0.01em] text-[#EEF6FC]/70 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
          {currentSlogan}
        </span>
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#EEF6FC]/40">
          ARTRON
        </span>
      </div>
    </section>
  );
};
