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

            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => handleSubNodeClick(sub.id)}
                className={`w-full text-left p-3.5 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                  isActive
                    ? 'text-white font-semibold translate-x-1'
                    : 'bg-[#12161A]/60 text-gray-300 hover:text-white'
                }`}
                style={{
                  border: isActive ? `1px solid ${themeColor}` : `1px solid ${themeColor}26`,
                  backgroundColor: isActive ? `${themeColor}1A` : undefined,
                  boxShadow: isActive ? `0 0 18px ${themeColor}26` : undefined
                }}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <span
                    className="font-mono text-[11px] px-2 py-0.5 rounded border transition-colors shrink-0"
                    style={{
                      backgroundColor: isActive ? themeColor : `${themeColor}1A`,
                      color: isActive ? '#0A0D11' : themeColor,
                      borderColor: isActive ? themeColor : `${themeColor}4D`,
                      fontWeight: isActive ? 700 : 500
                    }}
                  >
                    {sub.id}
                  </span>
                  <span className="font-sans text-[13px] leading-snug tracking-tight truncate">
                    {t(`subchapters.${sub.id}`) || sub.title.replace(/^0\d\.\d+\s*\/\/\s*/, '')}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="font-mono text-[11px] transition-all duration-200"
                    style={{
                      color: themeColor,
                      opacity: isActive ? 1 : 0
                    }}
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
      <div
        className="pt-4 border-t"
        style={{ borderColor: `${themeColor}26` }}
      >
        <button
          type="button"
          onClick={() => {
            soundEngine.playPulseNode();
            onResetToCore();
          }}
          className="w-full py-3.5 px-4 bg-[#12161A]/80 text-white rounded-lg font-mono text-[12px] font-bold tracking-[1.5px] uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
          style={{
            borderColor: `${themeColor}4D`,
            borderWidth: '1px'
          }}
        >
          <span className="group-hover:-translate-x-1 transition-transform" style={{ color: themeColor }}>‹</span>
          <span>{t('system.return_to_core')}</span>
        </button>
      </div>
    </div>
  );
};
