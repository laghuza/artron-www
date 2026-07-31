"use client";

import { useState } from "react";

interface AthletePurgeFormProps {
  setPurgeState: (state: any) => void;
  isSuccess: boolean;
}

export default function AthletePurgeForm({ setPurgeState, isSuccess }: AthletePurgeFormProps) {
  const [athleteId, setAthleteId] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");

  if (isSuccess) {
    return (
      <div className="space-y-6 font-mono text-xs">
        <div className="p-4 bg-black/30 border border-[#FF3D00]/40 rounded text-[#FF3D00] space-y-2 leading-relaxed uppercase tracking-wider">
          <div>STATUS: PENDING_DELETE</div>
          <div>// REQUEST SENT TO PARENT CLUB ADMIN</div>
          <div>AN EMAIL CONFIRMATION HAS BEEN DISPATCHED TO {registeredEmail.toUpperCase()}</div>
        </div>
        <button
          onClick={() => {
            setPurgeState("none");
            setAthleteId("");
            setRegisteredEmail("");
          }}
          className="w-full text-center text-[10px] text-[#9CA3AF] hover:text-[#00E676] transition-colors duration-200 uppercase font-mono cursor-pointer"
        >
          [ ACKNOWLEDGE_AND_CLOSE ]
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setPurgeState("athlete-success");
      }}
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
          className="w-full text-center text-[10px] text-[#9CA3AF]/50 hover:text-white transition-colors duration-200 mt-2 uppercase cursor-pointer"
        >
          [ BACK_TO_GATEWAYS ]
        </button>
      </div>
    </form>
  );
}
