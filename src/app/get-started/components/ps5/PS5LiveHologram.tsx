'use client';

import React from 'react';
import { ps5Audio } from '../../core/ps5SoundEngine';
import { Zap, Sparkles, Building2, Check, ShieldCheck, Cpu, Radio, ChevronRight } from 'lucide-react';

export interface PlanPreset {
  id: 'starter' | 'pro' | 'enterprise';
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  badge: string;
  defaultMembers: string;
  defaultBranches: string;
  defaultHardware: string;
  description: string;
  highlights: string[];
}

export const PLAN_PRESETS: Record<'starter' | 'pro' | 'enterprise', PlanPreset> = {
  starter: {
    id: 'starter',
    name: 'STARTER STUDIO',
    monthlyPrice: 350,
    annualPrice: 280,
    badge: '100 წევრამდე',
    defaultMembers: '< 100 წევრი',
    defaultBranches: '1 ფილიალი',
    defaultHardware: 'მობილური QR სკანერი',
    description: 'მცირე იოგა, პილატეს და კერძო სტუდიებისთვის',
    highlights: ['Cloud CRM წვდომა', 'მობილური QR სკანერი', 'ონლაინ აბონემენტები'],
  },
  pro: {
    id: 'pro',
    name: 'PRO FITNESS',
    monthlyPrice: 565,
    annualPrice: 450,
    badge: '1,000 წევრამდე & IoT',
    defaultMembers: '100 – 500 წევრი',
    defaultBranches: '1 ფილიალი',
    defaultHardware: 'ტურნიკეტები & ბარიერები',
    description: 'სრული ავტომატიზაცია ტურნიკეტებითა და ბიომეტრიით',
    highlights: ['ტურნიკეტების TCP რელეები', '1,000 წევრამდე & IoT Pass', 'ბრძანება №01-15/ნ ტაბელი'],
  },
  enterprise: {
    id: 'enterprise',
    name: 'ENTERPRISE OS',
    monthlyPrice: 950,
    annualPrice: 760,
    badge: 'ულიმიტო & ქსელი',
    defaultMembers: '1500+ წევრი',
    defaultBranches: 'ქსელი (4+ ფილიალი)',
    defaultHardware: 'ტურნიკეტები & ბარიერები',
    description: 'სპორტული ქსელების, აუზებისა და არენებისთვის',
    highlights: ['ულიმიტო ფილიალები & API', 'Real-Time Edge Streaming', 'Multi-Tenant იზოლაცია'],
  },
};

interface PS5LiveHologramProps {
  selectedPlan: 'starter' | 'pro' | 'enterprise';
  billingCycle: 'monthly' | 'annual';
  onSelectPlan: (plan: 'starter' | 'pro' | 'enterprise') => void;
  onToggleBillingCycle: (cycle: 'monthly' | 'annual') => void;
  currentStep: number;
}

export const PS5LiveHologram: React.FC<PS5LiveHologramProps> = ({
  selectedPlan,
  billingCycle,
  onSelectPlan,
  onToggleBillingCycle,
  currentStep,
}) => {
  const activePlan = PLAN_PRESETS[selectedPlan];
  const price = billingCycle === 'annual' ? activePlan.annualPrice : activePlan.monthlyPrice;

  const handlePlanClick = (planKey: 'starter' | 'pro' | 'enterprise') => {
    ps5Audio.playSelect();
    onSelectPlan(planKey);
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
            <div className="w-8 h-8 rounded-xl bg-[#00A3FF]/20 border border-[#00A3FF]/50 flex items-center justify-center text-[#00E5FF]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#00E5FF] uppercase block">
                SYSTEM TIER MATRIX
              </span>
              <span className="text-xs font-bold text-white font-mono">
                {activePlan.name}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Radio className="w-2.5 h-2.5 animate-pulse" />
            <span>LIVE BLUEPRINT</span>
          </div>
        </div>

        {/* Live Dynamic Price Readout */}
        <div className="py-5 border-b border-white/[0.08] relative z-10">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
              ₾{price}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ თვე</span>
          </div>
          <p className="text-xs text-slate-300 mt-1 line-clamp-1">
            {activePlan.description}
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
              ყოველთვიური
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
              <span>წლიური</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-400 text-black font-bold">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Live Blueprint Specs Grid */}
        <div className="py-4 space-y-2.5 border-b border-white/[0.08] relative z-10">
          <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block">
            ტექნიკური აღჭურვილობის პაკეტი:
          </span>
          {activePlan.highlights.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
              <span className="w-4 h-4 rounded-full bg-[#00A3FF]/20 text-[#00E5FF] flex items-center justify-center text-[10px] font-bold shrink-0">
                ✓
              </span>
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* PlayStation 5 Interactive Tier Selector */}
        <div className="pt-4 space-y-2 relative z-10">
          <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase block">
            ტარიფის სწრაფი შეცვლა:
          </span>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(PLAN_PRESETS) as Array<'starter' | 'pro' | 'enterprise'>).map((key) => {
              const p = PLAN_PRESETS[key];
              const isCurrent = selectedPlan === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handlePlanClick(key)}
                  className={`p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? 'border-[#00E5FF] bg-[#00A3FF]/20 text-white shadow-[0_0_15px_rgba(0,163,255,0.3)] ring-1 ring-[#00E5FF]'
                      : 'border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase truncate font-mono">
                    {p.id}
                  </span>
                  <span className={`text-xs font-mono font-extrabold mt-1 ${isCurrent ? 'text-[#00E5FF]' : 'text-slate-300'}`}>
                    ₾{billingCycle === 'annual' ? p.annualPrice : p.monthlyPrice}
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
          <span className="text-white font-semibold block">100% Multi-Tenant იზოლაცია</span>
          მონაცემთა ბაზები დაცულია AES-256-GCM და RLS პროტოკოლებით.
        </div>
      </div>
    </div>
  );
};
