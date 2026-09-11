'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SubPillItem } from './mirrorDataMatrix';
import { MirrorIcon } from './MirrorIcon';
import { useTypewriter } from './useTypewriter';

interface MirrorPresentationDeckProps {
  pills: SubPillItem[];
  activePillId: string;
  onSelectPill: (id: string) => void;
  playTactileClick: () => void;
}

export const MirrorPresentationDeck: React.FC<MirrorPresentationDeckProps> = ({
  pills,
  activePillId,
}) => {
  const currentPill = pills.find((p) => p.id === activePillId) || pills[0];
  const { passport } = currentPill;

  // Typewriter streams — restart on pill change
  const { displayedText: displayedTitle } = useTypewriter(passport.title, activePillId, 20, 80);
  const { displayedText: displayedSubtitle, isDone: subtitleDone } = useTypewriter(
    passport.subtitle || '',
    activePillId,
    14,
    passport.title.length * 20 + 100,
  );
  const { displayedText: displayedCare } = useTypewriter(
    passport.careMessage || '',
    activePillId,
    10,
    passport.title.length * 20 + (passport.subtitle?.length || 0) * 14 + 200,
  );

  return (
    <div className="flex flex-col h-full w-full gap-4">
      {/* ── Main Feature Presentation Stage ── */}
      <div
        className="relative flex-1 rounded-2xl flex flex-col justify-between overflow-hidden min-h-[360px]"
        style={{
          background: 'rgba(11, 16, 26, 0.75)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(0, 229, 255, 0.2)',
          boxShadow:
            '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 30px rgba(0,163,255,0.12)',
        }}
      >
        {/* Ambient corner glows */}
        <div className="absolute top-0 right-0 w-64 h-48 bg-gradient-to-bl from-[#00A3FF]/12 via-transparent to-transparent pointer-events-none rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-36 bg-gradient-to-tr from-[#10B981]/8 via-transparent to-transparent pointer-events-none rounded-full blur-2xl" />
        {/* Top edge glow */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-transparent pointer-events-none" />

        <div className="relative z-10 p-5 sm:p-6 flex flex-col justify-between h-full gap-4">

          {/* ── STREAMING HEADER — badge + typewriter title ── */}
          <div className="border-b border-white/[0.08] pb-4">
            {/* Badge row */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A3FF] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00E5FF]" />
                </span>
                <span className="text-[11px] font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
                  {passport.badge}
                </span>
              </div>
              <span
                className="text-[10px] font-mono px-2.5 py-0.5 rounded-full text-slate-300"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                ARTRON PASSPORT
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activePillId + '_header'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {/* Typewriter Title */}
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug min-h-[2rem]">
                  {displayedTitle}
                  {displayedTitle.length < passport.title.length && (
                    <span className="inline-block w-0.5 h-5 bg-[#00E5FF] ml-0.5 animate-pulse align-middle" />
                  )}
                </h3>
                {/* Typewriter Subtitle */}
                {passport.subtitle && (
                  <p className="text-xs sm:text-sm font-medium text-[#00E5FF]/80 mt-1 leading-relaxed min-h-[1.25rem]">
                    {displayedSubtitle}
                    {subtitleDone === false && displayedTitle === passport.title && displayedSubtitle.length < (passport.subtitle?.length || 0) && (
                      <span className="inline-block w-0.5 h-3.5 bg-[#00E5FF]/60 ml-0.5 animate-pulse align-middle" />
                    )}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── CARE BLOCK — empathetic business mirror ── */}
          {passport.careMessage && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillId + '_care'}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                className="relative rounded-xl px-4 py-3 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,163,255,0.06) 0%, rgba(0,229,255,0.03) 100%)',
                  border: '1px solid rgba(0,163,255,0.15)',
                }}
              >
                <div className="absolute top-0 left-0 w-1 h-full rounded-l-xl bg-gradient-to-b from-[#00E5FF]/60 via-[#00A3FF]/40 to-transparent" />
                <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed pl-1">
                  <span className="text-[#00E5FF] font-semibold">💬 </span>
                  {displayedCare}
                  {displayedCare.length < passport.careMessage.length && (
                    <span className="inline-block w-0.5 h-3 bg-[#00A3FF]/70 ml-0.5 animate-pulse align-middle" />
                  )}
                </p>
              </motion.div>
            </AnimatePresence>
          )}

          {/* ── 4 TACTILE GLASS CHIPS ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillId + '_params'}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
            >
              {/* Chip 1: Scale */}
              <GlassChip label={passport.scaleLabel} value={passport.scale} icon="globe" />
              {/* Chip 2: Disciplines */}
              <GlassChip label={passport.disciplinesLabel} value={passport.disciplines} icon="zap" />
              {/* Chip 3: Key Area */}
              <GlassChip label={passport.keyAreaLabel} value={passport.keyArea} icon="target" />
              {/* Chip 4: Highest Standard — Emerald Pulse */}
              <GlassChip
                label={passport.highestStandardLabel}
                value={passport.highestStandard}
                icon="trophy"
                isHighlight
              />
            </motion.div>
          </AnimatePresence>

          {/* Footer verification */}
          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              სისტემური ვერიფიკაცია: 100% აქტიური
            </span>
            <span className="text-[#00E5FF] font-semibold">SPORT-OS ENGINE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Tactile Glass Chip ──────────────────────────────────────────────
interface GlassChipProps {
  label: string;
  value: string;
  icon: string;
  isHighlight?: boolean;
}

function GlassChip({ label, value, icon, isHighlight = false }: GlassChipProps) {
  return (
    <div
      className={`relative p-3 rounded-xl overflow-hidden transition-all duration-300 group ${
        isHighlight ? 'hover:scale-[1.02]' : 'hover:scale-[1.01]'
      }`}
      style={
        isHighlight
          ? {
              background:
                'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(0,163,255,0.08) 60%, transparent 100%)',
              border: '1px solid rgba(16,185,129,0.35)',
              boxShadow: '0 0 20px rgba(16,185,129,0.12), inset 0 1px 0 rgba(0,229,255,0.1)',
            }
          : {
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
            }
      }
    >
      {/* Top shimmer line for highlight chip */}
      {isHighlight && (
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#10B981]/60 to-transparent" />
      )}

      {/* Pulsing ambient for highlight */}
      {isHighlight && (
        <div
          className="absolute inset-0 rounded-xl animate-pulse pointer-events-none"
          style={{ background: 'rgba(16,185,129,0.04)' }}
        />
      )}

      <div className="relative z-10 flex items-start gap-2">
        <MirrorIcon name={icon} isActive={isHighlight} size={14} className="mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <span
            className={`block text-[10px] font-mono uppercase tracking-wider mb-0.5 ${
              isHighlight ? 'text-[#10B981] font-semibold' : 'text-slate-400'
            }`}
          >
            {label}
          </span>
          <span
            className={`text-[11px] font-semibold leading-snug ${
              isHighlight ? 'text-white' : 'text-slate-100'
            }`}
          >
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}
