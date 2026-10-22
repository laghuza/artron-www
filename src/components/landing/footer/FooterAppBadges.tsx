'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { AppStoreBadges } from '@/components/ui/AppStoreBadges';

interface FooterAppBadgesProps {
  onNotify: () => void;
}

export const FooterAppBadges: React.FC<FooterAppBadgesProps> = ({ onNotify }) => {
  const { t } = useLanguage();

  return (
    <section
      data-reveal="rise"
      data-order="0"
      className="relative flex flex-wrap items-center justify-between gap-4 md:gap-8 pb-5 md:pb-7"
    >
      {/* Left: Live Pulse Status & App Title */}
      <div className="flex items-center gap-3.5 min-w-0">
        <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981] shadow-[0_0_8px_#10B981]" />
        </span>
        <h2 className="m-0 text-base md:text-lg lg:text-[19px] leading-snug font-bold text-white tracking-tight text-balance">
          {t('footer_app_title')}
        </h2>
        <span className="shrink-0 font-mono text-[10px] tracking-[0.16em] text-[#10B981] uppercase font-semibold">
          {t('footer_app_os')}
        </span>
      </div>

      {/* Right: Unified Premium App Store & Google Play Badges */}
      <AppStoreBadges align="right" onNotify={onNotify} />

      {/* Golden metallic bottom separator */}
      <div
        data-rim="h"
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg,rgba(168,123,65,0) 0%,rgba(168,123,65,0.55) 18%,rgba(212,175,55,0.7) 50%,rgba(168,123,65,0.55) 82%,rgba(168,123,65,0) 100%)',
        }}
      />
    </section>
  );
};
