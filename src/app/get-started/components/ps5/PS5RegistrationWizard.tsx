'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { PS5LiveHologram } from './PS5LiveHologram';
import { PS5ProgressStepper, StepperStep } from './PS5ProgressStepper';
import { Step1FacilityTypeMatrix, FacilityTypeMatrixItem } from './Step1FacilityTypeMatrix';
import { Step2ScaleTelemetryView } from './Step2ScaleTelemetryView';
import { Step3OrgIdentityView } from './Step3OrgIdentityView';
import { Step4CommandAccessView } from './Step4CommandAccessView';
import { Step5SystemLaunchSequence } from './Step5SystemLaunchSequence';
import { PS5DualSenseDock } from './PS5DualSenseDock';
import { registerClubAction } from '../../actions';
import { ps5Audio } from '../../core/ps5SoundEngine';

export interface PS5RegistrationWizardProps {
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
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [deploymentKey, setDeploymentKey] = useState('ART-CLB-108XX');

  const wizardSteps: StepperStep[] = useMemo(() => [
    { number: 1, title: t('ps5_onboarding.stepper_step1_title'), subtitle: t('ps5_onboarding.stepper_step1_sub') },
    { number: 2, title: t('ps5_onboarding.stepper_step2_title'), subtitle: t('ps5_onboarding.stepper_step2_sub') },
    { number: 3, title: t('ps5_onboarding.stepper_step3_title'), subtitle: t('ps5_onboarding.stepper_step3_sub') },
    { number: 4, title: t('ps5_onboarding.stepper_step4_title'), subtitle: t('ps5_onboarding.stepper_step4_sub') },
  ], [t]);

  const normalizedPlan = (['starter', 'pro', 'enterprise'].includes(initialPlan.toLowerCase())
    ? initialPlan.toLowerCase()
    : 'pro') as 'starter' | 'pro' | 'enterprise';

  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'pro' | 'enterprise'>(normalizedPlan);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(
    initialCycle.toLowerCase() === 'annual' ? 'annual' : 'monthly'
  );

  // Form States across Steps 1-4
  const [facilityType, setFacilityType] = useState('gym');
  const [turnstilesCount, setTurnstilesCount] = useState(2);
  const [isAntiPassbackEnabled, setIsAntiPassbackEnabled] = useState(true);
  const [membersCapacity, setMembersCapacity] = useState(500);
  const [trainersCount, setTrainersCount] = useState(8);
  const [branchesCount, setBranchesCount] = useState('1 ფილიალი');
  const [clubName, setClubName] = useState('');
  const [clubLegalForm, setClubLegalForm] = useState('შპს');
  const [clubCode, setClubCode] = useState('');
  const [city, setCity] = useState('თბილისი');
  const [clubAddress, setClubAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('დამფუძნებელი / დირექტორი');
  const [phone, setPhone] = useState('+995');
  const [email, setEmail] = useState('');
  const [personalId, setPersonalId] = useState('');
  const [password, setPassword] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isBiometricAgreed, setIsBiometricAgreed] = useState(false);

  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

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

  const handleNext = useCallback(() => {
    if (step === 1 && isStep1Valid) { ps5Audio.playSelect(); setStep(2); }
    else if (step === 2 && isStep2Valid) { ps5Audio.playSelect(); setStep(3); }
    else if (step === 3 && isStep3Valid) { ps5Audio.playSelect(); setStep(4); }
    else if (step === 4 && isStep4Valid) { handleSubmit(); }
  }, [step, isStep1Valid, isStep2Valid, isStep3Valid, isStep4Valid]);

  const handleBack = useCallback(() => {
    ps5Audio.playBack();
    if (step > 1) setStep((prev) => prev - 1);
    else onReset();
  }, [step, onReset]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA') return;
      if (e.key === 'Enter') {
        if (step === 1 && isStep1Valid) handleNext();
        else if (step === 2 && isStep2Valid) handleNext();
        else if (step === 3 && isStep3Valid) handleNext();
        else if (step === 4 && isStep4Valid && !isSubmitting) handleSubmit();
      } else if (e.key === 'Escape') handleBack();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, isStep1Valid, isStep2Valid, isStep3Valid, isStep4Valid, isSubmitting, handleNext, handleBack]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    ps5Audio.playSelect();
    try {
      const fullAddress = `${city}, ${clubAddress}`;
      const hardwareDesc = `${turnstilesCount} ტურნიკეტი (Anti-passback: ${isAntiPassbackEnabled ? 'ON' : 'OFF'}) | ${trainersCount} მწვრთნელი`;
      const res = await registerClubAction({
        clubName, clubLegalForm, clubCode,
        clubServices: `${facilityType} | ${membersCapacity} წევრი`,
        clubAddress: fullAddress, branchesCount, gatesCount: hardwareDesc,
        clubFirstName: firstName, clubLastName: lastName, clubExecPosition: position,
        clubContactMobile: phone, clubOfficialEmail: email, clubAccessCode: password,
        personalId, plan: selectedPlan.toUpperCase(), billingCycle: billingCycle.toUpperCase(),
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
    (step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid) ||
    (step === 3 && !isStep3Valid) || (step === 4 && (!isStep4Valid || isSubmitting));

  const nextButtonLabel = step === 4 ? t('ps5_onboarding.dock_btn_submit') : t('ps5_onboarding.dock_btn_next');

  const stage3DContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 } },
  };

  const hologram3DMorphVariants: Variants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.88, x: shouldReduceMotion ? 0 : -20, z: shouldReduceMotion ? 0 : -120, rotateY: shouldReduceMotion ? 0 : 5 },
    visible: { opacity: 1, scale: 1, x: 0, z: 0, rotateY: 0, transition: { type: 'spring', stiffness: 140, damping: 22, mass: 0.85 } },
  };

  const setupChamber3DMorphVariants: Variants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.9, y: shouldReduceMotion ? 0 : 25, z: shouldReduceMotion ? 0 : -140 },
    visible: { opacity: 1, scale: 1, y: 0, z: 0, transition: { type: 'spring', stiffness: 130, damping: 20, mass: 0.9 } },
  };

  if (isSuccess) {
    return (
      <Step5SystemLaunchSequence
        deploymentKey={deploymentKey} email={email} facilityName={clubName}
        facilityType={facilityType} selectedPlan={selectedPlan} billingCycle={billingCycle} onReset={onReset}
      />
    );
  }

  return (
    <div className="w-full flex flex-col justify-between flex-grow relative overflow-hidden" data-testid="ps5-registration-wizard">
      {/* Cosmic Morph Birth Aura Flash (Harmonizes with fading particle blast) */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
          <motion.div
            initial={{ scale: 0.4, opacity: 0.85 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-96 h-96 rounded-full bg-gradient-to-r from-[#00A3FF]/20 via-[#00E5FF]/15 to-transparent blur-3xl pointer-events-none"
          />
        </div>
      )}

      {/* 2-Column Split Console View with 3D Z-Axis Perspective */}
      <motion.div
        variants={stage3DContainerVariants}
        initial="hidden" animate="visible"
        style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10"
      >
        <motion.div variants={hologram3DMorphVariants} className="lg:col-span-5 w-full">
          <PS5LiveHologram
            selectedPlan={selectedPlan} billingCycle={billingCycle}
            onSelectPlan={setSelectedPlan} onToggleBillingCycle={setBillingCycle} currentStep={step}
          />
        </motion.div>

        <motion.div
          variants={setupChamber3DMorphVariants}
          className="lg:col-span-7 w-full p-5 sm:p-8 rounded-3xl bg-[#090E1B]/90 border border-white/[0.1] backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col justify-between min-h-[560px]"
        >
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-90" />

          <PS5ProgressStepper
            currentStep={step} steps={wizardSteps}
            onStepClick={(targetStep) => {
              if (targetStep === 1) setStep(1);
              if (targetStep === 2 && isStep1Valid) setStep(2);
              if (targetStep === 3 && isStep1Valid && isStep2Valid) setStep(3);
            }}
          />

          <div className="flex-1">
            {step === 1 && (
              <Step1FacilityTypeMatrix
                selectedFacility={facilityType} onSelectFacility={(item: FacilityTypeMatrixItem) => setFacilityType(item.id)}
                onNext={handleNext} onCancel={handleBack}
              />
            )}
            {step === 2 && (
              <Step2ScaleTelemetryView
                turnstilesCount={turnstilesCount} setTurnstilesCount={setTurnstilesCount}
                isAntiPassbackEnabled={isAntiPassbackEnabled} setIsAntiPassbackEnabled={setIsAntiPassbackEnabled}
                membersCapacity={membersCapacity} setMembersCapacity={setMembersCapacity}
                trainersCount={trainersCount} setTrainersCount={setTrainersCount}
                branchesCount={branchesCount} setBranchesCount={setBranchesCount}
                onNext={handleNext} onBack={handleBack}
              />
            )}
            {step === 3 && (
              <Step3OrgIdentityView
                clubName={clubName} setClubName={setClubName}
                clubLegalForm={clubLegalForm} setClubLegalForm={setClubLegalForm}
                clubCode={clubCode} setClubCode={setClubCode}
                city={city} setCity={setCity}
                clubAddress={clubAddress} setClubAddress={setClubAddress}
                onNext={handleNext} onBack={handleBack}
              />
            )}
            {step === 4 && (
              <Step4CommandAccessView
                firstName={firstName} setFirstName={setFirstName}
                lastName={lastName} setLastName={setLastName}
                position={position} setPosition={setPosition}
                phone={phone} setPhone={setPhone}
                email={email} setEmail={setEmail}
                personalId={personalId} setPersonalId={setPersonalId}
                password={password} setPassword={setPassword}
                isAgreed={isAgreed} setIsAgreed={setIsAgreed}
                isBiometricAgreed={isBiometricAgreed} setIsBiometricAgreed={setIsBiometricAgreed}
                submitError={submitError}
              />
            )}
          </div>
        </motion.div>
      </motion.div>

      <div className="relative z-10">
        <PS5DualSenseDock
          onNext={handleNext} onBack={handleBack}
          isNextDisabled={isCurrentNextDisabled} nextLabel={nextButtonLabel} isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};
