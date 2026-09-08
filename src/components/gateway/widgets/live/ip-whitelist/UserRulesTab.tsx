"use client";

import React, { useState } from 'react';
import { UserIpRule, BranchIp } from '@/types/ipWhitelist';
import { soundEngine } from '@/core';

interface UserRulesTabProps {
  userRules: UserIpRule[];
  branchIps: BranchIp[];
  onToggleUserActive: (id: string) => void;
  onToggleAccessAllIps: (id: string) => void;
  onDeleteRule: (id: string) => void;
}

export const UserRulesTab: React.FC<UserRulesTabProps> = ({
  userRules,
  branchIps,
  onToggleUserActive,
  onToggleAccessAllIps,
  onDeleteRule,
}) => {
  const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);

  const getBranchNames = (branchIds: string[]) => {
    return branchIds
      .map((id) => branchIps.find((b) => b.id === id)?.name || id)
      .join(', ');
  };

  return (
    <div className="flex flex-col h-full space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">
            👤 თანამშრომელთა პერსონალური წესები ({userRules.length})
          </span>
          <p className="text-[8.5px] text-gray-400">როლზე და ლოკაციაზე დაფუძნებული წვდომის კონტროლი</p>
        </div>
        <span className="text-[8.5px] text-[#00ff87] bg-[#00ff87]/10 px-2 py-0.5 rounded border border-[#00ff87]/30">
          Zero-Trust Guard
        </span>
      </div>

      {/* Rules List Cards */}
      <div className="space-y-1.5 flex-1 overflow-y-auto max-h-[160px] pr-1">
        {userRules.map((rule) => {
          const isSelected = selectedRuleId === rule.id;
          return (
            <div
              key={rule.id}
              onClick={() => {
                soundEngine.playPulseNode();
                setSelectedRuleId(isSelected ? null : rule.id);
              }}
              className={`p-2 rounded border transition-all cursor-pointer text-[9.5px] ${
                rule.isActive
                  ? isSelected
                    ? 'bg-[#121722] border-[#00ff87] shadow-[0_0_12px_rgba(0,255,135,0.2)]'
                    : 'bg-black/40 border-white/10 hover:border-white/20'
                  : 'bg-black/20 border-white/5 opacity-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 truncate">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    rule.accessAllIps ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50' : 'bg-emerald-500/20 text-[#00ff87] border border-emerald-500/30'
                  }`}>
                    {rule.userName.charAt(0)}
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>{rule.userName}</span>
                      {rule.accessAllIps && (
                        <span className="text-[7.5px] bg-purple-500/20 text-purple-300 border border-purple-500/40 px-1 rounded">
                          👑 ALL IPs
                        </span>
                      )}
                    </div>
                    <div className="text-[8.5px] text-gray-400">{rule.roleTitle}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playPulseNode();
                      onToggleUserActive(rule.id);
                    }}
                    className={`px-1.5 py-0.5 rounded text-[8px] font-bold transition-all ${
                      rule.isActive
                        ? 'bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87]/40'
                        : 'bg-white/5 text-gray-400 border border-white/10'
                    }`}
                  >
                    {rule.isActive ? '🟢 აქტიური' : '⚪ პაუზა'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClose();
                      onDeleteRule(rule.id);
                    }}
                    className="text-red-400 hover:bg-red-500/20 px-1 py-0.5 rounded text-[8.5px]"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Card Expansion / Details */}
              <div className="mt-1.5 pt-1.5 border-t border-white/5 grid grid-cols-2 gap-1 text-[8.5px]">
                <div>
                  <span className="text-gray-400">ნებადართული ლოკაცია:</span>
                  <div className="text-gray-200 font-medium truncate">
                    {rule.accessAllIps ? '🌐 გლობალური წვდომა (ნებისმიერი IP)' : getBranchNames(rule.allowedBranchIds)}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-400">ბოლო შესვლა:</span>
                  <div className="text-gray-300">
                    <span className={rule.lastLoginStatus === 'SUCCESS' ? 'text-[#00ff87]' : 'text-red-400'}>
                      {rule.lastLoginIp || '192.168.1.1'}
                    </span>{' '}
                    • {rule.lastLoginTime || 'ახლახან'}
                  </div>
                </div>
              </div>

              {isSelected && (
                <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playSystemAccess();
                      onToggleAccessAllIps(rule.id);
                    }}
                    className={`px-2 py-1 rounded text-[8.5px] font-bold transition-all ${
                      rule.accessAllIps
                        ? 'bg-purple-500/30 text-purple-200 border border-purple-400'
                        : 'bg-white/5 text-gray-300 border border-white/15 hover:bg-white/10'
                    }`}
                  >
                    {rule.accessAllIps ? '✓ გლობალური წვდომა ჩართულია' : '🔒 Access All IPs ჩართვა (დირექტორი)'}
                  </button>
                  <span className="text-[8px] text-[#00ff87]">სტატუსის მყისიერი სინქრონიზაცია</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
