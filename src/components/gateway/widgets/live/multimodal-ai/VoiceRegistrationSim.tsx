"use client";

import React, { useState, useEffect } from 'react';
import { VOICE_SCENARIOS } from '@/data/multimodalAiData';
import { VoiceScenario, ExtractedEntityData } from '@/types/multimodalAi';
import { SmartConfirmationCard } from './SmartConfirmationCard';
import { Mic, AudioWaveform } from 'lucide-react';

interface VoiceRegistrationSimProps {
  onActivityLog?: (msg: string) => void;
}

export const VoiceRegistrationSim: React.FC<VoiceRegistrationSimProps> = ({ onActivityLog }) => {
  const [selectedScenario, setSelectedScenario] = useState<VoiceScenario>(VOICE_SCENARIOS[0]);
  const [isListening, setIsListening] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedEntityData | null>(null);
  const [isCommitted, setIsCommitted] = useState(false);

  const startVoiceSimulation = (scenario = selectedScenario) => {
    setIsListening(true);
    setTranscribedText('');
    setExtractedData(null);
    setIsCommitted(false);
    setIsProcessing(false);

    if (onActivityLog) {
      onActivityLog(`[Google STT] მიკროფონი გააქტიურდა. იწერება ქართული აუდიო ნაკადი...`);
    }

    const fullText = scenario.spokenAudioTextKa;
    let currentIdx = 0;
    const intervalTime = 30;

    const streamInterval = setInterval(() => {
      currentIdx += 3;
      if (currentIdx <= fullText.length) {
        setTranscribedText(fullText.slice(0, currentIdx));
      } else {
        clearInterval(streamInterval);
        setIsListening(false);
        setIsProcessing(true);

        if (onActivityLog) {
          onActivityLog(`[Gemini Flash] ტრანსკრიფცია დასრულდა. მიმდინარეობს პირის იდენტიფიკაცია და ველების ექსტრაქცია...`);
        }

        setTimeout(() => {
          setIsProcessing(false);
          setExtractedData(scenario.extractedData);
          if (onActivityLog) {
            onActivityLog(`[Confirmation Engine] მონაცემები ამოღებულია (${scenario.extractedData.confidenceScore}%). ელოდება ოპერატორის დადასტურებას.`);
          }
        }, 600);
      }
    }, intervalTime);
  };

  const handleApprove = (data: ExtractedEntityData) => {
    setIsCommitted(true);
    if (onActivityLog) {
      onActivityLog(`[PostgreSQL DB] ჩანაწერი წარმატებით შეინახა: ${data.fullNameKa} (${data.roleOrPlanKa})`);
    }
  };

  const handleReject = () => {
    setExtractedData(null);
    setTranscribedText('');
    setIsCommitted(false);
    if (onActivityLog) {
      onActivityLog(`[Security Guard] ოპერატორმა გააუქმა ხმოვანი რეგისტრაციის მოთხოვნა.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Preset Scenarios Selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-gray-400">აირჩიეთ ხმოვანი სცენარი:</span>
        {VOICE_SCENARIOS.map((sc) => (
          <button
            key={sc.id}
            onClick={() => {
              setSelectedScenario(sc);
              setExtractedData(null);
              setTranscribedText('');
              setIsCommitted(false);
            }}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer border flex items-center gap-1.5 ${
              selectedScenario.id === sc.id
                ? 'bg-[#00A3FF]/20 border-[#00A3FF] text-[#00E5FF] shadow-[0_0_12px_rgba(0,163,255,0.3)]'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-[#00A3FF]" />
            <span>{sc.titleKa} ({sc.roleBadgeKa})</span>
          </button>
        ))}
      </div>

      {/* Mic & Waveform Interactive Container */}
      <div className="p-6 rounded-2xl bg-[#090D15] border border-white/10 flex flex-col items-center justify-center space-y-4 relative overflow-hidden shadow-inner">
        {/* Animated Background Laser Glow */}
        {isListening && (
          <div className="absolute inset-0 bg-[#00A3FF]/10 animate-pulse pointer-events-none" />
        )}

        {/* Big Mic Button */}
        <button
          onClick={() => startVoiceSimulation()}
          disabled={isListening}
          className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            isListening
              ? 'bg-rose-600 text-white shadow-[0_0_40px_rgba(244,63,94,0.7)] scale-110 animate-pulse'
              : 'bg-gradient-to-tr from-[#0066FF] to-[#00E5FF] text-white hover:scale-105 shadow-[0_0_30px_rgba(0,163,255,0.5)]'
          }`}
        >
          <Mic className="w-8 h-8 text-white" />
          {isListening && (
            <span className="absolute -inset-2 rounded-full border-2 border-rose-500/50 animate-ping" />
          )}
        </button>

        <div className="text-center space-y-1">
          <p className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            {isListening
              ? 'ხმა იწერება... (Google Speech-to-Text Processing)'
              : 'დააჭირეთ მიკროფონს ხმოვანი ბრძანების სიმულაციისთვის'}
          </p>
          <p className="text-[11px] text-gray-400 font-sans">
            სისტემა ცნობს ქართულ მეტყველებას, გამოყოფს 11-ნიშნა პირად ნომრებსა და ტელეფონებს.
          </p>
        </div>

        {/* Audio Waveform Simulator */}
        {isListening && (
          <div className="flex items-center gap-1.5 h-10 py-2">
            {[40, 75, 100, 60, 90, 45, 80, 100, 70, 50, 85, 65, 95, 30].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="w-1.5 bg-gradient-to-t from-[#00A3FF] to-[#00E5FF] rounded-full animate-pulse transition-all duration-150"
              />
            ))}
          </div>
        )}

        {/* Live Transcribed Speech Bubble */}
        {transcribedText && (
          <div className="w-full max-w-xl p-3.5 rounded-xl bg-white/[0.04] border border-[#00A3FF]/30 text-xs text-cyan-200 font-sans leading-relaxed flex items-start gap-2.5">
            <span className="text-base">💬</span>
            <div className="space-y-1 flex-1">
              <span className="text-[10px] font-mono text-gray-400 uppercase">ტრანსკრიბირებული ქართული ხმა:</span>
              <p className="font-medium text-white italic">{transcribedText}</p>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="flex items-center gap-2 font-mono text-xs text-[#00A3FF] animate-pulse">
            <span className="w-3 h-3 border-2 border-[#00A3FF] border-t-transparent rounded-full animate-spin" />
            <span>Gemini Flash Vision/NLP Entity Extraction...</span>
          </div>
        )}
      </div>

      {/* Extracted Smart Confirmation Card */}
      {extractedData && (
        <SmartConfirmationCard
          data={extractedData}
          onApprove={handleApprove}
          onReject={handleReject}
          isCommitted={isCommitted}
        />
      )}
    </div>
  );
};
