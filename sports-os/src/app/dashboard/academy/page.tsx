"use client";

import React from "react";
import { motion } from "framer-motion";
import AcademyGlassSidebar from "@/components/layout/AcademyGlassSidebar";
import AcademyMetricsGrid from "@/components/features/academy/AcademyMetricsGrid";
import AthletePerformanceChart from "@/components/features/academy/AthletePerformanceChart";
import AthleteRosterTable from "@/components/features/academy/AthleteRosterTable";
import TelemetryLiveWidget from "@/components/features/telemetry/TelemetryLiveWidget";
import { Plus, Download, ShieldCheck, Zap } from "lucide-react";
import type { TypedAthleteRosterItem } from "@/types/dashboard.types";

const MOCK_PRISMA_ROSTER: TypedAthleteRosterItem[] = [
  {
    profile: {
      id: "ath-8801-fcd",
      tenantId: "t-fc-dynamo-01",
      userId: "u-01",
      parentUserId: "u-parent-01",
      groupId: "g-u17-foot",
      firstName: "Luka",
      lastName: "Beridze",
      dateOfBirth: new Date("2008-04-12"),
      gender: "MALE",
      rfidTagId: "RFID-9901-X",
      isMinor: true,
      coppaConsentGranted: true,
      coppaConsentDate: new Date(),
      piiEncrypted: "AES-256-ENC-KEY",
      emergencyContactPii: "AES-256-EMERGENCY",
      isSoftDeleted: false,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    enneaCoreScore: 94,
    activeContract: {
      id: "c-01",
      tenantId: "t-fc-dynamo-01",
      athleteId: "ath-8801-fcd",
      coachProfileId: null,
      contractType: "ATHLETE",
      status: "ACTIVE",
      startDate: new Date(),
      endDate: null,
      amountCents: 45000,
      currency: "GEL",
      documentUrl: null,
      notes: "Pro Youth Contract",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  {
    profile: {
      id: "ath-8802-fcd",
      tenantId: "t-fc-dynamo-01",
      userId: "u-02",
      parentUserId: "u-parent-02",
      groupId: "g-u16-basket",
      firstName: "Giorgi",
      lastName: "Kapanadze",
      dateOfBirth: new Date("2009-08-22"),
      gender: "MALE",
      rfidTagId: "RFID-9902-[#]",
      isMinor: true,
      coppaConsentGranted: true,
      coppaConsentDate: new Date(),
      piiEncrypted: "AES-256-ENC-KEY",
      emergencyContactPii: "AES-256-EMERGENCY",
      isSoftDeleted: false,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    enneaCoreScore: 91,
  },
  {
    profile: {
      id: "ath-8803-fcd",
      tenantId: "t-fc-dynamo-01",
      userId: "u-03",
      parentUserId: "u-parent-03",
      groupId: "g-u18-tennis",
      firstName: "Nino",
      lastName: "Tskhadadze",
      dateOfBirth: new Date("2007-11-05"),
      gender: "FEMALE",
      rfidTagId: "RFID-9903-[#]",
      isMinor: false,
      coppaConsentGranted: true,
      coppaConsentDate: new Date(),
      piiEncrypted: "AES-256-ENC-KEY",
      emergencyContactPii: "AES-256-EMERGENCY",
      isSoftDeleted: false,
      deletedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    enneaCoreScore: 96,
  },
];

export default function DashboardAcademyPage() {
  return (
    <div className="min-h-screen bg-[#090A0F] text-[#F8FAFC] flex">
      {/* Glassmorphism Sidebar */}
      <AcademyGlassSidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 space-y-8">
        {/* Top Header */}
        <motion.header 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#00FF87]/15 text-[#00FF87] border border-[#00FF87]/30 uppercase flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#00FF87]" /> Enterprise Tenant
              </span>
              <span className="text-xs text-[#94A3B8] font-mono">FC Dynamo Academy Console</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1 font-mono">
              Academy Control <span className="text-[#00FF87]">Hub</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:border-[#00E5FF]/40 transition-all">
              <Download className="w-4 h-4 text-[#00E5FF]" /> Export Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00FF87] to-[#00E5FF] text-[#090A0F] font-extrabold text-xs font-mono shadow-[0_0_20px_rgba(0,255,135,0.3)] hover:opacity-95 transition-opacity">
              <Plus className="w-4 h-4" /> Register Athlete
            </button>
          </div>
        </motion.header>

        {/* Real-time KPI Metrics */}
        <section>
          <AcademyMetricsGrid />
        </section>

        {/* Real-Time IoT Telemetry Stream Widget */}
        <section>
          <TelemetryLiveWidget />
        </section>

        {/* Biometric Telemetry Stream & Performance Chart */}
        <section>
          <AthletePerformanceChart />
        </section>

        {/* Typed Prisma Roster Table */}
        <section>
          <AthleteRosterTable items={MOCK_PRISMA_ROSTER} />
        </section>
      </main>
    </div>
  );
}
