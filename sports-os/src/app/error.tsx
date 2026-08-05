"use client";

import React, { useEffect } from "react";
import ArtronLogo from "@/components/ui/ArtronLogo";
import ScanLine from "@/components/ui/ScanLine";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[ARTRON HUD DIAGNOSTICS] Critical System Fault:", error);
  }, [error]);

  const errorCode = error.digest ? `ERR_${error.digest.slice(0, 8).toUpperCase()}` : "ERR_TELEMETRY_FAULT_500";

  return (
    <div className="relative min-h-screen bg-[#05070a] text-[#00ff87] font-mono flex flex-col items-center justify-center p-6 overflow-hidden select-none">
      <ScanLine trigger={0} />
      
      {/* HUD Background Grid & Visual Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,135,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-8 left-8 text-xs text-[#00e5ff]/60 tracking-widest uppercase flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-ping" />
        SYSTEM_DIAGNOSTICS // CRITICAL_BOUNDARY
      </div>
      <div className="absolute bottom-8 right-8 text-xs text-[#9CA3AF]/40">
        ENNEACORE_NODE_FAULT_ISOLATION_VERIFIED
      </div>

      {/* Main Diagnostic Container */}
      <div className="relative z-10 max-w-xl w-full bg-[#0a0f16]/90 border border-[#00ff87]/30 rounded-xl p-8 shadow-[0_0_50px_rgba(0,255,135,0.15)] backdrop-blur-md">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#00ff87]/20">
          <ArtronLogo className="w-10 h-10 animate-pulse" />
          <div>
            <h1 className="text-xl font-bold tracking-wider text-white">ARTRON HUD FAULT INTERCEPT</h1>
            <p className="text-xs text-[#00e5ff] uppercase tracking-widest">{errorCode}</p>
          </div>
        </div>

        {/* Telemetry Output Box */}
        <div className="bg-[#05070a] border border-[#00e5ff]/20 rounded-lg p-4 mb-6 text-xs text-emerald-400 font-mono space-y-2">
          <div className="flex justify-between border-b border-emerald-950 pb-1">
            <span className="text-[#9CA3AF]">FAULT REASON:</span>
            <span className="text-red-400 font-bold">{error.name || "UNHANDLED_EXCEPTION"}</span>
          </div>
          <div className="break-words text-[#9CA3AF]/90">
            {error.message || "An unexpected telemetry disruption occurred in the neural mesh."}
          </div>
          {error.digest && (
            <div className="text-[10px] text-[#00e5ff]/70">DIGEST: {error.digest}</div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 bg-[#00ff87] hover:bg-[#00e5ff] text-[#05070a] font-bold text-xs tracking-wider uppercase rounded shadow-[0_0_20px_rgba(0,255,135,0.4)] transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            REBOOT ENNEACORE PIPELINE
          </button>
          
          <a
            href="/"
            className="w-full sm:w-auto px-6 py-3 border border-[#00e5ff]/40 text-[#00e5ff] hover:bg-[#00e5ff]/10 font-bold text-xs tracking-wider uppercase rounded text-center transition-all"
          >
            RETURN TO GATEWAY
          </a>
        </div>
      </div>
    </div>
  );
}
