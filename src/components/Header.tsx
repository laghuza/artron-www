'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Globe, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ArtronLogo from '@/components/ui/ArtronLogo';
import { audioManager } from '@/lib/audioManager';

interface HeaderProps {
  isSticky?: boolean;
  showBackToHome?: boolean;
  className?: string;
  hideOnInitialScroll?: boolean;
}

const LANG_META: Record<string, { flag: string; label: string }> = {
  ka: { flag: '🇬🇪', label: 'KA' },
  en: { flag: '🇺🇸', label: 'EN' },
  ru: { flag: '🇷🇺', label: 'RU' },
};

export const Header: React.FC<HeaderProps> = ({
  isSticky = false,
  showBackToHome = false,
  className = '',
  hideOnInitialScroll = false,
}) => {
  const { locale, setLocale, t } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ── Scroll detection (Reveals on DualCoreShowcase when hideOnInitialScroll=true) ── */
  useEffect(() => {
    const threshold = hideOnInitialScroll ? 260 : 20;
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll(); // initial check
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hideOnInitialScroll]);

  /* ── Outside-click and ESC key to close dropdowns ── */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    audioManager.playClick();
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      const el = document.getElementById(targetId);
      if (el && window.location.pathname === '/') {
        e.preventDefault();
        const targetPos = el.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  /* ── 7 Main Navigation Links ── */
  const navLinks = [
    { href: '/#services',          label: t('nav_ecosystem') },
    { href: '/#roi',               label: t('nav_roi') },
    { href: '/#pricing',           label: t('nav_pricing') },
    { href: '/#partner-ecosystem', label: t('nav_partners') },
    { href: '/#faq',               label: t('nav_faq') },
    { href: '/#booking-engine',    label: t('nav_booking') },
    { href: '/about',              label: t('nav_about') },
  ];

  const systemAccessLabel = locale === 'ka' ? 'სისტემური წვდომა' : locale === 'ru' ? 'Системный доступ' : 'System Access';
  const subBrandLabel = locale === 'ka' ? 'სპორტული SAAS & IOT' : locale === 'ru' ? 'Спортивный SAAS & IOT' : 'SPORTS SAAS & IOT';

  /* ── Glass header surface & Assembly Transition ── */
  const glassClass = scrolled
    ? 'bg-[#080B10]/95 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_32px_rgba(0,0,0,0.6)]'
    : 'bg-[#0B0E14]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_2px_20px_rgba(0,0,0,0.3)]';

  const isHidden = hideOnInitialScroll && !scrolled;
  const visibilityClass = isHidden
    ? '-translate-y-full opacity-0 pointer-events-none'
    : 'translate-y-0 opacity-100 pointer-events-auto';

  const positionClass = isSticky ? 'fixed top-0 left-0 right-0' : 'sticky top-0';

  return (
    <header
      className={`${positionClass} z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${visibilityClass} ${glassClass} ${className}`}
      style={{ WebkitBackdropFilter: scrolled ? 'blur(28px)' : 'blur(20px)' }}
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3 lg:gap-5">

        {/* ══ LOGO (Left) ══ */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/40 rounded-xl p-1 transition-all duration-300 shrink-0"
          aria-label="Artron Home"
        >
          <ArtronLogo className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_0_12px_rgba(0,163,255,0.45)] shrink-0" />
          <div className="block">
            <span className="text-[13px] sm:text-sm font-black tracking-widest leading-none flex items-center gap-1.5 text-white whitespace-nowrap uppercase font-sans">
              ARTRON
              <span className="text-[8px] font-mono font-bold text-[#00A3FF] tracking-wider px-1.5 py-[2px] rounded bg-[#00A3FF]/15 border border-[#00A3FF]/25 leading-none uppercase">
                [ SAAS ]
              </span>
            </span>
            <p className="text-[7.5px] sm:text-[8px] text-[#94A3B8]/80 mt-1 font-medium tracking-wider uppercase whitespace-nowrap font-mono">
              {subBrandLabel}
            </p>
          </div>
        </Link>

        {/* ══ CENTER NAV (7 Links) ══ */}
        {!showBackToHome && (
          <nav
            className="hidden xl:flex items-center gap-1 bg-[#0F141C]/85 border border-white/[0.08] rounded-full px-3 py-1.5 backdrop-blur-md shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={() => setHoveredNav(link.href)}
                onMouseLeave={() => setHoveredNav(null)}
                className="relative text-[11px] 2xl:text-xs font-semibold whitespace-nowrap px-3 py-1.5 rounded-full shrink-0 transition-colors duration-200 text-[#94A3B8] hover:text-white focus:outline-none focus:ring-1 focus:ring-[#00A3FF]/50 z-10 select-none"
              >
                {hoveredNav === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.12] shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>
        )}

        {/* ══ RIGHT CONTROLS ══ */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {showBackToHome ? (
            <Link
              href="/"
              className="text-xs sm:text-sm font-semibold text-[#94A3B8] hover:text-white transition-all py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-[#00A3FF] rounded-lg flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>←</span>
              <span>{locale === 'ka' ? 'მთავარი' : locale === 'ru' ? 'Главная' : 'Home'}</span>
            </Link>
          ) : (
            <>
              {/* ⚡ SYSTEM ACCESS BUTTON */}
              <Link
                href="https://app.artron.ge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#10B981] hover:text-white bg-[#10B981]/10 hover:bg-[#10B981]/25 border border-[#10B981]/40 hover:border-[#10B981] rounded-xl px-3 sm:px-4 h-9 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 whitespace-nowrap shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)] group"
                aria-label="System Access Login"
              >
                <Zap className="w-3.5 h-3.5 text-[#10B981] group-hover:scale-115 transition-transform shrink-0 animate-pulse" />
                <span>{systemAccessLabel}</span>
              </Link>
            </>
          )}

          {/* ══ LANGUAGE SWITCHER (Globe + KA + Chevron) ══ */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              id="language-switcher-btn"
              onClick={() => {
                audioManager.playClick();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="flex items-center gap-1.5 bg-[#111827]/70 hover:bg-[#1A2235]/90 border border-white/[0.08] hover:border-[#00A3FF]/40 rounded-xl px-2.5 h-9 backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#00A3FF]/50 cursor-pointer select-none group shrink-0"
              aria-label="Select language"
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
            >
              <Globe className="w-3.5 h-3.5 text-[#00A3FF] shrink-0" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">
                {LANG_META[locale]?.label}
              </span>
              <ChevronDown className={`w-3 h-3 text-[#94A3B8] transition-transform duration-300 shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  role="listbox"
                  aria-label="Language options"
                  initial={{ opacity: 0, scale: 0.94, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -6 }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-white/[0.08] bg-[#0B0F17]/98 p-1.5 backdrop-blur-2xl shadow-[0_20px_48px_rgba(0,0,0,0.65),0_0_20px_rgba(0,163,255,0.07)] z-[60]"
                >
                  {(['ka', 'en', 'ru'] as const).map((lang) => (
                    <button
                      key={lang}
                      role="option"
                      data-testid={`lang-option-${lang}`}
                      aria-selected={locale === lang}
                      onClick={() => {
                        audioManager.playClick();
                        setLocale(lang);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-left rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                        locale === lang
                          ? 'bg-[#00A3FF]/15 text-[#00A3FF]'
                          : 'text-[#94A3B8] hover:bg-white/[0.05] hover:text-white'
                      }`}
                    >
                      <span className="text-base leading-none">{LANG_META[lang].flag}</span>
                      <span className="uppercase tracking-wider font-bold">{LANG_META[lang].label}</span>
                      {locale === lang && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00A3FF] shadow-[0_0_6px_#00A3FF] shrink-0" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ══ MOBILE HAMBURGER ══ */}
          {!showBackToHome && (
            <button
              onClick={() => {
                audioManager.playClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="xl:hidden flex items-center justify-center h-9 w-9 rounded-xl bg-[#111827]/70 border border-white/[0.08] text-[#94A3B8] hover:text-white hover:bg-white/[0.06] transition-all focus:outline-none focus:ring-1 focus:ring-[#00A3FF] shrink-0 min-w-[36px]"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen
                ? <X className="w-4 h-4 text-[#00A3FF]" />
                : <Menu className="w-4 h-4" />
              }
            </button>
          )}
        </div>
      </div>

      {/* ══ MOBILE DRAWER ══ */}
      <AnimatePresence>
        {!showBackToHome && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="xl:hidden overflow-hidden border-t border-white/[0.06] bg-[#0B0E14]/95 backdrop-blur-2xl"
          >
            <div className="px-4 pb-4 pt-2 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.025, duration: 0.18 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#94A3B8] hover:text-white hover:bg-white/[0.05] transition-all min-h-[44px]"
                  >
                    <span>{link.label}</span>
                    <span className="text-[#00A3FF]/60 text-xs">→</span>
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <div className="mt-2 pt-3 border-t border-white/[0.08]">
                <Link
                  href="https://app.artron.ge"
                  target="_blank"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-[#10B981] bg-[#10B981]/15 border border-[#10B981]/40 hover:bg-[#10B981]/25 transition-all min-h-[44px]"
                >
                  <Zap className="w-4 h-4 text-[#10B981]" />
                  <span>{systemAccessLabel}</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
