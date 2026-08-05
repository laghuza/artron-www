"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/context/I18nContext";

export default function LiveTelemetryFeed() {
  const { t } = useI18n();
  const [latency, setLatency] = useState(12);
  const [scanId, setScanId] = useState("A-90421");
  const [cpu, setCpu] = useState(24);
  const [blockHeight, setBlockHeight] = useState(894121);
  const [nodeStatus, setNodeStatus] = useState("SYNC_OK");

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate active telemetric updates
      setLatency(Math.floor(Math.random() * 7) + 9); // oscillates 9ms-15ms
      setCpu(Math.floor(Math.random() * 12) + 20); // oscillates 20%-31%
      
      if (Math.random() > 0.6) {
        const randomIds = ["A-90421", "A-12845", "A-38501", "A-77491", "A-04921", "A-55912"];
        setScanId(randomIds[Math.floor(Math.random() * randomIds.length)]);
      }

      if (Math.random() > 0.8) {
        setBlockHeight((prev) => prev + 1);
      }

      if (Math.random() > 0.95) {
        setNodeStatus(Math.random() > 0.5 ? "ACTIVE" : "SYNC_OK");
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const feedContent = (
    <span className="flex items-center gap-4 text-silver-structure/45 font-mono text-[9px] uppercase tracking-[0.15em] shrink-0">
      <span>[ TBS_NODE_01: <span className="text-emerald-core/60">{nodeStatus}</span> ]</span>
      <span>·</span>
      <span>[ ATHLETE_SCAN: <span className="text-emerald-core/60">{scanId}</span> ]</span>
      <span>·</span>
      <span>[ {t("system.secure_tunnel") || "SECURE_TUNNEL"}: <span className="text-emerald-core/60">{t("system.established") || "ESTABLISHED"}</span> ]</span>
      <span>·</span>
      <span>[ {t("system.db_pool") || "DB_POOL"}: <span className="text-emerald-core/60">{t("system.active") || "ACTIVE"}</span> ]</span>
      <span>·</span>
      <span>[ {t("system.ping") || "PING"} / {t("system.latency") || "LATENCY"}: <span className="text-emerald-core/60">{latency}ms</span> ]</span>
      <span>·</span>
      <span>[ {t("system.cpu_load") || "CPU_LOAD"}: <span className="text-emerald-core/60">{cpu}%</span> ]</span>
      <span>·</span>
      <span>[ {t("system.block") || "BLOCK"}: <span className="text-emerald-core/60">{blockHeight}</span> ]</span>
      <span className="mr-4">·</span>
    </span>
  );

  return (
    <div className="w-full overflow-hidden relative select-none flex py-1">
      <div className="flex animate-telemetry-marquee whitespace-nowrap">
        {feedContent}
        {feedContent}
      </div>
    </div>
  );
}
