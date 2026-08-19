'use client';

import React, { useState, useEffect } from 'react';
import { PS5ProgressStepper } from './PS5ProgressStepper';
import { Step1FacilityView } from './Step1FacilityView';
import { Step2CapacityView } from './Step2CapacityView';
import { Step3AuthorityView } from './Step3AuthorityView';
import { PS5ActivationSequence } from './PS5ActivationSequence';
import { registerClubAction } from '../../actions';
import { soundEngine } from '@/core';
import { Sparkles, Zap, Building2, ChevronDown, Check } from 'lucide-react';

interface PS5RegistrationWizardProps {
  onReset: () => void;
  initialPlan?: string;
  initialCycle?: string;
}

const STEPS = [
  { number: 1, title: 'ობიექტი', subtitle: 'პროფილი & იდენტობა' },
  { number: 2, title: 'მასშტაბი', subtitle: 'IoT & აპარატურა' },
  { number: 3, title: 'ადმინისტრატორი', subtitle: 'უსაფრთხოება & წვდომა' },
];

const PLAN_PRESETS: Record<'starter' | 'pro' | 'enterprise', {
  id: 'starter' | 'pro' | 'enterprise';
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  badge: string;
  defaultMembers: string;
  defaultBranches: string;
  defaultHardware: string;
  icon: any;
}> = {
  starter: {
    id: 'starter',
    name: 'STARTER STUDIO',
    monthlyPrice: 350,
    annualPrice: 280,
    badge: '100 წევრამდე',
    defaultMembers: '< 100 წევრი',
    defaultBranches: '1 ფილიალი',
    defaultHardware: 'მობილური QR სკანერი',
    icon: Zap,
  },
  pro: {
    id: 'pro',
    name: 'PRO FITNESS',
    monthlyPrice: 565,
    annualPrice: 450,
    badge: '1,000 წევრამდე & IoT',
    defaultMembers: '100 – 500 წევრი',
    defaultBranches: '1 ფილიალი',
    defaultHardware: 'ტურნიკეტები & ბარიერები',
    icon: Sparkles,
  },
  enterprise: {
    id: 'enterprise',
    name: 'ENTERPRISE OS',
    monthlyPrice: 950,
    annualPrice: 760,
    badge: 'ულიმიტო & ქსელი',
    defaultMembers: '1500+ წევრი',
    defaultBranches: 'ქსელი (4+ ფილიალი)',
    defaultHardware: 'ტურნიკეტები & ბარიერები',
    icon: Building2,
  },
};

export const PS5RegistrationWizard: React.FC<PS5RegistrationWizardProps> = ({ 
  onReset,
  initialPlan = 'pro',
  initialCycle = 'monthly',
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
  const [showPlanSwitcher, setShowPlanSwitcher] = useState(false);

  // Step 1: Facility States
  const [clubName, setClubName] = useState('');
  const [clubLegalForm, setClubLegalForm] = useState('შპს');
  const [clubCode, setClubCode] = useState('');
  const [clubServices, setClubServices] = useState('ფიტნეს დარბაზი');
  const [city, setCity] = useState('თბილისი');

  // Step 2: Capacity & Hardware States with smart defaults from plan
  const activePreset = PLAN_PRESETS[selectedPlan];
  const [clubAddress, setClubAddress] = useState('');
  const [branchesCount, setBranchesCount] = useState(activePreset.defaultBranches);
  const [membersScale, setMembersScale] = useState(activePreset.defaultMembers);
  const [hardwareType, setHardwareType] = useState(activePreset.defaultHardware);

  // Smart Pre-fill when plan changes
  const handleSelectPlan = (newPlan: 'starter' | 'pro' | 'enterprise') => {
    setSelectedPlan(newPlan);
    const preset = PLAN_PRESETS[newPlan];
    setBranchesCount(preset.defaultBranches);
    setMembersScale(preset.defaultMembers);
    setHardwareType(preset.defaultHardware);
    soundEngine.playPulseNode();
    setShowPlanSwitcher(false);
  };

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

  // Validations
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
        plan: selectedPlan.toUpperCase(),
        billingCycle: billingCycle.toUpperCase(),
      });

      if (res.success) {
        if (res.deploymentKey) setDeploymentKey(res.deploymentKey);
        soundEngine.playSystemAccess();
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

  const currentPrice = billingCycle === 'annual' ? activePreset.annualPrice : activePreset.monthlyPrice;

  return (
    <div className="w-full flex flex-col justify-between">
      {!isSuccess && (
        <div className="mb-6 space-y-4">
          {/* Selected Plan Ribbon Badge */}
          <div className="relative">
            <div className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] border border-[#00A3FF]/30 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00A3FF]/20 to-[#00E5FF]/30 border border-[#00A3FF]/40 flex items-center justify-center text-[#00E5FF]">
                  <activePreset.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-white font-mono tracking-wider">
                      {activePreset.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00A3FF]/20 text-[#00E5FF] font-semibold">
                      {activePreset.badge}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <span className="font-bold text-white">₾{currentPrice}</span> / თვე ({billingCycle === 'annual' ? 'წლიური -20%' : 'ყოველთვიური'})
                  </div>
                </div>
              </div>

              {/* Plan Switcher Button */}
              <button
                type="button"
                onClick={() => setShowPlanSwitcher(!showPlanSwitcher)}
                className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-[11px] font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>პაკეტის შეცვლა</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showPlanSwitcher ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Quick Plan Switcher Modal Dropdown */}
            {showPlanSwitcher && (
              <div className="absolute top-full left-0 right-0 mt-2 p-3 rounded-2xl bg-[#0F1626] border border-[#00A3FF]/40 shadow-2xl z-30 space-y-2 animate-fadeIn">
                <div className="text-[10px] font-mono text-slate-400 uppercase px-1">
                  აირჩიეთ სასურველი ტარიფი:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(Object.keys(PLAN_PRESETS) as Array<'starter' | 'pro' | 'enterprise'>).map((planKey) => {
                    const plan = PLAN_PRESETS[planKey];
                    const isCurrent = selectedPlan === planKey;
                    const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
                    return (
                      <button
                        key={planKey}
                        type="button"
                        onClick={() => handleSelectPlan(planKey)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isCurrent
                            ? 'border-[#00E5FF] bg-[#00A3FF]/15 text-white shadow-[0_0_15px_rgba(0,163,255,0.3)]'
                            : 'border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="text-[11px] font-bold">{plan.name}</span>
                          {isCurrent && <Check className="w-3.5 h-3.5 text-[#00E5FF]" />}
                        </div>
                        <div className="text-xs font-mono font-extrabold text-[#00E5FF]">
                          ₾{price} <span className="text-[10px] text-slate-400 font-normal">/თვე</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

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
          selectedPlan={selectedPlan}
          billingCycle={billingCycle}
          onReset={onReset}
        />
      ) : (
        <>
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
              onNext={() => setStep(2)}
              onCancel={onReset}
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
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
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
              onBack={() => setStep(2)}
              isSubmitting={isSubmitting}
              submitError={submitError}
            />
          )}
        </>
      )}
    </div>
  );
};

