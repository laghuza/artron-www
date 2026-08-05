"use client";

import React, { useState, useEffect } from 'react';
import FederationFormStep1View from '@/components/features/narratives/federationForm/FederationFormStep1View';
import FederationFormStep2View from '@/components/features/narratives/federationForm/FederationFormStep2View';
import FederationFormStep3View from '@/components/features/narratives/federationForm/FederationFormStep3View';

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
          {step === 1 && (
            <FederationFormStep1View
              fedName={fedName} setFedName={setFedName}
              legalForm={legalForm} setLegalForm={setLegalForm}
              fedCode={fedCode} setFedCode={setFedCode}
              sportsType={sportsType} setSportsType={setSportsType}
              isStep1Valid={isStep1Valid}
              setStep={setStep}
            />
          )}

          {step === 2 && (
            <FederationFormStep2View
              country={country} setCountry={setCountry}
              address={address} setAddress={setAddress}
              hqName={hqName} setHqName={setHqName}
              governingDept={governingDept} setGoverningDept={setGoverningDept}
              isStep2Valid={isStep2Valid}
              setStep={setStep}
            />
          )}

          {step === 3 && (
            <FederationFormStep3View
              firstName={firstName} setFirstName={setFirstName}
              lastName={lastName} setLastName={setLastName}
              execPosition={execPosition} setExecutivePosition={setExecutivePosition}
              contactMobile={contactMobile} setContactMobile={setContactMobile}
              officialEmail={officialEmail} setOfficialEmail={setOfficialEmail}
              accessCode={accessCode} setAccessCode={setAccessCode}
              showPassword={showPassword} setShowPassword={setShowPassword}
              isAgreed={isAgreed} setIsAgreed={setIsAgreed}
              isStep3Valid={isStep3Valid}
              setStep={setStep}
              setIsSuccess={setIsSuccess}
            />
          )}
        </div>
      )}
    </div>
  );
}
