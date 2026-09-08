'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Zap, Check, X, ShieldCheck, Layers, Activity, Dumbbell, Waves } from 'lucide-react';
import { VerticalType, BillingCycle, CustomModule } from '@/types/pricing';
import { VERTICAL_DETAILS, CUSTOM_MODULES } from '@/data/pricingData';
import { soundEngine } from '@/core';

const VERTICAL_ICONS: Record<VerticalType, React.ElementType> = {
  studio: Activity,
  gym: Dumbbell,
  pool: Waves,
};

interface PricingBuilderSidebarProps {
  vertical: VerticalType;
  billingCycle: BillingCycle;
  selectedModules: CustomModule[];
  currencySymbol: string;
  currencyMultiplier: number;
  onToggleModule: (id: string, isCore?: boolean) => void;
  onSetPreset: (preset: 'recommended' | 'all' | 'minimal') => void;
  onRequestCustomDemo: () => void;
  t: (key: string) => string;
}

export const PricingBuilderSidebar: React.FC<PricingBuilderSidebarProps> = ({
  vertical,
  billingCycle,
  selectedModules,
  currencySymbol,
  currencyMultiplier,
  onToggleModule,
  onSetPreset,
  onRequestCustomDemo,
  t,
}) => {
  const basePrice = VERTICAL_DETAILS[vertical].minPrice;
  const addonsTotal = selectedModules
    .filter((m) => !m.isCore)
    .reduce((acc, m) => acc + m.basePrice, 0);

  const rawMonthlyTotal = basePrice + addonsTotal;
  const convertedMonthly = Math.round(rawMonthlyTotal * currencyMultiplier);
  const convertedAnnual = Math.round(convertedMonthly * 0.8);
  const currentTotal = billingCycle === 'ANNUAL' ? convertedAnnual : convertedMonthly;

  const annualSavings = (convertedMonthly - convertedAnnual) * 12;
  const totalAvailableModules = CUSTOM_MODULES.length;
  const activeAddons = selectedModules.filter((m) => !m.isCore);
  const coreModules = selectedModules.filter((m) => m.isCore);

  return (
    <aside className="w-full">
      <div className="p-4 sm:p-5 rounded-2xl bg-[#090d14]/95 border border-[#00A3FF]/40 shadow-[0_0_35px_rgba(0,163,255,0.15)] backdrop-blur-2xl transition-all duration-300 max-h-[calc(100vh-6rem)] overflow-y-auto custom-scrollbar flex flex-col">
        {/* Header with live pulsing indicator */}
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5 mb-2.5 shrink-0">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff87] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff87]" />
            </span>
            <span className="text-[11px] font-mono font-bold text-gray-300 uppercase tracking-wider">
              {t('pricing_live_calculation') || 'ცოცხალი კალკულაცია'}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#00A3FF]/15 border border-[#00A3FF]/30 text-[#00D2FF] text-[10px] font-mono font-bold">
            {selectedModules.length} / {totalAvailableModules} {t('pricing_modules_label')}
          </span>
        </div>

        {/* Selected Vertical Banner */}
        {(() => {
          const VerticalIcon = VERTICAL_ICONS[vertical] || Activity;
          return (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5 mb-2.5 shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#00A3FF]/10 text-[#00A3FF]">
                  <VerticalIcon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[9px] font-mono text-gray-400 uppercase">
                    {t('pricing_base_platform') || 'საბაზისო პლატფორმა'}
                  </div>
                  <div className="text-[11px] font-bold text-white leading-tight">
                    {t(VERTICAL_DETAILS[vertical].titleKey)}
                  </div>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-gray-300">
                {currencySymbol}{Math.round(basePrice * currencyMultiplier)}/{t('pricing_mo')}
              </span>
            </div>
          );
        })()}

        {/* Live Total Price Display */}
        <div className="p-3 rounded-xl bg-gradient-to-br from-[#00A3FF]/10 via-[#070a0f] to-[#00ff87]/10 border border-[#00A3FF]/30 mb-2.5 text-center shrink-0">
          <div className="text-[10px] font-mono text-gray-400 uppercase mb-0.5">
            {billingCycle === 'ANNUAL' ? t('pricing_annual_price') : t('pricing_monthly_price')}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono flex items-baseline justify-center gap-1">
            <span className="bg-gradient-to-r from-[#00D2FF] to-[#00ff87] bg-clip-text text-transparent">
              {currencySymbol}{currentTotal}
            </span>
            <span className="text-xs text-gray-400 font-normal">/{t('pricing_mo')}</span>
          </div>

          {billingCycle === 'ANNUAL' ? (
            <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00ff87]/15 border border-[#00ff87]/30 text-[#00ff87] text-[9px] font-mono font-bold animate-pulse">
              ✨ {t('pricing_annual_savings_label')}: {currencySymbol}{annualSavings}/{t('pricing_year')} (-20%)
            </div>
          ) : (
            <div className="mt-1 text-[9px] text-gray-400 font-mono">
              💡 {t('pricing_save_with_annual') || 'წლიურზე გადართვისას დაზოგავთ 20%-ს'}
            </div>
          )}
        </div>

        {/* Quick Module Breakdown */}
        <div className="mb-2.5 shrink-0">
          <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 uppercase mb-1.5">
            <span>{t('pricing_breakdown_title') || 'არჩეული მოდულები'}</span>
            <span className="text-[#00A3FF] font-bold">+{currencySymbol}{Math.round(addonsTotal * currencyMultiplier)}/{t('pricing_mo')}</span>
          </div>

          <div className="max-h-32 sm:max-h-36 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {/* Core Modules (Locked) */}
            {coreModules.map((mod) => (
              <div
                key={mod.id}
                className="flex items-center justify-between py-1 px-2 rounded-md bg-white/[0.02] border border-white/5 text-[11px] font-mono text-gray-400"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Check className="w-3 h-3 text-[#00ff87] shrink-0" />
                  <span className="truncate text-gray-300">{t(mod.nameKey)}</span>
                </div>
                <span className="text-[9px] text-[#00ff87] shrink-0 font-bold ml-1.5">
                  {t('pricing_free_in_core')}
                </span>
              </div>
            ))}

            {/* Active Add-ons (Removable) */}
            {activeAddons.map((mod) => {
              const modPrice = Math.round(mod.basePrice * currencyMultiplier);
              return (
                <div
                  key={mod.id}
                  className="group flex items-center justify-between py-1 px-2 rounded-md bg-[#00A3FF]/5 border border-[#00A3FF]/20 text-[11px] font-mono transition-all hover:bg-[#00A3FF]/10"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-[#00A3FF] text-[8px]">●</span>
                    <span className="truncate text-white font-medium">{t(mod.nameKey)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-1.5">
                    <span className="text-[10px] text-[#00D2FF] font-bold">
                      +{currencySymbol}{modPrice}
                    </span>
                    <button
                      type="button"
                      onClick={() => onToggleModule(mod.id, mod.isCore)}
                      title="მოდულის გაუქმება"
                      className="p-0.5 rounded hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              );
            })}

            {activeAddons.length === 0 && (
              <div className="text-[10px] text-gray-500 text-center py-1.5 italic font-mono">
                {t('pricing_no_addons_selected') || 'დამატებითი მოდულები არ არის არჩეული'}
              </div>
            )}
          </div>
        </div>

        {/* Preset Quick Actions */}
        <div className="grid grid-cols-3 gap-1 pt-2 border-t border-white/10 mb-2.5 font-mono text-[9px] shrink-0">
          <button
            type="button"
            onClick={() => onSetPreset('recommended')}
            className="py-1 px-1 rounded bg-[#00A3FF]/10 text-[#00A3FF] hover:bg-[#00A3FF]/20 border border-[#00A3FF]/30 transition-all text-center cursor-pointer font-bold truncate"
          >
            ✨ {t('pricing_preset_recommended')}
          </button>
          <button
            type="button"
            onClick={() => onSetPreset('all')}
            className="py-1 px-1 rounded bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10 transition-all text-center cursor-pointer truncate"
          >
            {t('pricing_preset_all')}
          </button>
          <button
            type="button"
            onClick={() => onSetPreset('minimal')}
            className="py-1 px-1 rounded bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10 transition-all text-center cursor-pointer truncate"
          >
            {t('pricing_preset_minimal')}
          </button>
        </div>

        {/* Action Buttons: Request Demo + Direct Register */}
        <div className="space-y-1.5 shrink-0">
          <Link
            href={`/get-started?mode=register&plan=custom&vertical=${vertical}&cycle=${billingCycle.toLowerCase()}&modules=${selectedModules.map((m) => m.id).join(',')}`}
            onClick={() => soundEngine.playSystemAccess()}
            className="w-full py-2.5 sm:py-3 px-4 rounded-xl font-bold font-mono text-xs uppercase tracking-wider bg-gradient-to-r from-[#00A3FF] to-[#00ff87] text-[#05070a] shadow-[0_0_20px_rgba(0,163,255,0.35)] hover:shadow-[0_0_30px_rgba(0,255,135,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] text-center"
          >
            <span>{t('pricing_btn_activate')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => {
              soundEngine.playPulseNode();
              onRequestCustomDemo();
            }}
            className="w-full py-2 px-4 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{t('pricing_builder_btn_request')}</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-2 text-center text-[9px] text-gray-500 font-mono shrink-0">
          🔒 {t('pricing_guarantee_badge') || '14-დღიანი გარანტია • დამალული ხარჯების გარეშე'}
        </div>
      </div>
    </aside>
  );
};
