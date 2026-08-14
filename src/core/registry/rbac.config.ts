export type UserRole = 'SUPER_ADMIN' | 'FEDERATION_ADMIN' | 'CLUB_ADMIN' | 'STAFF_COACH' | 'STAFF_MEDIC' | 'ATHLETE';

export interface DynamicStageCapabilities {
  canManageSystem: boolean;
  canManageFederations: boolean;
  canManageClubs: boolean;
  canAccessBiometrics: boolean;
  canViewMedicalData: boolean;
  canViewTacticalHud: boolean;
  canTriggerPurge: boolean;
}

export interface RoleConfig {
  role: UserRole;
  label: string;
  defaultRoute: string;
  authorizedRoutes: string[];
  portalViews: string[];
  capabilities: DynamicStageCapabilities;
}

const ALL_CAPS: DynamicStageCapabilities = {
  canManageSystem: true, canManageFederations: true, canManageClubs: true,
  canAccessBiometrics: true, canViewMedicalData: true, canViewTacticalHud: true, canTriggerPurge: true
};

const NO_CAPS: DynamicStageCapabilities = {
  canManageSystem: false, canManageFederations: false, canManageClubs: false,
  canAccessBiometrics: false, canViewMedicalData: false, canViewTacticalHud: false, canTriggerPurge: false
};

const makeCaps = (overrides: Partial<DynamicStageCapabilities>): DynamicStageCapabilities => ({
  ...NO_CAPS, ...overrides
});

export const RBAC_MATRIX: Record<UserRole, RoleConfig> = {
  SUPER_ADMIN: {
    role: 'SUPER_ADMIN', label: 'Super Administrator', defaultRoute: '/dashboard',
    authorizedRoutes: ['/dashboard', '/federations', '/clubs', '/athletes', '/telemetry', '/settings', '/onboarding'],
    portalViews: ['ENNEACORE_STAGE', 'TACTICAL_HUD', 'BIOMETRIC_ANALYTICS', 'SYSTEM_PURGE', 'AUDIT_LOGS'],
    capabilities: ALL_CAPS,
  },
  FEDERATION_ADMIN: {
    role: 'FEDERATION_ADMIN', label: 'Federation Director', defaultRoute: '/dashboard',
    authorizedRoutes: ['/dashboard', '/federations', '/clubs', '/athletes', '/telemetry'],
    portalViews: ['ENNEACORE_STAGE', 'TACTICAL_HUD', 'BIOMETRIC_ANALYTICS'],
    capabilities: makeCaps({ canManageFederations: true, canManageClubs: true, canAccessBiometrics: true, canViewTacticalHud: true }),
  },
  CLUB_ADMIN: {
    role: 'CLUB_ADMIN', label: 'Club Manager', defaultRoute: '/dashboard',
    authorizedRoutes: ['/dashboard', '/clubs', '/athletes', '/telemetry'],
    portalViews: ['ENNEACORE_STAGE', 'TACTICAL_HUD'],
    capabilities: makeCaps({ canManageClubs: true, canAccessBiometrics: true, canViewTacticalHud: true }),
  },
  STAFF_COACH: {
    role: 'STAFF_COACH', label: 'Head Coach / Tactical Analyst', defaultRoute: '/dashboard',
    authorizedRoutes: ['/dashboard', '/athletes', '/telemetry'],
    portalViews: ['ENNEACORE_STAGE', 'TACTICAL_HUD', 'BIOMETRIC_ANALYTICS'],
    capabilities: makeCaps({ canAccessBiometrics: true, canViewTacticalHud: true }),
  },
  STAFF_MEDIC: {
    role: 'STAFF_MEDIC', label: 'Chief Medical Officer', defaultRoute: '/dashboard',
    authorizedRoutes: ['/dashboard', '/athletes', '/telemetry'],
    portalViews: ['BIOMETRIC_ANALYTICS', 'TACTICAL_HUD'],
    capabilities: makeCaps({ canAccessBiometrics: true, canViewMedicalData: true, canViewTacticalHud: true }),
  },
  ATHLETE: {
    role: 'ATHLETE', label: 'Registered Athlete', defaultRoute: '/dashboard',
    authorizedRoutes: ['/dashboard', '/telemetry'],
    portalViews: ['TACTICAL_HUD'],
    capabilities: makeCaps({ canViewTacticalHud: true }),
  },
};

export const hasRouteAccess = (role: UserRole, route: string): boolean =>
  RBAC_MATRIX[role]?.authorizedRoutes.includes(route) ?? false;

export const hasCapability = (role: UserRole, capability: keyof DynamicStageCapabilities): boolean =>
  RBAC_MATRIX[role]?.capabilities[capability] ?? false;
