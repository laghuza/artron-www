'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ALL_DIMENSIONS } from './data';
import { MirrorSceneCanvas } from './scene3d/MirrorSceneCanvas';
import { MirrorUnifiedCockpitDeck } from './hud/MirrorUnifiedCockpitDeck';
import { useLanguage, Locale } from '@/context/LanguageContext';

const SLOGANS: Record<Locale, string> = {
  ka: 'ობიექტური მონაცემები, სრული გამჭვირვალობა და ნულოვანი მიკერძოება.',
  en: 'Objective data, complete transparency, and zero bias.',
  ru: 'Объективные данные, полная прозрачность и ноль предвзятости.',
};

export const PureSportsMirror: React.FC = () => {
  const { locale } = useLanguage();
  const [dimIndex, setDimIndex] = useState<number>(0);
  const [modIndex, setModIndex] = useState<number>(0);
  const [tileIndex, setTileIndex] = useState<number | null>(null);
  const [is3DFocus, setIs3DFocus] = useState<boolean>(false);

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

  const handleToggle3DFocus = () => {
    setIs3DFocus((prev) => !prev);
  };

  // Keyboard navigation (Arrow keys & Esc, scoped to when section is in viewport)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      const sectionEl = document.getElementById('pure-sports-mirror');
      if (sectionEl) {
        const rect = sectionEl.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.65 && rect.bottom > window.innerHeight * 0.35;
        if (!inView) return;
      }
      if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'Escape') {
        setTileIndex(null);
        setIs3DFocus(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [step]);

  return (
    <section
      id="pure-sports-mirror"
      aria-label="SPORT-OS Infrastructure Matrix"
      className={`relative w-full ${
        is3DFocus ? 'h-[calc(100vh-88px)]' : 'min-h-[560px] lg:min-h-[640px] xl:min-h-[720px] h-auto lg:h-[calc(100vh-88px)]'
      } max-h-none lg:max-h-[1080px] bg-[#060911] text-[#EAF2F8] overflow-hidden select-none scroll-mt-[88px] flex flex-col justify-between p-3 sm:p-4 lg:p-5`}
    >
      {/* Layer 1: Procedural WebGL 3D Canvas (Preserved 3D visual dominance) */}
      <MirrorSceneCanvas
        variant={currentMod.sceneVariant}
        accent={currentDim.accentColor}
        focusTileIndex={tileIndex}
        shift={0.44}
        is3DFocus={is3DFocus}
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
        is3DFocus={is3DFocus}
        onToggle3DFocus={handleToggle3DFocus}
        onSelectDimension={handleSelectDim}
        onSelectModule={handleSelectMod}
        onNextModule={() => step(1)}
        onToggleTile={handleToggleTile}
      />

      {/* Layer 4: Mobile Flow Slogan - Naturally positioned below the cockpit deck to prevent overlapping with accordion cards */}
      {!is3DFocus && (
        <div className="flex lg:hidden flex-col items-center justify-center text-center gap-1 pt-2 pb-1 px-2 z-10 pointer-events-none select-none">
          <span className="text-[11px] sm:text-xs font-light tracking-[0.01em] text-[#EEF6FC]/70 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            {currentSlogan}
          </span>
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#EEF6FC]/40">
            ARTRON
          </span>
        </div>
      )}

      {/* Layer 5: Desktop Watermark - Preserved absolute positioning in bottom-right corner */}
      <div className="hidden lg:flex absolute right-6 bottom-5 z-10 flex-col items-end gap-1.5 text-right pointer-events-none select-none">
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
