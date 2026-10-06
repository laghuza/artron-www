'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MirrorDimension, MirrorModule } from '../data/mirrorDataTypes';
import { MirrorDimensionPills } from './MirrorDimensionPills';
import { MirrorSubNav } from './MirrorSubNav';
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

              <p className="text-xs sm:text-[12.5px] leading-[1.6] text-[#E6EFF6]/85 mb-2.5 font-normal max-w-[62ch]">
                {currentModule.description}
              </p>

              <MirrorSpecAccordion
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
      {/* ── MOBILE & TABLET SCREENS (< lg): COMPACT INTEGRATED COLUMN ── */}
      <div className="flex lg:hidden flex-col gap-3 w-full pointer-events-auto">
        <div
          className="w-full rounded-[24px] p-3.5 border border-white/[0.10] backdrop-blur-[12px] shadow-xl transition-all duration-300 flex flex-col gap-3"
          style={{
            background: `radial-gradient(140% 100% at 50% 0%, ${accentColor}10 0%, rgba(6,10,18,0.30) 80%)`,
          }}
        >
          <div className="w-full overflow-x-auto scrollbar-none pb-1">
            <MirrorDimensionPills
              dimensions={dimensions}
              activeDimensionIndex={activeDimensionIndex}
              onSelectDimension={onSelectDimension}
            />
          </div>

          <MirrorSubNav
            modules={currentDimension.modules}
            activeModuleIndex={activeModuleIndex}
            accentColor={accentColor}
            onSelectModule={onSelectModule}
            onNextModule={onNextModule}
          />

          <div
            className="w-full h-px my-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${accentColor}44, transparent)`,
            }}
          />

          <MirrorKineticHeader
            headline={currentModule.headline}
            kicker={currentModule.kicker}
            accentColor={accentColor}
            currentIndex={activeModuleIndex}
            totalCount={currentDimension.modules.length}
          />

          <p className="text-xs leading-[1.55] text-[#E6EFF6]/80 font-normal">
            {currentModule.description}
          </p>

          <MirrorSpecAccordion
            specRows={currentModule.specRows}
            cameraTags={currentModule.cameraTags}
            notes={currentModule.notes}
            accentColor={accentColor}
            activeTileIndex={activeTileIndex}
            onToggleTile={onToggleTile}
          />
        </div>
      </div>
    </div>
  );
};
