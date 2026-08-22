'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Partner } from './PartnerData';
import { TiltSpotlightCard } from '@/components/ui/TiltSpotlightCard';

interface PartnerCardProps {
  partner: Partner;
  accentColor?: string;
  protocolLabel?: string;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({
  partner,
  accentColor = '#00A3FF',
  protocolLabel = 'TCP / MQTT / SOCKET',
}) => {
  const { locale } = useLanguage();

  const getPartnerDesc = () => {
    if (locale === 'en') return partner.descEn;
    if (locale === 'ru') return partner.descRu;
    return partner.descKa;
  };

  const isHardware = partner.category === 'hardware';
  const spotlight = isHardware ? 'rgba(16, 185, 129, 0.2)' : 'rgba(99, 91, 255, 0.2)';

  return (
    <TiltSpotlightCard maxTilt={6} spotlightColor={spotlight} className="h-full">
      <div
        className={`bg-[#05070a]/85 border border-[#8a99ad]/10 p-5 rounded-2xl transition-all duration-300 group flex flex-col justify-between relative overflow-hidden backdrop-blur-xl min-h-[220px] h-full ${
          isHardware
            ? 'hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]'
            : 'hover:border-[#635BFF]/50 hover:shadow-[0_0_25px_rgba(99,91,255,0.15)]'
        }`}
      >
        {/* L-Shape Corner Brackets */}
        <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${isHardware ? 'border-emerald-500/30' : 'border-[#635BFF]/30'}`} />
        <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 ${isHardware ? 'border-emerald-500/30' : 'border-[#635BFF]/30'}`} />
        <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 ${isHardware ? 'border-emerald-500/30' : 'border-[#635BFF]/30'}`} />
        <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${isHardware ? 'border-emerald-500/30' : 'border-[#635BFF]/30'}`} />

        <div
          className={`absolute top-0 left-0 w-[3px] h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            isHardware ? 'bg-emerald-400' : 'bg-[#635BFF]'
          }`}
        />

        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div
              className={`p-2.5 bg-white/5 border border-white/10 rounded-xl transition-all ${
                isHardware ? 'group-hover:border-emerald-400/30' : 'group-hover:border-[#635BFF]/30'
              }`}
            >
              {partner.icon}
            </div>
            <span
              className={`text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full border ${
                partner.statusType === 'official'
                  ? 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30'
                  : partner.statusType === 'talks'
                  ? 'text-cyan-300 bg-cyan-500/15 border-cyan-500/30'
                  : isHardware
                  ? 'text-[#00A3FF] bg-[#00A3FF]/10 border-[#00A3FF]/20'
                  : 'text-[#635BFF] bg-[#635BFF]/10 border-[#635BFF]/30'
              }`}
            >
              {partner.status}
            </span>
          </div>

          <h4 className="text-sm font-black text-white mb-1.5">{partner.name}</h4>
          <p className="text-xs text-[#94A3B8] leading-relaxed min-h-[38px]">
            {getPartnerDesc()}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#64748B]">
          <span>{isHardware ? 'PROTOCOL' : 'SECURITY'}</span>
          <span className={isHardware ? 'text-emerald-400 font-bold' : 'text-[#635BFF] font-bold'}>
            {isHardware ? protocolLabel : 'PCI-DSS / 3D SECURE'}
          </span>
        </div>
      </div>
    </TiltSpotlightCard>
  );
};

