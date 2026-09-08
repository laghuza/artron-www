"use client";

import React, { useState } from 'react';
import { AiInputMode } from '@/types/multimodalAi';
import { VoiceRegistrationSim } from './VoiceRegistrationSim';
import { VisionOcrSim } from './VisionOcrSim';
import { NaturalChatSim } from './NaturalChatSim';
import { Mic, ScanLine, MessageSquareCode, Terminal, ChevronRight } from 'lucide-react';

export const MultimodalAiStage: React.FC = () => {
  const [activeMode, setActiveMode] = useState<AiInputMode>('VOICE');
  const [logs, setLogs] = useState<string[]>([
    '[System Ready] Artron Multimodal AI Hub ინიციალიზებულია.',
    '[Engine State] Google Cloud Speech-to-Text & Gemini Flash Vision მზადყოფნაშია.'
  ]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString('ka-GE', { hour12: false });
    setLogs((prev) => [`[${timestamp}] ${msg}`, ...prev.slice(0, 15)]);
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Interactive Mode Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-[#080B11] border border-white/10">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => {
              setActiveMode('VOICE');
              addLog('ოპერატორმა აირჩია ხმოვანი რეგისტრაციის რეჟიმი (Georgian STT).');
            }}
            className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMode === 'VOICE'
                ? 'bg-gradient-to-r from-[#0066FF] to-[#00A3FF] text-white shadow-[0_0_20px_rgba(0,163,255,0.4)]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>1. ხმოვანი ბრძანება</span>
          </button>

          <button
            onClick={() => {
              setActiveMode('VISION_OCR');
              addLog('ოპერატორმა აირჩია პირადობის მოწმობის AI OCR სკანირება.');
            }}
            className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMode === 'VISION_OCR'
                ? 'bg-gradient-to-r from-[#0066FF] to-[#00A3FF] text-white shadow-[0_0_20px_rgba(0,163,255,0.4)]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ScanLine className="w-4 h-4" />
            <span>2. პირადობის OCR</span>
          </button>

          <button
            onClick={() => {
              setActiveMode('NATURAL_CHAT');
              addLog('ოპერატორმა აირჩია ბუნებრივი ენის ჩატ-ასისტენტი (Function Calling).');
            }}
            className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMode === 'NATURAL_CHAT'
                ? 'bg-gradient-to-r from-[#0066FF] to-[#00A3FF] text-white shadow-[0_0_20px_rgba(0,163,255,0.4)]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquareCode className="w-4 h-4" />
            <span>3. ჭკვიანი ჩატი</span>
          </button>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>ZERO-HALLUCINATION SHIELD ACTIVE</span>
        </div>
      </div>

      {/* Main Mode Interactive Subcomponent */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#0B0F17]/90 border border-[#00A3FF]/20 shadow-2xl backdrop-blur-md">
        {activeMode === 'VOICE' && <VoiceRegistrationSim onActivityLog={addLog} />}
        {activeMode === 'VISION_OCR' && <VisionOcrSim onActivityLog={addLog} />}
        {activeMode === 'NATURAL_CHAT' && <NaturalChatSim onActivityLog={addLog} />}
      </div>

      {/* Real-time System Audit & Log Terminal */}
      <div className="rounded-2xl bg-[#06090E] border border-white/10 p-4 space-y-2 font-mono">
        <div className="flex items-center justify-between text-[11px] text-gray-400 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#00A3FF]" />
            <span className="text-white font-bold">MULTIMODAL AI EVENT BUS &amp; AUDIT TRAIL</span>
          </div>
          <span className="text-[10px] text-gray-500">ISO-27001 &amp; GDPR COMPLIANT</span>
        </div>

        <div className="text-[11px] text-emerald-400/90 space-y-1 max-h-28 overflow-y-auto pr-1">
          {logs.map((l, i) => (
            <div key={i} className="leading-relaxed flex items-start gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-[#00A3FF] shrink-0 mt-0.5" />
              <span>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
