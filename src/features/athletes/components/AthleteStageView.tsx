"use client";

import { useAthleteManagement } from "../hooks/useAthleteManagement";
import { audioManager } from "@/lib/audioManager";

interface AthleteStageViewProps {
  onBack?: () => void;
}

export default function AthleteStageView({ onBack }: AthleteStageViewProps) {
  const { athletes, selectedAthlete, setSelectedAthleteId, filter, setFilter } = useAthleteManagement();

  return (
    <div className="w-full bg-[#121418]/90 border border-[#9CA3AF]/18 backdrop-blur-[12px] p-5 rounded-md shadow-xl text-left space-y-4 font-sans text-left">
      {/* Stage Header */}
      <div className="flex justify-between items-center border-b border-[#9CA3AF]/18 pb-3">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#00ff87]">
            [ DOMAIN // ATHLETE_BIOMETRICS_HUD ]
          </span>
          <h2 className="text-base font-semibold text-[#F5F5F3] uppercase tracking-tight">
            User & Athlete Management
          </h2>
        </div>
        {onBack && (
          <button
            onClick={() => {
              audioManager.playClick();
              onBack();
            }}
            className="font-mono text-[10px] text-[#9CA3AF] hover:text-[#00ff87] border border-[#9CA3AF]/20 px-2 py-1 rounded transition-colors cursor-pointer"
          >
            [ &lt;- RETURN ]
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 font-mono text-[10px]">
        {(["all", "active", "high-fatigue"] as const).map((f) => (
          <button
            key={f}
            onClick={() => {
              audioManager.playClick();
              setFilter(f);
            }}
            className={`px-2.5 py-1 rounded border uppercase transition-colors cursor-pointer ${
              filter === f
                ? "border-[#00ff87] bg-[#00ff87]/10 text-[#00ff87]"
                : "border-[#9CA3AF]/18 text-[#9CA3AF] hover:border-[#9CA3AF]/40"
            }`}
          >
            {f.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Roster & Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Roster List */}
        <div className="space-y-2">
          <div className="font-mono text-[9px] text-[#6B7280] uppercase tracking-widest">
            [ ATHLETE_ROSTER_STREAM ]
          </div>
          <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
            {athletes.map((ath) => {
              const isSelected = selectedAthlete?.id === ath.id;
              return (
                <div
                  key={ath.id}
                  onClick={() => {
                    audioManager.playClick();
                    setSelectedAthleteId(ath.id);
                  }}
                  className={`p-2.5 rounded border text-left cursor-pointer transition-all ${
                    isSelected
                      ? "border-[#00ff87] bg-[#00ff87]/10"
                      : "border-[#9CA3AF]/18 bg-[#1A1D23]/60 hover:border-[#9CA3AF]/40"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-medium text-[#F5F5F3]">
                      {ath.firstName} {ath.lastName}
                    </span>
                    <span className="font-mono text-[9px] text-[#00ff87]">
                      ● {ath.biometrics.heartRateBpm} BPM
                    </span>
                  </div>
                  <div className="font-mono text-[9px] text-[#9CA3AF] mt-0.5 flex justify-between">
                    <span>{ath.category}</span>
                    <span>FATIGUE: {ath.biometrics.fatigueScore}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Biometrics Radar Panel */}
        {selectedAthlete && (
          <div className="bg-[#1A1D23] border border-[#00ff87]/30 p-3.5 rounded space-y-3 font-mono text-[10px]">
            <div className="flex justify-between items-start border-b border-[#9CA3AF]/18 pb-2">
              <div>
                <span className="text-[9px] text-[#6B7280] uppercase">[ TELEMETRY_PROFILE ]</span>
                <div className="text-[13px] font-medium text-[#F5F5F3] font-sans">
                  {selectedAthlete.firstName} {selectedAthlete.lastName}
                </div>
              </div>
              <span className="px-1.5 py-0.5 border border-[#00ff87]/40 bg-[#00ff87]/10 text-[#00ff87] text-[8.5px] uppercase rounded">
                AES-256 PII ENCRYPTED
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-left">
              <div className="bg-[#121418] p-2 rounded border border-[#9CA3AF]/15">
                <span className="text-[#6B7280] text-[8.5px] block">VO2 MAX</span>
                <span className="text-[#00ff87] font-medium text-[12px]">{selectedAthlete.biometrics.vo2Max} mL/kg</span>
              </div>
              <div className="bg-[#121418] p-2 rounded border border-[#9CA3AF]/15">
                <span className="text-[#6B7280] text-[8.5px] block">TOP SPEED</span>
                <span className="text-[#00ff87] font-medium text-[12px]">{selectedAthlete.biometrics.speedMs} m/s</span>
              </div>
              <div className="bg-[#121418] p-2 rounded border border-[#9CA3AF]/15">
                <span className="text-[#6B7280] text-[8.5px] block">FATIGUE INDEX</span>
                <span className="text-[#00ff87] font-medium text-[12px]">{selectedAthlete.biometrics.fatigueScore}%</span>
              </div>
              <div className="bg-[#121418] p-2 rounded border border-[#9CA3AF]/15">
                <span className="text-[#6B7280] text-[8.5px] block">PASSKEY STATUS</span>
                <span className="text-[#00ff87] font-medium text-[12px] uppercase">{selectedAthlete.passkeyStatus}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
