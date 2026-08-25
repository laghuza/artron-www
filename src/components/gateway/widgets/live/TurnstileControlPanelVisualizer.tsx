"use client";

import React, { useState } from 'react';
import { soundEngine } from '@/core';

interface TurnstileControlPanelVisualizerProps {
  cardType: 'functional' | 'permissions' | 'business';
  subChapterId?: string;
}

export const TurnstileControlPanelVisualizer: React.FC<TurnstileControlPanelVisualizerProps> = ({
  cardType,
}) => {
  const [selectedZone, setSelectedZone] = useState<'A' | 'B' | 'C'>('A');
  const [turnstileState, setTurnstileState] = useState<'IDLE' | 'SCANNING' | 'GRANTED' | 'DENIED'>('IDLE');
  const [antiPassbackActive, setAntiPassbackActive] = useState(true);
  const [failSafeEmergency, setFailSafeEmergency] = useState(false);
  const [scanLog, setScanLog] = useState<string[]>([
    '13:48:21 · Gate 01 · Card #98421 · GRANTED (0.04s)',
    '13:49:05 · Gate 02 · QR Dynamic · GRANTED (0.03s)',
  ]);

  const handleSimulateScan = (passType: 'VALID' | 'INVALID') => {
    soundEngine.playPulseNode();
    setTurnstileState('SCANNING');
    setTimeout(() => {
      if (passType === 'VALID') {
        soundEngine.playSystemAccess();
        setTurnstileState('GRANTED');
        setScanLog((prev) => [
          `${new Date().toLocaleTimeString()} · Zone ${selectedZone} · NFC Pass · GRANTED (<30ms)`,
          ...prev.slice(0, 3),
        ]);
        setTimeout(() => setTurnstileState('IDLE'), 3000);
      } else {
        soundEngine.playPulseNode();
        setTurnstileState('DENIED');
        setScanLog((prev) => [
          `${new Date().toLocaleTimeString()} · Zone ${selectedZone} · Pass #Expired · DENIED (Anti-Passback)`,
          ...prev.slice(0, 3),
        ]);
        setTimeout(() => setTurnstileState('IDLE'), 3000);
      }
    }, 450);
  };

  const handlePulseRelay = () => {
    soundEngine.playSystemAccess();
    setTurnstileState('GRANTED');
    setTimeout(() => setTurnstileState('IDLE'), 5000);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 bg-[#090D14]/95 border border-[#00ff87]/30 rounded-xl font-mono text-xs text-white">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
          <span className="text-[#00ff87] font-bold tracking-wider uppercase text-[11px]">
            TCP/SOCKET // EDGE ACCESS CONTROLLER
          </span>
        </div>
        <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
          NODE 02 // HARDWARE HUB
        </span>
      </div>

      {cardType === 'functional' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          {/* Zone Selector */}
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              ზონალური წვდომის კონფიგურატორი
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['A', 'B', 'C'] as const).map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => {
                    soundEngine.playPulseNode();
                    setSelectedZone(z);
                  }}
                  className={`p-2 rounded text-center transition-all border ${
                    selectedZone === z
                      ? 'bg-[#00ff87]/20 border-[#00ff87] text-white shadow-[0_0_12px_rgba(0,255,135,0.3)]'
                      : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] font-bold">ზონა {z}</div>
                  <div className="text-[9px] text-[#00ff87]">
                    {z === 'A' ? 'მთავარი შესასვლელი' : z === 'B' ? 'აუზი & სპა' : 'VIP კროსფიტი'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Turnstile Gate Simulator */}
          <div className="bg-[#121722] p-3.5 rounded-lg border border-white/10 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-[10px] text-gray-400">ტურნიკეტის სტატუსი:</div>
              <div
                className={`text-sm font-bold tracking-wider uppercase ${
                  turnstileState === 'GRANTED'
                    ? 'text-[#00ff87]'
                    : turnstileState === 'DENIED'
                    ? 'text-red-400'
                    : turnstileState === 'SCANNING'
                    ? 'text-[#00B0FF] animate-pulse'
                    : 'text-gray-300'
                }`}
              >
                {turnstileState === 'GRANTED'
                  ? '🔓 ღიაა (5s იმპულსი)'
                  : turnstileState === 'DENIED'
                  ? '⛔ უარყოფილია (BLOCKED)'
                  : turnstileState === 'SCANNING'
                  ? '⚡ ბუფერის შემოწმება...'
                  : '🔒 ჩაკეტილია (READY)'}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                disabled={turnstileState === 'SCANNING'}
                onClick={() => handleSimulateScan('VALID')}
                className="px-3 py-1.5 bg-[#00ff87]/20 hover:bg-[#00ff87]/30 border border-[#00ff87]/50 text-[#00ff87] rounded text-[10px] font-bold transition-all cursor-pointer"
              >
                ✓ ვალიდური QR
              </button>
              <button
                type="button"
                disabled={turnstileState === 'SCANNING'}
                onClick={() => handleSimulateScan('INVALID')}
                className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded text-[10px] font-bold transition-all cursor-pointer"
              >
                ✕ ორმაგი შესვლა
              </button>
            </div>
          </div>

          {/* Real-time Log Stream */}
          <div className="bg-black/40 p-2.5 rounded-lg border border-white/10 text-[10px] space-y-1">
            <div className="text-gray-500 text-[9px] uppercase tracking-wider">ცოცხალი TCP წვდომის ლოგები:</div>
            {scanLog.map((log, i) => (
              <div key={i} className="text-gray-300 truncate">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {cardType === 'permissions' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 space-y-2.5">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">
              უსაფრთხოებისა და დისტანციური რელეს მართვა
            </div>

            <div className="flex items-center justify-between p-2 bg-black/30 rounded border border-white/5">
              <div>
                <div className="text-[11px] font-bold text-white">Anti-Passback დაცვა</div>
                <div className="text-[9px] text-gray-400">ერთი და იმავე ბარათის ხელმეორედ გამოყენების ბლოკი</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playPulseNode();
                  setAntiPassbackActive(!antiPassbackActive);
                }}
                className={`px-3 py-1 rounded text-[10px] font-bold transition-all ${
                  antiPassbackActive ? 'bg-[#00ff87]/20 border border-[#00ff87] text-[#00ff87]' : 'bg-gray-800 text-gray-400'
                }`}
              >
                {antiPassbackActive ? 'ჩართულია' : 'გათიშული'}
              </button>
            </div>

            <div className="flex items-center justify-between p-2 bg-black/30 rounded border border-white/5">
              <div>
                <div className="text-[11px] font-bold text-white">Fail-Safe საგანგებო ევაკუაცია</div>
                <div className="text-[9px] text-gray-400">ხანძრის დროს ყველა ტურნიკეტის ავტომატური გახსნა</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playPulseNode();
                  setFailSafeEmergency(!failSafeEmergency);
                }}
                className={`px-3 py-1 rounded text-[10px] font-bold transition-all ${
                  failSafeEmergency ? 'bg-red-500/30 border border-red-500 text-red-400 animate-pulse' : 'bg-white/5 text-gray-400'
                }`}
              >
                {failSafeEmergency ? 'საგანგებო რეჟიმი' : 'ნორმალური'}
              </button>
            </div>
          </div>

          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 flex items-center justify-between">
            <span className="text-[10px] text-gray-300">დისტანციური გახსნა ადმინისტრატორისგან:</span>
            <button
              type="button"
              onClick={handlePulseRelay}
              className="px-3 py-1.5 bg-[#00ff87] text-black font-bold rounded text-[10px] hover:brightness-110"
            >
              ⚡ 5s რელეს იმპულსი
            </button>
          </div>
        </div>
      )}

      {cardType === 'business' && (
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          <div className="bg-[#121722] p-3 rounded-lg border border-white/10">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">
              საოპერაციო ეფექტურობა და ხარჯების ეკონომია
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">რეცეფციის ხარჯი</div>
                <div className="text-sm font-bold text-[#00ff87]">-40.0%</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">გამტარუნარიანობა</div>
                <div className="text-sm font-bold text-[#00ff87]">45 კაცი/წთ</div>
              </div>
              <div className="bg-black/30 p-2 rounded border border-white/5">
                <div className="text-[9px] text-gray-400">არალეგალური შესვლა</div>
                <div className="text-sm font-bold text-[#00ff87]">0% (ნულოვანი)</div>
              </div>
            </div>
          </div>

          <div className="bg-[#121722] p-3 rounded-lg border border-white/10 space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-300">პიკური საათების რიგების შემცირება:</span>
              <span className="text-[#00ff87] font-bold">100% აღმოფხვრილი</span>
            </div>
            <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden border border-white/10">
              <div className="bg-[#00ff87] h-full w-full" />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-gray-400">
        <span>EDGE SOCKET LATENCY &lt; 50MS</span>
        <span className="text-[#00ff87]">NODE 02 VERIFIED</span>
      </div>
    </div>
  );
};
