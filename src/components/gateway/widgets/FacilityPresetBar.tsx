"use client";

import React from 'react';
import { useI18n } from '@/context/I18nContext';
import { FacilityPreset } from '@/types/gateway';
import { soundEngine } from '@/core';

interface FacilityPresetBarProps {
  activePreset: FacilityPreset;
  onSelectPreset: (preset: FacilityPreset) => void;
}

export const FacilityPresetBar: React.FC<FacilityPresetBarProps> = ({
  activePreset,
  onSelectPreset,
}) => {
  const { t } = useI18n();

  const presets: { id: FacilityPreset; labelKey: string }[] = [
    { id: 'ALL', labelKey: 'presets.all' },
    { id: 'GYM', labelKey: 'presets.gym' },
    { id: 'POOL', labelKey: 'presets.pool' },
    { id: 'STUDIO', labelKey: 'presets.studio' },
    { id: 'CLUB', labelKey: 'presets.club' },
  ];

  return (
    <div className="w-full flex flex-col gap-1.5 mb-3 animate-fadeIn select-none">
      <div className="text-[10px] font-mono text-[#94A3B8] tracking-[1.5px] uppercase flex items-center justify-between">
        <span>{t('presets.title')}</span>
        <span className="text-[#00A3FF] font-bold">{presets.find(p => p.id === activePreset)?.id}</span>
      </div>

      <div className="flex flex-wrap gap-1.5 p-1 bg-[#090D14]/90 border border-white/10 rounded-lg backdrop-blur-md">
        {presets.map((preset) => {
          const isActive = activePreset === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                soundEngine.playPulseNode();
                onSelectPreset(preset.id);
              }}
              className={`flex-1 min-w-[75px] py-1.5 px-2.5 rounded text-[11px] font-mono font-bold tracking-[0.5px] transition-all cursor-pointer text-center ${
                isActive
                  ? 'bg-[#00A3FF] text-[#05080E] shadow-[0_0_12px_rgba(0,163,255,0.4)]'
                  : 'bg-transparent text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
            >
              {t(preset.labelKey)}
            </button>
          );
        })}
      </div>

      {activePreset !== 'ALL' && (
        <p className="text-[11px] font-sans text-[#00A3FF] bg-[#00A3FF]/10 border border-[#00A3FF]/25 rounded px-2.5 py-1.5 animate-fadeIn">
          💡 {t(`presets.${activePreset.toLowerCase()}_desc`)}
        </p>
      )}
    </div>
  );
};
