"use client";

import React from 'react';
import { useI18n } from '@/context/I18nContext';
import { NODE_07_SUB_NODES_DATA } from '@/data/node07AiAnalyticsData';
import { AiChurnSimulator } from './widgets/AiChurnSimulator';

interface Node07CanvasViewProps {
  activeSubChapterId: string | null;
}

export const Node07CanvasView: React.FC<Node07CanvasViewProps> = ({ activeSubChapterId }) => {
  const { t } = useI18n();
  const isSubNodeSelected = Boolean(activeSubChapterId && NODE_07_SUB_NODES_DATA[activeSubChapterId]);
  const activeSubData = activeSubChapterId ? NODE_07_SUB_NODES_DATA[activeSubChapterId] : null;

  const subIdxMap: Record<string, number> = {
    '07.1': 0,
    '07.2': 1,
    '07.3': 2,
    '07.4': 3,
  };
  const subIndex = activeSubChapterId ? subIdxMap[activeSubChapterId] : undefined;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 lg:p-8 animate-fadeIn">
      {/* Top HUD Header */}
      <div className="w-full flex items-center justify-between pointer-events-auto">
        <div
          className={`transition-all duration-500 ${
            isSubNodeSelected
              ? 'transform translate-y-0 opacity-100 bg-[#0E1015]/90 border border-[#00A3FF]/30 px-4 py-2.5 rounded-lg shadow-[0_0_15px_rgba(0,163,255,0.15)] backdrop-blur-md'
              : 'opacity-0 -translate-y-2'
          }`}
        >
          <div className="font-mono text-[11px] text-[#00A3FF] uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-pulse shadow-[0_0_8px_#00A3FF]" />
            {t('node_07_analytics.title')}
          </div>
          {activeSubChapterId && (
            <div className="font-sans text-[13px] text-white font-medium tracking-tight mt-0.5 pl-4">
              [ {t(`subchapters.${activeSubChapterId}`)} ]
            </div>
          )}
        </div>
      </div>

      {/* Main Canvas Area Content: State 1 vs State 2 */}
      {!isSubNodeSelected ? (
        /* State 1: Centered Intro Text & Live AI Churn Simulator overlay */
        <div className="my-auto mx-auto max-w-2xl text-center pointer-events-auto bg-[#0A0D11]/85 border border-[#00A3FF]/30 p-6 lg:p-8 rounded-2xl backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] animate-fadeIn space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/30 font-mono text-[11px] text-[#00A3FF] uppercase tracking-[0.2em]">
            <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-pulse" />
            [ NODE_07 // AI ANALYTICS & BI CORE ]
          </div>

          <h2 className="font-mono text-[20px] font-bold text-[#00A3FF] uppercase tracking-wide leading-tight text-shadow">
            {t('node_07_analytics.title')}
          </h2>

          <p className="font-sans text-[13px] text-gray-300 leading-[1.6] text-justify max-w-xl mx-auto border-t border-white/10 pt-3">
            {t('node_07_analytics.short_desc')}
          </p>

          {/* Interactive AI Churn & Win-Back Simulator */}
          <div className="pt-2 text-left">
            <AiChurnSimulator />
          </div>
        </div>
      ) : (
        /* State 2: 3-Column / 3-Card Layout Container */
        <div className="my-auto w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 pointer-events-auto animate-fadeIn">
          {/* Card 1: ფუნქციონალური აღწერა */}
          <div className="group bg-[#0E1015]/90 border border-blue-500/20 hover:border-[#00A3FF]/60 rounded-xl p-5 lg:p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,163,255,0.2)] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[12px] font-bold text-[#00A3FF] uppercase tracking-wider mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
                <span>01 // {t('node_07_analytics.section_functional')}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-sans text-[13.5px] text-gray-200 leading-[1.65]">
                {subIndex !== undefined ? t(`node_07_analytics.sub_items.${subIndex}.functional_desc`) : activeSubData?.card1.desc}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 font-mono text-[10px] text-[#00A3FF]/70 uppercase tracking-widest flex items-center justify-between">
              <span>ML MODEL: INFERENCE</span>
              <span>MOD 07.A</span>
            </div>
          </div>

          {/* Card 2: მმართველობითი კონტროლი */}
          <div className="group bg-[#0E1015]/90 border border-blue-500/20 hover:border-[#00A3FF]/60 rounded-xl p-5 lg:p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,163,255,0.2)] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[12px] font-bold text-[#00A3FF] uppercase tracking-wider mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
                <span>02 // {t('node_07_analytics.section_permissions')}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-sans text-[13px] text-gray-300 leading-[1.65] font-mono border-l-2 border-[#00A3FF]/40 pl-3">
                {subIndex !== undefined ? t(`node_07_analytics.sub_items.${subIndex}.permissions`) : activeSubData?.card2.desc}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 font-mono text-[10px] text-[#00A3FF]/70 uppercase tracking-widest flex items-center justify-between">
              <span>AI TRIGGERS: LIVE</span>
              <span>MOD 07.B</span>
            </div>
          </div>

          {/* Card 3: ბიზნეს ხედვა */}
          <div className="group bg-[#0E1015]/90 border border-blue-500/20 hover:border-[#00A3FF]/60 rounded-xl p-5 lg:p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,163,255,0.2)] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[12px] font-bold text-[#00A3FF] uppercase tracking-wider mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
                <span>03 // {t('node_07_analytics.section_business')}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-sans text-[13.5px] text-gray-200 leading-[1.65]">
                {subIndex !== undefined ? t(`node_07_analytics.sub_items.${subIndex}.business_value`) : activeSubData?.card3.desc}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 font-mono text-[10px] text-[#00A3FF]/70 uppercase tracking-widest flex items-center justify-between">
              <span>ROI: 5% CHURN DROP = +25-95% PROFIT</span>
              <span>MOD 07.C</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer System Indicator */}
      <div className="w-full flex justify-end font-mono text-[10px] text-gray-500/80 tracking-widest uppercase pointer-events-none">
        <span>ARTRON OS // NODE_07 // AI ANALYTICS & BI DASHBOARD</span>
      </div>
    </div>
  );
};
