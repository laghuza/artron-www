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
      <button onClick={handleOpen} aria-label="Open Mobile Menu" className="lg:hidden fixed top-3 right-3 z-50 px-3 py-1.5 rounded-md font-mono text-[10px] font-medium tracking-widest text-[#00E676] bg-[#1A1D23]/90 border border-[#9CA3AF]/18 shadow-[0_0_8px_rgba(0,230,118,0.12)] backdrop-blur-md hover:bg-[#232730] uppercase flex items-center gap-1.5 cursor-pointer">
        <span className="text-xs">☰</span> SYS_MENU
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-[#121418]/95 backdrop-blur-md flex flex-col justify-between p-5 lg:hidden font-mono border-l border-[#9CA3AF]/18 overflow-y-auto animate-fadeIn select-none">
          <div className="flex justify-between items-center border-b border-[#9CA3AF]/18 pb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E676]" />
              </span>
              <span className="text-xs font-medium text-[#00E676] uppercase tracking-widest">[ ARTRON_SYS_HUD ]</span>
            </div>
            <button onClick={handleClose} className="px-2.5 py-1 text-xs text-[#9CA3AF] hover:text-[#F5F5F3] border border-[#9CA3AF]/18 rounded-sm hover:border-[#00E676]/40 transition-colors cursor-pointer">[ X ]</button>
          </div>

          {activeTab === "about" ? (
            <div className="flex-1 flex flex-col justify-between py-4 space-y-4 animate-fadeIn">
              <div className="space-y-3 bg-[#1A1D23] border border-[#9CA3AF]/18 p-4 rounded-md">
                <div className="text-xs font-medium text-[#00E676] uppercase tracking-wider">[ ABOUT_ARTRON_OS ]</div>
                <p className="text-xs text-[#9CA3AF] leading-relaxed font-sans">
                  ARTRON Sports OS is the next-gen decentralized biometric telemetry & multi-tenant athletic orchestration platform.
                </p>
                <div className="text-[10px] text-[#6B7280]">[ SYSTEM_MANIFEST // ENNEACORE ENGINE v9.3 ]</div>
              </div>
              <button onClick={() => { audioManager.playClick(); setActiveTab("menu"); }} className="w-full py-2.5 bg-[#00E676]/10 border border-[#00E676]/30 text-[#00E676] rounded-sm font-medium text-xs uppercase hover:bg-[#00E676]/20 cursor-pointer text-center tracking-widest">
                [ {lang === "GE" ? "<- უკან დაბრუნება" : "<- RETURN"} ]
              </button>
            </div>
          ) : (
            <div className="space-y-3 my-auto py-2">
              <div className="bg-[#1A1D23] border border-[#9CA3AF]/18 p-3 rounded-md space-y-2">
                <div className="text-[10px] text-[#6B7280] tracking-widest uppercase">[ CONTROL_HUB ]</div>
                <div className="flex gap-2">
                  <LanguageToggle className="flex-1 justify-center text-xs py-2 bg-[#121418] border border-[#9CA3AF]/18 rounded-sm text-[#9CA3AF] hover:text-[#F5F5F3]" />
                  <MuteAudioButton isMuted={isMuted} transitionStep={transitionStep} className="flex-1 justify-center text-xs py-2 bg-[#121418] border border-[#9CA3AF]/18 rounded-sm text-[#9CA3AF] hover:text-[#F5F5F3]" />
                </div>
              </div>

              <div className="bg-[#1A1D23] border border-[#9CA3AF]/18 p-3 rounded-md space-y-2">
                <div className="text-[10px] text-[#6B7280] tracking-widest uppercase">[ LIVE_TELEMETRY ]</div>
                <div className="flex flex-wrap gap-1.5 text-[10px]">
                  <span className="px-2 py-0.5 rounded-sm bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30">PING 12MS</span>
                  <span className="px-2 py-0.5 rounded-sm bg-[#121418] text-[#9CA3AF] border border-[#9CA3AF]/18">DB_POOL: ACTIVE</span>
                  <span className="px-2 py-0.5 rounded-sm bg-[#121418] text-[#9CA3AF] border border-[#9CA3AF]/18">SECURE_TUNNEL</span>
                </div>
              </div>

              <button onClick={() => { audioManager.playClick(); setActiveTab("about"); }} className="w-full text-left bg-[#1A1D23] hover:bg-[#232730] border border-[#9CA3AF]/18 hover:border-[#00E676]/40 p-3 rounded-md transition-colors cursor-pointer group">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-[#6B7280] group-hover:text-[#00E676] tracking-widest uppercase">[ ABOUT_ARTRON_OS ]</span>
                  <span className="text-xs text-[#00E676] group-hover:translate-x-1 transition-transform">➔</span>
                </div>
                <div className="text-xs text-[#F5F5F3] mt-1 font-medium">SYSTEM OVERVIEW & SPECS</div>
              </button>

              <div className="bg-[#1A1D23] border border-[#9CA3AF]/18 p-3 rounded-md space-y-2">
                <div className="text-[10px] text-[#6B7280] tracking-widest uppercase">[ ECOSYSTEM_SOCIALS ]</div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  {socials.map((name) => (
                    <a key={name} href="#" className="px-2 py-1.5 rounded-sm bg-[#121418] hover:bg-[#232730] text-[#9CA3AF] hover:text-[#00E676] border border-[#9CA3AF]/18 text-center transition-colors">
                      {name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-[#1A1D23] border border-[#9CA3AF]/18 p-3 rounded-md space-y-2">
                <div className="text-[10px] text-[#6B7280] tracking-widest uppercase">[ PROTOCOLS_&_LEGAL ]</div>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  <Link href="/privacy" onClick={handleClose} className="p-2 rounded-sm bg-[#121418] border border-[#9CA3AF]/18 text-[#9CA3AF] hover:text-[#00E676] text-center truncate">PRIVACY</Link>
                  <Link href="/terms" onClick={handleClose} className="p-2 rounded-sm bg-[#121418] border border-[#9CA3AF]/18 text-[#9CA3AF] hover:text-[#00E676] text-center truncate">TERMS</Link>
                  <Link href="/sla" onClick={handleClose} className="p-2 rounded-sm bg-[#121418] border border-[#9CA3AF]/18 text-[#9CA3AF] hover:text-[#00E676] text-center truncate">SLA</Link>
                  <button onClick={() => { handleClose(); onDataPurgeTrigger?.(); }} className="p-2 rounded-sm bg-[#121418] border border-[#9CA3AF]/18 text-[#9CA3AF] hover:text-[#00E676] hover:bg-[#232730] text-center truncate cursor-pointer uppercase">DATA_PURGE</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
