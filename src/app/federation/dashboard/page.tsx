"use client";

import { useEffect, useState } from "react";
import { getFederationDashboardData } from "@/app/actions/dashboard";
import { TelemetryDashboardLayout } from "@/components/layout/TelemetryDashboardLayout";
import { TelemetryMetricCard } from "@/components/ui/TelemetryMetricCard";

export default function FederationDashboard() {
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
    <TelemetryDashboardLayout
      nodeBadge="[ SOVEREIGN_FEDERATION_INTEGRATION_NODE ]"
      title="Federation Central Command"
    >
      {/* Main Grid content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <TelemetryMetricCard
          tag="// ATHLETE_DIRECTORY"
          value={loading ? "..." : (data?.athletesCount ?? 0).toLocaleString()}
          description="Active sports practitioners registry database verified."
          status="[ DATA_SYNC: SECURE_SYNC_OK ]"
          theme="emerald"
        />

        <TelemetryMetricCard
          tag="// LICENSED_TRAINERS"
          value={loading ? "..." : (data?.trainersCount ?? 0).toLocaleString()}
          description="Professionals credentials and coaching certifications validated."
          status="[ REGISTRY: VERIFIED ]"
          theme="copper"
        />

        <TelemetryMetricCard
          tag="// REGISTERED_ACADEMIES"
          value={loading ? "..." : (data?.clubsCount ?? 0).toLocaleString()}
          description="Affiliated sports entities active in the sovereign grid."
          status="[ MULTI_TENANT: ACTIVE ]"
          theme="gold"
        />
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
    </TelemetryDashboardLayout>
  );
}
