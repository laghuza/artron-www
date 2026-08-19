'use client';

import React, { useState } from 'react';
import { soundEngine } from '@/core';
import { useI18n } from '@/context/I18nContext';
import { PS5ProgressStepper } from '@/app/get-started/components/ps5/PS5ProgressStepper';
import { Step1FacilityView } from '@/app/get-started/components/ps5/Step1FacilityView';
import { Step2CapacityView } from '@/app/get-started/components/ps5/Step2CapacityView';
import { Step3AuthorityView } from '@/app/get-started/components/ps5/Step3AuthorityView';
import { PS5ActivationSequence } from '@/app/get-started/components/ps5/PS5ActivationSequence';
import { QuickDemoBookingView } from '@/app/get-started/components/ps5/QuickDemoBookingView';
import { registerClubAction } from '@/app/get-started/actions';

export interface UnifiedRegistrationData {
  clubName: string;
  clubLegalForm: string;
  clubCode: string;
  clubServices: string;
  city: string;
  clubAddress: string;
  branchesCount: string;
  membersScale: string;
  hardwareType: string;
  firstName: string;
  lastName: string;
  position: string;
  phone: string;
  email: string;
  personalId: string;
  isTrial: boolean;
}

interface UnifiedRegistrationWizardProps {
  initialMode?: 'REGISTER' | 'DEMO';
  onComplete?: (data: UnifiedRegistrationData) => void;
  onCancel?: () => void;
  onSwitchToLogin?: () => void;
  isCompact?: boolean;
}

const STEPS = [
  { number: 1, title: 'ობიექტი', subtitle: 'პროფილი & იდენტობა' },
  { number: 2, title: 'მასშტაბი', subtitle: 'IoT & აპარატურა' },
  { number: 3, title: 'ადმინისტრატორი', subtitle: 'უსაფრთხოება & წვდომა' },
];

export const UnifiedRegistrationWizard: React.FC<UnifiedRegistrationWizardProps> = ({
  initialMode = 'REGISTER',
  onComplete,
  onCancel,
  onSwitchToLogin,
  isCompact = false,
}) => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'REGISTER' | 'DEMO'>(initialMode);
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [deploymentKey, setDeploymentKey] = useState('ART-CLB-108XX');

  // Step 1: Facility States
  const [clubName, setClubName] = useState('');
  const [clubLegalForm, setClubLegalForm] = useState('შპს');
  const [clubCode, setClubCode] = useState('');
  const [clubServices, setClubServices] = useState('ფიტნეს დარბაზი');
  const [city, setCity] = useState('თბილისი');

  // Step 2: Capacity & Hardware States
  const [clubAddress, setClubAddress] = useState('');
  const [branchesCount, setBranchesCount] = useState('1 ფილიალი');
  const [membersScale, setMembersScale] = useState('100 – 500 წევრი');
  const [hardwareType, setHardwareType] = useState('ტურნიკეტები & ბარიერები');

  // Step 3: Authority & Security States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('დამფუძნებელი / დირექტორი');
  const [phone, setPhone] = useState('+995');
  const [email, setEmail] = useState('');
  const [personalId, setPersonalId] = useState('');
  const [password, setPassword] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isBiometricAgreed, setIsBiometricAgreed] = useState(false);

  // Validation Flags
  const isStep1Valid = clubName.trim().length > 0 && clubCode.replace(/\s/g, '').length === 9 && clubServices.length > 0;
  const isStep2Valid = clubAddress.trim().length > 0 && branchesCount.length > 0 && membersScale.length > 0 && hardwareType.length > 0;
  const isStep3Valid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    position.trim().length > 0 &&
    phone.replace(/\D/g, '').length === 12 &&
    email.includes('@') &&
    password.length >= 6 &&
    /^\d{11}$/.test(personalId) &&
    isAgreed &&
    isBiometricAgreed;

  const handleSubmit = async () => {
    soundEngine.playSystemAccess();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const fullAddress = `${city}, ${clubAddress}`;
      const res = await registerClubAction({
        clubName,
        clubLegalForm,
        clubCode,
        clubServices: `${clubServices} | ${membersScale}`,
        clubAddress: fullAddress,
        branchesCount,
        gatesCount: hardwareType,
        clubFirstName: firstName,
        clubLastName: lastName,
        clubExecPosition: position,
        clubContactMobile: phone,
        clubOfficialEmail: email,
        clubAccessCode: password,
        personalId,
      });

      if (res.success) {
        if (res.deploymentKey) setDeploymentKey(res.deploymentKey);
        setIsSuccess(true);
        onComplete?.({
          clubName,
          clubLegalForm,
          clubCode,
          clubServices,
          city,
          clubAddress,
          branchesCount,
          membersScale,
          hardwareType,
          firstName,
          lastName,
          position,
          phone,
          email,
          personalId,
          isTrial: true,
        });
      } else {
        setSubmitError(res.error || 'რეგისტრაცია ვერ მოხერხდა.');
      }
    } catch (err: any) {
      setSubmitError(err.message || 'სისტემური შეცდომა რეგისტრაციისას.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full flex flex-col justify-between select-none ${isCompact ? 'p-1 font-sans' : 'p-2 md:p-4 font-sans'}`}>
      {/* Main Mode Body */}
      {activeTab === 'DEMO' ? (
        <div className="p-4 sm:p-6 rounded-2xl bg-[#0E131F]/90 border border-emerald-500/30 backdrop-blur-xl">
          <QuickDemoBookingView 
            onCancel={onCancel || (() => {})} 
            onSwitchToRegister={() => {
              soundEngine.playPulseNode();
              setActiveTab('REGISTER');
            }}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col justify-between">
          {!isSuccess && (
            <div className="mb-4">
              <PS5ProgressStepper
                currentStep={step}
                steps={STEPS}
                onStepClick={(target) => {
                  if (target === 1) setStep(1);
                  if (target === 2 && isStep1Valid) setStep(2);
                }}
              />
            </div>
          )}

          {isSuccess ? (
            <PS5ActivationSequence
              deploymentKey={deploymentKey}
              email={email}
              facilityName={clubName}
              onReset={() => {
                if (onCancel) onCancel();
                else setIsSuccess(false);
              }}
            />
          ) : (
            <div className="p-4 sm:p-6 rounded-2xl bg-[#0E131F]/90 border border-white/[0.12] backdrop-blur-xl">
              {step === 1 && (
                <Step1FacilityView
                  clubName={clubName}
                  setClubName={setClubName}
                  clubLegalForm={clubLegalForm}
                  setClubLegalForm={setClubLegalForm}
                  clubCode={clubCode}
                  setClubCode={setClubCode}
                  clubServices={clubServices}
                  setClubServices={setClubServices}
                  city={city}
                  setCity={setCity}
                  isStep1Valid={isStep1Valid}
                  onNext={() => {
                    soundEngine.playPulseNode();
                    setStep(2);
                  }}
                  onCancel={onCancel || (() => {})}
                />
              )}

              {step === 2 && (
                <Step2CapacityView
                  clubAddress={clubAddress}
                  setClubAddress={setClubAddress}
                  branchesCount={branchesCount}
                  setBranchesCount={setBranchesCount}
                  membersScale={membersScale}
                  setMembersScale={setMembersScale}
                  hardwareType={hardwareType}
                  setHardwareType={setHardwareType}
                  isStep2Valid={isStep2Valid}
                  onNext={() => {
                    soundEngine.playPulseNode();
                    setStep(3);
                  }}
                  onBack={() => {
                    soundEngine.playPulseNode();
                    setStep(1);
                  }}
                />
              )}

              {step === 3 && (
                <Step3AuthorityView
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  position={position}
                  setPosition={setPosition}
                  phone={phone}
                  setPhone={setPhone}
                  email={email}
                  setEmail={setEmail}
                  personalId={personalId}
                  setPersonalId={setPersonalId}
                  password={password}
                  setPassword={setPassword}
                  isAgreed={isAgreed}
                  setIsAgreed={setIsAgreed}
                  isBiometricAgreed={isBiometricAgreed}
                  setIsBiometricAgreed={setIsBiometricAgreed}
                  isStep3Valid={isStep3Valid}
                  onSubmit={handleSubmit}
                  onBack={() => {
                    soundEngine.playPulseNode();
                    setStep(2);
                  }}
                  isSubmitting={isSubmitting}
                  submitError={submitError}
                />
              )}
            </div>
          )}

          {/* Quick Login Redirection if available */}
          {!isSuccess && onSwitchToLogin && (
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-[11px] font-mono text-[#9CA3AF] hover:text-[#00FF87] tracking-wider transition-colors cursor-pointer"
              >
                {t('registration.switch_to_login') || 'უკვე გაქვთ ანგარიში? ავტორიზაცია'} →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
