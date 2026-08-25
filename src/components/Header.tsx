'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Globe, 
  ArrowLeft, 
  Home, 
  Cpu, 
  BarChart3, 
  TrendingUp, 
  Zap,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ArtronLogo from '@/components/ui/ArtronLogo';
import { audioManager } from '@/lib/audioManager';
import { useHeaderKinematics } from '@/core/hooks/useHeaderKinematics';
import { IgnitionButton } from '@/components/ui/IgnitionButton';

interface HeaderProps {
  isSticky?: boolean;
  showBackToHome?: boolean;
  onBack?: () => void;
  backHref?: string;
  className?: string;
  hideOnInitialScroll?: boolean;
}

const LANG_META: Record<string, { flag: string; label: string }> = {
  ka: { flag: '🇬🇪', label: 'KA' },
  en: { flag: '🇺🇸', label: 'EN' },
  ru: { flag: '🇷🇺', label: 'RU' },
};

const SECTION_IDS = [
  'ecosystem',
  'dashboard-features',
  'analytics-showcase',
  'business-stats',
  'legacy-vs-artron',
  'mobile-app',
  'roi',
  'pricing',
  'partner-ecosystem',
  'booking-engine',
  'faq',
];

const CONTROL_PANEL_IDS = [
  '/#dashboard-features',
  '/#analytics-showcase',
  '/#business-stats',
  '/#legacy-vs-artron',
];

export const Header: React.FC<HeaderProps> = ({
  isSticky = false,
  showBackToHome = false,
  onBack,
  backHref,
  className = '',
  hideOnInitialScroll = false,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileControlPanelExpanded, setIsMobileControlPanelExpanded] = useState(true);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState<string>('/#ecosystem');
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const controlPanelMenuRef = useRef<HTMLDivElement>(null);
  const controlPanelTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll-driven Reverse Kinetic Assembly kinematics hook
  const kinematics = useHeaderKinematics(hideOnInitialScroll);

  /* ── Outside-click and ESC key to close dropdowns ── */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (controlPanelMenuRef.current && !controlPanelMenuRef.current.contains(event.target as Node)) {
        setIsControlPanelOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLangOpen(false);
        setIsControlPanelOpen(false);
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

  /* ── Active section detection on scroll (ScrollSpy) ── */
  useEffect(() => {
    if (pathname === '/about') {
      setActiveNav('/about');
      return;
    }
    if (pathname !== '/') return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollPosition = scrollY + 140;

      if (scrollY < 250) {
        setActiveNav('/#ecosystem');
        return;
      }

      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveNav('/#faq');
        return;
      }

      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const id = SECTION_IDS[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveNav(`/#${id}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    audioManager.playClick();
    setActiveNav(href);
    setIsControlPanelOpen(false);
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      const el = document.getElementById(targetId);
      if (el && pathname === '/') {
        e.preventDefault();
        const targetPos = el.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleControlPanelMouseEnter = () => {
    if (controlPanelTimerRef.current) clearTimeout(controlPanelTimerRef.current);
    setIsControlPanelOpen(true);
  };

  const handleControlPanelMouseLeave = () => {
    controlPanelTimerRef.current = setTimeout(() => {
      setIsControlPanelOpen(false);
    }, 180);
  };

  /* ── Control Panel Submenu Items ── */
  const controlPanelSubItems = [
    {
      href: '/#dashboard-features',
      label: t('nav_features_hub') || 'მართვის ცენტრი & IoT',
      desc: t('nav_features_hub_desc') || 'ტურნიკეტები, ათლეტთა ბაზა, №01-15/ნ',
      icon: Cpu,
      badge: 'IoT Core',
      color: '#00ff87',
    },
    {
      href: '/#analytics-showcase',
      label: t('nav_features_analytics') || 'ანალიტიკის სიმულატორი',
      desc: t('nav_features_analytics_desc') || 'KPI, AI Churn, Heatmap, Win-back',
      icon: BarChart3,
      badge: 'AI Simulator',
      color: '#00A3FF',
    },
    {
      href: '/#business-stats',
      label: t('nav_features_stats') || 'ბიზნეს მეტრიკები',
      desc: t('nav_features_stats_desc') || 'LTV, 45სთ ეკონომია, შრომის უსაფრთხოება',
      icon: TrendingUp,
      badge: 'Metrics',
      color: '#38BDF8',
    },
    {
      href: '/#legacy-vs-artron',
      label: t('nav_features_legacy') || 'Sport OS vs Legacy',
      desc: t('nav_features_legacy_desc') || 'Excel vs Artron, 0% გაპარვა',
      icon: Zap,
      badge: 'Sport OS',
      color: '#F59E0B',
    },
  ];

  /* ── Main Navigation Links (Chronological Page Sequence) ── */
  const navLinks = [
    { href: '/#ecosystem',          label: t('nav_ecosystem'), isDropdown: false },
    { href: '/#dashboard-features', label: t('nav_features'),  isDropdown: true  },
    { href: '/#mobile-app',         label: t('nav_mobile'),    isDropdown: false },
    { href: '/#roi',                label: t('nav_roi'),       isDropdown: false },
    { href: '/#pricing',            label: t('nav_pricing'),   isDropdown: false },
    { href: '/#partner-ecosystem',  label: t('nav_partners'),  isDropdown: false },
    { href: '/#booking-engine',     label: t('nav_booking'),   isDropdown: false },
    { href: '/#faq',                label: t('nav_faq'),       isDropdown: false },
    { href: '/about',               label: t('nav_about'),     isDropdown: false },
  ];

  const isControlPanelActive = CONTROL_PANEL_IDS.includes(activeNav);
  const systemAccessLabel = locale === 'ka' ? 'Sport OS-ის ჩართვა' : locale === 'ru' ? 'Запуск Sport OS' : 'Launch Sport OS';
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

        {/* ══ CENTER NAV (9 Links + Control Panel Submenu) ══ */}
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
            {navLinks.map((link) => {
              const isControlPanelLink = link.isDropdown;
              const isActive = isControlPanelLink ? isControlPanelActive : activeNav === link.href;
              const isHovered = hoveredNav === link.href;

              if (isControlPanelLink) {
                return (
                  <div
                    key={link.href}
                    ref={controlPanelMenuRef}
                    onMouseEnter={handleControlPanelMouseEnter}
                    onMouseLeave={handleControlPanelMouseLeave}
                    className="relative"
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      onMouseEnter={() => setHoveredNav(link.href)}
                      onMouseLeave={() => setHoveredNav(null)}
                      className={`relative text-[10.5px] 2xl:text-[11.5px] font-semibold whitespace-nowrap px-2.5 2xl:px-3 py-1 rounded-full shrink-0 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-[#00A3FF]/50 z-10 select-none flex items-center gap-1 ${
                        isActive
                          ? 'text-white font-bold'
                          : 'text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-nav-pill"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00A3FF]/25 via-[#00A3FF]/15 to-[#00D2FF]/25 border border-[#00A3FF]/50 shadow-[0_0_14px_rgba(0,163,255,0.35)]"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}

                      {!isActive && isHovered && (
                        <motion.span
                          layoutId="hover-nav-pill"
                          className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/[0.1] shadow-[0_2px_8px_rgba(255,255,255,0.05)]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        />
                      )}

                      <span className="relative z-10 flex items-center gap-1">
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse shrink-0" />
                        )}
                        <span>{link.label}</span>
                        <ChevronDown className={`w-3 h-3 transition-transform duration-200 opacity-70 group-hover:opacity-100 ${isControlPanelOpen ? 'rotate-180 text-[#00A3FF]' : ''}`} />
                      </span>
                    </Link>

                    {/* Desktop Floating Dropdown Menu for Control Panel Subsections */}
                    <AnimatePresence>
                      {isControlPanelOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.95 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 rounded-2xl border border-white/[0.12] bg-[#0B0F17]/98 p-2 backdrop-blur-2xl shadow-[0_20px_48px_rgba(0,0,0,0.8),0_0_30px_rgba(0,163,255,0.15)] z-[80]"
                        >
                          <div className="px-2.5 py-1.5 border-b border-white/[0.06] flex items-center justify-between">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#00A3FF]">
                              [ B2B CONTROL HUB MATRIX ]
                            </span>
                            <span className="text-[9px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              4 MODULES
                            </span>
                          </div>

                          <div className="mt-1 flex flex-col gap-1">
                            {controlPanelSubItems.map((subItem) => {
                              const isSubActive = activeNav === subItem.href;
                              const SubIcon = subItem.icon;
                              return (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  onClick={(e) => handleNavClick(e, subItem.href)}
                                  className={`group/item flex items-start gap-2.5 p-2 rounded-xl transition-all duration-200 cursor-pointer ${
                                    isSubActive
                                      ? 'bg-[#00A3FF]/15 border border-[#00A3FF]/40 shadow-[0_0_15px_rgba(0,163,255,0.15)]'
                                      : 'hover:bg-white/[0.05] border border-transparent'
                                  }`}
                                >
                                  <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover/item:scale-105"
                                    style={{
                                      backgroundColor: `${subItem.color}15`,
                                      borderColor: `${subItem.color}35`,
                                      color: subItem.color,
                                    }}
                                  >
                                    <SubIcon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1">
                                      <span className={`text-[11px] font-bold tracking-tight truncate ${isSubActive ? 'text-white' : 'text-slate-200 group-hover/item:text-white'}`}>
                                        {subItem.label}
                                      </span>
                                      <span
                                        className="text-[8px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 uppercase"
                                        style={{
                                          backgroundColor: `${subItem.color}15`,
                                          color: subItem.color,
                                        }}
                                      >
                                        {subItem.badge}
                                      </span>
                                    </div>
                                    <p className="text-[9.5px] text-[#94A3B8] truncate leading-relaxed mt-0.5">
                                      {subItem.desc}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={() => setHoveredNav(link.href)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className={`relative text-[10.5px] 2xl:text-[11.5px] font-semibold whitespace-nowrap px-2.5 2xl:px-3 py-1 rounded-full shrink-0 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-[#00A3FF]/50 z-10 select-none ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {/* Active Section Indicator Pill */}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00A3FF]/25 via-[#00A3FF]/15 to-[#00D2FF]/25 border border-[#00A3FF]/50 shadow-[0_0_14px_rgba(0,163,255,0.35)]"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Hover Pill (when hovering an inactive tab) */}
                  {!isActive && isHovered && (
                    <motion.span
                      layoutId="hover-nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/[0.1] shadow-[0_2px_8px_rgba(255,255,255,0.05)]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse shrink-0" />
                    )}
                    <span>{link.label}</span>
                  </span>
                </Link>
              );
            })}
          </motion.nav>
        )}

        {/* ══ RIGHT CONTROLS (System Access, Lang & Menu) ══ */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 z-20">
          {showBackToHome ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* 1 Step Back Button */}
              <button
                type="button"
                onClick={() => {
                  audioManager.playClick();
                  if (onBack) {
                    onBack();
                  } else if (backHref) {
                    router.push(backHref);
                  } else if (typeof window !== 'undefined' && window.history.length > 1) {
                    router.back();
                  } else {
                    router.push('/');
                  }
                }}
                className="text-xs sm:text-sm font-semibold text-[#94A3B8] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-[#00A3FF]/40 transition-all py-1.5 px-2.5 sm:px-3 focus:outline-none focus:ring-1 focus:ring-[#00A3FF] rounded-xl flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-sm active:scale-95"
                title={locale === 'ka' ? 'ერთი საფეხურით უკან დაბრუნება' : locale === 'ru' ? 'Назад на один шаг' : 'Go back one step'}
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#00A3FF]" />
                <span>{locale === 'ka' ? 'უკან' : locale === 'ru' ? 'Назад' : 'Back'}</span>
              </button>

              {/* Home Page Link */}
              <Link
                href="/"
                onClick={() => audioManager.playClick()}
                className="text-xs sm:text-sm font-semibold text-[#94A3B8] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-[#00A3FF]/40 transition-all py-1.5 px-2.5 sm:px-3 focus:outline-none focus:ring-1 focus:ring-[#00A3FF] rounded-xl flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-sm active:scale-95"
                title={locale === 'ka' ? 'მთავარ გვერდზე დაბრუნება' : locale === 'ru' ? 'На главную' : 'Home page'}
              >
                <Home className="w-3.5 h-3.5 text-slate-400" />
                <span>{locale === 'ka' ? 'მთავარი' : locale === 'ru' ? 'Главная' : 'Home'}</span>
              </Link>
            </div>
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
                <IgnitionButton
                  href="/sports-os"
                  variant="emerald"
                  size="sm"
                  className="px-2.5 sm:px-3.5 h-8.5 text-[10.5px] sm:text-xs rounded-xl"
                  aria-label="Sport OS Ignition"
                >
                  {systemAccessLabel}
                </IgnitionButton>
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
            ref={langDropdownRef}
          >
            <button
              id="language-switcher-btn"
              onClick={() => {
                audioManager.playClick();
                setIsLangOpen(!isLangOpen);
              }}
              className="flex items-center gap-1.5 bg-[#111827]/90 hover:bg-[#1A2235] border border-white/[0.12] hover:border-[#00A3FF]/60 rounded-xl px-2.5 h-8.5 backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#00A3FF]/60 cursor-pointer select-none group shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.4)] hover:shadow-[0_0_16px_rgba(0,163,255,0.25)]"
              aria-label="Select language"
              aria-expanded={isLangOpen}
              aria-haspopup="listbox"
            >
              <Globe className="w-3.5 h-3.5 text-[#00A3FF] group-hover:rotate-45 transition-transform duration-300 shrink-0" />
              <span className="text-[11px] font-black uppercase tracking-wider text-white">
                {LANG_META[locale]?.label || 'KA'}
              </span>
              <ChevronDown className={`w-3 h-3 text-[#94A3B8] transition-transform duration-300 shrink-0 ${isLangOpen ? 'rotate-180 text-[#00A3FF]' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
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
                        setIsLangOpen(false);
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
            className="xl:hidden overflow-hidden border-t border-white/[0.06] bg-[#0B0E14]/98 backdrop-blur-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="px-4 pb-4 pt-2 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const isControlPanelLink = link.isDropdown;
                const isActive = isControlPanelLink ? isControlPanelActive : activeNav === link.href;

                if (isControlPanelLink) {
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.025, duration: 0.18 }}
                      className="flex flex-col rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.06]"
                    >
                      <div className="flex items-center justify-between px-3.5 py-2.5">
                        <Link
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className={`flex items-center gap-2 text-sm font-semibold flex-1 ${
                            isActive ? 'text-[#00E5FF] font-bold' : 'text-[#94A3B8] hover:text-white'
                          }`}
                        >
                          {isActive && (
                            <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse shrink-0" />
                          )}
                          <span>{link.label}</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setIsMobileControlPanelExpanded(!isMobileControlPanelExpanded)}
                          className="p-1 text-[#94A3B8] hover:text-white rounded-lg"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileControlPanelExpanded ? 'rotate-180 text-[#00A3FF]' : ''}`} />
                        </button>
                      </div>

                      {/* Expandable Sub-items in mobile */}
                      {isMobileControlPanelExpanded && (
                        <div className="px-2 pb-2 pt-1 flex flex-col gap-1 border-t border-white/[0.04] bg-black/20">
                          {controlPanelSubItems.map((sub) => {
                            const isSubActive = activeNav === sub.href;
                            const SubIcon = sub.icon;
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={(e) => handleNavClick(e, sub.href)}
                                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                  isSubActive
                                    ? 'bg-[#00A3FF]/20 text-white font-bold border border-[#00A3FF]/30'
                                    : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.04]'
                                }`}
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <SubIcon className="w-3.5 h-3.5 shrink-0" style={{ color: sub.color }} />
                                  <span className="truncate">{sub.label}</span>
                                </div>
                                <ChevronRight className="w-3 h-3 text-[#00A3FF]/60 shrink-0" />
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.025, duration: 0.18 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all min-h-[44px] ${
                        isActive
                          ? 'bg-[#00A3FF]/20 text-[#00E5FF] border border-[#00A3FF]/40 font-bold shadow-[0_0_12px_rgba(0,163,255,0.2)]'
                          : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.05] border border-transparent'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse shrink-0" />
                        )}
                        <span>{link.label}</span>
                      </span>
                      <span className={isActive ? 'text-[#00E5FF] text-xs' : 'text-[#00A3FF]/60 text-xs'}>→</span>
                    </Link>
                  </motion.div>
                );
              })}

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
                <IgnitionButton
                  href="/sports-os"
                  variant="emerald"
                  size="md"
                  fullWidth={true}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Sport OS Ignition Mobile"
                >
                  {systemAccessLabel}
                </IgnitionButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
