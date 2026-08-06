"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageToggle from "@/components/ui/LanguageToggle";
import MuteAudioButton from "@/components/features/dashboard/MuteAudioButton";

interface ArtronCyberMenuProps {
  isMuted?: boolean;
  transitionStep?: string;
  onDataPurgeTrigger?: () => void;
}

export default function ArtronCyberMenu({
  isMuted = false,
  transitionStep = "idle",
  onDataPurgeTrigger,
}: ArtronCyberMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Mobile System Menu"
        className="lg:hidden fixed top-3 right-3 z-50 px-3 py-1.5 rounded font-mono text-[10px] font-bold tracking-widest text-[#00ff87] bg-iron-surface/80 border border-[#00ff87]/60 shadow-[0_0_12px_rgba(0,255,135,0.25)] backdrop-blur-md hover:bg-[#00ff87]/15 transition-all cursor-pointer uppercase flex items-center gap-1.5"
      >
        <span className="text-xs">☰</span> SYS_MENU
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl flex flex-col justify-between p-6 animate-fadeIn lg:hidden font-mono border-l border-[#00ff87]/30">
          <div className="flex justify-between items-center border-b border-[#00ff87]/20 pb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff87] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff87]" />
              </span>
              <span className="text-xs font-bold text-[#00ff87] uppercase tracking-widest">
                [ ARTRON_SYS_HUD ]
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 text-xs text-silver-structure/60 hover:text-white border border-silver-structure/20 rounded hover:border-[#00ff87] transition-colors"
            >
              [ X ]
            </button>
          </div>

          <div className="flex flex-col gap-5 my-auto">
            <div className="text-[10px] text-silver-structure/40 tracking-widest uppercase">
              [ SYSTEM_CONTROLS ]
            </div>
            <div className="flex flex-col gap-3">
              <LanguageToggle className="w-full justify-center text-xs py-2.5 bg-iron/80 border border-silver-structure/20 rounded text-silver-structure hover:text-white transition-all flex items-center gap-2" />
              <MuteAudioButton
                isMuted={isMuted}
                transitionStep={transitionStep}
                className="w-full justify-center text-xs py-2.5 bg-iron/80 border border-silver-structure/20 rounded text-silver-structure hover:text-white transition-all flex items-center gap-2"
              />
            </div>

            <div className="text-[10px] text-silver-structure/40 tracking-widest uppercase mt-3">
              [ LIVE_TELEMETRY ]
            </div>
            <div className="flex flex-wrap gap-2 font-mono text-[10px]">
              <span className="px-2.5 py-1 rounded bg-[#00ff87]/10 text-[#00ff87] border border-[#00ff87]/30">
                PING 12MS
              </span>
              <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
                DB_POOL: ACTIVE
              </span>
              <span className="px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                SECURE_TUNNEL
              </span>
            </div>
          </div>

          <div className="border-t border-silver-structure/20 pt-4 space-y-2">
            <div className="text-[10px] text-silver-structure/40 tracking-widest uppercase">
              [ SYSTEM_INFO ]
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-silver-structure/70">
              <Link href="/privacy" onClick={() => setIsOpen(false)} className="hover:text-[#00ff87]">
                [ PRIVACY ]
              </Link>
              <Link href="/terms" onClick={() => setIsOpen(false)} className="hover:text-[#00ff87]">
                [ TERMS ]
              </Link>
              <Link href="/sla" onClick={() => setIsOpen(false)} className="hover:text-[#00ff87]">
                [ SLA ]
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onDataPurgeTrigger?.();
                }}
                className="text-left text-[#FF3D00] hover:underline cursor-pointer"
              >
                [ DATA_PURGE ]
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
