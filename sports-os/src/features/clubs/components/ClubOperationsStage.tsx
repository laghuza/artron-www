"use client";

import { useClubOperations } from "../hooks/useClubOperations";
import { audioManager } from "@/lib/audioManager";

interface ClubOperationsStageProps {
  onBack?: () => void;
}

export default function ClubOperationsStage({ onBack }: ClubOperationsStageProps) {
  const { clubs, selectedClub, setSelectedClubId } = useClubOperations();

  return (
    <div className="w-full bg-[#121418]/90 border border-[#9CA3AF]/18 backdrop-blur-[12px] p-5 rounded-md shadow-xl text-left space-y-4 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#9CA3AF]/18 pb-3">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#00E676]">
            [ DOMAIN // ACADEMY_OPERATIONS_DIGITAL_TWIN ]
          </span>
          <h2 className="text-base font-semibold text-[#F5F5F3] uppercase tracking-tight">
            Academy Operations & Turnstile Facility Blueprint
          </h2>
        </div>
        {onBack && (
          <button
            onClick={() => {
              audioManager.playClick();
              onBack();
            }}
            className="font-mono text-[10px] text-[#9CA3AF] hover:text-[#00E676] border border-[#9CA3AF]/20 px-2 py-1 rounded transition-colors cursor-pointer"
          >
            [ &lt;- RETURN ]
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Clubs Selection */}
        <div className="space-y-2">
          <div className="font-mono text-[9px] text-[#6B7280] uppercase tracking-widest">
            [ ACADEMIES_AND_CLUBS ]
          </div>
          <div className="space-y-1.5">
            {clubs.map((club) => {
              const isSelected = selectedClub?.id === club.id;
              return (
                <div
                  key={club.id}
                  onClick={() => {
                    audioManager.playClick();
                    setSelectedClubId(club.id);
                  }}
                  className={`p-2.5 rounded border text-left cursor-pointer transition-all ${
                    isSelected
                      ? "border-[#00E676] bg-[#00E676]/10"
                      : "border-[#9CA3AF]/18 bg-[#1A1D23]/60 hover:border-[#9CA3AF]/40"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-medium text-[#F5F5F3]">
                      {club.name}
                    </span>
                    <span className="font-mono text-[9px] text-[#00E676]">
                      ● {club.academyType}
                    </span>
                  </div>
                  <div className="font-mono text-[9px] text-[#9CA3AF] mt-0.5 flex justify-between">
                    <span>TEAMS: {club.activeTeamsCount}</span>
                    <span>TURNSTILES: {club.facilityTurnstiles.length}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Club Digital Twin */}
        {selectedClub && (
          <div className="bg-[#1A1D23] border border-[#00E676]/30 p-3.5 rounded space-y-3 font-mono text-[10px]">
            <div className="flex justify-between items-start border-b border-[#9CA3AF]/18 pb-2">
              <div>
                <span className="text-[9px] text-[#6B7280] uppercase">[ FACILITY_DIGITAL_TWIN ]</span>
                <div className="text-[13px] font-medium text-[#F5F5F3] font-sans">
                  {selectedClub.name}
                </div>
              </div>
              <span className="px-1.5 py-0.5 border border-[#00E676]/40 bg-[#00E676]/10 text-[#00E676] text-[8.5px] uppercase rounded">
                EDGE HARDWARE ONLINE
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="text-[#6B7280] text-[8.5px] uppercase block">[ ACTIVE_RFID_TURNSTILES ]</span>
              {selectedClub.facilityTurnstiles.map((ts) => (
                <div key={ts.id} className="bg-[#121418] p-2 rounded border border-[#9CA3AF]/15 flex justify-between items-center">
                  <div>
                    <span className="text-[#F5F5F3] font-medium block text-[11px]">{ts.name}</span>
                    <span className="text-[#6B7280] text-[8.5px]">LAST SCAN: {ts.lastScanTimestamp}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#00E676] font-medium text-[11px] block">● {ts.passRatePerMin} PASS/MIN</span>
                    <span className="text-[#6B7280] text-[8.5px] uppercase">{ts.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
