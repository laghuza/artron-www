'use client';

import React from 'react';
import { MathEquation } from './types';

interface B2BLogicSheetProps {
  indexStr: string;
  code: string;
  title: string;
  description: string;
  equations: MathEquation[];
  kpi: string;
  kpiLabel: string;
  onPrev: () => void;
  onNext: () => void;
}

export const B2BLogicSheet: React.FC<B2BLogicSheetProps> = ({
  indexStr,
  code,
  title,
  description,
  equations,
  kpi,
  kpiLabel,
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[540px]">
      {/* Index and Code */}
      <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] text-[#BAE6FD]">
        <span className="w-6 h-[1.5px] bg-[#F59E0B]" />
        <span>{indexStr} / 10 · {code}</span>
      </div>

      {/* Title & Narrative */}
      <div className="flex flex-col gap-3">
        <h2 className="m-0 font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-[#F0F9FF] leading-tight text-balance">
          {title}
        </h2>
        <p className="m-0 text-sm sm:text-[15px] leading-relaxed text-[#A9B9CA] text-pretty">
          {description}
        </p>
      </div>

      {/* Mathematical Model Card */}
      <div className="flex flex-col p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#111722]/70 to-[#06090e]/60 backdrop-blur-2xl border border-[#BAE6FD]/15 border-t-white/20 shadow-[inset_0_1px_0_rgba(240,249,255,0.06),0_30px_60px_-30px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between pb-2 border-b border-white/5 font-mono text-[11px] tracking-wider text-[#76869A]">
          <span>მათემატიკური მოდელი</span>
          <span className="text-[#F59E0B] font-bold">ƒ</span>
        </div>
        <div className="flex flex-col divide-y divide-[#BAE6FD]/10">
          {equations.map((eq, i) => (
            <div key={`${eq.k}-${i}`} className="grid grid-cols-12 items-baseline gap-3 py-2.5 text-xs">
              <div className="col-span-8 flex flex-col gap-1">
                <span className="text-[11px] text-[#76869A]">{eq.k}</span>
                <span className="font-mono text-xs sm:text-[13px] text-[#F0F9FF] break-words">{eq.e}</span>
              </div>
              <span
                className="col-span-4 font-mono text-xs sm:text-[13px] text-right font-medium truncate"
                style={{ color: eq.c }}
              >
                {eq.r}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* KPI & Navigation */}
      <div className="flex items-end justify-between flex-wrap gap-4 pt-2">
        <div className="flex flex-col gap-1.5 pt-3 border-t-2 border-[#10B981]">
          <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F0F9FF] tabular-nums leading-none">
            {kpi}
          </span>
          <span className="text-xs text-[#A9B9CA]">{kpiLabel}</span>
        </div>

        {/* Prev / Next controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            aria-label="წინა ლოგიკა"
            className="w-11 h-11 rounded-full flex items-center justify-center bg-[#0C121B]/70 border border-[#BAE6FD]/20 text-[#F0F9FF] font-mono text-sm hover:border-[#10B981] hover:text-[#10B981] transition-all cursor-pointer shadow-lg active:scale-95"
          >
            ←
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="შემდეგი ლოგიკა"
            className="w-11 h-11 rounded-full flex items-center justify-center bg-[#0C121B]/70 border border-[#BAE6FD]/20 text-[#F0F9FF] font-mono text-sm hover:border-[#10B981] hover:text-[#10B981] transition-all cursor-pointer shadow-lg active:scale-95"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};
