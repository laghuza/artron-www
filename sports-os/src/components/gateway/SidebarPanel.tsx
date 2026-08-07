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
}

export const SidebarPanel: React.FC<SidebarPanelProps> = ({
  viewState, activeNode, activeSubChapterId, onResetToCore, onSelectSubChapter, onRequestAccess
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [lang, setLang] = useState<'KA' | 'EN'>('KA');

  return (
    <aside className="w-full lg:w-[40%] h-full bg-[#1A1D23]/55 border-r border-[rgba(156,163,175,0.12)] backdrop-blur-[24px] p-6 lg:p-7 flex flex-col justify-between select-none overflow-y-auto">
      {/* Top Section */}
      <div className="w-full flex flex-col flex-1 min-h-0 mb-6">
        {/* Header Controls aligned flush to the left */}
        <div className="w-full border-b border-[rgba(156,163,175,0.12)] pb-3.5 mb-6 flex items-center justify-start">
          <div className="mr-auto flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="min-w-[140px] inline-flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.2em] text-[#9CA3AF]/80 hover:text-white border border-[rgba(156,163,175,0.2)] hover:border-[#00FF66]/60 bg-[#121418]/80 hover:bg-[#121418] px-3.5 py-1.8 rounded transition-all cursor-pointer shadow-sm"
            >
              <span className={`w-1.5 h-1.5 rounded-full mr-2.5 ${!isMuted ? 'bg-[#00FF66] animate-pulse shadow-[0_0_8px_#00FF66]' : 'bg-gray-600'}`} />
              <span>[ {isMuted ? 'AUDIO_MUTED' : 'AUDIO_ON'} ]</span>
            </button>
            <button
              onClick={() => setLang(lang === 'KA' ? 'EN' : 'KA')}
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9CA3AF]/80 hover:text-[#00FF66] border border-[rgba(156,163,175,0.2)] hover:border-[#00FF66]/60 bg-[#121418]/80 px-3.5 py-1.8 rounded transition-all flex items-center gap-1 cursor-pointer shadow-sm"
            >
              <span>[ LANG: <span className="text-[#00FF66] font-bold">{lang}</span> ]</span>
            </button>
          </div>
        </div>

        {/* Core Init Hero Card or Selected Node */}
        {viewState === 'CORE_INIT' || !activeNode ? (
          <div className="animate-fadeIn w-full flex-1 flex flex-col justify-between p-7 lg:p-9 bg-[#12161A]/60 border border-white/10 rounded-xl backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
            <div>
              <div className="font-mono text-[12px] text-[#00FF66] uppercase tracking-[0.18em] mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
                [ SYSTEM // CORE_INIT ]
              </div>
              <h1 className="tracking-tight text-white uppercase font-extrabold text-[38px] lg:text-[44px] leading-[1.05] mb-3">
                ARTRON<br />SPORTS OS
              </h1>
              <p className="font-mono text-[15px] text-[#8A9099] mb-5">
                {lang === 'KA' ? 'სისტემური თვითორგანიზების პრინციპი.' : 'Principle of Systemic Self-Organization.'}
              </p>
              <div className="border-b border-white/10 mb-6" />
              <p className="font-sans text-[15px] leading-[1.7] text-[#C2C7D0]">
                {lang === 'KA'
                  ? 'ართრონი არ არის უბრალოდ პლატფორმა. ეს არის სპორტული სექტორის ლიდერების (ფედერაციების, კლუბებისა და პროფესიონალების) ოპერაციული სისტემა. მართვა ხორციელდება ცენტრალური 9-კვანძიანი Ennea Core ბირთვის მეშვეობით.'
                  : 'Artron is not merely a platform. It is the operating system for sports sector leaders (federations, clubs, and professionals). Governance is orchestrated via the central 9-node Ennea Core engine.'}
              </p>
            </div>

            <div className="pt-8 flex justify-center">
              <button
                onClick={onRequestAccess}
                className="w-full sm:w-auto h-[54px] px-10 bg-[#00FF66] text-[#0A0D10] font-mono text-[14px] font-bold tracking-[1.5px] uppercase rounded-md shadow-[0_0_25px_rgba(0,255,102,0.3)] transition-all duration-200 hover:bg-[#00E65C] hover:shadow-[0_0_35px_rgba(0,255,102,0.5)] hover:-translate-y-0.5 cursor-pointer active:translate-y-0"
              >
                REQUEST SYSTEM ACCESS
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fadeIn w-full flex-1 flex flex-col justify-between p-6 lg:p-8 bg-[#12161A]/60 border border-white/10 rounded-xl backdrop-blur-md space-y-5">
            <div className="space-y-4">
              <div className="font-mono text-[12px] text-[#00FF66] uppercase tracking-[0.15em]">[ NODE_0{activeNode.id} // {activeNode.nodeCode} ]</div>
              <h2 className="text-2xl font-bold text-white tracking-tight uppercase font-mono">{activeNode.title}</h2>
              {activeNode.id === 1 && <Node01FederationWidget />}
              {activeNode.id === 2 && <Node02BlueprintWidget />}
              {activeNode.id === 3 && <Node03ProWidget />}
              {activeNode.id === 4 && <Node04MobileWidget />}
              {activeNode.id === 5 && <Node05MarketplaceWidget />}
              {activeNode.id === 6 && <Node06MarketWidget />}
              {activeNode.id === 7 && <Node07AnalyticsWidget />}
              {activeNode.id === 8 && <Node08GdprShieldWidget />}
              {activeNode.id === 9 && <Node09AccessWidget />}
              <p className="text-[14px] text-gray-300 leading-[1.6] font-sans">{activeNode.shortDesc}</p>
              {activeNode.subChapters && activeNode.subChapters.length > 0 && (
                <div className="border-t border-[#262a33] pt-3">
                  <h3 className="text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-2">Available Sub-Chapters</h3>
                  <div className="space-y-1.5">
                    {activeNode.subChapters.map((sub) => (
                      <button key={sub.id} onClick={() => onSelectSubChapter(sub.id)} className={`w-full text-left p-2.5 rounded text-xs transition-all border ${activeSubChapterId === sub.id ? 'bg-[#16191E] border-[#00FF66] text-[#00FF66]' : 'bg-[#121418] border-[#262a33] text-gray-300 hover:text-white'}`}>{sub.title}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={onResetToCore} className="text-xs font-mono text-gray-400 hover:text-white flex items-center space-x-1.5 uppercase tracking-wider transition-colors pt-2 cursor-pointer">
              <span>← Return to Core</span>
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
