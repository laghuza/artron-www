"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getFederationDashboardData } from "@/app/actions/dashboard";

export default function FederationDashboard() {
  const router = useRouter();
  const [data, setData] = useState<{
    athletesCount: number;
    clubsCount: number;
    trainersCount: number;
    recentAuditLogs: any[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tenantId = params.get("tenantId") || "demo-fed-tenant-uuid-1111-2222";

    getFederationDashboardData(tenantId)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load federation dashboard data:", err);
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
            [ SOVEREIGN_FEDERATION_INTEGRATION_NODE ]
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">
            Federation Central Command
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
        {/* Card 1: Core Telemetry (Athlete Directory) */}
        <div className="bg-[#1A1D23]/55 border border-[rgba(156,163,175,0.12)] backdrop-blur-[24px] p-6 rounded flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-silver-structure tracking-[0.18em] uppercase mb-2">
              // ATHLETE_DIRECTORY
            </div>
            <div className="text-4xl font-extrabold text-emerald-core font-mono">
              {loading ? "..." : (data?.athletesCount ?? 0).toLocaleString()}
            </div>
            <p className="text-[14px] text-bone-light/85 mt-2 font-sans">
              Active sports practitioners registry database verified.
            </p>
          </div>
          <div className="font-mono text-[10px] text-emerald-core/80 mt-4">
            [ DATA_SYNC: SECURE_SYNC_OK ]
          </div>
        </div>

        {/* Card 2: Trainer / Officer Database */}
        <div className="bg-[#1A1D23]/55 border border-[rgba(156,163,175,0.12)] backdrop-blur-[24px] p-6 rounded flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-silver-structure tracking-[0.18em] uppercase mb-2">
              // LICENSED_TRAINERS
            </div>
            <div className="text-4xl font-extrabold text-copper font-mono">
              {loading ? "..." : (data?.trainersCount ?? 0).toLocaleString()}
            </div>
            <p className="text-[14px] text-bone-light/85 mt-2 font-sans">
              Professionals credentials and coaching certifications validated.
            </p>
          </div>
          <div className="font-mono text-[10px] text-copper/80 mt-4">
            [ REGISTRY: VERIFIED ]
          </div>
        </div>

        {/* Card 3: Clubs Overview */}
        <div className="bg-[#1A1D23]/55 border border-[rgba(156,163,175,0.12)] backdrop-blur-[24px] p-6 rounded flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-silver-structure tracking-[0.18em] uppercase mb-2">
              // REGISTERED_ACADEMIES
            </div>
            <div className="text-4xl font-extrabold text-gold-raw font-mono">
              {loading ? "..." : (data?.clubsCount ?? 0).toLocaleString()}
            </div>
            <p className="text-[14px] text-bone-light/85 mt-2 font-sans">
              Affiliated sports entities active in the sovereign grid.
            </p>
          </div>
          <div className="font-mono text-[10px] text-gold-raw/80 mt-4">
            [ MULTI_TENANT: ACTIVE ]
          </div>
        </div>
      </div>

      {/* Audit Logs Sub-panel */}
      {!loading && data?.recentAuditLogs && data.recentAuditLogs.length > 0 && (
        <div className="my-4 bg-[#121418]/60 border border-silver-structure/10 p-5 rounded z-10">
          <div className="font-mono text-[10px] text-emerald-core tracking-[0.18em] uppercase mb-3">
            // RECENT_AUDIT_TRAIL (TENANT ONLY)
          </div>
          <div className="space-y-2">
            {data.recentAuditLogs.map((log: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center text-[12px] font-mono border-b border-white/5 pb-1.5">
                <span className="text-bone-light">{log.action}</span>
                <span className="text-silver-structure">IP: {log.ipAddress || "Unknown"}</span>
                <span className="text-silver-structure">{new Date(log.timestamp).toLocaleString()}</span>
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
