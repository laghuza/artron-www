'use client';

import React, { useMemo } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ps5Audio } from '../../core/ps5SoundEngine';
import { Dumbbell, Waves, Sparkles, Building2, LucideIcon, CheckCircle2 } from 'lucide-react';

export interface FacilityTypeMatrixItem {
  id: string;
  key: string;
  label: string;
  sub: string;
  tagline: string;
  icon: LucideIcon;
  badge: string;
  highlights: string[];
}

interface Step1FacilityTypeMatrixProps {
  selectedFacility: string;
  onSelectFacility: (facility: FacilityTypeMatrixItem) => void;
  onNext: () => void;
  onCancel?: () => void;
}

export const Step1FacilityTypeMatrix: React.FC<Step1FacilityTypeMatrixProps> = ({
  selectedFacility,
  onSelectFacility,
  onNext,
  onCancel,
}) => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const facilityOptions: FacilityTypeMatrixItem[] = useMemo(() => [
    {
      id: 'gym',
      key: '1',
      label: t('ps5_onboarding.facility_gym_label'),
      sub: t('ps5_onboarding.facility_gym_sub'),
      tagline: t('ps5_onboarding.facility_gym_tagline'),
      icon: Dumbbell,
      badge: t('ps5_onboarding.facility_gym_badge'),
      highlights: [
        t('ps5_onboarding.facility_gym_hl1'),
        t('ps5_onboarding.facility_gym_hl2'),
        t('ps5_onboarding.facility_gym_hl3'),
      ],
    },
    {
      id: 'pool',
      key: '2',
      label: t('ps5_onboarding.facility_pool_label'),
      sub: t('ps5_onboarding.facility_pool_sub'),
      tagline: t('ps5_onboarding.facility_pool_tagline'),
      icon: Waves,
      badge: t('ps5_onboarding.facility_pool_badge'),
      highlights: [
        t('ps5_onboarding.facility_pool_hl1'),
        t('ps5_onboarding.facility_pool_hl2'),
        t('ps5_onboarding.facility_pool_hl3'),
      ],
    },
    {
      id: 'studio',
      key: '3',
      label: t('ps5_onboarding.facility_studio_label'),
      sub: t('ps5_onboarding.facility_studio_sub'),
      tagline: t('ps5_onboarding.facility_studio_tagline'),
      icon: Sparkles,
      badge: t('ps5_onboarding.facility_studio_badge'),
      highlights: [
        t('ps5_onboarding.facility_studio_hl1'),
        t('ps5_onboarding.facility_studio_hl2'),
        t('ps5_onboarding.facility_studio_hl3'),
      ],
    },
    {
      id: 'federation',
      key: '4',
      label: t('ps5_onboarding.facility_federation_label'),
      sub: t('ps5_onboarding.facility_federation_sub'),
      tagline: t('ps5_onboarding.facility_federation_tagline'),
      icon: Building2,
      badge: t('ps5_onboarding.facility_federation_badge'),
      highlights: [
        t('ps5_onboarding.facility_federation_hl1'),
        t('ps5_onboarding.facility_federation_hl2'),
        t('ps5_onboarding.facility_federation_hl3'),
      ],
    },
  ], [t]);

  const handleSelect = (item: FacilityTypeMatrixItem) => {
    ps5Audio.playSelect();
    onSelectFacility(item);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
        delayChildren: 0.02,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
      scale: shouldReduceMotion ? 1 : 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 220,
        damping: 22,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex flex-col gap-6 select-none"
    >
      {/* Step Header */}
      <div className="space-y-1.5 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
            {t('ps5_onboarding.step1_badge')}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {t('ps5_onboarding.step1_title')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300">
          {t('ps5_onboarding.step1_desc')}
        </p>
      </div>

      {/* 4 Massive 3D Futuristic Choice Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {facilityOptions.map((item) => {
          const isSelected = selectedFacility === item.id || selectedFacility === item.label;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              type="button"
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.015 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              onClick={() => handleSelect(item)}
              className={`p-4 sm:p-5 rounded-3xl border text-left transition-all duration-300 flex flex-col justify-between gap-4 group relative cursor-pointer overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-br from-[#00A3FF]/25 via-[#0055FF]/15 to-[#090E1B]/90 border-[#00E5FF] shadow-[0_0_30px_rgba(0,163,255,0.35)] ring-1 ring-[#00E5FF]'
                  : 'bg-[#0E1424]/70 border-white/[0.08] hover:bg-[#121A2E]/80 hover:border-white/[0.2] hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]'
              }`}
            >
              {/* Active Holographic Laser Flare */}
              {isSelected && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/10 rounded-full blur-2xl pointer-events-none" />
              )}

              {/* Card Top Header: Icon + Badge + Check */}
              <div className="flex items-start justify-between">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#00E5FF] to-[#0066FF] text-black shadow-[0_0_15px_#00E5FF]'
                      : 'bg-white/[0.06] text-slate-300 group-hover:text-white group-hover:bg-white/[0.1]'
                  }`}
                >
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[9.5px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full uppercase border ${
                      isSelected
                        ? 'bg-[#00E5FF]/20 text-[#00E5FF] border-[#00E5FF]/40'
                        : 'bg-white/[0.04] text-slate-400 border-white/10'
                    }`}
                  >
                    {item.badge}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-[#00E5FF] shrink-0 fill-[#00E5FF]/20" />
                  )}
                </div>
              </div>

              {/* Card Titles & Tagline */}
              <div className="space-y-1">
                <div
                  className={`text-base font-bold tracking-tight transition-colors ${
                    isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                  }`}
                >
                  {item.label}
                </div>
                <div className="text-[11px] font-mono text-[#00E5FF]/80">
                  {item.sub}
                </div>
                <p className="text-xs text-slate-300/90 leading-relaxed pt-1">
                  {item.tagline}
                </p>
              </div>

              {/* Highlights Micro-Pills */}
              <div className="pt-2 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                {item.highlights.map((h, i) => (
                  <span
                    key={i}
                    className={`text-[9.5px] font-medium px-2 py-0.5 rounded-md transition-colors ${
                      isSelected
                        ? 'bg-[#00A3FF]/15 text-slate-200 border border-[#00A3FF]/30'
                        : 'bg-white/[0.03] text-slate-400 border border-white/[0.05]'
                    }`}
                  >
                    • {h}
                  </span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};
