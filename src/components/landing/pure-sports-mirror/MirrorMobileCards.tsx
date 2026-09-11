'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SubPillItem, HotspotItem } from './mirrorDataMatrix';
import { MirrorIcon } from './MirrorIcon';

interface MirrorMobileCardsProps {
  pills: SubPillItem[];
  activePillId: string;
  onSelectPill: (pillId: string) => void;
  hotspots: HotspotItem[];
  playTactileClick: () => void;
}

export const MirrorMobileCards: React.FC<MirrorMobileCardsProps> = ({
  pills,
  activePillId,
  onSelectPill,
  hotspots,
  playTactileClick,
}) => {
  const [showHotspots, setShowHotspots] = useState(false);
  const activePill = pills.find((p) => p.id === activePillId) || pills[0];

  const handlePillSelect = (id: string) => {
    playTactileClick();
    onSelectPill(id);
  };

  return (
    <div className="w-full flex flex-col gap-4 lg:hidden">
      {/* Mobile Collectable Card: Active Passport */}
      <div className="w-full rounded-2xl bg-[#0D131F] border border-[#00A3FF]/30 p-5 shadow-[0_12px_36px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <MirrorIcon name={activePill.icon} isActive size={20} />
            <span className="text-xs font-mono tracking-wider text-[#00E5FF] uppercase font-bold">
              {activePill.passport.badge}
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
            ARTRON PASSPORT
          </span>
        </div>

        <h4 className="text-base font-bold text-white mb-3 tracking-tight">
          {activePill.passport.title}
        </h4>

        {/* 4 Core Parameter Rows */}
        <div className="grid grid-cols-1 gap-2.5">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="block text-[10px] font-mono text-slate-400 uppercase mb-0.5">
              {activePill.passport.scaleLabel}
            </span>
            <span className="text-xs font-semibold text-slate-200">
              {activePill.passport.scale}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="block text-[10px] font-mono text-slate-400 uppercase mb-0.5">
              {activePill.passport.disciplinesLabel}
            </span>
            <span className="text-xs font-semibold text-slate-200">
              {activePill.passport.disciplines}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="block text-[10px] font-mono text-slate-400 uppercase mb-0.5">
              {activePill.passport.keyAreaLabel}
            </span>
            <span className="text-xs font-semibold text-slate-200">
              {activePill.passport.keyArea}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-gradient-to-r from-[#00A3FF]/15 to-transparent border border-[#00A3FF]/40">
            <span className="block text-[10px] font-mono text-[#00E5FF] uppercase mb-0.5 font-semibold">
              {activePill.passport.highestStandardLabel}
            </span>
            <span className="text-xs font-bold text-white">
              {activePill.passport.highestStandard}
            </span>
          </div>
        </div>
      </div>

      {/* Hotspots Standards Mobile Trigger */}
      <div className="w-full">
        <button
          type="button"
          onClick={() => {
            playTactileClick();
            setShowHotspots((prev) => !prev);
          }}
          aria-expanded={showHotspots}
          className="w-full min-h-[44px] flex items-center justify-between px-4 py-3 rounded-xl bg-[#090D14] border border-white/10 text-xs font-semibold text-slate-200 hover:text-white hover:border-[#00A3FF]/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF]"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            სპორტული სტანდარტები & Hotspots ({hotspots.length})
          </span>
          <span className="text-sm font-mono text-slate-400">
            {showHotspots ? '▲ დახურვა' : '▼ ნახვა'}
          </span>
        </button>

        <AnimatePresence>
          {showHotspots && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden flex flex-col gap-2 pt-2"
            >
              {hotspots.map((spot) => (
                <div
                  key={spot.id}
                  className="p-3 rounded-xl bg-[#0F1622] border border-[#00A3FF]/30 text-left"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-white">● {spot.label}</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#00A3FF]/20 text-[#00E5FF] border border-[#00A3FF]/30">
                      {spot.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {spot.description}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
