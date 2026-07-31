"use client";

import React, { useState } from 'react';
import FederationIntakeSteps from './wizard/FederationIntakeSteps';
import ClubIntakeSteps from './wizard/ClubIntakeSteps';

interface RegistryIntakeWizardProps {
  onReset: () => void;
}

export default function RegistryIntakeWizard({ onReset }: RegistryIntakeWizardProps) {
  const [flow, setFlow] = useState<'gateway_dispatcher' | 'federation' | 'club'>('gateway_dispatcher');
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

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
            <button onClick={onReset} className="text-[#00E676] hover:text-[#F5F5F7] transition-all font-mono text-[10px] uppercase hover:tracking-widest cursor-pointer">&gt; [ TERMINAL_ESCAPE // RETURN_TO_CORE_DASHBOARD ]</button>
          </div>
        </div>
      )}

      {flow === 'federation' && !isSuccess && (
        <FederationIntakeSteps
          step={step} setStep={setStep} setFlow={setFlow} setIsSuccess={setIsSuccess}
          fedName={fedName} setFedName={setFedName} legalForm={legalForm} setLegalForm={setLegalForm}
          fedCode={fedCode} setFedCode={setFedCode} sportsType={sportsType} setSportsType={setSportsType}
          country={country} setCountry={setCountry} address={address} setAddress={setAddress}
          hqName={hqName} setHqName={setHqName} governingDept={governingDept} setGoverningDept={setGoverningDept}
          firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName}
          execPosition={execPosition} setExecutivePosition={setExecutivePosition}
          contactMobile={contactMobile} setContactMobile={setContactMobile}
          officialEmail={officialEmail} setOfficialEmail={setOfficialEmail}
          accessCode={accessCode} setAccessCode={setAccessCode}
          showPassword={showPassword} setShowPassword={setShowPassword}
          isAgreed={isAgreed} setIsAgreed={setIsAgreed}
        />
      )}

      {flow === 'club' && !isSuccess && (
        <ClubIntakeSteps
          step={step} setStep={setStep} setFlow={setFlow} setIsSuccess={setIsSuccess}
          clubName={clubName} setClubName={setClubName} clubLegalForm={clubLegalForm} setClubLegalForm={setClubLegalForm}
          clubCode={clubCode} setClubCode={setClubCode} clubServices={clubServices} setClubServices={setClubServices}
          clubAddress={clubAddress} setClubAddress={setClubAddress}
          branchesCount={branchesCount} setBranchesCount={setBranchesCount}
          gatesCount={gatesCount} setAccessGatesCount={setAccessGatesCount}
          clubFirstName={clubFirstName} setClubFirstName={setClubFirstName}
          clubLastName={clubLastName} setClubLastName={setClubLastName}
          clubExecPosition={clubExecPosition} setClubExecutivePosition={setClubExecutivePosition}
          clubContactMobile={clubContactMobile} setClubContactMobile={setClubContactMobile}
          clubOfficialEmail={clubOfficialEmail} setClubOfficialEmail={setClubOfficialEmail}
          clubAccessCode={clubAccessCode} setClubAccessCode={setClubAccessCode}
          clubShowPassword={clubShowPassword} setClubShowPassword={setClubShowPassword}
          clubIsAgreed={clubIsAgreed} setClubIsAgreed={setClubIsAgreed}
        />
      )}
    </div>
  );
}
