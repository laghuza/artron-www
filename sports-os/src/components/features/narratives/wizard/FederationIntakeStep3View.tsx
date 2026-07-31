"use client";

import Link from "next/link";
import DiagnosticCell from "@/components/ui/DiagnosticCell";
import ExecutiveEncryptionKeyInput from "../federationForm/ExecutiveEncryptionKeyInput";
import { formatPhone } from "./wizardUtils";

interface FederationIntakeStep3ViewProps {
  firstName: string; setFirstName: (v: string) => void;
  lastName: string; setLastName: (v: string) => void;
  execPosition: string; setExecutivePosition: (v: string) => void;
  contactMobile: string; setContactMobile: (v: string) => void;
  officialEmail: string; setOfficialEmail: (v: string) => void;
  accessCode: string; setAccessCode: (v: string) => void;
  showPassword: boolean; setShowPassword: (v: boolean) => void;
  isAgreed: boolean; setIsAgreed: (v: boolean) => void;
  isFedStep3Valid: boolean;
  setStep: (s: number) => void;
  setIsSuccess: (s: boolean) => void;
}

export default function FederationIntakeStep3View({
  firstName, setFirstName, lastName, setLastName, execPosition, setExecutivePosition,
  contactMobile, setContactMobile, officialEmail, setOfficialEmail, accessCode, setAccessCode,
  showPassword, setShowPassword, isAgreed, setIsAgreed, isFedStep3Valid, setStep, setIsSuccess
}: FederationIntakeStep3ViewProps) {
  return (
    <div className="space-y-4 flex-1 flex flex-col justify-between">
      <div>
        <div className="space-y-1 mb-4">
          <div className="font-mono text-[9.5px] text-[#9CA3AF] uppercase tracking-widest flex justify-between">
            <span>[ CALIBRATION_SEQUENCE: NODE_03_OF_03 ]</span>
            <span><span className="text-[#00E676]">● ● ●</span></span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#F5F5F7] uppercase">EXECUTIVE AUTHORITY</h2>
        </div>
        <div className="space-y-1">
          <DiagnosticCell coordinate="[ REP_IDENTITY // FIRST_NAME ]" placeholder="ნიკოლოზ" value={firstName} onChange={setFirstName} isValid={firstName.trim() !== ""} />
          <DiagnosticCell coordinate="[ REP_IDENTITY // LAST_NAME ]" placeholder="ყიფიანი" value={lastName} onChange={setLastName} isValid={lastName.trim() !== ""} />
          <DiagnosticCell coordinate="[ DEPLOYED_ROLE // OFFICIAL_POSITION ]" placeholder="პრეზიდენტი / გენერალური მდივანი" value={execPosition} onChange={setExecutivePosition} isValid={execPosition.trim() !== ""} />
          <DiagnosticCell coordinate="[ COMM_LINK // MOBILE_PHONE ]" placeholder="+995 (599) 12 34 56" value={contactMobile} onChange={(val) => setContactMobile(formatPhone(val))} isValid={contactMobile.replace(/\D/g, '').length === 12} />
          <DiagnosticCell coordinate="[ ACCESS_GATEWAY // OFFICIAL_EMAIL ]" placeholder="OFFICE@FEDERATION.GE" value={officialEmail} onChange={setOfficialEmail} isValid={officialEmail.includes("@")} />
          <ExecutiveEncryptionKeyInput accessCode={accessCode} setAccessCode={setAccessCode} showPassword={showPassword} setShowPassword={setShowPassword} />
          <div className="border border-dashed border-[#9CA3AF]/10 bg-[#121418]/30 p-3 mb-4 rounded-none">
            <span className="text-[#9CA3AF] text-[8.5px] font-mono block tracking-widest uppercase mb-2">[ PROTOCOL_09 // COMPLIANCE_AND_CONSENT_REGISTRY ]</span>
            <div className="flex items-start gap-2">
              <button type="button" onClick={() => setIsAgreed(!isAgreed)} className="text-[#00E676] hover:text-white font-mono text-xs focus:outline-none cursor-pointer mt-0.5">{isAgreed ? '[ X ]' : '[   ]'}</button>
              <p className="text-[10px] text-[#9CA3AF] uppercase leading-relaxed tracking-wider">მე ვადასტურებ, რომ მაქვს უფლებამოსილება წარმოვადგინო ეს ფედერაცია და ვეთანხმები Artron-ის <Link href="/sla" target="_blank" className="text-[#00E676] hover:underline transition-all cursor-pointer font-semibold">[SLA]</Link> და <Link href="/privacy" target="_blank" className="text-[#00E676] hover:underline transition-all cursor-pointer font-semibold">[კონფიდენციალურობის პოლიტიკას]</Link>.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="p-3 border border-[#9CA3AF]/10 bg-[#121418]/50 text-[#9CA3AF] font-mono text-[11px] uppercase tracking-wider leading-relaxed">[ SYSTEM_LOG ]: იქმნება ფედერაციის მმართველი ადმინისტრატორის ანგარიში. ამ მომხმარებელს მიენიჭება სრული კრიპტოგრაფიული გასაღები ფედერაციის ადმინ-პანელზე.</div>
        <div className="flex gap-4 pt-2 font-mono text-xs">
          <button type="button" onClick={() => setStep(2)} className="flex-1 py-3 px-4 border border-[#9CA3AF]/20 text-[#9CA3AF] hover:bg-[#9CA3AF]/10 transition-all uppercase cursor-pointer">[ BACK ]</button>
          <button type="button" disabled={!isFedStep3Valid} onClick={() => setIsSuccess(true)} className={`flex-1 py-3 px-4 font-bold border transition-all uppercase cursor-pointer ${isFedStep3Valid ? 'border-[#00E676] text-[#00E676] bg-[#00E676]/10 hover:bg-[#00E676] hover:text-[#121418]' : 'border-[#9CA3AF]/10 text-[#9CA3AF]/30 cursor-not-allowed'}`}>[ REGISTER_CORE ]</button>
        </div>
      </div>
    </div>
  );
}
