"use client";

import FederationIntakeStep1View from "@/components/features/narratives/wizard/FederationIntakeStep1View";
import FederationIntakeStep2View from "@/components/features/narratives/wizard/FederationIntakeStep2View";
import HardwareCalculatorStep from "@/components/features/narratives/wizard/HardwareCalculatorStep";
import PlanSelectorStep from "@/components/features/narratives/wizard/PlanSelectorStep";
import FederationIntakeStep3View from "@/components/features/narratives/wizard/FederationIntakeStep3View";

interface FederationIntakeStepsProps {
  step: number;
  setStep: (s: number) => void;
  setFlow: (f: 'gateway_dispatcher' | 'federation' | 'club') => void;
  setIsSuccess: (s: boolean) => void;
  fedName: string; setFedName: (v: string) => void;
  fedSubdomain: string; setFedSubdomain: (v: string) => void;
  legalForm: string; setLegalForm: (v: string) => void;
  fedCode: string; setFedCode: (v: string) => void;
  sportsType: string; setSportsType: (v: string) => void;
  country: string; setCountry: (v: string) => void;
  address: string; setAddress: (v: string) => void;
  hqName: string; setHqName: (v: string) => void;
  governingDept: string; setGoverningDept: (v: string) => void;
  firstName: string; setFirstName: (v: string) => void;
  lastName: string; setLastName: (v: string) => void;
  execPosition: string; setExecutivePosition: (v: string) => void;
  contactMobile: string; setContactMobile: (v: string) => void;
  officialEmail: string; setOfficialEmail: (v: string) => void;
  accessCode: string; setAccessCode: (v: string) => void;
  showPassword: boolean; setShowPassword: (v: boolean) => void;
  isAgreed: boolean; setIsAgreed: (v: boolean) => void;

  fedGatesCount: string; setFedAccessGatesCount: (v: string) => void;
  fedSelectedPlan: string; setFedSelectedPlan: (p: string) => void;
  fedBillingCycle: 'MONTHLY' | 'ANNUAL'; setFedBillingCycle: (c: 'MONTHLY' | 'ANNUAL') => void;
  fedIncludeHardwareQuote: boolean; setFedIncludeHardwareQuote: (v: boolean) => void;
  fedTurnstileType: string; setFedTurnstileType: (v: string) => void;
  fedScannerType: string; setFedScannerType: (v: string) => void;
}

export default function FederationIntakeSteps(props: FederationIntakeStepsProps) {
  const isFedStep1Valid = props.fedName.trim() !== "" && props.fedSubdomain.trim() !== "" && props.fedCode.replace(/\s/g, '').length === 9 && props.sportsType.trim() !== "";
  const isFedStep2Valid = props.address.trim() !== "" && props.hqName.trim() !== "" && props.governingDept.trim() !== "";
  const isFedStep3Valid = props.firstName.trim() !== "" && props.lastName.trim() !== "" && props.execPosition.trim() !== "" && props.contactMobile.replace(/\D/g, '').length === 12 && props.officialEmail.includes("@") && props.accessCode.trim() !== "" && props.isAgreed;

  return (
    <div className="flex-1 flex flex-col justify-between max-h-[68vh] overflow-y-auto pr-1 scrollbar-none gap-3">
      {props.step === 1 && (
        <FederationIntakeStep1View
          fedName={props.fedName} setFedName={props.setFedName}
          fedSubdomain={props.fedSubdomain} setFedSubdomain={props.setFedSubdomain}
          legalForm={props.legalForm} setLegalForm={props.setLegalForm}
          fedCode={props.fedCode} setFedCode={props.setFedCode}
          sportsType={props.sportsType} setSportsType={props.setSportsType}
          isFedStep1Valid={isFedStep1Valid} setStep={props.setStep} setFlow={props.setFlow}
        />
      )}
      {props.step === 2 && (
        <FederationIntakeStep2View
          country={props.country} setCountry={props.setCountry}
          address={props.address} setAddress={props.setAddress}
          hqName={props.hqName} setHqName={props.setHqName}
          governingDept={props.governingDept} setGoverningDept={props.setGoverningDept}
          isFedStep2Valid={isFedStep2Valid} setStep={props.setStep}
        />
      )}
      {props.step === 3 && (
        <HardwareCalculatorStep
          onBack={() => props.setStep(2)}
          onContinue={() => props.setStep(4)}
          gatesCount={props.fedGatesCount}
          setAccessGatesCount={props.setFedAccessGatesCount}
          includeHardwareQuote={props.fedIncludeHardwareQuote}
          setIncludeHardwareQuote={props.setFedIncludeHardwareQuote}
          turnstileType={props.fedTurnstileType}
          setTurnstileType={props.setFedTurnstileType}
          scannerType={props.fedScannerType}
          setScannerType={props.setFedScannerType}
        />
      )}
      {props.step === 4 && (
        <PlanSelectorStep
          onBack={() => props.setStep(3)}
          onContinue={() => props.setStep(5)}
          selectedPlan={props.fedSelectedPlan}
          setSelectedPlan={props.setFedSelectedPlan}
          billingCycle={props.fedBillingCycle}
          setBillingCycle={props.setFedBillingCycle}
        />
      )}
      {props.step === 5 && (
        <FederationIntakeStep3View
          firstName={props.firstName} setFirstName={props.setFirstName}
          lastName={props.lastName} setLastName={props.setLastName}
          execPosition={props.execPosition} setExecutivePosition={props.setExecutivePosition}
          contactMobile={props.contactMobile} setContactMobile={props.setContactMobile}
          officialEmail={props.officialEmail} setOfficialEmail={props.setOfficialEmail}
          accessCode={props.accessCode} setAccessCode={props.setAccessCode}
          showPassword={props.showPassword} setShowPassword={props.setShowPassword}
          isAgreed={props.isAgreed} setIsAgreed={props.setIsAgreed}
          isFedStep3Valid={isFedStep3Valid} setStep={props.setStep} setIsSuccess={props.setIsSuccess}
        />
      )}
    </div>
  );
}
