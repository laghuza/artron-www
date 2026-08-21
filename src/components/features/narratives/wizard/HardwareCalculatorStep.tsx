"use client";

import React, { useState, useEffect } from 'react';
import { soundEngine } from '@/core';

interface HardwareCalculatorStepProps {
  onBack: () => void;
  onContinue: () => void;
  gatesCount: string;
  setAccessGatesCount: (v: string) => void;
  includeHardwareQuote: boolean;
  setIncludeHardwareQuote: (v: boolean) => void;
  turnstileType: string;
  setTurnstileType: (v: string) => void;
  scannerType: string;
  setScannerType: (v: string) => void;
}

const TURNSTILE_COSTS: Record<string, number> = {
  TRIPOD: 1200,
  SPEED_GATE: 3500,
  READER_ONLY: 400,
};

const SCANNER_COSTS: Record<string, number> = {
  RFID: 150,
  QR_NFC: 450,
};

export default function HardwareCalculatorStep({
  onBack,
  onContinue,
  gatesCount,
  setAccessGatesCount,
  includeHardwareQuote,
  setIncludeHardwareQuote,
  turnstileType,
  setTurnstileType,
  scannerType,
  setScannerType,
}: HardwareCalculatorStepProps) {
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const gates = parseInt(gatesCount) || 1;
    const tCost = TURNSTILE_COSTS[turnstileType] || 0;
    const sCost = SCANNER_COSTS[scannerType] || 0;
    setTotalCost(gates * (tCost + sCost));
  }, [gatesCount, turnstileType, scannerType]);

  return (
    <div className="space-y-4 flex-1 flex flex-col justify-between animate-fadeIn">
      <div>
        <div className="space-y-1 mb-4">
          <div className="font-mono text-[9.5px] text-[#9CA3AF] uppercase tracking-widest flex justify-between">
            <span>[ CLUB_INTEGRATION: STEP_03_OF_05 ]</span>
            <span><span className="text-[#9CA3AF]/30">○ ○</span> <span className="text-[#00ff87]">●</span> <span className="text-[#9CA3AF]/10">○ ○</span></span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#F5F5F7] uppercase">HARDWARE CONFIGURATOR</h2>
        </div>

        <div className="space-y-3 font-mono text-[10px]">
          {/* Active Gate count input */}
          <div className="space-y-1.5">
            <label className="block text-[#9CA3AF] tracking-wider uppercase">
              [ ACCESS_POINTS // შესასვლელების რაოდენობა ]
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={gatesCount}
              onChange={(e) => setAccessGatesCount(e.target.value)}
              className="w-full bg-[#121418] border border-white/10 rounded px-3 py-2 text-xs text-[#00ff87] outline-none font-bold"
            />
          </div>

          {/* Turnstile Selection Options */}
          <div className="space-y-1.5">
            <label className="block text-[#9CA3AF] tracking-wider uppercase">
              [ TURNSTILE_MODEL // ტურნიკეტის ტიპი ]
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'TRIPOD', label: 'TRIPOD', desc: 'GEL 1200' },
                { id: 'SPEED_GATE', label: 'SPEED GATE', desc: 'GEL 3500' },
                { id: 'READER_ONLY', label: 'READER ONLY', desc: 'GEL 400' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => { soundEngine.playPulseNode(); setTurnstileType(t.id); }}
                  className={`p-2 border rounded text-center cursor-pointer transition-all ${
                    turnstileType === t.id
                      ? 'bg-[#16191E] border-[#00ff87] text-[#00ff87]'
                      : 'bg-[#121418]/30 border-white/5 text-gray-500 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-[9px]">{t.label}</div>
                  <div className="text-[7.5px] opacity-75">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Scanner Selection Options */}
          <div className="space-y-1.5">
            <label className="block text-[#9CA3AF] tracking-wider uppercase">
              [ SCANNER_PROTOCOL // სკანერის ტიპი ]
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'RFID', label: 'RFID CARD READER', desc: 'GEL 150' },
                { id: 'QR_NFC', label: 'DYNAMIC QR / NFC', desc: 'GEL 450' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => { soundEngine.playPulseNode(); setScannerType(s.id); }}
                  className={`p-2 border rounded text-center cursor-pointer transition-all ${
                    scannerType === s.id
                      ? 'bg-[#16191E] border-[#00ff87] text-[#00ff87]'
                      : 'bg-[#121418]/30 border-white/5 text-gray-500 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-[9px]">{s.label}</div>
                  <div className="text-[7.5px] opacity-75">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Calculated Cost Summary */}
          <div className="p-3 border border-[#00ff87]/20 bg-[#00ff87]/5 rounded flex justify-between items-center mt-2.5">
            <span className="text-[#9CA3AF] tracking-wider uppercase font-semibold">ESTIMATED HARDWARE COST:</span>
            <span className="text-[#00ff87] text-[15px] font-black">₾{totalCost}</span>
          </div>

          {/* Email Quote checkbox option */}
          <label className="flex items-center gap-2.5 py-1 text-gray-300 select-none cursor-pointer">
            <input
              type="checkbox"
              checked={includeHardwareQuote}
              onChange={(e) => { soundEngine.playPulseNode(); setIncludeHardwareQuote(e.target.checked); }}
              className="accent-[#00ff87] h-3.5 w-3.5"
            />
            <span className="text-[9px] uppercase leading-tight tracking-wider">
              Include hardware PDF invoice proposal in confirmation email
            </span>
          </label>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="space-y-3 pt-3 border-t border-white/5">
        <div className="flex gap-4 font-mono text-xs">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 px-4 border border-[#9CA3AF]/20 text-[#9CA3AF] hover:bg-[#9CA3AF]/10 transition-all uppercase cursor-pointer"
          >
            [ BACK ]
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="flex-1 py-3 px-4 font-bold border border-[#00ff87] text-[#00ff87] bg-[#00ff87]/10 hover:bg-[#00ff87] hover:text-[#121418] transition-all uppercase cursor-pointer"
          >
            [ CALC_COMPLETE // NEXT ]
          </button>
        </div>
      </div>
    </div>
  );
}
