'use client';

import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ps5Audio } from '../../core/ps5SoundEngine';
import { DoorOpen, Users, UserCheck, Shield, Activity } from 'lucide-react';

interface Step2ScaleTelemetryViewProps {
  turnstilesCount: number;
  setTurnstilesCount: (val: number) => void;
  isAntiPassbackEnabled: boolean;
  setIsAntiPassbackEnabled: (val: boolean) => void;
  membersCapacity: number;
  setMembersCapacity: (val: number) => void;
  trainersCount: number;
  setTrainersCount: (val: number) => void;
  branchesCount: string;
  setBranchesCount: (val: string) => void;
  onNext?: () => void;
  onBack?: () => void;
}

export const Step2ScaleTelemetryView: React.FC<Step2ScaleTelemetryViewProps> = ({
  turnstilesCount,
  setTurnstilesCount,
  isAntiPassbackEnabled,
  setIsAntiPassbackEnabled,
  membersCapacity,
  setMembersCapacity,
  trainersCount,
  setTrainersCount,
  branchesCount,
  setBranchesCount,
}) => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const branchesOptions = useMemo(() => [
    { id: '1', label: t('ps5_onboarding.branch_1') },
    { id: '2-3', label: t('ps5_onboarding.branch_2_3') },
    { id: '4+', label: t('ps5_onboarding.branch_4_plus') },
  ], [t]);

  // Telemetry estimations
  const estimatedPeakHourlyEntries = Math.round(membersCapacity * 0.28);
  const realTimeSockets = turnstilesCount * 2 + Math.max(2, Math.round(trainersCount / 2));
  const estimatedSyncLatency = turnstilesCount > 6 ? '< 18ms' : '< 12ms';

  const handleTurnstileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ps5Audio.playNavigate();
    setTurnstilesCount(parseInt(e.target.value, 10));
  };

  const handleMembersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMembersCapacity(parseInt(e.target.value, 10));
  };

  const handleTrainersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrainersCount(parseInt(e.target.value, 10));
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none" data-testid="step2-scale-telemetry">
      {/* Step Header */}
      <div className="space-y-1.5 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
            {t('ps5_onboarding.step2_badge')}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {t('ps5_onboarding.step2_title')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          {t('ps5_onboarding.step2_desc')}
        </p>
      </div>

      <div className="space-y-6">
        {/* Branch Selection Pills */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
            {t('ps5_onboarding.step2_branches_label')} <span className="text-[#00E5FF]">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {branchesOptions.map((b) => {
              const isSelected = branchesCount === b.label || branchesCount === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    ps5Audio.playNavigate();
                    setBranchesCount(b.label);
                  }}
                  className={`py-3 px-3 rounded-2xl border text-center text-xs font-bold font-mono transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#00A3FF] to-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,163,255,0.4)] ring-2 ring-[#00E5FF]/50'
                      : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  {b.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. Turnstiles / Gates Slider & Anti-passback Toggle */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0E1424]/80 border border-white/[0.1] space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#00A3FF]/20 text-[#00E5FF] flex items-center justify-center">
                <DoorOpen className="w-4 h-4" />
              </div>
              <div>
                <label className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  {t('ps5_onboarding.step2_turnstiles_label')}
                </label>
                <div className="text-[10px] text-slate-400">
                  TCP/MQTT • {t('ps5_onboarding.step5_init_stage2')}
                </div>
              </div>
            </div>
            <span className="text-base font-mono font-black text-[#00E5FF] px-3 py-1 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30">
              {turnstilesCount} {t('ps5_onboarding.step2_turnstiles_unit')}
            </span>
          </div>

          {/* Range Slider */}
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={turnstilesCount}
            onChange={handleTurnstileChange}
            className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-[#00E5FF]"
          />

          {/* Anti-Passback Cyber Toggle */}
          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] text-slate-300 font-medium">
                {t('ps5_onboarding.step2_anti_passback_label')}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                ps5Audio.playNavigate();
                setIsAntiPassbackEnabled(!isAntiPassbackEnabled);
              }}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                isAntiPassbackEnabled ? 'bg-[#00E5FF]' : 'bg-white/10'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-black absolute top-1 transition-transform ${
                  isAntiPassbackEnabled ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 2. Active Members Capacity Slider */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0E1424]/80 border border-white/[0.1] space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#0055FF]/20 text-[#00A3FF] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <label className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  {t('ps5_onboarding.step2_capacity_label')}
                </label>
                <div className="text-[10px] text-slate-400">
                  {t('ps5_onboarding.facility_gym_tagline')}
                </div>
              </div>
            </div>
            <span className="text-base font-mono font-black text-white px-3 py-1 rounded-xl bg-white/[0.06] border border-white/[0.15]">
              {membersCapacity.toLocaleString()} {t('ps5_onboarding.step2_capacity_unit')}
            </span>
          </div>

          <input
            type="range"
            min={100}
            max={5000}
            step={100}
            value={membersCapacity}
            onChange={handleMembersChange}
            className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-[#00A3FF]"
          />
        </div>

        {/* 3. Trainers Roster Slider with Order №01-15/ნ Badge */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0E1424]/80 border border-white/[0.1] space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <label className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  {t('ps5_onboarding.step2_trainers_label')}
                </label>
                <div className="text-[10px] text-slate-400">
                  {t('labor_law_badge') || '№01-15/ნ COMPLIANT'}
                </div>
              </div>
            </div>
            <span className="text-base font-mono font-black text-purple-300 px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/30">
              {trainersCount} {t('ps5_onboarding.step2_trainers_unit')}
            </span>
          </div>

          <input
            type="range"
            min={1}
            max={50}
            step={1}
            value={trainersCount}
            onChange={handleTrainersChange}
            className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-purple-400"
          />
        </div>

        {/* Real-Time Live Telemetry HUD Bar */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#00A3FF]/10 via-[#0055FF]/10 to-[#00E5FF]/10 border border-[#00A3FF]/30 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-2 text-[10.5px] font-mono font-bold text-[#00E5FF] uppercase">
            <Activity className="w-3.5 h-3.5 animate-pulse text-[#00E5FF]" />
            <span>{t('ps5_onboarding.telemetry_card_title')}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center font-mono">
            <div className="p-2 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="text-[9.5px] text-slate-400">{t('ps5_onboarding.telemetry_sockets_label')}</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{realTimeSockets} {t('ps5_onboarding.telemetry_sockets_unit')}</div>
            </div>
            <div className="p-2 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="text-[9.5px] text-slate-400">{t('ps5_onboarding.telemetry_peak_label')}</div>
              <div className="text-xs sm:text-sm font-bold text-[#00E5FF] mt-0.5">~{estimatedPeakHourlyEntries} {t('ps5_onboarding.telemetry_peak_unit')}</div>
            </div>
            <div className="p-2 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="text-[9.5px] text-slate-400">{t('ps5_onboarding.telemetry_latency_label')}</div>
              <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">{estimatedSyncLatency}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
