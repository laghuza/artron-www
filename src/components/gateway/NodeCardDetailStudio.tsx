"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { soundEngine } from '@/core';
import { useI18n } from '@/context/I18nContext';
import { CrmHierarchyVisualizer } from './widgets/live/CrmHierarchyVisualizer';
import { TurnstileControlPanelVisualizer } from './widgets/live/TurnstileControlPanelVisualizer';
import { LaborTimesheetVisualizer } from './widgets/live/LaborTimesheetVisualizer';
import { MobilePassVisualizer } from './widgets/live/MobilePassVisualizer';
import { LoyaltyLifecycleVisualizer } from './widgets/live/LoyaltyLifecycleVisualizer';
import { PosInventoryVisualizer } from './widgets/live/PosInventoryVisualizer';
import { ChurnAnalyticsVisualizer } from './widgets/live/ChurnAnalyticsVisualizer';
import { SecurityAuditVisualizer } from './widgets/live/SecurityAuditVisualizer';

export interface NodeCardDetailStudioProps {
  nodeId: number;
  nodeTitle: string;
  activeSubChapterId: string | null;
  subNodeTitle: string;
  cardIndex: 1 | 2 | 3;
  onSelectCardIndex: (index: 1 | 2 | 3) => void;
  onClose: () => void;
  cardData?: {
    card1: { title: string; desc: string };
    card2: { title: string; desc: string };
    card3: { title: string; desc: string };
  } | null;
  accentColor?: string;
}

export const NodeCardDetailStudio: React.FC<NodeCardDetailStudioProps> = ({
  nodeId,
  nodeTitle,
  activeSubChapterId,
  subNodeTitle,
  cardIndex,
  onSelectCardIndex,
  onClose,
  cardData,
  accentColor = '#00B0FF',
}) => {
  const { t } = useI18n();

  // Listen to Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundEngine.playPulseNode();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const cardTypeMap: Record<1 | 2 | 3, 'functional' | 'permissions' | 'business'> = {
    1: 'functional',
    2: 'permissions',
    3: 'business',
  };
  const activeCardType = cardTypeMap[cardIndex];

  const currentCardContent =
    cardIndex === 1
      ? cardData?.card1
      : cardIndex === 2
      ? cardData?.card2
      : cardData?.card3;

  const renderLiveVisualizer = () => {
    switch (nodeId) {
      case 1:
        return <CrmHierarchyVisualizer cardType={activeCardType} subChapterId={activeSubChapterId || undefined} />;
      case 2:
        return <TurnstileControlPanelVisualizer cardType={activeCardType} subChapterId={activeSubChapterId || undefined} />;
      case 3:
        return <LaborTimesheetVisualizer cardType={activeCardType} subChapterId={activeSubChapterId || undefined} />;
      case 4:
        return <MobilePassVisualizer cardType={activeCardType} subChapterId={activeSubChapterId || undefined} />;
      case 5:
        return <LoyaltyLifecycleVisualizer cardType={activeCardType} subChapterId={activeSubChapterId || undefined} />;
      case 6:
        return <PosInventoryVisualizer cardType={activeCardType} subChapterId={activeSubChapterId || undefined} />;
      case 7:
        return <ChurnAnalyticsVisualizer cardType={activeCardType} subChapterId={activeSubChapterId || undefined} />;
      case 8:
        return <SecurityAuditVisualizer cardType={activeCardType} subChapterId={activeSubChapterId || undefined} />;
      default:
        return <CrmHierarchyVisualizer cardType={activeCardType} subChapterId={activeSubChapterId || undefined} />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 lg:p-5 bg-[#080B10]/95 border border-[#00B0FF]/30 rounded-2xl backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.85)] animate-fadeIn font-sans text-white z-40 select-none overflow-y-auto">
      {/* Top Breadcrumb & Clean Single Close Button */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2.5 mb-3">
        <div className="flex items-center gap-2 font-mono text-[11px] text-gray-300">
          <span className="px-2 py-0.5 rounded bg-[#00B0FF]/15 text-[#00B0FF] font-bold border border-[#00B0FF]/30">
            NODE 0{nodeId}
          </span>
          <span className="text-gray-500">/</span>
          <span className="text-white font-medium truncate max-w-[280px]">{subNodeTitle}</span>
        </div>

        <button
          type="button"
          onClick={() => {
            soundEngine.playPulseNode();
            onClose();
          }}
          className="font-mono text-[11px] text-gray-400 hover:text-white bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
          title="დახურვა (ESC)"
        >
          <span className="text-red-400 font-bold">✕</span>
          <span>დახურვა (ESC)</span>
        </button>
      </div>

      {/* 3 Visual Aspect Switchers */}
      <div className="grid grid-cols-3 gap-2 mb-3.5 font-mono text-[11px]">
        <button
          type="button"
          onClick={() => {
            soundEngine.playPulseNode();
            onSelectCardIndex(1);
          }}
          className={`py-1.5 px-3 rounded-lg border text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            cardIndex === 1
              ? 'bg-[#00B0FF]/20 border-[#00B0FF] text-white shadow-[0_0_12px_rgba(0,176,255,0.25)] font-bold'
              : 'bg-[#12161F] border-white/10 text-gray-400 hover:text-gray-200'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00B0FF]" />
          <span>⚡ 01 // ფუნქციონალი</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEngine.playPulseNode();
            onSelectCardIndex(2);
          }}
          className={`py-1.5 px-3 rounded-lg border text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            cardIndex === 2
              ? 'bg-[#00ff87]/20 border-[#00ff87] text-white shadow-[0_0_12px_rgba(0,255,135,0.25)] font-bold'
              : 'bg-[#12161F] border-white/10 text-gray-400 hover:text-gray-200'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87]" />
          <span>🛡️ 02 // უსაფრთხოება &amp; RLS</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEngine.playPulseNode();
            onSelectCardIndex(3);
          }}
          className={`py-1.5 px-3 rounded-lg border text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            cardIndex === 3
              ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-[0_0_12px_rgba(212,175,55,0.25)] font-bold'
              : 'bg-[#12161F] border-white/10 text-gray-400 hover:text-gray-200'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span>📈 03 // ბიზნეს ROI</span>
        </button>
      </div>

      {/* Main Dual-Pane Studio Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 lg:gap-4 flex-1 min-h-0">
        {/* Left Pane: Visual Value Badges & Quick Action Scenarios (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-[#10141D] p-3.5 lg:p-4 rounded-xl border border-white/10 space-y-3">
          <div className="space-y-3">
            {/* 1-Sentence Punchy Value Header */}
            <div>
              <div className="text-[10px] font-mono text-[#00B0FF] uppercase tracking-wider mb-1">
                {cardIndex === 1 ? '⚡ CORE INTERACTION' : cardIndex === 2 ? '🔒 SECURITY & PRIVACY' : '💰 BUSINESS IMPACT'}
              </div>
              <h3 className="text-[13px] font-bold text-white leading-snug">
                {currentCardContent?.title || subNodeTitle}
              </h3>
              <p className="text-[11.5px] text-gray-300 leading-normal mt-1 font-sans line-clamp-2">
                {currentCardContent?.desc}
              </p>
            </div>

            {/* Micro-KPI Impact Badges */}
            <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
              <div className="bg-black/40 p-1.5 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">Check-in</div>
                <div className="text-[11px] font-bold text-[#00B0FF]">&lt;3 წმ</div>
              </div>
              <div className="bg-black/40 p-1.5 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">შიფრაცია</div>
                <div className="text-[11px] font-bold text-[#00ff87]">AES-256</div>
              </div>
              <div className="bg-black/40 p-1.5 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">LTV ზრდა</div>
                <div className="text-[11px] font-bold text-[#D4AF37]">+35%</div>
              </div>
            </div>

            {/* Quick Interactive Features / Checklist */}
            <div className="space-y-1.5 pt-1 text-[11px] text-gray-300 font-sans border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="text-[#00ff87] text-xs">✓</span>
                <span className="text-gray-200">მომენტალური რეალურ დროში სინქრონიზაცია</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#00B0FF] text-xs">✓</span>
                <span className="text-gray-200">Multi-tenant RLS იზოლაცია</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#D4AF37] text-xs">✓</span>
                <span className="text-gray-200">საქართველოს რეგულაციებთან თავსებადი</span>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-2 border-t border-white/10">
            <Link
              href="/get-started?mode=demo"
              onClick={() => soundEngine.playSystemAccess()}
              className="w-full py-2 px-3 bg-gradient-to-r from-[#00B0FF] to-[#0080FF] hover:from-[#00C0FF] hover:to-[#0090FF] text-[#0A0D10] font-mono text-[11px] font-bold uppercase tracking-wider rounded-lg text-center transition-all shadow-[0_0_15px_rgba(0,176,255,0.3)] hover:scale-[1.01] cursor-pointer block"
            >
              🚀 მოითხოვეთ დემო ამ მოდულზე →
            </Link>
          </div>
        </div>

        {/* Right Pane: Live Interactive Visualizer (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col min-h-[320px] lg:min-h-0">
          {renderLiveVisualizer()}
        </div>
      </div>
    </div>
  );
};
