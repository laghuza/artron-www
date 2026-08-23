import fs from 'fs';
import path from 'path';

describe('Seamless Morph Transition & Step 1 Emergence (Subphase 1.4 Tests)', () => {
  const globalPortalPath = path.resolve(process.cwd(), 'src/components/ui/GlobalPortalIgnition.tsx');
  const wizardPath = path.resolve(process.cwd(), 'src/app/get-started/components/ps5/PS5RegistrationWizard.tsx');
  const step1Path = path.resolve(process.cwd(), 'src/app/get-started/components/ps5/Step1FacilityView.tsx');
  const getStartedClientPath = path.resolve(process.cwd(), 'src/app/get-started/GetStartedClient.tsx');

  test('GlobalPortalIgnition implements 1.8s video fade-out before navigation transition', () => {
    const content = fs.readFileSync(globalPortalPath, 'utf-8');
    expect(content).toContain('isVideoFadingOut');
    expect(content).toContain('setIsVideoFadingOut(true)');
    expect(content).toContain('transition-opacity');
    expect(content).toContain('isVideoFadingOut ? \'opacity-0 scale-105\' : \'opacity-95 scale-100\'');
  });

  test('GlobalPortalIgnition synchronizes particle dispersal timing with router navigation', () => {
    const content = fs.readFileSync(globalPortalPath, 'utf-8');
    expect(content).toContain('videoFadeTimer');
    expect(content).toContain('navigationTimer');
    expect(content).toContain('router.push(targetHref)');
  });

  test('PS5RegistrationWizard implements Framer Motion 3D Z-axis perspective and spring morph', () => {
    const content = fs.readFileSync(wizardPath, 'utf-8');
    expect(content).toContain('framer-motion');
    expect(content).toContain('perspective: 1200');
    expect(content).toContain('transformStyle: \'preserve-3d\'');
    expect(content).toContain('hologram3DMorphVariants');
    expect(content).toContain('setupChamber3DMorphVariants');
    expect(content).toContain('stiffness: 140');
    expect(content).toContain('damping: 22');
  });

  test('PS5RegistrationWizard renders Cosmic Birth Aura Flash to seamlessly coalesce with particle blast', () => {
    const content = fs.readFileSync(wizardPath, 'utf-8');
    expect(content).toContain('Cosmic Morph Birth Aura Flash');
    expect(content).toContain('bg-gradient-to-r from-[#00A3FF]/20 via-[#00E5FF]/15 to-transparent');
  });

  test('Step1FacilityView animates category cards and inputs with spring stagger physics', () => {
    const content = fs.readFileSync(step1Path, 'utf-8');
    expect(content).toContain('motion.div');
    expect(content).toContain('motion.button');
    expect(content).toContain('staggerChildren');
    expect(content).toContain('stiffness: 260');
    expect(content).toContain('damping: 24');
  });

  test('GetStartedClient wraps stage in Framer Motion spring fade transition', () => {
    const content = fs.readFileSync(getStartedClientPath, 'utf-8');
    expect(content).toContain('motion.main');
    expect(content).toContain('useReducedMotion');
  });

  test('All components support prefers-reduced-motion gracefully', () => {
    const portalContent = fs.readFileSync(globalPortalPath, 'utf-8');
    const wizardContent = fs.readFileSync(wizardPath, 'utf-8');
    const step1Content = fs.readFileSync(step1Path, 'utf-8');

    expect(portalContent).toContain('shouldReduceMotion');
    expect(wizardContent).toContain('shouldReduceMotion');
    expect(step1Content).toContain('shouldReduceMotion');
  });
});
