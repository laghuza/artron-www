"use client";

import React, { useState } from 'react';
import { soundEngine } from '@/core';
import { RoleMatrixTab } from './RoleMatrixTab';
import { FieldSecurityTab } from './FieldSecurityTab';
import { BranchIsolationTab } from './BranchIsolationTab';
import { RbacAuditFeed } from './RbacAuditFeed';

export type RbacStageTab = 'matrix' | 'fields' | 'branches' | 'audit';

export const DynamicRbacSecurityStage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RbacStageTab>('matrix');

  const handleTabChange = (tab: RbacStageTab) => {
    soundEngine.playPulseNode();
    setActiveTab(tab);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between space-y-4 text-white font-sans">
      {/* Top Header & Stage Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#00A3FF]/15 border border-[#00A3FF]/30 flex items-center justify-center text-lg text-[#00A3FF] shadow-[0_0_15px_rgba(0,163,255,0.2)]">
            👑
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>დინამიური როლებისა და CASL უსაფრთხოების მოდული</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00A3FF]/20 text-[#00A3FF] border border-[#00A3FF]/40 hidden md:inline-block">
                RBAC & ABAC Engine
              </span>
            </h3>
            <p className="text-[11px] text-gray-400">
              40+ მოდულის მიკრო-ნებართვების მატრიცა, Field-Level Security და ფილიალების მკაცრი იზოლაცია.
            </p>
          </div>
        </div>

        {/* Quick Nav Tabs */}
        <div className="flex items-center gap-1 bg-[#0B0E14] p-1 rounded-xl border border-white/10 overflow-x-auto max-w-full">
          <button
            onClick={() => handleTabChange('matrix')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'matrix'
                ? 'bg-[#00A3FF] text-white font-bold shadow-[0_0_12px_rgba(0,163,255,0.4)]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🎭</span> მატრიცა & როლები
          </button>
          <button
            onClick={() => handleTabChange('fields')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'fields'
                ? 'bg-[#00A3FF] text-white font-bold shadow-[0_0_12px_rgba(0,163,255,0.4)]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🔒</span> Field-Level დაცვა
          </button>
          <button
            onClick={() => handleTabChange('branches')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'branches'
                ? 'bg-[#00A3FF] text-white font-bold shadow-[0_0_12px_rgba(0,163,255,0.4)]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🏢</span> ფილიალების იზოლაცია
          </button>
          <button
            onClick={() => handleTabChange('audit')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'audit'
                ? 'bg-[#00A3FF] text-white font-bold shadow-[0_0_12px_rgba(0,163,255,0.4)]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>📜</span> აუდიტის ლოგები
          </button>
        </div>
      </div>

      {/* Main Tab Content Stage */}
      <div className="flex-1 min-h-[360px]">
        {activeTab === 'matrix' && <RoleMatrixTab />}
        {activeTab === 'fields' && <FieldSecurityTab />}
        {activeTab === 'branches' && <BranchIsolationTab />}
        {activeTab === 'audit' && <RbacAuditFeed />}
      </div>

      {/* Bottom KPI Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 font-mono text-[11px]">
        <div className="p-2 rounded-lg bg-[#0B0E14] border border-white/5 flex flex-col items-center text-center">
          <span className="text-gray-400 text-[10px]">დაცული მოდულები</span>
          <span className="text-emerald-400 font-bold text-xs sm:text-sm">40+ Subjects</span>
        </div>
        <div className="p-2 rounded-lg bg-[#0B0E14] border border-white/5 flex flex-col items-center text-center">
          <span className="text-gray-400 text-[10px]">Custom როლები</span>
          <span className="text-cyan-400 font-bold text-xs sm:text-sm">♾️ Unlimited</span>
        </div>
        <div className="p-2 rounded-lg bg-[#0B0E14] border border-white/5 flex flex-col items-center text-center">
          <span className="text-gray-400 text-[10px]">შიდა თაღლითობა</span>
          <span className="text-rose-400 font-bold text-xs sm:text-sm">0% Risk Guarantee</span>
        </div>
        <div className="p-2 rounded-lg bg-[#0B0E14] border border-white/5 flex flex-col items-center text-center">
          <span className="text-gray-400 text-[10px]">ავტორიზაციის ძრავი</span>
          <span className="text-purple-400 font-bold text-xs sm:text-sm">CASL Isomorphic</span>
        </div>
      </div>
    </div>
  );
};
