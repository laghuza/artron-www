"use client";

import React, { useState } from 'react';
import { OCR_PRESETS } from '@/data/multimodalAiData';
import { OcrIdPreset, ExtractedEntityData } from '@/types/multimodalAi';
import { SmartConfirmationCard } from './SmartConfirmationCard';
import { ScanLine, User, CreditCard } from 'lucide-react';

interface VisionOcrSimProps {
  onActivityLog?: (msg: string) => void;
}

export const VisionOcrSim: React.FC<VisionOcrSimProps> = ({ onActivityLog }) => {
  const [selectedPreset, setSelectedPreset] = useState<OcrIdPreset>(OCR_PRESETS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [extractedData, setExtractedData] = useState<ExtractedEntityData | null>(null);
  const [isCommitted, setIsCommitted] = useState(false);

  const startOcrScan = (preset = selectedPreset) => {
    setIsScanning(true);
    setScanProgress(0);
    setExtractedData(null);
    setIsCommitted(false);

    if (onActivityLog) {
      onActivityLog(`[AI Camera Viewfinder] კამერამ ამოიცნო დოკუმენტის ჩარჩო: ${preset.titleKa}`);
    }

    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setScanProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        setExtractedData(preset.extractedData);

        if (onActivityLog) {
          onActivityLog(`[Gemini Flash Vision] OCR ექსტრაქცია წარმატებულია (1.0 წმ). პირადი ნომერი: ${preset.extractedData.personalId} (0% შეცდომა)`);
        }
      }
    }, 180);
  };

  const handleApprove = (data: ExtractedEntityData) => {
    setIsCommitted(true);
    if (onActivityLog) {
      onActivityLog(`[PostgreSQL DB] პირადობის მოწმობის მონაცემები შეინახა ბაზაში. დროებითი ფოტო მყისიერად განადგურდა.`);
    }
  };

  const handleReject = () => {
    setExtractedData(null);
    setScanProgress(0);
    setIsCommitted(false);
    if (onActivityLog) {
      onActivityLog(`[Security Guard] ოპერატორმა უარყო OCR სკანირების შედეგი.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Document Preset Selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-gray-400">აირჩიეთ დოკუმენტის ტიპი:</span>
        {OCR_PRESETS.map((doc) => (
          <button
            key={doc.id}
            onClick={() => {
              setSelectedPreset(doc);
              setExtractedData(null);
              setIsCommitted(false);
            }}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer border flex items-center gap-1.5 ${
              selectedPreset.id === doc.id
                ? 'bg-[#00A3FF]/20 border-[#00A3FF] text-[#00E5FF] shadow-[0_0_12px_rgba(0,163,255,0.3)]'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-[#00A3FF]" />
            <span>{doc.titleKa}</span>
          </button>
        ))}
      </div>

      {/* Camera Viewfinder & Laser Scanner */}
      <div className="p-6 rounded-2xl bg-[#090D15] border border-white/10 flex flex-col items-center justify-center space-y-5 relative overflow-hidden shadow-inner">
        {/* Top Camera Status */}
        <div className="flex items-center justify-between w-full max-w-lg px-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="font-mono text-[11px] text-gray-300">LIVE WEBCAM STREAM [1080P 60FPS]</span>
          </div>
          <span className="font-mono text-[10px] text-[#00A3FF] bg-[#00A3FF]/10 px-2 py-0.5 rounded border border-[#00A3FF]/30">
            AUTO-EDGE DETECTION
          </span>
        </div>

        {/* Viewfinder ID Card Container */}
        <div className="relative w-full max-w-md aspect-[1.58/1] rounded-2xl bg-[#151D2A] border-2 border-dashed border-[#00A3FF]/50 p-4 shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Laser Scanning Line Animation */}
          {isScanning && (
            <div
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_15px_#00E5FF] z-20 transition-all duration-150 pointer-events-none"
              style={{ top: `${scanProgress}%` }}
            />
          )}

          {/* Corner Viewfinder Brackets */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#00A3FF]" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#00A3FF]" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#00A3FF]" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#00A3FF]" />

          {/* Card Mock Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 text-white border border-white/20">GE</span>
              <div>
                <div className="text-[11px] font-bold text-white tracking-wider">GEORGIA / საქართველო</div>
                <div className="text-[8px] font-mono text-gray-400">{selectedPreset.cardTypeKa}</div>
              </div>
            </div>
            <div className="text-right font-mono text-[9px] text-[#00A3FF]">
              DOC № {selectedPreset.documentNumber}
            </div>
          </div>

          {/* Card Mock Content */}
          <div className="flex items-center gap-4 my-auto">
            <div className="w-16 h-20 rounded-lg bg-black/40 border border-white/20 flex flex-col items-center justify-center text-gray-400 text-xs shadow-inner">
              <User className="w-6 h-6 text-gray-400" />
              <span className="text-[8px] font-mono mt-1 text-gray-400">PHOTO</span>
            </div>

            <div className="flex-1 space-y-1.5 text-left">
              <div>
                <div className="text-[8px] font-mono text-gray-400 uppercase">SURNAME, NAME / გვარი, სახელი</div>
                <div className="text-xs font-bold text-white">
                  {selectedPreset.extractedData.fullNameKa} / {selectedPreset.extractedData.fullNameEn}
                </div>
              </div>
              <div>
                <div className="text-[8px] font-mono text-gray-400 uppercase">PERSONAL NO / პირადი №</div>
                <div className="text-xs font-mono font-bold text-cyan-300">
                  {selectedPreset.extractedData.personalId}
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <div className="text-[7px] font-mono text-gray-400 uppercase">BIRTH / დაბადება</div>
                  <div className="text-[10px] font-mono text-gray-300">{selectedPreset.extractedData.birthDate}</div>
                </div>
                <div>
                  <div className="text-[7px] font-mono text-gray-400 uppercase">EXPIRY / მოქმედება</div>
                  <div className="text-[10px] font-mono text-gray-300">{selectedPreset.extractedData.expiryDate}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Chip & Bottom Barcode */}
          <div className="flex items-center justify-between pt-1.5 border-t border-white/10 font-mono text-[8px] text-gray-500">
            <span>CHIP ID: 0x88F2A9</span>
            <span>||| | |||| | ||| ||||| | ||</span>
          </div>
        </div>

        {/* Scan Action Button */}
        <button
          onClick={() => startOcrScan()}
          disabled={isScanning}
          className={`py-3 px-6 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all ${
            isScanning
              ? 'bg-[#00A3FF]/20 text-[#00A3FF] border border-[#00A3FF]/40 cursor-wait'
              : 'bg-gradient-to-r from-[#00A3FF] to-[#00D2FF] text-white shadow-[0_0_25px_rgba(0,163,255,0.4)] hover:opacity-95'
          }`}
        >
          <ScanLine className="w-4 h-4" />
          <span>{isScanning ? 'მიმდინარეობს 1-წამიანი OCR სკანირება...' : 'პირადობის მოწმობის დასკანერება'}</span>
        </button>
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
