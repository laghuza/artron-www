'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ps5Audio } from '../../core/ps5SoundEngine';
import {
  ShieldCheck,
  Cpu,
  Radio,
  Activity,
  Dumbbell,
  Waves,
  Building2,
  SlidersHorizontal,
  Users,
  QrCode,
  DoorOpen,
} from 'lucide-react';
import { VerticalType, PricingTier, CustomModule } from '@/types/pricing';
import { VERTICAL_DETAILS, PRICING_TIERS_BY_VERTICAL, CUSTOM_MODULES } from '@/data/pricingData';

const VERTICAL_ICONS: Record<string, React.ElementType> = {
  studio: Activity,
  gym: Dumbbell,
  pool: Waves,
  federation: Building2,
};

interface PS5LiveHologramProps {
  vertical?: VerticalType | 'federation';
  selectedPlan: string; // e.g. 'studio-starter' | 'gym-pro' | 'pool-enterprise' | 'starter' | 'pro' | 'enterprise' | 'custom'
  billingCycle: 'monthly' | 'annual';
  customModuleIds?: string[];
  onSelectPlan: (plan: string) => void;
  onToggleBillingCycle: (cycle: 'monthly' | 'annual') => void;
  currentStep: number;
}

export const PS5LiveHologram: React.FC<PS5LiveHologramProps> = ({
  vertical = 'gym',
  selectedPlan,
  billingCycle,
  customModuleIds = [],
  onSelectPlan,
  onToggleBillingCycle,
}) => {
  const { t } = useLanguage();

  // Normalize active vertical
  const activeVertical: VerticalType =
    vertical === 'studio' || vertical === 'gym' || vertical === 'pool'
      ? vertical
      : 'gym';

  const verticalMeta = VERTICAL_DETAILS[activeVertical] || VERTICAL_DETAILS.gym;
  const currentVerticalTiers = PRICING_TIERS_BY_VERTICAL[activeVertical] || PRICING_TIERS_BY_VERTICAL.gym;

  // Find active tier
  const isCustom = selectedPlan.toLowerCase() === 'custom';
  let activeTier: PricingTier | null = null;

  if (!isCustom) {
    // Check direct match
    activeTier = currentVerticalTiers.find((t) => t.id.toLowerCase() === selectedPlan.toLowerCase()) || null;
    
    // Check tier level match (e.g. 'starter' -> 'gym-starter')
    if (!activeTier) {
      if (selectedPlan.toLowerCase().includes('starter')) {
        activeTier = currentVerticalTiers[0];
      } else if (selectedPlan.toLowerCase().includes('enterprise')) {
        activeTier = currentVerticalTiers[2];
      } else {
        activeTier = currentVerticalTiers[1]; // default to Pro
      }
    }
  }

  // Calculate prices
  let monthlyPrice = 0;
  let annualPrice = 0;
  let planName = '';
  let planDesc = '';
  let hardwareNote = '';
  let features: string[] = [];
  let limits = { members: '200', trainers: '8', branches: '1-3' };

  if (isCustom) {
    const basePrice = verticalMeta.minPrice;
    const selectedMods = CUSTOM_MODULES.filter((m) => customModuleIds.includes(m.id));
    const addonsTotal = selectedMods.filter((m) => !m.isCore).reduce((acc, m) => acc + m.basePrice, 0);
    monthlyPrice = basePrice + addonsTotal;
    annualPrice = Math.round(monthlyPrice * 0.8);
    planName = `${t(verticalMeta.titleKey)} • ${t('pricing_mode_builder') || 'მორგებული პაკეტი'}`;
    planDesc = `${selectedMods.length} ${t('pricing_modules_label') || 'მოდული გააქტიურებულია'}`;
    hardwareNote = t('pricing_hw_turnstile_multi');
    features = selectedMods.slice(0, 5).map((m) => m.nameKey);
    limits = { members: '500+', trainers: '15+', branches: 'Multi' };
  } else if (activeTier) {
    monthlyPrice = activeTier.basePrice;
    annualPrice = Math.round(monthlyPrice * 0.8);
    planName = t(activeTier.nameKey);
    planDesc = t(activeTier.descKey);
    hardwareNote = t(activeTier.hardwareNoteKey);
    features = activeTier.featuresKeys;
    limits = {
      members: activeTier.limits.members,
      trainers: activeTier.limits.trainers,
      branches: activeTier.limits.branches,
    };
  } else {
    monthlyPrice = 565;
    annualPrice = 450;
    planName = 'Pro Plan';
    planDesc = 'Standard professional gym operations';
    features = [];
  }

  const currentPrice = billingCycle === 'annual' ? annualPrice : monthlyPrice;
  const VertIcon = VERTICAL_ICONS[activeVertical] || Activity;

  const handlePlanClick = (tierId: string) => {
    ps5Audio.playSelect();
    onSelectPlan(tierId);
  };

  const handleCycleClick = (cycle: 'monthly' | 'annual') => {
    ps5Audio.playNavigate();
    onToggleBillingCycle(cycle);
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* 3D Holographic Console Unit Card */}
      <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#0C1222]/90 via-[#090E1A]/85 to-[#060913]/90 border border-[#00A3FF]/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,163,255,0.15)] overflow-hidden">
        {/* Ambient Top Glow Wave */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#00A3FF]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Console Hologram Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] relative z-10">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center border transition-all"
              style={{
                backgroundColor: `${verticalMeta.accentColor}15`,
                borderColor: `${verticalMeta.accentColor}40`,
                color: verticalMeta.accentColor,
              }}
            >
              <VertIcon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block">
                {t(verticalMeta.titleKey)}
              </span>
              <span className="text-xs font-bold text-white font-mono truncate max-w-[180px] block">
                {planName}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Radio className="w-2.5 h-2.5 animate-pulse" />
            <span>LIVE TARIFF</span>
          </div>
        </div>

        {/* Live Dynamic Price Readout */}
        <div className="py-5 border-b border-white/[0.08] relative z-10">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              ₾{currentPrice}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ {t('pricing_mo') || 'თვე'}</span>
          </div>
          <p className="text-xs text-slate-300 mt-1 line-clamp-1">
            {planDesc}
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-3.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleCycleClick('monthly')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-[#00A3FF] text-black font-bold shadow-[0_0_12px_rgba(0,163,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t('ps5_onboarding.cycle_monthly') || t('pricing_monthly')}
            </button>
            <button
              type="button"
              onClick={() => handleCycleClick('annual')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1 ${
                billingCycle === 'annual'
                  ? 'bg-[#00A3FF] text-black font-bold shadow-[0_0_12px_rgba(0,163,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{t('ps5_onboarding.cycle_annual') || t('pricing_annual')}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-400 text-black font-bold">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Live Limits & Hardware Badge */}
        <div className="py-3.5 border-b border-white/[0.08] grid grid-cols-2 gap-2 relative z-10 font-mono text-[11px]">
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.02] border border-white/5 text-slate-300">
            <Users className="w-3.5 h-3.5 text-[#00A3FF]" />
            <span>
              <strong className="text-white">{limits.members}</strong> {t('pricing_lim_members')}
            </span>
          </div>
          <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.02] border border-white/5 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-[#00ff87]" />
            <span>
              <strong className="text-white">{limits.trainers}</strong> {t('pricing_lim_trainers')}
            </span>
          </div>
        </div>

        {/* Live Hardware Integration Line */}
        {hardwareNote && (
          <div className="py-3 border-b border-white/[0.08] relative z-10 flex items-start gap-2 text-xs text-[#00D2FF] font-mono leading-tight">
            {activeVertical === 'studio' ? (
              <QrCode className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            ) : (
              <DoorOpen className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            )}
            <span>{hardwareNote}</span>
          </div>
        )}

        {/* Live Blueprint Specs Grid */}
        <div className="py-3.5 space-y-2 border-b border-white/[0.08] relative z-10">
          <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block">
            {t('ps5_onboarding.hologram_hardware_pkg') || 'პაკეტის მახასიათებლები'}:
          </span>
          {features.slice(0, 4).map((key, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
              <span className="w-4 h-4 rounded-full bg-[#00A3FF]/20 text-[#00E5FF] flex items-center justify-center text-[10px] font-bold shrink-0">
                ✓
              </span>
              <span className="truncate">{t(key)}</span>
            </div>
          ))}
        </div>

        {/* Interactive Quick Tier Switcher */}
        <div className="pt-3.5 space-y-2 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block">
              {t('ps5_onboarding.hologram_quick_switch') || 'სატარიფო გეგმის გადართვა'}:
            </span>
            {isCustom && (
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#00ff87]/15 text-[#00ff87] font-bold flex items-center gap-1">
                <SlidersHorizontal className="w-2.5 h-2.5" /> CUSTOM
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {currentVerticalTiers.map((tier) => {
              const isCurrent = !isCustom && (activeTier?.id === tier.id || selectedPlan === tier.id);
              const tierPrice = billingCycle === 'annual' ? Math.round(tier.basePrice * 0.8) : tier.basePrice;
              const shortTierName = tier.id.split('-')[1]?.toUpperCase() || tier.id.toUpperCase();

              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => handlePlanClick(tier.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? 'border-[#00E5FF] bg-[#00A3FF]/20 text-white shadow-[0_0_15px_rgba(0,163,255,0.3)] ring-1 ring-[#00E5FF]'
                      : 'border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase truncate font-mono">
                    {shortTierName}
                  </span>
                  <span className={`text-xs font-mono font-extrabold mt-1 ${isCurrent ? 'text-[#00E5FF]' : 'text-slate-300'}`}>
                    ₾{tierPrice}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Security & GDPR Isolation Badge */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="text-[11px] text-slate-300 leading-snug">
          <span className="text-white font-semibold block">{t('ps5_onboarding.hologram_security_title')}</span>
          {t('ps5_onboarding.hologram_security_desc')}
        </div>
      </div>
    </div>
  );
};
