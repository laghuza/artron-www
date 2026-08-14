"use client";

import { Zap, Shield, Gem, ArrowLeft } from "lucide-react";
import { audioManager } from "@/lib/audioManager";
import { CrmSubItem, Node01CrmData } from "@/types/node-content";
import { useI18n } from "@/context/I18nContext";

interface Node01CrmStageCardProps {
  item: CrmSubItem;
  onClose: () => void;
}

export default function Node01CrmStageCard({ item, onClose }: Node01CrmStageCardProps) {
  const { t } = useI18n();
  const crmData = (typeof t("node_01_crm") === "object" ? t("node_01_crm") : null) as Node01CrmData | null;

  const handleClose = () => {
    audioManager.playClick();
    onClose();
  };

  const cleanLabel = item.label.replace(/^\d+\.\s*/, "");

  return (
    <div className="w-full max-w-xl bg-[#1A1D23]/90 border border-[#9CA3AF]/18 backdrop-blur-[12px] p-5 rounded-md shadow-[0_0_8px_rgba(0,255,135,0.12)] animate-fadeIn font-sans text-left relative z-40 space-y-4 mx-auto">
      {/* HUD Corner Brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#00ff87] rounded-tl-sm pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#00ff87] rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#00ff87] rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#00ff87] rounded-br-sm pointer-events-none" />

      {/* Top Header Bar */}
      <div className="flex justify-between items-start border-b border-[#9CA3AF]/18 pb-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#00ff87] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
            [ SYS_CRM_TELEMETRY // VERIFIED ]
          </div>
          <h2 className="text-base font-medium text-[#F5F5F3] tracking-tight mt-1 leading-snug">
            {cleanLabel}
          </h2>
        </div>
        <button
          onClick={handleClose}
          className="font-mono text-[10px] text-[#00ff87] hover:text-[#F5F5F3] border border-[#00ff87]/30 hover:border-[#00ff87] px-3 py-1.5 rounded-sm transition-colors cursor-pointer bg-[#00ff87]/5 flex items-center gap-1.5 group shrink-0 uppercase tracking-widest"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#00ff87] group-hover:-translate-x-0.5 transition-transform" />
          <span>{crmData?.back_button || "[ RESET ]"}</span>
        </button>
      </div>

      {/* 3-Part Detailed Technical Container */}
      <div className="space-y-3 text-[13px]">
        {/* 1. Functional Description */}
        <div className="bg-[#121418] border border-[#9CA3AF]/18 p-3.5 rounded-sm space-y-1 relative">
          <div className="font-mono text-[10px] text-[#00ff87] font-medium uppercase tracking-[0.16em] flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-[#00ff87]" />
            <span>{crmData?.section_functional || "FUNCTIONAL DESCRIPTION"}</span>
          </div>
          <p className="text-[#9CA3AF] leading-relaxed font-sans text-[12.5px] pl-5">
            {item.functional_desc}
          </p>
        </div>

        {/* 2. Permissions and Governance */}
        <div className="bg-[#121418] border border-[#9CA3AF]/18 p-3.5 rounded-sm space-y-1 relative">
          <div className="font-mono text-[10px] text-[#00ff87] font-medium uppercase tracking-[0.16em] flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#00ff87]" />
            <span>{crmData?.section_permissions || "PERMISSIONS & GOVERNANCE"}</span>
          </div>
          <p className="text-[#9CA3AF] leading-relaxed font-sans text-[12.5px] pl-5">
            {item.permissions}
          </p>
        </div>

        {/* 3. Business Value */}
        <div className="bg-[#121418] border border-[#00ff87]/30 p-3.5 rounded-sm space-y-1 relative">
          <div className="font-mono text-[10px] text-[#00ff87] font-medium uppercase tracking-[0.16em] flex items-center gap-2">
            <Gem className="w-3.5 h-3.5 text-[#00ff87]" />
            <span>{crmData?.section_business || "BUSINESS VALUE"}</span>
          </div>
          <p className="text-[#F5F5F3] font-medium leading-relaxed font-sans text-[12.5px] pl-5">
            {item.business_value}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-between items-center pt-2 border-t border-[#9CA3AF]/18 font-mono text-[9.5px] text-[#6B7280]">
        <span>[ AES_256_PII_ENCRYPTED // MULTI_TENANT_SECURE ]</span>
        <span className="text-[#00ff87] font-medium tracking-wider">
          {crmData?.status_validated || "STATUS: COMPLIANCE_VALIDATED ●"}
        </span>
      </div>
    </div>
  );
}
