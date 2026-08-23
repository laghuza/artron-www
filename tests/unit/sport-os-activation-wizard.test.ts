import fs from 'fs';
import path from 'path';

describe('Stage 2 & 3: 5-Step Sport OS Activation Wizard & i18n Copywriting Tests', () => {
  const wizardPath = path.resolve(process.cwd(), 'src/app/get-started/components/ps5/PS5RegistrationWizard.tsx');
  const stepperPath = path.resolve(process.cwd(), 'src/app/get-started/components/ps5/PS5ProgressStepper.tsx');
  const step1Path = path.resolve(process.cwd(), 'src/app/get-started/components/ps5/Step1FacilityTypeMatrix.tsx');
  const step2Path = path.resolve(process.cwd(), 'src/app/get-started/components/ps5/Step2ScaleTelemetryView.tsx');
  const step3Path = path.resolve(process.cwd(), 'src/app/get-started/components/ps5/Step3OrgIdentityView.tsx');
  const step4Path = path.resolve(process.cwd(), 'src/app/get-started/components/ps5/Step4CommandAccessView.tsx');
  const step5Path = path.resolve(process.cwd(), 'src/app/get-started/components/ps5/Step5SystemLaunchSequence.tsx');
  const geDictPath = path.resolve(process.cwd(), 'src/dictionaries/ge.json');

  const geDict = JSON.parse(fs.readFileSync(geDictPath, 'utf-8'));

  test('All 5 step components exist and are properly structured', () => {
    expect(fs.existsSync(wizardPath)).toBe(true);
    expect(fs.existsSync(stepperPath)).toBe(true);
    expect(fs.existsSync(step1Path)).toBe(true);
    expect(fs.existsSync(step2Path)).toBe(true);
    expect(fs.existsSync(step3Path)).toBe(true);
    expect(fs.existsSync(step4Path)).toBe(true);
    expect(fs.existsSync(step5Path)).toBe(true);
  });

  test('PS5ProgressStepper implements laser progress line and 5-step support', () => {
    const content = fs.readFileSync(stepperPath, 'utf-8');
    expect(content).toContain('PS5ProgressStepper');
    expect(content).toContain('progressPercent');
    expect(content).toContain('bg-gradient-to-r from-[#0066FF] via-[#00A3FF] to-[#00E5FF]');
  });

  test('Step 1 contains 4 massive futuristic 3D facility choices in dictionary and references keys', () => {
    const content = fs.readFileSync(step1Path, 'utf-8');
    expect(content).toContain("t('ps5_onboarding.facility_gym_label')");
    expect(content).toContain("t('ps5_onboarding.facility_pool_label')");
    expect(content).toContain("t('ps5_onboarding.facility_studio_label')");
    expect(content).toContain("t('ps5_onboarding.facility_federation_label')");
    expect(geDict.ps5_onboarding.facility_gym_label).toContain('ფიტნეს კლუბი & დარბაზი');
    expect(geDict.ps5_onboarding.facility_pool_label).toContain('აუზი & სპა კომპლექსი');
    expect(geDict.ps5_onboarding.facility_studio_label).toContain('სპეციალიზებული სტუდია');
    expect(geDict.ps5_onboarding.facility_federation_label).toContain('ფედერაცია & კომპლექსი');
    expect(geDict.ps5_onboarding.step1_badge).toContain('STAGE 01');
  });

  test('Step 2 implements turnstile sliders, anti-passback toggle and Order №01-15/ნ timesheet badge', () => {
    const content = fs.readFileSync(step2Path, 'utf-8');
    expect(content).toContain("t('ps5_onboarding.step2_anti_passback_label')");
    expect(geDict.ps5_onboarding.step2_badge).toContain('STAGE 02 // სისტემის მასშტაბი & ტელემეტრია');
    expect(geDict.ps5_onboarding.step2_anti_passback_label).toContain('Anti-passback');
    expect(geDict.ps5_onboarding.telemetry_card_title).toContain('ლაივ ტელემეტრიული გათვლა');
  });

  test('Step 3 enforces 9-digit company code and organization identity fields', () => {
    const content = fs.readFileSync(step3Path, 'utf-8');
    expect(content).toContain('rawCodeLength === 9');
    expect(content).toContain("t('ps5_onboarding.org_code_label')");
    expect(geDict.ps5_onboarding.step3_badge).toContain('STAGE 03 // ორგანიზაციის იდენტობა & მისამართი');
    expect(geDict.ps5_onboarding.org_code_label).toContain('საიდენტიფიკაციო კოდი');
  });

  test('Step 4 includes AES-256-GCM Personal ID guarantee and password entropy meter', () => {
    const content = fs.readFileSync(step4Path, 'utf-8');
    expect(content).toContain('AES-256-GCM');
    expect(content).toContain('getPasswordStrength');
    expect(geDict.ps5_onboarding.step4_badge).toContain('STAGE 04 // სარდლობის წვდომა & უსაფრთხოება');
    expect(geDict.ps5_onboarding.pwd_strong).toContain('Cyber-Secure');
  });

  test('Step 5 implements 3-stage progressive terminal initialization and CRM direct jump', () => {
    const content = fs.readFileSync(step5Path, 'utf-8');
    expect(content).toContain('SYSTEM STATUS: SPORT OS ONLINE');
    expect(content).toContain('/sports-os');
    expect(geDict.ps5_onboarding.step5_init_stage1).toContain('ბაზები ინიციალიზებულია');
    expect(geDict.ps5_onboarding.step5_init_stage2).toContain('ტურნიკეტების TCP/MQTT პროტოკოლი მზადაა');
    expect(geDict.ps5_onboarding.step5_init_stage3).toContain('Sport OS გააქტიურებულია');
  });

  test('PS5RegistrationWizard integrates all steps within 400 lines limit', () => {
    const content = fs.readFileSync(wizardPath, 'utf-8');
    const lineCount = content.split('\n').length;
    expect(lineCount).toBeLessThanOrEqual(400);
  });
});
