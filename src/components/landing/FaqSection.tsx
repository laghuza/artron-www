'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown, HelpCircle, Building2, UserCircle } from 'lucide-react';

interface FaqItem {
  id: number;
  category: 'b2b' | 'b2c';
  questionKey: string;
  answerKey: string;
}

export const FaqSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'b2b' | 'b2c'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FaqItem[] = [
    { id: 1, category: 'b2b', questionKey: 'faq_q1', answerKey: 'faq_a1' },
    { id: 2, category: 'b2b', questionKey: 'faq_q2', answerKey: 'faq_a2' },
    { id: 3, category: 'b2b', questionKey: 'faq_q3', answerKey: 'faq_a3' },
    { id: 4, category: 'b2b', questionKey: 'faq_q4', answerKey: 'faq_a4' },
    { id: 5, category: 'b2c', questionKey: 'faq_q5', answerKey: 'faq_a5' },
    { id: 6, category: 'b2c', questionKey: 'faq_q6', answerKey: 'faq_a6' },
    { id: 7, category: 'b2c', questionKey: 'faq_q7', answerKey: 'faq_a7' },
  ];

  const filteredItems = faqItems.filter(
    (item) => activeTab === 'all' || item.category === activeTab
  );

  const handleToggle = (id: number) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#0B0F17] via-[#0D121F] to-[#0B0F17]">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00A3FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/20 text-[#00ff87] text-xs font-mono font-bold mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#00ff87] drop-shadow-[0_0_8px_#00ff87]" />
            <span>FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t('faq_title')}
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            {t('faq_subtitle')}
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center p-1 bg-white/5 border border-white/10 rounded-xl max-w-md mx-auto mb-10 backdrop-blur-md">
          <button
            onClick={() => { setActiveTab('all'); setOpenIndex(null); }}
            className="flex-1 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#00ff87]"
            style={{ minHeight: '44px' }}
          >
            {activeTab === 'all' ? (
              <span className="bg-[#00ff87]/20 px-3 py-1 rounded-md text-[#00ff87] border border-[#00ff87]/30 w-full text-center">
                {t('faq_tab_all')}
              </span>
            ) : (
              <span className="text-[#94A3B8] hover:text-white px-3 py-1 w-full text-center">
                {t('faq_tab_all')}
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('b2b'); setOpenIndex(null); }}
            className="flex-1 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#00ff87]"
            style={{ minHeight: '44px' }}
          >
            {activeTab === 'b2b' ? (
              <span className="bg-[#00ff87]/20 px-3 py-1 rounded-md text-[#00ff87] border border-[#00ff87]/30 w-full flex items-center justify-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                B2B
              </span>
            ) : (
              <span className="text-[#94A3B8] hover:text-white px-3 py-1 w-full flex items-center justify-center gap-1">
                <Building2 className="w-3.5 h-3.5 opacity-60" />
                B2B
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('b2c'); setOpenIndex(null); }}
            className="flex-1 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#00ff87]"
            style={{ minHeight: '44px' }}
          >
            {activeTab === 'b2c' ? (
              <span className="bg-[#00ff87]/20 px-3 py-1 rounded-md text-[#00ff87] border border-[#00ff87]/30 w-full flex items-center justify-center gap-1">
                <UserCircle className="w-3.5 h-3.5" />
                B2C
              </span>
            ) : (
              <span className="text-[#94A3B8] hover:text-white px-3 py-1 w-full flex items-center justify-center gap-1">
                <UserCircle className="w-3.5 h-3.5 opacity-60" />
                B2C
              </span>
            )}
          </button>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isItemOpen = openIndex === item.id;
            return (
              <div
                key={item.id}
                className={`relative overflow-hidden bg-[#05070a]/85 border transition-all duration-300 rounded-2xl p-4 md:p-5 backdrop-blur-xl ${
                  isItemOpen
                    ? 'border-[#00ff87] bg-[#05070a]/95 shadow-lg shadow-[#00ff87]/5 pl-7'
                    : 'border-[#8a99ad]/10 hover:border-[#8a99ad]/30'
                }`}
              >
                {/* Active state emerald pulse vertical accent line */}
                {isItemOpen && (
                  <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#00ff87] animate-pulse" />
                )}

                {isItemOpen && (
                  <>
                    <div className="absolute top-2 left-2 text-[#00ff87]/35 font-mono text-[9px] pointer-events-none select-none">┌</div>
                    <div className="absolute top-2 right-2 text-[#00ff87]/35 font-mono text-[9px] pointer-events-none select-none">┐</div>
                    <div className="absolute bottom-2 left-2 text-[#00ff87]/35 font-mono text-[9px] pointer-events-none select-none">└</div>
                    <div className="absolute bottom-2 right-2 text-[#00ff87]/35 font-mono text-[9px] pointer-events-none select-none">┘</div>
                  </>
                )}

                <button
                  onClick={() => handleToggle(item.id)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                  style={{ minHeight: '44px' }}
                  aria-expanded={isItemOpen}
                >
                  <span className="font-bold text-white text-sm md:text-base leading-snug flex items-center gap-2">
                    {t(item.questionKey)}
                    <span className="text-[8px] font-mono text-[#00e5ff]/80 font-bold hidden sm:inline">[ FAQ_REF: #0{item.id} ]</span>
                  </span>
                  <div className={`p-1.5 rounded-lg bg-white/5 border border-white/10 text-white shrink-0 transition-transform duration-300 ${
                    isItemOpen ? 'rotate-180 text-[#00ff87] border-[#00ff87]/20 bg-[#00ff87]/10' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </button>

                {/* Animated height container */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isItemOpen ? 'grid-rows-[1fr] opacity-100 mt-4 border-t border-white/5 pt-4' : 'grid-rows-[0fr] opacity-0 h-0 overflow-hidden'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[#94A3B8] text-xs md:text-sm leading-relaxed">
                      {t(item.answerKey)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
