"use client";

import Link from "next/link";
import DiagnosticCell from "@/components/ui/DiagnosticCell";
import { formatPhone } from "../wizard/wizardUtils";
import ExecutiveEncryptionKeyInput from "./ExecutiveEncryptionKeyInput";

interface FederationFormStep3ViewProps {
  firstName: string; setFirstName: (v: string) => void;
  lastName: string; setLastName: (v: string) => void;
  execPosition: string; setExecutivePosition: (v: string) => void;
  contactMobile: string; setContactMobile: (v: string) => void;
  officialEmail: string; setOfficialEmail: (v: string) => void;
  accessCode: string; setAccessCode: (v: string) => void;
  showPassword: boolean; setShowPassword: (v: boolean) => void;
  isAgreed: boolean; setIsAgreed: (v: boolean) => void;
  isStep3Valid: boolean;
  setStep: (step: number) => void;
  setIsSuccess: (s: boolean) => void;
}

export default function FederationFormStep3View({
  firstName, setFirstName, lastName, setLastName, execPosition, setExecutivePosition,
  contactMobile, setContactMobile, officialEmail, setOfficialEmail, accessCode, setAccessCode,
  showPassword, setShowPassword, isAgreed, setIsAgreed, isStep3Valid, setStep, setIsSuccess
}: FederationFormStep3ViewProps) {
  return (
    <div className="space-y-4 flex-1 flex flex-col justify-between">
      <div>
        <div className="space-y-1 mb-4">
          <div className="font-mono text-[9.5px] text-[#9CA3AF] uppercase tracking-widest flex justify-between">
            <span>[ CALIBRATION_SEQUENCE: NODE_03_OF_03 ]</span>
            <span>
              <span className="text-[#00E676]">● ● ●</span>
            </span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#F5F5F7] uppercase">
            EXECUTIVE AUTHORITY
          </h2>
        </div>

        <div className="space-y-1">
          <div className="grid grid-cols-2 gap-4">
            <DiagnosticCell
              coordinate="[ FIRST_NAME ]"
              placeholder="ნიკოლოზ"
              value={firstName}
              onChange={(val) => setFirstName(val)}
              isValid={firstName.trim() !== ""}
            />
            <DiagnosticCell
              coordinate="[ LAST_NAME ]"
              placeholder="ყიფიანი"
              value={lastName}
              onChange={(val) => setLastName(val)}
              isValid={lastName.trim() !== ""}
            />
          </div>

          <DiagnosticCell
            coordinate="[ DEPLOYED_ROLE // OFFICIAL_POSITION ]"
            placeholder="პრეზიდენტი / გენერალური მდივანი"
            value={execPosition}
            onChange={(val) => setExecutivePosition(val)}
            isValid={execPosition.trim() !== ""}
          />

          <DiagnosticCell
            coordinate="[ COMM_LINK // MOBILE_PHONE ]"
            placeholder="+995 (599) 12 34 56"
            value={contactMobile}
            onChange={(val) => setContactMobile(formatPhone(val))}
            isValid={contactMobile.replace(/\D/g, '').length === 12}
          />

          <DiagnosticCell
            coordinate="[ ACCESS_GATEWAY // OFFICIAL_EMAIL ]"
            placeholder="OFFICE@FEDERATION.GE"
            value={officialEmail}
            onChange={(val) => setOfficialEmail(val)}
            isValid={officialEmail.includes("@")}
          />

          <ExecutiveEncryptionKeyInput
            accessCode={accessCode}
            setAccessCode={setAccessCode}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          <div className="flex items-start gap-2 pt-2 mb-4">
            <button
              type="button"
              onClick={() => setIsAgreed(!isAgreed)}
              className="text-[#00E676] hover:text-white font-mono text-xs focus:outline-none cursor-pointer mt-0.5"
            >
              {isAgreed ? '[ X ]' : '[   ]'}
            </button>
            <p className="text-[10px] text-[#9CA3AF] uppercase leading-relaxed tracking-wider">
              მე ვადასტურებ, რომ მაქვს უფლებამოსილება წარმოვადგინო ეს ფედერაცია და ვეთანხმები Artron-ის {' '}
              <Link href="/sla" target="_blank" className="text-[#00E676] hover:underline">[SLA]</Link> {' '}
              და {' '}
              <Link href="/privacy" target="_blank" className="text-[#00E676] hover:underline">[კონფიდენციალურობის პოლიტიკას]</Link>.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-3 border border-[#9CA3AF]/10 bg-[#121418]/50 text-[#9CA3AF] font-mono text-[11px] uppercase tracking-wider leading-relaxed">
          [ SYSTEM_LOG ]: იქმნება ფედერაციის მმართველი ადმინისტრატორის ანგარიში. ამ მომხმარებელს მიენიჭება სრული კრიპტოგრაფიული გასაღები ფედერაციის ადმინ-პანელზე.
        </div>

        <div className="flex gap-4 pt-2 font-mono text-xs">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="flex-1 py-3 px-4 border border-[#9CA3AF]/20 text-[#9CA3AF] hover:bg-[#9CA3AF]/10 transition-all uppercase cursor-pointer"
          >
            [ BACK ]
          </button>
          <button
            type="button"
            disabled={!isStep3Valid}
            onClick={() => setIsSuccess(true)}
            className={`flex-1 py-3 px-4 font-bold border transition-all uppercase cursor-pointer ${
              isStep3Valid
                ? 'border-[#00E676] text-[#00E676] bg-[#00E676]/10 hover:bg-[#00E676] hover:text-[#121418]'
                : 'border-[#9CA3AF]/10 text-[#9CA3AF]/30 cursor-not-allowed'
            }`}
          >
            [ REGISTER_CORE ]
          </button>
        </div>
      </div>
    </div>
  );
}
