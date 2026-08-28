'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ChevronDown, Sparkles } from 'lucide-react';
import { useLanguage, Locale } from '@/context/LanguageContext';

export interface PS5LanguageOption {
  code: Locale;
  flag: string;
  name: string;
  region: string;
  nativeScript: string;
}

export const PS5_LANGUAGES: PS5LanguageOption[] = [
  {
    code: 'ka',
    flag: '🇬🇪',
    name: 'ქართული',
    region: 'საქართველო (Georgia)',
    nativeScript: 'ქართული ენა',
  },
  {
    code: 'en',
    flag: '🇺🇸',
    name: 'English',
    region: 'United States (Global)',
    nativeScript: 'English (US)',
  },
  {
    code: 'ru',
    flag: '🇷🇺',
    name: 'Русский',
    region: 'Региональный (RU)',
    nativeScript: 'Русский язык',
  },
];

interface PS5LanguageSelectorProps {
  className?: string;
  variant?: 'header' | 'mobile';
  onSelectCallback?: () => void;
}

export const PS5LanguageSelector: React.FC<PS5LanguageSelectorProps> = ({
  className = '',
  variant = 'header',
  onSelectCallback,
}) => {
  const { locale, setLocale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCode, setHoveredCode] = useState<Locale | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = PS5_LANGUAGES.find((l) => l.code === locale) || PS5_LANGUAGES[0];

  // Outside click & ESC key handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (code: Locale) => {
    setLocale(code);
    setIsOpen(false);
    if (onSelectCallback) onSelectCallback();
  };

  const handleMouseEnterOption = (code: Locale) => {
    if (hoveredCode !== code) {
      setHoveredCode(code);
    }
  };

  if (variant === 'mobile') {
    return (
      <div className={`flex flex-col gap-1.5 w-full ${className}`}>
        <div className="flex items-center justify-between px-1 mb-1">
          <span className="text-[10px] font-mono text-[#00A3FF] uppercase tracking-widest flex items-center gap-1.5 font-bold">
            <Globe className="w-3 h-3 text-[#00A3FF]" />
            {t('lang_selector') || 'SYSTEM LANGUAGE'}
          </span>
          <span className="text-[9px] font-mono text-slate-400">PS5 HUD</span>
        </div>
        <div className="flex flex-col rounded-2xl bg-[#080D18]/90 border border-white/[0.08] backdrop-blur-2xl overflow-hidden divide-y divide-white/[0.06]">
          {PS5_LANGUAGES.map((lang) => {
            const isSelected = locale === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang.code)}
                className={`relative flex items-center justify-between px-4 py-3 text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-white/[0.08] text-white shadow-[inset_0_0_16px_rgba(0,163,255,0.15)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center text-sm">
                    {lang.flag}
                  </div>
                  <div>
                    <div className="text-xs font-semibold tracking-wide text-white">
                      {lang.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {lang.region}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#00A3FF] px-1.5 py-0.5 rounded bg-[#00A3FF]/10 border border-[#00A3FF]/20">
                    {lang.code.toUpperCase()}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-[#00A3FF] bg-[#00A3FF] text-black shadow-[0_0_10px_#00E5FF]'
                        : 'border-white/20 bg-transparent text-transparent'
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative shrink-0 ${className}`} ref={dropdownRef}>
      {/* Trigger Button — PS5 Capsule */}
      <button
        id="ps5-language-switcher-btn"
        type="button"
        onClick={handleToggle}
        className={`relative flex items-center gap-1.5 sm:gap-2 h-8.5 px-2.5 sm:px-3 rounded-xl border backdrop-blur-xl transition-all duration-300 cursor-pointer select-none group shadow-[0_4px_16px_rgba(0,0,0,0.5)] ${
          isOpen
            ? 'bg-[#101827] border-[#00A3FF]/70 shadow-[0_0_20px_rgba(0,163,255,0.35)]'
            : 'bg-[#0B0F17]/90 hover:bg-[#121927] border-white/[0.12] hover:border-[#00A3FF]/60 hover:shadow-[0_0_16px_rgba(0,163,255,0.2)]'
        }`}
        aria-label="PlayStation 5 Language Selector"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {/* Glow ambient background aura on open */}
        {isOpen && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00A3FF]/15 to-[#00E5FF]/10 pointer-events-none" />
        )}

        <div className="flex items-center gap-1.5 relative z-10">
          <Globe
            className={`w-3.5 h-3.5 transition-transform duration-500 ${
              isOpen
                ? 'text-[#00E5FF] rotate-90 scale-110'
                : 'text-[#00A3FF] group-hover:rotate-45'
            }`}
          />
          <span className="text-xs">{currentLang.flag}</span>
          <span className="text-[11px] font-black uppercase tracking-wider text-white font-mono">
            {currentLang.code.toUpperCase()}
          </span>
        </div>

        <ChevronDown
          className={`w-3 h-3 text-[#94A3B8] transition-transform duration-300 relative z-10 ${
            isOpen ? 'rotate-180 text-[#00E5FF]' : 'group-hover:text-white'
          }`}
        />
      </button>

      {/* PS5 Airy Cinematic Floating Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="listbox"
            aria-label="PS5 System Language Selection"
            initial={{ opacity: 0, scale: 0.94, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -8 }}
            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            className="absolute right-0 top-full mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-white/[0.14] bg-[#070B14]/96 p-3 backdrop-blur-3xl shadow-[0_25px_65px_rgba(0,0,0,0.9),0_0_35px_rgba(0,163,255,0.15)] z-[85] overflow-hidden"
          >
            {/* Cinematic Floating Bokeh / Dust Aura (PS5 signature) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
              <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#00A3FF]/15 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[#00E676]/10 blur-2xl" />
              
              {/* Floating Micro Bokeh Sparks */}
              <div className="absolute top-4 left-1/4 w-1 h-1 rounded-full bg-amber-200/40 blur-[0.5px] animate-pulse" />
              <div className="absolute top-1/2 right-6 w-1.5 h-1.5 rounded-full bg-white/30 blur-[1px] animate-ping" />
              <div className="absolute bottom-8 left-8 w-1 h-1 rounded-full bg-[#00E5FF]/40 blur-[0.5px]" />
            </div>

            {/* Top HUD Header */}
            <div className="px-2 pb-2.5 mb-1 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#00E5FF]" />
                <span className="text-[9.5px] font-mono font-black uppercase tracking-[0.18em] text-[#00A3FF]">
                  SYSTEM LANGUAGE
                </span>
              </div>
              <span className="text-[8.5px] font-mono text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 uppercase tracking-wider">
                ● LIVE HOT-SWAP
              </span>
            </div>

            {/* Language Options List */}
            <div className="flex flex-col gap-1 relative">
              {PS5_LANGUAGES.map((lang) => {
                const isSelected = locale === lang.code;
                const isHovered = hoveredCode === lang.code;

                return (
                  <button
                    key={lang.code}
                    role="option"
                    data-testid={`ps5-lang-option-${lang.code}`}
                    aria-selected={isSelected}
                    onClick={() => handleSelect(lang.code)}
                    onMouseEnter={() => handleMouseEnterOption(lang.code)}
                    onMouseLeave={() => setHoveredCode(null)}
                    className="relative w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors duration-150 cursor-pointer text-left select-none group/item"
                  >
                    {/* PS5 Luminous Focus Frame (Spring Layout Transition) */}
                    {isSelected && (
                      <motion.div
                        layoutId="ps5-active-lang-frame"
                        className="absolute inset-0 rounded-xl border border-white/40 bg-white/[0.08] backdrop-blur-md shadow-[0_0_24px_rgba(255,255,255,0.12),inset_0_0_14px_rgba(255,255,255,0.04)]"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                      />
                    )}

                    {/* Hover indicator when not selected */}
                    {!isSelected && isHovered && (
                      <motion.div
                        layoutId="ps5-hover-lang-frame"
                        className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.04]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12 }}
                      />
                    )}

                    {/* Left: Checkmark + Language Details */}
                    <div className="relative z-10 flex items-center gap-3 min-w-0">
                      {/* PS5 Glowing Checkmark */}
                      <div
                        className={`w-5 h-5 flex items-center justify-center shrink-0 transition-all duration-200 ${
                          isSelected
                            ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                            : 'text-transparent opacity-0'
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </div>

                      {/* Flag and Language Name */}
                      <span className="text-base shrink-0 leading-none">{lang.flag}</span>
                      <div className="flex flex-col min-w-0">
                        <span
                          className={`text-xs tracking-wide transition-colors duration-150 truncate ${
                            isSelected
                              ? 'text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]'
                              : 'text-slate-300 font-medium group-hover/item:text-white'
                          }`}
                        >
                          {lang.name}
                        </span>
                        <span className="text-[9.5px] text-[#94A3B8] font-mono tracking-tight truncate">
                          {lang.region}
                        </span>
                      </div>
                    </div>

                    {/* Right: Code Badge */}
                    <div className="relative z-10 shrink-0 ml-2">
                      <span
                        className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-md border transition-all ${
                          isSelected
                            ? 'bg-[#00A3FF]/20 border-[#00A3FF]/60 text-[#00E5FF] shadow-[0_0_10px_rgba(0,163,255,0.3)]'
                            : 'bg-white/[0.04] border-white/10 text-slate-400 group-hover/item:text-slate-200'
                        }`}
                      >
                        {lang.code.toUpperCase()}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PS5LanguageSelector;
