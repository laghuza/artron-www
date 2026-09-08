'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ps5Audio } from '../../core/ps5SoundEngine';
import { Trophy, ArrowRight, ShieldCheck, CheckCircle2, QrCode, Cpu, Sparkles, Database, DoorOpen, Terminal } from 'lucide-react';

interface Step5SystemLaunchSequenceProps {
  deploymentKey: string;
  email: string;
  facilityName: string;
  facilityType: string;
  selectedPlan?: string;
  billingCycle?: string;
  onReset: () => void;
}

interface InitStage {
  id: number;
  label: string;
  status: 'PENDING' | 'RUNNING' | 'DONE';
  icon: React.ComponentType<{ className?: string }>;
}

export const Step5SystemLaunchSequence: React.FC<Step5SystemLaunchSequenceProps> = ({
  deploymentKey,
  email,
  facilityName,
  facilityType,
  selectedPlan = 'PRO',
  billingCycle = 'MONTHLY',
  onReset,
}) => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isFullyInitialized, setIsFullyInitialized] = useState(false);

  const stages: InitStage[] = [
    {
      id: 1,
      label: t('ps5_onboarding.step5_init_stage1'),
      status: activeStageIndex > 0 ? 'DONE' : activeStageIndex === 0 ? 'RUNNING' : 'PENDING',
      icon: Database,
    },
    {
      id: 2,
      label: t('ps5_onboarding.step5_init_stage2'),
      status: activeStageIndex > 1 ? 'DONE' : activeStageIndex === 1 ? 'RUNNING' : 'PENDING',
      icon: DoorOpen,
    },
    {
      id: 3,
      label: t('ps5_onboarding.step5_init_stage3'),
      status: activeStageIndex > 2 ? 'DONE' : activeStageIndex === 2 ? 'RUNNING' : 'PENDING',
      icon: Cpu,
    },
  ];

  useEffect(() => {
    // Stage 1 -> Stage 2
    const timer1 = setTimeout(() => {
      ps5Audio.playNavigate();
      setActiveStageIndex(1);
    }, 700);

    // Stage 2 -> Stage 3
    const timer2 = setTimeout(() => {
      ps5Audio.playNavigate();
      setActiveStageIndex(2);
    }, 1500);

    // Stage 3 -> Full Unlock
    const timer3 = setTimeout(() => {
      ps5Audio.playTrophyUnlock();
      setActiveStageIndex(3);
      setIsFullyInitialized(true);
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const planKey = selectedPlan.toLowerCase();
  let planDisplayName = selectedPlan.toUpperCase();
  if (planKey === 'custom') {
    planDisplayName = `${t('pricing_mode_builder') || 'მორგებული პაკეტი'} (CUSTOM PLAN)`;
  } else if (planKey.includes('studio-starter')) {
    planDisplayName = `${t('pricing_tier_studio_starter_name')} (₾365)`;
  } else if (planKey.includes('studio-pro')) {
    planDisplayName = `${t('pricing_tier_studio_pro_name')} (₾485)`;
  } else if (planKey.includes('studio-enterprise')) {
    planDisplayName = `${t('pricing_tier_studio_enterprise_name')} (₾685)`;
  } else if (planKey.includes('gym-starter')) {
    planDisplayName = `${t('pricing_tier_gym_starter_name')} (₾565)`;
  } else if (planKey.includes('gym-pro')) {
    planDisplayName = `${t('pricing_tier_gym_pro_name')} (₾745)`;
  } else if (planKey.includes('gym-enterprise')) {
    planDisplayName = `${t('pricing_tier_gym_enterprise_name')} (₾1,150)`;
  } else if (planKey.includes('pool-starter')) {
    planDisplayName = `${t('pricing_tier_pool_starter_name')} (₾745)`;
  } else if (planKey.includes('pool-pro')) {
    planDisplayName = `${t('pricing_tier_pool_pro_name')} (₾980)`;
  } else if (planKey.includes('pool-enterprise')) {
    planDisplayName = `${t('pricing_tier_pool_enterprise_name')} (₾1,450)`;
  } else if (planKey === 'starter') {
    planDisplayName = `${t('ps5_onboarding.plan_starter_name')} (₾365)`;
  } else if (planKey === 'enterprise') {
    planDisplayName = `${t('ps5_onboarding.plan_enterprise_name')} (₾1,150)`;
  } else if (planKey === 'pro') {
    planDisplayName = `${t('ps5_onboarding.plan_pro_name')} (₾745)`;
  }

  return (
    <div className="w-full flex flex-col items-center text-center py-4 px-2 select-none max-w-2xl mx-auto" data-testid="step5-system-launch">
      {/* PS5 Trophy & Core Ignition Ring */}
      <div className="relative mb-6 flex items-center justify-center">
        {/* Outer Laser Pulse Waves */}
        <div
          className="absolute w-40 h-40 rounded-full bg-[#00A3FF]/25 animate-ping"
          style={{ animationDuration: '3s' }}
        />
        <div
          className="absolute w-32 h-32 rounded-full border border-dashed border-[#00E5FF]/60 animate-spin"
          style={{ animationDuration: '12s' }}
        />

        {/* Inner Glowing Trophy Orb */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-[#0055FF] via-[#00A3FF] to-[#00E5FF] flex items-center justify-center shadow-[0_0_60px_rgba(0,229,255,0.8)] border border-white/30">
          <Trophy className="w-10 h-10 sm:w-11 sm:h-11 text-black fill-current animate-bounce" style={{ animationDuration: '2s' }} />
        </div>
      </div>

      {/* Trophy Notification Banner (PS5 Style Popup) */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00A3FF]/20 via-[#0055FF]/20 to-[#00E5FF]/20 border border-[#00E5FF]/40 shadow-[0_0_20px_rgba(0,163,255,0.3)] mb-4">
        <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
        <span className="text-[10.5px] font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
          SYSTEM STATUS: SPORT OS ONLINE
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1.5">
        {t('ps5_onboarding.step5_trophy_title')}
      </h2>
      <p className="text-xs sm:text-sm text-slate-300 max-w-lg mb-6 leading-relaxed">
        {t('ps5_onboarding.step5_trophy_desc')} (<span className="text-[#00E5FF] font-bold">{facilityName || 'ARTRON'}</span>).
      </p>

      {/* Progressive Initialization Terminal HUD */}
      <div className="w-full p-4 rounded-2xl bg-[#090E1A]/95 border border-white/[0.1] text-left font-mono text-xs space-y-2 mb-6">
        <div className="flex items-center gap-2 pb-2 border-b border-white/[0.08] text-slate-400 text-[10px] uppercase tracking-wider">
          <Terminal className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>INITIALIZATION_TERMINAL_LOG</span>
        </div>

        {stages.map((stg) => {
          const Icon = stg.icon;
          const isDone = stg.status === 'DONE';
          const isRunning = stg.status === 'RUNNING';

          return (
            <div
              key={stg.id}
              className={`flex items-center justify-between p-2 rounded-xl transition-all duration-300 ${
                isDone
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : isRunning
                  ? 'bg-[#00A3FF]/15 text-[#00E5FF] border border-[#00A3FF]/40 animate-pulse'
                  : 'text-slate-500 bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 shrink-0" />
                <span className="text-[11px] font-mono">{stg.label}</span>
              </div>
              <span className="text-[10px] font-bold">
                {isDone ? '✓ READY' : isRunning ? '⚡ SYNCING...' : 'QUEUED'}
              </span>
            </div>
          );
        })}
      </div>

      {/* 3D Holographic Deployment Pass */}
      <div className="w-full p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#0C1222]/95 via-[#090E1A]/90 to-[#060913]/95 border border-[#00A3FF]/40 shadow-[0_0_40px_rgba(0,163,255,0.2)] backdrop-blur-2xl text-left font-mono text-xs space-y-3 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
          <QrCode className="w-32 h-32 text-white" />
        </div>

        <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08]">
          <span className="text-slate-400">{t('ps5_onboarding.step5_license_label')}:</span>
          <span className="text-[#00E5FF] font-black text-sm tracking-wider">
            {deploymentKey || 'ART-CLB-108XX'}
          </span>
        </div>

        <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08]">
          <span className="text-slate-400">{t('ps5_onboarding.step5_plan_label')}:</span>
          <span className="text-white font-bold">{planDisplayName}</span>
        </div>

        <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08]">
          <span className="text-slate-400">SECURITY_ISOLATION:</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            AES-256-GCM ACTIVE
          </span>
        </div>

        <div className="pt-1 text-[11px] text-slate-300 font-sans leading-relaxed">
          {t('ps5_onboarding.step5_admin_login_label')}:
          <div className="text-white font-mono font-bold mt-0.5 text-xs">
            {email || 'admin@facility.ge'}
          </div>
        </div>
      </div>

      {/* Action Buttons: Direct Jump to CRM Control Panel */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Link
          href="/sports-os"
          onClick={() => ps5Audio.playSelect()}
          className="flex-1 py-4 px-8 rounded-2xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#00A3FF] via-[#0066FF] to-[#00D2FF] text-white shadow-[0_0_30px_rgba(0,163,255,0.5)] hover:shadow-[0_0_40px_rgba(0,163,255,0.8)] hover:scale-[1.02] transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{t('ps5_onboarding.step5_btn_launch')}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <button
          type="button"
          onClick={() => {
            ps5Audio.playBack();
            onReset();
          }}
          className="py-4 px-6 rounded-2xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer"
        >
          ← {t('ps5_onboarding.dock_btn_back')}
        </button>
      </div>
    </div>
  );
};
