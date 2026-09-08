'use client';

import React from 'react';
import { Activity, Dumbbell, Waves, Package, SlidersHorizontal } from 'lucide-react';
import { VerticalType, PricingMode, BillingCycle } from '@/types/pricing';
import { VERTICAL_DETAILS } from '@/data/pricingData';
import { soundEngine } from '@/core';

interface PricingVerticalSelectorProps {
  vertical: VerticalType;
  setVertical: (v: VerticalType) => void;
  mode: PricingMode;
  setMode: (m: PricingMode) => void;
  billingCycle: BillingCycle;
  setBillingCycle: (b: BillingCycle) => void;
  currencySymbol: string;
  currencyMultiplier: number;
  t: (key: string) => string;
}

const VERTICAL_ICONS: Record<VerticalType, React.ElementType> = {
  studio: Activity,
  gym: Dumbbell,
  pool: Waves,
};

export const PricingVerticalSelector: React.FC<PricingVerticalSelectorProps> = ({
  vertical,
  setVertical,
  mode,
  setMode,
  billingCycle,
  setBillingCycle,
  currencySymbol,
  currencyMultiplier,
  t,
}) => {
  const verticals: VerticalType[] = ['studio', 'gym', 'pool'];

  return (
    <div className="flex flex-col items-center gap-6 mb-12">
      {/* Top: 3 Industry Verticals Selector */}
      <div className="w-full max-w-3xl">
        <div className="text-[11px] font-mono text-gray-400 uppercase tracking-widest text-center mb-3">
          {t('pricing_select_vertical_label')}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 rounded-2xl bg-[#0e131d]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
          {verticals.map((vertKey) => {
            const vert = VERTICAL_DETAILS[vertKey];
            const isSelected = vertical === vertKey;
            const convertedPrice = Math.round(vert.minPrice * currencyMultiplier);
            const IconComponent = VERTICAL_ICONS[vertKey] || Activity;

            return (
              <button
                key={vertKey}
                type="button"
                onClick={() => {
                  soundEngine.playPulseNode();
                  setVertical(vertKey);
                }}
                className={`relative flex items-center justify-between sm:flex-col sm:items-center p-3.5 sm:p-4 rounded-xl transition-all duration-300 cursor-pointer text-left sm:text-center group overflow-hidden ${
                  isSelected
                    ? 'bg-[#151c28] border border-[#00A3FF] shadow-[0_0_25px_rgba(0,163,255,0.25)] text-white'
                    : 'bg-white/[0.02] border border-white/5 text-gray-400 hover:text-gray-200 hover:bg-white/[0.05]'
                }`}
              >
                {/* Active glow pulse */}
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00A3FF]/10 to-[#00ff87]/5 pointer-events-none" />
                )}

                <div className="flex items-center gap-2.5 sm:flex-col sm:gap-2 relative z-10">
                  <div
                    className={`p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center ${
                      isSelected
                        ? 'bg-white/10 border border-white/20 shadow-[0_0_15px_rgba(0,163,255,0.3)]'
                        : 'bg-white/[0.03] border border-white/5 group-hover:border-white/15 group-hover:bg-white/[0.07]'
                    }`}
                  >
                    <IconComponent
                      className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: vert.accentColor }}
                    />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white tracking-wide">
                      {t(vert.titleKey)}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {t(vert.subKey)}
                    </div>
                  </div>
                </div>

                <div className="relative z-10 text-right sm:text-center mt-0 sm:mt-2 font-mono">
                  <span className="text-[10px] text-gray-500 block uppercase tracking-wider">
                    {t('pricing_from')}
                  </span>
                  <span className="text-sm font-black text-[#00A3FF]">
                    {currencySymbol}{convertedPrice}
                    <span className="text-[10px] text-gray-400 font-normal">/{t('pricing_mo')}</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Middle: Mode Switch (Tiers vs Custom Builder) & Billing Cycle Toggle */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Mode Switch: Ready Tiers vs Custom Builder */}
        <div className="inline-flex items-center p-1.5 rounded-xl bg-[#121722] border border-white/10 shadow-lg">
          <button
            type="button"
            onClick={() => {
              soundEngine.playPulseNode();
              setMode('tiers');
            }}
            className={`px-4 sm:px-6 py-2 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              mode === 'tiers'
                ? 'bg-[#00A3FF] text-white shadow-[0_0_15px_rgba(0,163,255,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>{t('pricing_mode_tiers')}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              soundEngine.playPulseNode();
              setMode('builder');
            }}
            className={`px-4 sm:px-6 py-2 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2 relative ${
              mode === 'builder'
                ? 'bg-[#00A3FF] text-white shadow-[0_0_15px_rgba(0,163,255,0.4)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{t('pricing_mode_builder')}</span>
            <span className="bg-[#00ff87] text-[#0B0E14] text-[9px] px-1.5 py-0.2 rounded font-black tracking-normal uppercase">
              17 {t('pricing_modules_tag')}
            </span>
          </button>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="inline-flex items-center p-1.5 rounded-xl bg-[#121722] border border-white/10 shadow-lg">
          <button
            type="button"
            onClick={() => {
              soundEngine.playPulseNode();
              setBillingCycle('MONTHLY');
            }}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
              billingCycle === 'MONTHLY'
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t('pricing_monthly')}
          </button>
          <button
            type="button"
            onClick={() => {
              soundEngine.playPulseNode();
              setBillingCycle('ANNUAL');
            }}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer relative flex items-center gap-2 ${
              billingCycle === 'ANNUAL'
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>{t('pricing_annual')}</span>
            <span className="bg-[#00ff87] text-[#0B0E14] text-[9px] px-2 py-0.5 rounded-full font-black tracking-normal uppercase animate-pulse">
              -20%
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
