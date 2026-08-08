"use client";

import React, { useState } from 'react';
import { ViewState, ArtronNode } from '@/types/gateway';
import {
  Node01FederationWidget, Node02BlueprintWidget, Node03ProWidget, Node04MobileWidget,
  Node05MarketplaceWidget, Node06MarketWidget, Node07AnalyticsWidget, Node08GdprShieldWidget, Node09AccessWidget
} from './widgets/NodeWidgets';

interface SidebarPanelProps {
  viewState: ViewState; activeNode: ArtronNode | null; activeSubChapterId: string | null;
  onResetToCore: () => void; onSelectSubChapter: (subId: string) => void; onRequestAccess: () => void;
  onSelectB2B?: () => void; onSelectOtp?: () => void;
}

import { soundEngine } from '@/core';

import { Node01SubNodeList } from './widgets/Node01SubNodeList';

export const SidebarPanel: React.FC<SidebarPanelProps> = ({
  viewState, activeNode, activeSubChapterId, onResetToCore, onSelectSubChapter, onRequestAccess, onSelectB2B, onSelectOtp
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [lang, setLang] = useState<'KA' | 'EN'>('KA');
  const [isChoiceActive, setIsChoiceActive] = useState(false);

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    soundEngine.setMuted(nextMute);
    if (!nextMute) soundEngine.playPulseNode();
  };

  const handleAccessClick = () => {
    soundEngine.playPulseNode();
    setIsChoiceActive(true);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundEngine.playPulseNode();
        if (isChoiceActive) {
          setIsChoiceActive(false);
        } else {
          onResetToCore();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onResetToCore, isChoiceActive]);


  return (
    <aside className="w-full lg:w-[40%] h-full bg-[#1A1D23]/55 border-r border-[rgba(156,163,175,0.12)] backdrop-blur-[24px] p-6 lg:p-7 flex flex-col justify-between select-none overflow-y-auto">
      {/* Top Section */}
      <div className="w-full flex flex-col flex-1 min-h-0 mb-6">
        {/* Header Controls aligned flush to the left */}
        <div className="w-full border-b border-[rgba(156,163,175,0.12)] pb-3.5 mb-6 flex items-center justify-start">
          <div className="mr-auto flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="min-w-[140px] inline-flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.2em] text-[#9CA3AF]/80 hover:text-white border border-[rgba(156,163,175,0.2)] hover:border-[#00FF66]/60 bg-[#121418]/80 hover:bg-[#121418] px-3.5 py-1.8 rounded transition-all cursor-pointer shadow-sm"
            >
              <span className={`w-1.5 h-1.5 rounded-full mr-2.5 ${!isMuted ? 'bg-[#00FF66] animate-pulse shadow-[0_0_8px_#00FF66]' : 'bg-gray-600'}`} />
              <span>[ {isMuted ? 'AUDIO_MUTED' : 'AUDIO_ON'} ]</span>
            </button>
            <button
              onClick={() => {
                soundEngine.playPulseNode();
                setLang(lang === 'KA' ? 'EN' : 'KA');
              }}
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9CA3AF]/80 hover:text-[#00FF66] border border-[rgba(156,163,175,0.2)] hover:border-[#00FF66]/60 bg-[#121418]/80 px-3.5 py-1.8 rounded transition-all flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <span>[ LANG: <span className="text-[#00FF66] font-bold">{lang}</span> ]</span>
            </button>
          </div>
        </div>

        {/* Core Init Hero Card, Node 01 Custom Widget, or Selected Node */}
        {viewState === 'CORE_INIT' || !activeNode ? (
          <div className="animate-fadeIn w-full flex-1 flex flex-col justify-start p-7 lg:p-9 bg-[#12161A]/60 border border-white/10 rounded-xl backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
            <div>
              <div className="font-mono text-[11px] text-[#00FF66] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
                RESHAPE | REMAKE | REFRESH
              </div>
              <h1 className="tracking-tight text-white uppercase font-extrabold text-[36px] lg:text-[42px] leading-[1.05] mb-2 font-sans">
                ARTRON<br />SPORTS OS
              </h1>
              <p className="font-mono text-[12px] text-[#9CA3AF]/65 mb-4 tracking-widest uppercase border-l-2 border-[#9CA3AF]/30 pl-2.5">
                {lang === 'KA' ? '« ყველას მოკავშირე, არავის მეგობარი »' : '« Ally of all, friend of none »'}
              </p>

              <div className="border-b border-white/10 mb-5" />
              <p className="font-sans text-[14px] leading-[1.7] text-[#C2C7D0]">
                {lang === 'KA'
                  ? 'ართრონი მრავალშრიანი ციფრული სისტემაა, რომელიც სპორტულ-გამაჯანსაღებელი ინდუსტრიის ყველა სუბიექტს (ფედერაციიდან ინდივიდუალურ ათლეტამდე) ჯანსაღი და ეფექტური თვითორგანიზების საშუალებას აძლევს.'
                  : 'Artron is a multi-layered digital system enabling all entities across the sports-health sector (from federations down to individual athletes) healthy and effective self-organization.'}
              </p>
            </div>

            <div className="mt-[36px]">
              {!isChoiceActive ? (
                <button
                  onClick={handleAccessClick}
                  className="w-full h-[54px] px-10 bg-[#00FF66] text-[#0A0D10] font-mono text-[14px] font-bold tracking-[1.5px] uppercase rounded-md shadow-[0_0_25px_rgba(0,255,102,0.35)] transition-all duration-200 hover:bg-[#00E65C] hover:shadow-[0_0_35px_rgba(0,255,102,0.6)] hover:-translate-y-0.5 cursor-pointer active:translate-y-0"
                >
                  REQUEST SYSTEM ACCESS
                </button>
              ) : (
                <div className="space-y-2.5 w-full animate-fadeIn">
                  <div className="text-[10px] font-mono text-[#00FF66] tracking-[2px] uppercase mb-1 flex items-center justify-between">
                    <span>[ SELECT ACCESS PROTOCOL ]</span>
                    <button
                      onClick={() => {
                        soundEngine.playPulseNode();
                        setIsChoiceActive(false);
                      }}
                      className="text-[10px] text-[#9CA3AF] hover:text-white uppercase tracking-[1.5px] cursor-pointer"
                    >
                      [ ✕ CANCEL ]
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      soundEngine.playSystemAccess();
                      if (onSelectB2B) onSelectB2B();
                      else onRequestAccess();
                    }}
                    className="w-full py-3 px-4 bg-[#121418] hover:bg-[#00FF66] text-[#00FF66] hover:text-[#0A0D10] font-mono text-[12px] font-bold tracking-[1.5px] uppercase rounded border border-[#00FF66]/50 transition-all cursor-pointer text-left shadow-[0_0_15px_rgba(0,255,102,0.15)] flex items-center justify-between group"
                  >
                    <span>01 // REGISTERED B2B OPERATOR</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>

                  <button
                    onClick={() => {
                      soundEngine.playSystemAccess();
                      if (onSelectOtp) onSelectOtp();
                      else onRequestAccess();
                    }}
                    className="w-full py-3 px-4 bg-[#121418] hover:bg-[#00FF66] text-[#00FF66] hover:text-[#0A0D10] font-mono text-[12px] font-bold tracking-[1.5px] uppercase rounded border border-[#00FF66]/50 transition-all cursor-pointer text-left shadow-[0_0_15px_rgba(0,255,102,0.15)] flex items-center justify-between group"
                  >
                    <span>02 // TEMPORARY OTP GUEST</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        ) : activeNode.id === 1 ? (
          <Node01SubNodeList
            subChapters={activeNode.subChapters}
            activeSubChapterId={activeSubChapterId}
            onSelectSubChapter={onSelectSubChapter}
            onResetToCore={onResetToCore}
          />
        ) : (
          <div className="animate-fadeIn w-full flex-1 flex flex-col justify-between p-6 lg:p-8 bg-[#12161A]/60 border border-white/10 rounded-xl backdrop-blur-md space-y-5">
            <div className="space-y-4">
              {activeNode.id === 9 ? (
                <div className="space-y-1 mb-2">
                  <div className="font-mono text-[11px] text-[#00FF66] opacity-60 uppercase tracking-[0.2em]">
                    [ GATEWAY // SESSION_INIT ]
                  </div>
                  <h2 className="text-[22px] font-bold text-white tracking-tight uppercase font-mono">
                    ARTRON OS ACCESS
                  </h2>
                </div>
              ) : (
                <>
                  <div className="font-mono text-[12px] text-[#00FF66] uppercase tracking-[0.15em]">[ NODE_0{activeNode.id} // {activeNode.nodeCode} ]</div>
                  <h2 className="text-2xl font-bold text-white tracking-tight uppercase font-mono">{activeNode.title}</h2>
                </>
              )}
              {activeNode.id === 2 && <Node02BlueprintWidget />}
              {activeNode.id === 3 && <Node03ProWidget />}
              {activeNode.id === 4 && <Node04MobileWidget />}
              {activeNode.id === 5 && <Node05MarketplaceWidget />}
              {activeNode.id === 6 && <Node06MarketWidget />}
              {activeNode.id === 7 && <Node07AnalyticsWidget />}
              {activeNode.id === 8 && <Node08GdprShieldWidget />}
              {activeNode.id === 9 && <Node09AccessWidget onSelectSubChapter={onSelectSubChapter} />}

              {activeNode.id !== 9 && (
                <>
                  <p className="text-[14px] text-gray-300 leading-[1.6] font-sans">{activeNode.shortDesc}</p>
                  {activeNode.subChapters && activeNode.subChapters.length > 0 && (
                    <div className="border-t border-[#262a33] pt-3">
                      <h3 className="text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-2">Available Sub-Chapters</h3>
                      <div className="space-y-1.5">
                        {activeNode.subChapters.map((sub) => (
                          <button key={sub.id} onClick={() => { soundEngine.playPulseNode(); onSelectSubChapter(sub.id); }} className={`w-full text-left p-2.5 rounded text-xs transition-all border ${activeSubChapterId === sub.id ? 'bg-[#16191E] border-[#00FF66] text-[#00FF66]' : 'bg-[#121418] border-[#262a33] text-gray-300 hover:text-[#00FF66]'}`}>{sub.title}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

            </div>
            <button
              onClick={() => { soundEngine.playPulseNode(); onResetToCore(); }}
              className="text-xs font-mono text-gray-400 opacity-50 hover:opacity-100 hover:text-white flex items-center space-x-1.5 uppercase tracking-wider transition-all duration-200 pt-2 cursor-pointer"
            >
              <span>&lt; RETURN [ESC]</span>
            </button>
          </div>
        )}

      </div>

      {/* Footer Telemetry Ticker with distinct buffer gap */}
      <footer className="artron-footer artron-footer-ticker w-full overflow-hidden border-t border-white/5 pt-3 pb-1 bg-transparent">
        <div className="ticker-track flex w-max animate-[ticker-scroll_22s_linear_infinite]">
          <div className="ticker-group flex font-mono text-[12px] text-[#6E7681]">
            <span>[ TBS_NODE_01: <strong className="text-[#00FF66] font-semibold">ACTIVE</strong> ]</span>
            <span className="text-[#383E47] mx-4">·</span>
            <span>[ LATENCY: <strong className="text-[#00FF66] font-semibold">0.4MS</strong> ]</span>
            <span className="text-[#383E47] mx-4">·</span>
            <span>[ DB_POOL: <strong className="text-[#00FF66] font-semibold">ACTIVE</strong> ]</span>
            <span className="text-[#383E47] mx-4">·</span>
            <span>[ SYSTEM_LOAD: <strong className="text-[#00FF66] font-semibold">OK</strong> ]</span>
            <span className="text-[#383E47] mx-4">·</span>
          </div>
          <div className="ticker-group flex font-mono text-[12px] text-[#6E7681]">
            <span>[ TBS_NODE_01: <strong className="text-[#00FF66] font-semibold">ACTIVE</strong> ]</span>
            <span className="text-[#383E47] mx-4">·</span>
            <span>[ LATENCY: <strong className="text-[#00FF66] font-semibold">0.4MS</strong> ]</span>
            <span className="text-[#383E47] mx-4">·</span>
            <span>[ DB_POOL: <strong className="text-[#00FF66] font-semibold">ACTIVE</strong> ]</span>
            <span className="text-[#383E47] mx-4">·</span>
            <span>[ SYSTEM_LOAD: <strong className="text-[#00FF66] font-semibold">OK</strong> ]</span>
            <span className="text-[#383E47] mx-4">·</span>
          </div>
        </div>
      </footer>
    </aside>
  );
};
