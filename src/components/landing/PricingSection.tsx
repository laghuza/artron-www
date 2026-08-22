'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Zap, Sparkles, Shield, Building2, ArrowRight, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { soundEngine } from '@/core';
import { TiltSpotlightCard } from '@/components/ui/TiltSpotlightCard';
import { MagneticButton } from '@/components/ui/MagneticButton';

/* ── PricingCard: isolated sub-component so useMagneticCard
   can be called per-card (hooks can't be called inside .map()) ── */
type PlanItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  badge: string | null;
  popular: boolean;
  ctaText: string;
  ctaHref: string;
  features: string[];
  icon: React.ElementType;
  roiBadge: string;
  roiSub: string;
};

const PricingCard: React.FC<{
  plan: PlanItem;
  index: number;
  currencySymbol: string;
  billingCycle: 'MONTHLY' | 'ANNUAL';
  t: (key: string) => string;
}> = ({ plan, index, currencySymbol, billingCycle, t }) => {
  const Icon = plan.icon;
  const spotlightColor = plan.popular ? 'rgba(0, 163, 255, 0.28)' : 'rgba(0, 163, 255, 0.16)';

  return (
    <TiltSpotlightCard
      maxTilt={plan.popular ? 8 : 6}
      spotlightColor={spotlightColor}
      className={`h-full ${plan.popular ? 'md:-translate-y-3 z-10' : ''}`}
    >
      <div
        className={`relative flex flex-col justify-between rounded-2xl p-6 lg:p-8 transition-[box-shadow,border-color] duration-300 h-full backdrop-blur-xl ${
          plan.popular
            ? 'bg-gradient-to-b from-[#0B1526]/95 to-[#0E1726]/95 border border-[#00A3FF]/40 shadow-[0_0_80px_rgba(0,163,255,0.3),0_20px_50px_rgba(0,163,255,0.15)] studio-grain'
            : 'bg-[#05070a]/90 border border-[#8a99ad]/10 hover:border-[#00A3FF]/30'
        }`}
      >
        {/* L-Shape Corner Brackets */}
        <div className={`absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 ${plan.popular ? 'border-[#00D2FF]/60' : 'border-[#00A3FF]/30'}`} />
        <div className={`absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 ${plan.popular ? 'border-[#00D2FF]/60' : 'border-[#00A3FF]/30'}`} />
        <div className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 ${plan.popular ? 'border-[#00D2FF]/60' : 'border-[#00A3FF]/30'}`} />
        <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 ${plan.popular ? 'border-[#00D2FF]/60' : 'border-[#00A3FF]/30'}`} />

        {/* Popular animated conic border */}
        {plan.popular && (
          <div
            className="absolute -inset-[1.5px] rounded-[17px] pointer-events-none z-0 pro-card-border"
            style={{ opacity: 0.9 }}
          />
        )}
        {/* Popular Ribbon */}
        {plan.popular && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0066FF] to-[#00D2FF] text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-[0_4px_12px_rgba(0,163,255,0.4)] flex items-center gap-1.5 z-30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{plan.badge}</span>
          </div>
        )}

        <div className="relative z-10">
          {/* Header info */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${plan.popular ? 'bg-[#00A3FF]/20 text-[#00A3FF]' : 'bg-white/5 text-gray-400'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-white tracking-wide uppercase">
                {plan.name}
              </h3>
            </div>
          </div>

          <p className="text-xs text-gray-400 min-h-[36px] mb-4">
            {plan.desc}
          </p>

          {/* Price display */}
          <div className="mb-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl lg:text-4xl font-black text-white">
                {currencySymbol}{plan.price}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {t('pricing_mo')}
              </span>
            </div>
            <div className="text-[10px] text-gray-500 font-mono mt-1">
              {billingCycle === 'ANNUAL' ? t('pricing_billed_annually') : t('pricing_monthly')}
            </div>
          </div>

          {/* ROI Saver Calculator Badge */}
          <div className="mb-6 p-3 rounded-xl bg-gradient-to-r from-[#00ff87]/10 to-[#00A3FF]/10 border border-[#00ff87]/20 relative overflow-hidden group">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#00ff87]">
              <TrendingUp className="w-3.5 h-3.5 text-[#00ff87]" />
              <span>{plan.roiBadge}</span>
            </div>
            <div className="text-[10px] text-gray-400 font-sans mt-1 leading-snug">
              {plan.roiSub}
            </div>
          </div>

          {/* Feature list */}
          <ul className="space-y-3 mb-8">
            {plan.features.map((feat, fIdx) => (
              <li key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-300">
                <div className={`mt-0.5 p-0.5 rounded-full ${plan.popular ? 'bg-[#00A3FF]/20 text-[#00A3FF]' : 'bg-[#00ff87]/20 text-[#00ff87]'}`}>
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="leading-relaxed">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card CTA */}
        <div className="relative z-10">
          <MagneticButton
            href={plan.ctaHref}
            onClick={() => soundEngine.playPulseNode()}
            fullWidth
            variant={plan.popular ? 'primary' : 'secondary'}
            shockwaveColor={plan.popular ? 'rgba(0, 163, 255, 0.7)' : 'rgba(255, 255, 255, 0.4)'}
            className="w-full py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider"
          >
            <span>{plan.ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
        </div>
      </div>
    </TiltSpotlightCard>
  );
};

export const PricingSection: React.FC = () => {
  const { t, locale } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<'MONTHLY' | 'ANNUAL'>('MONTHLY');

  // Currency symbols and rates based on locale
  const currencySymbol = locale === 'ka' ? '₾' : locale === 'ru' ? '₽' : '$';
  const currencyMultiplier = locale === 'ka' ? 1 : locale === 'ru' ? 33 : 0.37;

  const starterMonthly = Math.round(350 * currencyMultiplier);
  const starterAnnual = Math.round(280 * currencyMultiplier);

  const proMonthly = Math.round(565 * currencyMultiplier);
  const proAnnual = Math.round(450 * currencyMultiplier);

  const enterpriseMonthly = Math.round(950 * currencyMultiplier);
  const enterpriseAnnual = Math.round(760 * currencyMultiplier);

  const starterPrice = billingCycle === 'ANNUAL' ? starterAnnual : starterMonthly;
  const proPrice = billingCycle === 'ANNUAL' ? proAnnual : proMonthly;
  const enterprisePrice = billingCycle === 'ANNUAL' ? enterpriseAnnual : enterpriseMonthly;

  const plans: PlanItem[] = [
    {
      id: 'starter',
      name: t('pricing_starter_name'),
      desc: t('pricing_starter_desc'),
      price: starterPrice,
      badge: null,
      popular: false,
      ctaText: t('pricing_btn_start'),
      ctaHref: `/get-started?mode=register&plan=starter&cycle=${billingCycle.toLowerCase()}`,
      roiBadge: t('pricing_starter_roi'),
      roiSub: t('pricing_starter_roi_sub'),
      features: [
        t('pricing_starter_feat1'),
        t('pricing_starter_feat2'),
        t('pricing_starter_feat3'),
        t('pricing_starter_feat4'),
        t('pricing_starter_feat5'),
        t('pricing_starter_feat6'),
        t('pricing_starter_feat7'),
      ],
      icon: Zap,
    },
    {
      id: 'pro',
      name: t('pricing_pro_name'),
      desc: t('pricing_pro_desc'),
      price: proPrice,
      badge: t('pricing_popular_badge'),
      popular: true,
      ctaText: t('pricing_btn_start'),
      ctaHref: `/get-started?mode=register&plan=pro&cycle=${billingCycle.toLowerCase()}`,
      roiBadge: t('pricing_pro_roi'),
      roiSub: t('pricing_pro_roi_sub'),
      features: [
        t('pricing_pro_feat1'),
        t('pricing_pro_feat2'),
        t('pricing_pro_feat3'),
        t('pricing_pro_feat4'),
        t('pricing_pro_feat5'),
        t('pricing_pro_feat6'),
        t('pricing_pro_feat7'),
      ],
      icon: Sparkles,
    },
    {
      id: 'enterprise',
      name: t('pricing_enterprise_name'),
      desc: t('pricing_enterprise_desc'),
      price: enterprisePrice,
      badge: null,
      popular: false,
      ctaText: t('pricing_btn_contact'),
      ctaHref: `/get-started?mode=register&plan=enterprise&cycle=${billingCycle.toLowerCase()}`,
      roiBadge: t('pricing_enterprise_roi'),
      roiSub: t('pricing_enterprise_roi_sub'),
      features: [
        t('pricing_enterprise_feat1'),
        t('pricing_enterprise_feat2'),
        t('pricing_enterprise_feat3'),
        t('pricing_enterprise_feat4'),
        t('pricing_enterprise_feat5'),
        t('pricing_enterprise_feat6'),
        t('pricing_enterprise_feat7'),
      ],
      icon: Building2,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#0B0E14] border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00A3FF]/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-[#00ff87]/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/30 text-[#00A3FF] text-xs font-mono tracking-wider uppercase mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>[ ARTRON_PRICING_ENGINE ]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {t('pricing_title')}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 font-normal">
            {t('pricing_subtitle')}
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center bg-[#121722] border border-white/10 p-1.5 rounded-xl">
            <button
              type="button"
              onClick={() => {
                soundEngine.playPulseNode();
                setBillingCycle('MONTHLY');
              }}
              className={`px-5 py-2 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                billingCycle === 'MONTHLY'
                  ? 'bg-[#00A3FF] text-white shadow-[0_0_15px_rgba(0,163,255,0.4)]'
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
              className={`px-5 py-2 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer relative flex items-center gap-2 ${
                billingCycle === 'ANNUAL'
                  ? 'bg-[#00A3FF] text-white shadow-[0_0_15px_rgba(0,163,255,0.4)]'
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

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={index}
              currencySymbol={currencySymbol}
              billingCycle={billingCycle}
              t={t}
            />
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-gray-400 font-mono">
            {t('pricing_guarantee')}
          </p>
          <div className="mt-4 flex items-center justify-center gap-6 text-[11px] text-gray-500 uppercase tracking-widest font-mono flex-wrap">
            <span>🔒 TBC BANK</span>
            <span>•</span>
            <span>🏛️ BANK OF GEORGIA</span>
            <span>•</span>
            <span>💳 VISA / MASTERCARD</span>
            <span>•</span>
            <span>⚡ 24/7 SUPPORT</span>
          </div>
        </div>
      </div>
    </section>
  );
};
