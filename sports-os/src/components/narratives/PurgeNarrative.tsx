import React, { useState } from "react";

interface PurgeNarrativeProps {
  purgeState: "selection" | "tenant" | "athlete" | "tenant-success" | "athlete-success";
  setPurgeState: (state: any) => void;
}

export default function PurgeNarrative({ purgeState, setPurgeState }: PurgeNarrativeProps) {
  // Form States
  const [tenantId, setTenantId] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  
  const [athleteId, setAthleteId] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");

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
              className="w-full text-center text-[10px] text-[#9CA3AF]/50 hover:text-white transition-colors duration-200 mt-2 uppercase"
            >
              [ RETURN_TO_SECURITY ]
            </button>
          </div>
        </div>
      )}

      {/* STATE B: CORPORATE FORM */}
      {purgeState === "tenant" && (
        <form
          onSubmit={(e) => { e.preventDefault(); setPurgeState("tenant-success"); }}
          className="space-y-4 font-mono text-xs text-[#F5F5F7]"
        >
          <div className="space-y-1">
            <label className="text-[10px] tracking-widest text-[#9CA3AF] block">TENANT_ID</label>
            <input
              type="text"
              required
              placeholder="FED-089"
              value={tenantId}
              onChange={(e) => setTenantId(e.target.value.toUpperCase())}
              className="w-full bg-transparent border-b border-[#9CA3AF]/30 focus:border-[#FF3D00] focus:shadow-[0_1px_0_0_#FF3D00] outline-none py-2 text-white font-mono uppercase tracking-widest transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] tracking-widest text-[#9CA3AF] block">ADMIN_EMAIL</label>
            <input
              type="email"
              required
              placeholder="ADMIN@ORGANIZATION.COM"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full bg-transparent border-b border-[#9CA3AF]/30 focus:border-[#FF3D00] focus:shadow-[0_1px_0_0_#FF3D00] outline-none py-2 text-white font-mono tracking-widest transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] tracking-widest text-[#9CA3AF] block">VERIFICATION_CODE</label>
            <input
              type="text"
              required
              placeholder="SECURE-AUTH-KEY"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
              className="w-full bg-transparent border-b border-[#9CA3AF]/30 focus:border-[#FF3D00] focus:shadow-[0_1px_0_0_#FF3D00] outline-none py-2 text-white font-mono uppercase tracking-widest transition-all"
            />
          </div>
          <div className="pt-4 flex flex-col gap-2">
            <button
              type="submit"
              className="w-full bg-[#FF3D00]/10 hover:bg-[#FF3D00] hover:text-[#121418] border border-[#FF3D00] text-[#FF3D00] font-mono py-3 px-4 rounded transition-all duration-300 uppercase cursor-pointer"
            >
              [ INITIATE_DEPROVISIONING ]
            </button>
            <button
              type="button"
              onClick={() => setPurgeState("selection")}
              className="w-full text-center text-[10px] text-[#9CA3AF]/50 hover:text-white transition-colors duration-200 mt-2 uppercase"
            >
              [ BACK_TO_GATEWAYS ]
            </button>
          </div>
        </form>
      )}

      {/* STATE B SUCCESS: CORPORATE LOG OUTPUT */}
      {purgeState === "tenant-success" && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-4 bg-black/30 border border-[#FF3D00]/40 rounded text-[#FF3D00] space-y-2 leading-relaxed uppercase tracking-wider">
            <div>STATUS: DEPROVISIONING_PENDING</div>
            <div>// 14-DAY_COOLING_OFF_PERIOD_ACTIVE</div>
            <div>PURGE DATE: {getPurgeDate14DaysAhead()}</div>
          </div>
          <button
            onClick={() => { setPurgeState("none"); setTenantId(""); setAdminEmail(""); setVerificationCode(""); }}
            className="w-full text-center text-[10px] text-[#9CA3AF] hover:text-[#00E676] transition-colors duration-200 uppercase font-mono"
          >
            [ ACKNOWLEDGE_AND_CLOSE ]
          </button>
        </div>
      )}

      {/* STATE C: ATHLETE FORM */}
      {purgeState === "athlete" && (
        <form
          onSubmit={(e) => { e.preventDefault(); setPurgeState("athlete-success"); }}
          className="space-y-4 font-mono text-xs text-[#F5F5F7]"
        >
          <div className="space-y-1">
            <label className="text-[10px] tracking-widest text-[#9CA3AF] block">ATHLETE_ID</label>
            <input
              type="text"
              required
              placeholder="A-98421"
              value={athleteId}
              onChange={(e) => setAthleteId(e.target.value.toUpperCase())}
              className="w-full bg-transparent border-b border-[#9CA3AF]/30 focus:border-[#FF3D00] focus:shadow-[0_1px_0_0_#FF3D00] outline-none py-2 text-white font-mono uppercase tracking-widest transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] tracking-widest text-[#9CA3AF] block">REGISTERED_EMAIL</label>
            <input
              type="email"
              required
              placeholder="ATHLETE@TRAINING.COM"
              value={registeredEmail}
              onChange={(e) => setRegisteredEmail(e.target.value)}
              className="w-full bg-transparent border-b border-[#9CA3AF]/30 focus:border-[#FF3D00] focus:shadow-[0_1px_0_0_#FF3D00] outline-none py-2 text-white font-mono tracking-widest transition-all"
            />
          </div>
          <div className="pt-4 flex flex-col gap-2">
            <button
              type="submit"
              className="w-full bg-[#FF3D00]/10 hover:bg-[#FF3D00] hover:text-[#121418] border border-[#FF3D00] text-[#FF3D00] font-mono py-3 px-4 rounded transition-all duration-300 uppercase cursor-pointer"
            >
              [ REQUEST_DATA_PURGE ]
            </button>
            <button
              type="button"
              onClick={() => setPurgeState("selection")}
              className="w-full text-center text-[10px] text-[#9CA3AF]/50 hover:text-white transition-colors duration-200 mt-2 uppercase"
            >
              [ BACK_TO_GATEWAYS ]
            </button>
          </div>
        </form>
      )}

      {/* STATE C SUCCESS: ATHLETE LOG OUTPUT */}
      {purgeState === "athlete-success" && (
        <div className="space-y-6 font-mono text-xs">
          <div className="p-4 bg-black/30 border border-[#FF3D00]/40 rounded text-[#FF3D00] space-y-2 leading-relaxed uppercase tracking-wider">
            <div>STATUS: PENDING_DELETE</div>
            <div>// REQUEST SENT TO PARENT CLUB ADMIN</div>
            <div>AN EMAIL CONFIRMATION HAS BEEN DISPATCHED TO {registeredEmail.toUpperCase()}</div>
          </div>
          <button
            onClick={() => { setPurgeState("none"); setAthleteId(""); setRegisteredEmail(""); }}
            className="w-full text-center text-[10px] text-[#9CA3AF] hover:text-[#00E676] transition-colors duration-200 uppercase font-mono"
          >
            [ ACKNOWLEDGE_AND_CLOSE ]
          </button>
        </div>
      )}
    </div>
  );
}
