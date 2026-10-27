'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MirrorDimension, MirrorModule } from '../data/mirrorDataTypes';
import { MirrorDimensionPills } from './MirrorDimensionPills';
import { MirrorSubNav } from './MirrorSubNav';
import { MirrorMobileSubNavLens } from './MirrorMobileSubNavLens';
import { MirrorKineticHeader } from './MirrorKineticHeader';
import { MirrorSpecAccordion } from './MirrorSpecAccordion';

interface MirrorUnifiedCockpitDeckProps {
  dimensions: MirrorDimension[];
  activeDimensionIndex: number;
  currentDimension: MirrorDimension;
  currentModule: MirrorModule;
  activeModuleIndex: number;
  activeTileIndex: number | null;
  accentColor: string;
  is3DFocus?: boolean;
  onToggle3DFocus?: () => void;
  onSelectDimension: (index: number) => void;
  onSelectModule: (index: number) => void;
  onNextModule: () => void;
  onToggleTile: (index: number) => void;
}

export const MirrorUnifiedCockpitDeck: React.FC<MirrorUnifiedCockpitDeckProps> = ({
  dimensions,
  activeDimensionIndex,
  currentDimension,
  currentModule,
  activeModuleIndex,
  activeTileIndex,
  accentColor,
  is3DFocus = false,
  onToggle3DFocus,
  onSelectDimension,
  onSelectModule,
  onNextModule,
  onToggleTile,
}) => {
  return (
    <div className="relative z-20 pointer-events-none w-full max-w-full flex flex-col">
      {/* ── DESKTOP (lg+): SEAMLESS INTEGRATED L-SHAPED COMMAND DECK ── */}
      <div className="hidden lg:flex flex-col w-full pointer-events-none">
        {/* Continuous Integrated Frame: Top Nav & Left HUD united */}
        <div className="relative flex flex-col items-start w-full">
          {/* 1. TOP HORIZONTAL COMMAND CANOPY */}
          <div className="w-full flex items-center justify-center relative pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="pointer-events-auto flex flex-col items-center gap-2 px-5 py-2.5 rounded-[26px] border border-white/[0.12] backdrop-blur-[10px] transition-all duration-500 max-w-[1160px] xl:max-w-[1240px] w-full"
              style={{
                background: `radial-gradient(120% 120% at 50% 0%, ${accentColor}10 0%, rgba(6, 10, 18, 0.20) 70%)`,
                boxShadow: `0 12px 36px rgba(0,0,0,0.3), 0 0 25px ${accentColor}0a, inset 0 1px 0 rgba(255,255,255,0.12)`,
              }}
            >
              {/* Primary Dimensions (I, II, III) */}
              <MirrorDimensionPills
                dimensions={dimensions}
                activeDimensionIndex={activeDimensionIndex}
                onSelectDimension={onSelectDimension}
              />

              {/* Sub-Nav Module Pills + Progress bar */}
              <div className="w-full flex items-center justify-center">
                <MirrorSubNav
                  modules={currentDimension.modules}
                  activeModuleIndex={activeModuleIndex}
                  accentColor={accentColor}
                  onSelectModule={onSelectModule}
                  onNextModule={onNextModule}
                />
              </div>
            </motion.div>
          </div>

          {/* 2. LEFT TELEMETRY COCKPIT CARD (Seamless Translucent Glass Fusion) */}
          <div className="relative flex flex-col items-start mt-2 pointer-events-none ml-1 xl:ml-3">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="pointer-events-auto w-[470px] xl:w-[510px] max-h-[calc(100vh-250px)] overflow-y-auto rounded-[24px] p-4 xl:p-5 border border-white/[0.08] backdrop-blur-[24px] scrollbar-thin scrollbar-thumb-white/15 scrollbar-track-transparent transition-all duration-500"
              style={{
                background: `radial-gradient(130% 90% at 15% 0%, ${accentColor}18 0%, rgba(6, 10, 18, 0.55) 65%), linear-gradient(150deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))`,
                boxShadow: `0 24px 60px rgba(0,0,0,0.55), 0 0 35px ${accentColor}0d, inset 0 1px 0 rgba(255,255,255,0.07)`,
              }}
            >
              <MirrorKineticHeader
                headline={currentModule.headline}
                kicker={currentModule.kicker}
                accentColor={accentColor}
                currentIndex={activeModuleIndex}
                totalCount={currentDimension.modules.length}
              />

              <MirrorSpecAccordion
                description={currentModule.description}
                specRows={currentModule.specRows}
                cameraTags={currentModule.cameraTags}
                notes={currentModule.notes}
                accentColor={accentColor}
                activeTileIndex={activeTileIndex}
                onToggleTile={onToggleTile}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── MOBILE & TABLET SCREENS (< lg): DUAL-STAGE ARCHITECTURE ── */}
      <div className="flex lg:hidden flex-col gap-2.5 w-full pointer-events-auto">
        {/* Stage 1: Floating Navigation Canopy (Pills & Liquid Glass Lens) */}
        <div
          className="w-full rounded-[22px] p-2.5 sm:p-3 border border-white/[0.10] backdrop-blur-[14px] shadow-lg flex flex-col gap-2 transition-all duration-300 z-20"
          style={{
            background: `radial-gradient(130% 100% at 50% 0%, ${accentColor}12 0%, rgba(6,10,18,0.45) 85%)`,
          }}
        >
          <MirrorDimensionPills
            dimensions={dimensions}
            activeDimensionIndex={activeDimensionIndex}
            onSelectDimension={onSelectDimension}
          />

          <MirrorMobileSubNavLens
            modules={currentDimension.modules}
            activeModuleIndex={activeModuleIndex}
            accentColor={accentColor}
            onSelectModule={onSelectModule}
          />
        </div>

        {/* Stage 2: Visual 3D Spotlight Stage Window (Dedicated Unobstructed Viewport for 3D Model) */}
        <div className="relative w-full h-[210px] xs:h-[240px] sm:h-[270px] flex items-end justify-start px-2 py-1.5 pointer-events-none select-none">
          {/* Subtle live indicator badge on left */}
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[8.5px] font-mono tracking-wider backdrop-blur-md pointer-events-auto"
            style={{
              borderColor: `${accentColor}33`,
              backgroundColor: 'rgba(6, 10, 18, 0.6)',
              color: accentColor,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: accentColor }}
            />
            <span>3D LIVE MIRROR</span>
          </div>
        </div>

        {/* Stage 3: Bottom Cockpit Sheet (Foldable in 3D Focus mode) */}
        {!is3DFocus && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="w-full rounded-[24px] p-3.5 sm:p-4 border border-white/[0.10] backdrop-blur-[14px] shadow-xl transition-all duration-300 flex flex-col gap-2.5"
            style={{
              background: `radial-gradient(140% 100% at 50% 0%, ${accentColor}10 0%, rgba(6,10,18,0.55) 85%)`,
            }}
          >
            <MirrorKineticHeader
              headline={currentModule.headline}
              kicker={currentModule.kicker}
              accentColor={accentColor}
              currentIndex={activeModuleIndex}
              totalCount={currentDimension.modules.length}
            />

            <MirrorSpecAccordion
              description={currentModule.description}
              specRows={currentModule.specRows}
              cameraTags={currentModule.cameraTags}
              notes={currentModule.notes}
              accentColor={accentColor}
              activeTileIndex={activeTileIndex}
              onToggleTile={onToggleTile}
            />
          </motion.div>
        )}

        {/* Floating Restore Button when in 3D Fullscreen Focus mode */}
        {is3DFocus && onToggle3DFocus && (
          <div className="w-full flex justify-center py-3 pointer-events-auto">
            <button
              type="button"
              onClick={onToggle3DFocus}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold backdrop-blur-xl shadow-2xl transition-all duration-200 active:scale-95 cursor-pointer"
              style={{
                borderColor: accentColor,
                backgroundColor: 'rgba(6, 10, 18, 0.88)',
                color: '#FFFFFF',
                boxShadow: `0 0 24px ${accentColor}44`,
              }}
            >
              <span>✕ მართვის პანელის დაბრუნება</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

