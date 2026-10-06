'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface FooterAppBadgesProps {
  onNotify: () => void;
}

export const FooterAppBadges: React.FC<FooterAppBadgesProps> = ({ onNotify }) => {
  const { t } = useLanguage();

  const handlePulse = (e: React.PointerEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    if (!el || !el.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.animate(
      [
        { boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.12), inset 0 -2px 3px rgba(0,0,0,0.6), 0 0 0 0 rgba(0,0,0,0)' },
        { boxShadow: 'inset 0 1px 1px rgba(232,242,255,0.85), inset 0 -2px 3px rgba(0,0,0,0.6), 0 0 16px 2px rgba(147,197,253,0.5)', offset: 0.3 },
        { boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.12), inset 0 -2px 3px rgba(0,0,0,0.6), 0 0 0 0 rgba(0,0,0,0)' },
      ],
      { duration: 320, easing: 'cubic-bezier(.2,.7,.2,1)' }
    );
  };

  return (
    <section
      data-reveal="rise"
      data-order="0"
      className="relative flex flex-wrap items-center justify-between gap-3.5 md:gap-8 pb-5 md:pb-7"
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

      {/* Right: Metallic App Store & Google Play Badges with SOON chips */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* App Store Badge */}
        <button
          onClick={onNotify}
          onPointerDown={handlePulse}
          data-rim="rect"
          aria-label="App Store — SOON"
          className="group relative h-12 flex items-center gap-2.5 px-3.5 rounded-xl cursor-pointer font-inherit text-left text-white border border-transparent transition-all duration-300 active:scale-[0.98] select-none focus:outline-none focus:ring-1 focus:ring-[#93C5FD]/50"
          style={{
            background:
              'linear-gradient(135deg,transparent 42%,rgba(255,255,255,0.05) 46%,rgba(255,255,255,0.22) 50%,rgba(255,255,255,0.05) 54%,transparent 58%) 130% 0 / 300% 100% no-repeat padding-box, linear-gradient(180deg,#141B2B 0%,#0B101D 55%,#080B14 100%) padding-box, linear-gradient(180deg,rgba(255,255,255,0.55) 0%,#94A3B8 30%,rgba(148,163,184,0.25) 60%,#A87B41 90%,#D4AF37 100%) border-box',
            boxShadow:
              'inset 0 1px 1px rgba(255,255,255,0.12), inset 0 -2px 3px rgba(0,0,0,0.6), 0 12px 30px -14px rgba(0,0,0,0.9)',
          }}
        >
          <svg
            className="w-5 h-5 fill-white shrink-0 group-hover:scale-105 transition-transform"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
          </svg>
          <span className="flex flex-col leading-none">
            <span className="text-[10px] text-[#CBD5E1] tracking-wide mb-0.5">
              {t('footer_download')}
            </span>
            <span className="text-[14px] md:text-[15px] font-semibold text-white">App Store</span>
          </span>
          <span className="ml-1 font-mono text-[9px] font-semibold tracking-wider px-2 py-0.5 rounded-full text-[#6EE7B7] bg-[#10B981]/15 border border-[#10B981]/45">
            {t('footer_soon')}
          </span>
        </button>

        {/* Google Play Badge */}
        <button
          onClick={onNotify}
          onPointerDown={handlePulse}
          data-rim="rect"
          aria-label="Google Play — SOON"
          className="group relative h-12 flex items-center gap-2.5 px-3.5 rounded-xl cursor-pointer font-inherit text-left text-white border border-transparent transition-all duration-300 active:scale-[0.98] select-none focus:outline-none focus:ring-1 focus:ring-[#93C5FD]/50"
          style={{
            background:
              'linear-gradient(135deg,transparent 42%,rgba(255,255,255,0.05) 46%,rgba(255,255,255,0.22) 50%,rgba(255,255,255,0.05) 54%,transparent 58%) 130% 0 / 300% 100% no-repeat padding-box, linear-gradient(180deg,#141B2B 0%,#0B101D 55%,#080B14 100%) padding-box, linear-gradient(180deg,rgba(255,255,255,0.55) 0%,#94A3B8 30%,rgba(148,163,184,0.25) 60%,#A87B41 90%,#D4AF37 100%) border-box',
            boxShadow:
              'inset 0 1px 1px rgba(255,255,255,0.12), inset 0 -2px 3px rgba(0,0,0,0.6), 0 12px 30px -14px rgba(0,0,0,0.9)',
          }}
        >
          <svg
            className="w-4.5 h-5 shrink-0 group-hover:scale-105 transition-transform"
            viewBox="2.6 1.4 19.2 21.2"
            aria-hidden="true"
          >
            <path fill="#4285F4" d="M3.6 1.8L13.3 12 3.6 22.2c-.3-.2-.5-.6-.5-1.1V2.9c0-.5.2-.9.5-1.1z" />
            <path fill="#34A853" d="M3.6 1.8c.3-.2.8-.2 1.3.1l11.7 6.7L13.3 12z" />
            <path fill="#FBBC04" d="M16.6 8.6l3.8 2.2c.9.5.9 1.9 0 2.4l-3.8 2.2L13.3 12z" />
            <path fill="#EA4335" d="M3.6 22.2L13.3 12l3.3 3.4-11.7 6.7c-.5.3-1 .3-1.3.1z" />
          </svg>
          <span className="flex flex-col leading-none">
            <span className="text-[10px] text-[#CBD5E1] tracking-wide mb-0.5">
              {t('footer_available')}
            </span>
            <span className="text-[14px] md:text-[15px] font-semibold text-white">Google Play</span>
          </span>
          <span className="ml-1 font-mono text-[9px] font-semibold tracking-wider px-2 py-0.5 rounded-full text-[#6EE7B7] bg-[#10B981]/15 border border-[#10B981]/45">
            {t('footer_soon')}
          </span>
        </button>
      </div>

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
