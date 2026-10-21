'use client';

import React from 'react';
import { PLANS_CONFIG } from './mobileShowcaseConfig';
import { soundEngine } from '@/core';

interface ScreenRenewalProps {
  selectedPlan: number;
  onSelectPlan: (idx: number) => void;
  autoRenew: boolean;
  onToggleAutoRenew: () => void;
  renewStage: 'idle' | 'scan' | 'done';
  onRenew: () => void;
  payRef: React.RefObject<HTMLDivElement | null>;
}

export const ScreenRenewal: React.FC<ScreenRenewalProps> = ({
  selectedPlan,
  onSelectPlan,
  autoRenew,
  onToggleAutoRenew,
  renewStage,
  onRenew,
  payRef,
}) => {
  const activePlan = PLANS_CONFIG[selectedPlan] || PLANS_CONFIG[0];

  return (
    <div className="flex flex-col gap-2 animate-[arScreenIn_0.45s_cubic-bezier(0.2,0.8,0.2,1)_both]">
      {/* Membership Status Card */}
      <div
        ref={payRef}
        className="p-3 rounded-2xl bg-gradient-to-br from-[#1A1C20] via-[#0E1015] to-[#08090C] border border-[#E2C06D]/30 shadow-xl flex flex-col gap-1.5"
      >
        <div className="flex justify-between items-center text-[9px] font-mono">
          <span className="text-slate-400">MEMBERSHIP · ART-88924</span>
          <span className="text-[#E2C06D] font-semibold">
            {renewStage === 'done' ? 'აქტიურია ✓' : 'იწურება 3 დღეში'}
          </span>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[9px] text-slate-500 block">მოქმედებს</span>
            <span className="text-xl font-light text-white font-mono">
              {renewStage === 'done' ? activePlan.end : '16.11'}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-slate-500 block">ვიზიტი</span>
            <span className="text-xs font-mono text-[#F6EACE]">
              {renewStage === 'done' ? activePlan.g : '12 / 12'}
            </span>
          </div>
        </div>
        <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C69F32] to-[#F6EACE] transition-all duration-700"
            style={{ width: renewStage === 'done' ? '100%' : '100%' }}
          />
        </div>
      </div>

      {/* Plan Selection Header */}
      <span className="font-mono text-[8.5px] tracking-wider text-slate-400 px-0.5">
        აირჩიეთ გეგმა
      </span>

      {/* Plan Options List */}
      <div className="flex flex-col gap-1.5">
        {PLANS_CONFIG.map((p, idx) => {
          const isSelected = selectedPlan === idx;
          return (
            <button
              type="button"
              key={p.id}
              onClick={() => {
                soundEngine.playPulseNode();
                onSelectPlan(idx);
              }}
              className={`flex items-center gap-2.5 min-h-[40px] px-3 rounded-xl border text-left cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#E2C06D]/15 border-[#E2C06D]/60 text-white shadow-md'
                  : 'bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/5'
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                  isSelected ? 'border-[#E2C06D]' : 'border-slate-500'
                }`}
              >
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E2C06D]" />
                )}
              </span>
              <div className="flex-1 min-w-0 flex flex-col">
                <span className="text-xs font-medium text-white">{p.name}</span>
                <span className="text-[9px] text-slate-400">{p.sub}</span>
              </div>
              <span className="font-mono text-xs text-[#F6EACE] font-medium">
                {p.price}
              </span>
            </button>
          );
        })}
      </div>

      {/* Auto-renew & Payment method */}
      <div className="flex flex-col border-t border-white/10 pt-1 text-[10px]">
        <div
          onClick={onToggleAutoRenew}
          className="flex justify-between items-center py-1.5 border-b border-white/5 cursor-pointer"
        >
          <span className="text-slate-300">ავტო-განახლება</span>
          <div
            className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-300 flex items-center ${
              autoRenew ? 'bg-[#E2C06D]' : 'bg-slate-700'
            }`}
          >
            <div
              className={`w-3.5 h-3.5 rounded-full bg-black transition-transform duration-300 ${
                autoRenew ? 'translate-x-3.5' : 'translate-x-0'
              }`}
            />
          </div>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-white/5">
          <span className="text-slate-400">გადახდა</span>
          <span className="text-white font-mono text-[10.5px]">
            Apple Pay •••• 4821
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        onClick={() => {
          soundEngine.playSystemAccess();
          onRenew();
        }}
        className={`min-h-[44px] rounded-xl flex items-center justify-center font-bold text-xs uppercase tracking-wide cursor-pointer transition-all ${
          renewStage === 'done'
            ? 'bg-[#E2C06D] text-slate-950 shadow-lg'
            : 'bg-white text-slate-950 hover:bg-slate-200'
        }`}
      >
        {renewStage === 'done'
          ? `განახლებულია · ${activePlan.end}-მდე`
          : `განახლება · ${activePlan.end}-მდე`}
      </button>
    </div>
  );
};
