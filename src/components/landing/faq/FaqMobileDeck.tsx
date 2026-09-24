'use client';

import React, { useRef } from 'react';
import { Link2 } from 'lucide-react';
import { FaqItem } from '../faqData';
import {
  TOPIC_MAP,
  QC_COLORS,
  hexToRgba,
  FAQ_CONSOLE_UI,
  FaqCategory,
} from './faqConstants';
import { FaqThreeViewer } from './FaqThreeViewer';

interface FaqMobileDeckProps {
  ui: typeof FAQ_CONSOLE_UI.ka;
  currentLang: 'ka' | 'en' | 'ru';
  activeTab: FaqCategory;
  onTabChange: (tab: FaqCategory) => void;
  visibleItems: FaqItem[];
  activeId: number;
  onSelectFaq: (id: number, skipScroll?: boolean) => void;
  onCopyLink: (id: number) => void;
  feedback: Record<number, 'up' | 'down'>;
  onRate: (id: number, val: 'up' | 'down') => void;
}

export const FaqMobileDeck: React.FC<FaqMobileDeckProps> = ({
  ui,
  currentLang,
  activeTab,
  onTabChange,
  visibleItems,
  activeId,
  onSelectFaq,
  onCopyLink,
  feedback,
  onRate,
}) => {
  const deckRef = useRef<HTMLDivElement>(null);

  const handleDeckScroll = () => {
    const el = deckRef.current;
    if (!el) return;
    const midX = el.scrollLeft + el.clientWidth / 2;
    const cards = el.querySelectorAll<HTMLElement>('[data-card-id]');
    let closestId = activeId;
    let minDist = Infinity;
    cards.forEach((card) => {
      const cardMid = card.offsetLeft + card.clientWidth / 2;
      const dist = Math.abs(cardMid - midX);
      if (dist < minDist) {
        minDist = dist;
        closestId = Number(card.getAttribute('data-card-id'));
      }
    });
    if (closestId && closestId !== activeId) {
      onSelectFaq(closestId, true);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-1 text-center">
        <span className="text-[11px] font-semibold tracking-wider text-[#8d96a6] uppercase font-mono">
          {ui.eyebrow}
        </span>
        <h2 className="text-xl font-bold tracking-tight text-white leading-tight">
          {ui.title}
        </h2>
      </header>

      {/* 3D Viewer on Mobile - Compact Ergonomic View */}
      <div className="relative w-full h-[140px] rounded-2xl overflow-hidden bg-black/20 border border-white/5">
        <div className="absolute inset-0">
          <FaqThreeViewer activeId={activeId} />
        </div>
      </div>

      {/* Mobile Category Tabs */}
      <div role="tablist" aria-label={ui.eyebrow} className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {(['all', 'b2b', 'b2c'] as FaqCategory[]).map((tabKey) => {
          const isActive = activeTab === tabKey;
          return (
            <button
              key={tabKey}
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tabKey)}
              className="shrink-0 min-h-[34px] px-3.5 rounded-full flex items-center gap-1.5 text-xs font-medium cursor-pointer"
              style={{
                background: isActive ? '#f4f6fa' : 'rgba(255,255,255,.05)',
                color: isActive ? '#0a0d16' : '#b4bcc9',
                boxShadow: isActive ? '0 0 16px rgba(160,190,255,.25)' : 'none',
              }}
            >
              <span>{ui[tabKey]}</span>
              {tabKey !== 'all' && (
                <span className="font-mono text-[10px] opacity-60">
                  {tabKey.toUpperCase()}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Horizontal Swipable Cards */}
      <div
        ref={deckRef}
        onScroll={handleDeckScroll}
        className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory py-1.5 -mx-4 px-4 scrollbar-none"
      >
        {visibleItems.map((item) => {
          const isCurrent = item.id === activeId;
          const itemColor = QC_COLORS[item.id] || '#5cc8ff';
          return (
            <article
              key={item.id}
              data-card-id={item.id}
              onClick={() => onSelectFaq(item.id)}
              className="shrink-0 w-[84vw] max-w-[340px] snap-center rounded-[20px] p-4.5 flex flex-col justify-between transition-all duration-300 cursor-pointer"
              style={{
                background:
                  'linear-gradient(160deg, rgba(255,255,255,.08), rgba(255,255,255,.025))',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow: isCurrent
                  ? `0 0 0 1.5px rgba(255,255,255,.9), 0 0 30px ${hexToRgba(itemColor, 0.35)}, 0 16px 40px rgba(0,0,0,.6)`
                  : 'inset 0 1px 0 rgba(255,255,255,.08)',
                opacity: isCurrent ? 1 : 0.6,
                transform: isCurrent ? 'scale(1)' : 'scale(.96)',
              }}
            >
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono text-[#8d96a6]">
                  {ui.topics[TOPIC_MAP[item.id] || 'turnstile']}
                </span>
                <h3 className="m-0 text-[15px] font-semibold text-white leading-snug">
                  {item.q[currentLang]}
                </h3>
                <p className="m-0 text-xs leading-relaxed text-[#c9cfd9]">
                  {item.a[currentLang]}
                </p>
                <ul className="m-0 p-0 list-none flex flex-col gap-1.5 pt-1">
                  {item.points[currentLang]?.map((pt, idx) => (
                    <li
                      key={idx}
                      className="grid grid-cols-[5px_minmax(0,1fr)] gap-2 items-baseline text-xs text-[#9aa3b2]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: itemColor }} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <span className="pt-2 font-mono text-[10px] text-[#8d96a6]">
                  {item.basis[currentLang]}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCopyLink(item.id);
                  }}
                  aria-label={ui.copy}
                  className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-xs text-[#a1a1aa]"
                >
                  <Link2 className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2 text-xs text-[#8d96a6]">
                  {feedback[item.id] ? (
                    <span className="text-xs text-[#c4cad4]">{ui.thanks}</span>
                  ) : (
                    <>
                      <span>{ui.helpful}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRate(item.id, 'up');
                        }}
                        className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-xs"
                      >
                        👍
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRate(item.id, 'down');
                        }}
                        className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-xs"
                      >
                        👎
                      </button>
                    </>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Pagination Indicators */}
      <div className="flex items-center justify-center gap-1.5 py-1">
        {visibleItems.map((item) => (
          <span
            key={item.id}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: item.id === activeId ? '20px' : '6px',
              background: item.id === activeId ? '#ffffff' : 'rgba(255,255,255,.22)',
            }}
          />
        ))}
      </div>
    </div>
  );
};
