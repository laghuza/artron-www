export type SyncPhase = 'idle' | 'processing' | 'transit' | 'synced' | 'error';

export interface LedgerLog {
  id: string;
  t: string;
  name: string;
  court: string;
  amount: string;
  status: string;
  accent?: string;
  isFresh?: boolean;
}

export interface LedSegment {
  bg: string;
  glow: string;
}

export interface SyncStepItem {
  code: string;
  tag: string;
  title: string;
  desc: string;
  hint: string;
}

export interface DualCoreSyncState {
  phase: SyncPhase;
  revenue: number;
  shownRev: number;
  inGym: number;
  capacityMax: number;
  revenueTarget: number;
  logs: LedgerLog[];
  gateOpen: boolean;
  ttl: number;
  maxTtl: number;
  seed: number;
  latency: number | null;
  pktOn: boolean;
  revOn: boolean;
  dispatch: boolean;
  hapticId: number;
  waveId: number;
  ackMs: number;
  tilt: { x: number; y: number };
  btnHover: boolean;
  btnPress: boolean;
}
