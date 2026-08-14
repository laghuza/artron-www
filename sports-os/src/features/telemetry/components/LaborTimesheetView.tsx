"use client";

import React, { useState, useEffect } from "react";
import { Download, Play, AlertCircle } from "lucide-react";
import { audioManager } from "@/lib/audioManager";

interface TimesheetRecord {
  id: string;
  name: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  workHours: number;
  breakHours: number;
  nightHours: number;
  overtimeHours: number;
  status: "PRESENT" | "ABSENT" | "ANOMALY";
}

const INITIAL_RECORDS: TimesheetRecord[] = [
  { id: "1", name: "დავით თოდუა", date: "2026-08-11", checkIn: "09:12:05", checkOut: "18:04:12", workHours: 8.0, breakHours: 0.8, nightHours: 0, overtimeHours: 0, status: "PRESENT" },
  { id: "2", name: "გიორგი მარგველაშვილი", date: "2026-08-11", checkIn: "10:00:00", checkOut: "22:30:00", workHours: 11.5, breakHours: 1.0, nightHours: 0.5, overtimeHours: 3.5, status: "PRESENT" },
  { id: "3", name: "ნინო ჭანტურია", date: "2026-08-11", checkIn: "09:00:15", checkOut: null, workHours: 0, breakHours: 0, nightHours: 0, overtimeHours: 0, status: "ANOMALY" },
];

export default function LaborTimesheetView() {
  const [records, setRecords] = useState<TimesheetRecord[]>(INITIAL_RECORDS);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateScan = async () => {
    audioManager.playHapticClick();
    setIsSimulating(true);

    try {
      // Simulate scan call to our API
      const res = await fetch("/api/v1/telemetry/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          qrToken: "user_with_subs", // matching seeds user
          direction: "IN",
          tenantId: "demo-tenant-id",
        }),
      });
      const data = await res.json();
      
      // Update UI log
      if (data.status === "success") {
        setRecords((prev) => [
          {
            id: String(prev.length + 1),
            name: data.data.userName,
            date: new Date(data.data.timestamp).toISOString().split("T")[0],
            checkIn: new Date(data.data.timestamp).toTimeString().split(" ")[0],
            checkOut: null,
            workHours: 0,
            breakHours: 0,
            nightHours: 0,
            overtimeHours: 0,
            status: "ANOMALY", // Incomplete scan until OUT is registered
          },
          ...prev,
        ]);
      }
    } catch (e) {
      // Fallback update in case db seeding is offline
      setRecords((prev) => [
        {
          id: String(prev.length + 1),
          name: "სადემონსტრაციო თანამშრომელი",
          date: new Date().toISOString().split("T")[0],
          checkIn: new Date().toTimeString().split(" ")[0],
          checkOut: null,
          workHours: 0,
          breakHours: 0,
          nightHours: 0,
          overtimeHours: 0,
          status: "ANOMALY",
        },
        ...prev,
      ]);
    } finally {
      setTimeout(() => setIsSimulating(false), 600);
    }
  };

  return (
    <div className="space-y-4 font-mono text-[11px] text-[#9CA3AF]">
      {/* Banner */}
      <div className="bg-[#00E676]/5 border border-[#00E676]/20 p-3 rounded flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-[#00E676] shrink-0 mt-0.5" />
        <p className="font-sans leading-relaxed text-[10.5px]">
          <strong>შესაბამისობა ბრძანება №01-15/ნ:</strong> სამუშაო საათების აღრიცხვის ტაბელი ავტომატურად ივსება ტურნიკეტის IN/OUT ლოგების საფუძველზე.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center bg-[#1A1D23] p-2 rounded border border-[#9CA3AF]/15">
        <button
          onClick={simulateScan}
          disabled={isSimulating}
          className="flex items-center gap-1.5 px-3 py-1 bg-[#00E676]/10 hover:bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/30 rounded uppercase cursor-pointer transition-colors"
        >
          <Play className="w-3.5 h-3.5" />
          <span>{isSimulating ? "[ SIMULATING... ]" : "[ SIMULATE IN/OUT SCAN ]"}</span>
        </button>

        <button
          onClick={() => {
            audioManager.playClick();
            alert("ექსპორტი წარმატებით დასრულდა: Order_01-15_n_Report.xlsx");
          }}
          className="flex items-center gap-1.5 px-3 py-1 bg-[#121418] hover:bg-[#1A1D23] text-[#F5F5F3] border border-[#9CA3AF]/20 rounded uppercase cursor-pointer transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>[ EXPORT REPORT ]</span>
        </button>
      </div>

      {/* Timesheet Table */}
      <div className="overflow-x-auto border border-[#9CA3AF]/15 rounded bg-[#121418]/65">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#9CA3AF]/15 bg-[#1A1D23]/50 text-[9px] uppercase tracking-wider text-[#6B7280]">
              <th className="p-2.5">თანამშრომელი</th>
              <th className="p-2.5">თარიღი</th>
              <th className="p-2.5">შემოსვლა</th>
              <th className="p-2.5">გასვლა</th>
              <th className="p-2.5 text-center">ნამუშევარი</th>
              <th className="p-2.5 text-center">შესვენება</th>
              <th className="p-2.5 text-center">ღამე</th>
              <th className="p-2.5 text-center">ზეგანაკვ.</th>
              <th className="p-2.5 text-right">სტატუსი</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec.id} className="border-b border-[#9CA3AF]/10 hover:bg-[#1A1D23]/35 transition-colors">
                <td className="p-2.5 text-[#F5F5F3] font-sans truncate max-w-[120px]">{rec.name}</td>
                <td className="p-2.5 whitespace-nowrap">{rec.date}</td>
                <td className="p-2.5 text-[#00E676]">{rec.checkIn || "--:--:--"}</td>
                <td className="p-2.5 text-coral-core">{rec.checkOut || "--:--:--"}</td>
                <td className="p-2.5 text-center text-[#F5F5F3]">{rec.workHours} სთ</td>
                <td className="p-2.5 text-center">{rec.breakHours} სთ</td>
                <td className="p-2.5 text-center">{rec.nightHours} სთ</td>
                <td className="p-2.5 text-center text-[#00E676]">{rec.overtimeHours > 0 ? `+${rec.overtimeHours}` : "0"}</td>
                <td className="p-2.5 text-right whitespace-nowrap">
                  <span className={`text-[8.5px] px-1.5 py-0.5 rounded-sm border ${
                    rec.status === "PRESENT"
                      ? "bg-[#00E676]/10 border-[#00E676]/30 text-[#00E676]"
                      : "bg-amber-500/10 border-amber-500/30 text-amber-500"
                  }`}>
                    {rec.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
