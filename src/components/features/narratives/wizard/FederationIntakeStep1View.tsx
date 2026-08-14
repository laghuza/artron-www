"use client";

import CustomSelect from "@/components/ui/CustomSelect";
import DiagnosticCell from "@/components/ui/DiagnosticCell";
import { formatFedCode } from "@/components/features/narratives/wizard/wizardUtils";

interface FederationIntakeStep1ViewProps {
  fedName: string;
  setFedName: (v: string) => void;
  legalForm: string;
  setLegalForm: (v: string) => void;
  fedCode: string;
  setFedCode: (v: string) => void;
  sportsType: string;
  setSportsType: (v: string) => void;
  isFedStep1Valid: boolean;
  setStep: (s: number) => void;
  setFlow: (f: 'gateway_dispatcher' | 'federation' | 'club') => void;
}

export default function FederationIntakeStep1View({
  fedName, setFedName, legalForm, setLegalForm, fedCode, setFedCode,
  sportsType, setSportsType, isFedStep1Valid, setStep, setFlow
}: FederationIntakeStep1ViewProps) {
  return (
    <div className="space-y-4 flex-1 flex flex-col justify-between">
      <div>
        <div className="space-y-1 mb-4">
          <div className="font-mono text-[9.5px] text-[#9CA3AF] uppercase tracking-widest flex justify-between">
            <span>[ FEDERATION_INTEGRATION: STEP_01_OF_03 ]</span>
            <span><span className="text-[#00ff87]">●</span> <span className="text-[#9CA3AF]/10">○ ○</span></span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#F5F5F7] uppercase">FEDERATION IDENTITY</h2>
        </div>
        <div className="space-y-1">
          <DiagnosticCell coordinate="[ ADM_01.1 // FEDERATION_NAME ]" placeholder="საქართველოს კალათბურთის ეროვნული ფედერაცია" value={fedName} onChange={setFedName} isValid={fedName.trim() !== ""} />
          <CustomSelect options={[legalForm]} selected={legalForm} onChange={setLegalForm} label="[ ADM_01.2 // LEGAL_FORM ]" disabled={true} />
          <DiagnosticCell coordinate="[ ADM_01.3 // IDENTIFICATION_CODE ]" placeholder="204 123 456" value={fedCode} onChange={(val) => setFedCode(formatFedCode(val))} isValid={fedCode.replace(/\s/g, '').length === 9} telemetryStatus={`[ CHAR_LIMIT: ${fedCode.replace(/\s/g, '').length}/9 ]`} />
          <DiagnosticCell coordinate="[ ADM_01.4 // SPORTS_TYPE_TAGS ]" placeholder="ჭადრაკი, ფეხბურთი, რაგბი" value={sportsType} onChange={setSportsType} isValid={sportsType.trim() !== ""} />
        </div>
      </div>
      <div className="space-y-3">
        <div className="p-3 border border-[#9CA3AF]/10 bg-[#121418]/50 text-[#9CA3AF] font-mono text-[11px] uppercase tracking-wider leading-relaxed">[ SYSTEM_LOG ]: მიუთითეთ ფედერაციის იურიდიული მონაცემები. საიდენტიფიკაციო კოდი გამოყენებული იქნება კავშირის დასამყარებლად საჯარო რეესტრის მონაცემთა ბაზასთან.</div>
        <div className="flex gap-4 font-mono text-xs">
          <button type="button" onClick={() => setFlow('gateway_dispatcher')} className="flex-1 py-3 px-4 border border-[#9CA3AF]/20 text-[#9CA3AF] hover:bg-[#9CA3AF]/10 transition-all uppercase cursor-pointer">[ DISPATCHER ]</button>
          <button type="button" disabled={!isFedStep1Valid} onClick={() => setStep(2)} className={`flex-1 py-3 px-4 font-bold border transition-all uppercase cursor-pointer ${isFedStep1Valid ? 'border-[#00ff87] text-[#00ff87] bg-[#00ff87]/10 hover:bg-[#00ff87] hover:text-[#121418]' : 'border-[#9CA3AF]/10 text-[#9CA3AF]/30 cursor-not-allowed'}`}>[ CONTINUE PROTOCOL ]</button>
        </div>
      </div>
    </div>
  );
}
