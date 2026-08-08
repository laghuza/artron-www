"use client";

import React from 'react';
import { SubChapter } from '@/types/gateway';
import { soundEngine } from '@/core';

interface Node01SubNodeListProps {
  subChapters: SubChapter[];
  activeSubChapterId: string | null;
  onSelectSubChapter: (subId: string) => void;
  onResetToCore: () => void;
}

export const Node01SubNodeList: React.FC<Node01SubNodeListProps> = ({
  subChapters,
  activeSubChapterId,
  onSelectSubChapter,
  onResetToCore,
}) => {
  const handleSubNodeClick = (id: string) => {
    soundEngine.playPulseNode();
    onSelectSubChapter(id);
  };

  return (
    <div className="w-full flex flex-col justify-between flex-1 space-y-6 animate-fadeIn">
      <div className="space-y-4">
        {/* Header Title */}
        <div className="space-y-1 pb-2 border-b border-[rgba(0,176,255,0.2)]">
          <div className="font-mono text-[11px] text-[#00B0FF] uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00B0FF] animate-pulse shadow-[0_0_8px_#00B0FF]" />
            [ NODE_01 // SOVEREIGN CRM ]
          </div>
          <h2 className="text-[20px] font-bold text-white tracking-tight uppercase font-mono leading-tight">
            01 // სპორტსმენთა 360° პროფილი და სამართლებრივი უსაფრთხოება (CRM)
          </h2>
        </div>

        {/* 5 Sub-Nodes List with Geometric Borders */}
        <div className="space-y-3 pt-1">
          {subChapters.map((sub) => {
            const isActive = activeSubChapterId === sub.id;

            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => handleSubNodeClick(sub.id)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                  isActive
                    ? 'bg-[#00B0FF]/10 border-1px border-[#00B0FF] text-white shadow-[0_0_20px_rgba(0,176,255,0.2)] font-semibold translate-x-1'
                    : 'bg-[#12161A]/60 border border-[rgba(0,176,255,0.2)] text-gray-300 hover:text-white hover:border-[#00B0FF]/50 hover:bg-[#00B0FF]/5'
                }`}
                style={{
                  border: isActive ? '1px solid #00B0FF' : '1px solid rgba(0, 176, 255, 0.2)',
                  backgroundColor: isActive ? 'rgba(0, 176, 255, 0.1)' : undefined
                }}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <span
                    className={`font-mono text-[11px] px-2 py-0.5 rounded border transition-colors shrink-0 ${
                      isActive
                        ? 'bg-[#00B0FF] text-[#0A0D11] border-[#00B0FF] font-bold'
                        : 'bg-[#00B0FF]/10 text-[#00B0FF] border-[#00B0FF]/30 group-hover:bg-[#00B0FF]/20'
                    }`}
                  >
                    {sub.id}
                  </span>
                  <span className="font-sans text-[13px] leading-snug tracking-tight truncate">
                    {sub.title.replace(/^01\.\d+\s*\/\/\s*/, '')}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`font-mono text-[11px] transition-all duration-200 ${
                      isActive ? 'text-[#00B0FF] opacity-100 translate-x-0' : 'text-gray-500 opacity-0 group-hover:opacity-100 -translate-x-1'
                    }`}
                  >
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation Button: RETURN TO SYSTEM CORE */}
      <div className="pt-4 border-t border-[rgba(0,176,255,0.15)]">
        <button
          type="button"
          onClick={() => {
            soundEngine.playPulseNode();
            onResetToCore();
          }}
          className="w-full py-3.5 px-4 bg-[#12161A]/80 hover:bg-[#00B0FF]/10 text-[#00B0FF] hover:text-white border border-[rgba(0,176,255,0.3)] hover:border-[#00B0FF] rounded-lg font-mono text-[12px] font-bold tracking-[1.5px] uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">‹</span>
          <span>RETURN TO SYSTEM CORE</span>
        </button>
      </div>
    </div>
  );
};
