"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, FileCheck, Activity, DollarSign, ArrowUpRight } from "lucide-react";
import type { DashboardKPIMetrics } from "@/types/dashboard.types";

interface AcademyMetricsGridProps {
  metricsData?: DashboardKPIMetrics;
}

export default function AcademyMetricsGrid({ metricsData }: AcademyMetricsGridProps) {
  const data = metricsData || {
    totalAthletes: 128,
    athleteChangePct: 14.2,
    activeContracts: 142,
    totalContractValueCents: 42000000,
    telemetryStreamRatePerSec: 4800,
    mrrCents: 1840000,
    mrrChangePct: 22.4,
    systemUptimePct: 99.98,
    rlsLatencyMs: 12,
  };

  const metrics = [
    {
      title: "Active Athletes (Prisma)",
      value: `${data.totalAthletes}`,
      change: `+${data.athleteChangePct}%`,
      isPositive: true,
      icon: Users,
      accentColor: "#00FF87",
      glowColor: "0 0 20px rgba(0, 255, 135, 0.15)",
    },
    {
      title: "Active Contracts",
      value: `${data.activeContracts}`,
      change: "+8.5%",
      isPositive: true,
      icon: FileCheck,
      accentColor: "#00E5FF",
      glowColor: "0 0 20px rgba(0, 229, 255, 0.15)",
    },
    {
      title: "Telemetry Stream Rate",
      value: `${(data.telemetryStreamRatePerSec / 1000).toFixed(1)}k/s`,
      change: "+31.0%",
      isPositive: true,
      icon: Activity,
      accentColor: "#00FF87",
      glowColor: "0 0 20px rgba(0, 255, 135, 0.15)",
    },
    {
      title: "Monthly Revenue (MRR)",
      value: `$${(data.mrrCents / 100).toLocaleString()}`,
      change: `+${data.mrrChangePct}%`,
      isPositive: true,
      icon: DollarSign,
      accentColor: "#00E5FF",
      glowColor: "0 0 20px rgba(0, 229, 255, 0.15)",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="relative overflow-hidden rounded-xl backdrop-blur-xl bg-[#12141D]/75 border border-white/10 p-5 transition-all duration-300 hover:border-white/20"
            style={{ boxShadow: metric.glowColor }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#94A3B8]">{metric.title}</span>
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center border"
                style={{ backgroundColor: `${metric.accentColor}15`, borderColor: `${metric.accentColor}40` }}
              >
                <Icon className="w-4 h-4" style={{ color: metric.accentColor }} />
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="text-2xl md:text-3xl font-extrabold font-mono text-[#F8FAFC] tracking-tight">{metric.value}</h3>
              <div className={`flex items-center text-xs font-mono font-medium ${metric.isPositive ? "text-[#00FF87]" : "text-rose-400"}`}>
                <span>{metric.change}</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ backgroundColor: metric.accentColor, opacity: 0.7 }} />
          </motion.div>
        );
      })}
    </div>
  );
}
