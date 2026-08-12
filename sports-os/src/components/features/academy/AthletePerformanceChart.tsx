"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Cpu, RefreshCw, Zap } from "lucide-react";
import type { EnneaCoreTelemetryPayload } from "@/types/dashboard.types";

interface TelemetryPoint {
  time: string;
  speed: number;
  endurance: number;
  stress: number;
}

const SAMPLE_TELEMETRY: TelemetryPoint[] = [
  { time: "09:00", speed: 65, endurance: 80, stress: 24 },
  { time: "09:15", speed: 72, endurance: 82, stress: 30 },
  { time: "09:30", speed: 88, endurance: 75, stress: 45 },
  { time: "09:45", speed: 94, endurance: 70, stress: 62 },
  { time: "10:00", speed: 82, endurance: 85, stress: 40 },
  { time: "10:15", speed: 91, endurance: 88, stress: 35 },
  { time: "10:30", speed: 96, endurance: 92, stress: 28 },
];

export default function AthletePerformanceChart() {
  const [selectedMetric, setSelectedMetric] = useState<"speed" | "endurance" | "stress">("speed");

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case "speed": return "#00FF87";
      case "endurance": return "#00E5FF";
      case "stress": return "#EF4444";
      default: return "#00FF87";
    }
  };

  const currentColor = getMetricColor(selectedMetric);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full rounded-2xl backdrop-blur-2xl bg-[#12141D]/75 border border-white/10 p-6 shadow-[0_0_25px_rgba(0,255,135,0.08)]"
    >
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#00FF87]" />
            <h2 className="text-lg font-extrabold font-mono text-[#F8FAFC]">EnneaCore Telemetry Analytics</h2>
          </div>
          <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
            Real-time Biometric & Performance Output (BiometricTelemetryStream Model)
          </p>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex items-center gap-2 p-1 rounded-lg bg-black/50 border border-white/10">
          {(["speed", "endurance", "stress"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMetric(m)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono capitalize transition-all duration-200 ${
                selectedMetric === m
                  ? "bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]/50 shadow-[0_0_10px_rgba(0,255,135,0.25)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Telemetry Visualization with Motion */}
      <div className="relative h-64 w-full mt-6 flex items-end justify-between px-2">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
          <div className="border-b border-dashed border-slate-500 w-full" />
          <div className="border-b border-dashed border-slate-500 w-full" />
          <div className="border-b border-dashed border-slate-500 w-full" />
          <div className="border-b border-dashed border-slate-500 w-full" />
        </div>

        <svg className="absolute inset-0 h-full w-full overflow-visible pointer-events-none">
          <motion.polyline
            key={selectedMetric}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            fill="none"
            stroke={currentColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={SAMPLE_TELEMETRY.map((p, i) => {
              const x = (i / (SAMPLE_TELEMETRY.length - 1)) * 100;
              const val = p[selectedMetric];
              const y = 100 - val;
              return `${x}%,${y}%`;
            }).join(" ")}
          />
        </svg>

        {/* Telemetry Data Points */}
        {SAMPLE_TELEMETRY.map((point) => {
          const val = point[selectedMetric];
          return (
            <div key={point.time} className="relative z-10 flex flex-col items-center group">
              <motion.div 
                whileHover={{ scale: 1.6 }}
                className="w-3.5 h-3.5 rounded-full border-2 border-[#090A0F] shadow-lg cursor-pointer"
                style={{ backgroundColor: currentColor, boxShadow: `0 0 12px ${currentColor}` }}
              />
              <span className="text-[10px] font-mono text-slate-400 mt-2">{point.time}</span>
              <span className="text-[11px] font-mono font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 px-1.5 py-0.5 rounded bg-black/90 border border-white/20">
                {val}%
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer Diagnostic Bar */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#94A3B8]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#00FF87]">
            <Cpu className="w-4 h-4" /> AI Telemetry Stream Engine
          </span>
          <span className="flex items-center gap-1.5 text-[#00E5FF]">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Edge IoT Streaming (12ms)
          </span>
        </div>
        <span className="hidden sm:inline text-slate-500">COPPA & AES-256 Encrypted</span>
      </div>
    </motion.div>
  );
}
