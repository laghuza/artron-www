"use client";

import { useRouter } from "next/navigation";

export default function ClubControlPanel() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-iron text-white font-sans selection:bg-emerald-core/30 p-8 flex flex-col justify-between relative overflow-hidden schematic-grid">
      {/* Header Bar */}
      <div className="flex justify-between items-center border-b border-silver-structure/10 pb-6 z-10">
        <div>
          <div className="font-mono text-[10px] text-emerald-core tracking-[0.18em] uppercase">
            [ SPORTS_CLUB_MANAGEMENT_NODE ]
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">
            Club Control Panel
          </h1>
        </div>
        <button
          onClick={() => router.push("/")}
          className="font-mono text-[12px] text-silver-structure hover:text-white transition-colors border border-silver-structure/25 px-4 py-1.5 rounded uppercase hover:bg-white/5 cursor-pointer"
        >
          ← Terminate Connection
        </button>
      </div>

      {/* Main Grid content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 flex-1 items-stretch z-10">
        {/* Card 1: Roster */}
        <div className="bg-[#1A1D23]/55 border border-[rgba(156,163,175,0.12)] backdrop-blur-[24px] p-6 rounded flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-silver-structure tracking-[0.18em] uppercase mb-2">
              // CLUB_ROSTER
            </div>
            <div className="text-4xl font-extrabold text-emerald-core font-mono">
              450
            </div>
            <p className="text-[14px] text-bone-light/85 mt-2 font-sans">
              Sports practitioners and club members registered.
            </p>
          </div>
          <div className="font-mono text-[10px] text-emerald-core/80 mt-4">
            [ STATUS: SYNCHRONIZED ]
          </div>
        </div>

        {/* Card 2: Training Sessions */}
        <div className="bg-[#1A1D23]/55 border border-[rgba(156,163,175,0.12)] backdrop-blur-[24px] p-6 rounded flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-silver-structure tracking-[0.18em] uppercase mb-2">
              // TRAINING_PROGRAMS
            </div>
            <div className="text-4xl font-extrabold text-copper font-mono">
              14
            </div>
            <p className="text-[14px] text-bone-light/85 mt-2 font-sans">
              Active sports programs and training paths running.
            </p>
          </div>
          <div className="font-mono text-[10px] text-copper/80 mt-4">
            [ SCHEDULES: LIVE ]
          </div>
        </div>

        {/* Card 3: Gateway Node status */}
        <div className="bg-[#1A1D23]/55 border border-[rgba(156,163,175,0.12)] backdrop-blur-[24px] p-6 rounded flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-silver-structure tracking-[0.18em] uppercase mb-2">
              // HUB_NODE_SECURITY
            </div>
            <div className="text-4xl font-extrabold text-gold-raw font-mono">
              SECURE
            </div>
            <p className="text-[14px] text-bone-light/85 mt-2 font-sans">
              Access permissions and local node firewall parameters verified.
            </p>
          </div>
          <div className="font-mono text-[10px] text-gold-raw/80 mt-4">
            [ TENANT_ID: ACTIVE_OK ]
          </div>
        </div>
      </div>

      {/* Footer log bar */}
      <div className="border-t border-silver-structure/10 pt-4 flex justify-between items-center text-[10px] font-mono text-silver-structure tracking-[0.18em] z-10">
        <div>CORE INTEGRATION STABLE // DECRYPT_KEY: A-VALID</div>
        <div>ARTRON.IO // CONFIDENTIAL CMD</div>
      </div>
    </div>
  );
}
