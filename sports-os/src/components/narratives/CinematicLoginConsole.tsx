"use client";

import { useState } from "react";

interface CinematicLoginConsoleProps {
  onCancel: () => void;
  onSubmitting: () => void;
  onFlashTrigger: () => void;
  onSuccessRedirect: (path: string) => void;
  onSwitchToRequest: () => void;
  onFadeToBlack: () => void;
}

export default function CinematicLoginConsole({
  onCancel,
  onSubmitting,
  onFlashTrigger,
  onSuccessRedirect,
  onFadeToBlack
}: CinematicLoginConsoleProps) {
  const [artronId, setArtronId] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [status, setStatus] = useState<"idle" | "verifying" | "done">("idle");
  const [logStep, setLogStep] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!/^A-\d{5}$/.test(artronId.toUpperCase())) {
      setError("INVALID ID. REQUIRED FORMAT: A-XXXXX");
      return;
    }
    if (!accessCode) {
      setError("ACCESS CODE REQUIRED");
      return;
    }

    setStatus("verifying");
    onSubmitting();
    onFlashTrigger();

    setTimeout(() => setLogStep(1), 450);
    setTimeout(() => setLogStep(2), 900);
    setTimeout(() => {
      setLogStep(3);
      onFadeToBlack();
    }, 1350);

    setTimeout(() => {
      setStatus("done");
      const digit = parseInt(artronId.replace(/\D/g, "")) || 0;
      onSuccessRedirect(digit % 2 !== 0 ? "/federation/dashboard" : "/club/control");
    }, 2200);
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto text-center font-mono">
      {status === "idle" ? (
        <div className="space-y-5 animate-fadeIn">
          <div className="space-y-1.5 mt-2">
            <h1 className="text-white text-[24px] md:text-[28px] font-extrabold uppercase font-sans tracking-tight leading-none">
              WELCOME BACK TO THE CORE.
            </h1>
            <div className="text-silver-structure/70 text-[9px] uppercase tracking-[0.16em]">
              [ INITIALIZING SECURE GATEWAY HANDSHAKE... ]
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-ruby font-bold uppercase text-[10px] tracking-wider">&gt; {error}</div>}
            
            <div className="py-0.5">
              <input
                type="text"
                required
                value={artronId}
                onChange={(e) => setArtronId(e.target.value)}
                className="line-input-centered uppercase"
                placeholder="ENTER ARTRON ID"
              />
            </div>
            
            <div className="py-0.5">
              <input
                type="password"
                required
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="line-input-centered"
                placeholder="ENTER ACCESS CODE"
              />
            </div>
            
            <div className="flex flex-col gap-3 pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-black hover:bg-emerald-core/10 border border-emerald-core/40 hover:border-emerald-core text-emerald-core font-bold uppercase rounded cursor-pointer transition-all duration-300 text-[10px] tracking-[0.18em] shadow-[0_0_15px_rgba(0,230,118,0.05)] hover:shadow-[0_0_20px_rgba(0,230,118,0.15)]"
              >
                [ SECURE CONNECTION // ACTIVATE NODE ]
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="text-silver-structure/50 hover:text-white transition-colors cursor-pointer text-[9px] tracking-widest"
              >
                ← CANCEL GATEWAY
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="py-8 animate-fadeIn space-y-3">
          <div className="text-silver-structure/40 text-[9px] uppercase tracking-[0.16em] animate-pulse">
            [ PERFORMING SECURE CONNECTION HANDSHAKE ]
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-emerald-core leading-relaxed px-4 min-h-[24px]">
            {logStep >= 1 && "GEO_NODE_ACTIVE"}
            {logStep >= 2 && " // GATEWAY_KEY_VALIDATED"}
            {logStep >= 3 && " // SYNCHRONIZING TELEMETRY..."}
            {logStep < 3 && (
              <span className="inline-block w-1.5 h-3 bg-emerald-core ml-1 animate-blink align-middle"></span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
