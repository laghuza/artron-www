import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CustomSelect from '@/components/ui/CustomSelect';
import DiagnosticCell from '@/components/ui/DiagnosticCell';

export default function FederationIntakeForm() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  // STEP 1 State
  const [fedName, setFedName] = useState("");
  const [legalForm, setLegalForm] = useState("ააიპ (არასამეწარმეო არაკომერციული იურიდიული პირი)");
  const [fedCode, setFedCode] = useState("");
  const [sportsType, setSportsType] = useState("");

  // STEP 2 State
  const [country, setCountry] = useState("საქართველო");
  const [address, setAddress] = useState("");
  const [hqName, setHqName] = useState("ცენტრალური შტაბ-ბინა");
  const [governingDept, setGoverningDept] = useState("გენერალური სამდივნო");

  // STEP 3 State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [execPosition, setExecutivePosition] = useState("");
  const [contactMobile, setContactMobile] = useState("+995");
  const [officialEmail, setOfficialEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  // Auto-Formatters (Data Mutability)
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

  // Validations
  const isStep1Valid = fedName.trim() !== "" && fedCode.replace(/\s/g, '').length === 9 && sportsType.trim() !== "";
  const isStep2Valid = address.trim() !== "" && hqName.trim() !== "" && governingDept.trim() !== "";
  const isStep3Valid = 
    firstName.trim() !== "" && 
    lastName.trim() !== "" && 
    execPosition.trim() !== "" && 
    contactMobile.replace(/\D/g, '').length >= 12 && 
    officialEmail.includes("@") && 
    accessCode.trim() !== "" && 
    isAgreed;

  // Keyboard Event Handlers
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        console.log("CANCEL PROTOCOL");
        // Trigger back-to-menu state if applicable
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  const handleFormKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (step === 1 && isStep1Valid) setStep(2);
      else if (step === 2 && isStep2Valid) setStep(3);
      else if (step === 3 && isStep3Valid) setIsSuccess(true);
    }
  };

  return (
    <div 
      onKeyDown={handleFormKeyDown}
      className="space-y-6 font-sans select-none animate-fadeIn max-w-md w-full min-h-[460px] flex flex-col justify-between"
    >
      {/* SUCCESS SCREEN */}
      {isSuccess ? (
        <div className="space-y-4 font-mono text-xs text-[#00E676] leading-relaxed border-t border-[#00E676]/20 pt-4 uppercase tracking-wider">
          <div>[ SOVEREIGN_NODE_INITIALIZED // STATUS: SUCCESS ]</div>
          <div>--------------------------------------------------</div>
          <div>&gt; ENNEA_CORE_CONNECTION: STABLE</div>
          <div>&gt; DEPLOYMENT_KEY: ART-FED-902XX</div>
          <div>&gt; VETTING_STATUS: PENDING_CONFIRMATION</div>
          
          <div className="pt-4 normal-case text-silver-structure/80 font-sans text-[13px] leading-relaxed">
            ავტომატური სისტემა ახორციელებს თქვენი იურიდიული მონაცემების ვერიფიკაციას საჯარო რეესტრში.
          </div>
          <div className="normal-case text-silver-structure/80 font-sans text-[13px] leading-relaxed">
            ვერიფიკაციის პროტოკოლი დადასტურების ლინკით გამოგზავნილია მითითებულ ელ-ფოსტაზე:
          </div>
          <div className="text-white font-mono">{officialEmail.toUpperCase()}</div>
          <div className="pt-2 font-sans text-[13px] text-silver-structure/80">
            გთხოვთ, შეამოწმოთ Inbox და დაასრულოთ ვერიფიკაცია.
            <span className="animate-pulse inline-block w-1.5 h-3.5 bg-[#00E676] ml-1" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full justify-between flex-1">
          {/* STEP 1: IDENTITY */}
          {step === 1 && (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="space-y-1 mb-4">
                  <div className="font-mono text-[9.5px] text-[#9CA3AF] uppercase tracking-widest flex justify-between">
                    <span>[ FEDERATION_INTEGRATION: STEP_01_OF_03 ]</span>
                    <span>
                      <span className="text-[#00E676]">●</span>{' '}
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
          )}

          {/* STEP 2: OPERATIONAL INFRASTRUCTURE */}
          {step === 2 && (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="space-y-1 mb-4">
                  <div className="font-mono text-[9.5px] text-[#9CA3AF] uppercase tracking-widest flex justify-between">
                    <span>[ CALIBRATION_SEQUENCE: NODE_02_OF_03 ]</span>
                    <span>
                      <span className="text-[#00E676]">● ●</span>{' '}
                      <span className="text-[#9CA3AF]/10">○</span>
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-[#F5F5F7] uppercase">
                    OPERATIONAL INFRASTRUCTURE
                  </h2>
                </div>

                <div className="space-y-1">
                  <CustomSelect
                    options={["საქართველო", "აშშ", "გერმანია", "საფრანგეთი", "დიდი ბრიტანეთი"]}
                    selected={country}
                    onChange={(val) => setCountry(val)}
                    label="[ GEOGRAPHIC_NODE // COUNTRY ]"
                  />

                  <DiagnosticCell
                    coordinate="[ DEPLOYMENT_ADDRESS // LEGAL_HQ ]"
                    placeholder="ქ. თბილისი, ი. ჭავჭავაძის გამზირი 15"
                    value={address}
                    onChange={(val) => setAddress(val)}
                    isValid={address.trim() !== ""}
                  />

                  <DiagnosticCell
                    coordinate="[ HUB_DESCRIPTOR // CENTRAL_OFFICE ]"
                    placeholder="ცენტრალური შტაბ-ბინა"
                    value={hqName}
                    onChange={(val) => setHqName(val)}
                    isValid={hqName.trim() !== ""}
                  />

                  <DiagnosticCell
                    coordinate="[ OPERATIONAL_NODE // GENERAL_SECRETARIAT ]"
                    placeholder="გენერალური სამდივნო"
                    value={governingDept}
                    onChange={(val) => setGoverningDept(val)}
                    isValid={governingDept.trim() !== ""}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-3 border border-[#9CA3AF]/10 bg-[#121418]/50 text-[#9CA3AF] font-mono text-[11px] uppercase tracking-wider leading-relaxed">
                  [ SYSTEM_LOG ]: განსაზღვრეთ ფედერაციის მთავარი ადმინისტრაციული კერა. Artron ავტომატურად გამართავს საოპერაციო სტრუქტურას ამ ლოკაციის ირგვლივ.
                </div>

                <div className="flex gap-4 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 px-4 border border-[#9CA3AF]/20 text-[#9CA3AF] hover:bg-[#9CA3AF]/10 transition-all uppercase cursor-pointer"
                  >
                    [ BACK ]
                  </button>
                  <button
                    type="button"
                    disabled={!isStep2Valid}
                    onClick={() => setStep(3)}
                    className={`flex-1 py-3 px-4 font-bold border transition-all uppercase cursor-pointer ${
                      isStep2Valid 
                        ? 'border-[#00E676] text-[#00E676] bg-[#00E676]/10 hover:bg-[#00E676] hover:text-[#121418]'
                        : 'border-[#9CA3AF]/10 text-[#9CA3AF]/30 cursor-not-allowed'
                    }`}
                  >
                    [ CONTINUE ]
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: EXECUTIVE AUTHORITY */}
          {step === 3 && (
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

                  <div className="flex flex-col gap-1 w-full font-mono text-[9.5px] mb-4 select-none">
                    <span className="text-[#9CA3AF] tracking-widest uppercase mb-1">[ ENCRYPTION_KEY // SYSTEM_PASSWORD ]</span>
                    <div className="relative w-full">
                      <span className={`absolute -top-[1.5px] -left-[1.5px] text-xs transition-colors duration-300 ${showPassword ? 'text-[#00E676] drop-shadow-[0_0_3px_rgba(0,230,118,0.4)]' : 'text-[#9CA3AF]/20'}`}>┌</span>
                      <span className={`absolute -top-[1.5px] -right-[1.5px] text-xs transition-colors duration-300 ${showPassword ? 'text-[#00E676] drop-shadow-[0_0_3px_rgba(0,230,118,0.4)]' : 'text-[#9CA3AF]/20'}`}>┐</span>
                      <span className={`absolute -bottom-[1.5px] -left-[1.5px] text-xs transition-colors duration-300 ${showPassword ? 'text-[#00E676] drop-shadow-[0_0_3px_rgba(0,230,118,0.4)]' : 'text-[#9CA3AF]/20'}`}>└</span>
                      <span className={`absolute -bottom-[1.5px] -right-[1.5px] text-xs transition-colors duration-300 ${showPassword ? 'text-[#00E676] drop-shadow-[0_0_3px_rgba(0,230,118,0.4)]' : 'text-[#9CA3AF]/20'}`}>┘</span>

                      <div className={`relative w-full border ${showPassword ? 'border-[#00E676]/30 bg-[#121418]' : 'border-[#9CA3AF]/10 bg-transparent'} transition-all duration-300`}>
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          placeholder="••••••••"
                          value={accessCode}
                          onChange={(e) => setAccessCode(e.target.value)}
                          className="w-full bg-transparent py-2.5 px-3.5 pr-16 text-[#F5F5F7] font-sans text-sm placeholder-[#9CA3AF]/30 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-[11px] text-[#9CA3AF] hover:text-[#00E676] text-[9px] font-mono focus:outline-none uppercase"
                        >
                          {showPassword ? '[ HIDE ]' : '[ SHOW ]'}
                        </button>
                      </div>
                    </div>
                    <div className="h-3 flex justify-end mt-0.5">
                      {accessCode.trim() !== "" && (
                        <span className="text-[#00E676] text-[9px] tracking-wider animate-pulse">[ NODE_VALID: TRUE ]</span>
                      )}
                    </div>
                  </div>

                  {/* custom bracket style checkbox */}
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
          )}
        </div>
      )}
    </div>
  );
}
