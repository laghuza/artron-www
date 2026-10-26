export type SceneVariantId =
  | 'gym'
  | 'pool'
  | 'court'
  | 'octagon'
  | 'arena'
  | 'coach'
  | 'med'
  | 'group'
  | 'ops'
  | 'guard'
  | 'trophy'
  | 'podium'
  | 'passport'
  | 'medals'
  | 'academy';

export interface MetricRow {
  label: string;
  value: string;
}

export interface SpecTileCategory {
  title: string;
  subtitle: string;
}

export interface MirrorModule {
  id: string;
  name: string;
  kicker: string;
  sceneVariant: SceneVariantId;
  headline: string;
  description: string;
  cameraTags?: string[];
  notes?: string[];
  specRows: [MetricRow[], MetricRow[], MetricRow[], MetricRow[]];
}

export interface MirrorDimension {
  id: 'venues' | 'workforce' | 'mastery';
  numeral: string;
  name: string;
  shortName?: string;
  subtitle: string;
  accentColor: string;
  modules: MirrorModule[];
}

export const SPEC_TILE_CATEGORIES: SpecTileCategory[] = [
  { title: 'გამტარუნარიანობა', subtitle: 'SCALE & CAPACITY' },
  { title: 'სპორტული ზონები', subtitle: 'DISCIPLINES' },
  { title: 'საკვანძო ტექნოლოგია', subtitle: 'TELEMETRY / RFID / BIO' },
  { title: 'სტანდარტები & უსაფრთხოება', subtitle: 'COMPLIANCE & AUDIT' },
];


