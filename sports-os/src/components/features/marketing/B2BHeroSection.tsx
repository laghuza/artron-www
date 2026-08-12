"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, ShieldCheck, Activity, ArrowRight, Play, Cpu, Lock } from "lucide-react";
import BookDemoModal from "./BookDemoModal";

export default function B2BHeroSection() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen bg-[#090A0F] text-[#F8FAFC] overflow-hidden flex flex-col justify-between pt-24 pb-12 px-6 md:px-12">
      {/* Background Architectural Grid & Glow Orbs */}
      <div className="absolute inset-0 schematic-grid pointer-events-none opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00FF87]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#00E5FF]/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        {/* Left Column: Copy & Value Proposition */}
        <div className="lg:col-span-7 space-y-6">
          {/* Micro Badge Header */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-xl bg-[#12141D]/80 border border-[#00FF87]/30 shadow-[0_0_15px_rgba(0,255,135,0.15)]">
            <Zap className="w-3.5 h-3.5 text-[#00FF87] animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-[#00FF87] uppercase">
              NEXT-GEN SPORTS ACADEMY OS
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-mono leading-[1.1]">
            THE OPERATING SYSTEM FOR <br />
            <span className="bg-gradient-to-r from-[#00FF87] via-[#00E5FF] to-white bg-clip-text text-transparent">
              SPORTS ACADEMIES
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-[#94A3B8] font-sans max-w-2xl leading-relaxed">
            Automate multi-tenant player rosters, enterprise contract subscriptions, and live athlete biometric telemetry powered by isolated Row-Level Security (RLS).
          </p>

          {/* Call to Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00FF87] to-[#00E5FF] text-[#090A0F] font-extrabold font-mono text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,255,135,0.35)] hover:scale-[1.02] transition-transform"
            >
              Book Academy Demo <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/academy"
              className="px-8 py-4 rounded-xl backdrop-blur-xl bg-[#12141D]/70 border border-white/15 text-white font-bold font-mono text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:border-[#00E5FF]/40 hover:bg-white/5 transition-all"
            >
              <Play className="w-4 h-4 text-[#00E5FF] fill-[#00E5FF]" /> Explore Live Console
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs font-mono text-[#94A3B8]">
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#00FF87]" /> RLS Isolated Multi-Tenancy
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Lock className="w-4 h-4 text-[#00E5FF]" /> AES-256 PII Encrypted
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Cpu className="w-4 h-4 text-[#00FF87]" /> Real-time IoT Edge Streaming
            </span>
          </div>
        </div>

        {/* Right Column: Interactive 3D/HUD Visual Canvas Preview */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl backdrop-blur-2xl bg-[#12141D]/75 border border-[#00FF87]/30 p-6 shadow-[0_0_35px_rgba(0,255,135,0.15)] space-y-5">
            {/* Header Status Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00FF87] animate-ping" />
                <span className="text-xs font-mono font-bold text-white">HUD TELEMETRY NODE #01</span>
              </div>
              <span className="text-[10px] font-mono text-[#00E5FF] px-2 py-0.5 rounded bg-[#00E5FF]/10 border border-[#00E5FF]/30">
                128 ATHLETES ONLINE
              </span>
            </div>

            {/* Simulated Live Radar Grid */}
            <div className="relative h-44 w-full rounded-xl bg-black/60 border border-white/10 p-4 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">BIOMETRIC STRESS</span>
                <span className="text-[#00FF87] font-bold">OPTIMAL (24%)</span>
              </div>

              {/* Live Signal Pulse */}
              <div className="relative h-16 w-full flex items-center justify-center">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF87] to-transparent" />
                <div className="absolute w-20 h-20 rounded-full border border-[#00FF87]/40 animate-ping" />
                <Activity className="absolute w-8 h-8 text-[#00FF87]" />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>LATENCY: 12ms</span>
                <span>SECURITY: RLS VERIFIED</span>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                <span className="text-slate-400 text-[10px]">MONTHLY REVENUE</span>
                <p className="text-lg font-bold text-white mt-1">$18,400</p>
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                <span className="text-slate-400 text-[10px]">ACTIVE CONTRACTS</span>
                <p className="text-lg font-bold text-[#00E5FF] mt-1">142 Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Demo Modal */}
      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </section>
  );
}
