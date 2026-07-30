import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CustomSelect from '@/components/ui/CustomSelect';
import DiagnosticCell from '@/components/ui/DiagnosticCell';

interface RegistryIntakeWizardProps {
  onReset: () => void;
}

export default function RegistryIntakeWizard({ onReset }: RegistryIntakeWizardProps) {
  const [flow, setFlow] = useState<'gateway_dispatcher' | 'federation' | 'club'>('gateway_dispatcher');
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const formatFedCode = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 9);
    const parts = [];
    for (let i = 0; i < cleaned.length; i += 3) {
      parts.push(cleaned.slice(i, i + 3));
    }
    return parts.join(' ');
  };

  const formatPhone = (val: string) => {
    const cleaned = val.replace(/\D/g, '');
    let digits = cleaned;
    if (cleaned.startsWith('995')) {
      digits = cleaned.slice(3);
    }
    digits = digits.slice(0, 9);
    
    let formatted = '+995';
    if (digits.length > 0) {
      const area = digits.slice(0, 3);
      formatted += ` (${area}`;
      if (digits.length > 3) {
        formatted += `) ${digits.slice(3, 5)}`;
        if (digits.length > 5) {
          formatted += ` ${digits.slice(5, 7)}`;
          if (digits.length > 7) {
            formatted += ` ${digits.slice(7, 9)}`;
          }
        }
      }
    }
    return formatted;
  };

  // FEDERATION States
  const [fedName, setFedName] = useState("");
  const [legalForm, setLegalForm] = useState("ააიპ (არასამეწარმეო არაკომერციული იურიდიული პირი)");
  const [fedCode, setFedCode] = useState("");
  const [sportsType, setSportsType] = useState("");
  const [country, setCountry] = useState("საქართველო");
  const [address, setAddress] = useState("");
  const [hqName, setHqName] = useState("ცენტრალური შტაბ-ბინა");
  const [governingDept, setGoverningDept] = useState("გენერალური სამდივნო");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [execPosition, setExecutivePosition] = useState("");
  const [contactMobile, setContactMobile] = useState("+995");
  const [officialEmail, setOfficialEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  // CLUB States
  const [clubName, setClubName] = useState("");
  const [clubLegalForm, setClubLegalForm] = useState("შპს");
  const [clubCode, setClubCode] = useState("");
  const [clubServices, setClubServices] = useState("");
  const [clubAddress, setClubAddress] = useState("");
  const [branchesCount, setBranchesCount] = useState("");
  const [gatesCount, setAccessGatesCount] = useState("");
  const [clubFirstName, setClubFirstName] = useState("");
  const [clubLastName, setClubLastName] = useState("");
  const [clubExecPosition, setClubExecutivePosition] = useState("");
  const [clubContactMobile, setClubContactMobile] = useState("+995");
  const [clubOfficialEmail, setClubOfficialEmail] = useState("");
  const [clubAccessCode, setClubAccessCode] = useState("");
  const [clubShowPassword, setClubShowPassword] = useState(false);
  const [clubIsAgreed, setClubIsAgreed] = useState(false);

  const isFedStep1Valid = fedName.trim() !== "" && fedCode.replace(/\s/g, '').length === 9 && sportsType.trim() !== "";
  const isFedStep2Valid = address.trim() !== "" && hqName.trim() !== "" && governingDept.trim() !== "";
  const isFedStep3Valid = firstName.trim() !== "" && lastName.trim() !== "" && execPosition.trim() !== "" && contactMobile.replace(/\D/g, '').length === 12 && officialEmail.includes("@") && accessCode.trim() !== "" && isAgreed;

  const isClubStep1Valid = clubName.trim() !== "" && clubCode.replace(/\s/g, '').length === 9 && clubServices.trim() !== "";
  const isClubStep2Valid = clubAddress.trim() !== "" && branchesCount.trim() !== "" && gatesCount.trim() !== "";
  const isClubStep3Valid = clubFirstName.trim() !== "" && clubLastName.trim() !== "" && clubExecPosition.trim() !== "" && clubContactMobile.replace(/\D/g, '').length === 12 && clubOfficialEmail.includes("@") && clubAccessCode.trim() !== "" && clubIsAgreed;

  return (
    <div className="space-y-4 font-sans select-none animate-fadeIn max-w-md w-full min-h-[460px] flex flex-col justify-between">
      {flow === 'gateway_dispatcher' && (
        <div className="flex-1 flex flex-col justify-between h-full">
          <div>
            <div className="space-y-1 mb-6">
              <span className="text-[#9CA3AF] text-[10px] font-mono tracking-widest uppercase block">[ GATEWAY_DISPATCHER // SELECT_INTAKE_PROTOCOL ]</span>
              <h2 className="text-2xl font-semibold tracking-tight text-[#F5F5F7] uppercase">SELECT ENTRY PATHWAY</h2>
            </div>
            <div className="flex flex-col gap-4">
              <div onClick={() => { setFlow('federation'); setStep(1); }} className="group border border-[#9CA3AF]/10 bg-[#121418]/40 hover:border-[#00E676] hover:bg-[#00E676]/5 p-4 rounded-none cursor-pointer transition-all duration-300">
                <div className="font-mono text-[10px] text-[#00E676] uppercase tracking-widest mb-1">PROTOCOL_01 // SOVEREIGN_FEDERATION</div>
                <div className="text-[13px] font-bold text-white uppercase group-hover:text-[#00E676]">INITIATE FEDERATION REGISTRATION</div>
                <div className="text-[11px] text-[#9CA3AF]/70 mt-1 font-mono uppercase">Begin progressive vetting workflow for national sports federations.</div>
              </div>
              <div onClick={() => { setFlow('club'); setStep(1); }} className="group border border-[#9CA3AF]/10 bg-[#121418]/40 hover:border-[#00E676] hover:bg-[#00E676]/5 p-4 rounded-none cursor-pointer transition-all duration-300">
                <div className="font-mono text-[10px] text-[#00E676] uppercase tracking-widest mb-1">PROTOCOL_02 // CLUBS_AND_ACADEMIES</div>
                <div className="text-[13px] font-bold text-white uppercase group-hover:text-[#00E676]">INITIATE CLUB REGISTRATION</div>
                <div className="text-[11px] text-[#9CA3AF]/70 mt-1 font-mono uppercase">Begin progressive vetting workflow for private/public clubs and gyms.</div>
              </div>
            </div>
          </div>
          <button onClick={onReset} className="w-fit text-left text-[#9CA3AF]/50 hover:text-[#00E676] font-mono text-[10px] uppercase transition-colors pt-6 block cursor-pointer">[ ← CANCEL_PROTOCOL // RETURN ]</button>
        </div>
      )}

      {isSuccess && (
        <div className="flex-1 flex flex-col justify-between h-full">
          <div className="space-y-4 font-mono text-xs text-[#00E676] leading-relaxed border-t border-[#00E676]/20 pt-4 uppercase tracking-wider">
            <div>[ SYSTEM NODE INITIALIZED // STATUS: SUCCESS ]</div>
            <div>--------------------------------------------------</div>
            <div>&gt; ENNEA_CORE_CONNECTION: STABLE</div>
            <div>&gt; DEPLOYMENT_KEY: {flow === 'federation' ? 'ART-FED-902XX' : 'ART-CLB-108XX'}</div>
            <div>&gt; VETTING_STATUS: PENDING_CONFIRMATION</div>
            <div className="pt-4 normal-case text-silver-structure/80 font-sans text-[13px] leading-relaxed">ავტომატური სისტემა ახორციელებს თქვენი იურიდიული მონაცემების ვერიფიკაციას საჯარო რეესტრში.</div>
            <div className="normal-case text-silver-structure/80 font-sans text-[13px] leading-relaxed">ვერიფიკაციის პროტოკოლი გამოგზავნილია მითითებულ ელ-ფოსტაზე:</div>
            <div className="text-white font-mono">{flow === 'federation' ? officialEmail.toUpperCase() : clubOfficialEmail.toUpperCase()}</div>
            <div className="pt-2 font-sans text-[13px] text-silver-structure/80">გთხოვთ, შეამოწმოთ Inbox და დაასრულოთ ვერიფიკაცია.<span className="animate-pulse inline-block w-1.5 h-3.5 bg-[#00E676] ml-1" /></div>
          </div>
          <div className="flex flex-col gap-2 mt-4 font-mono text-[10px]">
            <div className="border-t border-[#00E676]/20 my-2" />
            <button onClick={onReset} className="text-[#00E676] hover:text-[#F5F5F7] transition-all font-mono text-[10px] uppercase hover:tracking-widest">&gt; [ TERMINAL_ESCAPE // RETURN_TO_CORE_DASHBOARD ]</button>
          </div>
        </div>
      )}

      {flow === 'federation' && !isSuccess && (
        <div className="flex-1 flex flex-col justify-between max-h-[68vh] overflow-y-auto pr-1 scrollbar-none gap-3">
          {step === 1 && (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="space-y-1 mb-4">
                  <div className="font-mono text-[9.5px] text-[#9CA3AF] uppercase tracking-widest flex justify-between">
                    <span>[ FEDERATION_INTEGRATION: STEP_01_OF_03 ]</span>
                    <span><span className="text-[#00E676]">●</span> <span className="text-[#9CA3AF]/10">○ ○</span></span>
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
                  <button type="button" disabled={!isFedStep1Valid} onClick={() => setStep(2)} className={`flex-1 py-3 px-4 font-bold border transition-all uppercase cursor-pointer ${isFedStep1Valid ? 'border-[#00E676] text-[#00E676] bg-[#00E676]/10 hover:bg-[#00E676] hover:text-[#121418]' : 'border-[#9CA3AF]/10 text-[#9CA3AF]/30 cursor-not-allowed'}`}>[ CONTINUE PROTOCOL ]</button>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
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
          )}
          {step === 3 && (
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
                  <div className="flex flex-col gap-1 w-full font-mono text-[9.5px] mb-2.5 select-none">
                    <div className="flex justify-between items-center text-[#9CA3AF] tracking-widest uppercase mb-1">
                      <span>[ ENCRYPTION_KEY // SYSTEM_PASSWORD ]</span>
                      <span className={accessCode.trim() !== "" ? 'text-[#00E676]' : 'text-[#9CA3AF]/40'}>{accessCode.trim() !== "" ? '[ COMPILING... ]' : '[ INPUT_MUTABILITY: STATIC_WRITE ]'}</span>
                    </div>
                    <div className="relative w-full">
                      <span className={`absolute -top-[1.5px] -left-[1.5px] text-xs transition-colors duration-300 ${showPassword ? 'text-[#00E676] drop-shadow-[0_0_3px_rgba(0,230,118,0.4)]' : 'text-[#9CA3AF]/20'}`}>┌</span>
                      <span className={`absolute -top-[1.5px] -right-[1.5px] text-xs transition-colors duration-300 ${showPassword ? 'text-[#00E676] drop-shadow-[0_0_3px_rgba(0,230,118,0.4)]' : 'text-[#9CA3AF]/20'}`}>┐</span>
                      <span className={`absolute -bottom-[1.5px] -left-[1.5px] text-xs transition-colors duration-300 ${showPassword ? 'text-[#00E676] drop-shadow-[0_0_3px_rgba(0,230,118,0.4)]' : 'text-[#9CA3AF]/20'}`}>└</span>
                      <span className={`absolute -bottom-[1.5px] -right-[1.5px] text-xs transition-colors duration-300 ${showPassword ? 'text-[#00E676] drop-shadow-[0_0_3px_rgba(0,230,118,0.4)]' : 'text-[#9CA3AF]/20'}`}>┘</span>
                      <div className={`relative w-full border ${showPassword ? 'border-[#00E676]/30 bg-[#121418]' : 'border-[#9CA3AF]/10 bg-transparent'} transition-all duration-300`}>
                        <input type={showPassword ? "text" : "password"} required placeholder="••••••••" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} className="w-full bg-transparent py-2.5 px-3.5 pr-16 text-[#F5F5F7] font-sans text-sm placeholder-[#9CA3AF]/30 focus:outline-none" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[11px] text-[#9CA3AF] hover:text-[#00E676] text-[9px] font-mono focus:outline-none uppercase">{showPassword ? '[ HIDE ]' : '[ SHOW ]'}</button>
                      </div>
                    </div>
                    <div className="h-3 flex justify-end mt-0.5">{accessCode.trim() !== "" && <span className="text-[#00E676] text-[9px] tracking-wider animate-pulse">[ NODE_VALID: TRUE ]</span>}</div>
                  </div>
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
          )}
        </div>
      )}

      {/* 4. CLUB SEQUENCE (PROTOCOL_02) */}
      {flow === 'club' && !isSuccess && (
        <div className="flex-1 flex flex-col justify-between max-h-[68vh] overflow-y-auto pr-1 scrollbar-none gap-3">
          {step === 1 && (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="space-y-1 mb-4">
                  <div className="font-mono text-[9.5px] text-[#9CA3AF] uppercase tracking-widest flex justify-between">
                    <span>[ CLUB_INTEGRATION: STEP_01_OF_03 ]</span>
                    <span><span className="text-[#00E676]">●</span> <span className="text-[#9CA3AF]/10">○ ○</span></span>
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
                  <button type="button" disabled={!isClubStep1Valid} onClick={() => setStep(2)} className={`flex-1 py-3 px-4 font-bold border transition-all uppercase cursor-pointer ${isClubStep1Valid ? 'border-[#00E676] text-[#00E676] bg-[#00E676]/10 hover:bg-[#00E676] hover:text-[#121418]' : 'border-[#9CA3AF]/10 text-[#9CA3AF]/30 cursor-not-allowed'}`}>[ CONTINUE PROTOCOL ]</button>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="space-y-1 mb-4">
                  <div className="font-mono text-[9.5px] text-[#9CA3AF] uppercase tracking-widest flex justify-between">
                    <span>[ CLUB_INTEGRATION: STEP_02_OF_03 ]</span>
                    <span><span className="text-[#00E676]">● ●</span> <span className="text-[#9CA3AF]/10">○</span></span>
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
                  <button type="button" disabled={!isClubStep2Valid} onClick={() => setStep(3)} className={`flex-1 py-3 px-4 font-bold border transition-all uppercase cursor-pointer ${isClubStep2Valid ? 'border-[#00E676] text-[#00E676] bg-[#00E676]/10 hover:bg-[#00E676] hover:text-[#121418]' : 'border-[#9CA3AF]/10 text-[#9CA3AF]/30 cursor-not-allowed'}`}>[ CONTINUE ]</button>
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
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
                  <div className="flex flex-col gap-1 w-full font-mono text-[9.5px] mb-2.5 select-none">
                    <div className="flex justify-between items-center text-[#9CA3AF] tracking-widest uppercase mb-1">
                      <span>[ ENCRYPTION_KEY // SYSTEM_PASSWORD ]</span>
                      <span className={clubAccessCode.trim() !== "" ? 'text-[#00E676]' : 'text-[#9CA3AF]/40'}>{clubAccessCode.trim() !== "" ? '[ COMPILING... ]' : '[ INPUT_MUTABILITY: STATIC_WRITE ]'}</span>
                    </div>
                    <div className="relative w-full">
                      <span className={`absolute -top-[1.5px] -left-[1.5px] text-xs transition-colors duration-300 ${clubShowPassword ? 'text-[#00E676] drop-shadow-[0_0_3px_rgba(0,230,118,0.4)]' : 'text-[#9CA3AF]/20'}`}>┌</span>
                      <span className={`absolute -top-[1.5px] -right-[1.5px] text-xs transition-colors duration-300 ${clubShowPassword ? 'text-[#00E676] drop-shadow-[0_0_3px_rgba(0,230,118,0.4)]' : 'text-[#9CA3AF]/20'}`}>┐</span>
                      <span className={`absolute -bottom-[1.5px] -left-[1.5px] text-xs transition-colors duration-300 ${clubShowPassword ? 'text-[#00E676] drop-shadow-[0_0_3px_rgba(0,230,118,0.4)]' : 'text-[#9CA3AF]/20'}`}>└</span>
                      <span className={`absolute -bottom-[1.5px] -right-[1.5px] text-xs transition-colors duration-300 ${clubShowPassword ? 'text-[#00E676] drop-shadow-[0_0_3px_rgba(0,230,118,0.4)]' : 'text-[#9CA3AF]/20'}`}>┘</span>
                      <div className={`relative w-full border ${clubShowPassword ? 'border-[#00E676]/30 bg-[#121418]' : 'border-[#9CA3AF]/10 bg-transparent'} transition-all duration-300`}>
                        <input type={showPassword ? "text" : "password"} required placeholder="••••••••" value={clubAccessCode} onChange={(e) => setClubAccessCode(e.target.value)} className="w-full bg-transparent py-2.5 px-3.5 pr-16 text-[#F5F5F7] font-sans text-sm placeholder-[#9CA3AF]/30 focus:outline-none" />
                        <button type="button" onClick={() => setClubShowPassword(!clubShowPassword)} className="absolute right-3 top-[11px] text-[#9CA3AF] hover:text-[#00E676] text-[9px] font-mono focus:outline-none uppercase">{clubShowPassword ? '[ HIDE ]' : '[ SHOW ]'}</button>
                      </div>
                    </div>
                    <div className="h-3 flex justify-end mt-0.5">{clubAccessCode.trim() !== "" && <span className="text-[#00E676] text-[9px] tracking-wider animate-pulse">[ NODE_VALID: TRUE ]</span>}</div>
                  </div>
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
          )}
        </div>
      )}
    </div>
  );
}
