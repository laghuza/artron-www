'use client';

import React, { useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Mic, 
  ScanLine, 
  Bot, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight,
  Zap,
  Cpu
} from 'lucide-react';
import { SimplifiedAiShowcase, AiShowcaseTab } from '@/components/gateway/widgets/live/multimodal-ai/SimplifiedAiShowcase';

export const ArtronAiSection: React.FC = () => {
  const { locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<AiShowcaseTab>('VOICE');

  // Interactive Cursor Spotlight Glow state
  const frameRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const capabilities = [
    {
      id: 'VOICE' as AiShowcaseTab,
      icon: Mic,
      color: '#00E5FF',
      badge: '5 SEC ONBOARDING',
      titleKa: 'ქართული ხმოვანი რეგისტრაცია',
      titleEn: 'Georgian Voice Onboarding',
      titleRu: 'Голосовая регистрация на грузинском',
      descKa: 'პირის მყისიერი შეყვანა ხმოვანი კარნახით — 0 ხელით ბეჭდვა რეცეფციაზე.',
      descEn: 'Instant client entry via Georgian voice dictation — zero typing at reception.',
      descRu: 'Мгновенное добавление клиентов голосом — ноль ручного набора на ресепшене.'
    },
    {
      id: 'OCR' as AiShowcaseTab,
      icon: ScanLine,
      color: '#00A3FF',
      badge: 'VISION OCR & PII',
      titleKa: 'პირადობის & პასპორტის OCR',
      titleEn: 'Instant ID & Passport OCR',
      titleRu: 'Мгновенный OCR ID и паспортов',
      descKa: 'დოკუმენტის კამერით დასკანირება და ველების ავტომატური შევსება 99.8% სიზუსტით.',
      descEn: 'Document scan via camera with automatic field population at 99.8% accuracy.',
      descRu: 'Сканирование документов через камеру с автозаполнением полей с точностью 99.8%.'
    },
    {
      id: 'CONCIERGE' as AiShowcaseTab,
      icon: Bot,
      color: '#00ff87',
      badge: '24/7 CONCIERGE & CHURN',
      titleKa: '24/7 ვირტუალური კონსიერჟი & Churn Radar',
      titleEn: '24/7 Virtual Concierge & Churn Radar',
      titleRu: 'Виртуальный консьерж 24/7 и контроль оттока',
      descKa: 'სტუმრების ავტო-კონსულტაცია, ჯავშნები და გადინების პრევენცია 15-30 დღით ადრე.',
      descEn: 'Automated visitor assistance, fast lane bookings, and proactive churn prevention.',
      descRu: 'Автоконсультация гостей, мгновенная бронь и предиктивный контроль оттока.'
    }
  ];

  return (
    <section 
      id="ai-intelligence" 
      className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-[#080B10] via-[#0D121F] to-[#080B10] border-b border-white/5 scroll-mt-20"
    >
      {/* Anchor targets */}
      <span id="multimodal-ai" className="absolute -top-24 pointer-events-none" />
      <span id="ai-engine" className="absolute -top-24 pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#0066FF]/15 via-[#00E5FF]/10 to-[#00ff87]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {locale === 'ka' 
              ? 'ჭკვიანი ასისტენტი'
              : locale === 'ru'
                ? 'Умный ассистент'
                : 'Smart Assistant'}
          </h2>

          <p className="mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-[#94A3B8] font-normal sm:font-medium leading-relaxed">
            {locale === 'ka' ? (
              <>
                <span className="hidden sm:inline">ნულოვანი რუტინა რეცეფციაზე: წევრების მომენტალური რეგისტრაცია ხმით, გადინების ჭკვიანი პრევენცია და მუდმივი ციფრული მხარდაჭერა.</span>
                <span className="sm:hidden">ნულოვანი რუტინა: წევრების მომენტალური რეგისტრაცია ხმით, გადინების პრევენცია და მუდმივი ციფრული მხარდაჭერა.</span>
              </>
            ) : locale === 'ru' ? (
              <>
                <span className="hidden sm:inline">Ноль рутины на ресепшене: моментальная регистрация голосом, умный контроль оттока и непрерывная цифровая поддержка.</span>
                <span className="sm:hidden">Ноль рутины: быстрая регистрация голосом, контроль оттока и цифровая поддержка.</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Zero front-desk routine: instant voice registration, intelligent churn prevention, and continuous digital support.</span>
                <span className="sm:hidden">Zero routine: instant voice onboarding, churn prevention, and seamless digital support.</span>
              </>
            )}
          </p>
        </div>

        {/* UNIFIED COCKPIT FRAME WITH SPOTLIGHT CURSOR GLOW */}
        <div
          ref={frameRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative rounded-3xl p-5 sm:p-7 md:p-9 bg-[#05070A]/95 border border-white/15 overflow-hidden backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.7)] group transition-all duration-300"
        >
          {/* Dynamic Spotlight Glow Layer following cursor */}
          <div 
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl z-0"
            style={{
              opacity: mousePos.opacity,
              background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 163, 255, 0.12), rgba(0, 229, 255, 0.05), transparent 75%)`
            }}
          />

          {/* Border Glow tracking cursor */}
          <div 
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl z-0"
            style={{
              opacity: mousePos.opacity,
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 229, 255, 0.4), transparent 60%)`,
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: '1px'
            }}
          />

          {/* Top Console Bar with Integrated Live Telemetry */}
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/15 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.25)] shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-white">
                  {locale === 'ka' 
                    ? 'Sport OS ჭკვიანი ასისტენტი' 
                    : locale === 'ru'
                      ? 'Умный ассистент Sport OS'
                      : 'Sport OS Smart Assistant'}
                </h3>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  {locale === 'ka' ? 'აირჩიეთ ფუნქცია მარცხნივ და გამოსცადეთ რეალურ დროში' : 'Select a capability on the left to test in real time'}
                </p>
              </div>
            </div>

            {/* Integrated Live Telemetry Metrics */}
            <div className="w-full lg:w-auto grid grid-cols-3 gap-1.5 sm:gap-2.5 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-[#080B10]/90 border border-white/10 backdrop-blur-xl shadow-inner">
              <div className="text-center px-2.5 py-1">
                <div className="text-sm sm:text-base font-black font-mono text-[#00E5FF] flex items-center justify-center gap-1">
                  <Zap className="w-3 h-3 hidden sm:inline" />
                  {locale === 'ka' ? '5 წამი' : locale === 'ru' ? '5 сек' : '5 sec'}
                </div>
                <div className="text-[9px] sm:text-[10px] text-[#94A3B8] font-mono whitespace-nowrap mt-0.5">
                  {locale === 'ka' ? 'სრული რეგისტრაცია' : locale === 'ru' ? 'Регистрация' : 'Onboarding'}
                </div>
              </div>
              <div className="text-center px-2.5 py-1 border-x border-white/10">
                <div className="text-sm sm:text-base font-black font-mono text-[#00ff87]">
                  -60%
                </div>
                <div className="text-[9px] sm:text-[10px] text-[#94A3B8] font-mono whitespace-nowrap mt-0.5">
                  {locale === 'ka' ? 'რეცეფციის დატვირთვა' : locale === 'ru' ? 'Нагрузка' : 'Reception Load'}
                </div>
              </div>
              <div className="text-center px-2.5 py-1">
                <div className="text-sm sm:text-base font-black font-mono text-[#00A3FF]">
                  {locale === 'ka' ? '0 წმ' : locale === 'ru' ? '0 сек' : '0 sec'}
                </div>
                <div className="text-[9px] sm:text-[10px] text-[#94A3B8] font-mono whitespace-nowrap mt-0.5">
                  {locale === 'ka' ? 'ლოდინის დრო' : locale === 'ru' ? 'Ожидание' : 'Wait Time'}
                </div>
              </div>
            </div>
          </div>

          {/* Main 2-Column Bento Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Mobile Tab Pills (< lg) */}
            <div className="flex lg:hidden overflow-x-auto gap-2 pb-2 -mx-2 px-2 scrollbar-none snap-x">
              {capabilities.map((cap) => {
                const Icon = cap.icon;
                const isActive = activeTab === cap.id;
                return (
                  <button
                    key={cap.id}
                    type="button"
                    onClick={() => setActiveTab(cap.id)}
                    className={`snap-center shrink-0 flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#080E18] border-[#00E5FF]/60 text-white shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                        : 'bg-[#080B10]/70 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: cap.color }} />
                    <span>{locale === 'ka' ? cap.titleKa : locale === 'ru' ? cap.titleRu : cap.titleEn}</span>
                  </button>
                );
              })}
            </div>

            {/* Desktop Left Column (lg+): 3 Integrated AI Capabilities */}
            <div className="hidden lg:flex lg:col-span-5 flex-col justify-between space-y-3">
              <div className="space-y-3">
                {capabilities.map((cap) => {
                  const Icon = cap.icon;
                  const isActive = activeTab === cap.id;
                  return (
                    <button
                      key={cap.id}
                      onClick={() => setActiveTab(cap.id)}
                      className={`w-full text-left p-4 rounded-2xl transition-all duration-200 border relative group cursor-pointer ${
                        isActive
                          ? 'bg-[#080E18] border-[#00E5FF]/60 shadow-[0_0_25px_rgba(0,229,255,0.15)] ring-1 ring-[#00E5FF]/30'
                          : 'bg-[#080B10]/70 border-white/10 hover:border-white/20 hover:bg-[#080B10]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div 
                            className="w-8 h-8 rounded-xl flex items-center justify-center border transition-all"
                            style={{
                              backgroundColor: `${cap.color}15`,
                              borderColor: isActive ? `${cap.color}60` : `${cap.color}30`,
                              color: cap.color
                            }}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span 
                            className="text-[9px] font-mono font-bold px-2 py-0.5 rounded border"
                            style={{
                              backgroundColor: `${cap.color}10`,
                              borderColor: `${cap.color}30`,
                              color: cap.color
                            }}
                          >
                            {cap.badge}
                          </span>
                        </div>

                        <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-[#00E5FF] translate-x-1' : 'text-gray-500'}`} />
                      </div>

                      <h4 className="text-sm font-bold text-white mb-1">
                        {locale === 'ka' ? cap.titleKa : locale === 'ru' ? cap.titleRu : cap.titleEn}
                      </h4>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">
                        {locale === 'ka' ? cap.descKa : locale === 'ru' ? cap.descRu : cap.descEn}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Security & Compliance Footer Tag */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
                <div className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>AES-256 PII დაცვა</span>
                </div>
                <span>100% ქართული ენის მხარდაჭერა</span>
              </div>
            </div>

            {/* Right Column: Simplified Interactive AI Showcase */}
            <div className="lg:col-span-7 rounded-2xl bg-[#03060A]/90 border border-white/10 p-4 sm:p-6 flex flex-col justify-between relative shadow-inner">
              <SimplifiedAiShowcase activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
