"use client";

import React, { useState } from 'react';
import { UserIpRule, BranchIp } from '@/types/ipWhitelist';
import { soundEngine } from '@/core';

interface IpSimulationConsoleProps {
  userRules: UserIpRule[];
  branchIps: BranchIp[];
  onLogAttempt: (log: {
    userName: string;
    userRole: string;
    attemptedIp: string;
    locationName: string;
    authMethod: 'PASSWORD' | 'WEBAUTHN_PASSKEY' | 'API_GUARD';
    status: 'ALLOWED' | 'BLOCKED';
    reason: string;
  }) => void;
}

export const IpSimulationConsole: React.FC<IpSimulationConsoleProps> = ({
  userRules,
  branchIps,
  onLogAttempt,
}) => {
  const [selectedUserId, setSelectedUserId] = useState<string>(userRules[0]?.userId || 'user-01');
  const [selectedNetwork, setSelectedNetwork] = useState<'VAKE_LAN' | 'SABURTALO_WIFI' | 'HOME_LTE' | 'PUBLIC_CAFE'>('HOME_LTE');
  const [authMethod, setAuthMethod] = useState<'PASSWORD' | 'WEBAUTHN_PASSKEY'>('PASSWORD');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<{
    status: 'ALLOWED' | 'BLOCKED' | null;
    message: string;
    details: string;
  }>({ status: null, message: '', details: '' });

  const activeRule = userRules.find((u) => u.userId === selectedUserId) || userRules[0];

  const networkProfiles = {
    VAKE_LAN: {
      name: '🏢 ვაკის ფილიალი (LAN)',
      ip: '192.168.1.100',
      branchId: 'branch-vake-lan',
      isGym: true,
    },
    SABURTALO_WIFI: {
      name: '📶 საბურთალო (Wi-Fi)',
      ip: '192.168.2.50',
      branchId: 'branch-saburtalo-wifi',
      isGym: true,
    },
    HOME_LTE: {
      name: '🏠 სახლი (Magti/Silknet)',
      ip: '178.134.89.204',
      branchId: 'home',
      isGym: false,
    },
    PUBLIC_CAFE: {
      name: '☕ საჯარო კაფე (Public Wi-Fi)',
      ip: '85.117.34.88',
      branchId: 'public',
      isGym: false,
    },
  };

  const handleRunSimulation = () => {
    soundEngine.playPulseNode();
    setIsSimulating(true);
    setSimulationResult({ status: null, message: '', details: '' });

    setTimeout(() => {
      const net = networkProfiles[selectedNetwork];
      let isAllowed = false;
      let reason = '';

      if (!activeRule.isActive) {
        isAllowed = false;
        reason = 'თანამშრომლის წესი შეჩერებულია (Inactive status)';
      } else if (activeRule.accessAllIps) {
        isAllowed = true;
        reason = 'Access All IPs (Director Global Bypass) — წვდომა დაშვებულია';
      } else if (activeRule.allowedBranchIds.includes(net.branchId)) {
        isAllowed = true;
        reason = `IP (${net.ip}) ემთხვევა ფილიალის ნებადართულ სიას`;
      } else {
        isAllowed = false;
        reason = `IP (${net.ip}) არ არის ნებადართულ სიაში. წვდომა დაშვებულია მხოლოდ ობიექტიდან`;
      }

      if (isAllowed) {
        soundEngine.playSystemAccess();
        setSimulationResult({
          status: 'ALLOWED',
          message: '✓ ავტორიზაცია დაშვებულია (Access Granted)',
          details: reason,
        });
      } else {
        soundEngine.playClose();
        setSimulationResult({
          status: 'BLOCKED',
          message: '🛑 თქვენი IP მისამართი არ არის ნებადართული! (Access Denied)',
          details: reason,
        });
      }

      onLogAttempt({
        userName: activeRule.userName,
        userRole: activeRule.roleTitle,
        attemptedIp: `${net.ip} (${net.name})`,
        locationName: net.name,
        authMethod,
        status: isAllowed ? 'ALLOWED' : 'BLOCKED',
        reason,
      });

      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">
          🧪 Zero-Trust IpAddressGuard სიმულატორი
        </span>
        <span className="text-[8.5px] text-[#00B0FF] bg-[#00B0FF]/10 px-1.5 py-0.5 rounded border border-[#00B0FF]/30">
          Real-time Packet Guard
        </span>
      </div>

      {/* Control Pickers */}
      <div className="grid grid-cols-2 gap-2 text-[9px]">
        {/* Staff Picker */}
        <div className="space-y-1">
          <label className="text-gray-400">1. თანამშრომელი:</label>
          <select
            value={selectedUserId}
            onChange={(e) => {
              soundEngine.playPulseNode();
              setSelectedUserId(e.target.value);
              setSimulationResult({ status: null, message: '', details: '' });
            }}
            className="w-full bg-[#121722] border border-white/15 rounded px-2 py-1 text-white text-[9.5px] focus:outline-none focus:border-[#00ff87]"
          >
            {userRules.map((u) => (
              <option key={u.userId} value={u.userId}>
                {u.userName} ({u.roleTitle.split(' ')[0]}) {u.accessAllIps ? '👑' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Network Location Picker */}
        <div className="space-y-1">
          <label className="text-gray-400">2. საიდან შემოდის (IP):</label>
          <select
            value={selectedNetwork}
            onChange={(e) => {
              soundEngine.playPulseNode();
              setSelectedNetwork(e.target.value as any);
              setSimulationResult({ status: null, message: '', details: '' });
            }}
            className="w-full bg-[#121722] border border-white/15 rounded px-2 py-1 text-white text-[9.5px] focus:outline-none focus:border-[#00ff87]"
          >
            <option value="HOME_LTE">🏠 სახლი (178.134.89.204)</option>
            <option value="VAKE_LAN">🏢 ვაკე LAN (192.168.1.100)</option>
            <option value="SABURTALO_WIFI">📶 საბურთალო Wi-Fi (192.168.2.50)</option>
            <option value="PUBLIC_CAFE">☕ საჯარო კაფე (85.117.34.88)</option>
          </select>
        </div>
      </div>

      {/* Auth Method Selector */}
      <div className="grid grid-cols-2 gap-1.5 bg-black/40 p-1 rounded border border-white/10 text-[9px]">
        <button
          type="button"
          onClick={() => {
            soundEngine.playPulseNode();
            setAuthMethod('PASSWORD');
          }}
          className={`py-1 rounded font-bold transition-all ${
            authMethod === 'PASSWORD'
              ? 'bg-white/15 text-white border border-white/30'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          🔑 Login & Password
        </button>
        <button
          type="button"
          onClick={() => {
            soundEngine.playPulseNode();
            setAuthMethod('WEBAUTHN_PASSKEY');
          }}
          className={`py-1 rounded font-bold transition-all ${
            authMethod === 'WEBAUTHN_PASSKEY'
              ? 'bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87]/40'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          ⚡ Face ID / WebAuthn
        </button>
      </div>

      {/* Action Simulation Button */}
      <button
        type="button"
        onClick={handleRunSimulation}
        disabled={isSimulating}
        className="w-full py-2 bg-gradient-to-r from-[#00ff87]/20 to-[#00A3FF]/20 hover:from-[#00ff87]/30 hover:to-[#00A3FF]/30 border border-[#00ff87]/60 text-white rounded text-[10px] font-bold transition-all shadow-[0_0_15px_rgba(0,255,135,0.2)] flex items-center justify-center gap-2"
      >
        {isSimulating ? (
          <span>🛡️ IpAddressGuard ამოწმებს პაკეტებს...</span>
        ) : (
          <span>⚡ გაუშვით შესვლის ტესტი (Guard Check)</span>
        )}
      </button>

      {/* Result Display Box */}
      {simulationResult.status && (
        <div
          className={`p-2.5 rounded-lg border text-[9.5px] space-y-1 animate-fadeIn ${
            simulationResult.status === 'ALLOWED'
              ? 'bg-[#00ff87]/15 border-[#00ff87]/60 text-[#00ff87]'
              : 'bg-red-500/15 border-red-500/60 text-red-300'
          }`}
        >
          <div className="font-bold flex items-center gap-1.5">
            <span>{simulationResult.message}</span>
          </div>
          <div className="text-[8.5px] opacity-90">{simulationResult.details}</div>
          <div className="text-[7.5px] text-gray-400 font-mono pt-1 border-t border-white/10">
            [X-Forwarded-For: Verified] • [Header IP: Match Check Completed]
          </div>
        </div>
      )}
    </div>
  );
};
