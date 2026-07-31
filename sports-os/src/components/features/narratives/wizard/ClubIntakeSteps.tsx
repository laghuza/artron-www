"use client";

import ClubIntakeStep1View from "./ClubIntakeStep1View";
import ClubIntakeStep2View from "./ClubIntakeStep2View";
import ClubIntakeStep3View from "./ClubIntakeStep3View";

interface ClubIntakeStepsProps {
  step: number;
  setStep: (s: number) => void;
  setFlow: (f: 'gateway_dispatcher' | 'federation' | 'club') => void;
  setIsSuccess: (s: boolean) => void;
  clubName: string; setClubName: (v: string) => void;
  clubLegalForm: string; setClubLegalForm: (v: string) => void;
  clubCode: string; setClubCode: (v: string) => void;
  clubServices: string; setClubServices: (v: string) => void;
  clubAddress: string; setClubAddress: (v: string) => void;
  branchesCount: string; setBranchesCount: (v: string) => void;
  gatesCount: string; setAccessGatesCount: (v: string) => void;
  clubFirstName: string; setClubFirstName: (v: string) => void;
  clubLastName: string; setClubLastName: (v: string) => void;
  clubExecPosition: string; setClubExecutivePosition: (v: string) => void;
  clubContactMobile: string; setClubContactMobile: (v: string) => void;
  clubOfficialEmail: string; setClubOfficialEmail: (v: string) => void;
  clubAccessCode: string; setClubAccessCode: (v: string) => void;
  clubShowPassword: boolean; setClubShowPassword: (v: boolean) => void;
  clubIsAgreed: boolean; setClubIsAgreed: (v: boolean) => void;
}

export default function ClubIntakeSteps(props: ClubIntakeStepsProps) {
  const isClubStep1Valid = props.clubName.trim() !== "" && props.clubCode.replace(/\s/g, '').length === 9 && props.clubServices.trim() !== "";
  const isClubStep2Valid = props.clubAddress.trim() !== "" && props.branchesCount.trim() !== "" && props.gatesCount.trim() !== "";
  const isClubStep3Valid = props.clubFirstName.trim() !== "" && props.clubLastName.trim() !== "" && props.clubExecPosition.trim() !== "" && props.clubContactMobile.replace(/\D/g, '').length === 12 && props.clubOfficialEmail.includes("@") && props.clubAccessCode.trim() !== "" && props.clubIsAgreed;

  return (
    <div className="flex-1 flex flex-col justify-between max-h-[68vh] overflow-y-auto pr-1 scrollbar-none gap-3">
      {props.step === 1 && (
        <ClubIntakeStep1View
          clubName={props.clubName} setClubName={props.setClubName}
          clubLegalForm={props.clubLegalForm} setClubLegalForm={props.setClubLegalForm}
          clubCode={props.clubCode} setClubCode={props.setClubCode}
          clubServices={props.clubServices} setClubServices={props.setClubServices}
          isClubStep1Valid={isClubStep1Valid} setStep={props.setStep} setFlow={props.setFlow}
        />
      )}
      {props.step === 2 && (
        <ClubIntakeStep2View
          clubAddress={props.clubAddress} setClubAddress={props.setClubAddress}
          branchesCount={props.branchesCount} setBranchesCount={props.setBranchesCount}
          gatesCount={props.gatesCount} setAccessGatesCount={props.setAccessGatesCount}
          isClubStep2Valid={isClubStep2Valid} setStep={props.setStep}
        />
      )}
      {props.step === 3 && (
        <ClubIntakeStep3View
          clubFirstName={props.clubFirstName} setClubFirstName={props.setClubFirstName}
          clubLastName={props.clubLastName} setClubLastName={props.setClubLastName}
          clubExecPosition={props.clubExecPosition} setClubExecutivePosition={props.setClubExecutivePosition}
          clubContactMobile={props.clubContactMobile} setClubContactMobile={props.setClubContactMobile}
          clubOfficialEmail={props.clubOfficialEmail} setClubOfficialEmail={props.setClubOfficialEmail}
          clubAccessCode={props.clubAccessCode} setClubAccessCode={props.setClubAccessCode}
          clubShowPassword={props.clubShowPassword} setClubShowPassword={props.setClubShowPassword}
          clubIsAgreed={props.clubIsAgreed} setClubIsAgreed={props.setClubIsAgreed}
          isClubStep3Valid={isClubStep3Valid} setStep={props.setStep} setIsSuccess={props.setIsSuccess}
        />
      )}
    </div>
  );
}
