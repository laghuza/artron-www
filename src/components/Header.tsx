'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Globe, ChevronDown, Menu, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const navLinks = [
    { href: '/#services', label: t('nav_ecosystem') },
    { href: '/#roi', label: t('nav_roi') },
    { href: '/#pricing', label: t('nav_pricing') },
    { href: '/#partner-ecosystem', label: t('nav_partners') },
    { href: '/#faq', label: t('nav_faq') },
    { href: '/#booking-engine', label: t('nav_booking') },
    { href: '/about', label: t('about_title') },
  ];

  return (
    <header
      className={
        isSticky
          ? "sticky top-3 z-40 w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-2 rounded-2xl border border-white/10 bg-[#0B0F17]/90 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,163,255,0.08)] transition-all duration-300"
          : "relative w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-2.5 rounded-2xl border border-white/10 bg-[#0B0F17]/75 backdrop-blur-xl z-20 shadow-[0_8px_32px_0_rgba(0,163,255,0.06)]"
      }
    >
      <div className="w-full flex items-center justify-between gap-2 lg:gap-3">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/30 rounded-xl p-1 transition-all duration-300 shrink-0"
          aria-label="Artron Home"
        >
          <ArtronLogo className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_0_8px_rgba(0,163,255,0.4)] shrink-0" />
          
          <div className="block">
            <span className="text-xs sm:text-sm font-black tracking-wider leading-none flex items-center gap-1.5 text-white whitespace-nowrap">
              {t('logo_text')}
              <span className="text-[8px] font-mono uppercase font-bold text-[#00A3FF] tracking-wider px-1.5 py-0.5 rounded bg-[#00A3FF]/10 border border-[#00A3FF]/20">[ SAAS ]</span>
            </span>
            <p className="text-[7.5px] sm:text-[8px] text-[#94A3B8] mt-0.5 font-medium tracking-wide uppercase whitespace-nowrap">{t('logo_sub')}</p>
          </div>
        </Link>

        {/* Center Nav Links */}
        {!showBackToHome && (
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1 bg-[#111827]/40 border border-white/5 rounded-full p-1 backdrop-blur-md shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] 2xl:text-xs font-semibold whitespace-nowrap px-2.5 2xl:px-3 py-1.5 rounded-full hover:bg-white/5 relative group shrink-0 transition-all text-[#94A3B8] hover:text-white"
              >
                {link.label}
                <span className="absolute bottom-0.5 left-2.5 right-2.5 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full bg-[#00A3FF]" />
              </Link>
            ))}
          </nav>
        )}

        {/* Action Controls & Language Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {showBackToHome ? (
            <Link
              href="/"
              className="text-xs sm:text-sm font-semibold text-[#94A3B8] hover:text-[#00A3FF] transition-all py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-[#00A3FF] rounded-lg hidden md:block whitespace-nowrap"
            >
              {t('legal_back_to_home').replace('← ', '')}
            </Link>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/sports-os"
                className="text-[11px] sm:text-xs font-bold text-[#00ff87] hover:text-slate-950 hover:bg-[#00ff87] hover:shadow-[0_0_18px_rgba(0,255,135,0.45)] transition-all duration-300 h-9 px-3.5 sm:px-4 focus:outline-none focus:ring-1 focus:ring-[#00ff87] border border-[#00ff87]/40 hover:border-[#00ff87] rounded-xl bg-[#00ff87]/10 font-mono tracking-wider uppercase flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,255,135,0.15)]"
              >
                {t('btn_sport_os')}
              </Link>
            </div>
          )}

          {/* Minimalist Live Heartbeat Indicator on Ultra-Wide screens */}
          <div className="hidden 2xl:flex items-center gap-1.5 text-[9px] font-mono text-[#00E676]/90 bg-[#00E676]/5 border border-[#00E676]/15 rounded-full px-2.5 py-1 font-bold tracking-wider select-none uppercase shrink-0">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00E676]" />
            </span>
            <span>SYS: ONLINE</span>
          </div>

          {/* Language Switcher Dropdown */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() => {
                audioManager.playClick();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="flex items-center gap-1.5 bg-[#111827]/70 hover:bg-[#1f293d]/80 border border-white/10 hover:border-[#00A3FF]/40 rounded-xl px-2.5 h-9 backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#00A3FF]/50 cursor-pointer select-none group shrink-0"
              aria-label="Select language"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <Globe className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-white transition-colors shrink-0" />
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-[#00A3FF] drop-shadow-[0_0_8px_rgba(0,163,255,0.5)]">
                {locale}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#94A3B8] transition-transform duration-300 group-hover:text-white shrink-0 ${isDropdownOpen ? 'rotate-180 text-white' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-28 rounded-xl border border-white/10 bg-[#0B0F17]/95 p-1 backdrop-blur-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5),0_0_15px_rgba(0,163,255,0.1)] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
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

          {/* Mobile / Tablet Menu Button */}
          {!showBackToHome && (
            <button
              onClick={() => {
                audioManager.playClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="xl:hidden flex items-center justify-center h-9 w-9 rounded-xl bg-[#111827]/60 border border-white/10 text-[#94A3B8] hover:text-white hover:bg-white/5 transition-all focus:outline-none focus:ring-1 focus:ring-[#00A3FF] shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-4.5 h-4.5 text-[#00A3FF]" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {!showBackToHome && isMobileMenuOpen && (
        <div className="xl:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => {
                audioManager.playClick();
                setIsMobileMenuOpen(false);
              }}
              className="px-3 py-2.5 rounded-xl text-sm font-semibold text-[#94A3B8] hover:text-white hover:bg-white/5 transition-all flex items-center justify-between"
            >
              <span>{link.label}</span>
              <span className="text-[#00A3FF]/60 text-xs">→</span>
            </Link>
          ))}
          <div className="mt-2">
            <Link
              href="/sports-os"
              onClick={() => {
                audioManager.playClick();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full py-2.5 px-3 rounded-xl text-center text-xs font-bold text-[#00ff87] bg-[#00ff87]/10 border border-[#00ff87]/30 font-mono uppercase tracking-wider hover:bg-[#00ff87] hover:text-slate-950 transition-all shadow-[0_0_12px_rgba(0,255,135,0.15)]"
            >
              {t('btn_sport_os')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

