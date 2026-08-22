'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Globe, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ArtronLogo from '@/components/ui/ArtronLogo';
import { audioManager } from '@/lib/audioManager';
import { useHeaderKinematics } from '@/core/hooks/useHeaderKinematics';
import { MagneticButton } from '@/components/ui/MagneticButton';

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll-driven Reverse Kinetic Assembly kinematics hook
  const kinematics = useHeaderKinematics(hideOnInitialScroll);

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

  /* ── 8 Main Navigation Links (Chronological Page Sequence) ── */
  const navLinks = [
    { href: '/#services',           label: t('nav_ecosystem') },
    { href: '/#dashboard-features', label: t('nav_features') },
    { href: '/#roi',                label: t('nav_roi') },
    { href: '/#pricing',            label: t('nav_pricing') },
    { href: '/#partner-ecosystem',  label: t('nav_partners') },
    { href: '/#booking-engine',     label: t('nav_booking') },
    { href: '/#faq',                label: t('nav_faq') },
    { href: '/about',               label: t('nav_about') },
  ];

  const systemAccessLabel = locale === 'ka' ? 'სისტემური წვდომა' : locale === 'ru' ? 'Системный доступ' : 'System Access';
  const subBrandLabel = locale === 'ka' ? 'სპორტული ეკოსისტემა & IOT' : locale === 'ru' ? 'Спортивная Экосистема & IOT' : 'SPORTS & IOT ECOSYSTEM';

  /* ── Glass header surface ── */
  const glassClass = kinematics.isScrolledPast
    ? 'bg-[#080B10]/95 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_32px_rgba(0,0,0,0.6)]'
    : 'bg-[#0B0E14]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_2px_20px_rgba(0,0,0,0.3)]';

  const positionClass = isSticky ? 'fixed top-0 left-0 right-0' : 'sticky top-0';

  return (
    <motion.header
      style={{
        y: kinematics.headerY,
        opacity: kinematics.headerAlpha,
        pointerEvents: kinematics.isInteractive ? 'auto' : 'none',
        WebkitBackdropFilter: kinematics.isScrolledPast ? 'blur(28px)' : 'blur(20px)',
      }}
      className={`${positionClass} z-50 w-full ${glassClass} ${className}`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6 py-2 flex items-center justify-between gap-2 xl:gap-4">

        {/* ══ LOGO (Left) — Reverse Kinetic from A & R1 trajectory ══ */}
        <motion.div
          style={{
            x: kinematics.logo.x,
            y: kinematics.logo.y,
            rotate: kinematics.logo.rotate,
            scale: kinematics.logo.scale,
            opacity: kinematics.logo.opacity,
          }}
          className="shrink-0 will-change-transform"
        >
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/40 rounded-xl p-1 transition-all duration-300 shrink-0"
            aria-label="Artron Home"
          >
            <div className="relative flex items-center justify-center shrink-0">
              <ArtronLogo className="w-7 h-7 sm:w-7.5 sm:h-7.5 transition-transform duration-500 group-hover:scale-110 filter drop-shadow-[0_0_14px_rgba(0,230,118,0.5)] shrink-0" />
            </div>
            <div className="block">
              <div className="flex items-center gap-1.5">
                <span className="text-[12.5px] sm:text-[13px] font-black tracking-[0.14em] leading-none text-white whitespace-nowrap uppercase font-sans group-hover:text-[#00E676] transition-colors duration-300">
                  ARTRON
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-[2px] rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[7px] sm:text-[7.5px] font-mono font-bold text-emerald-400 tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
                  CORE
                </span>
              </div>
              <p className="text-[7px] sm:text-[7.5px] text-[#94A3B8]/90 mt-0.5 font-medium tracking-wider uppercase whitespace-nowrap font-mono">
                {subBrandLabel}
              </p>
            </div>
          </Link>
        </motion.div>

        {/* ══ CENTER NAV (8 Links) — Reverse Kinetic from Letter T trajectory ══ */}
        {!showBackToHome && (
          <motion.nav
            style={{
              y: kinematics.nav.y,
              scale: kinematics.nav.scale,
              opacity: kinematics.nav.opacity,
            }}
            className="hidden xl:flex items-center gap-0.5 2xl:gap-1 bg-[#0F141C]/85 border border-white/[0.08] rounded-full px-2 2xl:px-3 py-1 backdrop-blur-md shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] will-change-transform"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={() => setHoveredNav(link.href)}
                onMouseLeave={() => setHoveredNav(null)}
                className="relative text-[10.5px] 2xl:text-[11.5px] font-semibold whitespace-nowrap px-2 2xl:px-3 py-1 rounded-full shrink-0 transition-colors duration-200 text-[#94A3B8] hover:text-white focus:outline-none focus:ring-1 focus:ring-[#00A3FF]/50 z-10 select-none"
              >
                {hoveredNav === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-white/[0.09] via-[#00A3FF]/10 to-white/[0.09] border border-white/[0.14] shadow-[0_2px_12px_rgba(0,163,255,0.15)]"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </motion.nav>
        )}

        {/* ══ RIGHT CONTROLS (System Access, Lang & Menu) ══ */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 z-20">
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
              {/* ⚡ SYSTEM ACCESS BUTTON — Reverse Kinetic from R2 & N trajectory */}
              <motion.div
                style={{
                  x: kinematics.access.x,
                  y: kinematics.access.y,
                  rotate: kinematics.access.rotate,
                  scale: kinematics.access.scale,
                  opacity: kinematics.access.opacity,
                }}
                className="will-change-transform shrink-0"
              >
                <MagneticButton
                  href="/sports-os"
                  variant="emerald"
                  shockwaveColor="rgba(16, 185, 129, 0.8)"
                  onClick={() => audioManager.playClick()}
                  className="px-2.5 sm:px-3.5 h-8.5 text-[10.5px] sm:text-xs rounded-xl"
                  aria-label="System Access Login"
                >
                  <span className="relative flex h-2 w-2 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981] shadow-[0_0_8px_#10B981]" />
                  </span>

                  <Zap className="w-3.5 h-3.5 text-[#34D399] transition-transform shrink-0 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)] mr-0.5" />
                  <span className="tracking-wide font-extrabold whitespace-nowrap">{systemAccessLabel}</span>
                </MagneticButton>
              </motion.div>
            </>
          )}

          {/* ══ LANGUAGE SWITCHER — Reverse Kinetic from Letter O trajectory ══ */}
          <motion.div
            style={{
              x: kinematics.lang.x,
              y: kinematics.lang.y,
              rotate: kinematics.lang.rotate,
              scale: kinematics.lang.scale,
              opacity: kinematics.lang.opacity,
            }}
            className="relative shrink-0 will-change-transform z-30"
            ref={dropdownRef}
          >
            <button
              id="language-switcher-btn"
              onClick={() => {
                audioManager.playClick();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="flex items-center gap-1.5 bg-[#111827]/90 hover:bg-[#1A2235] border border-white/[0.12] hover:border-[#00A3FF]/60 rounded-xl px-2.5 h-8.5 backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#00A3FF]/60 cursor-pointer select-none group shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.4)] hover:shadow-[0_0_16px_rgba(0,163,255,0.25)]"
              aria-label="Select language"
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
            >
              <Globe className="w-3.5 h-3.5 text-[#00A3FF] group-hover:rotate-45 transition-transform duration-300 shrink-0" />
              <span className="text-[11px] font-black uppercase tracking-wider text-white">
                {LANG_META[locale]?.label || 'KA'}
              </span>
              <ChevronDown className={`w-3 h-3 text-[#94A3B8] transition-transform duration-300 shrink-0 ${isDropdownOpen ? 'rotate-180 text-[#00A3FF]' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  role="listbox"
                  aria-label="Language options"
                  initial={{ opacity: 0, scale: 0.92, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -6 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-white/[0.12] bg-[#0B0F17]/98 p-1.5 backdrop-blur-2xl shadow-[0_20px_48px_rgba(0,0,0,0.7),0_0_24px_rgba(0,163,255,0.15)] z-[70]"
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
                          ? 'bg-[#00A3FF]/20 text-[#00A3FF] border border-[#00A3FF]/30'
                          : 'text-[#94A3B8] hover:bg-white/[0.06] hover:text-white border border-transparent'
                      }`}
                    >
                      <span className="text-base leading-none">{LANG_META[lang].flag}</span>
                      <span className="uppercase tracking-wider font-bold">{LANG_META[lang].label}</span>
                      {locale === lang && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00A3FF] shadow-[0_0_8px_#00A3FF] shrink-0" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ══ MOBILE HAMBURGER ══ */}
          {!showBackToHome && (
            <button
              onClick={() => {
                audioManager.playClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="xl:hidden flex items-center justify-center h-8.5 w-8.5 rounded-xl bg-[#111827]/80 border border-white/[0.08] hover:border-[#00A3FF]/40 text-[#94A3B8] hover:text-white hover:bg-white/[0.06] transition-all focus:outline-none focus:ring-1 focus:ring-[#00A3FF] shrink-0 min-w-[34px] cursor-pointer"
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
            className="xl:hidden overflow-hidden border-t border-white/[0.06] bg-[#0B0E14]/98 backdrop-blur-2xl"
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

              {/* Mobile Language Selector */}
              <div className="mt-2 pt-2 border-t border-white/[0.08] flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-[#94A3B8] uppercase">{t('lang_selector') || 'Language'}:</span>
                <div className="flex items-center gap-1.5">
                  {(['ka', 'en', 'ru'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        audioManager.playClick();
                        setLocale(lang);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        locale === lang
                          ? 'bg-[#00A3FF]/20 text-[#00A3FF] border border-[#00A3FF]/40'
                          : 'bg-white/[0.04] text-[#94A3B8] hover:text-white border border-transparent'
                      }`}
                    >
                      <span>{LANG_META[lang].flag}</span>
                      <span>{LANG_META[lang].label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="mt-2 pt-2 border-t border-white/[0.08]">
                <Link
                  href="/sports-os"
                  onClick={() => {
                    audioManager.playClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#052e16] to-[#065f46] border border-[#10B981]/50 hover:bg-[#10B981]/25 transition-all min-h-[44px] shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                  </span>
                  <Zap className="w-4 h-4 text-[#34D399]" />
                  <span>{systemAccessLabel}</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
