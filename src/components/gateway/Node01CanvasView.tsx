"use client";

import React, { useState, useEffect } from 'react';
import { useI18n } from '@/context/I18nContext';
import { NODE_01_SUB_NODES_DATA } from '@/data/node01CrmData';
import { NodeCardDetailStudio } from './NodeCardDetailStudio';
import { LiveMigrationSimulator } from './widgets/LiveMigrationSimulator';
import { soundEngine } from '@/core';
import { FileSpreadsheet, Sparkles } from 'lucide-react';

interface Node01CanvasViewProps {
  activeSubChapterId: string | null;
  initialAction?: string | null;
  onLaunchConsole?: () => void;
}

export const Node01CanvasView: React.FC<Node01CanvasViewProps> = ({ 
  activeSubChapterId,
  initialAction,
  onLaunchConsole,
}) => {
  const { t } = useI18n();
  const [selectedCardIndex, setSelectedCardIndex] = useState<1 | 2 | 3 | null>(null);
  const [isMigrationSimulatorOpen, setIsMigrationSimulatorOpen] = useState(false);

  useEffect(() => {
    if (activeSubChapterId === '01.6') {
      setIsMigrationSimulatorOpen(true);
      setSelectedCardIndex(null);
    } else if (activeSubChapterId) {
      setIsMigrationSimulatorOpen(false);
      setSelectedCardIndex(null);
    }
  }, [activeSubChapterId]);

  const isSubNodeSelected = Boolean(activeSubChapterId && NODE_01_SUB_NODES_DATA[activeSubChapterId]);
  const activeSubData = activeSubChapterId ? NODE_01_SUB_NODES_DATA[activeSubChapterId] : null;

  const subIdxMap: Record<string, number> = {
    '01.1': 0,
    '01.2': 1,
    '01.3': 2,
    '01.4': 3,
    '01.5': 4,
    '01.6': 5,
  };
  const subIndex = activeSubChapterId ? subIdxMap[activeSubChapterId] : undefined;

  const isSimulatorActive =
    (activeSubChapterId === '01.6' && isMigrationSimulatorOpen) ||
    (!activeSubChapterId && isMigrationSimulatorOpen);

  const handleCardClick = (idx: 1 | 2 | 3) => {
    soundEngine.playPulseNode();
    setSelectedCardIndex(idx);
  };

  const handleOpenSimulator = () => {
    soundEngine.playSystemAccess();
    setIsMigrationSimulatorOpen(true);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 lg:p-7 animate-fadeIn">
      {/* Top HUD Header (only if not in deep-dive studio or simulator) */}
      {!selectedCardIndex && !isSimulatorActive && (
        <div className="w-full flex items-center justify-between pointer-events-auto">
          <div
            className={`transition-all duration-500 ${
              isSubNodeSelected
                ? 'transform translate-y-0 opacity-100 bg-[#0E1015]/90 border border-[#00B0FF]/30 px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(0,176,255,0.15)] backdrop-blur-md'
                : 'opacity-0 -translate-y-2'
            }`}
          >
            <div className="font-mono text-[11px] text-[#00B0FF] uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00B0FF] animate-pulse shadow-[0_0_8px_#00B0FF]" />
              {t('node_01_crm.title')}
            </div>
            {activeSubChapterId && (
              <div className="font-sans text-[13px] text-white font-medium tracking-tight mt-0.5 pl-4">
                [ {t(`subchapters.${activeSubChapterId}`)} ]
              </div>
            )}
          </div>

          {activeSubChapterId === '01.6' && (
            <button
              type="button"
              onClick={handleOpenSimulator}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#00A3FF]/20 to-[#00ff87]/20 hover:from-[#00A3FF]/30 hover:to-[#00ff87]/30 border border-[#00A3FF]/50 text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,163,255,0.2)] cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#00A3FF]" />
              <span>Excel მიგრაციის სიმულატორი</span>
            </button>
          )}
        </div>
      )}

      {/* Main Canvas Area Content */}
      {isSimulatorActive ? (
        /* State 4: Live Migration Simulator */
        <div className="w-full h-full pointer-events-auto my-auto animate-fadeIn max-w-5xl mx-auto">
          <LiveMigrationSimulator
            onClose={() => setIsMigrationSimulatorOpen(false)}
            onLaunchConsole={onLaunchConsole}
          />
        </div>
      ) : selectedCardIndex !== null ? (
        /* State 3: Interactive Deep-Dive Studio & Live CRM Visualizer */
        <div className="w-full h-full pointer-events-auto my-auto animate-fadeIn">
          <NodeCardDetailStudio
            nodeId={1}
            nodeTitle={t('node_01_crm.title')}
            activeSubChapterId={activeSubChapterId}
            subNodeTitle={activeSubChapterId ? t(`subchapters.${activeSubChapterId}`) : ''}
            cardIndex={selectedCardIndex}
            onSelectCardIndex={(idx) => setSelectedCardIndex(idx)}
            onClose={() => setSelectedCardIndex(null)}
            cardData={activeSubData}
            accentColor="#00B0FF"
          />
        </div>
      ) : !isSubNodeSelected ? (
        /* State 1: Centered Intro Text overlay over SVG matrix */
        <div className="my-auto mx-auto max-w-2xl text-center pointer-events-auto bg-[#0A0D11]/85 border border-[#00B0FF]/30 p-7 lg:p-9 rounded-2xl backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] animate-fadeIn space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00B0FF]/10 border border-[#00B0FF]/30 font-mono text-[11px] text-[#00B0FF] uppercase tracking-[0.2em]">
            <span className="w-2 h-2 rounded-full bg-[#00B0FF] animate-pulse" />
            {t('system.node_01_core')}
          </div>

          <h2 className="font-mono text-[22px] font-bold text-[#00B0FF] uppercase tracking-wide leading-tight shadow-sky-500/10 text-shadow">
            {t('node_01_crm.title')}
          </h2>

          <p className="font-sans text-[14px] text-gray-300 leading-[1.6] text-justify max-w-xl mx-auto border-t border-white/10 pt-4">
            {t('node_01_crm.short_desc')}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleOpenSimulator}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-bold text-black bg-gradient-to-r from-[#00A3FF] via-[#00d2ff] to-[#00ff87] hover:opacity-95 transition-all shadow-[0_0_25px_rgba(0,163,255,0.4)] cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>გახსენით ცოცხალი Excel მიგრაციის სიმულატორი</span>
            </button>
          </div>
        </div>
      ) : (
        /* State 2: 3-Column / 3-Card Layout Container (Clickable) */
        <div className="my-auto w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 pointer-events-auto animate-fadeIn">
          {/* Card 1: ფუნქციონალური აღწერა */}
          <div
            onClick={() => handleCardClick(1)}
            className="group bg-[#0E1015]/90 border border-sky-500/20 hover:border-[#00B0FF] rounded-xl p-5 lg:p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,176,255,0.3)] transition-all duration-300 flex flex-col justify-between cursor-pointer hover:scale-[1.02]"
          >
            <div>
              <div className="font-mono text-[12px] font-bold text-[#00B0FF] uppercase tracking-wider mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
                <span>01 // {t('node_01_crm.section_functional')}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B0FF] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-sans text-[13.5px] text-gray-200 leading-[1.65]">
                {subIndex !== undefined ? t(`node_01_crm.sub_items.${subIndex}.functional_desc`) : activeSubData?.card1.desc}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 font-mono text-[10px] text-[#00B0FF] uppercase tracking-widest flex items-center justify-between">
              <span>დეტალები &amp; LIVE CRM →</span>
              <span>MOD 01.A</span>
            </div>
          </div>

          {/* Card 2: უფლებამოსილებები და მართვა */}
          <div
            onClick={() => handleCardClick(2)}
            className="group bg-[#0E1015]/90 border border-sky-500/20 hover:border-[#00B0FF] rounded-xl p-5 lg:p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,176,255,0.3)] transition-all duration-300 flex flex-col justify-between cursor-pointer hover:scale-[1.02]"
          >
            <div>
              <div className="font-mono text-[12px] font-bold text-[#00B0FF] uppercase tracking-wider mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
                <span>02 // {t('node_01_crm.section_permissions')}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B0FF] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-sans text-[13px] text-gray-300 leading-[1.65] font-mono border-l-2 border-[#00B0FF]/40 pl-3">
                {subIndex !== undefined ? t(`node_01_crm.sub_items.${subIndex}.permissions`) : activeSubData?.card2.desc}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 font-mono text-[10px] text-[#00B0FF] uppercase tracking-widest flex items-center justify-between">
              <span>RLS მატრიცა &amp; წესები →</span>
              <span>MOD 01.B</span>
            </div>
          </div>

          {/* Card 3: ბიზნეს ხედვა */}
          <div
            onClick={() => handleCardClick(3)}
            className="group bg-[#0E1015]/90 border border-sky-500/20 hover:border-[#00B0FF] rounded-xl p-5 lg:p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,176,255,0.3)] transition-all duration-300 flex flex-col justify-between cursor-pointer hover:scale-[1.02]"
          >
            <div>
              <div className="font-mono text-[12px] font-bold text-[#00B0FF] uppercase tracking-wider mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
                <span>03 // {t('node_01_crm.section_business')}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B0FF] opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="font-sans text-[13.5px] text-gray-200 leading-[1.65]">
                {subIndex !== undefined ? t(`node_01_crm.sub_items.${subIndex}.business_value`) : activeSubData?.card3.desc}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 font-mono text-[10px] text-[#00B0FF] uppercase tracking-widest flex items-center justify-between">
              <span>ROI &amp; LTV ანალიტიკა →</span>
              <span>MOD 01.C</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer System Indicator */}
      {!selectedCardIndex && !isSimulatorActive && (
        <div className="w-full flex justify-end font-mono text-[10px] text-gray-500/80 tracking-widest uppercase pointer-events-none">
          <span>{t('system.node_01_secure_gateway')}</span>
        </div>
      )}
    </div>
  );
};
