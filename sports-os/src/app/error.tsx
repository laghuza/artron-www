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
    <div className="relative min-h-screen bg-[#121418] text-[#00E676] font-mono flex flex-col items-center justify-center p-6 overflow-hidden select-none">
      <ScanLine trigger={0} />
      
      <div className="absolute top-8 left-8 text-xs text-[#9CA3AF] tracking-widest uppercase flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-ping" />
        SYSTEM_DIAGNOSTICS // CRITICAL_BOUNDARY
      </div>
      <div className="absolute bottom-8 right-8 text-xs text-[#6B7280]">
        ENNEACORE_NODE_FAULT_ISOLATION_VERIFIED
      </div>

      {/* Main Diagnostic Container */}
      <div className="relative z-10 max-w-xl w-full bg-[#1A1D23]/90 border border-[#9CA3AF]/18 rounded-md p-8 shadow-[0_0_8px_rgba(0,230,118,0.12)] backdrop-blur-md">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#9CA3AF]/18">
          <ArtronLogo className="w-10 h-10 animate-pulse" />
          <div>
            <h1 className="text-lg font-medium tracking-wider text-[#F5F5F3] uppercase">ARTRON HUD FAULT INTERCEPT</h1>
            <p className="text-xs text-[#00E676] uppercase tracking-widest">{errorCode}</p>
          </div>
        </div>

        {/* Telemetry Output Box */}
        <div className="bg-[#121418] border border-[#9CA3AF]/18 rounded-sm p-4 mb-6 text-xs font-mono space-y-2">
          <div className="flex justify-between border-b border-[#9CA3AF]/18 pb-1">
            <span className="text-[#6B7280]">FAULT REASON:</span>
            <span className="text-[#00E676] font-medium">{error.name || "UNHANDLED_EXCEPTION"}</span>
          </div>
          <div className="break-words text-[#9CA3AF]">
            {error.message || "An unexpected telemetry disruption occurred in the neural mesh."}
          </div>
          {error.digest && (
            <div className="text-[10px] text-[#6B7280]">DIGEST: {error.digest}</div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#00E676] hover:bg-[#00E676]/90 text-[#121418] font-medium text-xs tracking-wider uppercase rounded-sm shadow-[0_0_8px_rgba(0,230,118,0.12)] transition-colors active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            REBOOT ENNEACORE PIPELINE
          </button>
          
          <a
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 border border-[#9CA3AF]/18 text-[#9CA3AF] hover:text-[#F5F5F3] hover:border-[#00E676]/40 hover:bg-[#232730] font-medium text-xs tracking-wider uppercase rounded-sm text-center transition-colors"
          >
            RETURN TO GATEWAY
          </a>
        </div>
      </div>
    </div>
  );
}
