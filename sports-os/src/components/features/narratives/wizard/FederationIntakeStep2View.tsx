"use client";

import CustomSelect from "@/components/ui/CustomSelect";
import DiagnosticCell from "@/components/ui/DiagnosticCell";

interface FederationIntakeStep2ViewProps {
  country: string; setCountry: (v: string) => void;
  address: string; setAddress: (v: string) => void;
  hqName: string; setHqName: (v: string) => void;
  governingDept: string; setGoverningDept: (v: string) => void;
  isFedStep2Valid: boolean;
  setStep: (s: number) => void;
}

export default function FederationIntakeStep2View({
  country, setCountry, address, setAddress, hqName, setHqName,
  governingDept, setGoverningDept, isFedStep2Valid, setStep
}: FederationIntakeStep2ViewProps) {
  return (
    <div className="space-y-4 flex-1 flex flex-col justify-between">
      <div>
        <div className="space-y-1 mb-4">
          <div className="font-mono text-[9.5px] text-[#9CA3AF] uppercase tracking-widest flex justify-between">
            <span>[ CALIBRATION_SEQUENCE: NODE_02_OF_03 ]</span>
            <span><span className="text-[#00E676]">● ●</span> <span className="text-[#9CA3AF]/10">○</span></span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#F5F5F7] uppercase">OPERATIONAL INFRASTRUCTURE</h2>
        </div>
        <div className="space-y-1">
          <CustomSelect options={["საქართველო", "აშშ", "გერმანია", "საფრანგეთი", "დიდი ბრიტანეთი"]} selected={country} onChange={setCountry} label="[ GEOGRAPHIC_NODE // COUNTRY ]" />
          <DiagnosticCell coordinate="[ DEPLOYMENT_ADDRESS // LEGAL_HQ ]" placeholder="ქ. თბილისი, ი. ჭავჭავაძის გამზირი 15" value={address} onChange={setAddress} isValid={address.trim() !== ""} />
          <DiagnosticCell coordinate="[ HUB_DESCRIPTOR // CENTRAL_OFFICE ]" placeholder="ცენტრალური შტაბ-ბინა" value={hqName} onChange={setHqName} isValid={hqName.trim() !== ""} />
          <DiagnosticCell coordinate="[ OPERATIONAL_NODE // GENERAL_SECRETARIAT ]" placeholder="გენერალური სამდივნო" value={governingDept} onChange={setGoverningDept} isValid={governingDept.trim() !== ""} />
        </div>
      </div>
      <div className="space-y-3">
        <div className="p-3 border border-[#9CA3AF]/10 bg-[#121418]/50 text-[#9CA3AF] font-mono text-[11px] uppercase tracking-wider leading-relaxed">[ SYSTEM_LOG ]: განსაზღვრეთ ფედერაციის მთავარი ადმინისტრაციული კერა. Artron ავტომატურად გამართავს საოპერაციო სტრუქტურას ამ ლოკაციის ირგვლივ.</div>
        <div className="flex gap-4 font-mono text-xs">
          <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 px-4 border border-[#9CA3AF]/20 text-[#9CA3AF] hover:bg-[#9CA3AF]/10 transition-all uppercase cursor-pointer">[ BACK ]</button>
          <button type="button" disabled={!isFedStep2Valid} onClick={() => setStep(3)} className={`flex-1 py-3 px-4 font-bold border transition-all uppercase cursor-pointer ${isFedStep2Valid ? 'border-[#00E676] text-[#00E676] bg-[#00E676]/10 hover:bg-[#00E676] hover:text-[#121418]' : 'border-[#9CA3AF]/10 text-[#9CA3AF]/30 cursor-not-allowed'}`}>[ CONTINUE ]</button>
        </div>
      </div>
    </div>
  );
}
