'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { InnerBeamCoords, DynamicNotifData } from './types';
import {
  SCREEN_ORDER,
  SLOT_INDEX_MAP,
  PLANS_CONFIG,
  TRAINING_SLOTS_DATA,
} from './mobileShowcaseConfig';
import { getNotificationData } from './showcaseNotifHelper';

// QR generator helper
export const generateQrCells = (seed: number) => {
  let a = (seed * 2654435761) >>> 0;
  const rnd = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const cells: { c: string }[] = [];
  for (let r = 0; r < 15; r++) {
    for (let c = 0; c < 15; c++) {
      let on = false;
      if (r <= 6 && c <= 6) {
        if (r === 6 || c === 6) on = false;
        else if (r === 0 || r === 5 || c === 0 || c === 5) on = true;
        else on = r >= 2 && r <= 3 && c >= 2 && c <= 3;
      } else if (r === 0 || c === 0) on = (r + c) % 2 === 0;
      else on = rnd() > 0.5;
      cells.push({ c: on ? '#0A1220' : 'transparent' });
    }
  }
  return cells;
};

export function useMobileShowcaseLogic() {
  // Navigation & Selection state
  const [activeId, setActiveId] = useState<number>(0);
  const [shownId, setShownId] = useState<number>(0);
  const [flips, setFlips] = useState<number>(0);
  const [bridgeW, setBridgeW] = useState<number>(120);
  const [wide, setWide] = useState<boolean>(true);
  const [inner, setInner] = useState<InnerBeamCoords | null>(null);

  // 3D Tilt state
  const [rx, setRx] = useState<number>(0);
  const [ry, setRy] = useState<number>(0);
  const [notifTilt, setNotifTilt] = useState<boolean>(false);

  // Notification state
  const [notif, setNotif] = useState<DynamicNotifData | null>(null);

  // Screen 0: QR state
  const [sec, setSec] = useState<number>(15);
  const [, setSeed] = useState<number>(7);
  const [qrCells, setQrCells] = useState<{ c: string }[]>(() => generateQrCells(7));
  const [tap, setTap] = useState<'idle' | 'reading' | 'ok'>('idle');
  const [visits, setVisits] = useState<number>(3);

  // Screen 1: Coach state
  const [pickedSlot, setPickedSlot] = useState<number>(3);
  const [bookStage, setBookStage] = useState<'idle' | 'done'>('idle');

  // Screen 2: Guarantee state
  const [buyStage, setBuyStage] = useState<'idle' | 'scan' | 'done'>('idle');

  // Screen 3: Renew state
  const [selectedPlan, setSelectedPlan] = useState<number>(0);
  const [autoRenew, setAutoRenew] = useState<boolean>(true);
  const [renewStage, setRenewStage] = useState<'idle' | 'scan' | 'done'>('idle');

  // Screen 4: Streak state
  const [streak, setStreak] = useState<number>(13);
  const [todayH, setTodayH] = useState<number>(0.55);

  // Screen 5: Freeze state
  const [frzDays, setFrzDays] = useState<number>(7);
  const [frzDone, setFrzDone] = useState<boolean>(true);

  // Screen 6: Guest state
  const [guestSent, setGuestSent] = useState<'idle' | 'sending' | 'done'>('done');
  const [guestsLeft, setGuestsLeft] = useState<number>(1);

  // Screen 7: Live Load state
  const [occupancy, setOccupancy] = useState<number>(35);

  // DOM Refs for beam measurement
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const phoneColRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);

  // Target element refs inside phone
  const qrRef = useRef<HTMLDivElement | null>(null);
  const slotsRef = useRef<HTMLDivElement | null>(null);
  const sealRef = useRef<HTMLDivElement | null>(null);
  const payRef = useRef<HTMLDivElement | null>(null);
  const barsRef = useRef<HTMLDivElement | null>(null);
  const freezeRef = useRef<HTMLDivElement | null>(null);
  const guestRef = useRef<HTMLDivElement | null>(null);
  const occRef = useRef<HTMLDivElement | null>(null);

  const lastInteractRef = useRef<number>(0);

  // Show 3D notification helper
  const triggerNotification = useCallback(
    (screenId: number) => {
      const plan = PLANS_CONFIG[selectedPlan] || PLANS_CONFIG[0];
      const slot = TRAINING_SLOTS_DATA[pickedSlot] || TRAINING_SLOTS_DATA[1];
      const data = getNotificationData({
        screenId,
        plan,
        slot,
        autoRenew,
        frzDays,
      });
      if (!data) return;

      setNotifTilt(true);
      setRx(0.25);
      setRy(-0.45);
      setNotif({ i: screenId, key: Date.now(), ...data });

      setTimeout(() => {
        setRx(0);
        setRy(0);
        setNotifTilt(false);
      }, 3900);

      setTimeout(() => {
        setNotif(null);
      }, 4700);
    },
    [selectedPlan, autoRenew, pickedSlot, frzDays]
  );

  // Measure Bridge Width & Inner Beam
  const measure = useCallback(() => {
    const c = cardsRef.current;
    const p = phoneColRef.current;
    const ph = phoneRef.current;
    if (!c || !p || !ph) return;

    const cr = c.getBoundingClientRect();
    const pr = p.getBoundingClientRect();
    const phoneLeft = pr.left + pr.width / 2 - 183;
    const w = Math.round(phoneLeft - cr.right - 3);
    const isWideScreen = pr.left > cr.right && w > 16;
    setWide(isWideScreen);
    setBridgeW(Math.max(0, w));

    // Inner beam measurement
    if (!isWideScreen || shownId !== activeId) {
      setInner(null);
      return;
    }

    const targets = [
      qrRef.current, // 0: Entry Pass
      slotsRef.current?.querySelector(`[data-slot="${pickedSlot}"]`) as HTMLElement | null, // 1: Coach
      sealRef.current, // 2: Shield
      payRef.current, // 3: Renewal
      barsRef.current, // 4: Progress
      freezeRef.current, // 5: Freeze
      guestRef.current, // 6: Guest Pass
      occRef.current, // 7: Live Load
    ];

    const targetEl = targets[shownId];
    const cardEl = c.children[SLOT_INDEX_MAP[activeId]] as HTMLElement | undefined;

    if (!targetEl || !cardEl) {
      setInner(null);
      return;
    }

    const phr = ph.getBoundingClientRect();
    const cardRect = cardEl.getBoundingClientRect();
    const tr = targetEl.getBoundingClientRect();

    const sx = 300 / phr.width;
    const sy = 620 / phr.height;
    const by = Math.round((cardRect.top + cardRect.height / 2 - phr.top) * sy);

    if (by < 20 || by > 600) {
      setInner(null);
      return;
    }

    const calculated: InnerBeamCoords = {
      key: `${shownId}-${pickedSlot}`,
      by,
      bx: Math.round((tr.left - phr.left) * sx),
      bty: Math.round((tr.top - phr.top) * sy),
      bw: Math.round(tr.width * sx),
      bh: Math.round(tr.height * sy),
    };

    setInner(calculated);
  }, [activeId, shownId, pickedSlot]);

  // Selection change
  const handleSelect = (id: number) => {
    lastInteractRef.current = Date.now();
    setActiveId(id);
    if ((id >= 4) !== (activeId >= 4)) {
      setFlips((prev) => prev + 1);
    }
  };

  useEffect(() => {
    lastInteractRef.current = Date.now();
  }, []);

  // Sync shownId with slight delay for smooth flip transition
  useEffect(() => {
    const isTabFlipping = (activeId >= 4) !== (shownId >= 4);
    const delay = isTabFlipping ? 650 : 250;
    const timer = setTimeout(() => {
      setShownId(activeId);
    }, delay);
    return () => clearTimeout(timer);
  }, [activeId, shownId]);

  // Screen Simulation Sequences when screen activates
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    if (shownId === 0) {
      setTap('idle');
      timers.push(
        setTimeout(() => {
          setTap('reading');
          timers.push(
            setTimeout(() => {
              setTap('ok');
              setVisits((v) => Math.max(1, v - 1));
            }, 850)
          );
        }, 1400)
      );
    } else if (shownId === 1) {
      setBookStage('idle');
      timers.push(
        setTimeout(() => {
          setPickedSlot(3);
        }, 1200)
      );
      timers.push(
        setTimeout(() => {
          setBookStage('done');
          triggerNotification(1);
        }, 2200)
      );
    } else if (shownId === 2) {
      setBuyStage('idle');
      timers.push(
        setTimeout(() => {
          setBuyStage('scan');
          timers.push(
            setTimeout(() => {
              setBuyStage('done');
              triggerNotification(2);
            }, 850)
          );
        }, 1500)
      );
    } else if (shownId === 3) {
      setRenewStage('idle');
      timers.push(
        setTimeout(() => {
          setRenewStage('scan');
          timers.push(
            setTimeout(() => {
              setRenewStage('done');
              triggerNotification(3);
            }, 850)
          );
        }, 1500)
      );
    } else if (shownId === 4) {
      setStreak(12);
      setTodayH(0.12);
      timers.push(setTimeout(() => setTodayH(0.55), 1100));
      timers.push(setTimeout(() => setStreak(13), 1800));
    } else if (shownId === 5) {
      setFrzDays(0);
      setFrzDone(false);
      for (let k = 1; k <= 7; k++) {
        timers.push(setTimeout(() => setFrzDays(k), 700 + k * 130));
      }
      timers.push(
        setTimeout(() => {
          setFrzDone(true);
          triggerNotification(5);
        }, 2100)
      );
    } else if (shownId === 6) {
      setGuestSent('idle');
      setGuestsLeft(2);
      timers.push(
        setTimeout(() => {
          setGuestSent('sending');
          timers.push(
            setTimeout(() => {
              setGuestSent('done');
              setGuestsLeft(1);
              triggerNotification(6);
            }, 850)
          );
        }, 1300)
      );
    } else if (shownId === 7) {
      setOccupancy(35);
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [shownId, triggerNotification]);

  // Re-measure when shownId changes
  useEffect(() => {
    const t = setTimeout(measure, 150);
    return () => clearTimeout(t);
  }, [shownId, measure]);

  // Setup ResizeObserver & 1s Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSec((prev) => {
        if (prev <= 1) {
          setSeed((s) => {
            const nextSeed = s + 1;
            setQrCells(generateQrCells(nextSeed));
            return nextSeed;
          });
          return 15;
        }
        return prev - 1;
      });

      // Auto cycle when idle for > 10s
      if (Date.now() - lastInteractRef.current > 10000) {
        setActiveId((prev) => {
          const nextIdx = (SCREEN_ORDER.indexOf(prev) + 1) % SCREEN_ORDER.length;
          const nextId = SCREEN_ORDER[nextIdx];
          if ((nextId >= 4) !== (prev >= 4)) {
            setFlips((f) => f + 1);
          }
          return nextId;
        });
      }
    }, 1000);

    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    const initialMeasure = setTimeout(measure, 300);

    return () => {
      clearInterval(interval);
      clearTimeout(initialMeasure);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [measure]);

  // Screen actions
  const handleTap = () => {
    setTap('reading');
    setTimeout(() => {
      setTap('ok');
      setVisits((v) => Math.max(1, v - 1));
    }, 850);
  };

  const handleRenew = () => {
    setRenewStage('scan');
    setTimeout(() => {
      setRenewStage('done');
      triggerNotification(3);
    }, 950);
  };

  const handleBook = () => {
    setBookStage((prev) => {
      const next = prev === 'done' ? 'idle' : 'done';
      if (next === 'done') triggerNotification(1);
      return next;
    });
  };

  const handleBuy = () => {
    setBuyStage('scan');
    setTimeout(() => {
      setBuyStage('done');
      triggerNotification(2);
    }, 950);
  };

  const handleFreeze = () => {
    setFrzDone(true);
    triggerNotification(5);
  };

  const handleSendGuest = () => {
    setGuestSent('sending');
    setTimeout(() => {
      setGuestSent('done');
      setGuestsLeft((g) => Math.max(0, g - 1));
      triggerNotification(6);
    }, 1100);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (notifTilt) return;
    const ph = phoneRef.current;
    if (!ph) return;
    const r = ph.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2)));
    const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2)));
    setRx(dy);
    setRy(dx);
  };

  const handleMouseLeave = () => {
    if (notifTilt) return;
    setRx(0);
    setRy(0);
  };

  return {
    activeId,
    shownId,
    flips,
    bridgeW,
    wide,
    inner,
    rx,
    ry,
    notifTilt,
    notif,
    sec,
    qrCells,
    tap,
    visits,
    selectedPlan,
    setSelectedPlan,
    autoRenew,
    setAutoRenew,
    renewStage,
    pickedSlot,
    setPickedSlot,
    bookStage,
    buyStage,
    streak,
    setStreak,
    todayH,
    setTodayH,
    frzDays,
    setFrzDays,
    frzDone,
    guestSent,
    guestsLeft,
    occupancy,
    setOccupancy,
    cardsRef,
    phoneColRef,
    phoneRef,
    rowRef,
    qrRef,
    payRef,
    slotsRef,
    sealRef,
    barsRef,
    freezeRef,
    guestRef,
    occRef,
    handleSelect,
    handleTap,
    handleRenew,
    handleBook,
    handleBuy,
    handleFreeze,
    handleSendGuest,
    handleMouseMove,
    handleMouseLeave,
  };
}
