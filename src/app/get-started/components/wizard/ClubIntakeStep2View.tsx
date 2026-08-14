"use client";

import DiagnosticCell from "../ui/DiagnosticCell";

interface ClubIntakeStep2ViewProps {
  clubAddress: string; setClubAddress: (v: string) => void;
  branchesCount: string; setBranchesCount: (v: string) => void;
  gatesCount: string; setAccessGatesCount: (v: string) => void;
  isClubStep2Valid: boolean;
  setStep: (s: number) => void;
}

export default function ClubIntakeStep2View({
  clubAddress, setClubAddress, branchesCount, setBranchesCount,
  gatesCount, setAccessGatesCount, isClubStep2Valid, setStep
}: ClubIntakeStep2ViewProps) {
  return (
    <div className="space-y-4 flex-1 flex flex-col justify-between">
      <div>
        <div className="space-y-1 mb-4">
          <div className="font-mono text-[9.5px] text-[#9CA3AF] uppercase tracking-widest flex justify-between">
            <span>[ CLUB_INTEGRATION: STEP_02_OF_03 ]</span>
            <span><span className="text-[#00ff87]">● ●</span> <span className="text-[#9CA3AF]/10">○</span></span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#F5F5F7] uppercase">PHYSICAL CAPACITY & TELEMETRY</h2>
        </div>
        <div className="space-y-1">
          <DiagnosticCell coordinate="[ DEPLOYMENT_ADDRESS // HQ_LOCATION ]" placeholder="ქ. ქუთაისი, რუსთაველის გამზირი 24" value={clubAddress} onChange={setClubAddress} isValid={clubAddress.trim() !== ""} />
          <DiagnosticCell coordinate="[ OPERATIONAL_METRICS // ACTIVE_BRANCHES ]" placeholder="მოქმედი ფილიალების რაოდენობა" value={branchesCount} onChange={setBranchesCount} isValid={branchesCount.trim() !== ""} />
          <DiagnosticCell coordinate="[ HARDWARE_NODES // PLANNED_ACCESS_GATES ]" placeholder="ტურნიკეტების რაოდენობა" value={gatesCount} onChange={setAccessGatesCount} isValid={gatesCount.trim() !== ""} />
        </div>
      </div>
      <div className="space-y-3">
        <div className="p-3 border border-[#9CA3AF]/10 bg-[#121418]/50 text-[#9CA3AF] font-mono text-[11px] uppercase tracking-wider leading-relaxed">[ SYSTEM_LOG ]: მიუთითეთ მოქმედი ფილიალებისა და ტექნიკური წვდომის წერტილების (ტურნიკეტების) რაოდენობა. სისტემა ავტომატურად გაამზადებს შესაბამის Hardware API არქიტექტურას თქვენი ობიექტებისთვის.</div>
        <div className="flex gap-4 font-mono text-xs">
          <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 px-4 border border-[#9CA3AF]/20 text-[#9CA3AF] hover:bg-[#9CA3AF]/10 transition-all uppercase cursor-pointer">[ BACK ]</button>
          <button type="button" disabled={!isClubStep2Valid} onClick={() => setStep(3)} className={`flex-1 py-3 px-4 font-bold border transition-all uppercase cursor-pointer ${isClubStep2Valid ? 'border-[#00ff87] text-[#00ff87] bg-[#00ff87]/10 hover:bg-[#00ff87] hover:text-[#121418]' : 'border-[#9CA3AF]/10 text-[#9CA3AF]/30 cursor-not-allowed'}`}>[ CONTINUE ]</button>
        </div>
      </div>
    </div>
  );
}
