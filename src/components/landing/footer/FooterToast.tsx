'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface FooterToastProps {
  show: boolean;
}

export const FooterToast: React.FC<FooterToastProps> = ({ show }) => {
  const { t } = useLanguage();

  if (!show) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed left-1/2 bottom-6 -translate-x-1/2 z-[60] w-[min(540px,calc(100vw-32px))] flex gap-3.5 items-start p-3.5 md:p-4 rounded-2xl border border-transparent shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] animate-fade-in"
      style={{
        background:
          'linear-gradient(180deg,#141B2B,#080B14) padding-box, linear-gradient(180deg,rgba(255,255,255,0.4),rgba(148,163,184,0.15) 50%,rgba(168,123,65,0.45)) border-box',
      }}
    >
      <span
        className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_10px_#10B981]"
        aria-hidden="true"
      />
      <div className="flex flex-col gap-1 text-left">
        <div className="font-mono text-[10.5px] tracking-wider text-[#6EE7B7] font-bold">
          {t('footer_toast_tag')}
        </div>
        <div className="text-xs md:text-sm leading-relaxed text-white text-pretty">
          {t('footer_toast_msg')}
        </div>
      </div>
    </div>
  );
};
