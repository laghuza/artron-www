"use client";

import React, { useState } from 'react';
import { soundEngine } from '@/core';
import { BRANCH_ACCESS_SAMPLES } from '@/data/rbacMatrixData';

export const BranchIsolationTab: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<string>('saburtalo');
  const [simulatedRole, setSimulatedRole] = useState<'cashier' | 'director'>('cashier');
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleTestBranchAccess = (branchId: string) => {
    const branch = BRANCH_ACCESS_SAMPLES.find(b => b.branchId === branchId);
    if (!branch) return;

    setSelectedBranch(branchId);

    if (simulatedRole === 'cashier' && !branch.cashierAccess) {
      soundEngine.playClose();
      setTestResult(`⛔ 403 FORBIDDEN: მოლარეს (საბურთალო) არ აქვს წვდომა ${branch.branchNameKa}-ზე! მონაცემთა იზოლაცია აქტიურია.`);
    } else {
      soundEngine.playSystemAccess();
      setTestResult(`✓ 200 OK: წვდომა დაშვებულია! x-branch-id: "${branchId}" დამოწმებულია.`);
    }
  };

  return (
    <div className="space-y-4 text-xs font-sans">
      {/* Header */}
      <div className="p-3 bg-[#0B0E14] border border-white/10 rounded-xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>🏢</span> Multi-Branch Strict Isolation
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              x-branch-id Guard
            </span>
          </div>

          {/* Role Switcher for Simulator */}
          <div className="flex items-center gap-1 bg-[#121722] p-1 rounded-lg border border-white/10">
            <button
              onClick={() => {
                soundEngine.playPulseNode();
                setSimulatedRole('cashier');
                setTestResult(null);
              }}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                simulatedRole === 'cashier'
                  ? 'bg-[#00A3FF] text-white font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🎟️ მოლარე
            </button>
            <button
              onClick={() => {
                soundEngine.playPulseNode();
                setSimulatedRole('director');
                setTestResult(null);
              }}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                simulatedRole === 'director'
                  ? 'bg-[#00D2FF] text-black font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              👑 დირექტორი
            </button>
          </div>
        </div>

        <p className="text-[11px] text-gray-400 leading-relaxed">
          სისტემა ავტომატურად იცავს ქსელურ ბიზნესს: საბურთალოს ფილიალის თანამშრომელი ვერასდროს ნახავს ვაკის ან ბათუმის
          მონაცემებს, ხოლო გენერალური დირექტორი მართავს მთელ ქსელს ერთიანი ეკრანიდან.
        </p>
      </div>

      {/* Interactive Branch Test Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {BRANCH_ACCESS_SAMPLES.map(branch => {
          const isSelected = selectedBranch === branch.branchId;
          const isAllowedForCurrentRole = simulatedRole === 'director' || branch.cashierAccess;

          return (
            <div
              key={branch.branchId}
              onClick={() => handleTestBranchAccess(branch.branchId)}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-[#0E131E] border-[#00A3FF] shadow-[0_0_15px_rgba(0,163,255,0.25)]'
                  : 'bg-[#0B0E14] border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-gray-400 uppercase">
                  BRANCH ID: {branch.branchId}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isAllowedForCurrentRole
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {isAllowedForCurrentRole ? '✓ დაშვებულია' : '⛔ იზოლირებულია'}
                </span>
              </div>

              <h4 className="text-[12px] font-bold text-white mb-2">
                {branch.branchNameKa}
              </h4>

              <div className="space-y-1 text-[10px] font-mono text-gray-400">
                <div className="flex justify-between">
                  <span>საბურთალოს მოლარე:</span>
                  <span className={branch.cashierAccess ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {branch.cashierAccess ? 'ALLOWED' : 'BLOCKED'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>მთავარი ბუღალტერი:</span>
                  <span className="text-emerald-400">ALLOWED</span>
                </div>
                <div className="flex justify-between">
                  <span>გენერალური დირექტორი:</span>
                  <span className="text-cyan-300">FULL ACCESS</span>
                </div>
              </div>

              <button className="w-full mt-3 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-[10px] font-mono transition-colors">
                ⚡ წვდომის ტესტირება
              </button>
            </div>
          );
        })}
      </div>

      {/* Simulator Response Banner */}
      {testResult && (
        <div
          className={`p-3 rounded-xl border font-mono text-[11px] animate-fadeIn ${
            testResult.includes('403')
              ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
          }`}
        >
          {testResult}
        </div>
      )}
    </div>
  );
};
