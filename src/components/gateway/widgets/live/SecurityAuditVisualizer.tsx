"use client";

import React, { useState } from 'react';
import { soundEngine } from '@/core';

import { IpWhitelistSecurityStage } from './ip-whitelist/IpWhitelistSecurityStage';
import { DynamicRbacSecurityStage } from './rbac/DynamicRbacSecurityStage';

interface SecurityAuditVisualizerProps {
  cardType: 'functional' | 'permissions' | 'business';
  subChapterId?: string;
}

type DemoTab = 'passkey' | 'qr_hybrid' | 'devices' | 'encryption' | 'ip_whitelist';

interface DeviceItem {
  id: string;
  name: string;
  type: 'mac' | 'phone' | 'win';
  lastUsed: string;
  isCurrent?: boolean;
}

export const SecurityAuditVisualizer: React.FC<SecurityAuditVisualizerProps> = ({ subChapterId }) => {
  // If subChapterId is explicitly 08.5, render the dedicated deep-dive IP Whitelist stage
  if (subChapterId === '08.5') {
    return <IpWhitelistSecurityStage />;
  }

  // If subChapterId is explicitly 08.6, render the dedicated deep-dive Dynamic RBAC & CASL stage
  if (subChapterId === '08.6') {
    return <DynamicRbacSecurityStage />;
  }

  const [activeTab, setActiveTab] = useState<DemoTab>('passkey');
  const [passkeyState, setPasskeyState] = useState<'IDLE' | 'SCANNING' | 'SUCCESS'>('IDLE');
  const [qrState, setQrState] = useState<'WAITING' | 'PAIRING' | 'AUTHENTICATED'>('WAITING');
  const [globalLock, setGlobalLock] = useState(false);
  const [aesStatus, setAesStatus] = useState<'ENCRYPTED' | 'DECRYPTING' | 'SECURE'>('ENCRYPTED');

  const [devices, setDevices] = useState<DeviceItem[]>([
    { id: '1', name: 'სალაროს PC (Windows Hello)', type: 'win', lastUsed: 'ახლახან', isCurrent: true },
    { id: '2', name: 'მენეჯერის MacBook (Touch ID)', type: 'mac', lastUsed: '5 წთ წინ' },
    { id: '3', name: 'iPhone 15 Pro (Face ID)', type: 'phone', lastUsed: '2 სთ წინ' },
  ]);

  const handleSimulatePasskey = () => {
    soundEngine.playPulseNode();
    setPasskeyState('SCANNING');
    setTimeout(() => {
      soundEngine.playSystemAccess();
      setPasskeyState('SUCCESS');
      setTimeout(() => setPasskeyState('IDLE'), 3500);
    }, 1000);
  };

  const handleSimulateQr = () => {
    soundEngine.playPulseNode();
    setQrState('PAIRING');
    setTimeout(() => {
      soundEngine.playSystemAccess();
      setQrState('AUTHENTICATED');
      setTimeout(() => setQrState('WAITING'), 3500);
    }, 1200);
  };

  const handleRevokeDevice = (id: string) => {
    soundEngine.playPulseNode();
    setDevices((prev) => prev.filter((d) => d.id !== id));
  };

  const handleTestIsolation = () => {
    soundEngine.playPulseNode();
    setAesStatus('DECRYPTING');
    setTimeout(() => {
      soundEngine.playSystemAccess();
      setAesStatus('SECURE');
    }, 700);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 sm:p-4 bg-[#090D14]/95 border border-[#00ff87]/40 rounded-xl font-mono text-xs text-white select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse shadow-[0_0_8px_#00ff87]" />
          <span className="text-[#00ff87] font-bold tracking-wider uppercase text-[11px]">
            ZERO-TRUST SECURITY &amp; BIOMETRIC VAULT
          </span>
        </div>
        <span className="text-[9px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          NODE 08 // SECURITY
        </span>
      </div>

      {/* Interactive Tabs */}
      <div className="grid grid-cols-5 gap-1 mb-2.5 bg-black/40 p-1 rounded-lg border border-white/10 text-[9.5px]">
        {[
          { id: 'passkey', label: '⚡ Passkey', color: '#00ff87' },
          { id: 'qr_hybrid', label: '📱 Cross QR', color: '#00B0FF' },
          { id: 'devices', label: '💻 Vault', color: '#a855f7' },
          { id: 'encryption', label: '🔒 AES-256', color: '#f59e0b' },
          { id: 'ip_whitelist', label: '🛡️ IP წესები', color: '#00ff87' },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              soundEngine.playPulseNode();
              setActiveTab(t.id as DemoTab);
            }}
            className={`py-1.5 px-0.5 rounded transition-all font-bold truncate ${
              activeTab === t.id
                ? 'bg-white/15 text-white border border-white/40 shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
            style={activeTab === t.id ? { color: t.color, borderColor: `${t.color}80`, backgroundColor: `${t.color}20` } : undefined}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Main Tab Content Display */}
      <div className="flex-1 flex flex-col justify-between bg-[#121722]/80 p-3 rounded-lg border border-white/10 min-h-[190px]">
        {/* Tab 1: Passkey Simulator */}
        {activeTab === 'passkey' && (
          <div className="flex flex-col justify-between h-full space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Touch ID / Face ID / Windows Hello</span>
              <span className="text-[9px] text-[#00ff87] bg-[#00ff87]/10 px-1.5 py-0.5 rounded border border-[#00ff87]/30">0% ფიშინგის რისკი</span>
            </div>
            <div className="bg-black/50 p-3 rounded-lg border border-white/10 flex flex-col items-center text-center space-y-2">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xl transition-all ${
                passkeyState === 'SCANNING' ? 'bg-[#00ff87]/20 border-2 border-[#00ff87] animate-pulse' :
                passkeyState === 'SUCCESS' ? 'bg-[#00ff87] text-black shadow-[0_0_20px_#00ff87]' : 'bg-white/5 border border-white/20'
              }`}>
                {passkeyState === 'SCANNING' ? '📡' : passkeyState === 'SUCCESS' ? '✓' : '👆'}
              </div>
              <div className="text-[11px] font-bold">
                {passkeyState === 'SCANNING' && <span className="text-[#00ff87] animate-pulse">ბიომეტრიული სკანირება...</span>}
                {passkeyState === 'SUCCESS' && <span className="text-[#00ff87]">ავტორიზაცია წარმატებულია! [1.02 წმ]</span>}
                {passkeyState === 'IDLE' && <span className="text-gray-200">შესვლა პაროლის გარეშე 1 შეხებით</span>}
              </div>
              <p className="text-[9px] text-gray-400 max-w-[280px]">FIDO2 საჯარო გასაღები — ბიომეტრია არ ტოვებს მოწყობილობას.</p>
            </div>
            <button
              type="button"
              onClick={handleSimulatePasskey}
              disabled={passkeyState === 'SCANNING'}
              className="w-full py-2 bg-[#00ff87]/20 hover:bg-[#00ff87]/30 border border-[#00ff87] text-[#00ff87] rounded text-[11px] font-bold transition-all"
            >
              {passkeyState === 'SCANNING' ? 'მუშავდება...' : '⚡ სცადეთ 1-წამიანი ბიომეტრიული შესვლა'}
            </button>
          </div>
        )}

        {/* Tab 2: Cross-Device QR Login */}
        {activeTab === 'qr_hybrid' && (
          <div className="flex flex-col justify-between h-full space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">დესკტოპზე შესვლა მობილურით</span>
              <span className="text-[9px] text-[#00B0FF] bg-[#00B0FF]/10 px-1.5 py-0.5 rounded border border-[#00B0FF]/30">Hybrid FIDO2</span>
            </div>
            <div className="bg-black/50 p-2.5 rounded-lg border border-white/10 flex items-center gap-3">
              <div className="w-14 h-14 bg-white p-1 rounded flex items-center justify-center shrink-0 border-2 border-[#00B0FF]">
                <div className="w-full h-full bg-[#0E1015] p-1 grid grid-cols-3 gap-0.5">
                  <div className="bg-[#00B0FF]" /><div className="bg-transparent" /><div className="bg-[#00B0FF]" />
                  <div className="bg-transparent" /><div className="bg-[#00B0FF] animate-pulse" /><div className="bg-transparent" />
                  <div className="bg-[#00B0FF]" /><div className="bg-[#00B0FF]" /><div className="bg-[#00B0FF]" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-white">
                  {qrState === 'PAIRING' && <span className="text-[#00B0FF]">ტელეფონით დასკანერდა... Face ID</span>}
                  {qrState === 'AUTHENTICATED' && <span className="text-[#00ff87]">დესკტოპი განიბლოკა! ✓</span>}
                  {qrState === 'WAITING' && <span>დაასკანერეთ QR ტელეფონით</span>}
                </div>
                <p className="text-[9px] text-gray-400">კომპიუტერს არ აქვს თითის სკანერი? ტელეფონით სკანირება ხსნის პანელს.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSimulateQr}
              disabled={qrState === 'PAIRING'}
              className="w-full py-2 bg-[#00B0FF]/20 hover:bg-[#00B0FF]/30 border border-[#00B0FF] text-[#00B0FF] rounded text-[11px] font-bold transition-all"
            >
              {qrState === 'PAIRING' ? 'კავშირი მყარდება...' : '📱 ტელეფონით QR ლოგინის სიმულაცია'}
            </button>
          </div>
        )}

        {/* Tab 3: Multi-Device Vault */}
        {activeTab === 'devices' && (
          <div className="flex flex-col justify-between h-full space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">რეგისტრირებული მოწყობილობები ({devices.length})</span>
              <span className="text-[9px] text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/30">Multi-Device Vault</span>
            </div>
            <div className="space-y-1.5 max-h-[110px] overflow-y-auto pr-1">
              {devices.map((device) => (
                <div key={device.id} className="flex items-center justify-between p-1.5 bg-black/40 rounded border border-white/5 text-[10px]">
                  <div className="flex items-center gap-2 truncate">
                    <span>{device.type === 'mac' ? '🍏' : device.type === 'win' ? '🪟' : '📱'}</span>
                    <span className="font-bold text-white truncate">{device.name}</span>
                    {device.isCurrent && <span className="text-[8px] bg-[#00ff87]/20 text-[#00ff87] px-1 rounded">მიმდინარე</span>}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRevokeDevice(device.id)}
                    className="text-[9px] text-red-400 hover:text-red-300 hover:bg-red-500/20 px-1.5 py-0.5 rounded transition-all shrink-0 ml-2"
                  >
                    გაუქმება ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="text-[9px] text-gray-400 flex items-center justify-between border-t border-white/10 pt-1">
              <span>მოპარვისას: 1-კლიკიანი Revoke</span>
              <span className="text-[#00ff87]">100% იზოლირებული</span>
            </div>
          </div>
        )}

        {/* Tab 4: AES-256 & Zero Trust */}
        {activeTab === 'encryption' && (
          <div className="flex flex-col justify-between h-full space-y-2">
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <span className="text-gray-400">პირადი ნომერი (PII):</span>
                <div className="text-[#00ff87] font-bold truncate mt-0.5">
                  {aesStatus === 'SECURE' ? '01024048921 [DECRYPTED]' : 'enc:a9f8412...[AES-256]'}
                </div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <span className="text-gray-400">FIDO2 გასაღები:</span>
                <div className="text-[#00B0FF] font-bold mt-0.5 truncate">ES256 ECDSA ASYMMETRIC</div>
              </div>
            </div>
            <div className="flex items-center justify-between bg-black/40 p-2 rounded border border-white/5">
              <div>
                <div className="text-[10px] font-bold text-white">Global Session Revoke</div>
                <div className="text-[8px] text-gray-400">ყველა ძველი სესიის მყისიერი გაუქმება</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playSystemAccess();
                  setGlobalLock(!globalLock);
                }}
                className={`px-2.5 py-1 rounded text-[9px] font-bold transition-all ${
                  globalLock ? 'bg-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.6)]' : 'bg-white/5 border border-white/15 text-gray-300 hover:bg-white/10'
                }`}
              >
                {globalLock ? '🛑 დაბლოკილია' : 'Force Logout'}
              </button>
            </div>
            <button
              type="button"
              onClick={handleTestIsolation}
              className="w-full py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500 text-amber-300 rounded text-[10px] font-bold"
            >
              🔒 AES-256 RLS შიფრაციის ტესტი
            </button>
          </div>
        )}

        {/* Tab 5: Embedded IP Whitelist */}
        {activeTab === 'ip_whitelist' && (
          <div className="h-full">
            <IpWhitelistSecurityStage />
          </div>
        )}
      </div>

      {/* Footer Metrics */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-gray-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87]" />
          W3C WEBAUTHN / FIDO2 / ZERO-TRUST
        </span>
        <span className="text-[#00ff87] font-bold">ENTERPRISE GEOLOCATION GUARD</span>
      </div>
    </div>
  );
};
