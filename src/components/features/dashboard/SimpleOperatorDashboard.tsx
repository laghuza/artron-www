"use client";

import React, { useEffect, useState } from "react";
import { useI18n } from "@/context/I18nContext";
import { soundEngine } from "@/core";
import { getOperatorDashboardData } from "@/app/actions/dashboard";

interface SessionUserData {
  username: string;
  orgName?: string;
  discipline?: string;
  adminName?: string;
  isTrial?: boolean;
}

interface SimpleOperatorDashboardProps {
  sessionUser?: SessionUserData | null;
  onReturnToGateway: () => void;
  onOpenNode?: (nodeId: number) => void;
}

export const SimpleOperatorDashboard: React.FC<SimpleOperatorDashboardProps> = ({
  sessionUser,
  onReturnToGateway,
  onOpenNode,
}) => {
  const { t } = useI18n();
  const [data, setData] = useState<{
    tenantCount: number;
    userCount: number;
    subscriptionCount: number;
    turnstileCount: number;
    systemUptime: string;
    encryptionStandard: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [slashResponse, setSlashResponse] = useState<string | null>(null);

  const displayOrg = sessionUser?.orgName || "LLC ARTRON MASTER MATRIX";
  const displayUser = sessionUser?.username || "operator@artron.ge";
  const isTrial = sessionUser?.isTrial ?? false;

  useEffect(() => {
    getOperatorDashboardData()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load operator stats:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        soundEngine.playPulseNode();
        onReturnToGateway();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onReturnToGateway]);

  const handleRunCommand = (cmd: string, response: string) => {
    soundEngine.playHoverChip();
    setSlashResponse(`[SYSTEM] ${cmd} ➔ ${response}`);
    setTimeout(() => {
      setSlashResponse(null);
    }, 4500);
  };

  return (
    <div className="min-h-screen w-screen bg-[#1E1F22] text-[#DBDEE1] font-sans p-4 sm:p-6 flex flex-col justify-between select-none animate-fadeIn relative overflow-y-auto">
      {/* Background Ambient Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#00ff87]/5 blur-[160px] pointer-events-none" />

      {/* Discord-styled Channel Header HUD */}
      <header className="relative z-10 bg-[#2B2D31] border border-[#383A40] rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-[#949BA4] text-[18px] font-bold">#</span>
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-bold text-white font-mono tracking-wide">
              სისტემური-კონსოლი
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#5865F2] text-white text-[10px] font-bold font-mono">
              BOT ✓
            </span>
            <div className="flex items-center gap-1.5 ml-2 text-[11px] text-[#00ff87] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
              <span>ონლაინ</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              soundEngine.playSystemAccess();
              if (onOpenNode) onOpenNode(1);
              else onReturnToGateway();
            }}
            className="px-4 py-1.5 bg-[#00ff87] hover:bg-[#00df74] text-[#090b0e] font-mono text-[11px] font-bold uppercase rounded-lg shadow-[0_0_15px_rgba(0,255,135,0.3)] transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            🏢 {t("dashboard.btn_open_crm") || "სამართავი პანელის გახსნა"}
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playPulseNode();
              onReturnToGateway();
            }}
            className="px-3 py-1.5 bg-[#313338] hover:bg-[#383A40] border border-[#4E5058]/40 text-[#949BA4] hover:text-white font-mono text-[11px] rounded-lg transition-colors cursor-pointer"
          >
            {t("actions.return_to_gateway")}
          </button>
        </div>
      </header>

      {/* Main Discord Embeds Feed */}
      <main className="relative z-10 my-auto max-w-4xl mx-auto w-full py-6 space-y-4">
        {/* Discord Embed 1: System Status & Operator Verified */}
        <div className="bg-[#2B2D31] border-l-4 border-[#00ff87] rounded-r-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-[#383A40] pb-3">
            <div className="flex items-center gap-2 text-[11px] text-[#00ff87] font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
              <span>{t("dashboard.auth_verified")}</span>
            </div>
            <span className="text-[11px] text-[#949BA4] font-mono">
              SESSION // SYS-{isTrial ? "TRIAL" : "OPERATOR"}-{displayUser.split("@")[0]}
            </span>
          </div>

          <div>
            <h1 className="text-[18px] sm:text-[22px] font-bold text-white font-mono tracking-wide">
              {displayOrg}
            </h1>
            <p className="text-[13px] text-[#DBDEE1] leading-relaxed mt-1">
              {isTrial
                ? `${t("dashboard.trial_welcome")} (${displayOrg})`
                : `${t("dashboard.welcome_operator")} (${displayUser})`}
            </p>
          </div>

          {/* Discord Embed Inline Fields (4 Core Stats) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-[#1E1F22] p-3 rounded-lg border border-[#383A40]/50">
              <div className="text-[10px] text-[#949BA4] uppercase font-mono font-bold">
                RLS იზოლაცია
              </div>
              <div className="text-[13px] text-[#00ff87] font-mono font-bold mt-0.5">
                {loading ? "..." : `ACTIVE (${data?.tenantCount ?? 1})`}
              </div>
            </div>

            <div className="bg-[#1E1F22] p-3 rounded-lg border border-[#383A40]/50">
              <div className="text-[10px] text-[#949BA4] uppercase font-mono font-bold">
                ტურნიკეტები
              </div>
              <div className="text-[13px] text-[#00ff87] font-mono font-bold mt-0.5">
                {loading ? "..." : `${data?.systemUptime ?? "99.99%"} UPTIME`}
              </div>
            </div>

            <div className="bg-[#1E1F22] p-3 rounded-lg border border-[#383A40]/50">
              <div className="text-[10px] text-[#949BA4] uppercase font-mono font-bold">
                სისტემური კვანძი
              </div>
              <div className="text-[13px] text-[#00ff87] font-mono font-bold mt-0.5">
                {loading ? "..." : "9 NODES ONLINE"}
              </div>
            </div>

            <div className="bg-[#1E1F22] p-3 rounded-lg border border-[#383A40]/50">
              <div className="text-[10px] text-[#949BA4] uppercase font-mono font-bold">
                დაშიფვრა
              </div>
              <div className="text-[13px] text-[#00ff87] font-mono font-bold mt-0.5">
                {loading ? "..." : `${data?.encryptionStandard ?? "AES-256"} GCM`}
              </div>
            </div>
          </div>
        </div>

        {/* Discord Embed 2: Operational Modules & Launchers */}
        <div className="bg-[#2B2D31] border-l-4 border-[#00A3FF] rounded-r-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-[#383A40] pb-2">
            <div className="text-[13px] font-bold text-white font-mono flex items-center gap-2">
              <span>⚡</span>
              <span>{t("dashboard.quick_actions_title") || "საოპერაციო მოდულები და სერვისები"}</span>
            </div>
            <span className="text-[11px] text-[#949BA4] font-mono">1-CLICK ACTIONS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 2, label: t("dashboard.action_turnstiles"), desc: "RFID/NFC/Dynamic QR კარის გაღება", icon: "⚡", tag: "GATEWAY" },
              { id: 3, label: t("dashboard.action_timesheet"), desc: "№01-15/ნ შრომის დროის აღრიცხვა", icon: "📋", tag: "LABOR" },
              { id: 1, label: t("dashboard.action_crm"), desc: "360° ათლეტებისა და წევრების ბაზა", icon: "👥", tag: "MEMBERS" },
              { id: 7, label: t("dashboard.action_ai_winback"), desc: "KPIs & Churn Recovery ალგორითმი", icon: "📊", tag: "ANALYTICS" },
            ].map((action) => (
              <div
                key={action.id}
                className="bg-[#1E1F22] hover:bg-[#232428] border border-[#383A40] hover:border-[#00A3FF]/60 rounded-xl p-3.5 flex items-center justify-between gap-3 transition-all cursor-pointer group"
                onClick={() => {
                  soundEngine.playPulseNode();
                  if (onOpenNode) onOpenNode(action.id);
                  else onReturnToGateway();
                }}
              >
                <div className="space-y-0.5">
                  <div className="text-[13px] font-bold text-white group-hover:text-[#00A3FF] transition-colors flex items-center gap-2">
                    <span>{action.icon}</span>
                    <span>{action.label}</span>
                  </div>
                  <div className="text-[11px] text-[#949BA4]">{action.desc}</div>
                </div>

                <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-[#2B2D31] text-[#949BA4] group-hover:bg-[#00A3FF]/20 group-hover:text-[#00A3FF] transition-colors">
                  გაშვება →
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Discord Slash Commands Bar */}
        <div className="bg-[#2B2D31] border border-[#383A40] rounded-xl p-3 space-y-2">
          <div className="flex items-center gap-2 text-[11px] text-[#949BA4] font-mono">
            <span className="w-5 h-5 rounded bg-[#1E1F22] flex items-center justify-center font-bold text-[#00ff87]">/</span>
            <span>სწრაფი ბრძანებები (Slash Commands):</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleRunCommand("/open-gate 01", "ტურნიკეტი #01 განბლოკილია (5 წმ)")}
              className="px-2.5 py-1 bg-[#1E1F22] hover:bg-[#383A40] text-[#DBDEE1] text-[11px] font-mono rounded border border-[#383A40] transition-colors cursor-pointer"
            >
              /open-gate [Door 1]
            </button>
            <button
              type="button"
              onClick={() => handleRunCommand("/export-timesheet", "ტაბელი №01-15/ნ გენერირებულია (PDF/Excel)")}
              className="px-2.5 py-1 bg-[#1E1F22] hover:bg-[#383A40] text-[#DBDEE1] text-[11px] font-mono rounded border border-[#383A40] transition-colors cursor-pointer"
            >
              /export-timesheet
            </button>
            <button
              type="button"
              onClick={() => handleRunCommand("/member-search", "მოძიებულია 2,400+ აქტიური პროფილი")}
              className="px-2.5 py-1 bg-[#1E1F22] hover:bg-[#383A40] text-[#DBDEE1] text-[11px] font-mono rounded border border-[#383A40] transition-colors cursor-pointer"
            >
              /member-search
            </button>
          </div>

          {slashResponse && (
            <div className="p-2 bg-[#1E1F22] rounded border-l-2 border-[#00ff87] text-[11px] text-[#00ff87] font-mono animate-fadeIn">
              {slashResponse}
            </div>
          )}
        </div>
      </main>

      {/* Discord Status Footer */}
      <footer className="relative z-10 border-t border-[#383A40] pt-3 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#949BA4] font-mono gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00ff87]" />
          <span>CONNECTED: {displayUser}</span>
        </div>
        <span className="text-[#00ff87] font-bold">{t("actions.press_esc")}</span>
        <span>SECURITY: AES-256-GCM</span>
      </footer>
    </div>
  );
};
