import { UserRole } from '../../config/rbac.config';

export type OnboardingStep =
  | 'WELCOME_HUD'
  | 'ROLE_SELECTION'
  | 'BIOMETRIC_SCAN'
  | 'ORGANIZATION_SYNC'
  | 'CREDENTIAL_PROVISION'
  | 'SYSTEM_READY';

export interface OnboardingState {
  currentStep: OnboardingStep;
  selectedRole: UserRole | null;
  biometricId: string | null;
  organizationName: string;
  tenantId: string | null;
  accountEmail: string;
  isBiometricScanned: boolean;
  stepProgressPercentage: number;
}

export const INITIAL_ONBOARDING_STATE: OnboardingState = {
  currentStep: 'WELCOME_HUD',
  selectedRole: null,
  biometricId: null,
  organizationName: '',
  tenantId: null,
  accountEmail: '',
  isBiometricScanned: false,
  stepProgressPercentage: 0,
};

const STEP_ORDER: OnboardingStep[] = [
  'WELCOME_HUD',
  'ROLE_SELECTION',
  'BIOMETRIC_SCAN',
  'ORGANIZATION_SYNC',
  'CREDENTIAL_PROVISION',
  'SYSTEM_READY',
];

export class OnboardingStateMachine {
  private state: OnboardingState;

  constructor(initialState: Partial<OnboardingState> = {}) {
    this.state = { ...INITIAL_ONBOARDING_STATE, ...initialState };
    this.updateProgress();
  }

  public getState(): OnboardingState {
    return { ...this.state };
  }

  public setRole(role: UserRole): OnboardingState {
    this.state.selectedRole = role;
    return this.getState();
  }

  public simulateBiometricScan(nfcPayload?: string): OnboardingState {
    const generatedId = nfcPayload || `BIO-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    this.state.biometricId = generatedId;
    this.state.isBiometricScanned = true;
    return this.getState();
  }

  public setOrgDetails(orgName: string, tenantId: string): OnboardingState {
    this.state.organizationName = orgName;
    this.state.tenantId = tenantId;
    return this.getState();
  }

  public setEmail(email: string): OnboardingState {
    this.state.accountEmail = email;
    return this.getState();
  }

  public nextStep(): OnboardingState {
    const currentIndex = STEP_ORDER.indexOf(this.state.currentStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      this.state.currentStep = STEP_ORDER[currentIndex + 1];
      this.updateProgress();
    }
    return this.getState();
  }

  public previousStep(): OnboardingState {
    const currentIndex = STEP_ORDER.indexOf(this.state.currentStep);
    if (currentIndex > 0) {
      this.state.currentStep = STEP_ORDER[currentIndex - 1];
      this.updateProgress();
    }
    return this.getState();
  }

  public jumpToStep(step: OnboardingStep): OnboardingState {
    this.state.currentStep = step;
    this.updateProgress();
    return this.getState();
  }

  private updateProgress(): void {
    const currentIndex = STEP_ORDER.indexOf(this.state.currentStep);
    this.state.stepProgressPercentage = Math.round(((currentIndex + 1) / STEP_ORDER.length) * 100);
  }
}
