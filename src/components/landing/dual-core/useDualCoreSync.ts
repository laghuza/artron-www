'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { DualCoreSyncState, LedgerLog } from './types';

const INITIAL_REVENUE = 2450;
const INITIAL_IN_GYM = 42;
const MAX_TTL = 8000;

const SEED_LOGS: LedgerLog[] = [
  { id: 's2', t: '18:58:31', name: 'ნინო კ.', court: 'კორტი #2', amount: '+50.00 ₾', status: 'წარმატებული' },
  { id: 's1', t: '18:53:14', name: 'ლუკა ბ.', court: 'დარბაზი A', amount: '+50.00 ₾', status: 'წარმატებული' },
  { id: 's0', t: '18:47:09', name: 'ანა ჯ.', court: 'კორტი #3', amount: '+50.00 ₾', status: 'წარმატებული' },
];

export function useDualCoreSync() {
  const [state, setState] = useState<DualCoreSyncState>({
    phase: 'idle',
    revenue: INITIAL_REVENUE,
    shownRev: INITIAL_REVENUE,
    inGym: INITIAL_IN_GYM,
    capacityMax: 60,
    revenueTarget: 3000,
    logs: SEED_LOGS,
    gateOpen: false,
    ttl: MAX_TTL,
    maxTtl: MAX_TTL,
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
  });

  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const tweenRafRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (tweenRafRef.current) {
      cancelAnimationFrame(tweenRafRef.current);
      tweenRafRef.current = null;
    }
  }, []);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timersRef.current.push(t);
  }, []);

  // TTL Countdown & QR Regeneration when Idle
  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        if (prev.phase !== 'idle') return prev;
        if (prev.ttl <= 100) {
          return { ...prev, ttl: MAX_TTL, seed: prev.seed + 1 };
        }
        return { ...prev, ttl: prev.ttl - 100 };
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Smooth Revenue Numeric Tween (2,450 -> 2,500)
  const tweenRevenue = useCallback((from: number, to: number) => {
    if (tweenRafRef.current) cancelAnimationFrame(tweenRafRef.current);
    const start = performance.now();
    const duration = 750;

    const step = (now: number) => {
      const k = Math.min(1, (now - start) / duration);
      const ease = 1 - Math.pow(1 - k, 3);
      const current = Math.round(from + (to - from) * ease);
      setState((prev) => ({ ...prev, shownRev: current }));
      if (k < 1) {
        tweenRafRef.current = requestAnimationFrame(step);
      }
    };
    tweenRafRef.current = requestAnimationFrame(step);
  }, []);

  // Commit synchronized data into B2B panel
  const commitSync = useCallback(() => {
    const lat = 8;
    const newLog: LedgerLog = {
      id: `sync-${Date.now()}`,
      t: '19:00:02',
      name: 'გიორგი მ.',
      court: 'კორტი #1',
      amount: '+50.00 ₾',
      status: 'წარმატებული',
      isFresh: true,
    };

    setState((prev) => {
      tweenRevenue(prev.shownRev, prev.revenue + 50);
      return {
        ...prev,
        revenue: prev.revenue + 50,
        inGym: Math.min(prev.capacityMax, prev.inGym + 1),
        latency: lat,
        waveId: prev.waveId + 1,
        logs: [newLog, ...prev.logs.map((l) => ({ ...l, isFresh: false }))].slice(0, 4),
      };
    });
  }, [tweenRevenue]);

  // Main interactive trigger
  const run = useCallback(() => {
    if (state.phase === 'processing' || state.phase === 'transit') return;

    if (state.phase === 'synced') {
      clearTimers();
      setState((prev) => ({
        ...prev,
        phase: 'idle',
        revenue: INITIAL_REVENUE,
        shownRev: INITIAL_REVENUE,
        inGym: INITIAL_IN_GYM,
        logs: SEED_LOGS,
        gateOpen: false,
        ttl: MAX_TTL,
        latency: null,
        pktOn: false,
        revOn: false,
        dispatch: false,
      }));
      return;
    }

    clearTimers();
    setState((prev) => ({ ...prev, phase: 'processing', gateOpen: false, latency: null }));

    // 1. Transit & fire photon across bridge
    addTimer(() => {
      setState((prev) => ({ ...prev, phase: 'transit', gateOpen: true, pktOn: true }));
    }, 350);

    // 2. Commit transaction & update B2B ledger
    addTimer(() => {
      commitSync();
      setState((prev) => ({ ...prev, phase: 'synced', pktOn: false }));
    }, 750);

    // 3. Fire reverse telemetry dispatch back to phone
    addTimer(() => {
      setState((prev) => ({ ...prev, revOn: true, ackMs: 24 }));
    }, 1010);

    // 4. Phone Dynamic Island expands & haptic feedback rings
    addTimer(() => {
      setState((prev) => ({ ...prev, revOn: false, dispatch: true, hapticId: prev.hapticId + 1 }));
    }, 1570);

    // 5. Turnstile gate closes
    addTimer(() => {
      setState((prev) => ({ ...prev, gateOpen: false }));
    }, 2250);
  }, [state.phase, clearTimers, addTimer, commitSync]);

  // Automatic demonstration cycle (matching Claude showcase behavior)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state.phase === 'idle') {
      timer = setTimeout(() => {
        run();
      }, 5500);
    } else if (state.phase === 'synced') {
      timer = setTimeout(() => {
        run();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [state.phase, run]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setState((prev) => ({ ...prev, tilt: { x, y } }));
  }, []);

  const onMouseLeave = useCallback(() => {
    setState((prev) => ({ ...prev, tilt: { x: 0, y: 0 } }));
  }, []);

  const setBtnHover = useCallback((hover: boolean) => {
    setState((prev) => ({ ...prev, btnHover: hover }));
  }, []);

  const setBtnPress = useCallback((press: boolean) => {
    setState((prev) => ({ ...prev, btnPress: press }));
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  return {
    state,
    run,
    onMouseMove,
    onMouseLeave,
    setBtnHover,
    setBtnPress,
  };
}
