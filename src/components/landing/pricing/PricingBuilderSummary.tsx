'use client';

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { VerticalType, BillingCycle, CustomModule } from '@/types/pricing';
import { VERTICAL_DETAILS } from '@/data/pricingData';
import { soundEngine } from '@/core';
import { MagneticButton } from '@/components/ui/MagneticButton';

interface PricingBuilderSummaryProps {
  vertical: VerticalType;
  billingCycle: BillingCycle;
  selectedModules: CustomModule[];
  currencySymbol: string;
  currencyMultiplier: number;
  onRequestCustomDemo: () => void;
  t: (key: string) => string;
}

export const PricingBuilderSummary: React.FC<PricingBuilderSummaryProps> = ({
  vertical,
  billingCycle,
  selectedModules,
  currencySymbol,
  currencyMultiplier,
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

  return (
    <div className="sticky bottom-6 z-30 w-full max-w-4xl mx-auto mt-10">
      <div className="p-4 sm:p-6 rounded-2xl bg-[#090d14]/95 border border-[#00A3FF]/40 shadow-[0_0_50px_rgba(0,163,255,0.25)] backdrop-blur-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Left Info */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#00A3FF]/20 to-[#00ff87]/20 text-[#00ff87] border border-[#00ff87]/30 shrink-0">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-gray-400 uppercase">
                  {t('pricing_builder_summary_title')}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#00A3FF]/20 text-[#00D2FF] text-[10px] font-mono font-bold">
                  {selectedModules.length} {t('pricing_modules_active')}
                </span>
              </div>
              <div className="text-sm font-bold text-white mt-0.5">
                {t(VERTICAL_DETAILS[vertical].titleKey)} + {selectedModules.length} {t('pricing_modules_label')}
              </div>
              {billingCycle === 'ANNUAL' && (
                <div className="text-[11px] text-[#00ff87] font-mono mt-0.5">
                  ✨ {t('pricing_annual_savings_label')}: {currencySymbol}{annualSavings}/{t('pricing_year')}
                </div>
              )}
            </div>
          </div>

          {/* Right Controls & Price */}
          <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-6 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-white/10">
            <div className="text-left md:text-right">
              <div className="text-[10px] font-mono text-gray-400 uppercase">
                {billingCycle === 'ANNUAL' ? t('pricing_annual_price') : t('pricing_monthly_price')}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono flex items-baseline gap-1">
                <span className="text-[#00A3FF]">{currencySymbol}{currentTotal}</span>
                <span className="text-xs text-gray-400 font-normal">/{t('pricing_mo')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playPulseNode();
                  onRequestCustomDemo();
                }}
                className="py-3 px-3.5 sm:px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-all cursor-pointer hidden sm:flex items-center gap-1.5"
              >
                <span>{t('pricing_builder_btn_request')}</span>
              </button>

              <MagneticButton
                href={`/get-started?mode=register&plan=custom&vertical=${vertical}&cycle=${billingCycle.toLowerCase()}&modules=${selectedModules.map((m) => m.id).join(',')}`}
                onClick={() => soundEngine.playSystemAccess()}
                variant="primary"
                shockwaveColor="rgba(0, 163, 255, 0.7)"
                className="py-3 px-5 sm:px-6 rounded-xl font-bold font-mono text-xs uppercase tracking-wider"
              >
                <span>{t('pricing_btn_activate')}</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
