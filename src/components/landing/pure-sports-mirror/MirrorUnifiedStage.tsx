'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SubPillItem, MasterDimensionId } from './mirrorDataMatrix';
import { useTypewriter } from './useTypewriter';
import { MirrorReactiveBackdrop } from './MirrorReactiveBackdrop';
import { MirrorClickableSpecTiles } from './MirrorClickableSpecTiles';

interface MirrorUnifiedStageProps {
  pills: SubPillItem[];
  activePillId: string;
  dimensionId: MasterDimensionId;
  playTactileClick: () => void;
}

export const MirrorUnifiedStage: React.FC<MirrorUnifiedStageProps> = ({
  pills,
  activePillId,
  dimensionId,
  playTactileClick,
}) => {
  const currentPill = pills.find((p) => p.id === activePillId) || pills[0];
  const { passport } = currentPill;

  const [activeTileIndex, setActiveTileIndex] = React.useState<number>(0);

  // Reset selected spec tile on pill change
  React.useEffect(() => {
    setActiveTileIndex(0);
  }, [activePillId]);

  // Fast typewriter streams — resets on pill change
  const { displayedText: displayedTitle } = useTypewriter(passport.title, activePillId, 16, 60);
  const { displayedText: displayedSubtitle, isDone: subtitleDone } = useTypewriter(
    passport.subtitle || '',
    activePillId,
    12,
    passport.title.length * 16 + 80,
  );
  const { displayedText: displayedCare } = useTypewriter(
    passport.careMessage || passport.description || '',
    activePillId,
    8,
    passport.title.length * 16 + (passport.subtitle?.length || 0) * 12 + 150,
  );

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden select-none"
      style={{
        background: 'rgba(11, 16, 27, 0.85)',
        backdropFilter: 'blur(28px)',
        border: '1px solid rgba(0, 229, 255, 0.22)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(0, 163, 255, 0.12)',
      }}
    >
      {/* ── 1. BACKGROUND AMBIENCE: Reactive Dynamic Holographic Backdrop ── */}
      <MirrorReactiveBackdrop
        dimensionId={dimensionId}
        activePillId={activePillId}
        activeTileIndex={activeTileIndex}
      />

      {/* Ambient Micro-Dot Matrix Overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(0, 229, 255, 0.9) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* Atmospheric Soft Cyan & Emerald Ambient Glows */}
      <div className="absolute -top-16 right-0 w-96 h-72 bg-gradient-to-bl from-[#00A3FF]/15 via-transparent to-transparent pointer-events-none rounded-full blur-[100px]" />
      <div className="absolute -bottom-16 left-0 w-80 h-64 bg-gradient-to-tr from-[#10B981]/12 via-transparent to-transparent pointer-events-none rounded-full blur-[90px]" />
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00E5FF]/60 to-transparent pointer-events-none" />

      {/* ── 2. STAGE CONTENT (Single-Stage Monolithic Flow — NO SPLIT BOXES!) ── */}
      <div className="relative z-10 p-5 sm:p-7 lg:p-9 flex flex-col gap-6">

        {/* ── STEP 1: STREAMING HEADER ── */}
        <div className="border-b border-white/[0.08] pb-5">
          {/* Badge row */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00E5FF]" />
              </span>
              <span className="text-[11px] font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
                {passport.badge}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-mono px-2.5 py-0.5 rounded-full text-slate-300 uppercase tracking-wider"
                style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
              >
                SPORT-OS v3.3 • UNIFIED STAGE
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePillId + '_hdr'}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* H2 Title (Bold with Cyan Gradient) */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug min-h-[2.5rem]">
                {displayedTitle}
                {displayedTitle.length < passport.title.length && (
                  <span className="inline-block w-0.5 h-6 bg-[#00E5FF] ml-1 animate-pulse align-middle" />
                )}
              </h2>

              {/* Subhead */}
              {passport.subtitle && (
                <p className="text-sm sm:text-base font-medium text-slate-300 mt-1.5 leading-relaxed max-w-4xl min-h-[1.5rem]">
                  {displayedSubtitle}
                  {subtitleDone === false && displayedTitle === passport.title && displayedSubtitle.length < (passport.subtitle?.length || 0) && (
                    <span className="inline-block w-0.5 h-4 bg-[#00E5FF]/70 ml-1 animate-pulse align-middle" />
                  )}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── STEP 2: DEEP CONTEXT (EMPATHY & DEEP REASONING) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillId + '_care'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="relative rounded-2xl p-4 sm:p-5 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 163, 255, 0.08) 0%, rgba(16, 185, 129, 0.04) 50%, rgba(255, 255, 255, 0.02) 100%)',
              border: '1px solid rgba(0, 229, 255, 0.2)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* Radiant left accent bar */}
            <div className="absolute top-0 left-0 w-1.5 h-full rounded-l-2xl bg-gradient-to-b from-[#00E5FF] via-[#00A3FF] to-[#10B981]" />

            <div className="pl-2">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono font-bold tracking-wider text-[#00E5FF] uppercase">
                  💬 სისტემური გააზრება & ემპათია
                </span>
              </div>
              <p className="text-xs sm:text-sm lg:text-[15px] text-slate-200 leading-relaxed font-normal">
                {displayedCare}
                {displayedCare.length < (passport.careMessage || passport.description || '').length && (
                  <span className="inline-block w-0.5 h-4 bg-[#00A3FF] ml-1 animate-pulse align-middle" />
                )}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── STEP 3: 4 FULLY-CLICKABLE SPECIFICATION TILES & INLINE REVEAL ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillId + '_spec_tiles'}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            <MirrorClickableSpecTiles
              passport={passport}
              activePillId={activePillId}
              activeTileIndex={activeTileIndex}
              onSelectTile={setActiveTileIndex}
              playTactileClick={playTactileClick}
            />
          </motion.div>
        </AnimatePresence>

        {/* ── STAGE BOTTOM VERIFICATION FOOTER ── */}
        <div className="pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-slate-300">სისტემური ვერიფიკაცია: 100% აქტიური</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-500 hidden sm:inline">SINGLE-STAGE ARCHITECTURE</span>
            <span className="text-[#00E5FF] font-semibold">ARTRON SPORT-OS CORE v3.3</span>
          </div>
        </div>
      </div>
    </div>
  );
};
