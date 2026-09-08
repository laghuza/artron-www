"use client";

import React, { useState } from 'react';
import { 
  Fingerprint, 
  QrCode, 
  Laptop, 
  Zap, 
  Smartphone, 
  CheckCircle2 
} from 'lucide-react';
import { soundEngine } from '@/core';

interface PasskeyDevice {
  id: string;
  name: string;
  type: 'mac' | 'win' | 'phone';
  lastActive: string;
  isCurrent: boolean;
}

export const PasskeySecurityStage: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'passkey' | 'qr' | 'devices'>('passkey');
  const [passkeyState, setPasskeyState] = useState<'IDLE' | 'SCANNING' | 'SUCCESS'>('IDLE');
  const [qrState, setQrState] = useState<'WAITING' | 'SCANNING' | 'SUCCESS'>('WAITING');
  const [devices, setDevices] = useState<PasskeyDevice[]>([
    { id: '1', name: 'MacBook Pro 16" (M3 Max)', type: 'mac', lastActive: 'აქტიურია ახლა', isCurrent: true },
    { id: '2', name: 'iPhone 15 Pro Max (Face ID)', type: 'phone', lastActive: '2 წუთის წინ', isCurrent: false },
    { id: '3', name: 'რეცეფციის PC (Windows Hello)', type: 'win', lastActive: '1 საათის წინ', isCurrent: false },
  ]);

  const handleTriggerPasskey = () => {
    soundEngine.playPulseNode();
    setPasskeyState('SCANNING');
    setTimeout(() => {
      soundEngine.playSystemAccess();
      setPasskeyState('SUCCESS');
      setTimeout(() => setPasskeyState('IDLE'), 3500);
    }, 1200);
  };

  const handleTriggerQr = () => {
    soundEngine.playPulseNode();
    setQrState('SCANNING');
    setTimeout(() => {
      soundEngine.playSystemAccess();
      setQrState('SUCCESS');
      setTimeout(() => setQrState('WAITING'), 3500);
    }, 1500);
  };

  const handleRemoveDevice = (id: string) => {
    soundEngine.playPulseNode();
    setDevices((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 text-white font-sans">
      {/* Left Info & Mode Selector */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-gray-300">
          <span>INTERACTIVE DEMO</span>
          <span className="text-[#00ff87]">● LIVE PLAYGROUND</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
          გამოსცადეთ მომავლის ავტორიზაცია პირდაპირ აქ:
        </h3>

        <p className="text-sm text-slate-300 leading-relaxed">
          აირჩიეთ სასურველი რეჟიმი და თავად ნახეთ, რამდენად მარტივი და უსწრაფესია Artron-ში შესვლა ტრადიციულ პაროლებთან შედარებით.
        </p>

        {/* Mode Selectors */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            type="button"
            onClick={() => {
              soundEngine.playPulseNode();
              setActiveMode('passkey');
            }}
            className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all flex items-center gap-2 ${
              activeMode === 'passkey'
                ? 'bg-[#00ff87]/20 text-[#00ff87] border border-[#00ff87] shadow-[0_0_15px_rgba(0,255,135,0.2)]'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'
            }`}
          >
            <Fingerprint className="w-4 h-4" />
            1-წამიანი Passkey (Touch ID / Face ID)
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playPulseNode();
              setActiveMode('qr');
            }}
            className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all flex items-center gap-2 ${
              activeMode === 'qr'
                ? 'bg-[#00B0FF]/20 text-[#00B0FF] border border-[#00B0FF] shadow-[0_0_15px_rgba(0,176,255,0.2)]'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4" />
            Cross-Device QR ლოგინი
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playPulseNode();
              setActiveMode('devices');
            }}
            className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all flex items-center gap-2 ${
              activeMode === 'devices'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'
            }`}
          >
            <Laptop className="w-4 h-4" />
            მოწყობილობების მართვა ({devices.length})
          </button>
        </div>

        {/* Security Badges */}
        <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00ff87]" />
            <span>FIDO2 W3C Standard</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00B0FF]" />
            <span>Domain-Bound (Anti-Phishing)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>No Password on Server</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>Cross-Device Cloud Sync</span>
          </div>
        </div>
      </div>

      {/* Right Interactive Simulator Column */}
      <div className="w-full lg:w-1/2">
        <div className="bg-[#05080E] p-6 sm:p-7 rounded-2xl border border-white/15 shadow-2xl relative overflow-hidden font-mono">
          {/* Glow ring */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff87]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00ff87] animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                ARTRON AUTH PORTAL // FIDO2
              </span>
            </div>
            <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
              SECURE_CHALLENGE: 60s TTL
            </span>
          </div>

          {/* Mode 1: Passkey Simulator */}
          {activeMode === 'passkey' && (
            <div className="space-y-5 text-center">
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center space-y-3">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all duration-300 ${
                    passkeyState === 'SCANNING'
                      ? 'bg-[#00ff87]/20 text-[#00ff87] border-2 border-[#00ff87] animate-pulse scale-110 shadow-[0_0_25px_#00ff87]'
                      : passkeyState === 'SUCCESS'
                      ? 'bg-[#00ff87] text-black shadow-[0_0_30px_#00ff87]'
                      : 'bg-white/5 text-gray-300 border border-white/20'
                  }`}
                >
                  {passkeyState === 'SCANNING' ? '📡' : passkeyState === 'SUCCESS' ? '✓' : '👆'}
                </div>

                <div className="text-sm font-bold">
                  {passkeyState === 'SCANNING' && (
                    <span className="text-[#00ff87] animate-pulse">ბიომეტრიული სკანირება მიმდინარეობს...</span>
                  )}
                  {passkeyState === 'SUCCESS' && (
                    <span className="text-[#00ff87]">ავტორიზაცია წარმატებულია! [1.02 წმ]</span>
                  )}
                  {passkeyState === 'IDLE' && (
                    <span className="text-white">დააჭირეთ ქვემოთ ღილაკს გამოცდისთვის</span>
                  )}
                </div>

                <p className="text-[11px] text-gray-400 max-w-[280px]">
                  ბიომეტრიული მონაცემი რჩება თქვენს მოწყობილობაში. სერვერთან იცვლება მხოლოდ კრიპტოგრაფიული გასაღები.
                </p>
              </div>

              <button
                type="button"
                onClick={handleTriggerPasskey}
                disabled={passkeyState === 'SCANNING'}
                className="w-full py-3.5 bg-gradient-to-r from-[#00ff87] to-[#00B0FF] hover:opacity-95 active:scale-[0.98] text-black rounded-xl font-bold font-sans text-sm transition-all shadow-[0_0_25px_rgba(0,255,135,0.3)] flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-black" />
                {passkeyState === 'SCANNING' ? 'მუშავდება...' : '⚡ სცადეთ 1-წამიანი ბიომეტრიული შესვლა'}
              </button>
            </div>
          )}

          {/* Mode 2: Cross-Device QR */}
          {activeMode === 'qr' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-4">
                <div className="w-20 h-20 bg-white p-1.5 rounded-lg flex items-center justify-center shrink-0 border-2 border-[#00B0FF]">
                  <div className="w-full h-full bg-[#0E1015] p-1 grid grid-cols-3 gap-0.5">
                    <div className="bg-[#00B0FF]" />
                    <div className="bg-transparent" />
                    <div className="bg-[#00B0FF]" />
                    <div className="bg-transparent" />
                    <div className="bg-[#00B0FF] animate-pulse" />
                    <div className="bg-transparent" />
                    <div className="bg-[#00B0FF]" />
                    <div className="bg-[#00B0FF]" />
                    <div className="bg-[#00B0FF]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-white">
                    {qrState === 'SCANNING' && <span className="text-[#00B0FF]">ტელეფონით დასკანერდა... Face ID</span>}
                    {qrState === 'SUCCESS' && <span className="text-[#00ff87]">დესკტოპი განიბლოკა! ✓</span>}
                    {qrState === 'WAITING' && <span>დაასკანერეთ QR ტელეფონის კამერით</span>}
                  </div>
                  <p className="text-[10px] text-gray-400">
                    კომპიუტერს არ აქვს თითის სკანერი? ტელეფონით სკანირებით დესკტოპზე ადმინ პანელი მყისიერად იხსნება.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleTriggerQr}
                disabled={qrState === 'SCANNING'}
                className="w-full py-3.5 bg-[#00B0FF] hover:bg-[#00B0FF]/90 active:scale-[0.98] text-black rounded-xl font-bold font-sans text-sm transition-all shadow-[0_0_20px_rgba(0,176,255,0.3)] flex items-center justify-center gap-2"
              >
                <Smartphone className="w-4 h-4" />
                {qrState === 'SCANNING' ? 'კავშირი მყარდება...' : '📱 ტელეფონით QR ლოგინის სიმულაცია'}
              </button>
            </div>
          )}

          {/* Mode 3: Device Vault */}
          {activeMode === 'devices' && (
            <div className="space-y-4">
              <div className="text-xs text-gray-300 flex items-center justify-between">
                <span>დარეგისტრირებული მოწყობილობები:</span>
                <span className="text-purple-400 font-bold">{devices.length} აქტიური</span>
              </div>

              <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                {devices.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-2.5 bg-black/40 rounded-lg border border-white/5 text-xs"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-base">{device.type === 'mac' ? '🍏' : device.type === 'win' ? '🪟' : '📱'}</span>
                      <div className="truncate">
                        <div className="font-bold text-white truncate flex items-center gap-1.5">
                          {device.name}
                          {device.isCurrent && (
                            <span className="text-[9px] bg-[#00ff87]/20 text-[#00ff87] px-1.5 py-0.2 rounded font-sans">
                              მიმდინარე
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-gray-400">{device.lastActive}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveDevice(device.id)}
                      className="text-[10px] text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-2 py-1 rounded transition-all shrink-0 ml-2 border border-red-500/20"
                    >
                      გაუქმება ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="text-[10px] text-gray-400 pt-2 border-t border-white/10 flex items-center justify-between">
                <span>მოპარვისას: მყისიერი Revoke</span>
                <span className="text-[#00ff87]">100% იზოლირებული</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
