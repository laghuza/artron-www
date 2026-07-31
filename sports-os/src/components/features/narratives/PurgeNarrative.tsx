"use client";

import React from "react";
import TenantPurgeForm from "./purge/TenantPurgeForm";
import AthletePurgeForm from "./purge/AthletePurgeForm";

interface PurgeNarrativeProps {
  purgeState: "selection" | "tenant" | "athlete" | "tenant-success" | "athlete-success";
  setPurgeState: (state: any) => void;
}

export default function PurgeNarrative({ purgeState, setPurgeState }: PurgeNarrativeProps) {
  const getPurgeDate14DaysAhead = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="space-y-6 font-sans select-none animate-fadeIn max-w-md">
      {/* Header */}
      <div className="space-y-1">
        <div className="font-mono text-[11px] text-[#FF3D00] uppercase tracking-[0.15em] flex items-center gap-2">
          <span>●</span> [ NODE_08 // SYSTEM_DEAUTHORIZATION ]
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white uppercase">
          DATA PURGE PROTOCOL
        </h2>
      </div>

      {/* STATE A: SELECTION */}
      {purgeState === "selection" && (
        <div className="space-y-6">
          <p className="text-[14px] text-[#9CA3AF] leading-relaxed font-mono uppercase tracking-wider">
            WARNING: INITIATING THIS PROTOCOL WILL REMOVE CRYPTOGRAPHIC IDENTIFIERS AND PERSONAL TELEMETRY SIGNATURES FROM THE ARTRON INTEGRATED REGISTRY.
          </p>
          <div className="flex flex-col gap-3 font-mono text-xs">
            <button
              onClick={() => setPurgeState("tenant")}
              className="w-full text-left p-3 border border-[#9CA3AF]/20 hover:border-[#FF3D00] hover:text-[#FF3D00] transition-all duration-300 rounded cursor-pointer bg-black/10"
            >
              GATEWAY_A // [ CORPORATE_TENANT ]
            </button>
            <button
              onClick={() => setPurgeState("athlete")}
              className="w-full text-left p-3 border border-[#9CA3AF]/20 hover:border-[#FF3D00] hover:text-[#FF3D00] transition-all duration-300 rounded cursor-pointer bg-black/10"
            >
              GATEWAY_B // [ INDIVIDUAL_ATHLETE ]
            </button>
            <button
              onClick={() => setPurgeState("none")}
              className="w-full text-center text-[10px] text-[#9CA3AF]/50 hover:text-white transition-colors duration-200 mt-2 uppercase cursor-pointer"
            >
              [ RETURN_TO_SECURITY ]
            </button>
          </div>
        </div>
      )}

      {/* STATE B: CORPORATE FORM & SUCCESS */}
      {(purgeState === "tenant" || purgeState === "tenant-success") && (
        <TenantPurgeForm
          setPurgeState={setPurgeState}
          getPurgeDate14DaysAhead={getPurgeDate14DaysAhead}
          isSuccess={purgeState === "tenant-success"}
        />
      )}

      {/* STATE C: ATHLETE FORM & SUCCESS */}
      {(purgeState === "athlete" || purgeState === "athlete-success") && (
        <AthletePurgeForm
          setPurgeState={setPurgeState}
          isSuccess={purgeState === "athlete-success"}
        />
      )}
    </div>
  );
}
