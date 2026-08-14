'use client';

import React from 'react';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ArtronLogo from '@/components/ui/ArtronLogo';

interface HeaderProps {
  isSticky?: boolean;
  showBackToHome?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  isSticky = false,
  showBackToHome = false,
}) => {
  const { locale, setLocale, t } = useLanguage();

  return (
    <header
      className={
        isSticky
          ? "sticky top-0 z-40 w-full border-b border-white/10 bg-[#0B0F17]/90 backdrop-blur-md transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "relative w-full max-w-7xl mx-auto flex items-center justify-between py-4 border-b border-white/5 z-20"
      }
    >
      <div
        className={
          isSticky
            ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 w-full flex items-center justify-between"
            : "w-full flex items-center justify-between px-4 sm:px-6 lg:px-8"
        }
      >
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#00E676]/30 rounded-xl p-1 transition-all duration-300"
          aria-label="Artron Home"
        >
          {/* Glowing Vector Logo */}
          <ArtronLogo className="w-8 h-8 md:w-9 md:h-9 transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_0_8px_rgba(0,230,118,0.4)] shrink-0" />
          
          <div className="block">
            <span className="text-sm sm:text-base font-black tracking-wider leading-none flex items-center gap-1.5 text-white">
              {t('logo_text')}
              <span className="text-[8px] font-mono uppercase font-bold text-[#00E676] tracking-wider px-1.5 py-0.5 rounded bg-[#00E676]/10 border border-[#00E676]/20">[ SAAS ]</span>
            </span>
            <p className="text-[8px] sm:text-[9px] text-[#94A3B8] mt-0.5 font-medium tracking-wide uppercase">{t('logo_sub')}</p>
          </div>
        </Link>

        {/* Dynamic Locale Selector & Nav Links */}
        <div className="flex items-center gap-3 md:gap-5">
          {showBackToHome ? (
            <Link
              href="/"
              className="text-xs sm:text-sm font-semibold text-[#94A3B8] hover:text-[#00E676] transition-all py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#00E676] rounded-lg hidden md:block"
            >
              {t('legal_back_to_home').replace('← ', '')}
            </Link>
          ) : (
            <>
              <Link
                href="/about"
                className="text-xs sm:text-sm font-semibold text-[#94A3B8] hover:text-white hover:underline decoration-[#00E676] decoration-2 underline-offset-4 transition-all py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#00E676] rounded-lg"
                style={{ minHeight: '40px', display: 'flex', alignItems: 'center' }}
              >
                {t('about_title')}
              </Link>
              <Link
                href="/sports-os"
                className="text-xs sm:text-sm font-bold text-[#00E676] hover:text-white hover:bg-[#00E676] hover:shadow-[0_0_15px_rgba(0,230,118,0.4)] transition-all duration-300 py-1.5 md:py-2 px-3 md:px-4 focus:outline-none focus:ring-1 focus:ring-[#00E676] border border-[#00E676]/30 hover:border-[#00E676] rounded-xl bg-[#00E676]/5 font-mono tracking-wider uppercase"
                style={{ minHeight: '40px', display: 'flex', alignItems: 'center' }}
              >
                {locale === 'ka' ? '[ სისტემური წვდომა ]' : locale === 'ru' ? '[ ВХОД В СИСТЕМУ ]' : '[ SYSTEM ACCESS ]'}
              </Link>
            </>
          )}

          {/* Minimalist Live Heartbeat Indicator */}
          <div className="hidden lg:flex items-center gap-2 text-[9px] font-mono text-[#00E676]/90 bg-[#00E676]/5 border border-[#00E676]/15 rounded-full px-3 py-1 font-bold tracking-wider select-none uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00E676]" />
            </span>
            <span>SYS: ONLINE</span>
          </div>

          {/* Language Switcher Capsule */}
          <div className="flex items-center gap-0.5 bg-[#111827]/60 border border-white/5 rounded-xl p-0.5 backdrop-blur-md">
            <Globe className="w-3.5 h-3.5 text-[#94A3B8] ml-2 mr-1 hidden sm:block" />
            <div className="flex gap-0.5">
              {(['ka', 'en', 'ru'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLocale(lang)}
                  className="text-[10px] sm:text-xs font-bold py-1.5 px-2 md:px-3 rounded-lg uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#00E676]/45 cursor-pointer flex items-center justify-center min-w-[36px]"
                  style={{ minHeight: '36px' }}
                  aria-label={`Switch to ${lang}`}
                >
                  <span className={locale === lang ? 'text-[#00E676] font-black drop-shadow-[0_0_8px_rgba(0,230,118,0.5)]' : 'text-[#94A3B8] font-normal hover:text-white'}>
                    {lang}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
