"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Heart, Zap, AlertTriangle, ShieldCheck, Gauge, Radio } from "lucide-react";
import type { TelemetryStreamPacket } from "@/server/services/telemetry.service";
import { generateTelemetryPacket } from "@/server/services/telemetry.service";

export default function TelemetryLiveWidget() {
  const [packet, setPacket] = useState<TelemetryStreamPacket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Initial fallback state
    setPacket(generateTelemetryPacket());

    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource("/api/v1/telemetry/stream?athleteId=ath-8801-fcd");

      eventSource.onopen = () => {
        setIsConnected(true);
      };

      eventSource.onmessage = (event) => {
        try {
          const data: TelemetryStreamPacket = JSON.parse(event.data);
          setPacket(data);
          setIsConnected(true);
        } catch (_) {
          // Parse fallback
        }
      };

      eventSource.onerror = () => {
        setIsConnected(false);
        if (eventSource) {
          eventSource.close();
        }
      };
    } catch (_) {
      setIsConnected(false);
    }

    // Fallback simulation timer if SSE fails or disconnects
    const fallbackTimer = setInterval(() => {
      setPacket((prev) => {
        if (!eventSource || eventSource.readyState === EventSource.CLOSED) {
          return generateTelemetryPacket();
        }
        return prev;
      });
    }, 1500);

    return () => {
      if (eventSource) {
        eventSource.close();
      }
      clearInterval(fallbackTimer);
    };
  }, []);

  if (!packet) return null;

  const { heartRate, speedKmh, accelerationG, injuryRisk, enneaCore } = packet;

  const riskBadgeColor =
    injuryRisk.riskLevel === "CRITICAL"
      ? "bg-red-500/20 text-red-400 border-red-500/40"
      : injuryRisk.riskLevel === "HIGH"
      ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
      : injuryRisk.riskLevel === "MODERATE"
      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
      : "bg-[#00FF87]/20 text-[#00FF87] border-[#00FF87]/40";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,229,255,0.05)] relative overflow-hidden"
    >
      {/* Background HUD Glow Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5FF]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF]">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold font-mono text-white tracking-wide">
                Live Biometric Telemetry <span className="text-[#00E5FF]">Stream</span>
              </h3>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono border uppercase tracking-wider flex items-center gap-1.5 ${
                  isConnected
                    ? "bg-[#00FF87]/15 text-[#00FF87] border-[#00FF87]/30"
                    : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-[#00FF87] animate-ping" : "bg-amber-400"}`} />
                {isConnected ? "SSE LIVE FEED" : "SIMULATED STREAM"}
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
              Athlete: <span className="text-white font-semibold">Luka Beridze (U17)</span> • Node: IoT-BioHub-99
            </p>
          </div>
        </div>

        {/* Injury Risk Indicator Badge */}
        <div className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-extrabold flex items-center gap-2 ${riskBadgeColor}`}>
          {injuryRisk.riskLevel === "LOW" ? (
            <ShieldCheck className="w-4 h-4 text-[#00FF87]" />
          ) : (
            <AlertTriangle className="w-4 h-4 animate-bounce" />
          )}
          <span>Injury Risk: {injuryRisk.score}% ({injuryRisk.riskLevel})</span>
        </div>
      </div>

      {/* Main Biometric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {/* Heart Rate Card */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/5 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-red-500 animate-pulse" /> Heart Rate (BPM)
            </span>
            <span className="text-[10px] text-red-400/80 font-mono">Zone 4 (Anaerobic)</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold font-mono text-white tracking-tight">{heartRate}</span>
            <span className="text-xs text-slate-400 font-mono">bpm</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00FF87] via-[#00E5FF] to-red-500"
              animate={{ width: `${Math.min((heartRate / 200) * 100, 100)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Velocity Speed Card */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/5 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#00E5FF]" /> Velocity / GPS Speed
            </span>
            <span className="text-[10px] text-[#00E5FF]/80 font-mono">GPS 10Hz</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold font-mono text-white tracking-tight">{speedKmh}</span>
            <span className="text-xs text-slate-400 font-mono">km/h</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00E5FF] to-[#00FF87]"
              animate={{ width: `${Math.min((speedKmh / 35) * 100, 100)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Acceleration G-Force Card */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/5 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span className="flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-[#00FF87]" /> Mechanical Load (G)
            </span>
            <span className="text-[10px] text-[#00FF87]/80 font-mono">Accelerometer</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold font-mono text-white tracking-tight">{accelerationG}</span>
            <span className="text-xs text-slate-400 font-mono">G-Force</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
            <motion.div
              className="h-full bg-[#00FF87]"
              animate={{ width: `${Math.min((accelerationG / 3.0) * 100, 100)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* EnneaCore 9-Node Analytics Breakdown Bar */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#00FF87]" /> EnneaCore 9-Node Telemetry Index
          </span>
          <span className="text-xs font-mono text-[#00FF87] font-bold">
            Composite Score: {enneaCore.compositeScore} / 100
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-black/30 border border-white/5 flex justify-between items-center">
            <span className="text-slate-400">Cardio Output</span>
            <span className="text-white font-bold">{enneaCore.cardioEfficiency}%</span>
          </div>
          <div className="p-2.5 rounded-lg bg-black/30 border border-white/5 flex justify-between items-center">
            <span className="text-slate-400">Velocity Index</span>
            <span className="text-white font-bold">{enneaCore.velocityOutput}%</span>
          </div>
          <div className="p-2.5 rounded-lg bg-black/30 border border-white/5 flex justify-between items-center">
            <span className="text-slate-400">Recovery Cap.</span>
            <span className="text-white font-bold">{enneaCore.recoveryCapacity}%</span>
          </div>
          <div className="p-2.5 rounded-lg bg-black/30 border border-white/5 flex justify-between items-center">
            <span className="text-slate-400">Power Peak</span>
            <span className="text-white font-bold">{enneaCore.powerPeak}%</span>
          </div>
        </div>

        {/* Warnings callout if present */}
        <AnimatePresence>
          {injuryRisk.warnings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Warning: {injuryRisk.warnings.join(" | ")} — {injuryRisk.recommendations[0]}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
