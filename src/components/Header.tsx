'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ArtronLogo from '@/components/ui/ArtronLogo';
import { audioManager } from '@/lib/audioManager';

interface HeaderProps {
  isSticky?: boolean;
  showBackToHome?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  isSticky = false,
  showBackToHome = false,
}) => {
  const { locale, setLocale, t } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header
      className={
        isSticky
          ? "sticky top-4 z-40 w-full max-w-6xl mx-auto px-4 sm:px-6 py-2 rounded-2xl border border-white/10 bg-[#0B0F17]/80 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(0,163,255,0.08)] transition-all duration-300"
          : "relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-3 rounded-2xl border border-white/10 bg-[#0B0F17]/60 backdrop-blur-lg z-20 shadow-[0_8px_32px_0_rgba(0,163,255,0.06)]"
      }
    >
      <div className="w-full flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/30 rounded-xl p-1 transition-all duration-300"
          aria-label="Artron Home"
        >
          {/* Glowing Vector Logo */}
          <ArtronLogo className="w-8 h-8 md:w-9 md:h-9 transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_0_8px_rgba(0,163,255,0.4)] shrink-0" />
          
          <div className="block">
            <span className="text-sm sm:text-base font-black tracking-wider leading-none flex items-center gap-1.5 text-white">
              {t('logo_text')}
              <span className="text-[8px] font-mono uppercase font-bold text-[#00A3FF] tracking-wider px-1.5 py-0.5 rounded bg-[#00A3FF]/10 border border-[#00A3FF]/20">[ SAAS ]</span>
            </span>
            <p className="text-[8px] sm:text-[9px] text-[#94A3B8] mt-0.5 font-medium tracking-wide uppercase">{t('logo_sub')}</p>
          </div>
        </Link>

        {/* Center Nav Links - hidden on mobile, visible on lg */}
        {!showBackToHome && (
          <nav className={`hidden lg:flex items-center ${locale === 'ka' ? 'gap-0.5' : 'gap-1'} bg-[#111827]/40 border border-white/5 rounded-full p-1 backdrop-blur-md`}>
            <Link
              href="/#services"
              className={`text-xs font-semibold text-[#94A3B8] hover:text-white transition-all ${locale === 'ka' ? 'px-2 py-1' : 'px-3 py-1.5'} rounded-full hover:bg-white/5 relative group`}
            >
              {t('nav_ecosystem')}
              <span className={`absolute bottom-0.5 ${locale === 'ka' ? 'left-2 right-2' : 'left-3 right-3'} h-0.5 bg-[#00A3FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full`} />
            </Link>
            <Link
              href="/#roi"
              className={`text-xs font-semibold text-[#94A3B8] hover:text-white transition-all ${locale === 'ka' ? 'px-2 py-1' : 'px-3 py-1.5'} rounded-full hover:bg-white/5 relative group`}
            >
              {t('nav_roi')}
              <span className={`absolute bottom-0.5 ${locale === 'ka' ? 'left-2 right-2' : 'left-3 right-3'} h-0.5 bg-[#00A3FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full`} />
            </Link>
            <Link
              href="/#partner-ecosystem"
              className={`text-xs font-semibold text-[#94A3B8] hover:text-white transition-all ${locale === 'ka' ? 'px-2 py-1' : 'px-3 py-1.5'} rounded-full hover:bg-white/5 relative group`}
            >
              {t('nav_partners')}
              <span className={`absolute bottom-0.5 ${locale === 'ka' ? 'left-2 right-2' : 'left-3 right-3'} h-0.5 bg-[#00A3FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full`} />
            </Link>
            <Link
              href="/#booking-engine"
              className={`text-xs font-semibold text-[#94A3B8] hover:text-white transition-all ${locale === 'ka' ? 'px-2 py-1' : 'px-3 py-1.5'} rounded-full hover:bg-white/5 relative group`}
            >
              {t('nav_booking')}
              <span className={`absolute bottom-0.5 ${locale === 'ka' ? 'left-2 right-2' : 'left-3 right-3'} h-0.5 bg-[#00A3FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full`} />
            </Link>
            <Link
              href="/#faq"
              className={`text-xs font-semibold text-[#94A3B8] hover:text-white transition-all ${locale === 'ka' ? 'px-2 py-1' : 'px-3 py-1.5'} rounded-full hover:bg-white/5 relative group`}
            >
              {t('nav_faq')}
              <span className={`absolute bottom-0.5 ${locale === 'ka' ? 'left-2 right-2' : 'left-3 right-3'} h-0.5 bg-[#00A3FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full`} />
            </Link>
          </nav>
        )}

        {/* Dynamic Locale Selector & Nav Links */}
        <div className={`flex items-center ${locale === 'ka' ? 'gap-2 md:gap-3.5' : 'gap-3 md:gap-5'}`}>
          {showBackToHome ? (
            <Link
              href="/"
              className="text-xs sm:text-sm font-semibold text-[#94A3B8] hover:text-[#00A3FF] transition-all py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#00A3FF] rounded-lg hidden md:block"
            >
              {t('legal_back_to_home').replace('← ', '')}
            </Link>
          ) : (
            <>
              <Link
                href="/about"
                className={`text-xs ${locale === 'ka' ? 'sm:text-[11px] md:text-xs px-2' : 'sm:text-sm px-3'} font-semibold text-[#94A3B8] hover:text-white transition-all py-2 focus:outline-none focus:ring-1 focus:ring-[#00A3FF] rounded-lg whitespace-nowrap`}
                style={{ minHeight: '40px', display: 'flex', alignItems: 'center' }}
              >
                {t('about_title')}
              </Link>
              <Link
                href="/sports-os"
                className={`text-xs ${locale === 'ka' ? 'sm:text-[11px] md:text-xs px-2.5 md:px-3.5' : 'sm:text-sm px-3 md:px-4'} font-bold text-[#00A3FF] hover:text-slate-950 hover:bg-[#00A3FF] hover:shadow-[0_0_15px_rgba(0,163,255,0.4)] transition-all duration-300 py-1.5 md:py-2 focus:outline-none focus:ring-1 focus:ring-[#00A3FF] border border-[#00A3FF]/30 hover:border-[#00A3FF] rounded-xl bg-[#00A3FF]/5 font-mono tracking-wider uppercase whitespace-nowrap`}
                style={{ minHeight: '40px', display: 'flex', alignItems: 'center' }}
              >
                {locale === 'ka' ? '[ სისტემური წვდომა ]' : locale === 'ru' ? '[ ВХОД В СИСТЕМУ ]' : '[ SYSTEM ACCESS ]'}
              </Link>
            </>
          )}

          {/* Minimalist Live Heartbeat Indicator */}
          <div className="hidden xl:flex items-center gap-2 text-[9px] font-mono text-[#00E676]/90 bg-[#00E676]/5 border border-[#00E676]/15 rounded-full px-3 py-1 font-bold tracking-wider select-none uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00E676]" />
            </span>
            <span>SYS: ONLINE</span>
          </div>

          {/* Language Switcher Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                audioManager.playClick();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="flex items-center gap-1.5 bg-[#111827]/60 hover:bg-[#1f293d]/80 border border-white/5 hover:border-white/10 rounded-xl px-2.5 py-1.5 backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#00A3FF]/45 cursor-pointer select-none group"
              style={{ minHeight: '40px' }}
              aria-label="Select language"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <Globe className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-white transition-colors" />
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#00A3FF] drop-shadow-[0_0_8px_rgba(0,163,255,0.5)]">
                {locale}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#94A3B8] transition-transform duration-300 group-hover:text-white ${isDropdownOpen ? 'rotate-180 text-white' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 rounded-xl border border-white/10 bg-[#0B0F17]/95 p-1 backdrop-blur-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5),0_0_15px_rgba(0,163,255,0.1)] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {(['ka', 'en', 'ru'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      audioManager.playClick();
                      setLocale(lang);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      locale === lang
                        ? 'bg-[#00A3FF]/10 text-[#00A3FF]'
                        : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{lang === 'ka' ? 'KA' : lang === 'en' ? 'EN' : 'RU'}</span>
                    {locale === lang && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] shadow-[0_0_6px_#00A3FF]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
