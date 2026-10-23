'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import ArtronLogo from '@/components/ui/ArtronLogo';
import { audioManager } from '@/lib/audioManager';
import { useHeaderKinematics } from '@/core/hooks/useHeaderKinematics';
import { useSectionScrollSpy, SECTION_IDS } from '@/core/hooks/useSectionScrollSpy';
import { 
  CONTROL_PANEL_IDS, 
  getControlPanelSubItems, 
  getAnalyticsSubItems, 
  getNavLinks 
} from './header/headerNavData';
import { DesktopNav } from './header/DesktopNav';
import { MobileNavDrawer } from './header/MobileNavDrawer';
import { HeaderRightControls } from './header/HeaderRightControls';

interface HeaderProps {
  isSticky?: boolean;
  showBackToHome?: boolean;
  onBack?: () => void;
  backHref?: string;
  className?: string;
  hideOnInitialScroll?: boolean;
}

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
  const { locale, t } = useLanguage();
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileControlPanelExpanded, setIsMobileControlPanelExpanded] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState<string>(() => (pathname === '/about' ? '/about' : ''));
  const { activeId, setManualActive } = useSectionScrollSpy(false);
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

  /* ── Active section detection synced via useSectionScrollSpy ── */
  useEffect(() => {
    if (pathname === '/about') {
      let targetHref: string | null = null;
      try {
        targetHref = sessionStorage.getItem('artron_target_nav');
      } catch {}
      if (!targetHref) {
        setActiveNav('/about');
      }
      return;
    }
    if (pathname === '/') {
      setActiveNav(activeId ? `/#${activeId}` : '');
    }
  }, [activeId, pathname]);

  /* ── Cross-page hash navigation handler (e.g. arriving from /about to /#faq) ── */
  useEffect(() => {
    if (pathname !== '/') return;

    let targetHref: string | null = null;
    try {
      targetHref = sessionStorage.getItem('artron_target_nav');
      if (targetHref) {
        sessionStorage.removeItem('artron_target_nav');
      }
    } catch {}

    if (!targetHref && typeof window !== 'undefined' && window.location.hash) {
      targetHref = `/#${window.location.hash.replace(/^#/, '')}`;
    }

    if (!targetHref) return;

    const [pathWithHash, query] = targetHref.split('?');
    const targetId = pathWithHash.replace('/#', '');
    const tabMatch = query?.match(/tab=([a-z_]+)/);
    const tab = tabMatch ? tabMatch[1] : (targetId === 'roi' ? 'roi' : null);

    if (tab && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('artron-select-analytics-tab', { detail: { tab } }));
      window.dispatchEvent(new CustomEvent('artron-select-b2b-tab', { detail: { tab } }));
    }

    const primaryId = SECTION_IDS.includes(targetId)
      ? targetId
      : (targetId === 'ai' || targetId === 'multimodal-ai' ? 'ai-intelligence' : (targetId === 'roi' ? 'dashboard-features' : targetId));

    setActiveNav(targetHref);
    setManualActive(primaryId);

    let attempts = 0;
    const maxAttempts = 35;
    const scrollToTarget = () => {
      attempts++;
      const resolvedTargetId =
        targetId === 'ai' || targetId === 'multimodal-ai' ? 'ai-intelligence' :
        targetId === 'roi' ? 'dashboard-features' :
        targetId;

      const el = document.getElementById(resolvedTargetId) || 
        (resolvedTargetId === 'dashboard-features' ? document.getElementById('analytics-showcase') : null);

      if (el) {
        const targetPos = el.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top: targetPos, behavior: 'auto' });

        requestAnimationFrame(() => {
          const adjustedPos = el.getBoundingClientRect().top + window.scrollY - 88;
          if (Math.abs(window.scrollY - adjustedPos) > 4) {
            window.scrollTo({ top: adjustedPos, behavior: 'auto' });
          }
          try {
            sessionStorage.removeItem('artron_target_nav');
          } catch {}
        });
      } else if (attempts < maxAttempts) {
        setTimeout(scrollToTarget, 30);
      } else {
        try {
          sessionStorage.removeItem('artron_target_nav');
        } catch {}
      }
    };
    scrollToTarget();
  }, [pathname, setManualActive]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    audioManager.playClick();
    setActiveNav(href);
    setIsControlPanelOpen(false);
    setIsMobileMenuOpen(false);

    if (href.startsWith('/#')) {
      if (typeof window !== 'undefined' && pathname !== '/') {
        try {
          sessionStorage.setItem('artron_target_nav', href);
        } catch {}
      }

      const [pathWithHash, query] = href.split('?');
      const targetId = pathWithHash.replace('/#', '');
      const tabMatch = query?.match(/tab=([a-z_]+)/);
      const tab = tabMatch ? tabMatch[1] : (targetId === 'roi' ? 'roi' : null);

      if (tab && typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('artron-select-analytics-tab', { detail: { tab } }));
        window.dispatchEvent(new CustomEvent('artron-select-b2b-tab', { detail: { tab } }));
      }

      const resolvedTargetId =
        targetId === 'ai' || targetId === 'multimodal-ai' ? 'ai-intelligence' :
        targetId === 'roi' ? 'dashboard-features' :
        targetId;

      const el = document.getElementById(resolvedTargetId) || 
        (resolvedTargetId === 'dashboard-features' ? document.getElementById('analytics-showcase') : null);

      const primaryId = SECTION_IDS.includes(targetId)
        ? targetId
        : (targetId === 'ai' || targetId === 'multimodal-ai' ? 'ai-intelligence' : 'dashboard-features');

      setManualActive(primaryId);

      if (el && pathname === '/') {
        e.preventDefault();
        try {
          window.history.replaceState(null, '', href);
        } catch {}
        const targetPos = el.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    }
  }, [pathname, setManualActive]);

  const handleControlPanelMouseEnter = useCallback(() => {
    if (controlPanelTimerRef.current) clearTimeout(controlPanelTimerRef.current);
    setIsControlPanelOpen(true);
  }, []);

  const handleControlPanelMouseLeave = useCallback(() => {
    controlPanelTimerRef.current = setTimeout(() => {
      setIsControlPanelOpen(false);
    }, 180);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  /* ── Submenus & Links (Memoized) ── */
  const controlPanelSubItems = useMemo(() => getControlPanelSubItems(locale, t), [locale, t]);
  const analyticsSubItems = useMemo(() => getAnalyticsSubItems(locale, t), [locale, t]);
  const navLinks = useMemo(() => getNavLinks(locale, t), [locale, t]);

  const isControlPanelActive =
    CONTROL_PANEL_IDS.includes(activeNav) ||
    activeNav.startsWith('/#analytics-showcase') ||
    activeNav === '/#roi' ||
    activeNav.startsWith('/#analytics-');

  const subBrandLabel = locale === 'ka' ? 'სპორტული ეკოსისტემა' : locale === 'ru' ? 'Спортивная Экосистема' : 'SPORTS ECOSYSTEM';

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
              <div className="flex items-center">
                <span className="text-[12.5px] sm:text-[13px] font-black tracking-[0.14em] leading-none text-white whitespace-nowrap uppercase font-sans group-hover:text-[#00E676] transition-colors duration-300">
                  ARTRON
                </span>
              </div>
              <p className="text-[7px] sm:text-[7.5px] text-[#94A3B8]/90 mt-0.5 font-medium tracking-wider uppercase whitespace-nowrap font-mono">
                {subBrandLabel}
              </p>
            </div>
          </Link>
        </motion.div>

        {/* ══ CENTER NAV (Desktop 9 Links + Control Panel Mega Submenu) ══ */}
        {!showBackToHome && (
          <DesktopNav
            navLinks={navLinks}
            activeNav={activeNav}
            isControlPanelActive={isControlPanelActive}
            hoveredNav={hoveredNav}
            setHoveredNav={setHoveredNav}
            isControlPanelOpen={isControlPanelOpen}
            controlPanelMenuRef={controlPanelMenuRef}
            handleControlPanelMouseEnter={handleControlPanelMouseEnter}
            handleControlPanelMouseLeave={handleControlPanelMouseLeave}
            handleNavClick={handleNavClick}
            controlPanelSubItems={controlPanelSubItems}
            analyticsSubItems={analyticsSubItems}
            locale={locale}
            kinematicsNav={kinematics.nav}
          />
        )}

        {/* ══ RIGHT CONTROLS (Back / Home, PS5 Lang & Mobile Hamburger) ══ */}
        <HeaderRightControls
          showBackToHome={showBackToHome}
          onBack={onBack}
          backHref={backHref}
          locale={locale}
          router={router}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMobileMenu={toggleMobileMenu}
          kinematicsLang={kinematics.lang}
        />
      </div>

      {/* ══ MOBILE DRAWER ══ */}
      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        showBackToHome={showBackToHome}
        activeNav={activeNav}
        isControlPanelActive={isControlPanelActive}
        isMobileControlPanelExpanded={isMobileControlPanelExpanded}
        setIsMobileControlPanelExpanded={setIsMobileControlPanelExpanded}
        navLinks={navLinks}
        controlPanelSubItems={controlPanelSubItems}
        analyticsSubItems={analyticsSubItems}
        handleNavClick={handleNavClick}
        locale={locale}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </motion.header>
  );
};

export default Header;
