"use client";

import React from 'react';
import { useI18n } from '@/context/I18nContext';
import { NODE_04_SUB_NODES_DATA } from '@/data/node04MobileData';

interface Node04CanvasViewProps {
  activeSubChapterId: string | null;
}

export const Node04CanvasView: React.FC<Node04CanvasViewProps> = ({ activeSubChapterId }) => {
  const { t } = useI18n();
  const isSubNodeSelected = Boolean(activeSubChapterId && NODE_04_SUB_NODES_DATA[activeSubChapterId]);
  const activeSubData = activeSubChapterId ? NODE_04_SUB_NODES_DATA[activeSubChapterId] : null;

  const subIdxMap: Record<string, number> = {
    '04.1': 0,
    '04.2': 1,
    '04.3': 2,
    '04.4': 3,
  };
  const subIndex = activeSubChapterId ? subIdxMap[activeSubChapterId] : undefined;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 lg:p-8 animate-fadeIn">
      {/* Top HUD Header */}
      <div className="w-full flex items-center justify-between pointer-events-auto">
        <div
          className={`transition-all duration-500 ${
            isSubNodeSelected
              ? 'transform translate-y-0 opacity-100 bg-[#0E1015]/90 border border-[#00ff87]/30 px-4 py-2.5 rounded-lg shadow-[0_0_15px_rgba(0,255,135,0.15)] backdrop-blur-md'
              : 'opacity-0 -translate-y-2'
          }`}
        >
          <div className="font-mono text-[11px] text-[#00ff87] uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse shadow-[0_0_8px_#00ff87]" />
            {t('node_04_mobile.title')}
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
        /* State 1: Centered Intro Text overlay over SVG matrix */
        <div className="my-auto mx-auto max-w-2xl text-center pointer-events-auto bg-[#0A0D11]/85 border border-[#00ff87]/30 p-7 lg:p-9 rounded-2xl backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/30 font-mono text-[11px] text-[#00ff87] uppercase tracking-[0.2em] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
            [ NODE_04 // ATHLETE MOBILE ECOSYSTEM ]
          </div>

          <h2 className="font-mono text-[22px] font-bold text-[#00ff87] uppercase tracking-wide leading-tight mb-4 shadow-emerald-500/10 text-shadow">
            {t('node_04_mobile.title')}
          </h2>

          <p className="font-sans text-[14px] text-gray-300 leading-[1.6] text-justify max-w-xl mx-auto border-t border-white/10 pt-4">
            {t('node_04_mobile.short_desc')}
          </p>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[10px] text-gray-400">
            <div className="p-2 rounded bg-white/5 border border-white/10 text-[#00ff87]">
              DYNAMIC QR
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/10 text-[#00ff87]">
              FAMILY PROFILES
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/10 text-[#00ff87]">
              CLASS BOOKING
            </div>
            <div className="p-2 rounded bg-white/5 border border-white/10 text-[#00ff87]">
              14-DAY RETURN
            </div>
          </div>
        </div>
      ) : (
        /* State 2: 3-Column / 3-Card Layout Container */
        <div className="my-auto w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 pointer-events-auto animate-fadeIn">
          {/* Card 1: ფუნქციონალური აღწერა */}
          <div className="group bg-[#0E1015]/90 border border-emerald-500/20 hover:border-[#00ff87]/60 rounded-xl p-5 lg:p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,255,135,0.2)] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[12px] font-bold text-[#00ff87] uppercase tracking-wider mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
                <span>01 // {t('node_04_mobile.section_functional')}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-sans text-[13.5px] text-gray-200 leading-[1.65]">
                {subIndex !== undefined ? t(`node_04_mobile.sub_items.${subIndex}.functional_desc`) : activeSubData?.card1.desc}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 font-mono text-[10px] text-[#00ff87]/70 uppercase tracking-widest flex items-center justify-between">
              <span>NATIVE: IOS & ANDROID</span>
              <span>MOD 04.A</span>
            </div>
          </div>

          {/* Card 2: უფლებამოსილებები და მართვა */}
          <div className="group bg-[#0E1015]/90 border border-emerald-500/20 hover:border-[#00ff87]/60 rounded-xl p-5 lg:p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,255,135,0.2)] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[12px] font-bold text-[#00ff87] uppercase tracking-wider mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
                <span>02 // {t('node_04_mobile.section_permissions')}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-sans text-[13px] text-gray-300 leading-[1.65] font-mono border-l-2 border-[#00ff87]/40 pl-3">
                {subIndex !== undefined ? t(`node_04_mobile.sub_items.${subIndex}.permissions`) : activeSubData?.card2.desc}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 font-mono text-[10px] text-[#00ff87]/70 uppercase tracking-widest flex items-center justify-between">
              <span>SECURITY: ANTI-SCREENSHOT</span>
              <span>MOD 04.B</span>
            </div>
          </div>

          {/* Card 3: ბიზნეს ხედვა */}
          <div className="group bg-[#0E1015]/90 border border-emerald-500/20 hover:border-[#00ff87]/60 rounded-xl p-5 lg:p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,255,135,0.2)] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[12px] font-bold text-[#00ff87] uppercase tracking-wider mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
                <span>03 // {t('node_04_mobile.section_business')}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-sans text-[13.5px] text-gray-200 leading-[1.65]">
                {subIndex !== undefined ? t(`node_04_mobile.sub_items.${subIndex}.business_value`) : activeSubData?.card3.desc}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 font-mono text-[10px] text-[#00ff87]/70 uppercase tracking-widest flex items-center justify-between">
              <span>APP CONVERSION: +45%</span>
              <span>MOD 04.C</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer System Indicator */}
      <div className="w-full flex justify-end font-mono text-[10px] text-gray-500/80 tracking-widest uppercase pointer-events-none">
        <span>ARTRON OS // NODE_04 // ATHLETE MOBILE CLIENT</span>
      </div>
    </div>
  );
};
