"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getClubDashboardData } from "@/app/actions/dashboard";

export default function ClubControlPanel() {
  const router = useRouter();
  const [data, setData] = useState<{
    athletesCount: number;
    activeSubscriptions: number;
    programsCount: number;
    turnstileLogs: any[];
    securityStatus: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tenantId = params.get("tenantId") || "demo-club-tenant-uuid-1111-2222";

    getClubDashboardData(tenantId)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load club dashboard data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-iron text-white font-sans selection:bg-emerald-core/30 p-8 flex flex-col justify-between relative overflow-hidden schematic-grid">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-emerald-core/5 blur-[180px] pointer-events-none" />

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
          onClick={() => router.push("/sports-os")}
          className="font-mono text-[12px] text-silver-structure hover:text-white transition-colors border border-silver-structure/25 px-4 py-1.5 rounded uppercase hover:bg-white/5 cursor-pointer"
        >
          ← Terminate Connection
        </button>
      </div>

      {/* Main Grid content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 flex-1 items-stretch z-10">
        {/* Card 1: Roster (Athletes) */}
        <div className="bg-[#1A1D23]/55 border border-[rgba(156,163,175,0.12)] backdrop-blur-[24px] p-6 rounded flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-silver-structure tracking-[0.18em] uppercase mb-2">
              // CLUB_ROSTER
            </div>
            <div className="text-4xl font-extrabold text-emerald-core font-mono">
              {loading ? "..." : data?.athletesCount ?? 0}
            </div>
            <p className="text-[14px] text-bone-light/85 mt-2 font-sans">
              Sports practitioners and club members registered.
            </p>
          </div>
          <div className="font-mono text-[10px] text-emerald-core/80 mt-4">
            [ STATUS: SYNCHRONIZED ]
          </div>
        </div>

        {/* Card 2: Training Sessions (Programs) */}
        <div className="bg-[#1A1D23]/55 border border-[rgba(156,163,175,0.12)] backdrop-blur-[24px] p-6 rounded flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-silver-structure tracking-[0.18em] uppercase mb-2">
              // TRAINING_PROGRAMS
            </div>
            <div className="text-4xl font-extrabold text-copper font-mono">
              {loading ? "..." : data?.programsCount ?? 0}
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
              {loading ? "..." : data?.securityStatus ? "SECURE" : "IDLE"}
            </div>
            <p className="text-[14px] text-bone-light/85 mt-2 font-sans">
              Access permissions and Row-Level Security (RLS) policies verified.
            </p>
          </div>
          <div className="font-mono text-[10px] text-gold-raw/80 mt-4">
            [ RLS STATUS: ACTIVE_OK ]
          </div>
        </div>
      </div>

      {/* Live Turnstile Logs Sub-panel */}
      {!loading && data?.turnstileLogs && data.turnstileLogs.length > 0 && (
        <div className="my-4 bg-[#121418]/60 border border-silver-structure/10 p-5 rounded z-10">
          <div className="font-mono text-[10px] text-emerald-core tracking-[0.18em] uppercase mb-3">
            // LIVE_TURNSTILE_ACCESS_LOGS (TENANT ONLY)
          </div>
          <div className="space-y-2">
            {data.turnstileLogs.map((log: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center text-[12px] font-mono border-b border-white/5 pb-1.5">
                <span className="text-bone-light">{log.user?.name || "Unknown Operator"}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] ${log.direction === "IN" ? "bg-emerald-core/10 text-emerald-core" : "bg-copper/10 text-copper"}`}>
                  {log.direction}
                </span>
                <span className="text-silver-structure">{new Date(log.timestamp).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer log bar */}
      <div className="border-t border-silver-structure/10 pt-4 flex justify-between items-center text-[10px] font-mono text-silver-structure tracking-[0.18em] z-10">
        <div>CORE INTEGRATION STABLE // DECRYPT_KEY: A-VALID</div>
        <div>ARTRON.IO // CONFIDENTIAL CMD</div>
      </div>
    </div>
  );
}
