"use client";

import React from 'react';
import { useI18n } from '@/context/I18nContext';

export const LegacyVsArtronComparison: React.FC = () => {
  const { t } = useI18n();

  const metrics = [
    {
      titleKey: 'comparison.checkin_title',
      legacyNote: 'Excel / ქაღალდი: 3-4 წთ რიგები',
      legacyNoteEn: 'Excel / Paper: 3-4 min queues',
      legacyNoteRu: 'Excel / бумага: 3-4 мин очереди',
      artronKey: 'comparison.checkin_artron',
      icon: '⚡',
      accent: 'cyan',
    },
    {
      titleKey: 'comparison.leakage_title',
      legacyNote: 'ძველი მეთოდი: 10-15% გაპარვა',
      legacyNoteEn: 'Legacy: 10-15% unpaid entries',
      legacyNoteRu: 'Старый метод: 10-15% неоплачено',
      artronKey: 'comparison.leakage_artron',
      icon: '🛡️',
      accent: 'emerald',
    },
    {
      titleKey: 'comparison.labor_title',
      legacyNote: 'ხელით: 40 სთ/თვეში წერა',
      legacyNoteEn: 'Manual: 40 hrs/mo paperwork',
      legacyNoteRu: 'Вручную: 40 ч/мес писанина',
      artronKey: 'comparison.labor_artron',
      icon: '📊',
      accent: 'cyan',
    },
    {
      titleKey: 'comparison.winback_title',
      legacyNote: 'ძველი მეთოდი: 0% დაბრუნება',
      legacyNoteEn: 'Legacy: 0% recovery rate',
      legacyNoteRu: 'Старый метод: 0% возврат',
      artronKey: 'comparison.winback_artron',
      icon: '🔄',
      accent: 'emerald',
    },
  ];

  return (
    <div className="w-full bg-[#0d121c]/85 border border-white/10 hover:border-[#00A3FF]/30 transition-all duration-300 rounded-xl p-4.5 space-y-3 backdrop-blur-md animate-fadeIn select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <h4 className="text-[11px] font-mono font-bold text-white uppercase tracking-[1.5px] flex items-center gap-2">
          <span className="text-[#00A3FF]">⚡</span> {t('comparison.title')}
        </h4>
        <span className="text-[10px] font-mono font-semibold text-[#00A3FF] bg-[#00A3FF]/10 px-2 py-0.5 rounded border border-[#00A3FF]/30 shadow-[0_0_10px_rgba(0,163,255,0.15)]">
          ROI +300%
        </span>
      </div>

      <div className="space-y-2">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="bg-[#080b11] border border-white/5 hover:border-[#00A3FF]/20 rounded-lg p-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 transition-colors"
          >
            <div className="flex flex-col">
              <span className="text-white text-[12px] font-sans font-medium leading-tight">
                {t(m.titleKey)}
              </span>
              <span className="text-[10px] font-mono text-[#64748B] mt-0.5">
                {t('common.lang_ge') === 'GE' ? m.legacyNote : m.legacyNoteEn}
              </span>
            </div>

            <div className="w-full sm:w-auto flex justify-end">
              <span
                className={`text-[11px] font-mono font-bold px-2.5 py-0.8 rounded border flex items-center gap-1.5 ${
                  m.accent === 'emerald'
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                    : 'text-[#00A3FF] bg-[#00A3FF]/10 border-[#00A3FF]/30 shadow-[0_0_8px_rgba(0,163,255,0.2)]'
                }`}
              >
                <span>{m.icon}</span>
                <span>{t(m.artronKey)}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
