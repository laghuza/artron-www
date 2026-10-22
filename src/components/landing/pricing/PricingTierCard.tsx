'use client';

import React from 'react';
import { Check, TrendingUp, Users, Cpu, Shield, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { PricingTier, BillingCycle } from '@/types/pricing';
import { TiltSpotlightCard } from '@/components/ui/TiltSpotlightCard';
import { soundEngine } from '@/core';

interface PricingTierCardProps {
  tier: PricingTier;
  index: number;
  currencySymbol: string;
  currencyMultiplier: number;
  billingCycle: BillingCycle;
  onRequestDemo?: (tier: PricingTier) => void;
  t: (key: string) => string;
}

export const PricingTierCard: React.FC<PricingTierCardProps> = ({
  tier,
  index,
  currencySymbol,
  currencyMultiplier,
  billingCycle,
  t,
}) => {
  const baseCalculated = Math.round(tier.basePrice * currencyMultiplier);
  const annualPrice = Math.round(baseCalculated * 0.8);
  const currentPrice = billingCycle === 'ANNUAL' ? annualPrice : baseCalculated;
  const isPopular = tier.popular;

  const spotlightColor = isPopular
    ? 'rgba(0, 255, 135, 0.25)'
    : 'rgba(0, 163, 255, 0.20)';

  return (
    <TiltSpotlightCard maxTilt={6} spotlightColor={spotlightColor} className="h-full group">
      <div
        className={`relative flex flex-col justify-between rounded-2xl p-6 lg:p-7 transition-all duration-300 h-full backdrop-blur-xl bg-[#05070a]/90 border ${
          isPopular
            ? 'border-[#00ff87]/40 shadow-[0_0_35px_rgba(0,255,135,0.12)]'
            : 'border-[#8a99ad]/10 hover:border-[#00A3FF]/40 hover:shadow-[0_0_35px_rgba(0,163,255,0.18)]'
        }`}
      >
        {/* L-Shape Corner Brackets */}
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00A3FF]/30 group-hover:border-[#00D2FF]/70 transition-colors" />
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00A3FF]/30 group-hover:border-[#00D2FF]/70 transition-colors" />
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00A3FF]/30 group-hover:border-[#00D2FF]/70 transition-colors" />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00A3FF]/30 group-hover:border-[#00D2FF]/70 transition-colors" />

        {/* Popular Badge */}
        {tier.badgeKey && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#00ff87] to-[#00A3FF] text-[#05070a] font-mono text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1 z-20">
            <Sparkles className="w-3 h-3" />
            <span>{t(tier.badgeKey)}</span>
          </div>
        )}

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-lg font-black text-white tracking-wide uppercase">
              {t(tier.nameKey)}
            </h3>
            <div className="p-1.5 rounded-lg bg-[#00A3FF]/10 text-[#00A3FF]">
              <Shield className="w-4 h-4" />
            </div>
          </div>

          <p className="text-xs text-gray-400 min-h-[34px] mb-4 leading-relaxed">
            {t(tier.descKey)}
          </p>

          {/* Limits Badges Pill Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-[11px]">
            <div className="flex items-center gap-1.5 text-gray-300">
              <Users className="w-3.5 h-3.5 text-[#00A3FF]" />
              <span>
                <strong className="text-white">{tier.limits.members}</strong> {t('pricing_lim_members')}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              <Cpu className="w-3.5 h-3.5 text-[#00ff87]" />
              <span>
                <strong className="text-white">{tier.limits.trainers}</strong> {t('pricing_lim_trainers')}
              </span>
            </div>
          </div>

          {/* Price display */}
          <div className="mb-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl lg:text-4xl font-black text-white">
                {currencySymbol}{currentPrice}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                /{t('pricing_mo')}
              </span>
            </div>
            <div className="text-[10px] text-gray-500 font-mono mt-1 flex justify-between items-center">
              <span>
                {billingCycle === 'ANNUAL' ? t('pricing_billed_annually') : t('pricing_monthly')}
              </span>
              {billingCycle === 'ANNUAL' && (
                <span className="text-[#00ff87] font-bold">2 {t('pricing_months_free')}</span>
              )}
            </div>
          </div>

          {/* Hardware & Pass Note */}
          <div className="mb-4 p-2.5 rounded-lg bg-[#00A3FF]/5 border border-[#00A3FF]/15 text-[11px] text-[#00D2FF] font-mono leading-tight flex items-start gap-2">
            <Cpu className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <span>{t(tier.hardwareNoteKey)}</span>
          </div>

          {/* ROI Badge */}
          <div className="mb-5 p-3 rounded-xl bg-gradient-to-r from-[#00ff87]/10 to-[#00A3FF]/10 border border-[#00ff87]/20">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#00ff87]">
              <TrendingUp className="w-3.5 h-3.5 text-[#00ff87]" />
              <span>{t(tier.roiBadgeKey)}</span>
            </div>
            <div className="text-[10px] text-gray-400 font-sans mt-1 leading-snug">
              {t(tier.roiSubKey)}
            </div>
          </div>

          {/* Feature list */}
          <ul className="space-y-2.5 mb-6">
            {tier.featuresKeys.map((fKey, fIdx) => (
              <li key={fIdx} className="flex items-start gap-2 text-xs text-gray-300">
                <div className="mt-0.5 p-0.5 rounded-full bg-[#00ff87]/20 text-[#00ff87] shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span className="leading-snug">{t(fKey)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button: Triggers Right-Hand Omnichannel Floating Dock */}
        <div className="relative z-10 pt-4 border-t border-white/5 mt-auto">
          <button
            type="button"
            onClick={() => {
              try {
                soundEngine.playPulseNode();
              } catch {}
              window.dispatchEvent(
                new CustomEvent('artron-open-omnichannel', {
                  detail: { planId: tier.id, planName: t(tier.nameKey) },
                })
              );
            }}
            className={`w-full py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group/btn ${
              isPopular
                ? 'bg-gradient-to-r from-[#00ff87] via-[#00e5ff] to-[#00A3FF] text-black font-extrabold shadow-[0_0_20px_rgba(0,255,135,0.35)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-white/5 hover:bg-[#00A3FF]/20 text-white hover:text-[#00D2FF] border border-white/10 hover:border-[#00A3FF]/50 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(0,163,255,0.25)]'
            }`}
          >
            <MessageCircle className={`w-3.5 h-3.5 ${isPopular ? 'text-black fill-black' : 'text-[#00A3FF]'}`} />
            <span>{t('pricing_btn_consultation')}</span>
            <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 ${isPopular ? 'text-black' : 'text-[#00A3FF]'}`} />
          </button>
        </div>
      </div>
    </TiltSpotlightCard>
  );
};
