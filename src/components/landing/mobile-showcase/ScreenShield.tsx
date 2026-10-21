'use client';

import React from 'react';
import { soundEngine } from '@/core';

interface ScreenShieldProps {
  buyStage: 'idle' | 'scan' | 'done';
  onBuy: () => void;
  sealRef: React.RefObject<HTMLDivElement | null>;
}

export const ScreenShield: React.FC<ScreenShieldProps> = ({
  buyStage,
  onBuy,
  sealRef,
}) => {
  return (
    <div className="flex flex-col items-center gap-3 animate-[arScreenIn_0.45s_cubic-bezier(0.2,0.8,0.2,1)_both]">
      {/* 3D Metallic Guarantee Medal Seal */}
      <div
        ref={sealRef}
        className="relative w-36 h-36 rounded-full p-2 bg-gradient-to-tr from-slate-700 via-slate-400 to-white shadow-2xl flex items-center justify-center my-1"
      >
        <div className="relative w-full h-full rounded-full bg-[#0A1220] flex flex-col items-center justify-center border border-white/20">
          <svg
            viewBox="0 0 154 154"
            className="absolute inset-0 w-full h-full animate-[arSpin_48s_linear_infinite]"
          >
            <defs>
              <path
                id="sealCurve"
                d="M77,77 m-64,0 a64,64 0 1,1 128,0 a64,64 0 1,1 -128,0"
              />
            </defs>
            <text className="font-mono text-[7px] tracking-[2.5px] fill-slate-300">
              <textPath href="#sealCurve">
                UNCONDITIONAL GUARANTEE · ARTRON · FOURTEEN DAYS ·
              </textPath>
            </text>
          </svg>
          <span className="text-3xl font-light font-mono text-white leading-none">
            14
          </span>
          <span className="font-mono text-[7px] tracking-widest text-cyan-300">
            DAYS
          </span>
        </div>
      </div>

      {/* Subtitles */}
      <div className="text-center">
        <div className="text-xs font-semibold text-white">14-დღიანი</div>
        <div className="text-[10px] text-slate-400">უპირობო გარანტია</div>
      </div>

      {/* Details Table */}
      <div className="w-full flex flex-col border-t border-white/10 pt-1 text-[10px] text-slate-400">
        <div className="flex justify-between py-1 border-b border-white/5">
          <span>შეძენა</span>
          <span className="text-white font-mono">15.09 · 150 ₾</span>
        </div>
        <div className="flex justify-between py-1 border-b border-white/5">
          <span>დაბრუნება</span>
          <span className="text-white font-mono">29.09-მდე · 100%</span>
        </div>
        <div className="flex justify-between py-1">
          <span>თანხა ბრუნდება</span>
          <span className="text-purple-300">იმავე ბარათზე</span>
        </div>
      </div>

      {/* Purchase CTA */}
      <button
        type="button"
        onClick={() => {
          soundEngine.playSystemAccess();
          onBuy();
        }}
        className={`w-full min-h-[46px] rounded-xl flex items-center justify-center font-bold text-xs uppercase tracking-wide cursor-pointer transition-all ${
          buyStage === 'done'
            ? 'bg-purple-400 text-slate-950 shadow-lg'
            : buyStage === 'scan'
            ? 'bg-purple-300 text-slate-950'
            : 'bg-white text-slate-950 hover:bg-slate-200'
        }`}
      >
        {buyStage === 'done'
          ? 'აქტიურია · 16 ოქტომბრამდე'
          : buyStage === 'scan'
          ? 'Face ID · დადასტურება…'
          : 'აბონემენტის შეძენა · 150 ₾'}
      </button>
    </div>
  );
};
