"use client";

import { audioManager } from "@/lib/audioManager";

interface MuteAudioButtonProps {
  isMuted: boolean;
  transitionStep: string;
  className?: string;
}

export default function MuteAudioButton({ isMuted, transitionStep, className }: MuteAudioButtonProps) {
  return (
    <button
      onClick={() => {
        audioManager.playClick();
        audioManager.toggleMute();
      }}
      className={
        className ||
        "fixed top-4 left-6 z-50 hidden lg:flex font-mono text-[9px] uppercase tracking-[0.2em] text-silver-structure/45 hover:text-white border border-silver-structure/10 hover:border-emerald-core/45 bg-iron-surface/40 hover:bg-iron-surface/90 px-3 py-1.5 rounded backdrop-blur-[6px] transition-all duration-300 items-center gap-2 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)] group animate-fadeIn"
      }
    >
      <div className={`audio-wave ${!isMuted && transitionStep !== "idle" ? "playing" : ""}`}>
        <span className="audio-bar h-1.5" style={{ backgroundColor: isMuted ? "#9CA3AF" : "#00E676" }} />
        <span className="audio-bar h-2.5" style={{ backgroundColor: isMuted ? "#9CA3AF" : "#00E676" }} />
        <span className="audio-bar h-2" style={{ backgroundColor: isMuted ? "#9CA3AF" : "#00E676" }} />
      </div>
      <span>[ {isMuted ? "AUDIO_MUTED" : "AUDIO_ON"} ]</span>
    </button>
  );
}
