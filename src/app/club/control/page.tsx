"use client";

import { useEffect, useState } from "react";
import { getClubDashboardData } from "@/app/actions/dashboard";
import { TelemetryDashboardLayout } from "@/components/layout/TelemetryDashboardLayout";
import { TelemetryMetricCard } from "@/components/ui/TelemetryMetricCard";

export default function ClubControlPanel() {
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
    <TelemetryDashboardLayout
      nodeBadge="[ SPORTS_CLUB_MANAGEMENT_NODE ]"
      title="Club Control Panel"
    >
      {/* Main Grid content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <TelemetryMetricCard
          tag="// CLUB_ROSTER"
          value={loading ? "..." : data?.athletesCount ?? 0}
          description="Sports practitioners and club members registered."
          status="[ STATUS: SYNCHRONIZED ]"
          theme="emerald"
        />

        <TelemetryMetricCard
          tag="// TRAINING_PROGRAMS"
          value={loading ? "..." : data?.programsCount ?? 0}
          description="Active sports programs and training paths running."
          status="[ SCHEDULES: LIVE ]"
          theme="copper"
        />

        <TelemetryMetricCard
          tag="// HUB_NODE_SECURITY"
          value={loading ? "..." : data?.securityStatus ? "SECURE" : "IDLE"}
          description="Access permissions and Row-Level Security (RLS) policies verified."
          status="[ RLS STATUS: ACTIVE_OK ]"
          theme="gold"
        />
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
    </TelemetryDashboardLayout>
  );
}
