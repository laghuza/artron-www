"use client";

import React from 'react';
import { NODE_01_SUB_NODES_DATA } from '@/data/node01CrmData';

interface Node01CanvasViewProps {
  activeSubChapterId: string | null;
}

export const Node01CanvasView: React.FC<Node01CanvasViewProps> = ({ activeSubChapterId }) => {
  const isSubNodeSelected = Boolean(activeSubChapterId && NODE_01_SUB_NODES_DATA[activeSubChapterId]);
  const activeSubData = activeSubChapterId ? NODE_01_SUB_NODES_DATA[activeSubChapterId] : null;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 lg:p-8 animate-fadeIn">
      {/* Top HUD Header */}
      <div className="w-full flex items-center justify-between pointer-events-auto">
        <div
          className={`transition-all duration-500 ${
            isSubNodeSelected
              ? 'transform translate-y-0 opacity-100 bg-[#0E1015]/90 border border-[#00B0FF]/30 px-4 py-2.5 rounded-lg shadow-[0_0_15px_rgba(0,176,255,0.15)] backdrop-blur-md'
              : 'opacity-0 -translate-y-2'
          }`}
        >
          <div className="font-mono text-[11px] text-[#00B0FF] uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00B0FF] animate-pulse shadow-[0_0_8px_#00B0FF]" />
            01 // სპორტსმენთა 360° პროფილი და სამართლებრივი უსაფრთხოება (CRM)
          </div>
          {activeSubData && (
            <div className="font-sans text-[13px] text-white font-medium tracking-tight mt-0.5 pl-4">
              [ {activeSubData.code} // {activeSubData.title} ]
            </div>
          )}
        </div>
      </div>

      {/* Main Canvas Area Content: State 1 vs State 2 */}
      {!isSubNodeSelected ? (
        /* State 1: Centered Intro Text overlay over SVG matrix */
        <div className="my-auto mx-auto max-w-2xl text-center pointer-events-auto bg-[#0A0D11]/85 border border-[#00B0FF]/30 p-7 lg:p-9 rounded-2xl backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00B0FF]/10 border border-[#00B0FF]/30 font-mono text-[11px] text-[#00B0FF] uppercase tracking-[0.2em] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00B0FF] animate-pulse" />
            NODE_01 // SOVEREIGN CRM CORE
          </div>

          <h2 className="font-mono text-[22px] font-bold text-[#00B0FF] uppercase tracking-wide leading-tight mb-4 shadow-sky-500/10 text-shadow">
            01 // სპორტსმენთა 360° პროფილი და სამართლებრივი უსაფრთხოება (CRM)
          </h2>

          <p className="font-sans text-[14px] text-gray-300 leading-[1.6] text-justify max-w-xl mx-auto border-t border-white/10 pt-4">
            Artron CRM არის მრავალშრიანი, დინამიური ბაზა, რომელიც საშუალებას გაძლევთ ერთიან ციფრულ სივრცეში მართოთ სხვადასხვა სტატუსის მქონე მომხმარებლები — პროფესიონალი სპორტსმენებიდან დაწყებული, ერთჯერადი სტუმრებითა და კორპორატიული ჯგუფებით დასრულებული. სისტემა ავტომატურად აკონტროლებს იურიდიულ და სამედიცინო შესაბამისობას, რაც თქვენს ბიზნესს სრულად იცავს სამართლებრივი რისკებისგან.
          </p>
        </div>
      ) : (
        /* State 2: 3-Column / 3-Card Layout Container */
        <div className="my-auto w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 pointer-events-auto animate-fadeIn">
          {/* Card 1: ფუნქციონალური აღწერა */}
          <div className="group bg-[#0E1015]/90 border border-sky-500/20 hover:border-[#00B0FF]/60 rounded-xl p-5 lg:p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,176,255,0.2)] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[12px] font-bold text-[#00B0FF] uppercase tracking-wider mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
                <span>01 // ფუნქციონალური აღწერა</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B0FF] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-sans text-[13.5px] text-gray-200 leading-[1.65]">
                {activeSubData?.card1.desc}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 font-mono text-[10px] text-[#00B0FF]/70 uppercase tracking-widest flex items-center justify-between">
              <span>STATUS: ACTIVE</span>
              <span>MODULE 01.A</span>
            </div>
          </div>

          {/* Card 2: უფლებამოსილებები და მართვა */}
          <div className="group bg-[#0E1015]/90 border border-sky-500/20 hover:border-[#00B0FF]/60 rounded-xl p-5 lg:p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,176,255,0.2)] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[12px] font-bold text-[#00B0FF] uppercase tracking-wider mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
                <span>02 // უფლებამოსილებები და მართვა</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B0FF] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-sans text-[13px] text-gray-300 leading-[1.65] font-mono border-l-2 border-[#00B0FF]/40 pl-3">
                {activeSubData?.card2.desc}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 font-mono text-[10px] text-[#00B0FF]/70 uppercase tracking-widest flex items-center justify-between">
              <span>RLS POLICY: ENFORCED</span>
              <span>MODULE 01.B</span>
            </div>
          </div>

          {/* Card 3: ბიზნეს ხედვა */}
          <div className="group bg-[#0E1015]/90 border border-sky-500/20 hover:border-[#00B0FF]/60 rounded-xl p-5 lg:p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,176,255,0.2)] transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[12px] font-bold text-[#00B0FF] uppercase tracking-wider mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
                <span>03 // ბიზნეს ხედვა</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B0FF] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-sans text-[13.5px] text-gray-200 leading-[1.65]">
                {activeSubData?.card3.desc}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 font-mono text-[10px] text-[#00B0FF]/70 uppercase tracking-widest flex items-center justify-between">
              <span>ROI METRIC: OPTIMIZED</span>
              <span>MODULE 01.C</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer System Indicator inside 60% Canvas */}
      <div className="w-full flex justify-end font-mono text-[10px] text-gray-500/80 tracking-widest uppercase pointer-events-none">
        <span>ARTRON CRM // NODE_01 // SECURE GATEWAY</span>
      </div>
    </div>
  );
};
