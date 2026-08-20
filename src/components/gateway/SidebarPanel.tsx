"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/context/I18nContext';
import { ViewState, ArtronNode, FacilityPreset } from '@/types/gateway';
import {
  Node02BlueprintWidget, Node03ProWidget, Node04MobileWidget,
  Node05MarketplaceWidget, Node06MarketWidget, Node07AnalyticsWidget, Node08GdprShieldWidget, Node09AccessWidget
} from './widgets/NodeWidgets';
import { FacilityPresetBar } from './widgets/FacilityPresetBar';
import { LegacyVsArtronComparison } from './widgets/LegacyVsArtronComparison';
import { DataMigrationBanner } from './widgets/DataMigrationBanner';
import { soundEngine } from '@/core';
import { NodeSubNodeList } from './NodeSubNodeList';

interface SidebarPanelProps {
  viewState: ViewState;
  activeNode: ArtronNode | null;
  activeSubChapterId: string | null;
  activePreset?: FacilityPreset;
  onSelectPreset?: (preset: FacilityPreset) => void;
  onResetToCore: () => void;
  onSelectSubChapter: (subId: string) => void;
  onRequestAccess: () => void;
  onSelectB2B?: () => void;
  onSelectOtp?: () => void;
}

export const SidebarPanel: React.FC<SidebarPanelProps> = ({
  viewState,
  activeNode,
  activeSubChapterId,
  activePreset = 'ALL',
  onSelectPreset,
  onResetToCore,
  onSelectSubChapter,
  onRequestAccess,
  onSelectB2B,
  onSelectOtp,
}) => {
  const { lang, setLang, t } = useI18n();
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundEngine.setMuted(nextMute);
    if (!nextMute) soundEngine.playPulseNode();
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundEngine.playPulseNode();
        onResetToCore();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onResetToCore]);

  return (
    <aside className="w-full lg:w-[40%] h-full bg-[#1A1D23]/55 border-r border-[rgba(156,163,175,0.12)] backdrop-blur-[24px] p-6 lg:p-7 flex flex-col justify-between select-none overflow-y-auto">
      {/* Top Section */}
      <div className="w-full flex flex-col flex-1 min-h-0 mb-4">
        {/* Header Controls aligned flush to the left */}
        <div className="w-full border-b border-[rgba(156,163,175,0.12)] pb-3.5 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="min-w-[140px] inline-flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] hover:text-white border border-[rgba(156,163,175,0.2)] hover:border-[#00A3FF]/60 bg-[#0c1017]/80 hover:bg-[#0c1017] px-3.5 py-1.8 rounded transition-all cursor-pointer shadow-sm"
            >
              <span className={`w-1.5 h-1.5 rounded-full mr-2.5 ${!isMuted ? 'bg-[#00A3FF] animate-pulse shadow-[0_0_8px_#00A3FF]' : 'bg-gray-600'}`} />
              <span>[ {isMuted ? t('hud.audio_muted') : t('hud.audio_on')} ]</span>
            </button>
            <button
              onClick={() => {
                soundEngine.playPulseNode();
                setLang(lang === 'GE' ? 'EN' : 'GE');
              }}
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#94A3B8] hover:text-[#00A3FF] border border-[rgba(156,163,175,0.2)] hover:border-[#00A3FF]/60 bg-[#0c1017]/80 px-3.5 py-1.8 rounded transition-all flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <span>[ {lang === 'GE' ? t('hud.lang_ge') : t('hud.lang_en')} ]</span>
            </button>
          </div>
          <Link
            href="/"
            onClick={() => soundEngine.playPulseNode()}
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#94A3B8] hover:text-[#00A3FF] border border-[rgba(156,163,175,0.2)] hover:border-[#00A3FF]/60 bg-[#0c1017]/80 px-3.5 py-1.8 rounded transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>{t('hud.return_to_main')}</span>
          </Link>
        </div>

        {/* Core Init Hero Card or Selected Node Sub-Nodes List */}
        {viewState === 'CORE_INIT' || !activeNode ? (
          <div className="animate-fadeIn w-full flex-1 flex flex-col justify-start p-5 lg:p-6 bg-[#0B0F17]/80 border border-white/10 rounded-xl backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.45)] space-y-3.5">
            {/* 1. Facility Type Presets Selector */}
            {onSelectPreset && (
              <FacilityPresetBar
                activePreset={activePreset}
                onSelectPreset={onSelectPreset}
              />
            )}

            <div>
              <div className="font-mono text-[10px] text-[#00A3FF] uppercase tracking-[0.2em] mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-pulse shadow-[0_0_8px_#00A3FF]" />
                {t('system.tagline_top')}
              </div>
              <h1 className="tracking-tight text-white uppercase font-extrabold text-[28px] lg:text-[32px] leading-[1.05] mb-1 font-sans">
                ARTRON SPORTS OS
              </h1>
              <p className="font-mono text-[10px] text-[#94A3B8] mb-2.5 tracking-widest uppercase border-l-2 border-[#00A3FF]/40 pl-2">
                {t('system.motto')}
              </p>
              <p className="font-sans text-[12px] leading-[1.6] text-slate-300">
                {t('system.description')}
              </p>
            </div>

            {/* 2. Legacy vs Artron Comparison Matrix */}
            <LegacyVsArtronComparison />

            {/* 3. 48h Data Migration Guarantee */}
            <DataMigrationBanner />
          </div>
        ) : (
          <NodeSubNodeList
            nodeId={activeNode.id}
            nodeCode={activeNode.nodeCode || `NODE_0${activeNode.id}`}
            title={t(`nodes.node_${activeNode.id}.subtitle`) || activeNode.title}
            subChapters={activeNode.subChapters}
            activeSubChapterId={activeSubChapterId}
            themeColor={
              activeNode.id === 1 ? '#00B0FF' :
              activeNode.id === 3 ? '#D97736' :
              activeNode.id === 5 || activeNode.id === 6 ? '#D4AF37' :
              activeNode.id === 7 ? '#00A3FF' :
              '#00ff87'
            }
            onSelectSubChapter={onSelectSubChapter}
            onResetToCore={onResetToCore}
          />
        )}

      </div>

      {/* Clean Telemetry Status Line (Non-overlapping) */}
      <div className="w-full border-t border-white/5 pt-2.5 pb-1 flex items-center justify-between font-mono text-[10px] text-[#64748B] select-none">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-pulse" />
          <span>[ {t('telemetry.node_status')}: <strong className="text-white">{t('telemetry.active')}</strong> ]</span>
        </span>
        <span>[ {t('telemetry.latency')}: <strong className="text-[#00A3FF]">0.4MS</strong> ]</span>
        <span>[ {t('telemetry.db_pool')}: <strong className="text-white">{t('telemetry.active')}</strong> ]</span>
      </div>
    </aside>
  );
};

