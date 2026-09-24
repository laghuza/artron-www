'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown, HelpCircle, Building2, UserCircle, Search, Copy, Check, Bot, Layers, Sparkles } from 'lucide-react';
import { FAQ_DATA, FaqItem } from './faqData';

export const FaqSection: React.FC = () => {
  const { t, locale } = useLanguage();
  const currentLang = (locale === 'en' || locale === 'ru') ? locale : 'ka';

  const [activeTab, setActiveTab] = useState<'all' | 'b2b' | 'b2c'>('all');
  const [openId, setOpenId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Tab counts
  const counts = useMemo(() => ({
    all: FAQ_DATA.length,
    b2b: FAQ_DATA.filter((i) => i.category === 'b2b' || i.category === 'hybrid').length,
    b2c: FAQ_DATA.filter((i) => i.category === 'b2c' || i.category === 'hybrid').length,
  }), []);

  // Filtered FAQ list by category and search keywords
  const filteredItems = useMemo(() => {
    const qLower = searchQuery.trim().toLowerCase();

    return FAQ_DATA.filter((item) => {
      // Category filter
      const matchesCategory =
        activeTab === 'all' ||
        item.category === activeTab ||
        item.category === 'hybrid';

      if (!matchesCategory) return false;
      if (!qLower) return true;

      // Text search in question, answer, basis and keywords
      const questionText = item.q[currentLang]?.toLowerCase() || '';
      const answerText = item.a[currentLang]?.toLowerCase() || '';
      const basisText = item.basis[currentLang]?.toLowerCase() || '';
      const keywordMatch = item.keywords.some((kw) => kw.toLowerCase().includes(qLower));

      return (
        questionText.includes(qLower) ||
        answerText.includes(qLower) ||
        basisText.includes(qLower) ||
        keywordMatch
      );
    });
  }, [activeTab, searchQuery, currentLang]);

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleCopy = (e: React.MouseEvent, id: number, text: string) => {
    e.stopPropagation();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleAskBot = (customPrompt?: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('artron-open-chatbot', {
          detail: { prompt: customPrompt || searchQuery || undefined },
        })
      );
    }
  };

  const getCategoryLabel = (category: FaqItem['category']) => {
    if (category === 'b2b') return currentLang === 'en' ? 'B2B · Gym' : currentLang === 'ru' ? 'B2B · Зал' : 'B2B · დარბაზი';
    if (category === 'b2c') return currentLang === 'en' ? 'B2C · Athlete' : currentLang === 'ru' ? 'B2C · Спортсмен' : 'B2C · სპორტსმენი';
    return currentLang === 'en' ? 'B2B + B2C' : currentLang === 'ru' ? 'B2B + B2C' : 'B2B + B2C ჰიბრიდი';
  };

  return (
    <section id="faq" className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#0B0F17] via-[#0D121F] to-[#0B0F17]">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#00A3FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/25 text-[#00ff87] text-xs font-mono font-bold mb-4 shadow-[0_0_15px_rgba(0,255,135,0.15)]">
            <HelpCircle className="w-3.5 h-3.5 text-[#00ff87] drop-shadow-[0_0_8px_#00ff87]" />
            <span>[ FAQ ] {t('faq_eyebrow')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t('faq_title')}
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            {t('faq_subtitle')}
          </p>
        </div>

        {/* Filter Controls Bar: Tabs & Live Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8">
          {/* Category Tabs */}
          <div className="inline-flex p-1 bg-[#05070A]/80 border border-white/10 rounded-xl backdrop-blur-md">
            <button
              onClick={() => { setActiveTab('all'); setOpenId(null); }}
              className={`px-3.5 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87]/30 shadow-[0_0_12px_rgba(0,255,135,0.2)]'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
              style={{ minHeight: '40px' }}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t('faq_tab_all')}</span>
              <span className="text-[11px] font-mono opacity-70">({counts.all})</span>
            </button>

            <button
              onClick={() => { setActiveTab('b2b'); setOpenId(null); }}
              className={`px-3.5 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'b2b'
                  ? 'bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87]/30 shadow-[0_0_12px_rgba(0,255,135,0.2)]'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
              style={{ minHeight: '40px' }}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{t('faq_tab_b2b')}</span>
              <span className="text-[11px] font-mono opacity-70">({counts.b2b})</span>
            </button>

            <button
              onClick={() => { setActiveTab('b2c'); setOpenId(null); }}
              className={`px-3.5 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'b2c'
                  ? 'bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87]/30 shadow-[0_0_12px_rgba(0,255,135,0.2)]'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
              style={{ minHeight: '40px' }}
            >
              <UserCircle className="w-3.5 h-3.5" />
              <span>{t('faq_tab_b2c')}</span>
              <span className="text-[11px] font-mono opacity-70">({counts.b2c})</span>
            </button>
          </div>

          {/* Cyber Live Search */}
          <div className="relative flex-1 max-w-full sm:max-w-xs">
            <div className="flex items-center gap-2 h-11 px-3 bg-[#0A0E13] border border-white/10 rounded-xl focus-within:border-[#00ff87]/50 focus-within:shadow-[0_0_15px_rgba(0,255,135,0.15)] transition-all">
              <span className="text-[#00ff87] font-mono text-xs font-bold shrink-0">&gt;_</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('faq_search_placeholder')}
                className="w-full bg-transparent text-white text-xs md:text-sm placeholder-[#6B7580] outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-white text-xs font-mono px-1 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-3.5">
          {filteredItems.map((item) => {
            const isOpen = openId === item.id;
            const qText = item.q[currentLang];
            const aText = item.a[currentLang];
            const pointsList = item.points[currentLang] || [];
            const basisText = item.basis[currentLang];

            return (
              <div
                key={item.id}
                id={`faq-ref-${item.id}`}
                className={`relative overflow-hidden bg-[#0A0E13]/90 border transition-all duration-300 rounded-2xl p-4 md:p-5 backdrop-blur-xl group ${
                  isOpen
                    ? 'border-[#00ff87] bg-[#05070A]/95 shadow-[0_0_30px_rgba(0,255,135,0.12)] pl-6 md:pl-7'
                    : 'border-white/10 hover:border-[#00A3FF]/40 hover:shadow-[0_0_20px_rgba(0,163,255,0.08)]'
                }`}
              >
                {/* Cyber Corner Brackets */}
                <span className={`absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 transition-colors ${isOpen ? 'border-[#00ff87]' : 'border-[#00A3FF]/30 group-hover:border-[#00A3FF]'}`} />
                <span className={`absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 transition-colors ${isOpen ? 'border-[#00ff87]' : 'border-[#00A3FF]/30 group-hover:border-[#00A3FF]'}`} />
                <span className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 transition-colors ${isOpen ? 'border-[#00ff87]' : 'border-[#00A3FF]/30 group-hover:border-[#00A3FF]'}`} />
                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 transition-colors ${isOpen ? 'border-[#00ff87]' : 'border-[#00A3FF]/30 group-hover:border-[#00A3FF]'}`} />

                {/* Active Emerald Pulse Line */}
                {isOpen && (
                  <span className="absolute left-0 top-3 bottom-3 w-[3px] bg-[#00ff87] rounded-r shadow-[0_0_10px_#00ff87] animate-pulse" />
                )}

                {/* Question Trigger Header */}
                <button
                  onClick={() => handleToggle(item.id)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                  style={{ minHeight: '44px' }}
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 flex-1 min-w-0">
                    {/* Metadata chips */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-[#00ff87] font-semibold tracking-wider">
                        [ FAQ_REF: {item.refCode} ]
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/5 text-[#94A3B8] border border-white/10">
                        {getCategoryLabel(item.category)}
                      </span>
                    </div>

                    <span className="font-bold text-white text-sm md:text-base leading-snug">
                      {qText}
                    </span>
                  </div>

                  <div className={`p-1.5 rounded-lg bg-white/5 border border-white/10 text-white shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-[#00ff87] border-[#00ff87]/30 bg-[#00ff87]/10' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </button>

                {/* Expandable Rich Content */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100 mt-4 border-t border-white/10 pt-4'
                      : 'grid-rows-[0fr] opacity-0 h-0 overflow-hidden'
                  }`}
                >
                  <div className="overflow-hidden space-y-4">
                    <p className="text-[#C9D1D8] text-sm md:text-[15px] leading-relaxed">
                      {aText}
                    </p>

                    {/* Bullet Points List */}
                    {pointsList.length > 0 && (
                      <ul className="space-y-2 pt-1">
                        {pointsList.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-[#9AA4AE] leading-normal">
                            <span className="text-[#00ff87] font-mono font-bold shrink-0">›</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Footer Legal & Technical Basis Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-[#6B7580]">{t('faq_basis_label')}:</span>
                        <span className="text-[#00ff87] font-mono font-semibold">{basisText}</span>
                      </div>

                      <button
                        onClick={(e) => handleCopy(e, item.id, `${qText}\n\n${aText}`)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-[#94A3B8] hover:text-white transition-all cursor-pointer"
                        title={t('faq_copy_link')}
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#00ff87]" />
                            <span className="text-[#00ff87] text-[11px]">{t('faq_link_copied')}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[11px]">{t('faq_copy_link')}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Empty Search State */}
          {filteredItems.length === 0 && (
            <div className="p-8 text-center border border-dashed border-white/15 rounded-2xl bg-[#05070A]/60 backdrop-blur-md space-y-4">
              <Search className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm md:text-base text-[#9AA4AE]">
                {t('faq_empty')}
              </p>
              <button
                onClick={() => handleAskBot()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00ff87]/15 hover:bg-[#00ff87]/25 text-[#00ff87] border border-[#00ff87]/40 text-xs md:text-sm font-semibold transition-all cursor-pointer shadow-[0_0_20px_rgba(0,255,135,0.15)]"
              >
                <Bot className="w-4 h-4" />
                <span>{t('faq_ask_bot')}</span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom AI Assistant CTA Bridge */}
        <div className="mt-10 p-5 md:p-6 rounded-2xl bg-gradient-to-r from-[#0A0E13] via-[#0D1420] to-[#0A0E13] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
          <div className="space-y-1">
            <h4 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00ff87]" />
              <span>{t('faq_cta_title')}</span>
            </h4>
            <p className="text-xs md:text-sm text-[#94A3B8]">
              {t('faq_cta_subtitle')}
            </p>
          </div>

          <button
            onClick={() => handleAskBot()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#00ff87] hover:bg-[#00e575] text-[#05070A] font-bold text-xs md:text-sm transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(0,255,135,0.3)] hover:shadow-[0_0_25px_rgba(0,255,135,0.5)] flex items-center justify-center gap-2 shrink-0"
            style={{ minHeight: '44px' }}
          >
            <Bot className="w-4 h-4 text-[#05070A]" />
            <span>{t('faq_cta_button')}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
