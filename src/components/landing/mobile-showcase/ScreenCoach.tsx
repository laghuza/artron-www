'use client';

import React from 'react';
import { TRAINING_SLOTS_DATA } from './mobileShowcaseConfig';
import { soundEngine } from '@/core';

interface ScreenCoachProps {
  pickedSlot: number;
  onPickSlot: (idx: number) => void;
  bookStage: 'idle' | 'done';
  onBook: () => void;
  slotsRef: React.RefObject<HTMLDivElement | null>;
}

const WEEK_DAYS = [
  { d: 'ორ', n: 14, active: false },
  { d: 'სა', n: 15, active: true },
  { d: 'ოთ', n: 16, active: false },
  { d: 'ხუ', n: 17, active: false },
  { d: 'პა', n: 18, active: false },
  { d: 'შა', n: 19, active: false },
  { d: 'კვ', n: 20, active: false },
];

export const ScreenCoach: React.FC<ScreenCoachProps> = ({
  pickedSlot,
  onPickSlot,
  bookStage,
  onBook,
  slotsRef,
}) => {
  const activeSlot = TRAINING_SLOTS_DATA[pickedSlot] || TRAINING_SLOTS_DATA[1];

  return (
    <div className="flex flex-col gap-2.5 animate-[arScreenIn_0.45s_cubic-bezier(0.2,0.8,0.2,1)_both]">
      {/* Coach Header Profile */}
      <div className="flex items-center gap-3 p-1">
        <div className="w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-slate-600 via-slate-300 to-slate-700 shadow-md">
          <div className="w-full h-full rounded-full bg-[#101722] flex items-center justify-center text-xs font-mono text-cyan-300 tracking-wider">
            DT
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-medium text-[#F8FAFC]">
            დავით თ.
          </div>
          <div className="text-[10px] text-[#94A3B8]">
            ძალოვანი · მთავარი მწვრთნელი
          </div>
        </div>
        <div className="text-right font-mono">
          <span className="text-[8.5px] text-[#7C8796] block tracking-wider">
            RATING
          </span>
          <span className="text-xs text-[#9DC4FF] font-bold">4.98</span>
        </div>
      </div>

      {/* 7-Day Date Slider */}
      <div className="grid grid-cols-7 gap-1 p-2 rounded-xl bg-gradient-to-b from-white/[0.04] to-white/[0.012] border border-white/10 text-center font-mono">
        {WEEK_DAYS.map((w) => (
          <div
            key={w.n}
            className={`flex flex-col items-center gap-0.5 py-1 rounded-lg transition-all ${
              w.active
                ? 'bg-blue-500/20 text-blue-200 border border-blue-400/40 shadow-sm'
                : 'text-slate-400'
            }`}
          >
            <span className="text-[8px] text-slate-500">{w.d}</span>
            <span className="text-[11px] font-light leading-none">{w.n}</span>
            <span
              className={`w-1 h-1 rounded-full mt-0.5 ${
                w.active ? 'bg-[#9DC4FF]' : 'bg-transparent'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Date Subtitle */}
      <div className="flex justify-between items-baseline px-1 text-[10.5px]">
        <span className="text-slate-300 font-medium">სამშაბათი · 15 სექ</span>
        <span className="font-mono text-[#94A3B8] text-[9.5px]">
          3 თავისუფალი
        </span>
      </div>

      {/* 6 Time Slots Grid */}
      <div ref={slotsRef} className="grid grid-cols-2 gap-1.5 p-0.5">
        {TRAINING_SLOTS_DATA.map((s, idx) => {
          const isSelected = pickedSlot === idx;
          return (
            <button
              type="button"
              key={s.idx}
              data-slot={s.idx}
              disabled={s.booked}
              onClick={() => {
                soundEngine.playPulseNode();
                onPickSlot(idx);
              }}
              className={`p-2 rounded-xl border flex items-center justify-between text-left transition-all ${
                s.booked
                  ? 'bg-transparent border-white/5 opacity-35 cursor-not-allowed'
                  : isSelected
                  ? 'bg-blue-500/15 border-blue-400/60 text-white shadow-md'
                  : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/5 cursor-pointer'
              }`}
            >
              <div className="flex flex-col">
                <span className="font-mono text-xs font-medium">
                  {s.time}
                </span>
                <span className="text-[9px] text-slate-400">
                  {s.booked ? `${s.cls} · სავსე` : s.cls}
                </span>
              </div>
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  s.booked
                    ? 'bg-transparent'
                    : isSelected
                    ? 'bg-[#9DC4FF] shadow-[0_0_6px_#9DC4FF]'
                    : 'border border-slate-500'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Session Details */}
      <div className="flex flex-col border-t border-white/10 pt-1 text-[10px] text-slate-400">
        <div className="flex justify-between py-1 border-b border-white/5">
          <span>სესია</span>
          <span className="text-white font-mono">
            {activeSlot.time} · 60 წუთი
          </span>
        </div>
        <div className="flex justify-between py-1 border-b border-white/5">
          <span>გაუქმება</span>
          <span className="text-white">უფასოდ · დაწყებამდე 2 სთ-ით ადრე</span>
        </div>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        onClick={() => {
          soundEngine.playPulseNode();
          onBook();
        }}
        className={`min-h-[46px] rounded-xl flex items-center justify-center font-bold text-xs uppercase tracking-wide cursor-pointer transition-all ${
          bookStage === 'done'
            ? 'bg-blue-400 text-slate-950 shadow-lg'
            : 'bg-white text-slate-950 hover:bg-slate-200'
        }`}
      >
        {bookStage === 'done'
          ? `ჯავშანი დადასტურებულია · ${activeSlot.time}`
          : `დაჯავშნა · ${activeSlot.time}`}
      </button>
    </div>
  );
};
