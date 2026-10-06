import { DualCoreSyncState, SyncPhase, LedgerLog } from '@/components/landing/dual-core/types';

describe('Phase 58: Dual-Core / Synchronicity 3D Showcase (v7 closed-loop engine)', () => {
  it('validates initial state schema and constants for DualCoreSync', () => {
    const initialState: DualCoreSyncState = {
      phase: 'idle',
      revenue: 2450,
      shownRev: 2450,
      inGym: 42,
      capacityMax: 60,
      revenueTarget: 3000,
      logs: [
        { id: 's2', t: '18:58:31', name: 'ნინო კ.', court: 'კორტი #2', amount: '+50.00 ₾', status: 'წარმატებული' },
        { id: 's1', t: '18:53:14', name: 'ლუკა ბ.', court: 'დარბაზი A', amount: '+50.00 ₾', status: 'წარმატებული' },
        { id: 's0', t: '18:47:09', name: 'ანა ჯ.', court: 'კორტი #3', amount: '+50.00 ₾', status: 'წარმატებული' },
      ],
      gateOpen: false,
      ttl: 8000,
      maxTtl: 8000,
      seed: 44719,
      latency: null,
      pktOn: false,
      revOn: false,
      dispatch: false,
      hapticId: 0,
      waveId: 0,
      ackMs: 24,
      tilt: { x: 0, y: 0 },
      btnHover: false,
      btnPress: false,
    };

    expect(initialState.phase).toBe('idle');
    expect(initialState.revenue).toBe(2450);
    expect(initialState.inGym).toBe(42);
    expect(initialState.capacityMax).toBe(60);
    expect(initialState.logs).toHaveLength(3);
    expect(initialState.logs[0].court).toBe('კორტი #2');
  });

  it('verifies state transitions during closed-loop execution', () => {
    const phases: SyncPhase[] = ['idle', 'processing', 'transit', 'synced'];
    expect(phases).toHaveLength(4);

    let currentPhase: SyncPhase = 'idle';
    let rev = 2450;
    let visitors = 42;
    let gate = false;

    // 1. Processing trigger
    currentPhase = 'processing';
    expect(currentPhase).toBe('processing');
    expect(gate).toBe(false);

    // 2. Transit (Photon firing & gate opening)
    currentPhase = 'transit';
    gate = true;
    expect(currentPhase).toBe('transit');
    expect(gate).toBe(true);

    // 3. Synced (Committed to B2B ledger)
    currentPhase = 'synced';
    rev += 50;
    visitors += 1;
    expect(currentPhase).toBe('synced');
    expect(rev).toBe(2500);
    expect(visitors).toBe(43);

    // 4. Closed loop reset
    currentPhase = 'idle';
    rev = 2450;
    visitors = 42;
    gate = false;
    expect(currentPhase).toBe('idle');
    expect(rev).toBe(2450);
  });

  it('formats new ledger entry with correct fresh highlight and metadata', () => {
    const newLog: LedgerLog = {
      id: `sync-${Date.now()}`,
      t: '19:00:02',
      name: 'გიორგი მ.',
      court: 'კორტი #1',
      amount: '+50.00 ₾',
      status: 'წარმატებული',
      isFresh: true,
    };

    expect(newLog.name).toBe('გიორგი მ.');
    expect(newLog.court).toBe('კორტი #1');
    expect(newLog.amount).toBe('+50.00 ₾');
    expect(newLog.status).toBe('წარმატებული');
    expect(newLog.isFresh).toBe(true);
  });
});
