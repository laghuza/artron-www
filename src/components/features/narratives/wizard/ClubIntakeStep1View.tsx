"use client";

import CustomSelect from "@/components/ui/CustomSelect";
import DiagnosticCell from "@/components/ui/DiagnosticCell";
import { formatFedCode } from "@/components/features/narratives/wizard/wizardUtils";

interface ClubIntakeStep1ViewProps {
  clubName: string; setClubName: (v: string) => void;
  clubLegalForm: string; setClubLegalForm: (v: string) => void;
  clubCode: string; setClubCode: (v: string) => void;
  clubServices: string; setClubServices: (v: string) => void;
  isClubStep1Valid: boolean;
  setStep: (s: number) => void;
  setFlow: (f: 'gateway_dispatcher' | 'federation' | 'club') => void;
}

export default function ClubIntakeStep1View({
  clubName, setClubName, clubLegalForm, setClubLegalForm, clubCode, setClubCode,
  clubServices, setClubServices, isClubStep1Valid, setStep, setFlow
}: ClubIntakeStep1ViewProps) {
  return (
    <div className="space-y-4 flex-1 flex flex-col justify-between">
      <div>
        <div className="space-y-1 mb-4">
          <div className="font-mono text-[9.5px] text-[#9CA3AF] uppercase tracking-widest flex justify-between">
            <span>[ CLUB_INTEGRATION: STEP_01_OF_03 ]</span>
            <span><span className="text-[#00ff87]">●</span> <span className="text-[#9CA3AF]/10">○ ○</span></span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#F5F5F7] uppercase">FACILITY IDENTITY</h2>
        </div>
        <div className="space-y-1">
          <DiagnosticCell coordinate="[ ORG_01.1 // LEGAL_ENTITY_NAME ]" placeholder="ააიპ ქუთაისის საცურაო აკადემია" value={clubName} onChange={setClubName} isValid={clubName.trim() !== ""} />
          <CustomSelect options={["შპს", "ააიპ", "ინდ. მეწარმე"]} selected={clubLegalForm} onChange={setClubLegalForm} label="[ LEGAL_DESCRIPTOR // FORM ]" />
          <DiagnosticCell coordinate="[ DATABASE_KEY // REGISTRY_CODE ]" placeholder="204 123 456" value={clubCode} onChange={(val) => setClubCode(formatFedCode(val))} isValid={clubCode.replace(/\s/g, '').length === 9} telemetryStatus={`[ CHAR_LIMIT: ${clubCode.replace(/\s/g, '').length}/9 ]`} />
          <DiagnosticCell coordinate="[ TELEMETRY_CLASS // SPORT_SERVICES ]" placeholder="ფიტნესი, საცურაო აუზი, ტანვარჯიში" value={clubServices} onChange={setClubServices} isValid={clubServices.trim() !== ""} />
        </div>
      </div>
      <div className="space-y-3">
        <div className="p-3 border border-[#9CA3AF]/10 bg-[#121418]/50 text-[#9CA3AF] font-mono text-[11px] uppercase tracking-wider leading-relaxed">[ SYSTEM_LOG ]: მიუთითეთ სპორტული ორგანიზაციის იურიდიული მონაცემები. საიდენტიფიკაციო კოდი გამოყენებული იქნება საგადასახადო და უსაფრთხოების ფილტრის გასავლებლად.</div>
        <div className="flex gap-4 font-mono text-xs">
          <button type="button" onClick={() => setFlow('gateway_dispatcher')} className="flex-1 py-3 px-4 border border-[#9CA3AF]/20 text-[#9CA3AF] hover:bg-[#9CA3AF]/10 transition-all uppercase cursor-pointer">[ DISPATCHER ]</button>
          <button type="button" disabled={!isClubStep1Valid} onClick={() => setStep(2)} className={`flex-1 py-3 px-4 font-bold border transition-all uppercase cursor-pointer ${isClubStep1Valid ? 'border-[#00ff87] text-[#00ff87] bg-[#00ff87]/10 hover:bg-[#00ff87] hover:text-[#121418]' : 'border-[#9CA3AF]/10 text-[#9CA3AF]/30 cursor-not-allowed'}`}>[ CONTINUE PROTOCOL ]</button>
        </div>
      </div>
    </div>
  );
}
