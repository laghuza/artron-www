"use client";

import React, { useState } from "react";
import { useI18n } from "@/context/I18nContext";
import { soundEngine } from "@/core";

export const SandboxAiRetention: React.FC = () => {
  const { t } = useI18n();
  const [campaignTriggered, setCampaignTriggered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const atRiskMembers = [
    {
      id: "mb-1",
      name: "სანდრო კობახიძე",
      lastVisit: "24 დღის წინ",
      dropRate: "-75% ვიზიტების კლება",
      risk: "HIGH",
      suggestedOffer: "15% ფასდაკლება + 1 უფასო მასაჟი",
    },
    {
      id: "mb-2",
      name: "თამარ ლომიძე",
      lastVisit: "18 დღის წინ",
      dropRate: "-60% ვიზიტების კლება",
      risk: "MEDIUM",
      suggestedOffer: "+7 დღე საჩუქრად განახლებისას",
    },
    {
      id: "mb-3",
      name: "გიორგი წიკლაური",
      lastVisit: "31 დღის წინ (ვადაგასული)",
      dropRate: "0 ვიზიტი / 1 თვე",
      risk: "HIGH",
      suggestedOffer: "Win-back სეზონური დაბრუნების პაკეტი",
    },
  ];

  const handleRunWinBack = () => {
    setIsLoading(true);
    soundEngine.playCardHover();

    setTimeout(() => {
      setIsLoading(false);
      setCampaignTriggered(true);
      soundEngine.playSystemAccess();
    }, 600);
  };

  return (
    <div className="bg-[#101318]/90 border border-white/10 rounded-xl p-5 backdrop-blur-xl space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ff87] animate-pulse" />
            <h3 className="text-[13px] font-bold text-white tracking-widest uppercase">
              {t("sandbox.ai_churn_title")}
            </h3>
          </div>
          <p className="text-[11px] text-[#9CA3AF] max-w-xl font-sans">
            {t("sandbox.ai_churn_desc")}
          </p>
        </div>

        <button
          type="button"
          disabled={isLoading}
          onClick={handleRunWinBack}
          className="px-4 py-2 rounded bg-[#00ff87] hover:bg-[#00ff87]/90 text-[#0A0B0D] font-bold text-[11px] tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,255,135,0.3)] cursor-pointer"
        >
          {isLoading ? "გაგზავნა..." : t("sandbox.btn_run_winback")}
        </button>
      </div>

      {campaignTriggered && (
        <div className="bg-[#00ff87]/15 border border-[#00ff87]/50 p-4 rounded-lg space-y-2 animate-fadeIn font-mono">
          <div className="text-[12px] font-bold text-[#00ff87]">
            {t("sandbox.winback_success")}
          </div>
          <div className="text-[10px] text-[#D1D5DB] flex flex-wrap gap-4">
            <span>• SMS მიწოდება: 100% (GoSMS Gateway)</span>
            <span>• Push შეტყობინება: 14 გაგზავნილი</span>
            <span>• მოსალოდნელი კონვერსია: 35.7%</span>
          </div>
        </div>
      )}

      {/* At-Risk Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px] font-mono">
          <thead>
            <tr className="border-b border-white/10 text-[#9CA3AF] text-[10px] uppercase">
              <th className="pb-2">წევრი</th>
              <th className="pb-2">ბოლო ვიზიტი</th>
              <th className="pb-2 hidden sm:table-cell">ქცევითი ანომალია</th>
              <th className="pb-2 hidden md:table-cell">AI შეთავაზება</th>
              <th className="pb-2 text-right">რისკის დონე</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {atRiskMembers.map((mb) => (
              <tr key={mb.id} className="hover:bg-white/5 transition-colors">
                <td className="py-3 font-bold text-white">{mb.name}</td>
                <td className="py-3 text-[#9CA3AF]">{mb.lastVisit}</td>
                <td className="py-3 text-[#FF5252] hidden sm:table-cell">{mb.dropRate}</td>
                <td className="py-3 text-[#D1D5DB] hidden md:table-cell">{mb.suggestedOffer}</td>
                <td className="py-3 text-right">
                  {mb.risk === "HIGH" ? (
                    <span className="px-2 py-0.5 rounded bg-[#FF5252]/15 text-[#FF5252] border border-[#FF5252]/30 text-[9px] font-bold">
                      {t("sandbox.risk_high")}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-[9px] font-bold">
                      {t("sandbox.risk_medium")}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
