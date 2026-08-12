"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  FileText, 
  CreditCard, 
  Settings, 
  ShieldCheck, 
  ChevronRight,
  Zap,
  Building2
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Overview", href: "/dashboard/academy", icon: LayoutDashboard },
  { name: "Athletes", href: "/dashboard/academy/athletes", icon: Users, badge: "128 Active" },
  { name: "Telemetry Stream", href: "/dashboard/academy/telemetry", icon: Activity, badge: "LIVE" },
  { name: "Contracts", href: "/dashboard/academy/contracts", icon: FileText },
  { name: "SaaS Billing", href: "/dashboard/academy/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/academy/settings", icon: Settings },
];

export default function AcademyGlassSidebar() {
  const pathname = usePathname();
  const [activeTenant] = useState("FC Dynamo Academy");

  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-64 h-screen fixed left-0 top-0 z-40 flex flex-col backdrop-blur-2xl bg-[#12141D]/85 border-r border-[#00FF87]/20 text-[#F8FAFC]"
    >
      {/* Brand Header & Tenant Switcher */}
      <div className="p-5 border-b border-white/10 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-9 h-9 rounded-lg bg-[#00FF87]/15 border border-[#00FF87]/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,135,0.25)]"
          >
            <Zap className="w-5 h-5 text-[#00FF87]" />
          </motion.div>
          <div>
            <h1 className="font-extrabold tracking-tight text-lg text-white font-mono">ARTRON<span className="text-[#00FF87]">.OS</span></h1>
            <p className="text-[10px] text-[#94A3B8] tracking-widest uppercase font-mono">B2B Academy Engine</p>
          </div>
        </div>

        {/* Tenant Selector Pill */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="mt-1 flex items-center justify-between p-2.5 rounded-lg bg-black/50 border border-white/10 hover:border-[#00E5FF]/40 transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <Building2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
            <span className="text-xs font-medium text-slate-200 truncate font-mono">{activeTenant}</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </motion.div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase">
          Operator Console
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (pathname.includes('/academy') && item.href.includes('/academy') && item.name === "Overview");
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#00FF87]/15 text-[#00FF87] border border-[#00FF87]/40 shadow-[0_0_15px_rgba(0,255,135,0.15)]"
                  : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? "text-[#00FF87]" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider ${
                  item.badge === "LIVE" 
                    ? "bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 animate-pulse" 
                    : "bg-white/10 text-slate-300"
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Security & System Health Status */}
      <div className="p-4 border-t border-white/10 bg-black/40">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
          <span className="flex items-center gap-1.5 text-[#00FF87]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00FF87]" />
            RLS Isolated
          </span>
          <span className="text-[10px] text-slate-500">12ms Latency</span>
        </div>
        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
          <div className="bg-[#00FF87] h-full w-[96%] shadow-[0_0_8px_#00FF87]" />
        </div>
      </div>
    </motion.aside>
  );
}
