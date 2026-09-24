'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { FAQ_DATA, FaqItem } from './faqData';
import {
  FAQ_ITEMS_CONFIG,
  TOPIC_MAP,
  QC_COLORS,
  hexToRgba,
  FAQ_CONSOLE_UI,
  FaqCategory,
} from './faq/faqConstants';
import { FaqDesktopConsole } from './faq/FaqDesktopConsole';
import { FaqMobileDeck } from './faq/FaqMobileDeck';

export const FaqSection: React.FC = () => {
  const { locale } = useLanguage();
  const currentLang = locale === 'en' || locale === 'ru' ? locale : 'ka';
  const ui = FAQ_CONSOLE_UI[currentLang] || FAQ_CONSOLE_UI.ka;

  const [activeTab, setActiveTab] = useState<FaqCategory>('all');
  const [activeId, setActiveId] = useState<number>(1);
  const [shownId, setShownId] = useState<number>(1);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<Record<number, 'up' | 'down'>>({});
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive screen breakpoint
  useEffect(() => {
    const checkMob = () => setIsMobile(window.innerWidth < 1024);
    checkMob();
    window.addEventListener('resize', checkMob);
    return () => window.removeEventListener('resize', checkMob);
  }, []);

  // Filtered items
  const visibleItems = useMemo(() => {
    return FAQ_ITEMS_CONFIG.filter(
      (item) => activeTab === 'all' || item.cat === activeTab || item.cat === 'hybrid'
    )
      .map((config) => FAQ_DATA.find((d) => d.id === config.id))
      .filter((item): item is FaqItem => item !== undefined);
  }, [activeTab]);

  const activeColor = QC_COLORS[activeId] || '#5cc8ff';
  const currentAnswerItem = useMemo(
    () => FAQ_DATA.find((d) => d.id === shownId) || FAQ_DATA[0],
    [shownId]
  );

  // Select FAQ item
  const selectFaq = useCallback((id: number, skipScroll = false) => {
    setActiveId(id);
    setIsFading(true);
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    fadeTimeoutRef.current = setTimeout(() => {
      setShownId(id);
      setIsFading(false);
    }, 160);

    if (!skipScroll && typeof window !== 'undefined') {
      try {
        history.replaceState(null, '', `#faq-0${id}`);
      } catch {
        // Safe fallback
      }
    }
  }, []);

  // Sync hash on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hashMatch = window.location.hash.match(/faq-0?(\d+)/);
      if (hashMatch) {
        const id = Number(hashMatch[1]);
        if (TOPIC_MAP[id]) {
          selectFaq(id, true);
        }
      }
    }
  }, [selectFaq]);

  // Tab switch
  const handleTabChange = (tab: FaqCategory) => {
    setActiveTab(tab);
    const available = FAQ_ITEMS_CONFIG.filter(
      (i) => tab === 'all' || i.cat === tab || i.cat === 'hybrid'
    );
    const stillVisible = available.some((i) => i.id === activeId);
    const newId = stillVisible ? activeId : available[0]?.id || 1;
    selectFaq(newId);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      const delta =
        e.key === 'ArrowDown' || e.key === 'ArrowRight'
          ? 1
          : e.key === 'ArrowUp' || e.key === 'ArrowLeft'
          ? -1
          : 0;

      if (!delta) return;
      const idx = visibleItems.findIndex((it) => it.id === activeId);
      if (idx === -1) return;

      const nextIdx = Math.max(0, Math.min(visibleItems.length - 1, idx + delta));
      const nextItem = visibleItems[nextIdx];
      if (nextItem && nextItem.id !== activeId) {
        e.preventDefault();
        selectFaq(nextItem.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visibleItems, activeId, selectFaq]);

  // Copy link
  const handleCopyLink = (id: number) => {
    const url =
      typeof window !== 'undefined'
        ? `${window.location.origin}${window.location.pathname}#faq-0${id}`
        : `#faq-0${id}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedToast(true);
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        toastTimeoutRef.current = setTimeout(() => setCopiedToast(false), 2000);
      });
    }
  };

  const handleRate = (id: number, val: 'up' | 'down') => {
    setFeedback((prev) => ({ ...prev, [id]: val }));
  };

  return (
    <section
      id="faq"
      className="relative w-full overflow-hidden text-[#eef1f6] select-none py-4 md:py-5 lg:py-6"
      style={{
        background: `
          radial-gradient(ellipse 55% 50% at 76% 30%, rgba(38,64,140,.16), transparent 70%),
          radial-gradient(ellipse 45% 40% at 0% 100%, rgba(22,46,110,.14), transparent 65%),
          radial-gradient(ellipse 40% 30% at 20% 0%, rgba(60,50,120,.08), transparent 70%),
          linear-gradient(180deg,#0A0E14 0%,#06080C 100%)
        `,
      }}
    >
      {/* Dynamic ambient color glow from active topic */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at 72% 36%, ${hexToRgba(activeColor, 0.18)}, transparent 50%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 120% 90% at 50% 50%, transparent 55%, rgba(0,0,0,.55) 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isMobile ? (
          <FaqDesktopConsole
            ui={ui}
            currentLang={currentLang}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            visibleItems={visibleItems}
            activeId={activeId}
            shownId={shownId}
            onSelectFaq={selectFaq}
            isFading={isFading}
            activeColor={activeColor}
            currentAnswerItem={currentAnswerItem}
            onCopyLink={handleCopyLink}
            feedback={feedback}
            onRate={handleRate}
          />
        ) : (
          <FaqMobileDeck
            ui={ui}
            currentLang={currentLang}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            visibleItems={visibleItems}
            activeId={activeId}
            onSelectFaq={selectFaq}
            onCopyLink={handleCopyLink}
            feedback={feedback}
            onRate={handleRate}
          />
        )}
      </div>

      {/* Toast Notification when link is copied */}
      <div
        role="status"
        aria-live="polite"
        className="fixed left-1/2 top-6 z-50 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#12161e]/90 backdrop-blur-xl border border-white/10 shadow-2xl text-xs font-medium text-white transition-all duration-300 pointer-events-none"
        style={{
          opacity: copiedToast ? 1 : 0,
          transform: copiedToast ? 'translate(-50%, 0)' : 'translate(-50%, -10px)',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] shadow-[0_0_10px_#34d399]" />
        <span>{ui.copied}</span>
      </div>
    </section>
  );
};
