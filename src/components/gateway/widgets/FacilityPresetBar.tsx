"use client";

import React from 'react';
import { useI18n } from '@/context/I18nContext';
import { FacilityPreset } from '@/types/gateway';
import { soundEngine } from '@/core';
import {
  Layers,
  Dumbbell,
  Waves,
  Sparkles,
  Shield,
  LucideIcon
} from 'lucide-react';

interface FacilityPresetBarProps {
  activePreset: FacilityPreset;
  onSelectPreset: (preset: FacilityPreset) => void;
  compact?: boolean;
}

interface PresetItem {
  id: FacilityPreset;
  labelKey: string;
  icon: LucideIcon;
}

export const FacilityPresetBar: React.FC<FacilityPresetBarProps> = ({
  activePreset,
  onSelectPreset,
  compact = false,
}) => {
  const { t } = useI18n();

  const presets: PresetItem[] = [
    { id: 'ALL', labelKey: 'presets.all', icon: Layers },
    { id: 'GYM', labelKey: 'presets.gym', icon: Dumbbell },
    { id: 'POOL', labelKey: 'presets.pool', icon: Waves },
    { id: 'STUDIO', labelKey: 'presets.studio', icon: Sparkles },
    { id: 'CLUB', labelKey: 'presets.club', icon: Shield },
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-1 p-1 bg-[#070A11]/90 border border-white/[0.08] rounded-xl backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] select-none">
        <div className="hidden xl:flex items-center px-2.5 font-mono text-[9px] font-semibold text-[#64748B] tracking-[0.14em] uppercase border-r border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse mr-2 shadow-[0_0_8px_#00A3FF]" />
          <span>{t('presets.title')}</span>
        </div>
        <div className="flex items-center gap-1">
          {presets.map((preset) => {
            const isActive = activePreset === preset.id;
            const Icon = preset.icon;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  soundEngine.playPulseNode();
                  onSelectPreset(preset.id);
                }}
                className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-[11px] font-sans font-medium transition-all duration-200 cursor-pointer text-center whitespace-nowrap ${
                  isActive
                    ? 'bg-[#00A3FF]/15 text-[#38BDF8] border border-[#00A3FF]/40 shadow-[0_0_16px_rgba(0,163,255,0.22)]'
                    : 'bg-transparent text-[#94A3B8] border border-transparent hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 transition-colors duration-200 ${
                    isActive ? 'text-[#00A3FF]' : 'text-[#64748B] group-hover:text-white'
                  }`}
                  strokeWidth={1.8}
                />
                <span>{t(preset.labelKey)}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2 mb-3 animate-fadeIn select-none">
      <div className="text-[10px] font-mono text-[#94A3B8] tracking-[0.14em] uppercase flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse shadow-[0_0_8px_#00A3FF]" />
          {t('presets.title')}
        </span>
        <span className="text-[#00A3FF] font-mono font-bold text-[10px] bg-[#00A3FF]/10 border border-[#00A3FF]/20 px-2 py-0.5 rounded">
          {presets.find((p) => p.id === activePreset)?.id}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 p-1.5 bg-[#070A11]/90 border border-white/[0.08] rounded-xl backdrop-blur-xl">
        {presets.map((preset) => {
          const isActive = activePreset === preset.id;
          const Icon = preset.icon;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                soundEngine.playPulseNode();
                onSelectPreset(preset.id);
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-[11px] font-sans font-medium transition-all duration-200 cursor-pointer text-center ${
                isActive
                  ? 'bg-[#00A3FF]/15 text-[#38BDF8] border border-[#00A3FF]/40 shadow-[0_0_14px_rgba(0,163,255,0.2)]'
                  : 'bg-transparent text-[#94A3B8] border border-transparent hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${
                  isActive ? 'text-[#00A3FF]' : 'text-[#64748B]'
                }`}
                strokeWidth={1.8}
              />
              <span className="truncate">{t(preset.labelKey)}</span>
            </button>
          );
        })}
      </div>

      {activePreset !== 'ALL' && (
        <div className="text-[11px] font-sans text-[#38BDF8] bg-[#00A3FF]/[0.06] border border-[#00A3FF]/20 rounded-lg px-3 py-2 animate-fadeIn flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#00A3FF] shrink-0 mt-0.5" strokeWidth={1.8} />
          <p className="leading-relaxed">{t(`presets.${activePreset.toLowerCase()}_desc`)}</p>
        </div>
      )}
    </div>
  );
};

