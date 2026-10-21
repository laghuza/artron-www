'use client';

import React from 'react';
import { soundEngine } from '@/core';

interface ScreenGuestPassProps {
  qrCells: { c: string }[];
  guestSent: 'idle' | 'sending' | 'done';
  guestsLeft: number;
  onSendGuest: () => void;
  guestRef: React.RefObject<HTMLDivElement | null>;
}

export const ScreenGuestPass: React.FC<ScreenGuestPassProps> = ({
  qrCells,
  guestSent,
  guestsLeft,
  onSendGuest,
  guestRef,
}) => {
  return (
    <div className="flex flex-col gap-2.5 animate-[arScreenIn_0.45s_cubic-bezier(0.2,0.8,0.2,1)_both]">
      {/* 3D Guest Pass Ticket */}
      <div
        ref={guestRef}
        className="p-3.5 rounded-2xl bg-gradient-to-br from-[#18202C] via-[#0E141E] to-[#080B10] border border-rose-500/30 shadow-xl flex flex-col gap-3 relative overflow-hidden"
      >
        <div className="flex justify-between items-center text-[9px] font-mono">
          <span className="text-white font-bold tracking-wider">ARTRON</span>
          <span className="text-rose-300 tracking-wider">GUEST PASS</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-14 h-14 p-1 rounded-xl bg-white shrink-0 shadow-md">
            <div className="grid grid-cols-15 w-full h-full gap-[0.5px]">
              {qrCells.slice(0, 225).map((c, i) => (
                <div
                  key={i}
                  className="w-full h-full"
                  style={{ backgroundColor: c.c }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-slate-500 font-mono tracking-wider">
              GUEST
            </span>
            <span className="text-sm font-semibold text-white">
              ნინო კ.
            </span>
            <span className="text-[10px] text-slate-300">
              1 ვიზიტი · 24 საათი
            </span>
            <span className="text-[8.5px] text-slate-500">
              მოიწვია გიორგი შ.
            </span>
          </div>
        </div>

        <div className="border-t border-dashed border-white/15 pt-2 flex justify-between text-[8px] font-mono text-slate-400">
          <span>VALID → 16.09 · 11:24</span>
          <span className="text-white font-bold">GP-3107</span>
        </div>

        {/* Stamp "SENT 11:24" */}
        <div className="absolute right-3 top-6 w-14 h-14 rounded-full border-2 border-rose-400 bg-rose-950/80 flex flex-col items-center justify-center font-mono text-rose-200 shadow-lg">
          <span className="text-[8px] font-bold tracking-widest">
            SENT
          </span>
          <span className="text-[7px]">11:24</span>
        </div>
      </div>

      {/* 3 Channel Buttons */}
      <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
        <div className="p-2 rounded-xl bg-white/[0.08] border border-rose-400/50 text-white font-medium flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          <span>WhatsApp</span>
        </div>
        <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 text-slate-400 flex items-center justify-center">
          SMS
        </div>
        <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 text-slate-400 flex items-center justify-center">
          ბმული
        </div>
      </div>

      {/* Send CTA Button */}
      <button
        type="button"
        onClick={() => {
          soundEngine.playSystemAccess();
          onSendGuest();
        }}
        className={`min-h-[46px] rounded-xl flex items-center justify-center font-bold text-xs uppercase tracking-wide cursor-pointer transition-all ${
          guestSent === 'done' || true
            ? 'bg-rose-400 text-slate-950 shadow-lg'
            : 'bg-white text-slate-950 hover:bg-slate-200'
        }`}
      >
        გაიგზავნა WhatsApp-ით
      </button>

      {/* Footer Counter */}
      <div className="flex justify-between items-center px-1 text-[10.5px] text-slate-400 border-t border-white/5 pt-1">
        <span>დარჩენილი მოსაწვევები</span>
        <span className="font-mono text-white text-[11px]">1 / 3</span>
      </div>
    </div>
  );
};
