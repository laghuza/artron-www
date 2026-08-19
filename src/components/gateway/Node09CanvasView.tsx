"use client";

import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { NODE_09_SUB_NODES_DATA } from '@/data/node09GatewayData';
import { soundEngine } from '@/core';

interface Node09CanvasViewProps {
  activeSubChapterId: string | null;
  onLaunchRegistration?: () => void;
  onLaunchDemo?: () => void;
  onLaunchAuth?: () => void;
}

export const Node09CanvasView: React.FC<Node09CanvasViewProps> = ({
  activeSubChapterId,
  onLaunchRegistration,
  onLaunchDemo,
  onLaunchAuth,
}) => {
  const { t } = useI18n();
  const [sandboxActive, setSandboxActive] = useState(false);
  const isSubNodeSelected = Boolean(activeSubChapterId && NODE_09_SUB_NODES_DATA[activeSubChapterId]);
  const activeSubData = activeSubChapterId ? NODE_09_SUB_NODES_DATA[activeSubChapterId] : null;

  const subIdxMap: Record<string, number> = {
    '09.1': 0,
    '09.2': 1,
    '09.3': 2,
    '09.4': 3,
  };
  const subIndex = activeSubChapterId ? subIdxMap[activeSubChapterId] : undefined;

  const handleLaunchSandbox = () => {
    soundEngine.playSystemAccess();
    if (onLaunchDemo) {
      onLaunchDemo();
    } else {
      setSandboxActive(true);
      setTimeout(() => {
        setSandboxActive(false);
      }, 4000);
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 lg:p-8 animate-fadeIn">
      {/* Top HUD Header */}
      <div className="w-full flex items-center justify-between pointer-events-auto">
        <div
          className={`transition-all duration-500 ${
            isSubNodeSelected
              ? 'transform translate-y-0 opacity-100 bg-[#0E1015]/90 border border-emerald-500/30 px-4 py-2.5 rounded-lg shadow-[0_0_15px_rgba(0,255,135,0.15)] backdrop-blur-md'
              : 'opacity-0 -translate-y-2'
          }`}
        >
          <div className="font-mono text-[11px] text-[#00ff87] uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse shadow-[0_0_8px_#00ff87]" />
            {t('node_09_core_init.title')}
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
        <div className="my-auto mx-auto max-w-2xl text-center pointer-events-auto bg-[#0A0D11]/85 border border-emerald-500/30 p-7 lg:p-9 rounded-2xl backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-mono text-[11px] text-[#00ff87] uppercase tracking-[0.2em] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
            {t('gateway.node_09_badge')}
          </div>

          <h2 className="font-mono text-[22px] font-bold text-white uppercase tracking-wide leading-tight mb-4 text-shadow">
            {t('node_09_core_init.title')}
          </h2>

          <p className="font-sans text-[14px] text-gray-300 leading-[1.6] text-justify max-w-xl mx-auto border-t border-white/10 pt-4">
            {t('node_09_core_init.short_desc')}
          </p>

          {/* Quick Action Matrix in State 1: 3 Explicit Actions */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-[11px]">
            {onLaunchRegistration && (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playPulseNode();
                  onLaunchRegistration();
                }}
                className="px-5 py-2.5 rounded-lg bg-[#00B0FF]/20 hover:bg-[#00B0FF]/30 border border-[#00B0FF]/60 text-[#00B0FF] font-semibold transition-all cursor-pointer shadow-[0_0_20px_rgba(0,176,255,0.25)] hover:scale-[1.02] active:scale-[0.98]"
              >
                {t('gateway.btn_start_trial')}
              </button>
            )}

            <button
              type="button"
              onClick={handleLaunchSandbox}
              className="px-4 py-2.5 rounded-lg bg-[#00ff87]/15 hover:bg-[#00ff87]/25 border border-[#00ff87]/50 text-[#00ff87] font-semibold transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              {sandboxActive ? t('gateway.sandbox_running') : t('gateway.btn_run_sandbox')}
            </button>

            {onLaunchAuth && (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playPulseNode();
                  onLaunchAuth();
                }}
                className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/50 text-gray-300 hover:text-white transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                {t('gateway.btn_operator_console')}
              </button>
            )}
          </div>

          {sandboxActive && (
            <div className="mt-4 p-3 rounded-lg bg-[#00ff87]/10 border border-[#00ff87]/40 font-mono text-[11px] text-[#00ff87] animate-pulse">
              {t('gateway.sandbox_active_msg')}
            </div>
          )}
        </div>
      ) : (
        /* State 2: 3-Column / 3-Card Layout Container + Bottom Action Trigger */
        <div className="my-auto w-full max-w-5xl mx-auto space-y-4 pointer-events-auto animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            {/* Card 1: ფუნქციონალური აღწერა */}
            <div className="group bg-[#0E1015]/90 border border-emerald-500/20 hover:border-[#00ff87]/60 rounded-xl p-5 lg:p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,255,135,0.2)] transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="font-mono text-[12px] font-bold text-[#00ff87] uppercase tracking-wider mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span>01 // {t('node_09_core_init.section_functional')}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="font-sans text-[13.5px] text-gray-200 leading-[1.65]">
                  {subIndex !== undefined ? t(`node_09_core_init.sub_items.${subIndex}.functional_desc`) : activeSubData?.card1.desc}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/5 font-mono text-[10px] text-[#00ff87]/70 uppercase tracking-widest flex items-center justify-between">
                <span>{t('gateway.init_core')}</span>
                <span>{t('gateway.mod_09a')}</span>
              </div>
            </div>

            {/* Card 2: მმართველობითი კონტროლი */}
            <div className="group bg-[#0E1015]/90 border border-emerald-500/20 hover:border-[#00ff87]/60 rounded-xl p-5 lg:p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,255,135,0.2)] transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="font-mono text-[12px] font-bold text-[#00ff87] uppercase tracking-wider mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span>02 // {t('node_09_core_init.section_permissions')}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="font-sans text-[13px] text-gray-300 leading-[1.65] font-mono border-l-2 border-[#00ff87]/40 pl-3">
                  {subIndex !== undefined ? t(`node_09_core_init.sub_items.${subIndex}.permissions`) : activeSubData?.card2.desc}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/5 font-mono text-[10px] text-[#00ff87]/70 uppercase tracking-widest flex items-center justify-between">
                <span>{t('gateway.admin_dispatcher')}</span>
                <span>{t('gateway.mod_09b')}</span>
              </div>
            </div>

            {/* Card 3: ბიზნეს ხედვა */}
            <div className="group bg-[#0E1015]/90 border border-emerald-500/20 hover:border-[#00ff87]/60 rounded-xl p-5 lg:p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,255,135,0.2)] transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="font-mono text-[12px] font-bold text-[#00ff87] uppercase tracking-wider mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span>03 // {t('node_09_core_init.section_business')}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="font-sans text-[13.5px] text-gray-200 leading-[1.65]">
                  {subIndex !== undefined ? t(`node_09_core_init.sub_items.${subIndex}.business_value`) : activeSubData?.card3.desc}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/5 font-mono text-[10px] text-[#00ff87]/70 uppercase tracking-widest flex items-center justify-between">
                <span>{t('gateway.roi_migration')}</span>
                <span>{t('gateway.mod_09c')}</span>
              </div>
            </div>
          </div>

          {/* Subchapter Action Row */}
          {activeSubChapterId === '09.1' && onLaunchRegistration && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playPulseNode();
                  onLaunchRegistration();
                }}
                className="px-6 py-3 rounded-lg bg-[#00B0FF] hover:bg-[#0090DF] text-[#0A0D10] font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,176,255,0.35)] transition-all cursor-pointer hover:scale-[1.02]"
              >
                🚀 {t('registration.submit_btn') || 'ორგანიზაციის რეგისტრაცია & შესვლა →'}
              </button>
            </div>
          )}

          {activeSubChapterId === '09.2' && onLaunchDemo && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playPulseNode();
                  onLaunchDemo();
                }}
                className="px-6 py-3 rounded-lg bg-[#00ff87] hover:bg-[#00df74] text-[#0A0D10] font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,135,0.35)] transition-all cursor-pointer hover:scale-[1.02]"
              >
                ⚡ {t('gateway.btn_run_sandbox')}
              </button>
            </div>
          )}

          {activeSubChapterId === '09.3' && onLaunchAuth && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playPulseNode();
                  onLaunchAuth();
                }}
                className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer hover:scale-[1.02]"
              >
                🔐 {t('gateway.btn_operator_console')}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer System Indicator */}
      <div className="w-full flex justify-end font-mono text-[10px] text-gray-500/80 tracking-widest uppercase pointer-events-none">
        <span>{t('gateway.footer_indicator')}</span>
      </div>
    </div>
  );
};
