'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { audioManager } from '@/lib/audioManager';
import {
  Home,
  Layers,
  Calculator,
  CreditCard,
  Handshake,
  HelpCircle,
  Calendar,
  Info,
  ChevronUp,
} from 'lucide-react';

interface NavItem {
  id: string;
  href: string;
  labelKey?: string;
  fallbackLabel: { ka: string; en: string; ru: string };
  icon: React.ComponentType<{ className?: string }>;
  isPage?: boolean;
}

export const LeftFloatingNavDock: React.FC = () => {
  const { locale, t } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const navItems: NavItem[] = [
    {
      id: 'hero',
      href: '#hero',
      fallbackLabel: { ka: 'მთავარი', en: 'Home', ru: 'Главная' },
      icon: Home,
    },
    {
      id: 'services',
      href: '#services',
      labelKey: 'nav_ecosystem',
      fallbackLabel: { ka: 'ეკოსისტემა', en: 'Ecosystem', ru: 'Экосистема' },
      icon: Layers,
    },
    {
      id: 'roi',
      href: '#roi',
      labelKey: 'nav_roi',
      fallbackLabel: { ka: 'ROI კალკულატორი', en: 'ROI Calculator', ru: 'Калькулятор ROI' },
      icon: Calculator,
    },
    {
      id: 'pricing',
      href: '#pricing',
      labelKey: 'nav_pricing',
      fallbackLabel: { ka: 'ტარიფები', en: 'Pricing', ru: 'Тарифы' },
      icon: CreditCard,
    },
    {
      id: 'partner-ecosystem',
      href: '#partner-ecosystem',
      labelKey: 'nav_partners',
      fallbackLabel: { ka: 'პარტნიორობები', en: 'Partners', ru: 'Партнеры' },
      icon: Handshake,
    },
    {
      id: 'faq',
      href: '#faq',
      labelKey: 'nav_faq',
      fallbackLabel: { ka: 'FAQ', en: 'FAQ', ru: 'FAQ' },
      icon: HelpCircle,
    },
    {
      id: 'booking-engine',
      href: '#booking-engine',
      labelKey: 'nav_booking',
      fallbackLabel: { ka: 'დემო ჯავშანი', en: 'Book Demo', ru: 'Демо запись' },
      icon: Calendar,
    },
    {
      id: 'about',
      href: '/about',
      labelKey: 'about_title',
      fallbackLabel: { ka: 'ჩვენს შესახებ', en: 'About Us', ru: 'О нас' },
      icon: Info,
      isPage: true,
    },
  ];

  // ScrollSpy with IntersectionObserver & Scroll position fallback
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    // Show dock once user starts scrolling down
    setIsVisible(scrollY > 80);

    const sectionIds = ['hero', 'services', 'roi', 'pricing', 'partner-ecosystem', 'faq', 'booking-engine'];
    const scrollPosition = scrollY + 240;

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const id = sectionIds[i];
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        if (scrollPosition >= top) {
          setActiveSection(id);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (e: React.MouseEvent, item: NavItem) => {
    if (item.isPage) return;
    e.preventDefault();
    audioManager.playHapticClick();

    if (item.id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('hero');
      return;
    }

    const target = document.getElementById(item.id);
    if (target) {
      const navOffset = 75;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
      setActiveSection(item.id);
    }
  };

  const getLabel = (item: NavItem) => {
    if (item.labelKey) {
      const val = t(item.labelKey);
      if (val && val !== item.labelKey) return val;
    }
    const currentLoc = (locale as 'ka' | 'en' | 'ru') || 'ka';
    return item.fallbackLabel[currentLoc] || item.fallbackLabel.ka;
  };

  return (
    <aside
      aria-label="Quick Page Navigation"
      className={`fixed left-3 lg:left-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center transition-all duration-500 pointer-events-auto ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
      }`}
    >
      {/* Outer Glow Capsule */}
      <div className="relative flex flex-col items-center bg-[#0B0F17]/85 backdrop-blur-xl border border-white/10 hover:border-[#00A3FF]/40 p-1.5 sm:p-2 py-3 rounded-2xl shadow-[0_8px_32px_0_rgba(0,163,255,0.12)] transition-all duration-300 group">
        
        {/* Subtle Vertical Connector Guide Line */}
        <div className="absolute top-6 bottom-6 w-[1.5px] bg-gradient-to-b from-transparent via-white/10 to-transparent -z-10" />

        {/* Quick Top Jump Button */}
        <button
          onClick={(e) => scrollToSection(e, navItems[0])}
          className="w-7 h-7 mb-1.5 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-[#00A3FF] hover:bg-[#00A3FF]/10 transition-all duration-200 focus:outline-none"
          title={locale === 'ka' ? 'თავში დაბრუნება' : 'Back to top'}
          aria-label="Back to top"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        {/* Navigation Dots / Items */}
        <nav className="flex flex-col items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const isHovered = hoveredId === item.id;
            const label = getLabel(item);

            const content = (
              <div
                className={`relative w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'bg-[#00A3FF]/20 text-[#00A3FF] border border-[#00A3FF]/50 shadow-[0_0_12px_rgba(0,163,255,0.4)] scale-110'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5 hover:border-white/15 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />

                {/* Active Indicator Pulse Ring */}
                {isActive && (
                  <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-3 rounded-r-full bg-[#00A3FF] shadow-[0_0_8px_#00A3FF]" />
                )}

                {/* Hover Flyout Tooltip */}
                <div
                  role="tooltip"
                  className={`absolute left-full ml-3.5 px-3 py-1.5 rounded-xl bg-[#0D1322]/95 border border-[#00A3FF]/40 text-white text-xs font-semibold whitespace-nowrap shadow-[0_4px_20px_rgba(0,163,255,0.3)] backdrop-blur-md transition-all duration-200 pointer-events-none z-50 flex items-center gap-2 ${
                    isHovered
                      ? 'opacity-100 translate-x-0 visible'
                      : 'opacity-0 -translate-x-2 invisible'
                  }`}
                >
                  {/* Tooltip Arrow Pointer */}
                  <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-r-[6px] border-r-[#00A3FF]/40" />
                  
                  <span className={isActive ? 'text-[#00A3FF]' : 'text-white'}>
                    {label}
                  </span>
                  
                  {item.isPage && (
                    <span className="text-[9px] font-mono uppercase px-1 py-0.5 rounded bg-white/10 text-[#94A3B8]">
                      Page
                    </span>
                  )}
                </div>
              </div>
            );

            if (item.isPage) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="focus:outline-none rounded-xl"
                  aria-label={label}
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                onClick={(e) => scrollToSection(e, item)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="focus:outline-none rounded-xl"
                aria-label={label}
              >
                {content}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
