"use client";

import Link from "next/link";
import DiagnosticCell from "@/components/ui/DiagnosticCell";
import ExecutiveEncryptionKeyInput from "../federationForm/ExecutiveEncryptionKeyInput";
import { formatPhone } from "./wizardUtils";

interface ClubIntakeStep3ViewProps {
  clubFirstName: string; setClubFirstName: (v: string) => void;
  clubLastName: string; setClubLastName: (v: string) => void;
  clubExecPosition: string; setClubExecutivePosition: (v: string) => void;
  clubContactMobile: string; setClubContactMobile: (v: string) => void;
  clubOfficialEmail: string; setClubOfficialEmail: (v: string) => void;
  clubAccessCode: string; setClubAccessCode: (v: string) => void;
  clubShowPassword: boolean; setClubShowPassword: (v: boolean) => void;
  clubIsAgreed: boolean; setClubIsAgreed: (v: boolean) => void;
  isClubStep3Valid: boolean;
  setStep: (s: number) => void;
  setIsSuccess: (s: boolean) => void;
}

export default function ClubIntakeStep3View({
  clubFirstName, setClubFirstName, clubLastName, setClubLastName,
  clubExecPosition, setClubExecutivePosition, clubContactMobile, setClubContactMobile,
  clubOfficialEmail, setClubOfficialEmail, clubAccessCode, setClubAccessCode,
  clubShowPassword, setClubShowPassword, clubIsAgreed, setClubIsAgreed,
  isClubStep3Valid, setStep, setIsSuccess
}: ClubIntakeStep3ViewProps) {
  return (
    <div className="space-y-4 flex-1 flex flex-col justify-between">
      <div>
        <div className="space-y-1 mb-4">
          <div className="font-mono text-[9.5px] text-[#9CA3AF] uppercase tracking-widest flex justify-between">
            <span>[ CLUB_INTEGRATION: STEP_03_OF_03 ]</span>
            <span><span className="text-[#00E676]">● ● ●</span></span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#F5F5F7] uppercase">SUBSCRIBER AUTHORITY</h2>
        </div>
        <div className="space-y-1">
          <DiagnosticCell coordinate="[ REP_IDENTITY // FIRST_NAME ]" placeholder="ნიკოლოზ" value={clubFirstName} onChange={setClubFirstName} isValid={clubFirstName.trim() !== ""} />
          <DiagnosticCell coordinate="[ REP_IDENTITY // LAST_NAME ]" placeholder="ყიფიანი" value={clubLastName} onChange={setClubLastName} isValid={clubLastName.trim() !== ""} />
          <DiagnosticCell coordinate="[ DEPLOYED_ROLE // OFFICIAL_POSITION ]" placeholder="დამფუძნებელი / გენერალური მენეჯერი / დირექტორი" value={clubExecPosition} onChange={setClubExecutivePosition} isValid={clubExecPosition.trim() !== ""} />
          <DiagnosticCell coordinate="[ COMM_LINK // MOBILE_PHONE ]" placeholder="+995 (599) 12 34 56" value={clubContactMobile} onChange={(val) => setClubContactMobile(formatPhone(val))} isValid={clubContactMobile.replace(/\D/g, '').length === 12} />
          <DiagnosticCell coordinate="[ ACCESS_GATEWAY // OFFICIAL_EMAIL ]" placeholder="OFFICE@CLUB.GE" value={clubOfficialEmail} onChange={setClubOfficialEmail} isValid={clubOfficialEmail.includes("@")} />
          <ExecutiveEncryptionKeyInput accessCode={clubAccessCode} setAccessCode={setClubAccessCode} showPassword={clubShowPassword} setShowPassword={setClubShowPassword} />
          <div className="border border-dashed border-[#9CA3AF]/10 bg-[#121418]/30 p-3 mb-4 rounded-none">
            <span className="text-[#9CA3AF] text-[8.5px] font-mono block tracking-widest uppercase mb-2">[ PROTOCOL_09 // COMPLIANCE_AND_CONSENT_REGISTRY ]</span>
            <div className="flex items-start gap-2">
              <button type="button" onClick={() => setClubIsAgreed(!clubIsAgreed)} className="text-[#00E676] hover:text-white font-mono text-xs focus:outline-none cursor-pointer mt-0.5">{clubIsAgreed ? '[ X ]' : '[   ]'}</button>
              <p className="text-[10px] text-[#9CA3AF] uppercase leading-relaxed tracking-wider">მე ვადასტურებ, რომ მაქვს უფლებამოსილება წარმოვადგინო ეს კლუბი და ვეთანხმები Artron-ის <Link href="/sla" target="_blank" className="text-[#00E676] hover:underline transition-all cursor-pointer font-semibold">[SLA]</Link> და <Link href="/privacy" target="_blank" className="text-[#00E676] hover:underline transition-all cursor-pointer font-semibold">[კონფიდენციალურობის პოლიტიკას]</Link>.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="p-3 border border-[#9CA3AF]/10 bg-[#121418]/50 text-[#9CA3AF] font-mono text-[11px] uppercase tracking-wider leading-relaxed">[ SYSTEM_LOG ]: იქმნება კლუბის მმართველი ადმინისტრატორის ანგარიში. ამ მომხმარებელს მიენიჭება სრული კრიპტოგრაფიული გასაღები ფილიალების, აბონემენტების და მოვარჯიშეების სამართავად.</div>
        <div className="flex gap-4 pt-2 font-mono text-xs">
          <button type="button" onClick={() => setStep(2)} className="flex-1 py-3 px-4 border border-[#9CA3AF]/20 text-[#9CA3AF] hover:bg-[#9CA3AF]/10 transition-all uppercase cursor-pointer">[ BACK ]</button>
          <button type="button" disabled={!isClubStep3Valid} onClick={() => setIsSuccess(true)} className={`flex-1 py-3 px-4 font-bold border transition-all uppercase cursor-pointer ${isClubStep3Valid ? 'border-[#00E676] text-[#00E676] bg-[#00E676]/10 hover:bg-[#00E676] hover:text-[#121418]' : 'border-[#9CA3AF]/10 text-[#9CA3AF]/30 cursor-not-allowed'}`}>[ REGISTER_CORE ]</button>
        </div>
      </div>
    </div>
  );
}
