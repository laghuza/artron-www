"use client";

import React from 'react';
import { SubChapter } from '@/types/gateway';
import { useI18n } from '@/context/I18nContext';
import { soundEngine } from '@/core';

interface NodeSubNodeListProps {
  nodeId: number;
  nodeCode: string;
  title: string;
  subChapters: SubChapter[];
  activeSubChapterId: string | null;
  themeColor: string;
  onSelectSubChapter: (subId: string) => void;
  onResetToCore: () => void;
}

export const NodeSubNodeList: React.FC<NodeSubNodeListProps> = ({
  nodeId,
  nodeCode,
  title,
  subChapters,
  activeSubChapterId,
  themeColor,
  onSelectSubChapter,
  onResetToCore,
}) => {
  const { t } = useI18n();

  const handleSubNodeClick = (id: string) => {
    soundEngine.playPulseNode();
    onSelectSubChapter(id);
  };

  return (
    <div className="w-full flex flex-col justify-between flex-1 space-y-6 animate-fadeIn">
      <div className="space-y-4">
        {/* Header Title */}
        <div
          className="space-y-1 pb-2 border-b"
          style={{ borderColor: `${themeColor}33` }}
        >
          <div
            className="font-mono text-[11px] uppercase tracking-[0.2em] flex items-center gap-2"
            style={{ color: themeColor }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                backgroundColor: themeColor,
                boxShadow: `0 0 8px ${themeColor}`
              }}
            />
            [ NODE_0{nodeId} // {nodeCode} ]
          </div>
          <h2 className="text-[19px] lg:text-[20px] font-bold text-white tracking-tight uppercase font-mono leading-tight">
            {title}
          </h2>
        </div>

        {/* Sub-Nodes List with Geometric Borders */}
        <div className="space-y-2.5 pt-1">
          {subChapters.map((sub) => {
            const isActive = activeSubChapterId === sub.id;
            const isMigrationEngine = sub.id === '01.6';

            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => handleSubNodeClick(sub.id)}
                className={`w-full text-left p-3.5 rounded-lg transition-all duration-300 cursor-pointer flex items-center justify-between group relative overflow-hidden ${
                  isActive
                    ? 'text-white font-semibold translate-x-1'
                    : isMigrationEngine
                    ? 'bg-gradient-to-r from-[#00A3FF]/15 via-[#00ff87]/10 to-[#0A0D11]/90 text-white hover:from-[#00A3FF]/25 hover:via-[#00ff87]/20 shadow-[0_0_20px_rgba(0,163,255,0.18)] hover:shadow-[0_0_25px_rgba(0,255,135,0.25)]'
                    : 'bg-[#12161A]/60 text-gray-300 hover:text-white'
                }`}
                style={{
                  border: isActive
                    ? `1px solid ${isMigrationEngine ? '#00ff87' : themeColor}`
                    : isMigrationEngine
                    ? '1px solid rgba(0, 163, 255, 0.5)'
                    : `1px solid ${themeColor}26`,
                  backgroundColor: isActive
                    ? (isMigrationEngine ? 'rgba(0, 255, 135, 0.18)' : `${themeColor}1A`)
                    : undefined,
                  boxShadow: isActive
                    ? (isMigrationEngine ? '0 0 25px rgba(0, 255, 135, 0.35)' : `0 0 18px ${themeColor}26`)
                    : isMigrationEngine
                    ? '0 0 16px rgba(0, 163, 255, 0.15)'
                    : undefined
                }}
              >
                {/* Glowing Corner Aura for Live Simulator */}
                {isMigrationEngine && (
                  <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 w-14 h-14 bg-gradient-to-br from-[#00ff87]/25 to-[#00A3FF]/20 rounded-full blur-md pointer-events-none animate-pulse" />
                )}

                <div className="flex items-center gap-3 min-w-0 pr-2 relative z-10">
                  <span
                    className="font-mono text-[11px] px-2 py-0.5 rounded border transition-colors shrink-0 flex items-center gap-1.5"
                    style={{
                      backgroundColor: isActive
                        ? (isMigrationEngine ? '#00ff87' : themeColor)
                        : (isMigrationEngine ? 'rgba(0, 163, 255, 0.25)' : `${themeColor}1A`),
                      color: isActive
                        ? '#0A0D11'
                        : (isMigrationEngine ? '#00E5FF' : themeColor),
                      borderColor: isActive
                        ? (isMigrationEngine ? '#00ff87' : themeColor)
                        : (isMigrationEngine ? '#00A3FF' : `${themeColor}4D`),
                      fontWeight: isActive || isMigrationEngine ? 700 : 500
                    }}
                  >
                    {isMigrationEngine && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse shadow-[0_0_6px_#00ff87]" />
                    )}
                    {sub.id}
                  </span>
                  <span className={`font-sans text-[13px] leading-snug tracking-tight truncate ${isMigrationEngine ? 'text-white font-medium flex items-center gap-1.5' : ''}`}>
                    {t(`subchapters.${sub.id}`) || sub.title.replace(/^0\d\.\d+\s*\/\/\s*/, '')}
                    {isMigrationEngine && (
                      <span className="inline-flex items-center gap-1 font-mono text-[9px] px-1.5 py-0.5 rounded bg-gradient-to-r from-[#00A3FF]/25 to-[#00ff87]/25 text-[#00ff87] border border-[#00ff87]/50 tracking-wider uppercase font-bold shrink-0 ml-1 shadow-[0_0_8px_rgba(0,255,135,0.3)]">
                        ⚡ LIVE
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0 relative z-10">
                  <span
                    className="font-mono text-[11px] transition-all duration-200"
                    style={{
                      color: isMigrationEngine ? '#00ff87' : themeColor,
                      opacity: isActive ? 1 : (isMigrationEngine ? 0.9 : 0)
                    }}
                  >
                    {isMigrationEngine ? '⚡' : '→'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
