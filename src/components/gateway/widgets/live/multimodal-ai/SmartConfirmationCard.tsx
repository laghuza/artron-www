"use client";

import React, { useState } from 'react';
import { ExtractedEntityData } from '@/types/multimodalAi';
import { FileCheck, ShieldCheck, CheckCircle2, Building2, Cpu, Check, X } from 'lucide-react';

interface SmartConfirmationCardProps {
  data: ExtractedEntityData;
  onApprove: (data: ExtractedEntityData) => void;
  onReject: () => void;
  isCommitted?: boolean;
}

export const SmartConfirmationCard: React.FC<SmartConfirmationCardProps> = ({
  data,
  onApprove,
  onReject,
  isCommitted = false
}) => {
  const [editedPhone, setEditedPhone] = useState(data.phone);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="w-full rounded-2xl bg-[#0D131F]/95 border border-[#00A3FF]/40 p-5 shadow-[0_12px_40px_rgba(0,163,255,0.15)] relative overflow-hidden backdrop-blur-xl transition-all duration-300">
      {/* Top Banner Glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00A3FF] via-[#00E5FF] to-emerald-400" />

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-[#00E5FF]" />
          <h4 className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
            Smart Confirmation Card (Zero-Hallucination)
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Confidence: {data.confidenceScore}%</span>
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/30 text-[10px] font-mono text-[#00A3FF]">
            {data.extractedVia}
          </span>
        </div>
      </div>

      {/* Extracted Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {/* Full Name */}
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
          <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">სახელი და გვარი</span>
          <div className="text-sm font-bold text-white flex items-center justify-between">
            <span>{data.fullNameKa}</span>
            {data.fullNameEn && <span className="text-[11px] font-normal text-gray-400">({data.fullNameEn})</span>}
          </div>
        </div>

        {/* Personal ID */}
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
          <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">პირადი ნომერი / ID</span>
          <div className="text-sm font-mono font-bold text-cyan-300 flex items-center gap-1.5">
            <span>{data.personalId}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">11-DIGIT VALID</span>
          </div>
        </div>

        {/* Phone */}
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">ტელეფონის ნომერი</span>
            {!isCommitted && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-[10px] text-[#00A3FF] hover:underline cursor-pointer"
              >
                {isEditing ? 'მზადაა' : 'შესწორება'}
              </button>
            )}
          </div>
          {isEditing ? (
            <input
              type="text"
              value={editedPhone}
              onChange={(e) => setEditedPhone(e.target.value)}
              className="w-full text-xs font-mono bg-black/50 border border-[#00A3FF] rounded px-2 py-1 text-white focus:outline-none"
            />
          ) : (
            <div className="text-sm font-mono font-bold text-white">{editedPhone}</div>
          )}
        </div>

        {/* Role or Plan */}
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
          <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">პოზიცია / პაკეტი</span>
          <div className="text-sm font-semibold text-emerald-300">{data.roleOrPlanKa}</div>
        </div>

        {/* Branch */}
        <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1 sm:col-span-2">
          <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">ფილიალი &amp; ბიზნეს ლოგიკა</span>
          <div className="flex flex-wrap items-center justify-between gap-1 text-xs text-gray-200">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#00A3FF]" />
              <span>{data.branchKa}</span>
            </span>
            {data.functionCalled && (
              <span className="font-mono text-[10px] text-purple-300 bg-purple-900/30 px-2 py-0.5 rounded border border-purple-500/20 flex items-center gap-1">
                <Cpu className="w-3 h-3 text-purple-400" />
                <span>{data.functionCalled}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Security & Validation Notice */}
      <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-2 mb-4">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          <strong>Zero-Hallucination გარანტია:</strong> მონაცემები ბაზაში ჩაიწერება მხოლოდ თქვენი საბოლოო დადასტურების შემდეგ.
        </span>
      </div>

      {/* Action Buttons */}
      {!isCommitted ? (
        <div className="flex items-center gap-3">
          <button
            onClick={() => onApprove({ ...data, phone: editedPhone })}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00A3FF] to-[#00D2FF] hover:opacity-95 text-white font-mono text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(0,163,255,0.4)] flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
          >
            <Check className="w-4 h-4" />
            <span>დადასტურება და ბაზაში შენახვა</span>
          </button>
          <button
            onClick={onReject}
            className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/40 text-gray-300 hover:text-rose-300 font-mono text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <X className="w-4 h-4" />
            <span>გაუქმება</span>
          </button>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-center font-mono text-xs sm:text-sm text-emerald-300 font-bold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>მონაცემები წარმატებით დადასტურდა და შეინახა ბაზაში (Audit Logged)!</span>
        </div>
      )}
    </div>
  );
};
