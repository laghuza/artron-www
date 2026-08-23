'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PS5LiveHologram, PLAN_PRESETS } from './PS5LiveHologram';
import { Step1FacilityView } from './Step1FacilityView';
import { Step2CapacityView } from './Step2CapacityView';
import { Step3AuthorityView } from './Step3AuthorityView';
import { PS5ActivationSequence } from './PS5ActivationSequence';
import { PS5DualSenseDock } from './PS5DualSenseDock';
import { registerClubAction } from '../../actions';
import { ps5Audio } from '../../core/ps5SoundEngine';

interface PS5RegistrationWizardProps {
  onReset: () => void;
  initialPlan?: string;
  initialCycle?: string;
  onStepChange?: (step: number) => void;
}

export const PS5RegistrationWizard: React.FC<PS5RegistrationWizardProps> = ({
  onReset,
  initialPlan = 'pro',
  initialCycle = 'monthly',
  onStepChange,
}) => {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [deploymentKey, setDeploymentKey] = useState('ART-CLB-108XX');

  // Plan Selection States
  const normalizedInitialPlan = (['starter', 'pro', 'enterprise'].includes(initialPlan.toLowerCase())
    ? initialPlan.toLowerCase()
    : 'pro') as 'starter' | 'pro' | 'enterprise';

  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro' | 'enterprise'>(normalizedInitialPlan);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(
    initialCycle.toLowerCase() === 'annual' ? 'annual' : 'monthly'
  );

  // Step 1: Facility States
  const [clubName, setClubName] = useState('');
  const [clubLegalForm, setClubLegalForm] = useState('შპს');
  const [clubCode, setClubCode] = useState('');
  const [clubServices, setClubServices] = useState('ფიტნეს დარბაზი');
  const [city, setCity] = useState('თბილისი');

  // Step 2: Capacity & Hardware States
  const activePreset = PLAN_PRESETS[selectedPlan];
  const [clubAddress, setClubAddress] = useState('');
  const [branchesCount, setBranchesCount] = useState(activePreset.defaultBranches);
  const [membersScale, setMembersScale] = useState(activePreset.defaultMembers);
  const [hardwareType, setHardwareType] = useState(activePreset.defaultHardware);

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

  // Notify parent of step change
  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  // Pre-fill when plan changes
  const handleSelectPlan = (newPlan: 'starter' | 'pro' | 'enterprise') => {
    setSelectedPlan(newPlan);
    const preset = PLAN_PRESETS[newPlan];
    setBranchesCount(preset.defaultBranches);
    setMembersScale(preset.defaultMembers);
    setHardwareType(preset.defaultHardware);
  };

  // Validations
  const isStep1Valid =
    clubName.trim().length > 0 &&
    clubCode.replace(/\s/g, '').length === 9 &&
    clubServices.length > 0;

  const isStep2Valid =
    clubAddress.trim().length > 0 &&
    branchesCount.length > 0 &&
    membersScale.length > 0 &&
    hardwareType.length > 0;

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

  const handleNext = useCallback(() => {
    if (step === 1 && isStep1Valid) {
      ps5Audio.playSelect();
      setStep(2);
    } else if (step === 2 && isStep2Valid) {
      ps5Audio.playSelect();
      setStep(3);
    } else if (step === 3 && isStep3Valid) {
      handleSubmit();
    }
  }, [step, isStep1Valid, isStep2Valid, isStep3Valid]);

  const handleBack = useCallback(() => {
    ps5Audio.playBack();
    if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
    } else {
      onReset();
    }
  }, [step, onReset]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing inside an active input unless it's Enter
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA';

      if (e.key === 'Enter') {
        if (step === 1 && isStep1Valid) handleNext();
        else if (step === 2 && isStep2Valid) handleNext();
        else if (step === 3 && isStep3Valid && !isSubmitting) handleSubmit();
      } else if (e.key === 'Escape') {
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, isStep1Valid, isStep2Valid, isStep3Valid, isSubmitting, handleNext, handleBack]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    ps5Audio.playSelect();
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
        plan: selectedPlan.toUpperCase(),
        billingCycle: billingCycle.toUpperCase(),
      });

      if (res.success) {
        if (res.deploymentKey) setDeploymentKey(res.deploymentKey);
        setIsSuccess(true);
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
    (step === 3 && (!isStep3Valid || isSubmitting));

  const nextButtonLabel =
    step === 3 ? '🚀 ობიექტის გააქტიურება' : 'შემდეგი ეტაპი';

  if (isSuccess) {
    return (
      <PS5ActivationSequence
        deploymentKey={deploymentKey}
        email={email}
        facilityName={clubName}
        selectedPlan={selectedPlan}
        billingCycle={billingCycle}
        onReset={onReset}
      />
    );
  }

  return (
    <div className="w-full flex flex-col justify-between flex-grow">
      {/* 2-Column Split Console View on Desktops */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 3D Holographic Console Unit (4 cols on lg) */}
        <div className="lg:col-span-5 w-full">
          <PS5LiveHologram
            selectedPlan={selectedPlan}
            billingCycle={billingCycle}
            onSelectPlan={handleSelectPlan}
            onToggleBillingCycle={setBillingCycle}
            currentStep={step}
          />
        </div>

        {/* Right Column: PS5 Interactive Setup Chamber (7 cols on lg) */}
        <div className="lg:col-span-7 w-full p-6 sm:p-9 rounded-3xl bg-[#090E1B]/90 border border-white/[0.1] backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Top Edge Cyan Laser Accent */}
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-90" />

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
              onNext={handleNext}
              onCancel={handleBack}
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
              onNext={handleNext}
              onBack={handleBack}
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
              onBack={handleBack}
              isSubmitting={isSubmitting}
              submitError={submitError}
            />
          )}
        </div>
      </div>

      {/* PlayStation DualSense Controller Legend & Navigation Dock */}
      <PS5DualSenseDock
        onNext={handleNext}
        onBack={handleBack}
        isNextDisabled={isCurrentNextDisabled}
        nextLabel={nextButtonLabel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
