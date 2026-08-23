'use client';

import React, { useState } from 'react';
import { soundEngine } from '@/core';
import { useI18n } from '@/context/I18nContext';
import { PS5ProgressStepper, StepperStep } from '@/app/get-started/components/ps5/PS5ProgressStepper';
import { Step1FacilityTypeMatrix, FacilityTypeMatrixItem } from '@/app/get-started/components/ps5/Step1FacilityTypeMatrix';
import { Step2ScaleTelemetryView } from '@/app/get-started/components/ps5/Step2ScaleTelemetryView';
import { Step3OrgIdentityView } from '@/app/get-started/components/ps5/Step3OrgIdentityView';
import { Step4CommandAccessView } from '@/app/get-started/components/ps5/Step4CommandAccessView';
import { Step5SystemLaunchSequence } from '@/app/get-started/components/ps5/Step5SystemLaunchSequence';
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

const STEPS: StepperStep[] = [
  { number: 1, title: 'ობიექტი', subtitle: 'ტიპი & კატეგორია' },
  { number: 2, title: 'მასშტაბი', subtitle: 'IoT & ტელემეტრია' },
  { number: 3, title: 'იდენტობა', subtitle: 'სახელი & მისამართი' },
  { number: 4, title: 'სარდლობა', subtitle: 'ადმინი & დაცვა' },
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

  // Step 1 State
  const [facilityType, setFacilityType] = useState('ფიტნეს კლუბი & დარბაზი');

  // Step 2 State
  const [turnstilesCount, setTurnstilesCount] = useState(2);
  const [isAntiPassbackEnabled, setIsAntiPassbackEnabled] = useState(true);
  const [membersCapacity, setMembersCapacity] = useState(500);
  const [trainersCount, setTrainersCount] = useState(8);
  const [branchesCount, setBranchesCount] = useState('1 ფილიალი');

  // Step 3 State
  const [clubName, setClubName] = useState('');
  const [clubLegalForm, setClubLegalForm] = useState('შპს');
  const [clubCode, setClubCode] = useState('');
  const [city, setCity] = useState('თბილისი');
  const [clubAddress, setClubAddress] = useState('');

  // Step 4 State
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
  const isStep1Valid = facilityType.trim().length > 0;
  const isStep2Valid = turnstilesCount >= 1 && membersCapacity >= 100 && branchesCount.length > 0;
  const isStep3Valid = clubName.trim().length > 0 && clubCode.replace(/\s/g, '').length === 9 && clubAddress.trim().length > 0;
  const isStep4Valid =
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
      const hardwareDesc = `${turnstilesCount} ტურნიკეტი (Anti-passback: ${isAntiPassbackEnabled ? 'ON' : 'OFF'}) | ${trainersCount} მწვრთნელი`;
      const res = await registerClubAction({
        clubName,
        clubLegalForm,
        clubCode,
        clubServices: `${facilityType} | ${membersCapacity} წევრი`,
        clubAddress: fullAddress,
        branchesCount,
        gatesCount: hardwareDesc,
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
          clubServices: facilityType,
          city,
          clubAddress,
          branchesCount,
          membersScale: `${membersCapacity} წევრი`,
          hardwareType: hardwareDesc,
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

  const isCurrentNextDisabled =
    (step === 1 && !isStep1Valid) ||
    (step === 2 && !isStep2Valid) ||
    (step === 3 && !isStep3Valid) ||
    (step === 4 && (!isStep4Valid || isSubmitting));

  return (
    <div className={`w-full flex flex-col justify-between select-none ${isCompact ? 'p-1 font-sans' : 'p-2 md:p-4 font-sans'}`}>
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
                  if (target === 3 && isStep1Valid && isStep2Valid) setStep(3);
                }}
              />
            </div>
          )}

          {isSuccess ? (
            <Step5SystemLaunchSequence
              deploymentKey={deploymentKey}
              email={email}
              facilityName={clubName}
              facilityType={facilityType}
              onReset={() => {
                if (onCancel) onCancel();
                else setIsSuccess(false);
              }}
            />
          ) : (
            <div className="p-4 sm:p-6 rounded-2xl bg-[#0E131F]/90 border border-white/[0.12] backdrop-blur-xl flex flex-col gap-6">
              {step === 1 && (
                <Step1FacilityTypeMatrix
                  selectedFacility={facilityType}
                  onSelectFacility={(item: FacilityTypeMatrixItem) => setFacilityType(item.label)}
                  onNext={() => {
                    soundEngine.playPulseNode();
                    setStep(2);
                  }}
                  onCancel={onCancel || (() => {})}
                />
              )}

              {step === 2 && (
                <Step2ScaleTelemetryView
                  turnstilesCount={turnstilesCount}
                  setTurnstilesCount={setTurnstilesCount}
                  isAntiPassbackEnabled={isAntiPassbackEnabled}
                  setIsAntiPassbackEnabled={setIsAntiPassbackEnabled}
                  membersCapacity={membersCapacity}
                  setMembersCapacity={setMembersCapacity}
                  trainersCount={trainersCount}
                  setTrainersCount={setTrainersCount}
                  branchesCount={branchesCount}
                  setBranchesCount={setBranchesCount}
                />
              )}

              {step === 3 && (
                <Step3OrgIdentityView
                  clubName={clubName}
                  setClubName={setClubName}
                  clubLegalForm={clubLegalForm}
                  setClubLegalForm={setClubLegalForm}
                  clubCode={clubCode}
                  setClubCode={setClubCode}
                  city={city}
                  setCity={setCity}
                  clubAddress={clubAddress}
                  setClubAddress={setClubAddress}
                />
              )}

              {step === 4 && (
                <Step4CommandAccessView
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
                  submitError={submitError}
                />
              )}

              {/* Navigation Action Buttons for Modal / Portal Mode */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playPulseNode();
                    if (step > 1) setStep(step - 1);
                    else onCancel?.();
                  }}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 text-xs font-semibold uppercase transition-colors cursor-pointer"
                >
                  {step === 1 ? 'გაუქმება' : '← უკან'}
                </button>

                <button
                  type="button"
                  disabled={isCurrentNextDisabled}
                  onClick={() => {
                    if (step < 4) {
                      soundEngine.playPulseNode();
                      setStep(step + 1);
                    } else {
                      handleSubmit();
                    }
                  }}
                  className={`px-7 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                    !isCurrentNextDisabled
                      ? 'bg-gradient-to-r from-[#00A3FF] via-[#0066FF] to-[#00D2FF] text-white shadow-[0_0_20px_rgba(0,163,255,0.4)] hover:shadow-[0_0_30px_rgba(0,163,255,0.7)] hover:scale-[1.02] cursor-pointer'
                      : 'bg-white/[0.04] text-white/30 border border-white/[0.06] cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'მუშავდება...' : step === 4 ? '🚀 SPORT OS გააქტიურება' : 'შემდეგი ეტაპი →'}
                </button>
              </div>
            </div>
          )}

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
