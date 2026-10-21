'use client';

import React from 'react';
import { AccessLogRow, SystemStatusRow } from './types';
interface B2BHeroShowroomProps {
  passes?: number;
  fresh: boolean;
  log: AccessLogRow[];
  status: SystemStatusRow[];
  onBookDemo?: () => void;
  onNextLogic?: () => void;
}

export const B2BHeroShowroom: React.FC<B2BHeroShowroomProps> = ({
  fresh,
  log,
  status,
}) => {
  return (
    <div className="relative z-10 flex flex-col justify-between flex-1 w-full pointer-events-none">
      {/* Main Hero Narrative */}
      <div className="pointer-events-auto w-full max-w-[620px] flex flex-col gap-6 pt-4 pb-8 md:pt-6 md:pb-12">
        {/* Stage Badge */}
        <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] text-[#BAE6FD]">
          <span className="w-6 h-[1.5px] bg-[#F59E0B]" />
          <span>01 / 10 · SMART ACCESS · IoT CONTROL</span>
        </div>

        {/* Headline */}
        <h1 className="m-0 flex flex-col gap-2.5 text-left">
          <span className="font-serif text-2xl sm:text-5xl md:text-6xl font-semibold tracking-wider text-[#F0F9FF] leading-none">
            ARTRON <span className="text-[#F59E0B] tracking-normal">—</span>
          </span>
          <span className="font-serif text-xl sm:text-3xl md:text-4xl font-semibold text-[#F0F9FF] leading-tight text-balance">
            ჭკვიანი დაშვების <span className="italic font-normal text-[#F59E0B] font-serif">&amp;</span> IoT მართვის ცენტრი
          </span>
        </h1>

        {/* Narrative Description */}
        <p className="m-0 max-w-[50ch] text-xs sm:text-base leading-relaxed text-[#A9B9CA] text-pretty">
          <span className="hidden sm:inline">ტურნიკეტები, სენსორები და ჯავშნები — ერთ ცენტრში. ARTRON ამოწმებს თითოეულ გავლას წამის მეასედებში და განაგრძობს მუშაობას ინტერნეტის გათიშვისასაც.</span>
          <span className="sm:hidden">ტურნიკეტები, სენსორები & ჯავშნები — 0.04წმ რეაგირება და სრული მუშაობა ინტერნეტის გარეშეც.</span>
        </p>
      </div>

      {/* Floating Live Telemetry Cards */}
      <div className="pointer-events-none w-full grid grid-cols-1 lg:grid-cols-12 gap-4 pb-4">
        {/* Card 1: Access Journal */}
        <div className="pointer-events-auto lg:col-span-7 flex flex-col gap-2 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#111722]/70 to-[#06090e]/60 backdrop-blur-2xl border border-[#BAE6FD]/15 border-t-white/20 shadow-[inset_0_1px_0_rgba(240,249,255,0.06),0_30px_60px_-30px_rgba(0,0,0,0.9)]">
          <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/5">
            <span className="text-xs sm:text-sm font-semibold text-[#F0F9FF]">დაშვების ჟურნალი</span>
            <span className="flex items-center gap-1.5 font-mono text-[10.5px] tracking-wider text-[#10B981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
              LIVE · AES-256
            </span>
          </div>
          <div className="flex flex-col divide-y divide-[#BAE6FD]/10">
            {log.slice(0, 4).map((row, i) => {
              const isFirst = i === 0;
              return (
                <div
                  key={`${row.t}-${row.name}-${i}`}
                  className={`flex items-center justify-between gap-2 py-2 px-2.5 -mx-1.5 rounded-lg transition-colors duration-700 ${
                    isFirst && fresh ? 'bg-[#10B981]/15 text-[#10B981]' : 'hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="font-mono text-xs text-[#76869A] shrink-0">{row.t}</span>
                    <span className={`text-xs font-medium truncate ${isFirst && fresh ? 'text-[#10B981]' : 'text-[#F0F9FF]'}`}>
                      {row.name}
                    </span>
                    <span className="font-mono text-[11px] text-[#76869A] truncate hidden sm:inline">{row.gate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="font-mono text-[10px] text-[#76869A] sm:hidden">{row.gate}</span>
                    <span className="text-right text-[11px] sm:text-xs text-[#10B981] font-semibold shrink-0">დადასტურდა</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card 2: System Status */}
        <div className="pointer-events-auto lg:col-span-5 flex flex-col gap-2 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#111722]/70 to-[#06090e]/60 backdrop-blur-2xl border border-[#BAE6FD]/15 border-t-white/20 shadow-[inset_0_1px_0_rgba(240,249,255,0.06),0_30px_60px_-30px_rgba(0,0,0,0.9)]">
          <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/5">
            <span className="text-xs sm:text-sm font-semibold text-[#F0F9FF]">სისტემის სტატუსი</span>
            <span className="text-xs text-[#10B981] font-medium">ყველა სისტემა ნორმაშია</span>
          </div>
          <div className="flex flex-col divide-y divide-[#BAE6FD]/10">
            {status.map((item) => (
              <div key={item.k} className="flex items-center justify-between gap-3 py-2 text-xs">
                <span className="flex items-center gap-2 text-[#A9B9CA]">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.dot, boxShadow: `0 0 6px ${item.dot}` }}
                  />
                  {item.k}
                </span>
                <span className="font-mono text-[#F0F9FF]">{item.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
