"use client";

import React from 'react';
import { MultimodalAiStage } from '../gateway/widgets/live/multimodal-ai/MultimodalAiStage';
import { COMPARISON_METRICS } from '@/data/multimodalAiData';
import { MultimodalAiPunchlines } from './ai/MultimodalAiPunchlines';
import { MultimodalAiSecurityPillars } from './ai/MultimodalAiSecurityPillars';
import { MultimodalAiCtaBanner } from './ai/MultimodalAiCtaBanner';
import { Sparkles, Zap, Mic, ScanLine, ShieldCheck, Users, Check, X, ArrowRight } from 'lucide-react';

export const MultimodalAiShowcase: React.FC = () => {
  const getMetricIcon = (iconKey: string) => {
    switch (iconKey) {
      case 'zap':
        return <Zap className="w-4 h-4 text-[#00E5FF]" />;
      case 'mic':
        return <Mic className="w-4 h-4 text-purple-400" />;
      case 'scan':
        return <ScanLine className="w-4 h-4 text-emerald-400" />;
      case 'shield':
        return <ShieldCheck className="w-4 h-4 text-cyan-400" />;
      case 'users':
        return <Users className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#00A3FF]" />;
    }
  };

  return (
    <section id="multimodal-ai" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#080B10] border-t border-b border-white/10 overflow-hidden select-none">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-8 w-96 h-96 bg-[#00A3FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-8 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        {/* Header Title Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/30 font-mono text-[11px] text-[#00A3FF] uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(0,163,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#00A3FF] animate-pulse" />
            NEXT-GEN MULTIMODAL AI ASSISTANT
          </div>

          <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            რეგისტრაცია &amp; მართვა 5 წამში — ხმით, ჩატით ან კამერით
          </h2>

          <p className="font-sans text-sm sm:text-base text-gray-300 max-w-3xl mx-auto leading-relaxed">
            დაივიწყეთ 11-ნიშნა პირადი ნომრების ხელით შეყვანა და რიგები რეცეფციაზე.
            Google Gemini Flash (Vision &amp; Function Calling) და Google Speech-to-Text ტექნოლოგიებით
            თქვენი პერსონალი კლიენტებსა და თანამშრომლებს მომენტალურად არეგისტრირებს.
          </p>
        </div>

        {/* 4 Core B2B Punchlines with Interactive GlowCards */}
        <MultimodalAiPunchlines />

        {/* Live Interactive Multimodal AI Hub Stage */}
        <div className="p-4 sm:p-6 rounded-3xl bg-[#090D15]/95 border border-[#00A3FF]/30 shadow-[0_16px_50px_rgba(0,0,0,0.85)]">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <h3 className="font-mono text-base sm:text-lg font-bold text-white flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-[#00A3FF]/10 border border-[#00A3FF]/30 text-[#00E5FF]">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span>ინტერაქტიული AI სიმულატორი (Live Interactive Demo)</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                გამოსცადეთ რეგისტრაციის 3-ვე რეჟიმი რეალურ დროში და შეაფასეთ სისწრაფე.
              </p>
            </div>
          </div>

          <MultimodalAiStage />
        </div>

        {/* Head-to-Head Comparison Matrix */}
        <div className="space-y-4 pt-2">
          <div className="text-center space-y-1">
            <h3 className="font-mono text-lg sm:text-xl font-bold text-white uppercase tracking-wider flex items-center justify-center gap-2">
              <span>ტრადიციული პროგრამები vs ARTRON AI</span>
            </h3>
            <p className="text-xs text-gray-400 font-sans">
              რატომ ირჩევენ თანამედროვე სპორტკომპლექსები ართრონის AI ასისტენტს
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0B0F17]/90 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <table className="w-full text-left border-collapse font-sans text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] font-mono text-[11px] uppercase text-gray-400">
                  <th className="p-4">მახასიათებელი</th>
                  <th className="p-4 text-rose-300">ტრადიციული ფიტნეს პროგრამები</th>
                  <th className="p-4 text-[#00E5FF]">ARTRON MULTIMODAL AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {COMPARISON_METRICS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-medium text-white flex items-center gap-2.5">
                      <span className="p-1 rounded-md bg-white/5 border border-white/10">
                        {getMetricIcon(item.icon)}
                      </span>
                      <span>{item.titleKa}</span>
                    </td>
                    <td className="p-4 text-gray-400 font-mono flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5 text-rose-400/80 shrink-0" />
                      <span>{item.traditionalWayKa}</span>
                    </td>
                    <td className="p-4 font-mono font-semibold text-emerald-300">
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{item.artronAiWayKa}</span>
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/30 shrink-0">
                          {item.badgeKa}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5 Security Pillars: Zero-Hallucination & Enterprise Trust */}
        <MultimodalAiSecurityPillars />

        {/* B2B Live Demo Reservation Banner */}
        <MultimodalAiCtaBanner />
      </div>
    </section>
  );
};
