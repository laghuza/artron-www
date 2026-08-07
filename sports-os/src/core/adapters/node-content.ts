/**
 * Node Content Adapter Contract
 * Standardized content layout types for mobile & desktop node adapters
 */

export type NodeLayoutType =
  | 'DATA_LIST'
  | 'CANVAS_GRAPH'
  | 'STEP_WIZARD'
  | 'SMART_CARDS';

export interface DataListItem {
  id: string;
  title: string;
  subtitle?: string;
  status?: string;
  badge?: string;
  metadata?: Record<string, string | number>;
}

export interface DataListConfig {
  type: 'DATA_LIST';
  searchable: boolean;
  filterOptions?: string[];
  items: DataListItem[];
}

export interface CanvasGraphConfig {
  type: 'CANVAS_GRAPH';
  vectorAnimation: boolean;
  particleOrbits: boolean;
  telemetryStreamUrl?: string;
  refreshRateMs?: number;
}

export interface StepWizardStep {
  stepIndex: number;
  title: string;
  fields: Array<{
    id: string;
    label: string;
    type: 'text' | 'select' | 'number' | 'boolean';
    required?: boolean;
  }>;
}

export interface StepWizardConfig {
  type: 'STEP_WIZARD';
  totalSteps: number;
  steps: StepWizardStep[];
}

export interface SmartCardItem {
  id: string;
  metricLabel: string;
  metricValue: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  badgeColor?: string;
}

export interface SmartCardsConfig {
  type: 'SMART_CARDS';
  cards: SmartCardItem[];
}

export type NodeContentConfig =
  | DataListConfig
  | CanvasGraphConfig
  | StepWizardConfig
  | SmartCardsConfig;

export interface NodeAdapterContract {
  nodeId: number;
  nodeName: string;
  layoutType: NodeLayoutType;
  config: NodeContentConfig;
  responsiveBreakpoint: 'sm' | 'md' | 'lg' | 'xl';
}

export interface CrmSubItem {
  id: string;
  label: string;
  functional_desc: string;
  permissions: string;
  business_value: string;
}

export interface Node01CrmData {
  title: string;
  short_desc: string;
  back_button: string;
  section_functional?: string;
  section_permissions?: string;
  section_business?: string;
  hint_chip_select?: string;
  status_validated?: string;
  sub_items: CrmSubItem[];
}

export const NODE_SIGNATURE_COLORS: Record<number, string> = {
  1: "#00FF87", // Node 01 (CRM): Emerald Neon
  2: "#00E5FF", // Node 02 (Clubs): Cyan Teal
  3: "#3B82F6", // Node 03 (Professionals): Electric Indigo
  4: "#A855F7", // Node 04 (Mobile OS): Neon Purple
  5: "#F59E0B", // Node 05 (Coins & Badges): Cyber Gold
  6: "#F43F5E", // Node 06 (Marketplace): Neon Crimson
  7: "#10B981", // Node 07 (Telemetry): Mint Green
  8: "#F97316", // Node 08 (Security & SLA): Cyber Orange
  9: "#00FF87", // Node 09 (Core Init): Central Emerald
};
