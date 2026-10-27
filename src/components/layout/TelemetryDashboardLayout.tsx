"use client";

import React from "react";
import { useRouter } from "next/navigation";

export interface TelemetryDashboardLayoutProps {
  nodeBadge: string;
  title: string;
  backHref?: string;
  backLabel?: string;
  children: React.ReactNode;
}

export const TelemetryDashboardLayout: React.FC<TelemetryDashboardLayoutProps> = ({
  nodeBadge,
  title,
  backHref = "/sports-os",
  backLabel = "← Terminate Connection",
  children,
}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-iron text-white font-sans selection:bg-emerald-core/30 p-8 flex flex-col justify-between relative overflow-hidden schematic-grid">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-emerald-core/5 blur-[180px] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex justify-between items-center border-b border-silver-structure/10 pb-6 z-10">
        <div>
          <div className="font-mono text-[10px] text-emerald-core tracking-[0.18em] uppercase">
            {nodeBadge}
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">
            {title}
          </h1>
        </div>
        <button
          onClick={() => router.push(backHref)}
          className="font-mono text-[12px] text-silver-structure hover:text-white transition-colors border border-silver-structure/25 px-4 py-1.5 rounded uppercase hover:bg-white/5 cursor-pointer"
        >
          {backLabel}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="my-8 flex-1 flex flex-col justify-between z-10">
        {children}
      </div>

      {/* Footer Log Bar */}
      <div className="border-t border-silver-structure/10 pt-4 flex justify-between items-center text-[10px] font-mono text-silver-structure tracking-[0.18em] z-10">
        <div>CORE INTEGRATION STABLE // DECRYPT_KEY: A-VALID</div>
        <div>ARTRON.IO // CONFIDENTIAL CMD</div>
      </div>
    </div>
  );
};
