'use client';

import React from 'react';
import { Link2 } from 'lucide-react';
import { FaqItem } from '../faqData';
import {
  QC_COLORS,
  hexToRgba,
  FAQ_CONSOLE_UI,
  FaqCategory,
} from './faqConstants';
import { FaqThreeViewer } from './FaqThreeViewer';

interface FaqDesktopConsoleProps {
  ui: typeof FAQ_CONSOLE_UI.ka;
  currentLang: 'ka' | 'en' | 'ru';
  activeTab: FaqCategory;
  onTabChange: (tab: FaqCategory) => void;
  visibleItems: FaqItem[];
  activeId: number;
  shownId: number;
  onSelectFaq: (id: number) => void;
  isFading: boolean;
  activeColor: string;
  currentAnswerItem: FaqItem;
  onCopyLink: (id: number) => void;
  feedback: Record<number, 'up' | 'down'>;
  onRate: (id: number, val: 'up' | 'down') => void;
}

export const FaqDesktopConsole: React.FC<FaqDesktopConsoleProps> = ({
  ui,
  currentLang,
  activeTab,
  onTabChange,
  visibleItems,
  activeId,
  shownId,
  onSelectFaq,
  isFading,
  activeColor,
  currentAnswerItem,
  onCopyLink,
  feedback,
  onRate,
}) => {
  return (
    <div className="relative min-h-[440px] grid grid-cols-1 lg:grid-cols-[44%_56%] gap-6 lg:gap-8 items-start">
      {/* LEFT COLUMN: Header, Tabs, Question Nav, SLA */}
      <section aria-labelledby="faq-title" className="flex flex-col gap-3 py-1 pr-2 lg:pr-5 min-h-0">
        <header className="flex flex-col gap-1">
          <span className="text-[10.5px] font-semibold tracking-wider text-[#8d96a6] uppercase font-mono">
            {ui.eyebrow}
          </span>
          <h2 id="faq-title" className="m-0 text-xl lg:text-2xl font-bold tracking-tight text-white leading-tight">
            {ui.title}
          </h2>
        </header>

        {/* Category Filter Tabs */}
        <div role="tablist" aria-label={ui.eyebrow} className="flex gap-2 flex-wrap">
          {(['all', 'b2b', 'b2c'] as FaqCategory[]).map((tabKey) => {
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(tabKey)}
                className={`min-h-[30px] px-3.5 rounded-full flex items-center gap-1.5 text-[11.5px] font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'gold-rim-tab-active shadow-[0_0_16px_rgba(212,175,55,0.35)]'
                    : 'gold-rim-pill text-[#a6b0bf] hover:text-white'
                }`}
              >
                <span>{ui[tabKey]}</span>
                {tabKey !== 'all' && (
                  <span className={`font-mono text-[9.5px] ${isActive ? 'text-[#FFE89E]' : 'opacity-60'}`}>
                    {tabKey.toUpperCase()}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Navigation questions list */}
        <nav aria-label={ui.eyebrow} className="flex flex-col gap-2 max-h-[330px] overflow-y-auto pr-1.5 -mr-1.5 scrollbar-thin scrollbar-thumb-white/10">
          {visibleItems.map((item) => {
            const isSelected = item.id === activeId;
            return (
              <button
                key={item.id}
                data-id={item.id}
                onClick={() => onSelectFaq(item.id)}
                onFocus={() => onSelectFaq(item.id)}
                className={`group relative w-full h-auto shrink-0 text-left cursor-pointer font-sans grid grid-cols-[8px_minmax(0,1fr)] items-center gap-2.5 px-3.5 py-2.5 rounded-[13px] text-[13px] lg:text-[13.5px] leading-snug transition-all duration-200 overflow-hidden ${
                  isSelected ? 'gold-rim-question-item-active text-white font-semibold' : 'gold-rim-question-item text-[#c2c8d2]'
                }`}
              >
                {/* Subtle top rim light on selected */}
                {isSelected && (
                  <div
                    aria-hidden="true"
                    className="absolute top-0 left-4 right-4 h-[1px] opacity-70 pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                    }}
                  />
                )}
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: isSelected ? '#D4AF37' : 'rgba(212,175,55,0.4)',
                    boxShadow: isSelected ? '0 0 8px #D4AF37, 0 0 14px rgba(212,175,55,0.7)' : 'none',
                    transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
                <span className="transition-colors duration-200 group-hover:text-white">
                  {item.q[currentLang]}
                </span>
              </button>
            );
          })}
        </nav>
      </section>

      {/* RIGHT COLUMN: 3D Scene + Floating Glass Answer Card */}
      <section aria-live="polite" className="relative flex flex-col justify-start py-1 pl-2 lg:pl-5 min-h-0">
        {/* 3D Canvas Box - Expanded for prominent, beautiful visuals */}
        <div className="relative w-full h-[215px] lg:h-[240px] shrink-0">
          <div className="absolute inset-0">
            <FaqThreeViewer activeId={activeId} />
          </div>
        </div>

        {/* Compact Gold Rim Glass Answer Card */}
        <article
          className="gold-rim-card relative mt-2 p-3.5 sm:p-4 lg:p-4.5 rounded-[18px] overflow-hidden"
        >
          {/* Top gloss rim line (Specular Silver/White reflection) */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-6 right-6 h-[1px] opacity-85 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)',
            }}
          />

          {/* Bottom Gold Rim Metallic Glow Line */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-6 right-6 h-[1.5px] opacity-95 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, #A87B41, #D4AF37, #FFE89E, #D4AF37, #A87B41, transparent)',
              boxShadow: '0 -2px 12px rgba(212, 175, 55, 0.5)',
            }}
          />

          <div
            className="flex flex-col gap-2 lg:gap-2.5 transition-all duration-300"
            style={{
              opacity: isFading ? 0 : 1,
              transform: isFading ? 'translateY(4px)' : 'translateY(0)',
            }}
          >
            <div className="flex justify-between items-start gap-3">
              <h3 className="m-0 text-sm lg:text-[15px] font-semibold text-white leading-snug">
                {currentAnswerItem.q[currentLang]}
              </h3>
              <button
                onClick={() => onCopyLink(currentAnswerItem.id)}
                aria-label={ui.copy}
                className="shrink-0 flex items-center gap-1.5 min-h-[26px] px-2.5 rounded-full gold-rim-pill active:scale-95 text-[10.5px] text-[#c2c8d2] hover:text-white transition-all cursor-pointer"
              >
                <Link2 className="w-2.5 h-2.5 text-[#D4AF37]" />
                <span>{ui.copy}</span>
              </button>
            </div>

            <p className="m-0 text-[11.5px] lg:text-[12.5px] leading-relaxed text-[#c2c8d2]">
              {currentAnswerItem.a[currentLang]}
            </p>

            {/* Bullet points */}
            <ul className="m-0 p-0 list-none flex flex-col gap-1">
              {currentAnswerItem.points[currentLang]?.map((pt, idx) => (
                <li
                  key={idx}
                  className="grid grid-cols-[5px_minmax(0,1fr)] gap-2 items-baseline text-[11px] lg:text-[11.5px] leading-snug text-[#9aa3b2]"
                >
                  <span className="w-1.5 h-1.5 rounded-full mt-0.5 bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.6)]" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            {/* Footer: Basis + Feedback */}
            <div className="flex justify-between items-center gap-3 flex-wrap pt-2 border-t border-white/10 text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[#8d96a6] text-[10.5px]">{ui.basis}</span>
                <span className="font-mono text-[#e5e9f0] text-[10.5px]">{currentAnswerItem.basis[currentLang]}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {feedback[currentAnswerItem.id] ? (
                  <span className="text-[11px] text-[#c4cad4] transition-all">{ui.thanks}</span>
                ) : (
                  <div className="flex items-center gap-1.5 text-[#8d96a6] text-[10.5px]">
                    <span>{ui.helpful}</span>
                    <button
                      onClick={() => onRate(currentAnswerItem.id, 'up')}
                      aria-label="Helpful"
                      className="w-5 h-5 rounded-full gold-rim-pill flex items-center justify-center cursor-pointer text-[10px] transition-transform active:scale-90"
                    >
                      👍
                    </button>
                    <button
                      onClick={() => onRate(currentAnswerItem.id, 'down')}
                      aria-label="Not helpful"
                      className="w-5 h-5 rounded-full gold-rim-pill flex items-center justify-center cursor-pointer text-[10px] transition-transform active:scale-90"
                    >
                      👎
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};
