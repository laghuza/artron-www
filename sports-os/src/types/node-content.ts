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
