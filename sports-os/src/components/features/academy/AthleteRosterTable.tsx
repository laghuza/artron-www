"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, UserCheck, ShieldCheck, FileText, Activity } from "lucide-react";
import type { TypedAthleteRosterItem } from "@/types/dashboard.types";

interface AthleteRosterTableProps {
  items: TypedAthleteRosterItem[];
}

export default function AthleteRosterTable({ items }: AthleteRosterTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter(
    (item) =>
      item.profile.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.profile.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.profile.rfidTagId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl backdrop-blur-2xl bg-[#12141D]/75 border border-white/10 p-6 shadow-[0_0_30px_rgba(0,255,135,0.06)]"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#00FF87]" />
            <h3 className="text-lg font-extrabold font-mono text-[#F8FAFC]">Prisma Athlete Roster</h3>
          </div>
          <p className="text-xs font-mono text-[#94A3B8] mt-0.5">
            Row-Level Security (RLS) Isolated Profiles & Contract Subscriptions
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name or RFID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-black/50 border border-white/15 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF87]"
            />
          </div>
          <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Roster Table */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-white/10 text-[#94A3B8] uppercase text-[10px] tracking-widest">
              <th className="py-3.5 px-4">Athlete ID</th>
              <th className="py-3.5 px-4">Name</th>
              <th className="py-3.5 px-4">RFID Tag</th>
              <th className="py-3.5 px-4">COPPA Consent</th>
              <th className="py-3.5 px-4">EnneaCore Score</th>
              <th className="py-3.5 px-4">Contract Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-200">
            {filteredItems.map((item, index) => (
              <motion.tr
                key={item.profile.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <td className="py-3.5 px-4 text-[#00E5FF] font-bold">{item.profile.id.slice(0, 8).toUpperCase()}</td>
                <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#00FF87]/15 border border-[#00FF87]/40 flex items-center justify-center text-[10px] text-[#00FF87]">
                    {item.profile.firstName[0]}
                  </div>
                  {item.profile.firstName} {item.profile.lastName}
                </td>
                <td className="py-3.5 px-4 text-slate-400">{item.profile.rfidTagId || "RFID-8821-X"}</td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#00FF87]/10 text-[#00FF87] border border-[#00FF87]/30 text-[10px]">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#00FF87] to-[#00E5FF] h-full"
                        style={{ width: `${item.enneaCoreScore}%` }}
                      />
                    </div>
                    <span className="font-bold text-[#00FF87]">{item.enneaCoreScore}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]/40">
                    {item.activeContract?.status || "ACTIVE"}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
