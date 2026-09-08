'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Fingerprint, 
  Smartphone, 
  Laptop, 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  QrCode, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Zap,
  RefreshCw
} from 'lucide-react';
import { soundEngine } from '@/core';
import { IgnitionButton } from '@/components/ui/IgnitionButton';
import { MagneticButton } from '@/components/ui/MagneticButton';

type DemoMode = 'passkey' | 'qr' | 'devices';

interface DeviceMock {
  id: string;
  name: string;
  type: 'mac' | 'win' | 'phone';
  lastActive: string;
  isCurrent?: boolean;
}

export const PasskeySecurityShowcase: React.FC = () => {
  const { t, locale } = useLanguage();
  const [activeMode, setActiveMode] = useState<DemoMode>('passkey');
  const [passkeyState, setPasskeyState] = useState<'IDLE' | 'SCANNING' | 'SUCCESS'>('IDLE');
  const [qrState, setQrState] = useState<'WAITING' | 'SCANNING' | 'SUCCESS'>('WAITING');
  
  const [devices, setDevices] = useState<DeviceMock[]>([
    { id: '1', name: 'სალაროს PC (Windows Hello)', type: 'win', lastActive: 'აქტიური ახლა', isCurrent: true },
    { id: '2', name: 'მენეჯერის MacBook (Touch ID)', type: 'mac', lastActive: '5 წთ წინ' },
    { id: '3', name: 'პირადი iPhone 15 Pro (Face ID)', type: 'phone', lastActive: '1 სთ წინ' },
  ]);

  const handleTriggerPasskey = () => {
    soundEngine.playPulseNode();
    setPasskeyState('SCANNING');
    setTimeout(() => {
      soundEngine.playSystemAccess();
      setPasskeyState('SUCCESS');
      setTimeout(() => setPasskeyState('IDLE'), 3500);
    }, 1000);
  };

  const handleTriggerQr = () => {
    soundEngine.playPulseNode();
    setQrState('SCANNING');
    setTimeout(() => {
      soundEngine.playSystemAccess();
      setQrState('SUCCESS');
      setTimeout(() => setQrState('WAITING'), 3500);
    }, 1200);
  };

  const handleRemoveDevice = (id: string) => {
    soundEngine.playPulseNode();
    setDevices((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <section className="relative py-20 lg:py-28 bg-[#080B10] text-white overflow-hidden border-t border-b border-white/5">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#00ff87]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-[#00A3FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00ff87]/10 border border-[#00ff87]/30 font-mono text-[11px] text-[#00ff87] uppercase tracking-[0.2em] mb-4 shadow-[0_0_15px_rgba(0,255,135,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse shadow-[0_0_8px_#00ff87]" />
            W3C FIDO2 // WEBAUTHN BIO-SECURITY
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5 leading-tight">
            დაივიწყეთ რთული პაროლები — <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ff87] via-[#00B0FF] to-cyan-400">
              შესვლა 1 წამში Face ID-ით და Touch ID-ით
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Apple-ის, Google-ისა და წამყვანი ფინტექ ბანკების უსაფრთხოების სტანდარტი (Passkeys). 
            ნულოვანი ფიშინგის რისკი, აღარავითარი დავიწყებული პაროლები და თანამშრომლებს შორის ექაუნთის გაზიარების სრული აღკვეთა.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl bg-[#0D121B]/90 border border-white/10 hover:border-[#00ff87]/40 transition-all duration-300 shadow-lg group">
            <div className="w-12 h-12 rounded-xl bg-[#00ff87]/10 border border-[#00ff87]/30 flex items-center justify-center text-[#00ff87] mb-4 group-hover:scale-110 transition-transform">
              <Fingerprint className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              1-წამიანი უპაროლო ლოგინი
              <span className="text-[10px] bg-[#00ff87]/20 text-[#00ff87] px-2 py-0.5 rounded font-mono">1-SEC</span>
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Touch ID, Face ID და Windows Hello პირდაპირ ბრაუზერში. აღარავითარი რთული პაროლების ჩაწერა ან დაკარგულის აღდგენა.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl bg-[#0D121B]/90 border border-white/10 hover:border-[#00B0FF]/40 transition-all duration-300 shadow-lg group">
            <div className="w-12 h-12 rounded-xl bg-[#00B0FF]/10 border border-[#00B0FF]/30 flex items-center justify-center text-[#00B0FF] mb-4 group-hover:scale-110 transition-transform">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              Cross-Device QR ავტორიზაცია
              <span className="text-[10px] bg-[#00B0FF]/20 text-[#00B0FF] px-2 py-0.5 rounded font-mono">HYBRID</span>
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              კომპიუტერს არ აქვს თითის სკანერი? დაასკანერეთ ეკრანზე QR კოდი ტელეფონით, დაადასტურეთ Face ID-ით და ადმინ პანელი მყისიერად გაიხსნება.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl bg-[#0D121B]/90 border border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-lg group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              მოწყობილობების Vault & Revoke
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">0% RISK</span>
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              ხედავთ ყველა რეგისტრირებულ მოწყობილობას. თანამშრომლის წასვლის ან გაჯეტის დაკარგვისას — გააუქმეთ წვდომა 1 კლიკით.
            </p>
          </div>
        </div>

        {/* Interactive Live Playground Showcase */}
        <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#0B0F17]/95 border border-[#00ff87]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Info Column */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 font-mono text-xs text-gray-300">
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
        </div>
      </div>
    </section>
  );
};
