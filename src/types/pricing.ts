export type VerticalType = 'studio' | 'gym' | 'pool';

export type PricingMode = 'tiers' | 'builder';

export type BillingCycle = 'MONTHLY' | 'ANNUAL';

export interface PricingLimits {
  members: string;
  trainers: string;
  branches: string;
  turnstiles?: string;
  qrPass?: string;
}

export interface PricingTier {
  id: string;
  nameKey: string;
  descKey: string;
  basePrice: number; // GEL
  limits: PricingLimits;
  badgeKey?: string;
  popular?: boolean;
  featuresKeys: string[];
  hardwareNoteKey: string;
  roiBadgeKey: string;
  roiSubKey: string;
}

export type ModuleCategory = 'core' | 'access' | 'mobile' | 'commerce' | 'analytics';

export interface CustomModule {
  id: string;
  category: ModuleCategory;
  nameKey: string;
  descKey: string;
  basePrice: number; // GEL / month
  isCore?: boolean; // If true, included by default
  recommendedFor: VerticalType[];
  iconName: string;
}

export interface ModuleCategoryInfo {
  id: ModuleCategory;
  titleKey: string;
  descKey: string;
  iconName: string;
}
