"use client";

import React, { useState } from 'react';
import { BranchIp, UserIpRule, IpAuditLog } from '@/types/ipWhitelist';
import { INITIAL_BRANCH_IPS, INITIAL_USER_IP_RULES, INITIAL_IP_AUDIT_LOGS } from '@/data/ipWhitelistData';
import { IpDirectoryTab } from './IpDirectoryTab';
import { UserRulesTab } from './UserRulesTab';
import { IpSimulationConsole } from './IpSimulationConsole';
import { IpAuditLogFeed } from './IpAuditLogFeed';
import { soundEngine } from '@/core';

interface IpWhitelistSecurityStageProps {
  onClose?: () => void;
}

type ActiveSubView = 'directory' | 'rules' | 'simulation' | 'logs';

export const IpWhitelistSecurityStage: React.FC<IpWhitelistSecurityStageProps> = () => {
  const [activeTab, setActiveTab] = useState<ActiveSubView>('simulation');
  const [branchIps, setBranchIps] = useState<BranchIp[]>(INITIAL_BRANCH_IPS);
  const [userRules, setUserRules] = useState<UserIpRule[]>(INITIAL_USER_IP_RULES);
  const [auditLogs, setAuditLogs] = useState<IpAuditLog[]>(INITIAL_IP_AUDIT_LOGS);

  const handleAddIp = (newIpData: Omit<BranchIp, 'id' | 'createdAt'>): boolean => {
    const isDuplicate = branchIps.some((b) => b.ipAddress === newIpData.ipAddress);
    if (isDuplicate) return false;

    const newEntry: BranchIp = {
      ...newIpData,
      id: `branch-ip-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setBranchIps((prev) => [newEntry, ...prev]);
    return true;
  };

  const handleDeleteIp = (id: string) => {
    setBranchIps((prev) => prev.filter((b) => b.id !== id));
  };

  const handleToggleBranchActive = (id: string) => {
    setBranchIps((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b))
    );
  };

  const handleToggleUserActive = (id: string) => {
    setUserRules((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  };

  const handleToggleAccessAllIps = (id: string) => {
    setUserRules((prev) =>
      prev.map((u) => (u.id === id ? { ...u, accessAllIps: !u.accessAllIps } : u))
    );
  };

  const handleDeleteRule = (id: string) => {
    setUserRules((prev) => prev.filter((u) => u.id !== id));
  };

  const handleLogAttempt = (logData: Omit<IpAuditLog, 'id' | 'timestamp'>) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const newLog: IpAuditLog = {
      ...logData,
      id: `log-${Date.now()}`,
      timestamp: timeStr,
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 19)]);
  };

  const tabs: { id: ActiveSubView; label: string; icon: string; count?: number }[] = [
    { id: 'simulation', label: 'სიმულატორი', icon: '🧪' },
    { id: 'rules', label: 'თანამშრომლები', icon: '👤', count: userRules.length },
    { id: 'directory', label: 'IP რეესტრი', icon: '🌐', count: branchIps.length },
    { id: 'logs', label: 'აუდიტ-ლოგები', icon: '📜', count: auditLogs.length },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 bg-[#090D14]/95 border border-[#00ff87]/40 rounded-xl font-mono text-xs text-white select-none shadow-[0_12px_40px_rgba(0,0,0,0.7)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse shadow-[0_0_8px_#00ff87]" />
          <span className="text-[#00ff87] font-bold tracking-wider uppercase text-[11px]">
            NODE 08.5 // IP WHITELIST &amp; GEO-FENCING
          </span>
        </div>
        <span className="text-[9px] text-[#00ff87] bg-[#00ff87]/10 px-2 py-0.5 rounded border border-[#00ff87]/30">
          მხოლოდ დარბაზიდან მართვა
        </span>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="grid grid-cols-4 gap-1 mb-2.5 bg-black/50 p-1 rounded-lg border border-white/10 text-[9.5px]">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              soundEngine.playPulseNode();
              setActiveTab(t.id);
            }}
            className={`py-1.5 px-1 rounded transition-all font-bold truncate flex items-center justify-center gap-1 ${
              activeTab === t.id
                ? 'bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87]/60 shadow-[0_0_10px_rgba(0,255,135,0.2)]'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <span>{t.icon}</span>
            <span className="truncate">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Main View Area */}
      <div className="flex-1 bg-[#121722]/85 p-3 rounded-lg border border-white/10 min-h-[200px] overflow-hidden flex flex-col justify-between">
        {activeTab === 'simulation' && (
          <IpSimulationConsole
            userRules={userRules}
            branchIps={branchIps}
            onLogAttempt={handleLogAttempt}
          />
        )}

        {activeTab === 'rules' && (
          <UserRulesTab
            userRules={userRules}
            branchIps={branchIps}
            onToggleUserActive={handleToggleUserActive}
            onToggleAccessAllIps={handleToggleAccessAllIps}
            onDeleteRule={handleDeleteRule}
          />
        )}

        {activeTab === 'directory' && (
          <IpDirectoryTab
            branchIps={branchIps}
            onAddIp={handleAddIp}
            onDeleteIp={handleDeleteIp}
            onToggleActive={handleToggleBranchActive}
          />
        )}

        {activeTab === 'logs' && <IpAuditLogFeed logs={auditLogs} />}
      </div>

      {/* Footer Status Bar */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[8.5px] text-gray-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87]" />
          ZERO-TRUST IP-ADDRESS-GUARD
        </span>
        <span className="text-[#00ff87] font-bold">100% FRAUD PREVENTION</span>
      </div>
    </div>
  );
};
