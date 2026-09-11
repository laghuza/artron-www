'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PassportData } from './mirrorDataMatrix';

interface MirrorPassportCardProps {
  passport: PassportData;
}

export const MirrorPassportCard: React.FC<MirrorPassportCardProps> = ({ passport }) => {
  return (
    <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] rounded-3xl bg-[#0D131F]/90 border border-[#00A3FF]/30 shadow-[0_16px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden select-none">
      {/* Background Cyber Gradient Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#00A3FF]/15 via-transparent to-transparent pointer-events-none rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-52 h-52 bg-gradient-to-tr from-[#10B981]/10 via-transparent to-transparent pointer-events-none rounded-full blur-3xl" />

      {/* Top Header */}
      <div className="relative z-10 border-b border-white/10 pb-3.5">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
            <span className="text-[11px] font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
              THE MIRROR PASSPORT
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
            {passport.badge}
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.h3
            key={passport.title}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="text-lg sm:text-xl font-bold text-white tracking-tight"
          >
            {passport.title}
          </motion.h3>
        </AnimatePresence>
      </div>

      {/* 4 Core Parameter Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={passport.title + '_params'}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 my-auto"
        >
          {/* Parameter 1: Scale */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00A3FF]/40 transition-colors flex flex-col justify-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              {passport.scaleLabel}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
              {passport.scale}
            </span>
          </div>

          {/* Parameter 2: Disciplines / Responsibilities */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00A3FF]/40 transition-colors flex flex-col justify-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              {passport.disciplinesLabel}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
              {passport.disciplines}
            </span>
          </div>

          {/* Parameter 3: Key Area */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00A3FF]/40 transition-colors flex flex-col justify-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              {passport.keyAreaLabel}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
              {passport.keyArea}
            </span>
          </div>

          {/* Parameter 4: Highest Standard / Status */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-[#00A3FF]/10 to-transparent border border-[#00A3FF]/30 flex flex-col justify-center shadow-[0_0_15px_rgba(0,163,255,0.08)]">
            <span className="text-[10px] font-mono text-[#00E5FF] uppercase tracking-wider mb-1 font-semibold">
              {passport.highestStandardLabel}
            </span>
            <span className="text-xs sm:text-sm font-bold text-white leading-snug">
              {passport.highestStandard}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Passport Footer Badge */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span className="text-slate-400">სისტემური ვერიფიკაცია</span>
        <span className="text-[#10B981] font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          VERIFIED BY ARTRON
        </span>
      </div>
    </div>
  );
};
