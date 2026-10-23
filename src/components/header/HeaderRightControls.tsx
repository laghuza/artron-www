'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Menu, X } from 'lucide-react';
import { audioManager } from '@/lib/audioManager';
import PS5LanguageSelector from '@/components/navigation/PS5LanguageSelector';

interface HeaderRightControlsProps {
  showBackToHome?: boolean;
  onBack?: () => void;
  backHref?: string;
  locale: string;
  router: any;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  kinematicsLang: {
    x: any;
    y: any;
    rotate: any;
    scale: any;
    opacity: any;
  };
}

export const HeaderRightControls: React.FC<HeaderRightControlsProps> = React.memo(({
  showBackToHome = false,
  onBack,
  backHref,
  locale,
  router,
  isMobileMenuOpen,
  onToggleMobileMenu,
  kinematicsLang,
}) => {
  return (
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
      ) : null}

      {/* ══ PS5 AIRY LANGUAGE SWITCHER — Reverse Kinetic from Letter O trajectory ══ */}
      <motion.div
        style={{
          x: kinematicsLang.x,
          y: kinematicsLang.y,
          rotate: kinematicsLang.rotate,
          scale: kinematicsLang.scale,
          opacity: kinematicsLang.opacity,
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
            onToggleMobileMenu();
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
  );
});

HeaderRightControls.displayName = 'HeaderRightControls';
