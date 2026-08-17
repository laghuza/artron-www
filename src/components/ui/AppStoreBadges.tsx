'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, CheckCircle2, Info } from 'lucide-react';

interface AppStoreBadgesProps {
  variant?: 'hero' | 'default' | 'compact';
  align?: 'left' | 'center' | 'right';
  showIndicator?: boolean;
  className?: string;
}

export const AppStoreBadges: React.FC<AppStoreBadgesProps> = ({
  variant = 'default',
  align = 'center',
  showIndicator = true,
  className = '',
}) => {
  const { t } = useLanguage();
  const [showNotice, setShowNotice] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowNotice(true);
    setTimeout(() => {
      setShowNotice(false);
    }, 4000);
  };

  const alignClass = 
    align === 'left' 
      ? 'items-start text-left' 
      : align === 'right' 
        ? 'items-end text-right' 
        : 'items-center text-center';

  const flexJustify = 
    align === 'left' 
      ? 'justify-start' 
      : align === 'right' 
        ? 'justify-end' 
        : 'justify-center';

  return (
    <div className={`relative flex flex-col ${alignClass} gap-2.5 ${className}`}>
      {/* Live Coming Soon & Review Status Indicator */}
      {showIndicator && (
        <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/25 text-[10px] font-mono font-bold text-[#00ff87] tracking-wider uppercase backdrop-blur-md shadow-[0_0_12px_rgba(0,255,135,0.12)] ${flexJustify}`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff87] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff87]"></span>
          </span>
          <span>{t('store_coming_soon_badge')}</span>
          <span className="text-white/30 hidden sm:inline">|</span>
          <span className="text-[#94A3B8] text-[9px] font-mono hidden sm:inline">{t('store_status_pill')}</span>
        </div>
      )}

      {/* Badges Container */}
      <div className={`flex flex-wrap items-center gap-3 ${flexJustify}`}>
        {/* Apple App Store Badge */}
        <button
          type="button"
          onClick={handleClick}
          aria-label="Download on Apple App Store (Coming Soon)"
          className="group relative inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#05070a]/90 hover:bg-[#0c1017] border border-[#8a99ad]/20 hover:border-[#00ff87]/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(0,255,135,0.18)] hover:-translate-y-0.5 active:scale-95 cursor-pointer overflow-hidden"
          style={{ minHeight: '44px' }}
        >
          {/* Subtle Top Glow Gradient on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Apple SVG Logo */}
          <svg
            viewBox="0 0 384 512"
            className="w-5 h-5 fill-white text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-transform duration-300 group-hover:scale-110 shrink-0"
            aria-hidden="true"
          >
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
          </svg>

          {/* Text Labels */}
          <div className="flex flex-col items-start leading-none text-left">
            <span className="text-[9px] font-sans font-medium text-[#94A3B8] tracking-wider uppercase">
              {t('store_app_store_sub')}
            </span>
            <span className="text-sm font-bold text-white tracking-tight mt-0.5 font-sans group-hover:text-[#00ff87] transition-colors">
              {t('store_app_store_name')}
            </span>
          </div>

          {/* Mini Status Tag */}
          <span className="text-[8px] font-mono font-bold text-[#00ff87] bg-[#00ff87]/15 border border-[#00ff87]/30 px-1.5 py-0.5 rounded ml-1 uppercase">
            SOON
          </span>
        </button>

        {/* Google Play Store Badge */}
        <button
          type="button"
          onClick={handleClick}
          aria-label="Get it on Google Play (Coming Soon)"
          className="group relative inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#05070a]/90 hover:bg-[#0c1017] border border-[#8a99ad]/20 hover:border-[#00e5ff]/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.18)] hover:-translate-y-0.5 active:scale-95 cursor-pointer overflow-hidden"
          style={{ minHeight: '44px' }}
        >
          {/* Subtle Top Glow Gradient on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Google Play Colorful SVG Logo */}
          <svg
            viewBox="0 0 512 512"
            className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          >
            <path
              d="M325.3 234.3L104.6 13l280.8 161.2-60.1 59.9z"
              fill="#00e5ff"
            />
            <path
              d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z"
              fill="#00A3FF"
            />
            <path
              d="M325.3 277.7l60.1 60.1L104.6 499l220.7-221.3z"
              fill="#00ff87"
            />
            <path
              d="M486.8 230.1L385.4 172.2 325.3 234.3l60.1 60.1 101.4-58c14.2-8.1 23.2-22.6 23.2-38.1 0-15.6-9-30.1-23.2-38.2z"
              fill="#ffd15c"
            />
          </svg>

          {/* Text Labels */}
          <div className="flex flex-col items-start leading-none text-left">
            <span className="text-[9px] font-sans font-medium text-[#94A3B8] tracking-wider uppercase">
              {t('store_google_play_sub')}
            </span>
            <span className="text-sm font-bold text-white tracking-tight mt-0.5 font-sans group-hover:text-[#00e5ff] transition-colors">
              {t('store_google_play_name')}
            </span>
          </div>

          {/* Mini Status Tag */}
          <span className="text-[8px] font-mono font-bold text-[#00e5ff] bg-[#00e5ff]/15 border border-[#00e5ff]/30 px-1.5 py-0.5 rounded ml-1 uppercase">
            SOON
          </span>
        </button>
      </div>

      {/* Review & Launch Info Toast Notification */}
      {showNotice && (
        <div className="animate-fadeIn mt-1 p-2.5 rounded-xl bg-[#121722]/95 border border-[#00ff87]/30 text-white shadow-xl max-w-sm flex items-center gap-2.5 text-xs backdrop-blur-md">
          <div className="w-6 h-6 rounded-full bg-[#00ff87]/20 border border-[#00ff87]/40 flex items-center justify-center text-[#00ff87] shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <div className="leading-snug">
            <span className="font-bold text-[#00ff87] block text-[11px] font-mono">
              [ APP STORE & GOOGLE PLAY REVIEW ]
            </span>
            <span className="text-[10px] text-[#94A3B8]">
              {t('store_review_info')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
