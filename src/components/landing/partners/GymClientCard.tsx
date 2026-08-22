'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Users } from 'lucide-react';
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

  const getGymDesc = () => {
    if (locale === 'en') return gym.descEn;
    if (locale === 'ru') return gym.descRu;
    return gym.descKa;
  };

  return (
    <TiltSpotlightCard maxTilt={7} spotlightColor="rgba(0, 163, 255, 0.22)" className="h-full">
      <div className="bg-[#05070a]/85 border border-[#8a99ad]/10 backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group hover:border-[#00A3FF]/40 transition-colors duration-300 h-full min-h-[300px]">
        {/* L-Shape Corner Brackets */}
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00A3FF]/30" />
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00A3FF]/30" />
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00A3FF]/30" />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00A3FF]/30" />

        {/* Animated Top Laser Accent */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00A3FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div>
          {/* Top Row: Badge + Name + Status */}
          <div className="flex items-start gap-3.5 mb-4">
            {gym.badge}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-base font-black text-white truncate">{gym.name}</h4>
                <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {t('partner_client_status')}
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] font-medium mt-0.5">
                {getGymSubtitle()}
              </p>
            </div>
          </div>

          {/* Followers & Metrics Badge */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] border border-white/5 rounded-xl mb-4 text-xs font-mono text-[#94A3B8]">
            <Users className="w-4 h-4 text-[#00A3FF]" />
            <span className="font-bold text-white">{gym.followers}</span>
            <span>{t('partner_client_metrics')}</span>
          </div>

          {/* Description */}
          <p className="text-xs text-[#94A3B8] leading-relaxed mb-4 min-h-[48px]">
            {getGymDesc()}
          </p>
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
          {gym.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white/5 text-[#E2E8F0] border border-white/10"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </TiltSpotlightCard>
  );
};

