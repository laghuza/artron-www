"use client";

import React from 'react';
import { useI18n } from '@/context/I18nContext';

export const DataMigrationBanner: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="w-full bg-[#0d121c]/85 border border-[#00A3FF]/25 hover:border-[#00A3FF]/50 transition-all duration-300 rounded-xl p-3.5 backdrop-blur-md animate-fadeIn select-none shadow-[0_0_20px_rgba(0,163,255,0.06)]">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#00A3FF]/10 border border-[#00A3FF]/30 flex items-center justify-center shrink-0">
          <span className="text-[#00A3FF] text-[14px]">🔒</span>
        </div>
        <div>
          <h4 className="text-[11px] font-mono font-bold text-[#00A3FF] uppercase tracking-[1.2px]">
            {t('migration.badge')}
          </h4>
          <p className="text-[11px] font-sans text-slate-300 leading-relaxed mt-0.5">
            {t('migration.desc')}
          </p>
        </div>
      </div>
    </div>
  );
};

