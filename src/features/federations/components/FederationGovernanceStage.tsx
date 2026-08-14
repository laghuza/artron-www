"use client";

import { useFederationGovernance } from "../hooks/useFederationGovernance";
import { audioManager } from "@/lib/audioManager";

interface FederationGovernanceStageProps {
  onBack?: () => void;
}

export default function FederationGovernanceStage({ onBack }: FederationGovernanceStageProps) {
  const { federations, selectedFederation, setSelectedFedId } = useFederationGovernance();

  return (
    <div className="w-full bg-[#121418]/90 border border-[#9CA3AF]/18 backdrop-blur-[12px] p-5 rounded-md shadow-xl text-left space-y-4 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#9CA3AF]/18 pb-3">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#00ff87]">
            [ DOMAIN // SOVEREIGN_FEDERATION_GOVERNANCE ]
          </span>
          <h2 className="text-base font-semibold text-[#F5F5F3] uppercase tracking-tight">
            National Federation Governance & Licensing
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Federation List */}
        <div className="space-y-2">
          <div className="font-mono text-[9px] text-[#6B7280] uppercase tracking-widest">
            [ REGISTERED_FEDERATIONS ]
          </div>
          <div className="space-y-1.5">
            {federations.map((fed) => {
              const isSelected = selectedFederation?.id === fed.id;
              return (
                <div
                  key={fed.id}
                  onClick={() => {
                    audioManager.playClick();
                    setSelectedFedId(fed.id);
                  }}
                  className={`p-2.5 rounded border text-left cursor-pointer transition-all ${
                    isSelected
                      ? "border-[#00ff87] bg-[#00ff87]/10"
                      : "border-[#9CA3AF]/18 bg-[#1A1D23]/60 hover:border-[#9CA3AF]/40"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-medium text-[#F5F5F3]">
                      {fed.name}
                    </span>
                    <span className="font-mono text-[9px] text-[#00ff87]">
                      ● {fed.code}
                    </span>
                  </div>
                  <div className="font-mono text-[9px] text-[#9CA3AF] mt-0.5 flex justify-between">
                    <span>CLUBS: {fed.clubsCount}</span>
                    <span>ATHLETES: {fed.athletesCount.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Federation Cryptographic Gateway Details */}
        {selectedFederation && (
          <div className="bg-[#1A1D23] border border-[#00ff87]/30 p-3.5 rounded space-y-3 font-mono text-[10px]">
            <div className="flex justify-between items-start border-b border-[#9CA3AF]/18 pb-2">
              <div>
                <span className="text-[9px] text-[#6B7280] uppercase">[ CRYPTOGRAPHIC_GATEWAY ]</span>
                <div className="text-[13px] font-medium text-[#F5F5F3] font-sans">
                  {selectedFederation.name}
                </div>
              </div>
              <span className="px-1.5 py-0.5 border border-[#00ff87]/40 bg-[#00ff87]/10 text-[#00ff87] text-[8.5px] uppercase rounded">
                ● {selectedFederation.gateway.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-left">
              <div className="bg-[#121418] p-2 rounded border border-[#9CA3AF]/15">
                <span className="text-[#6B7280] text-[8.5px] block">KEY ID</span>
                <span className="text-[#00ff87] font-medium text-[11px]">{selectedFederation.gateway.keyId}</span>
              </div>
              <div className="bg-[#121418] p-2 rounded border border-[#9CA3AF]/15">
                <span className="text-[#6B7280] text-[8.5px] block">ALGORITHM</span>
                <span className="text-[#00ff87] font-medium text-[11px]">{selectedFederation.gateway.algorithm}</span>
              </div>
              <div className="bg-[#121418] p-2 rounded border border-[#9CA3AF]/15">
                <span className="text-[#6B7280] text-[8.5px] block">SYSTEM LOAD</span>
                <span className="text-[#00ff87] font-medium text-[11px]">{selectedFederation.gateway.systemLoadPct}%</span>
              </div>
              <div className="bg-[#121418] p-2 rounded border border-[#9CA3AF]/15">
                <span className="text-[#6B7280] text-[8.5px] block">LICENSED UNTIL</span>
                <span className="text-[#00ff87] font-medium text-[11px]">{selectedFederation.licensedUntil}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
