"use client";

import React, { useState } from "react";
import { useI18n } from "@/context/I18nContext";
import { soundEngine } from "@/core";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  clockIn: string;
  hoursWorked: string;
  compliance: "OK" | "WARNING";
}

export const SandboxLaborTimesheet: React.FC = () => {
  const { t } = useI18n();
  const [staffList, setStaffList] = useState<StaffMember[]>([
    {
      id: "st-1",
      name: "გიორგი ბერიძე",
      role: "მთავარი ადმინისტრატორი",
      clockIn: "08:00:14",
      hoursWorked: "6 სთ 42 წთ",
      compliance: "OK",
    },
    {
      id: "st-2",
      name: "ნინო აბაშიძე",
      role: "ფიტნეს ინსტრუქტორი",
      clockIn: "09:30:22",
      hoursWorked: "5 სთ 12 წთ",
      compliance: "OK",
    },
    {
      id: "st-3",
      name: "დავით გელაშვილი",
      role: "მორიგე ექიმი / რეაბილიტოლოგი",
      clockIn: "10:00:00",
      hoursWorked: "4 სთ 42 წთ",
      compliance: "OK",
    },
    {
      id: "st-4",
      name: "სალომე ჯაფარიძე",
      role: "რესეფშენის ოპერატორი",
      clockIn: "12:00:05",
      hoursWorked: "2 სთ 42 წთ",
      compliance: "OK",
    },
  ]);

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleClockInNew = () => {
    soundEngine.playSystemAccess();
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    const newStaff: StaffMember = {
      id: `st-${Date.now()}`,
      name: "ალექსანდრე მიქაძე",
      role: "პერსონალური მწვრთნელი",
      clockIn: timeStr,
      hoursWorked: "0 სთ 01 წთ",
      compliance: "OK",
    };

    setStaffList((prev) => [newStaff, ...prev]);
    setToastMsg("✓ ახალი თანამშრომელი წარმატებით დარეგისტრირდა ტაბელში №01-15/ნ!");
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleExportExcel = () => {
    soundEngine.playPulseNode();
    setToastMsg("📥 Excel ტაბელის ექსპორტი (ბრძანება №01-15/ნ) დაგენერირდა წარმატებით!");
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="bg-[#101318]/90 border border-white/10 rounded-xl p-5 backdrop-blur-xl space-y-5 animate-fadeIn">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ff87] animate-pulse" />
            <h3 className="text-[13px] font-bold text-white tracking-widest uppercase">
              {t("sandbox.staff_timesheet_title")}
            </h3>
          </div>
          <span className="text-[10px] text-[#00ff87] font-bold tracking-wider uppercase bg-[#00ff87]/10 px-2 py-0.5 rounded border border-[#00ff87]/30">
            {t("sandbox.labor_law_badge")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClockInNew}
            className="px-3 py-1.5 rounded bg-[#00ff87]/10 hover:bg-[#00ff87] text-[#00ff87] hover:text-[#0A0B0D] border border-[#00ff87]/30 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer"
          >
            {t("sandbox.btn_clock_in")}
          </button>
          <button
            type="button"
            onClick={handleExportExcel}
            className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-[#D1D5DB] border border-white/10 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer"
          >
            📊 Excel
          </button>
        </div>
      </div>

      {toastMsg && (
        <div className="bg-[#00ff87]/10 border border-[#00ff87]/40 text-[#00ff87] text-[11px] font-mono px-3 py-2 rounded animate-pulse">
          {toastMsg}
        </div>
      )}

      {/* Staff Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px] font-mono">
          <thead>
            <tr className="border-b border-white/10 text-[#9CA3AF] text-[10px] uppercase">
              <th className="pb-2">{t("sandbox.col_staff_name")}</th>
              <th className="pb-2">{t("sandbox.col_role")}</th>
              <th className="pb-2 hidden sm:table-cell">{t("sandbox.col_shift_start")}</th>
              <th className="pb-2">{t("sandbox.col_hours_worked")}</th>
              <th className="pb-2 text-right">{t("sandbox.col_compliance")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {staffList.map((st) => (
              <tr key={st.id} className="hover:bg-white/5 transition-colors">
                <td className="py-3 font-bold text-white">{st.name}</td>
                <td className="py-3 text-[#D1D5DB]">{st.role}</td>
                <td className="py-3 text-[#9CA3AF] hidden sm:table-cell">{st.clockIn}</td>
                <td className="py-3 text-[#00B0FF] font-bold">{st.hoursWorked}</td>
                <td className="py-3 text-right">
                  <span className="px-2 py-0.5 rounded bg-[#00ff87]/15 text-[#00ff87] border border-[#00ff87]/30 text-[9px] font-bold">
                    ✓ №01-15/ნ
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
