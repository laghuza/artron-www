'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Mic, 
  ScanLine, 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  Send, 
  Check, 
  CreditCard,
  User,
  ShieldCheck,
  Zap
} from 'lucide-react';

export type AiShowcaseTab = 'VOICE' | 'OCR' | 'CONCIERGE';

interface SimplifiedAiShowcaseProps {
  activeTab: AiShowcaseTab;
  onTabChange?: (tab: AiShowcaseTab) => void;
}

export const SimplifiedAiShowcase: React.FC<SimplifiedAiShowcaseProps> = ({
  activeTab,
  onTabChange
}) => {
  const { locale } = useLanguage();

  // Voice Demo State
  const [voiceStep, setVoiceStep] = useState<'IDLE' | 'LISTENING' | 'EXTRACTED' | 'DONE'>('IDLE');

  // OCR Demo State
  const [ocrStep, setOcrStep] = useState<'IDLE' | 'SCANNING' | 'DONE'>('IDLE');

  // Concierge Chat State
  const [chatBooked, setChatBooked] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  // Reset state when switching tab
  useEffect(() => {
    if (activeTab === 'VOICE') {
      setVoiceStep('IDLE');
    } else if (activeTab === 'OCR') {
      setOcrStep('IDLE');
    } else if (activeTab === 'CONCIERGE') {
      setChatBooked(false);
      setChatLoading(false);
    }
  }, [activeTab]);

  // Handle Voice Sim trigger
  const runVoiceSim = () => {
    setVoiceStep('LISTENING');
    setTimeout(() => {
      setVoiceStep('EXTRACTED');
      setTimeout(() => {
        setVoiceStep('DONE');
      }, 900);
    }, 1300);
  };

  // Handle OCR Sim trigger
  const runOcrSim = () => {
    setOcrStep('SCANNING');
    setTimeout(() => {
      setOcrStep('DONE');
    }, 1400);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* 1. VOICE REGISTRATION VIEW */}
      {activeTab === 'VOICE' && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* Header indicator */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-wider">
                {locale === 'ka' ? 'ქართული ხმოვანი ასისტენტი' : 'Georgian Voice AI'}
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              0.8s Latency
            </span>
          </div>

          {/* Voice Prompt Box */}
          <div className="p-4 rounded-2xl bg-[#080C14] border border-white/10 relative overflow-hidden">
            <div className="text-xs text-[#94A3B8] font-mono mb-2 flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>{locale === 'ka' ? 'ოპერატორის ხმოვანი ბრძანება:' : 'Operator voice command:'}</span>
            </div>
            <p className="text-sm sm:text-base font-medium text-white italic">
              &quot;დაარეგისტრირე გიორგი ბერიძე, 1-თვიანი ულიმიტო პაკეტი, ტელეფონი 599 12 34 56&quot;
            </p>

            {/* Audio Waveform Animation */}
            {voiceStep === 'LISTENING' && (
              <div className="mt-3 flex items-center gap-1">
                {[40, 75, 30, 90, 60, 100, 45, 80, 25, 70, 50, 95].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-[#0066FF] to-[#00E5FF] rounded-full animate-pulse"
                    style={{
                      height: `${h * 0.28}px`,
                      animationDelay: `${i * 80}ms`
                    }}
                  />
                ))}
                <span className="text-xs font-mono text-[#00E5FF] ml-2 animate-pulse">
                  {locale === 'ka' ? 'მუშავდება...' : 'Processing...'}
                </span>
              </div>
            )}
          </div>

          {/* Result Card */}
          {voiceStep === 'DONE' ? (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#00E5FF]/10 via-[#0066FF]/5 to-transparent border border-[#00E5FF]/40 shadow-[0_0_30px_rgba(0,229,255,0.15)] animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">გიორგი ბერიძე</h5>
                    <span className="text-[11px] font-mono text-emerald-400">ID: #ART-8821 • აქტიურია</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-[#00E5FF]/20 text-[#00E5FF] px-2 py-0.5 rounded border border-[#00E5FF]/30">
                  QR Pass მზადაა
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-white/10">
                <div className="text-[#94A3B8]">
                  პაკეტი: <span className="text-white font-bold">1 თვე ულიმიტო</span>
                </div>
                <div className="text-[#94A3B8]">
                  ტელეფონი: <span className="text-white font-bold">599 12 34 56</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-[#080C14]/60 border border-dashed border-white/15 text-center py-6">
              <p className="text-xs text-[#94A3B8] font-mono">
                {locale === 'ka' 
                  ? 'დააჭირეთ „სიმულაციის გაშვებას“, რათა იხილოთ 3-წამიანი ავტო-რეგისტრაცია' 
                  : 'Click "Start Voice Simulation" to test 3-second auto-registration'}
              </p>
            </div>
          )}

          {/* Action Trigger */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={runVoiceSim}
              disabled={voiceStep === 'LISTENING'}
              className="px-4 py-2.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-[#0066FF] to-[#00A3FF] hover:from-[#0052cc] hover:to-[#008fe0] text-white flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,163,255,0.3)] disabled:opacity-50 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>
                {voiceStep === 'DONE' 
                  ? (locale === 'ka' ? 'თავიდან გამოსცადეთ' : 'Test Again') 
                  : (locale === 'ka' ? 'გამოსცადეთ ხმოვანი რეგისტრაცია' : 'Run Voice Simulation')}
              </span>
            </button>
            <span className="text-[11px] font-mono text-[#94A3B8]">0 ხელით ბეჭდვა რეცეფციაზე</span>
          </div>
        </div>
      )}

      {/* 2. OCR ID SCANNER VIEW */}
      {activeTab === 'OCR' && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00A3FF] animate-pulse" />
              <span className="text-xs font-mono font-bold text-[#00A3FF] uppercase tracking-wider">
                {locale === 'ka' ? 'პირადობის & პასპორტის OCR' : 'Passport & ID OCR AI'}
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-2.5 py-0.5 rounded-full border border-[#00E5FF]/30">
              99.8% Accuracy
            </span>
          </div>

          {/* Interactive ID Card Mockup with Laser Beam */}
          <div className="relative p-5 rounded-2xl bg-gradient-to-br from-[#0e1626] to-[#080d17] border border-white/20 overflow-hidden shadow-2xl">
            {/* Laser Scan Beam */}
            {ocrStep === 'SCANNING' && (
              <div 
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_15px_#00E5FF] animate-bounce pointer-events-none"
                style={{ animationDuration: '1.2s' }}
              />
            )}

            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <CreditCard className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-[#94A3B8]">GEORGIA ID CARD</div>
                  <div className="text-xs font-bold text-white">საქართველოს მოქალაქე</div>
                </div>
              </div>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>

            {/* Scanned Fields */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                <div className="text-[10px] text-[#94A3B8]">სახელი / გვარი</div>
                <div className="text-white font-bold flex items-center gap-1 mt-0.5">
                  <span>დავით თოდუა</span>
                  {ocrStep === 'DONE' && <Check className="w-3 h-3 text-emerald-400" />}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                <div className="text-[10px] text-[#94A3B8]">პირადი ნომერი</div>
                <div className="text-white font-bold flex items-center gap-1 mt-0.5">
                  <span>01024098***</span>
                  {ocrStep === 'DONE' && <Check className="w-3 h-3 text-emerald-400" />}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                <div className="text-[10px] text-[#94A3B8]">დაბადების თარიღი</div>
                <div className="text-white font-bold flex items-center gap-1 mt-0.5">
                  <span>14.05.1994</span>
                  {ocrStep === 'DONE' && <Check className="w-3 h-3 text-emerald-400" />}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                <div className="text-[10px] text-[#94A3B8]">დაშიფვრა (AES-256)</div>
                <div className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                  <span>დაცულია</span>
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={runOcrSim}
              disabled={ocrStep === 'SCANNING'}
              className="px-4 py-2.5 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-[#0066FF] to-[#00A3FF] hover:from-[#0052cc] hover:to-[#008fe0] text-white flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,163,255,0.3)] disabled:opacity-50 cursor-pointer"
            >
              <ScanLine className="w-3.5 h-3.5" />
              <span>
                {ocrStep === 'DONE' 
                  ? (locale === 'ka' ? 'ხელახლა სკანირება' : 'Rescan Document') 
                  : (locale === 'ka' ? 'დაასკანირეთ პირადობა' : 'Scan ID Card')}
              </span>
            </button>
            <span className="text-[11px] font-mono text-[#94A3B8]">მყისიერი მონაცემთა ექსტრაქცია</span>
          </div>
        </div>
      )}

      {/* 3. 24/7 VIRTUAL CONCIERGE CHAT VIEW */}
      {activeTab === 'CONCIERGE' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00ff87] animate-pulse" />
              <span className="text-xs font-mono font-bold text-[#00ff87] uppercase tracking-wider">
                {locale === 'ka' ? '24/7 ვირტუალური კონსიერჟი' : '24/7 Virtual Concierge'}
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              -60% ზარები
            </span>
          </div>

          {/* Chat Messenger Box */}
          <div className="space-y-3 p-4 rounded-2xl bg-[#080C14] border border-white/10 min-h-[190px] flex flex-col justify-end">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="max-w-[80%] p-3 rounded-2xl rounded-tr-none bg-[#0066FF]/20 border border-[#0066FF]/40 text-xs sm:text-sm text-white font-medium">
                გამარჯობა, ხვალ დილით აუზზე თავისუფალი ბილიკი თუ არის?
              </div>
            </div>

            {/* AI Assistant Message */}
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-[#00ff87] border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="max-w-[85%] p-3 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 text-xs sm:text-sm text-[#CBD5E1]">
                <p>
                  გამარჯობა! დიახ, 08:00 – 11:00 საათებში 2 თავისუფალი ბილიკია. გსურთ ავტომატური დაჯავშნა?
                </p>

                {/* Quick Action Button inside Chat */}
                <div className="mt-2.5">
                  {chatBooked ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>ბილიკი N3 დაიჯავშნა (08:30)</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setChatLoading(true);
                        setTimeout(() => {
                          setChatLoading(false);
                          setChatBooked(true);
                        }, 500);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] hover:bg-[#00E5FF]/30 border border-[#00E5FF]/40 text-xs font-mono font-bold transition-all cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>{chatLoading ? 'იჯავშნება...' : 'დაჯავშნე 08:30-ზე (1 კლიკით)'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] px-1">
            <span>პასუხობს მყისიერად WhatsApp, Web &amp; Telegram-ზე</span>
            <span className="text-emerald-400">24/7 რეჟიმი</span>
          </div>
        </div>
      )}
    </div>
  );
};
