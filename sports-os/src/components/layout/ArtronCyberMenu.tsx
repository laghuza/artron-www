"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageToggle from "@/components/ui/LanguageToggle";
import MuteAudioButton from "@/components/features/dashboard/MuteAudioButton";
import { audioManager } from "@/lib/audioManager";
import { useI18n } from "@/context/I18nContext";

interface ArtronCyberMenuProps {
  isMuted?: boolean;
  transitionStep?: string;
  onDataPurgeTrigger?: () => void;
}

export default function ArtronCyberMenu({ isMuted = false, transitionStep = "idle", onDataPurgeTrigger }: ArtronCyberMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"menu" | "about">("menu");
  const { lang } = useI18n();

  const handleOpen = () => { audioManager.playClick(); setIsOpen(true); setActiveTab("menu"); };
  const handleClose = () => { audioManager.playClick(); setIsOpen(false); };
  const socials = ["X/TWITTER", "DISCORD", "TELEGRAM", "GITHUB"];

  return (
    <>
      <button onClick={handleOpen} aria-label="Open Mobile Menu" className="lg:hidden fixed top-3 right-3 z-50 px-3 py-1.5 rounded font-mono text-[10px] font-bold tracking-widest text-[#00ff87] bg-iron-surface/90 border border-[#00ff87]/60 shadow-[0_0_12px_rgba(0,255,135,0.25)] backdrop-blur-md hover:bg-[#00ff87]/15 uppercase flex items-center gap-1.5 cursor-pointer">
        <span className="text-xs">☰</span> SYS_MENU
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-[#090A0C]/95 backdrop-blur-2xl flex flex-col justify-between p-5 lg:hidden font-mono border-l border-[#00ff87]/30 overflow-y-auto animate-fadeIn select-none">
          <div className="flex justify-between items-center border-b border-[#00ff87]/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff87] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff87]" />
              </span>
              <span className="text-xs font-bold text-[#00ff87] uppercase tracking-widest">[ ARTRON_SYS_HUD ]</span>
            </div>
            <button onClick={handleClose} className="px-2.5 py-1 text-xs text-silver-structure/70 hover:text-white border border-silver-structure/20 rounded hover:border-[#00ff87] transition-colors cursor-pointer">[ X ]</button>
          </div>

          {activeTab === "about" ? (
            <div className="flex-1 flex flex-col justify-between py-4 space-y-4 animate-fadeIn">
              <div className="space-y-3 bg-iron-surface/60 border border-silver-structure/20 p-4 rounded-lg">
                <div className="text-xs font-bold text-[#00ff87] uppercase tracking-wider">[ ABOUT_ARTRON_OS ]</div>
                <p className="text-xs text-silver-structure/80 leading-relaxed font-sans">
                  ARTRON Sports OS is the next-gen decentralized biometric telemetry & multi-tenant athletic orchestration platform.
                </p>
                <div className="text-[10px] text-silver-structure/50">[ SYSTEM_MANIFEST // ENNEACORE ENGINE v9.3 ]</div>
              </div>
              <button onClick={() => { audioManager.playClick(); setActiveTab("menu"); }} className="w-full py-3 bg-[#00ff87]/15 border border-[#00ff87]/60 text-[#00ff87] rounded font-bold text-xs uppercase hover:bg-[#00ff87]/25 cursor-pointer text-center">
                [ {lang === "GE" ? "⬅️ უკან დაბრუნება" : "⬅️ RETURN"} ]
              </button>
            </div>
          ) : (
            <div className="space-y-3 my-auto py-2">
              <div className="bg-iron-surface/50 border border-silver-structure/15 p-3 rounded-lg space-y-2">
                <div className="text-[10px] text-silver-structure/50 tracking-widest uppercase">[ CONTROL_HUB ]</div>
                <div className="flex gap-2">
                  <LanguageToggle className="flex-1 justify-center text-xs py-2 bg-iron/80 border border-silver-structure/20 rounded text-silver-structure hover:text-white" />
                  <MuteAudioButton isMuted={isMuted} transitionStep={transitionStep} className="flex-1 justify-center text-xs py-2 bg-iron/80 border border-silver-structure/20 rounded text-silver-structure hover:text-white" />
                </div>
              </div>

              <div className="bg-iron-surface/50 border border-silver-structure/15 p-3 rounded-lg space-y-2">
                <div className="text-[10px] text-silver-structure/50 tracking-widest uppercase">[ LIVE_TELEMETRY ]</div>
                <div className="flex flex-wrap gap-1.5 text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-[#00ff87]/10 text-[#00ff87] border border-[#00ff87]/30">PING 12MS</span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">DB_POOL: ACTIVE</span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">SECURE_TUNNEL</span>
                </div>
              </div>

              <button onClick={() => { audioManager.playClick(); setActiveTab("about"); }} className="w-full text-left bg-iron-surface/50 hover:bg-iron-surface border border-silver-structure/20 hover:border-[#00ff87]/50 p-3 rounded-lg transition-all cursor-pointer group">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-silver-structure/50 group-hover:text-[#00ff87] tracking-widest uppercase">[ ABOUT_ARTRON_OS ]</span>
                  <span className="text-xs text-[#00ff87] group-hover:translate-x-1 transition-transform">➔</span>
                </div>
                <div className="text-xs text-white mt-1 font-bold">SYSTEM OVERVIEW & SPECS</div>
              </button>

              <div className="bg-iron-surface/50 border border-silver-structure/15 p-3 rounded-lg space-y-2">
                <div className="text-[10px] text-silver-structure/50 tracking-widest uppercase">[ ECOSYSTEM_SOCIALS ]</div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {socials.map((name) => (
                    <a key={name} href="#" className="px-2 py-1.5 rounded bg-[#00ff87]/5 hover:bg-[#00ff87]/15 text-[#00ff87] border border-[#00ff87]/25 text-center transition-all">
                      {name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-iron-surface/50 border border-silver-structure/15 p-3 rounded-lg space-y-2">
                <div className="text-[10px] text-silver-structure/50 tracking-widest uppercase">[ PROTOCOLS_&_LEGAL ]</div>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                  <Link href="/privacy" onClick={handleClose} className="p-2 rounded bg-iron border border-silver-structure/20 text-silver-structure/80 hover:text-[#00ff87] text-center truncate">PRIVACY</Link>
                  <Link href="/terms" onClick={handleClose} className="p-2 rounded bg-iron border border-silver-structure/20 text-silver-structure/80 hover:text-[#00ff87] text-center truncate">TERMS</Link>
                  <Link href="/sla" onClick={handleClose} className="p-2 rounded bg-iron border border-silver-structure/20 text-silver-structure/80 hover:text-[#00ff87] text-center truncate">SLA</Link>
                  <button onClick={() => { handleClose(); onDataPurgeTrigger?.(); }} className="p-2 rounded bg-iron border border-[#FF3D00]/30 text-[#FF3D00] hover:bg-[#FF3D00]/10 text-center truncate cursor-pointer uppercase">DATA_PURGE</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
