"use client";

import CustomSelect from "@/components/ui/CustomSelect";
import DiagnosticCell from "@/components/ui/DiagnosticCell";
import { formatFedCode } from "../wizard/wizardUtils";

interface FederationFormStep1ViewProps {
  fedName: string; setFedName: (v: string) => void;
  legalForm: string; setLegalForm: (v: string) => void;
  fedCode: string; setFedCode: (v: string) => void;
  sportsType: string; setSportsType: (v: string) => void;
  isStep1Valid: boolean;
  setStep: (step: number) => void;
}

export default function FederationFormStep1View({
  fedName, setFedName, legalForm, setLegalForm, fedCode, setFedCode, sportsType, setSportsType,
  isStep1Valid, setStep
}: FederationFormStep1ViewProps) {
  return (
    <div className="space-y-4 flex-1 flex flex-col justify-between">
      <div>
        <div className="space-y-1 mb-4">
          <div className="font-mono text-[9.5px] text-[#9CA3AF] uppercase tracking-widest flex justify-between">
            <span>[ FEDERATION_INTEGRATION: STEP_01_OF_03 ]</span>
            <span>
              <span className="text-[#00E676]">●</span>{" "}
              <span className="text-[#9CA3AF]/10">○ ○</span>
            </span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#F5F5F7] uppercase">
            FEDERATION IDENTITY
          </h2>
        </div>

        <div className="space-y-1">
          <DiagnosticCell
            coordinate="[ ADM_01.1 // FEDERATION_NAME ]"
            placeholder="საქართველოს კალათბურთის ეროვნული ფედერაცია"
            value={fedName}
            onChange={(val) => setFedName(val)}
            isValid={fedName.trim() !== ""}
          />
          <CustomSelect
            options={[legalForm]}
            selected={legalForm}
            onChange={(val) => setLegalForm(val)}
            label="[ ADM_01.2 // LEGAL_FORM ]"
            disabled={true}
          />
          <DiagnosticCell
            coordinate="[ ADM_01.3 // IDENTIFICATION_CODE ]"
            placeholder="204 123 456"
            value={fedCode}
            onChange={(val) => setFedCode(formatFedCode(val))}
            isValid={fedCode.replace(/\s/g, '').length === 9}
          />
          <DiagnosticCell
            coordinate="[ ADM_01.4 // SPORTS_TYPE_TAGS ]"
            placeholder="ჭადრაკი, ფეხბურთი, რაგბი"
            value={sportsType}
            onChange={(val) => setSportsType(val)}
            isValid={sportsType.trim() !== ""}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-3 border border-[#9CA3AF]/10 bg-[#121418]/50 text-[#9CA3AF] font-mono text-[11px] uppercase tracking-wider leading-relaxed">
          [ SYSTEM_LOG ]: მიუთითეთ ფედერაციის იურიდიული მონაცემები. საიდენტიფიკაციო კოდი გამოყენებული იქნება კავშირის დასამყარებლად საჯარო რეესტრის მონაცემთა ბაზასთან.
        </div>
        <button
          type="button"
          disabled={!isStep1Valid}
          onClick={() => setStep(2)}
          className={`w-full py-3 px-4 font-bold border transition-all uppercase cursor-pointer text-xs font-mono tracking-widest ${
            isStep1Valid
              ? 'border-[#00E676] text-[#00E676] bg-[#00E676]/10 hover:bg-[#00E676] hover:text-[#121418]'
              : 'border-[#9CA3AF]/10 text-[#9CA3AF]/30 cursor-not-allowed'
          }`}
        >
          [ CONTINUE PROTOCOL ]
        </button>
      </div>
    </div>
  );
}
