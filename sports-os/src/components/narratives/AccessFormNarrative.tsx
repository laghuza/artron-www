"use client";

import React, { useState } from 'react';
import CinematicLoginConsole from './CinematicLoginConsole';
import RegistryIntakeWizard from './RegistryIntakeWizard';

interface AccessFormNarrativeProps {
  onReset: () => void;
  accessTab: "choice" | "login" | "request";
  setAccessTab: (tab: "choice" | "login" | "request") => void;
  sweepTrigger: number;
  setSweepTrigger: (val: number | ((prev: number) => number)) => void;
  setTransitionStep: (step: any) => void;
  transitionStep: string;
  setIsFlashActive: (val: boolean) => void;
  setIsFadeToBlack: (val: boolean) => void;
  onHoverGate: (gate: "gate_a" | "gate_b" | null) => void;
}

export default function AccessFormNarrative({
  onReset,
  accessTab,
  setAccessTab,
  sweepTrigger,
  setSweepTrigger,
  setTransitionStep,
  transitionStep,
  setIsFlashActive,
  setIsFadeToBlack,
  onHoverGate
}: AccessFormNarrativeProps) {
  const [isValidating, setIsValidating] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex flex-col justify-center">
      {/* 1. DISPATCHER CHOICE SCREEN */}
      {accessTab === "choice" && (
        <div className="space-y-6 font-sans select-none animate-fadeIn max-w-md w-full">
          <div className="space-y-1 mb-6">
            <span className="text-[#00E676] text-[10px] font-mono tracking-widest uppercase block">
              [ GATEWAY_DISPATCHER ]
            </span>
            <h2 className="text-2xl font-semibold tracking-tight text-white uppercase">
              SELECT ENTRY PATHWAY
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {/* GATE A - LOGIN */}
            <div 
              onClick={() => setAccessTab("login")}
              onMouseEnter={() => onHoverGate("gate_a")}
              onMouseLeave={() => onHoverGate(null)}
              className="group border border-[#9CA3AF]/10 bg-[#121418]/40 hover:border-[#00E676] hover:bg-[#00E676]/5 p-4 rounded-none cursor-pointer transition-all duration-300"
            >
              <div className="font-mono text-[10px] text-[#00E676] uppercase tracking-widest mb-1">
                GATE_A // CORE GATEWAY
              </div>
              <div className="text-[13px] font-bold text-white uppercase group-hover:text-[#00E676]">
                ENTER THE CORE
              </div>
              <div className="text-[11px] text-[#9CA3AF]/70 mt-1 font-mono uppercase">
                Secure credentials verification portal for registered entities.
              </div>
            </div>

            {/* GATE B - REGISTRATION */}
            <div 
              onClick={() => setAccessTab("request")}
              onMouseEnter={() => onHoverGate("gate_b")}
              onMouseLeave={() => onHoverGate(null)}
              className="group border border-[#9CA3AF]/10 bg-[#121418]/40 hover:border-[#00E676] hover:bg-[#00E676]/5 p-4 rounded-none cursor-pointer transition-all duration-300"
            >
              <div className="font-mono text-[10px] text-[#00E676] uppercase tracking-widest mb-1">
                GATE_B // REGISTRY INTAKE
              </div>
              <div className="text-[13px] font-bold text-white uppercase group-hover:text-[#00E676]">
                INITIATE INTEGRATION
              </div>
              <div className="text-[11px] text-[#9CA3AF]/70 mt-1 font-mono uppercase">
                Begin 3-step vetting workflow for new federation or club profiles.
              </div>
            </div>
          </div>

          <button
            onClick={onReset}
            className="w-fit text-left text-[#9CA3AF]/50 hover:text-[#00E676] font-mono text-[10px] uppercase transition-colors pt-6 block cursor-pointer"
          >
            _ CANCEL PROTOCOL
          </button>
        </div>
      )}

      {/* 2. LOGIN CONSOLE */}
      {accessTab === "login" && (
        <CinematicLoginConsole 
          onReset={onReset}
          sweepTrigger={sweepTrigger}
          setSweepTrigger={setSweepTrigger}
          setTransitionStep={setTransitionStep}
          transitionStep={transitionStep}
          setIsFlashActive={setIsFlashActive}
          setIsFadeToBlack={setIsFadeToBlack}
        />
      )}

      {/* 3. NEW REGISTRY INTAKE WIZARD */}
      {accessTab === "request" && (
        <RegistryIntakeWizard onReset={onReset} />
      )}
    </div>
  );
}
