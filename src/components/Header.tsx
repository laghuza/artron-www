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
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Fingerprint,
  Coins,
  Target,
  ShieldAlert,
  Flame, 
  RotateCcw,
  CalendarDays,
  FileSpreadsheet
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ArtronLogo from '@/components/ui/ArtronLogo';
import { audioManager } from '@/lib/audioManager';
import { useHeaderKinematics } from '@/core/hooks/useHeaderKinematics';
import { IgnitionButton } from '@/components/ui/IgnitionButton';
import PS5LanguageSelector from '@/components/navigation/PS5LanguageSelector';

interface HeaderProps {
  isSticky?: boolean;
  showBackToHome?: boolean;
  onBack?: () => void;
  backHref?: string;
  className?: string;
  hideOnInitialScroll?: boolean;
}

const SECTION_IDS = [
  'pure-sports-mirror',
  'ecosystem',
  'dashboard-features',
  'mobile-app',
  'ai-intelligence',
  'pricing',
  'partner-ecosystem',
  'faq',
];

const CONTROL_PANEL_IDS = [
  '/#dashboard-features',
  '/#analytics-showcase',
  '/#enterprise-security',
  '/#staff-access-roles',
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
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileControlPanelExpanded, setIsMobileControlPanelExpanded] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState<string>('');
  const controlPanelMenuRef = useRef<HTMLDivElement>(null);
  const controlPanelTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll-driven Reverse Kinetic Assembly kinematics hook
  const kinematics = useHeaderKinematics(hideOnInitialScroll);

  /* ── Outside-click and ESC key to close dropdowns ── */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (controlPanelMenuRef.current && !controlPanelMenuRef.current.contains(target)) {
        setIsControlPanelOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
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

  /* ── Active section detection on scroll (Viewport ScrollSpy) ── */
  useEffect(() => {
    if (pathname === '/about') {
      setActiveNav('/about');
      return;
    }
    if (pathname !== '/') return;

    // Zero-overhead passive scroll check for top boundary
    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveNav((prev) => (prev !== '' ? '' : prev));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // High-performance asynchronous IntersectionObserver (Zero layout thrashing / 0ms overhead)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setActiveNav(`/#${entry.target.id}`);
          }
        }
      },
      {
        rootMargin: '-15% 0px -65% 0px',
        threshold: 0,
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    audioManager.playClick();
    setActiveNav(href);
    setIsControlPanelOpen(false);
    setIsMobileMenuOpen(false);

    if (href.startsWith('/#')) {
      const [pathWithHash, query] = href.split('?');
      const targetId = pathWithHash.replace('/#', '');
      const tabMatch = query?.match(/tab=([a-z_]+)/);
      const tab = tabMatch ? tabMatch[1] : (targetId === 'roi' ? 'roi' : null);

      if (tab && typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('artron-select-analytics-tab', { detail: { tab } }));
        window.dispatchEvent(new CustomEvent('artron-select-b2b-tab', { detail: { tab } }));
      }

      const el = document.getElementById(targetId) || 
        (targetId === 'ai' || targetId === 'multimodal-ai' ? document.getElementById('ai-intelligence') : null) ||
        (targetId === 'roi' ? document.getElementById('analytics-showcase') : null) ||
        document.getElementById('dashboard-features');

      if (el && pathname === '/') {
        e.preventDefault();
        const targetPos = el.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    }
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

  /* ── Control Panel Submenu Items (Core Infrastructure - 4 Modules) ── */
  const controlPanelSubItems = [
    {
      href: '/#dashboard-features?tab=iot',
      tab: 'iot',
      label: t('nav_features_hub') || 'მართვის ცენტრი & IoT',
      desc: t('nav_features_hub_desc') || 'ტურნიკეტები, ათლეტთა ბაზა, №01-15/ნ',
      icon: Cpu,
      badge: 'IoT Core',
      color: '#00ff87',
    },
    {
      href: '/#dashboard-features?tab=booking',
      tab: 'booking',
      label: locale === 'ka' ? 'დაჯავშნები & განრიგის მართვა' : locale === 'ru' ? 'Бронирования и расписание' : 'Smart Booking & Schedules',
      desc: locale === 'ka' ? 'ჯგუფური, პერსონალური, ბილიკები, Overbooking ლიმიტი' : locale === 'ru' ? 'Групповые, дорожки, тренеры, лимиты' : 'Group classes, pool lanes, trainers, capacity limits',
      icon: CalendarDays,
      badge: 'Smart Schedule',
      color: '#00A3FF',
    },
    {
      href: '/#dashboard-features?tab=security',
      tab: 'security',
      label: t('nav_features_security') || 'კიბერდაცვა & ლოკალური მართვა',
      desc: t('nav_features_security_desc') || 'პირდაპირი საბანკო ნაკადები, მხოლოდ დარბაზიდან მართვა, AES-256',
      icon: ShieldCheck,
      badge: 'Zero-Fraud',
      color: '#00E5FF',
    },
    {
      href: '/#dashboard-features?tab=migration',
      tab: 'migration',
      label: locale === 'ka' ? 'ბაზის უმტკივნეულო მიგრაცია' : locale === 'ru' ? 'Бесшовный перенос базы' : 'Zero-Downtime Migration',
      desc: locale === 'ka' ? 'Excel/CSV/1C-დან 48 საათში, 0 დანაკარგი' : locale === 'ru' ? 'Перенос из Excel/1C за 48 часов' : 'From Excel/CSV/1C in 48h, 0 data loss',
      icon: FileSpreadsheet,
      badge: 'Zero-Downtime',
      color: '#10B981',
    },
  ];

  /* ── Analytics & ROI Submenu Items (6 Interactive Modules) ── */
  const analyticsSubItems = [
    {
      href: '/#dashboard-features?tab=roi',
      tab: 'roi',
      label: locale === 'ka' ? 'ინვესტიციის ROI' : locale === 'ru' ? 'Калькулятор ROI' : 'Investment ROI',
      desc: locale === 'ka' ? 'ფინანსური სიმულატორი, დაზოგილი ხარჯები' : locale === 'ru' ? 'Финансовый симулятор, экономия' : 'Financial return & labor savings',
      icon: Coins,
      badge: 'ROI Matrix',
      color: '#00E5FF',
    },
    {
      href: '/#dashboard-features?tab=okr',
      tab: 'okr',
      label: locale === 'ka' ? 'მიზნები & OKR (Goal Hub)' : locale === 'ru' ? 'Цели и OKR (Goal Hub)' : 'Goals & OKR Hub',
      desc: locale === 'ka' ? 'სტრატეგიული KPI & მიზნები' : locale === 'ru' ? 'Стратегические KPI и цели' : 'Strategic KPIs & progress tracking',
      icon: Target,
      badge: 'Goal Hub',
      color: '#00A3FF',
    },
    {
      href: '/#dashboard-features?tab=kpi',
      tab: 'kpi',
      label: locale === 'ka' ? 'KPI პანელი' : locale === 'ru' ? 'Панель KPI' : 'KPI Dashboard',
      desc: locale === 'ka' ? 'საოპერაციო ჯანმრთელობის მეტრიკები' : locale === 'ru' ? 'Операционные метрики' : 'Real-time operational health',
      icon: BarChart3,
      badge: 'KPI Hub',
      color: '#38BDF8',
    },
    {
      href: '/#dashboard-features?tab=churn',
      tab: 'churn',
      label: locale === 'ka' ? 'გადინების პროგნოზი (AI Churn)' : locale === 'ru' ? 'Прогноз оттока (AI Churn)' : 'AI Churn Prediction',
      desc: locale === 'ka' ? 'წევრთა შენარჩუნების პროგნოზირება' : locale === 'ru' ? 'Прогнозирование удержания' : 'Predictive member retention',
      icon: ShieldAlert,
      badge: 'AI Guard',
      color: '#F43F5E',
    },
    {
      href: '/#dashboard-features?tab=heatmap',
      tab: 'heatmap',
      label: locale === 'ka' ? 'პიკური საათების რუკა (Heatmap)' : locale === 'ru' ? 'Тепловая карта часов (Heatmap)' : 'Peak Hours Heatmap',
      desc: locale === 'ka' ? 'დარბაზის დატვირთვის სითბური ანალიზი' : locale === 'ru' ? 'Тепловой анализ загрузки зала' : 'Gym load distribution & off-peak',
      icon: Flame,
      badge: 'Capacity',
      color: '#F59E0B',
    },
    {
      href: '/#dashboard-features?tab=winback',
      tab: 'winback',
      label: locale === 'ka' ? 'დაბრუნების ROI (Win-back)' : locale === 'ru' ? 'Возврат клиентов (Win-back)' : 'Win-Back Analytics',
      desc: locale === 'ka' ? 'პასიური წევრების დაბრუნების კამპანიები' : locale === 'ru' ? 'Кампании по возврату пассивных членов' : 'Lapsed member reactivation ROI',
      icon: RotateCcw,
      badge: 'Retention',
      color: '#10B981',
    },
  ];

  /* ── Main Navigation Links (Chronological Page Sequence) ── */
  const navLinks = [
    { href: '/#pure-sports-mirror', label: t('nav_mirror') || 'სარკე', dropdown: 'none' as const },
    { href: '/#ecosystem',          label: t('nav_sync') || 'სინქრონულობა', dropdown: 'none' as const },
    { href: '/#dashboard-features', label: t('nav_control_panel') || 'B2B პანელი',  dropdown: 'control' as const },
    { href: '/#mobile-app',         label: t('nav_athlete_freedom') || 'სპორტული თავისუფლება', dropdown: 'none' as const },
    { href: '/#ai-intelligence',    label: t('nav_ai') || (locale === 'ka' ? 'AI ასისტენტი' : locale === 'ru' ? 'AI Ассистент' : 'AI Assistant'), dropdown: 'none' as const },
    { href: '/#pricing',            label: t('nav_pricing'),   dropdown: 'none' as const },
    { href: '/#partner-ecosystem',  label: t('nav_partners'),  dropdown: 'none' as const },
    { href: '/#faq',                label: t('nav_faq'),       dropdown: 'none' as const },
    { href: '/about',               label: t('nav_about'),     dropdown: 'none' as const },
  ];

  const isControlPanelActive =
    CONTROL_PANEL_IDS.includes(activeNav) ||
    activeNav.startsWith('/#analytics-showcase') ||
    activeNav === '/#roi' ||
    activeNav.startsWith('/#analytics-');
  const isAnalyticsActive = activeNav.startsWith('/#analytics-showcase') || activeNav === '/#roi' || activeNav.startsWith('/#analytics-');
  const systemAccessLabel = locale === 'ka' ? 'Sport OS-ის ჩართვა' : locale === 'ru' ? 'Запуск Sport OS' : 'Launch Sport OS';
  const subBrandLabel = locale === 'ka' ? 'სპორტული ეკოსისტემა & IOT' : locale === 'ru' ? 'Спортивная Экосистема & IOT' : 'SPORTS & IOT ECOSYSTEM';

  /* ── Glass header surface ── */
  const glassClass = kinematics.isScrolledPast
    ? 'bg-[#080B10]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_32px_rgba(0,0,0,0.6)]'
    : 'bg-[#0B0E14]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_2px_20px_rgba(0,0,0,0.3)]';

  const positionClass = isSticky ? 'fixed top-0 left-0 right-0' : 'sticky top-0';

  return (
    <motion.header
      style={{
        y: kinematics.headerY,
        opacity: kinematics.headerAlpha,
        pointerEvents: kinematics.isInteractive ? 'auto' : 'none',
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
              const isControlPanelLink = link.dropdown === 'control';
              const isActive = isControlPanelLink
                ? isControlPanelActive
                : activeNav === link.href;
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

                    {/* Desktop Floating Mega-Dropdown Menu for Control Panel & Analytics */}
                    <AnimatePresence>
                      {isControlPanelOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.95 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute left-1/2 -translate-x-[35%] xl:-translate-x-1/2 top-full mt-2 w-[720px] 2xl:w-[780px] rounded-2xl border border-white/[0.12] bg-[#0B0F17]/98 p-3 backdrop-blur-2xl shadow-[0_20px_48px_rgba(0,0,0,0.8),0_0_30px_rgba(0,163,255,0.15)] z-[80]"
                        >
                          <div className="grid grid-cols-12 gap-3">
                            {/* Column 1: Core Operations & IoT (5 cols) */}
                            <div className="col-span-5 flex flex-col pr-2 border-r border-white/[0.08]">
                              <div className="px-2 py-1 mb-1 flex items-center justify-between border-b border-white/[0.06]">
                                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#00E5FF]">
                                  [ CORE INFRASTRUCTURE ]
                                </span>
                                <span className="text-[9px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  {controlPanelSubItems.length} MODULES
                                </span>
                              </div>

                              <div className="flex flex-col gap-1 mt-1">
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
                                        <p className="text-[9px] text-[#94A3B8] truncate leading-relaxed mt-0.5">
                                          {subItem.desc}
                                        </p>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>

                              {/* Master link to Full Analytics Simulator */}
                              <div className="mt-auto pt-2 border-t border-white/[0.06]">
                                <Link
                                  href="/#dashboard-features?tab=roi"
                                  onClick={(e) => handleNavClick(e, '/#dashboard-features?tab=roi')}
                                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-[#00A3FF]/10 border border-white/[0.06] hover:border-[#00A3FF]/30 transition-all text-[10px] text-[#00E5FF] font-semibold group/all"
                                >
                                  <span>{locale === 'ka' ? 'ანალიტიკისა და ROI-ის სიმულატორი (CRM Preview)' : locale === 'ru' ? 'Симулятор аналитики и ROI (CRM Preview)' : 'Analytics & ROI Simulator (CRM Preview)'}</span>
                                  <ChevronRight className="w-3 h-3 group-hover/all:translate-x-0.5 transition-transform" />
                                </Link>
                              </div>
                            </div>

                            {/* Column 2: Analytics & ROI Suite (7 cols) */}
                            <div className="col-span-7 flex flex-col pl-1">
                              <div className="px-2 py-1 mb-1 flex items-center justify-between border-b border-white/[0.06]">
                                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#38BDF8]">
                                  [ ANALYTICS &amp; ROI SUITE ]
                                </span>
                                <span className="text-[9px] font-mono text-[#00E5FF] font-semibold flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                                  {analyticsSubItems.length} METRIC MODULES
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                                {analyticsSubItems.map((subItem) => {
                                  const isSubActive = activeNav === subItem.href;
                                  const SubIcon = subItem.icon;
                                  return (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      onClick={(e) => handleNavClick(e, subItem.href)}
                                      className={`group/item flex items-start gap-2 p-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                                        isSubActive
                                          ? 'bg-[#00A3FF]/15 border border-[#00A3FF]/40 shadow-[0_0_15px_rgba(0,163,255,0.15)]'
                                          : 'hover:bg-white/[0.05] border border-transparent'
                                      }`}
                                    >
                                      <div
                                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover/item:scale-105 mt-0.5"
                                        style={{
                                          backgroundColor: `${subItem.color}15`,
                                          borderColor: `${subItem.color}35`,
                                          color: subItem.color,
                                        }}
                                      >
                                        <SubIcon className="w-3.5 h-3.5" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-1">
                                          <span className={`text-[10.5px] font-bold tracking-tight truncate ${isSubActive ? 'text-white' : 'text-slate-200 group-hover/item:text-white'}`}>
                                            {subItem.label}
                                          </span>
                                        </div>
                                        <p className="text-[8.5px] text-[#94A3B8] truncate leading-tight mt-0.5">
                                          {subItem.desc}
                                        </p>
                                        <span
                                          className="inline-block text-[7.5px] font-mono px-1 py-0.2 rounded font-bold uppercase mt-1"
                                          style={{
                                            backgroundColor: `${subItem.color}15`,
                                            color: subItem.color,
                                          }}
                                        >
                                          {subItem.badge}
                                        </span>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
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
                className="will-change-transform shrink-0 hidden sm:block"
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

          {/* ══ PS5 AIRY LANGUAGE SWITCHER — Reverse Kinetic from Letter O trajectory ══ */}
          <motion.div
            style={{
              x: kinematics.lang.x,
              y: kinematics.lang.y,
              rotate: kinematics.lang.rotate,
              scale: kinematics.lang.scale,
              opacity: kinematics.lang.opacity,
            }}
            className="relative shrink-0 will-change-transform z-30"
          >
            <PS5LanguageSelector variant="header" />
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
                const isControlPanelLink = link.dropdown === 'control';
                const isActive = isControlPanelLink
                  ? isControlPanelActive
                  : activeNav === link.href;

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
                          <div className="px-2 pt-1.5 pb-0.5 text-[9px] font-mono font-bold uppercase tracking-widest text-[#00E5FF]">
                            [ CORE INFRASTRUCTURE ]
                          </div>
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

                          <div className="mt-2 px-2 pt-2 pb-0.5 border-t border-white/[0.06] text-[9px] font-mono font-bold uppercase tracking-widest text-[#38BDF8]">
                            [ ANALYTICS &amp; ROI SUITE ]
                          </div>
                          {analyticsSubItems.map((sub) => {
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
                                <span
                                  className="text-[8px] font-mono px-1.5 py-0.5 rounded font-bold uppercase shrink-0"
                                  style={{ backgroundColor: `${sub.color}20`, color: sub.color }}
                                >
                                  {sub.badge}
                                </span>
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

              {/* Mobile PS5 Language Selector */}
              <div className="mt-2 pt-2 border-t border-white/[0.08]">
                <PS5LanguageSelector
                  variant="mobile"
                  onSelectCallback={() => setIsMobileMenuOpen(false)}
                />
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
