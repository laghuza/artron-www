'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { GymClient } from './PartnerData';
import { TiltSpotlightCard } from '@/components/ui/TiltSpotlightCard';

interface GymClientCardProps {
  gym: GymClient;
}

export const GymClientCard: React.FC<GymClientCardProps> = ({ gym }) => {
  const { t, locale } = useLanguage();

  const getGymSubtitle = () => {
    if (locale === 'en') return gym.subtitleEn;
    if (locale === 'ru') return gym.subtitleRu;
    return gym.subtitleKa;
  };

  return (
    <TiltSpotlightCard maxTilt={6} spotlightColor="rgba(0, 163, 255, 0.22)" className="h-full">
      <div className="bg-[#05070a]/85 border border-[#8a99ad]/10 backdrop-blur-xl rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between group hover:border-[#00A3FF]/40 transition-all duration-300 h-full min-h-[140px]">
        {/* L-Shape Corner Brackets */}
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00A3FF]/30" />
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00A3FF]/30" />
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00A3FF]/30" />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00A3FF]/30" />

        {/* Animated Top Laser Accent */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00A3FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Left Glowing Accent Indicator */}
        <div className="absolute top-0 left-0 w-[3px] h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#00A3FF]" />

        {/* Card Content */}
        <div className="flex items-center gap-3.5">
          {gym.badge}
          <div className="flex-1 min-w-0">
            <h4 className="text-base font-black text-white truncate tracking-tight mb-0.5">{gym.name}</h4>
            <p className="text-xs text-[#94A3B8] font-medium truncate">
              {getGymSubtitle()}
            </p>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
          <span className="text-[#64748B] uppercase tracking-wider">ARTRON CLIENT</span>
          <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            {t('partner_client_status')}
          </span>
        </div>
      </div>
    </TiltSpotlightCard>
  );
};

