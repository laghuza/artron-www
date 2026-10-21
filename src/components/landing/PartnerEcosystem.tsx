'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ArtronEnneaEcosystem } from './ecosystem/ArtronEnneaEcosystem';

export const PartnerEcosystem: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="partner-ecosystem" className="pt-6 pb-12 sm:pt-8 sm:pb-16 md:pt-10 md:pb-20 relative overflow-hidden bg-[#0B0F17] border-b border-white/5 studio-grain">
      {/* Glowing atmospheric orbs */}
      <div className="absolute top-1/4 left-1/5 -translate-y-1/2 w-[450px] h-[450px] bg-[#00A3FF]/6 rounded-full blur-[120px] pointer-events-none [transform:translate3d(0,0,0)]" />
      <div className="absolute bottom-1/4 right-1/5 -translate-y-1/2 w-[450px] h-[450px] bg-[#00ff87]/6 rounded-full blur-[120px] pointer-events-none [transform:translate3d(0,0,0)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Unified Clean Compact Header */}
        <div className="text-center max-w-4xl mx-auto mb-5 sm:mb-7">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-extrabold tracking-tight leading-snug">
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              {t('partner_title')}
            </span>
          </h2>
          <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm md:text-base text-[#94A3B8] font-normal leading-relaxed max-w-2xl mx-auto">
            {t('partner_subtitle')}
          </p>
        </div>

        {/* 3D Dynamic Ecosystem: Globe + Live Georgia Map + Shuffled Clients + FinTech Partners */}
        <ArtronEnneaEcosystem />
      </div>
    </section>
  );
};
