export type MasterDimensionId = 'venues' | 'workforce' | 'mastery';

export interface HotspotItem {
  id: string;
  label: string;
  badge: string;
  description: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export interface PassportData {
  title: string;
  subtitle?: string;
  description?: string;
  /** Empathetic care message — displayed via Typewriter in the Care Block */
  careMessage?: string;
  badge: string;
  scale: string;
  scaleLabel: string;
  disciplines: string;
  disciplinesLabel: string;
  keyArea: string;
  keyAreaLabel: string;
  highestStandard: string;
  highestStandardLabel: string;
}

export interface SubPillItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: string;
  passport: PassportData;
}

export interface DimensionConfig {
  id: MasterDimensionId;
  tabLabel: string;
  icon: string;
  badge: string;
  title: string;
  subtitle: string;
  hudType: 'venues' | 'workforce' | 'mastery';
  hotspots: HotspotItem[];
  subPills: SubPillItem[];
}
