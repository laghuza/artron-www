"use client";

import React, { useEffect } from "react";
import { soundEngine } from "@/core";

interface SimpleOperatorDashboardProps {
  onReturnToGateway: () => void;
}

export const SimpleOperatorDashboard: React.FC<SimpleOperatorDashboardProps> = ({
  onReturnToGateway,
}) => {
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#00E676]/5 blur-[180px] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 flex items-center justify-between border-b border-[#9CA3AF]/15 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00E676] animate-pulse" />
          <span className="text-[12px] font-bold text-[#E5E7EB] tracking-[2.5px] uppercase">
            ARTRON OS // B2B OPERATOR SYSTEM CONSOLE
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            soundEngine.playPulseNode();
            onReturnToGateway();
          }}
          className="px-4 py-2 bg-[#121418] hover:bg-[#00E676] text-[#00E676] hover:text-[#090b0e] border border-[#00E676]/40 text-[11px] font-bold tracking-[2px] uppercase rounded transition-all cursor-pointer shadow-[0_0_15px_rgba(0,230,118,0.2)]"
        >
          [ ✕ RETURN TO GATEWAY (ESC) ]
        </button>
      </header>

      {/* Main Console Body */}
      <main className="relative z-10 my-auto max-w-4xl mx-auto w-full py-8 space-y-8">
        {/* Welcome Banner */}
        <div className="space-y-3 border-l-2 border-[#00E676] pl-6 py-2">
          <div className="text-[11px] text-[#00E676] font-bold tracking-[2px] uppercase">
            ● AUTHENTICATION VERIFIED // OPERATOR ACCESS GRANTED
          </div>
          <h1 className="text-[26px] font-bold text-[#F5F5F7] tracking-[2.5px] uppercase">
            ARTRON INVISIBLE SYSTEM CONSOLE
          </h1>
          <p className="text-[13px] text-[#9CA3AF] max-w-2xl leading-relaxed font-sans">
            Welcome, Operator (<span className="text-[#C0C0C0] font-mono font-bold">operator@artron.ge</span>). You have successfully penetrated Node #09 Operator Matrix. All multi-tenant data pipelines and AI telemetry engines are online.
          </p>
        </div>

        {/* 4 Telemetry Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#0D0F13]/90 border border-[#9CA3AF]/15 rounded-lg p-5 space-y-2 backdrop-blur-xl">
            <div className="text-[10px] text-[#9CA3AF] tracking-[1.5px] uppercase">01 // TENANT ISOLATION</div>
            <div className="text-[14px] text-[#00E676] font-bold tracking-[1px]">RLS ENFORCED // ACTIVE</div>
            <p className="text-[11px] text-[#9CA3AF] font-sans">Multi-tenant Row-Level Security active for all federation data.</p>
          </div>

          <div className="bg-[#0D0F13]/90 border border-[#9CA3AF]/15 rounded-lg p-5 space-y-2 backdrop-blur-xl">
            <div className="text-[10px] text-[#9CA3AF] tracking-[1.5px] uppercase">02 // BIOMETRIC STREAM</div>
            <div className="text-[14px] text-[#00E676] font-bold tracking-[1px]">120 FPS // REAL-TIME</div>
            <p className="text-[11px] text-[#9CA3AF] font-sans">Edge hardware telemetry and RFID biometric streaming connected.</p>
          </div>

          <div className="bg-[#0D0F13]/90 border border-[#9CA3AF]/15 rounded-lg p-5 space-y-2 backdrop-blur-xl">
            <div className="text-[10px] text-[#9CA3AF] tracking-[1.5px] uppercase">03 // ENNEACORE MATRIX</div>
            <div className="text-[14px] text-[#00E676] font-bold tracking-[1px]">9 / 9 NODES ONLINE</div>
            <p className="text-[11px] text-[#9CA3AF] font-sans">All core system nodes synchronized with central state dispatcher.</p>
          </div>

          <div className="bg-[#0D0F13]/90 border border-[#9CA3AF]/15 rounded-lg p-5 space-y-2 backdrop-blur-xl">
            <div className="text-[10px] text-[#9CA3AF] tracking-[1.5px] uppercase">04 // ENCRYPTION LAYER</div>
            <div className="text-[14px] text-[#00E676] font-bold tracking-[1px]">AES-256 PII // ACTIVE</div>
            <p className="text-[11px] text-[#9CA3AF] font-sans">Personally identifiable athlete telemetry encrypted at rest.</p>
          </div>
        </div>
      </main>

      {/* Footer Bar */}
      <footer className="relative z-10 border-t border-[#9CA3AF]/15 pt-4 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#9CA3AF] gap-2">
        <span>SESSION ID: SYS-90218-09-OPERATOR</span>
        <span className="text-[#00E676] font-bold tracking-wider">PRESS [ESC] TO RETURN TO GATEWAY</span>
        <span>SECURITY LEVEL: CLASSIFIED</span>
      </footer>
    </div>
  );
};
