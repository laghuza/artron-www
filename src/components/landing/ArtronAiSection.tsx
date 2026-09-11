'use client';

import React, { useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Sparkles, 
  Mic, 
  ScanLine, 
  Bot, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight,
  Zap,
  Activity,
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-xs font-mono font-bold text-[#00E5FF] mb-4 tracking-wider uppercase shadow-[0_0_20px_rgba(0,229,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-[#00E5FF]" style={{ animationDuration: '4s' }} />
            <span>[SYS: AI_ASSISTANT // OPERATIONS_AUTOMATION]</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {locale === 'ka' 
              ? 'AI ასისტენტი & ავტომატიზაცია — მენეჯერის საიმედო საყრდენი 24/7-ზე'
              : locale === 'ru'
                ? 'AI Ассистент и автоматизация — надежная опора управляющего 24/7'
                : 'AI Assistant & Automation — 24/7 Superpower for Facility Managers'}
          </h2>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-[#94A3B8] font-medium leading-relaxed">
            {locale === 'ka'
              ? 'გაათავისუფლეთ პერსონალი რუტინისგან: 5-წამიანი რეგისტრაცია ქართული ხმითა და OCR სკანერით, წევრების გადინების პრევენცია და 24/7 ვირტუალური კონსიერჟი.'
              : locale === 'ru'
                ? 'Освободите персонал от рутины: 5-секундная регистрация голосом и OCR сканером, предиктивный контроль оттока и виртуальный консьерж 24/7.'
                : 'Free your team from routine: 5-second voice & OCR onboarding, predictive churn radar, and 24/7 virtual concierge.'}
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-7 grid grid-cols-3 gap-2 sm:gap-3 max-w-xl mx-auto p-2 rounded-2xl bg-[#05070a]/80 border border-white/10 backdrop-blur-xl">
            <div className="text-center p-2">
              <div className="text-base sm:text-2xl font-black font-mono text-[#00E5FF]">5 წამი</div>
              <div className="text-[10px] text-[#94A3B8] font-mono mt-0.5">სრული რეგისტრაცია</div>
            </div>
            <div className="text-center p-2 border-x border-white/10">
              <div className="text-base sm:text-2xl font-black font-mono text-[#00ff87]">-60%</div>
              <div className="text-[10px] text-[#94A3B8] font-mono mt-0.5">რეცეფციის დატვირთვა</div>
            </div>
            <div className="text-center p-2">
              <div className="text-base sm:text-2xl font-black font-mono text-[#00A3FF]">24/7</div>
              <div className="text-[10px] text-[#94A3B8] font-mono mt-0.5">ავტო-ასისტენტი</div>
            </div>
          </div>
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

          {/* Top Console Bar */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00E5FF]/15 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.25)]">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                  <span>{locale === 'ka' ? 'Sport OS ჭკვიანი AI მოდული' : 'Sport OS Smart AI Engine'}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Live Active
                  </span>
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  {locale === 'ka' ? 'აირჩიეთ ფუნქცია მარცხნივ და გამოსცადეთ რეალურ დროში' : 'Select a capability on the left to test in real time'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-[#00E5FF]">
              <Activity className="w-3.5 h-3.5 animate-pulse text-[#00E5FF]" />
              <span>GEMINI FLASH &amp; SPEECH STT</span>
            </div>
          </div>

          {/* Main 2-Column Bento Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Column: 3 Integrated AI Capabilities */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
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
