"use client";

import React from "react";
import { useI18n } from "@/context/I18nContext";
import { soundEngine } from "@/core";

export type SandboxFacilityType = "GYM" | "POOL" | "STUDIO" | "CLUB";

interface SandboxHeaderProps {
  secondsRemaining: number;
  facilityType: SandboxFacilityType;
  onSelectFacility: (type: SandboxFacilityType) => void;
  onExit: () => void;
}

export const SandboxHeader: React.FC<SandboxHeaderProps> = ({
  secondsRemaining,
  facilityType,
  onSelectFacility,
  onExit,
}) => {
  const { t } = useI18n();

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const facilities: { id: SandboxFacilityType; labelKey: string }[] = [
    { id: "GYM", labelKey: "sandbox.preset_gym" },
    { id: "POOL", labelKey: "sandbox.preset_pool" },
    { id: "STUDIO", labelKey: "sandbox.preset_studio" },
    { id: "CLUB", labelKey: "sandbox.preset_club" },
  ];

  return (
    <header className="relative z-10 w-full flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-[#00ff87]/25 pb-4 gap-4">
      {/* Brand & Live Indicator */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00ff87] animate-pulse shadow-[0_0_8px_#00ff87]" />
          <h1 className="text-[12px] sm:text-[14px] font-bold text-[#00ff87] tracking-[2px] uppercase">
            {t("sandbox.title")}
          </h1>
        </div>
        <span className="px-2 py-0.5 rounded bg-[#00ff87]/10 border border-[#00ff87]/30 text-[#00ff87] text-[10px] font-bold tracking-widest uppercase">
          {t("sandbox.status_badge")}
        </span>
      </div>

      {/* Facility Filter Pills */}
      <div className="flex items-center flex-wrap gap-1.5 bg-[#12151B] p-1 rounded-lg border border-white/10">
        <span className="text-[10px] text-[#9CA3AF] px-2 font-mono uppercase hidden xl:inline-block">
          {t("sandbox.facility_selector")}
        </span>
        {facilities.map((fac) => {
          const isActive = facilityType === fac.id;
          return (
            <button
              key={fac.id}
              type="button"
              onClick={() => {
                soundEngine.playHoverChip();
                onSelectFacility(fac.id);
              }}
              className={`px-2.5 py-1 text-[10px] sm:text-[11px] font-bold rounded transition-all cursor-pointer ${
                isActive
                  ? "bg-[#00ff87] text-[#0A0B0D] shadow-[0_0_10px_rgba(0,255,135,0.3)]"
                  : "text-[#9CA3AF] hover:text-white hover:bg-white/5"
              }`}
            >
              {t(fac.labelKey)}
            </button>
          );
        })}
      </div>

      {/* Timer & Actions */}
      <div className="flex items-center gap-2.5 w-full lg:w-auto justify-between lg:justify-end">
        <div className="flex items-center gap-2 bg-[#12151B] px-3 py-1.5 rounded border border-[#00ff87]/30 text-[10px] sm:text-[11px]">
          <span className="text-[#9CA3AF]">{t("sandbox.session_timer")}</span>
          <span className="text-[#00ff87] font-bold tracking-widest font-mono">
            {formatTime(secondsRemaining)}
          </span>
        </div>

        <a
          href="/get-started?mode=register"
          className="px-3.5 py-1.5 rounded bg-[#00A3FF] hover:bg-[#0082CC] text-slate-950 text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase transition-all shadow-[0_0_12px_rgba(0,163,255,0.4)] whitespace-nowrap"
        >
          🚀 შეძენა
        </a>

        <button
          type="button"
          onClick={() => {
            soundEngine.playPulseNode();
            onExit();
          }}
          className="px-3.5 py-1.5 rounded bg-[#FF5252]/10 hover:bg-[#FF5252] text-[#FF5252] hover:text-white border border-[#FF5252]/30 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer shadow-sm"
        >
          ✕ {t("sandbox.exit_sandbox")}
        </button>
      </div>
    </header>
  );
};
