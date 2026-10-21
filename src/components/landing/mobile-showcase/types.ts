export interface MobileScreenConfig {
  id: number;
  code: string;
  badge: string;
  tag: string;
  title: string;
  desc: string;
  statusBadge: string;
  accent: string;
  rgb: string;
  pale: string;
  hue: number;
  logicFormula: string;
  logicParams: { k: string; v: string }[];
}

export interface TrainingSlot {
  idx: number;
  time: string;
  cls: string;
  booked: boolean;
}

export interface PlanItem {
  id: number;
  name: string;
  sub: string;
  v: string;
  price: string;
  end: string;
  d: string;
  g: string;
  gs: string;
}

export interface InnerBeamCoords {
  key: string;
  by: number;
  bx: number;
  bty: number;
  bw: number;
  bh: number;
}

export interface DynamicNotifData {
  i: number;
  key: number;
  tag: string;
  t: string;
  s: string;
  g: string;
  gs: string;
  ml: string;
  mr: string;
}
