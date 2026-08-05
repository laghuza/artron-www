"use client";

import { useState } from "react";
import FederationIntakeForm from "@/components/features/narratives/FederationIntakeForm";

interface AccessFormNarrativeProps {
  onCancel: () => void;
  onSubmitting?: () => void;
  onTabChange: (tab: "login" | "request" | "choice") => void;
  accessTab: "choice" | "login" | "request";
  onHoverGate: (gate: "gate_a" | "gate_b" | null) => void;
  onTriggerFlash: () => void;
}

export default function AccessFormNarrative({
  onCancel,
  onSubmitting,
  onTabChange,
  accessTab,
  onHoverGate,
  onTriggerFlash
}: AccessFormNarrativeProps) {
  const [isValidating, setIsValidating] = useState<boolean>(false);

  const handleIntakeComplete = () => {
    setIsValidating(true);
    if (onSubmitting) onSubmitting();
    onTriggerFlash();
  };

  if (isValidating) {
    return (
      <div className="font-mono text-[11px] text-emerald-core uppercase tracking-[0.16em] leading-relaxed p-4 bg-iron-surface/40 border border-emerald-core/30 rounded space-y-3.5 animate-fadeIn">
        <div>&gt;&gt; SYSTEM ENCRYPTION PROTOCOL [OK]</div>
        <div>&gt;&gt; DATA STREAMS CAPTURED</div>
        <div className="border-t border-emerald-core/10 my-2 pt-2 text-white font-bold leading-normal">
          APPLICATION LOCKED. DATA ENCRYPTED. SECURITY AUDIT IN PROGRESS...
        </div>
        <div className="text-emerald-core text-center pt-2 font-bold animate-pulse text-[11px]">
          [ ACCESS STATUS: UNDER REVIEW ]
        </div>
        <button
          onClick={() => {
            setIsValidating(false);
            onTabChange("choice");
          }}
          className="w-full mt-4 py-1.5 border border-emerald-core/35 hover:bg-emerald-core/10 text-white font-mono text-[10px] rounded cursor-pointer transition-all uppercase tracking-wider"
        >
          [ RESET INTEGRATION ]
        </button>
      </div>
    );
  }

  if (accessTab === "choice") {
    return (
      <div className="space-y-4 font-sans select-none animate-fadeIn">
        <div className="space-y-1">
          <div className="font-mono text-[11px] text-emerald-core uppercase tracking-[0.18em]">
            [ GATEWAY_DISPATCHER ]
          </div>
          <h2 className="text-lg font-bold tracking-tight text-white uppercase font-mono">
            SELECT ENTRY PATHWAY
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          <div
            onMouseEnter={() => onHoverGate("gate_a")}
            onMouseLeave={() => onHoverGate(null)}
            onClick={() => {
              onHoverGate(null);
              onTabChange("login");
            }}
            className="border border-silver-structure/15 bg-iron-surface/30 hover:bg-emerald-core/5 hover:border-emerald-core/40 p-4 rounded cursor-pointer transition-all duration-300 group"
          >
            <div className="font-mono text-[10px] text-emerald-core/70 tracking-[0.16em] mb-0.5 group-hover:text-emerald-core transition-colors">
              GATE_A // CORE GATEWAY
            </div>
            <h3 className="font-mono text-[12px] font-bold text-white uppercase tracking-[0.12em] group-hover:translate-x-1 transition-transform">
              ENTER THE CORE
            </h3>
            <p className="text-[10.5px] text-silver-structure/70 mt-1 leading-snug font-sans tracking-normal">
              Secure credentials verification portal for registered entities.
            </p>
          </div>

          <div
            onMouseEnter={() => onHoverGate("gate_b")}
            onMouseLeave={() => onHoverGate(null)}
            onClick={() => onTabChange("request")}
            className="border border-silver-structure/15 bg-iron-surface/30 hover:bg-emerald-core/5 hover:border-emerald-core/40 p-4 rounded cursor-pointer transition-all duration-300 group"
          >
            <div className="font-mono text-[10px] text-emerald-core/70 tracking-[0.16em] mb-0.5 group-hover:text-emerald-core transition-colors">
              GATE_B // REGISTRY INTAKE
            </div>
            <h3 className="font-mono text-[12px] font-bold text-white uppercase tracking-[0.12em] group-hover:translate-x-1 transition-transform">
              INITIATE INTEGRATION
            </h3>
            <p className="text-[10.5px] text-silver-structure/70 mt-1 leading-snug font-sans tracking-normal">
              Begin 3-step vetting workflow for new federation or club profiles.
            </p>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="w-full py-1.5 text-center font-mono text-[11px] text-silver-structure hover:text-white transition-colors cursor-pointer"
        >
          &larr; CANCEL PROTOCOL
        </button>
      </div>
    );
  }

  return (
    <FederationIntakeForm />
  );
}
