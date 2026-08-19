"use client";

import React, { useState } from "react";
import { useI18n } from "@/context/I18nContext";
import { soundEngine } from "@/core";

export interface CheckinEvent {
  id: string;
  time: string;
  athleteName: string;
  packageName: string;
  gate: string;
  status: "ACTIVE" | "EXPIRING" | "EXPIRED";
}

interface SandboxTurnstilesFeedProps {
  events: CheckinEvent[];
  onAddEvent: (event: CheckinEvent) => void;
  unlockedGate: string | null;
  onUnlockGate: (gateName: string) => void;
}

export const SandboxTurnstilesFeed: React.FC<SandboxTurnstilesFeedProps> = ({
  events,
  onAddEvent,
  unlockedGate,
  onUnlockGate,
}) => {
  const { t } = useI18n();
  const [isScanning, setIsScanning] = useState(false);

  const sampleNames = [
    "ლევან კალაძე",
    "ნიკოლოზ ბასილაშვილი",
    "ანა კვარაცხელია",
    "გიორგი მამარდაშვილი",
    "მარიამ ჩხეიძე",
    "დავით ხუციშვილი",
    "სოფიო შენგელია",
    "ირაკლი მაისურაძე",
  ];

  const samplePackages = [
    "VIP Unlimited (1 წელი)",
    "Fitness Standard (1 თვე)",
    "Pool & Spa Day Pass",
    "CrossFit Master (3 თვე)",
    "Personal Trainer 10x",
  ];

  const triggerCheckin = (gateName: string, forceExpired = false) => {
    setIsScanning(true);
    soundEngine.playCardHover();

    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
      const randomPkg = samplePackages[Math.floor(Math.random() * samplePackages.length)];

      let status: "ACTIVE" | "EXPIRING" | "EXPIRED" = "ACTIVE";
      if (forceExpired) {
        status = "EXPIRED";
        soundEngine.playPulseNode();
      } else {
        const rand = Math.random();
        if (rand > 0.85) status = "EXPIRING";
        else status = "ACTIVE";
        soundEngine.playSystemAccess();
      }

      const newEvent: CheckinEvent = {
        id: `chk-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        time: timeStr,
        athleteName: randomName,
        packageName: randomPkg,
        gate: gateName,
        status,
      };

      onAddEvent(newEvent);
      setIsScanning(false);
    }, 350);
  };

  const handlePulseUnlock = (gateName: string) => {
    soundEngine.playSystemAccess();
    onUnlockGate(gateName);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 2 Hardware Controllers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gate 01: Main Entrance */}
        <div className="bg-[#101318]/90 border border-white/10 rounded-xl p-5 backdrop-blur-xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span
                className={`w-3 h-3 rounded-full ${
                  unlockedGate === "GATE_01"
                    ? "bg-[#00ff87] animate-ping"
                    : "bg-[#00B0FF] animate-pulse"
                }`}
              />
              <span className="text-[12px] font-bold text-white tracking-wider uppercase">
                {t("sandbox.gate_main")}
              </span>
            </div>
            <span
              className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded border ${
                unlockedGate === "GATE_01"
                  ? "bg-[#00ff87]/20 border-[#00ff87] text-[#00ff87]"
                  : "bg-[#00B0FF]/15 border-[#00B0FF]/40 text-[#00B0FF]"
              }`}
            >
              {unlockedGate === "GATE_01" ? t("sandbox.gate_unlocked") : t("sandbox.gate_online")}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
            <button
              type="button"
              disabled={isScanning}
              onClick={() => triggerCheckin("GATE #01 (მთავარი)")}
              className="flex-1 min-w-[130px] px-3 py-2 rounded bg-[#00ff87]/10 hover:bg-[#00ff87] text-[#00ff87] hover:text-[#0A0B0D] border border-[#00ff87]/30 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer"
            >
              {t("sandbox.btn_qr_checkin")}
            </button>
            <button
              type="button"
              onClick={() => handlePulseUnlock("GATE_01")}
              className="px-3 py-2 rounded bg-white/5 hover:bg-[#00B0FF] text-[#D1D5DB] hover:text-white border border-white/15 hover:border-[#00B0FF] text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer"
            >
              {t("sandbox.btn_unlock_5s")}
            </button>
          </div>
        </div>

        {/* Gate 02: VIP / Zone */}
        <div className="bg-[#101318]/90 border border-white/10 rounded-xl p-5 backdrop-blur-xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span
                className={`w-3 h-3 rounded-full ${
                  unlockedGate === "GATE_02"
                    ? "bg-[#00ff87] animate-ping"
                    : "bg-[#D4AF37] animate-pulse"
                }`}
              />
              <span className="text-[12px] font-bold text-white tracking-wider uppercase">
                {t("sandbox.gate_pool")}
              </span>
            </div>
            <span
              className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded border ${
                unlockedGate === "GATE_02"
                  ? "bg-[#00ff87]/20 border-[#00ff87] text-[#00ff87]"
                  : "bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#D4AF37]"
              }`}
            >
              {unlockedGate === "GATE_02" ? t("sandbox.gate_unlocked") : t("sandbox.gate_online")}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
            <button
              type="button"
              disabled={isScanning}
              onClick={() => triggerCheckin("GATE #02 (VIP)", false)}
              className="flex-1 min-w-[130px] px-3 py-2 rounded bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#0A0B0D] border border-[#D4AF37]/30 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer"
            >
              {t("sandbox.btn_nfc_scan")}
            </button>
            <button
              type="button"
              onClick={() => handlePulseUnlock("GATE_02")}
              className="px-3 py-2 rounded bg-white/5 hover:bg-[#D4AF37] text-[#D1D5DB] hover:text-white border border-white/15 hover:border-[#D4AF37] text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer"
            >
              {t("sandbox.btn_unlock_5s")}
            </button>
          </div>
        </div>
      </div>

      {/* Live Check-ins Stream Table */}
      <div className="bg-[#101318]/90 border border-white/10 rounded-xl p-5 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-ping" />
            <h3 className="text-[12px] font-bold text-white tracking-widest uppercase">
              {t("sandbox.recent_checkins")}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              for (let i = 0; i < 5; i++) {
                setTimeout(() => triggerCheckin("GATE #01", i === 4), i * 150);
              }
            }}
            className="text-[10px] text-[#00ff87] hover:underline font-mono cursor-pointer"
          >
            {t("sandbox.btn_bulk_entry")}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px] font-mono">
            <thead>
              <tr className="border-b border-white/10 text-[#9CA3AF] text-[10px] uppercase">
                <th className="pb-2">{t("sandbox.col_time")}</th>
                <th className="pb-2">{t("sandbox.col_athlete")}</th>
                <th className="pb-2 hidden sm:table-cell">{t("sandbox.col_package")}</th>
                <th className="pb-2 hidden md:table-cell">{t("sandbox.col_gate")}</th>
                <th className="pb-2 text-right">{t("sandbox.col_status")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {events.slice(0, 6).map((evt) => (
                <tr key={evt.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 text-[#9CA3AF] font-mono">{evt.time}</td>
                  <td className="py-2.5 font-bold text-white">{evt.athleteName}</td>
                  <td className="py-2.5 text-[#D1D5DB] hidden sm:table-cell">{evt.packageName}</td>
                  <td className="py-2.5 text-[#9CA3AF] hidden md:table-cell">{evt.gate}</td>
                  <td className="py-2.5 text-right">
                    {evt.status === "ACTIVE" && (
                      <span className="px-2 py-0.5 rounded bg-[#00ff87]/15 text-[#00ff87] border border-[#00ff87]/30 text-[9px] font-bold">
                        ✓ {t("sandbox.status_active")}
                      </span>
                    )}
                    {evt.status === "EXPIRING" && (
                      <span className="px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-[9px] font-bold">
                        ⚠️ {t("sandbox.status_expiring")}
                      </span>
                    )}
                    {evt.status === "EXPIRED" && (
                      <span className="px-2 py-0.5 rounded bg-[#FF5252]/15 text-[#FF5252] border border-[#FF5252]/30 text-[9px] font-bold">
                        ✕ {t("sandbox.status_expired")}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
