"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useI18n } from "@/context/I18nContext";
import { soundEngine } from "@/core";
import {
  SandboxHeader,
  SandboxFacilityType,
} from "./sandbox/SandboxHeader";
import {
  SandboxTurnstilesFeed,
  CheckinEvent,
} from "./sandbox/SandboxTurnstilesFeed";
import { SandboxLaborTimesheet } from "./sandbox/SandboxLaborTimesheet";
import { SandboxAiRetention } from "./sandbox/SandboxAiRetention";

interface TemporaryGuestDashboardProps {
  onExit: () => void;
}

type SandboxTab = "TURNSTILES" | "TIMESHEET" | "AI_RETENTION";

export const TemporaryGuestDashboard: React.FC<TemporaryGuestDashboardProps> = ({
  onExit,
}) => {
  const { t } = useI18n();
  const [secondsRemaining, setSecondsRemaining] = useState(3599);
  const [facilityType, setFacilityType] = useState<SandboxFacilityType>("GYM");
  const [activeTab, setActiveTab] = useState<SandboxTab>("TURNSTILES");
  const [unlockedGate, setUnlockedGate] = useState<string | null>(null);

  // Live Check-ins Stream State
  const [events, setEvents] = useState<CheckinEvent[]>([
    {
      id: "chk-1",
      time: "19:40:12",
      athleteName: "გიორგი მამარდაშვილი",
      packageName: "VIP Unlimited (1 წელი)",
      gate: "GATE #01 (მთავარი)",
      status: "ACTIVE",
    },
    {
      id: "chk-2",
      time: "19:38:55",
      athleteName: "ანა კვარაცხელია",
      packageName: "Fitness Standard (1 თვე)",
      gate: "GATE #01 (მთავარი)",
      status: "EXPIRING",
    },
    {
      id: "chk-3",
      time: "19:35:10",
      athleteName: "ლევან კალაძე",
      packageName: "CrossFit Master (3 თვე)",
      gate: "GATE #02 (VIP)",
      status: "ACTIVE",
    },
    {
      id: "chk-4",
      time: "19:30:00",
      athleteName: "დავით ხუციშვილი",
      packageName: "Pool & Spa Day Pass",
      gate: "GATE #02 (VIP)",
      status: "EXPIRED",
    },
  ]);

  // Session Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Global ESC Key Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        soundEngine.playPulseNode();
        onExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onExit]);

  const handleAddEvent = useCallback((newEvent: CheckinEvent) => {
    setEvents((prev) => [newEvent, ...prev.slice(0, 15)]);
  }, []);

  const handleUnlockGate = useCallback((gateName: string) => {
    setUnlockedGate(gateName);
    setTimeout(() => {
      setUnlockedGate(null);
    }, 5000);
  }, []);

  // Facility Contextual Metrics
  const getFacilityStats = () => {
    switch (facilityType) {
      case "POOL":
        return { members: 86, max: 120, entries: 214, cap: "71.6%", rev: "3,150 ₾" };
      case "STUDIO":
        return { members: 34, max: 45, entries: 112, cap: "75.5%", rev: "1,890 ₾" };
      case "CLUB":
        return { members: 220, max: 280, entries: 510, cap: "78.5%", rev: "6,400 ₾" };
      case "GYM":
      default:
        return { members: 142, max: 180, entries: 384, cap: "78.8%", rev: "4,250 ₾" };
    }
  };

  const stats = getFacilityStats();

  const tabs: { id: SandboxTab; labelKey: string }[] = [
    { id: "TURNSTILES", labelKey: "sandbox.tab_turnstiles" },
    { id: "TIMESHEET", labelKey: "sandbox.tab_timesheet" },
    { id: "AI_RETENTION", labelKey: "sandbox.tab_ai_retention" },
  ];

  return (
    <div className="w-full h-full min-h-screen md:h-screen overflow-y-auto bg-[#090B0E] text-white font-mono flex flex-col justify-between p-4 md:p-6 select-none animate-fadeIn relative">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00ff87]/5 blur-[160px] pointer-events-none" />

      {/* Header Bar */}
      <SandboxHeader
        secondsRemaining={secondsRemaining}
        facilityType={facilityType}
        onSelectFacility={setFacilityType}
        onExit={onExit}
      />

      {/* Main Body */}
      <main className="relative z-10 flex-1 my-5 space-y-5">
        {/* 4 Live Summary KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-[#101318]/90 border border-white/10 rounded-xl p-3.5 backdrop-blur-xl">
            <div className="text-[10px] text-[#9CA3AF] uppercase mb-1">
              {t("sandbox.kpi_active_members")}
            </div>
            <div className="text-[20px] sm:text-[22px] font-bold text-[#00ff87] tracking-tight">
              {stats.members} <span className="text-[12px] text-[#9CA3AF]">/ {stats.max}</span>
            </div>
          </div>

          <div className="bg-[#101318]/90 border border-white/10 rounded-xl p-3.5 backdrop-blur-xl">
            <div className="text-[10px] text-[#9CA3AF] uppercase mb-1">
              {t("sandbox.kpi_daily_entries")}
            </div>
            <div className="text-[20px] sm:text-[22px] font-bold text-[#00B0FF] tracking-tight">
              {stats.entries}
            </div>
          </div>

          <div className="bg-[#101318]/90 border border-white/10 rounded-xl p-3.5 backdrop-blur-xl">
            <div className="text-[10px] text-[#9CA3AF] uppercase mb-1">
              {t("sandbox.kpi_capacity")}
            </div>
            <div className="text-[20px] sm:text-[22px] font-bold text-[#D4AF37] tracking-tight">
              {stats.cap}
            </div>
          </div>

          <div className="bg-[#101318]/90 border border-white/10 rounded-xl p-3.5 backdrop-blur-xl">
            <div className="text-[10px] text-[#9CA3AF] uppercase mb-1">
              {t("sandbox.kpi_today_revenue")}
            </div>
            <div className="text-[20px] sm:text-[22px] font-bold text-white tracking-tight">
              {stats.rev}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          {tabs.map((tb) => {
            const isActive = activeTab === tb.id;
            return (
              <button
                key={tb.id}
                type="button"
                onClick={() => {
                  soundEngine.playHoverChip();
                  setActiveTab(tb.id);
                }}
                className={`px-3 py-1.5 rounded text-[11px] sm:text-[12px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87]/50 shadow-[0_0_10px_rgba(0,255,135,0.2)]"
                    : "text-[#9CA3AF] hover:text-white hover:bg-white/5"
                }`}
              >
                {t(tb.labelKey)}
              </button>
            );
          })}
        </div>

        {/* Active Tab View */}
        <div>
          {activeTab === "TURNSTILES" && (
            <SandboxTurnstilesFeed
              events={events}
              onAddEvent={handleAddEvent}
              unlockedGate={unlockedGate}
              onUnlockGate={handleUnlockGate}
            />
          )}

          {activeTab === "TIMESHEET" && <SandboxLaborTimesheet />}

          {activeTab === "AI_RETENTION" && <SandboxAiRetention />}
        </div>
      </main>

      {/* Footer Bar */}
      <footer className="relative z-10 w-full flex items-center justify-between border-t border-white/10 pt-3 text-[10px] text-[#9CA3AF]">
        <span>ARTRON OS // LIVE INTERACTIVE SANDBOX V14.3</span>
        <span className="text-[#00ff87] font-bold tracking-wider">
          {t("actions.press_esc_exit")}
        </span>
        <span className="hidden sm:inline-block">60 FPS EDGE STREAM • TCP SOCKET</span>
      </footer>
    </div>
  );
};
