export interface LogicDefinition {
  s: string;
  t: string;
  v: string;
  code: string;
  stage: string;
}

export interface MathEquation {
  k: string;
  e: string;
  r: string;
  c: string;
}

export interface AccessLogRow {
  t: string;
  name: string;
  gate: string;
}

export interface SystemStatusRow {
  k: string;
  v: string;
  dot: string;
}

export interface BookingCell {
  t: string;
  m: string;
  bg: string;
  bd: string;
  fg: string;
  mf: string;
  onClick: () => void;
}

export interface BookingRow {
  n: string;
  a: string;
  cells: BookingCell[];
}

export interface CyberRing {
  n: string;
  e: number;
  s: string;
  lt: string;
  ls: 'solid' | 'dashed';
  bd: string;
  bg: string;
  sh: string;
  fg: string;
  onClick: () => void;
}

export interface MigrationRow {
  name: string;
  rec: string;
  done: string;
  w: string;
  share: string;
}

export interface RoiSlider {
  k: string;
  lbl: string;
  min: number;
  max: number;
  step: number;
  v: number;
  on: (val: number) => void;
}

export interface OkrItem {
  t: string;
  kr: string;
  p: number;
  pd: string;
  td: string;
  pace: string;
  bg: string;
  bd: string;
  onClick: () => void;
}

export interface MrrBar {
  m: string;
  v: string;
  h: string;
  lo: number;
  ls: 'solid' | 'dashed';
  bg: string;
  bd: string;
  sh: string;
  mc: string;
  onClick: () => void;
}

export interface ChurnMember {
  n: string;
  r: number;
  x: string;
  y: string;
  c: string;
  d: string;
  glow: string;
  ring: string;
  fg: string;
  onClick: () => void;
}

export interface HeatmapRow {
  d: string;
  cells: {
    l: number;
    bg: string;
    bd: string;
    fg: string;
    onClick: () => void;
  }[];
}

export interface WinbackSegment {
  k: string;
  n: number;
  c: string;
  fg: string;
  bg: string;
  bd: string;
  onClick: () => void;
}
