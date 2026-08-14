"use client";

import React, { useEffect, useState } from "react";
import { useI18n } from "@/context/I18nContext";
import { soundEngine } from "@/core";
import { getOperatorDashboardData } from "@/app/actions/dashboard";

interface SimpleOperatorDashboardProps {
  onReturnToGateway: () => void;
}

export const SimpleOperatorDashboard: React.FC<SimpleOperatorDashboardProps> = ({
  onReturnToGateway,
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

  useEffect(() => {
    getOperatorDashboardData()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load operator dashboard stats:", err);
        setLoading(false);
      });
  }, []);

  // Global ESC key listener for instant return to gateway core
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

  return (
    <div className="min-h-screen w-screen bg-[#090b0e] text-[#D1D5DB] font-mono p-6 sm:p-10 flex flex-col justify-between select-none animate-fadeIn relative overflow-hidden">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#00ff87]/5 blur-[180px] pointer-events-none" />

      {/* Top Header HUD Bar */}
      <header className="relative z-10 flex items-center justify-between border-b border-[#9CA3AF]/15 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00ff87] animate-pulse" />
          <span className="text-[12px] font-bold text-[#E5E7EB] tracking-[2.5px] uppercase">
            {t('dashboard.operator_console')}
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            soundEngine.playPulseNode();
            onReturnToGateway();
          }}
          className="px-4 py-2 bg-[#121418] hover:bg-[#00ff87] text-[#00ff87] hover:text-[#090b0e] border border-[#00ff87]/40 text-[11px] font-bold tracking-[2px] uppercase rounded transition-all cursor-pointer shadow-[0_0_15px_rgba(0,255,135,0.2)]"
        >
          {t('actions.return_to_gateway')}
        </button>
      </header>

      {/* Main Console Body */}
      <main className="relative z-10 my-auto max-w-4xl mx-auto w-full py-8 space-y-8">
        {/* Welcome Banner */}
        <div className="space-y-3 border-l-2 border-[#00ff87] pl-6 py-2">
          <div className="text-[11px] text-[#00ff87] font-bold tracking-[2px] uppercase">
            {t('dashboard.auth_verified')}
          </div>
          <h1 className="text-[26px] font-bold text-[#F5F5F7] tracking-[2.5px] uppercase">
            {t('dashboard.invisible_console')}
          </h1>
          <p className="text-[13px] text-[#9CA3AF] max-w-2xl leading-relaxed font-sans">
            {t('dashboard.welcome_operator')}
          </p>
        </div>

        {/* 4 Telemetry Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#0D0F13]/90 border border-[#9CA3AF]/15 rounded-lg p-5 space-y-2 backdrop-blur-xl">
            <div className="text-[10px] text-[#9CA3AF] tracking-[1.5px] uppercase">{t('dashboard.tenant_isolation')}</div>
            <div className="text-[14px] text-[#00ff87] font-bold tracking-[1px]">
              {loading ? "..." : `RLS ACTIVE (${data?.tenantCount ?? 0} TENANTS)`}
            </div>
            <p className="text-[11px] text-[#9CA3AF] font-sans">{t('dashboard.rls_desc')}</p>
          </div>

          <div className="bg-[#0D0F13]/90 border border-[#9CA3AF]/15 rounded-lg p-5 space-y-2 backdrop-blur-xl">
            <div className="text-[10px] text-[#9CA3AF] tracking-[1.5px] uppercase">{t('dashboard.biometric_stream')}</div>
            <div className="text-[14px] text-[#00ff87] font-bold tracking-[1px]">
              {loading ? "..." : `${data?.systemUptime ?? "99.99%"} UPTIME (${data?.turnstileCount ?? 0} LOGS)`}
            </div>
            <p className="text-[11px] text-[#9CA3AF] font-sans">{t('dashboard.biometric_desc')}</p>
          </div>

          <div className="bg-[#0D0F13]/90 border border-[#9CA3AF]/15 rounded-lg p-5 space-y-2 backdrop-blur-xl">
            <div className="text-[10px] text-[#9CA3AF] tracking-[1.5px] uppercase">{t('dashboard.enneacore_matrix')}</div>
            <div className="text-[14px] text-[#00ff87] font-bold tracking-[1px]">
              {loading ? "..." : `9 NODES ONLINE (${data?.userCount ?? 0} ACTIVE USERS)`}
            </div>
            <p className="text-[11px] text-[#9CA3AF] font-sans">{t('dashboard.enneacore_desc')}</p>
          </div>

          <div className="bg-[#0D0F13]/90 border border-[#9CA3AF]/15 rounded-lg p-5 space-y-2 backdrop-blur-xl">
            <div className="text-[10px] text-[#9CA3AF] tracking-[1.5px] uppercase">{t('dashboard.encryption_layer')}</div>
            <div className="text-[14px] text-[#00ff87] font-bold tracking-[1px]">
              {loading ? "..." : `${data?.encryptionStandard ?? "AES-256"} ACTIVE`}
            </div>
            <p className="text-[11px] text-[#9CA3AF] font-sans">{t('dashboard.encryption_desc')}</p>
          </div>
        </div>
      </main>

      {/* Footer Bar */}
      <footer className="relative z-10 border-t border-[#9CA3AF]/15 pt-4 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#9CA3AF] gap-2">
        <span>SESSION ID: SYS-90218-09-OPERATOR</span>
        <span className="text-[#00ff87] font-bold tracking-wider">{t('actions.press_esc')}</span>
        <span>{t('system.security_classified')}</span>
      </footer>
    </div>
  );
};
