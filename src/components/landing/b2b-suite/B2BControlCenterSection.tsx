'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { LOGICS, NAMES, GATES, DAYS_FULL, BANDS, LOAD, tier, SEGS, fmt, fmtT, pad, EM, AM, INK, MU, DIM } from './constants';
import { MathEquation } from './types';
import { B2BHeroShowroom } from './B2BHeroShowroom';
import { B2BLogicSheet } from './B2BLogicSheet';
import { BookingSchedulerStage } from './stages/BookingSchedulerStage';
import { CyberDefenseStage } from './stages/CyberDefenseStage';
import { DataMigrationStage } from './stages/DataMigrationStage';
import { RoiCalculatorStage } from './stages/RoiCalculatorStage';
import { OkrGoalsStage } from './stages/OkrGoalsStage';
import { MrrGrowthStage } from './stages/MrrGrowthStage';
import { ChurnRadarStage } from './stages/ChurnRadarStage';
import { LoadHeatmapStage } from './stages/LoadHeatmapStage';
import { WinbackMatrixStage } from './stages/WinbackMatrixStage';
import { soundEngine } from '@/core';
import { useLanguage } from '@/context/LanguageContext';

// Dynamically import 3D Turnstile Canvas to avoid SSR issues
const B2BShowroom3DCanvas = dynamic(
  () => import('./B2BShowroom3DCanvas').then((mod) => mod.B2BShowroom3DCanvas),
  { ssr: false }
);

export const B2BControlCenterSection: React.FC = () => {
  const { locale } = useLanguage();
  const [node, setNode] = useState<number>(0);
  const [passes, setPasses] = useState<number>(361);
  const [fresh, setFresh] = useState<boolean>(false);
  const [passTrigger, setPassTrigger] = useState<number>(0);
  const [sync, setSync] = useState<number>(1);
  const [log, setLog] = useState(() => [
    { t: "14:24:18", name: NAMES[2 % NAMES.length], gate: GATES[1 % GATES.length] },
    { t: "14:23:31", name: NAMES[3 % NAMES.length], gate: GATES[2 % GATES.length] },
    { t: "14:22:44", name: NAMES[4 % NAMES.length], gate: GATES[0 % GATES.length] },
    { t: "14:21:57", name: NAMES[0 % NAMES.length], gate: GATES[1 % GATES.length] },
    { t: "14:21:10", name: NAMES[1 % NAMES.length], gate: GATES[2 % GATES.length] },
  ]);

  // Stage states
  const [occ, setOcc] = useState<number[][]>([
    [1, 0, 1, 1, 0, 1],
    [0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 0, 0],
  ]);
  const [layer, setLayer] = useState<number>(2);
  const [offline, setOffline] = useState<boolean>(false);
  const [queue, setQueue] = useState<number>(0);

  const [migProgress, setMigProgress] = useState<number>(0);
  const [isMigrating, setIsMigrating] = useState<boolean>(false);

  const [visits, setVisits] = useState<number>(360);
  const [mins, setMins] = useState<number>(0.78);
  const [rate, setRate] = useState<number>(12);

  const [selectedOkr, setSelectedOkr] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<number>(10);
  const [selectedMember, setSelectedMember] = useState<number>(0);
  const [selectedCell, setSelectedCell] = useState<[number, number]>([4, 4]); // Friday 18:00
  const [selectedSeg, setSelectedSeg] = useState<number>(0);
  const [launched, setLaunched] = useState<boolean>(false);

  const navRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Switch node with audio feedback
  const goToNode = useCallback((n: number) => {
    soundEngine.playPulseNode();
    setNode((n + 10) % 10);
  }, []);

  // Pass trigger logic
  const handlePass = useCallback((manual = false) => {
    setPasses((prev) => {
      const nextPass = prev + 1;
      const name = NAMES[nextPass % NAMES.length];
      const gate = manual ? 'T-01 · MANUAL' : GATES[nextPass % GATES.length];
      setLog((prevLog) => [{ t: fmtT(new Date()), name, gate }, ...prevLog].slice(0, 5));
      return nextPass;
    });
    setFresh(true);
    setPassTrigger((prev) => prev + 1);
    soundEngine.playSystemAccess();
    setTimeout(() => setFresh(false), 2400);
  }, []);

  // Migration runner
  const handleRunMigration = useCallback(() => {
    setIsMigrating(true);
    setMigProgress(0);
    const interval = setInterval(() => {
      setMigProgress((prev) => {
        const next = Math.min(1, prev + 0.04);
        if (next >= 1) {
          clearInterval(interval);
          setIsMigrating(false);
        }
        return next;
      });
    }, 60);
  }, []);

  // Sync timers
  useEffect(() => {
    const timer = setInterval(() => {
      setSync((s) => (s >= 5 ? 1 : s + 1));
      if (offline) {
        setQueue((q) => q + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [offline]);

  // Auto-pass every 7s on Node 0
  useEffect(() => {
    if (node !== 0) return;
    const autoPassInterval = setInterval(() => {
      handlePass(false);
    }, 7000);
    return () => clearInterval(autoPassInterval);
  }, [node, handlePass]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      if (e.key === 'ArrowRight') goToNode(node + 1);
      else if (e.key === 'ArrowLeft') goToNode(node - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [node, goToNode]);

  // Auto-scroll TopRail on active node change
  useEffect(() => {
    const nav = navRef.current;
    if (nav) {
      const btn = nav.children[node] as HTMLElement | undefined;
      if (btn && nav.scrollWidth > nav.clientWidth) {
        nav.scrollTo({
          left: Math.max(0, btn.offsetLeft - nav.offsetLeft - (nav.clientWidth - btn.offsetWidth) / 2),
          behavior: 'smooth',
        });
      }
    }
  }, [node]);

  // Hash listener & Custom Event sync with Header
  useEffect(() => {
    const handleRouteTab = (tab: string) => {
      const mapping: Record<string, number> = {
        iot: 0,
        turnstile: 0,
        booking: 1,
        schedules: 1,
        sports_os: 1,
        security: 2,
        'enterprise-security': 2,
        'staff-access-roles': 2,
        migration: 3,
        'data-migration': 3,
        roi: 4,
        'analytics-showcase': 4,
        okr: 5,
        kpi: 6,
        churn: 7,
        heatmap: 8,
        winback: 9,
      };
      if (typeof mapping[tab] === 'number') {
        setNode(mapping[tab]);
      }
    };

    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) handleRouteTab(hash);
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);

    const onCustomEvent = (e: Event) => {
      const detail = (e as CustomEvent<{ tab: string }>).detail;
      if (detail?.tab) handleRouteTab(detail.tab);
    };
    window.addEventListener('artron-select-analytics-tab', onCustomEvent);
    window.addEventListener('artron-select-b2b-tab', onCustomEvent);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('artron-select-analytics-tab', onCustomEvent);
      window.removeEventListener('artron-select-b2b-tab', onCustomEvent);
    };
  }, []);

  // Node 1–9 Math equations and KPIs
  const currentLogic = useMemo(() => {
    const L = LOGICS[node];
    let eqs: MathEquation[] = [];
    let kpi = '';
    let kpiL = '';

    if (node === 1) {
      const count = occ.flat().reduce((a, b) => a + b, 0);
      const pct = Math.round((count / 18) * 100);
      eqs = [
        { k: 'ათვისების კოეფიციენტი', e: 'U = Σ oᵢⱼ / (3 × 6)', r: `${count}/18 = ${pct}%`, c: EM },
        { k: 'გადაფარვის აკრძალვა', e: '[a₁,b₁) ∩ [a₂,b₂) = ∅', r: 'b₁ ≤ a₂ ∨ b₂ ≤ a₁', c: AM },
        { k: 'მწვრთნელის კონფლიქტი', e: '∀ m, t : Σᵢ xᵢ(m,t) ≤ 1', r: '0 კონფლიქტი', c: INK },
        { k: 'დროის რესურსი', e: `T = ${count} × 60 წთ`, r: `${count} სთ დაჯავშნილი`, c: EM },
      ];
      kpi = `${pct}%`;
      kpiL = 'ათვისება · დღეს 16:00–22:00';
    } else if (node === 2) {
      const P = 0.08 * 0.15 * 0.03;
      eqs = [
        { k: 'ფენების ეფექტურობა', e: 'e = (0.92, 0.85, 0.97)', r: '3 ფენა', c: INK },
        { k: 'გარღვევის ალბათობა', e: 'P = Π(1 − eᵢ) = 0.08 · 0.15 · 0.03', r: `${(P * 100).toFixed(3)}%`, c: AM },
        { k: 'ავტონომიის რეჟიმი', e: offline ? 'ქსელი = 0 → ლოკალური ვერიფიკაცია' : 'ქსელი = 1 → ღრუბელთან სინქრონი', r: `Q = ${queue}`, c: offline ? AM : EM },
      ];
      kpi = `${((1 - P) * 100).toFixed(3)}%`;
      kpiL = 'შეტევის შეჩერების ალბათობა';
    } else if (node === 3) {
      const totalRec = 4250;
      const done = Math.round(totalRec * migProgress);
      eqs = [
        { k: 'ნაკადების ჯამი', e: 'N = 2,180 + 1,460 + 610', r: fmt(totalRec), c: INK },
        { k: 'გადმოტანილია', e: `n(t) = N × ${migProgress.toFixed(2)}`, r: fmt(done), c: EM },
        { k: 'მთლიანობის შემოწმება', e: 'Σ hash(src) = Σ hash(dst)', r: migProgress >= 1 ? 'ემთხვევა' : 'მიმდინარეობს', c: migProgress >= 1 ? EM : AM },
      ];
      kpi = fmt(done);
      kpiL = `ჩანაწერი ბირთვში · ${fmt(totalRec)}-დან`;
    } else if (node === 4) {
      const H = (visits * mins * 30) / 60;
      const Ha = (visits * 0.04 * 30) / 3600;
      const sv = (H - Ha) * rate;
      eqs = [
        { k: 'ხელით რეგისტრაცია', e: `H = ${visits} × ${mins.toFixed(2)} წთ × 30 / 60`, r: `${H.toFixed(1)} სთ`, c: INK },
        { k: 'ARTRON', e: `H′ = ${visits} × 0.04 წმ × 30 / 3600`, r: `${Ha.toFixed(2)} სთ`, c: INK },
        { k: 'თვიური ეკონომია', e: `₾ = (H − H′) × ${rate}`, r: `₾ ${fmt(sv)}`, c: EM },
        { k: 'წლიური ეკონომია', e: '₾ × 12', r: `₾ ${fmt(sv * 12)}`, c: AM },
      ];
      kpi = `${Math.round(H - Ha)} სთ`;
      kpiL = 'თვეში ბრუნდება გუნდთან';
    } else if (node === 5) {
      const ok = [84, 61, 88][selectedOkr];
      const tau = 61 / 92;
      const pace = (ok / 100 / tau).toFixed(2);
      eqs = [
        { k: 'კვარტლის გასვლა', e: 'τ = 61 / 92 დღე', r: `${(tau * 100).toFixed(1)}%`, c: AM },
        { k: 'ტემპის ინდექსი', e: `π = ${ok}% / ${(tau * 100).toFixed(1)}%`, r: pace, c: Number(pace) >= 1 ? EM : AM },
      ];
      kpi = `π ${pace}`;
      kpiL = Number(pace) >= 1 ? 'π ≥ 1 → გეგმა გადაჭარბდება' : 'π < 1 → საჭიროა აჩქარება';
    } else if (node === 6) {
      eqs = [
        { k: 'საშუალო თვიური ზრდა (CMGR)', e: 'g = (45.7 / 31.4)^(1/10) − 1', r: '3.82%', c: EM },
        { k: 'შემდეგი თვის პროგნოზი', e: 'M₁₂ = 45.7 × (1 + g)', r: '₾ 47.4K', c: AM },
        { k: 'წლიური ტემპი', e: '(1 + g)¹² − 1', r: '56.8%', c: INK },
      ];
      kpi = '₾ 45.7K';
      kpiL = 'MRR · სექტემბერი';
    } else if (node === 7) {
      eqs = [
        { k: 'რისკის ფორმულა', e: 'R = 0.45·min(d/21, 1) + 0.35·(1 − e/30) + 0.20·Δv', r: 'Σw = 1', c: INK },
        { k: 'ზღვარი', e: 'R ≥ 60% → ავტომატური შეთავაზება', r: '2 წევრი ზღვარს ზემოთ', c: AM },
      ];
      kpi = '2';
      kpiL = 'წევრი კრიტიკულ ზღვარს ზემოთ · R ≥ 60%';
    } else if (node === 8) {
      const [d, b] = selectedCell;
      const Lv = LOAD[d][b];
      const [, k] = tier(Lv);
      const P = 40 * (1 + k / 100);
      eqs = [
        { k: 'დატვირთვა', e: `L(${DAYS_FULL[d]}, ${BANDS[b]}:00)`, r: `${Lv}%`, c: INK },
        { k: 'საბოლოო ფასი', e: `P = 40 × (1 ${k >= 0 ? '+' : '−'} ${(Math.abs(k) / 100).toFixed(2)})`, r: `₾ ${P.toFixed(0)}`, c: EM },
      ];
      kpi = `₾ ${P.toFixed(0)}`;
      kpiL = `ტარიფი · ${DAYS_FULL[d]} ${BANDS[b]}:00`;
    } else if (node === 9) {
      const sg = SEGS[selectedSeg];
      const R = Math.round(sg.n * sg.c);
      eqs = [
        { k: 'მოსალოდნელი დაბრუნება', e: `R = ${sg.n} × ${(sg.c * 100).toFixed(0)}%`, r: String(R), c: INK },
        { k: 'აღდგენილი შემოსავალი', e: `₾ = ${R} × 95`, r: `₾ ${fmt(R * 95)} / თვე`, c: EM },
        { k: 'ხარჯის თანაფარდობა', e: '35 / 8 (მოზიდვა vs დაბრუნება)', r: '4.38×', c: AM },
      ];
      kpi = String(R);
      kpiL = launched ? 'წევრი დაბრუნდა · კამპანია აქტიურია' : 'წევრი დაბრუნდება · პროგნოზი';
    }

    return { L, eqs, kpi, kpiL };
  }, [node, occ, offline, queue, migProgress, visits, mins, rate, selectedOkr, selectedCell, selectedSeg, launched]);

  return (
    <section
      id="dashboard-features"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#030508] text-[#F0F9FF] border-b border-white/5 pt-20 sm:pt-24 lg:pt-28 scroll-mt-28 selection:bg-[#10B981]/30 font-sans"
    >
      {/* Anchor targets for backward compatibility */}
      <span id="analytics-showcase" className="absolute -top-28 pointer-events-none" />
      <span id="roi" className="absolute -top-28 pointer-events-none" />
      <span id="booking" className="absolute -top-28 pointer-events-none" />
      <span id="schedules" className="absolute -top-28 pointer-events-none" />
      <span id="security" className="absolute -top-28 pointer-events-none" />
      <span id="enterprise-security" className="absolute -top-28 pointer-events-none" />
      <span id="migration" className="absolute -top-28 pointer-events-none" />
      <span id="data-migration" className="absolute -top-28 pointer-events-none" />
      <span id="iot" className="absolute -top-28 pointer-events-none" />

      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_46%_52%_at_70%_44%,rgba(16,185,129,0.07),transparent_70%),radial-gradient(ellipse_50%_40%_at_14%_0%,rgba(186,230,253,0.06),transparent_70%),radial-gradient(ellipse_120%_90%_at_50%_40%,transparent_55%,rgba(0,0,0,0.6)_100%)]" />

      {/* 3D Turnstile Canvas Stage: Full Viewport Width & Height across section */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-500 ${
          node === 0 ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <B2BShowroom3DCanvas
          onPass={() => handlePass(true)}
          passTrigger={passTrigger}
          lastPassName={log[0]?.name || 'ნიკოლოზ ბ.'}
          motion={node === 0 ? 1 : 0}
        />
      </div>

      {/* Hero Left Scrim Gradient: Protects narrative text legibility against 3D Canvas matching Claude's exact CSS */}
      {node === 0 && (
        <div
          className="absolute inset-0 z-[1] pointer-events-none hidden md:block"
          style={{
            background:
              'linear-gradient(90deg, #030508 0%, rgba(3,5,8,0.88) 26%, rgba(3,5,8,0.35) 46%, transparent 60%)',
          }}
        />
      )}

      {/* Top 10-Logic Rail Header */}
      <header className="relative z-30 flex flex-col gap-6 sm:gap-8 px-4 sm:px-8 lg:px-14 pt-2 pb-4">
        {/* Section Master Header */}
        <div className="w-full flex flex-col items-center justify-center text-center max-w-4xl mx-auto pt-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]">
            {locale === 'ka' 
              ? 'დარბაზის ცოცხალი მართვის პანელი'
              : locale === 'ru'
                ? 'Живая панель управления клубом'
                : 'Real-Time Gym Command Cockpit'}
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-[#94A3B8] font-normal leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] max-w-3xl">
            {locale === 'ka'
              ? 'დააკვირდით და მართეთ ობიექტის თითოეული წამი: ტურნიკეტის ყოველი გავლა, ჯავშნები, გადინების რისკები და პიკური საათები ერთ ინტერფეისში.'
              : locale === 'ru'
                ? 'Отслеживайте и управляйте каждой секундой объекта: проходы через турникеты, бронирования, риски оттока и пиковые часы в едином интерфейсе.'
                : 'Monitor and manage every second of your facility: turnstile passages, bookings, churn risks, and peak hours in a unified interface.'}
          </p>
        </div>

        <nav
          ref={navRef}
          aria-label="ARTRON B2B Suite ლოგიკები"
          className="grid grid-flow-col auto-cols-[104px] sm:auto-cols-[minmax(0,1fr)] gap-3.5 overflow-x-auto scrollbar-none py-1 -mx-2 px-2"
        >
          {LOGICS.map((l, i) => {
            const isSelected = node === i;
            return (
              <button
                key={l.s}
                type="button"
                onClick={() => goToNode(i)}
                aria-current={isSelected ? 'page' : undefined}
                className={`min-h-[52px] flex flex-col gap-1.5 pt-3 pb-1 px-1 bg-transparent border-t text-left font-sans cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'border-[#10B981] shadow-[inset_0_1px_0_#10B981,0_-8px_16px_-10px_rgba(16,185,129,0.9)]'
                    : 'border-[#BAE6FD]/15 hover:border-[#BAE6FD]/40'
                }`}
              >
                <span className={`font-mono text-[10.5px] tracking-widest ${isSelected ? 'text-[#F59E0B]' : 'text-[#76869A]'}`}>
                  {pad(i + 1)}
                </span>
                <span className={`text-xs sm:text-[13px] truncate ${isSelected ? 'text-[#F0F9FF] font-semibold' : 'text-[#A9B9CA] font-medium'}`}>
                  {l.s}
                </span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Body Area */}
      <div className="relative z-20 flex-1 flex flex-col px-4 sm:px-8 lg:px-14 py-4 md:py-6 max-w-7xl mx-auto w-full">
        {node === 0 ? (
          /* Node 0: Hero Showroom */
          <div className="relative flex flex-col justify-between flex-1 w-full min-h-[calc(100vh-220px)]">
            <B2BHeroShowroom
              passes={passes}
              fresh={fresh}
              log={log}
              status={[
                { k: 'ტურნიკეტები', v: '4 / 4 ონლაინ', dot: EM },
                { k: 'IoT სენსორები', v: '38 / 38', dot: EM },
                { k: 'ლოკალური სერვერი', v: 'აქტიური', dot: EM },
                { k: 'ღრუბელთან სინქრონი', v: `${sync} წმ წინ`, dot: '#BAE6FD' },
                { k: 'დაშიფვრა', v: 'AES-256 · TLS 1.3', dot: AM },
              ]}
              onBookDemo={() => {
                const el = document.getElementById('contact-gateway');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else window.location.hash = '#contact-gateway';
              }}
              onNextLogic={() => goToNode(1)}
            />
          </div>
        ) : (
          /* Nodes 1–9: Split Screen Architecture (Left Specs & Right Stage) */
          <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start py-4">
            {/* Left Column: Logic Sheet & Math Model */}
            <div className="lg:col-span-5">
              <B2BLogicSheet
                indexStr={pad(node + 1)}
                code={currentLogic.L.code}
                title={currentLogic.L.t}
                description={currentLogic.L.v}
                equations={currentLogic.eqs}
                kpi={currentLogic.kpi}
                kpiLabel={currentLogic.kpiL}
                onPrev={() => goToNode(node - 1)}
                onNext={() => goToNode(node + 1)}
              />
            </div>

            {/* Right Column: Live Interactive Logic Stage Card */}
            <div className="lg:col-span-7 flex flex-col gap-4 p-5 sm:p-7 rounded-2xl bg-gradient-to-b from-[#111722]/60 to-[#06090e]/50 backdrop-blur-2xl border border-[#BAE6FD]/15 border-t-white/20 shadow-[inset_0_1px_0_rgba(240,249,255,0.06),0_40px_80px_-40px_rgba(0,0,0,0.9)]">
              {/* Stage Header */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/5">
                <span className="font-mono text-[11px] tracking-wider text-[#BAE6FD]">
                  {currentLogic.L.stage}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[10.5px] tracking-wider text-[#10B981]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
                  LIVE
                </span>
              </div>

              {/* Dynamic Interactive Stage Component */}
              <div className="pt-2">
                {node === 1 && (
                  <BookingSchedulerStage
                    occ={occ}
                    onToggleCell={(r, c) =>
                      setOcc((st) =>
                        st.map((row, ri) =>
                          row.map((x, ci) => (ri === r && ci === c ? 1 - x : x))
                        )
                      )
                    }
                  />
                )}
                {node === 2 && (
                  <CyberDefenseStage
                    layer={layer}
                    offline={offline}
                    queue={queue}
                    onSelectLayer={setLayer}
                    onToggleOffline={() => {
                      setOffline((o) => !o);
                      setQueue(0);
                    }}
                  />
                )}
                {node === 3 && (
                  <DataMigrationStage
                    migProgress={migProgress}
                    isMigrating={isMigrating}
                    onRunMigration={handleRunMigration}
                  />
                )}
                {node === 4 && (
                  <RoiCalculatorStage
                    visits={visits}
                    mins={mins}
                    rate={rate}
                    onVisitsChange={setVisits}
                    onMinsChange={setMins}
                    onRateChange={setRate}
                  />
                )}
                {node === 5 && (
                  <OkrGoalsStage
                    selectedOkr={selectedOkr}
                    onSelectOkr={setSelectedOkr}
                  />
                )}
                {node === 6 && (
                  <MrrGrowthStage
                    selectedMonth={selectedMonth}
                    onSelectMonth={setSelectedMonth}
                  />
                )}
                {node === 7 && (
                  <ChurnRadarStage
                    selectedMember={selectedMember}
                    onSelectMember={setSelectedMember}
                  />
                )}
                {node === 8 && (
                  <LoadHeatmapStage
                    selectedCell={selectedCell}
                    onSelectCell={(d, b) => setSelectedCell([d, b])}
                  />
                )}
                {node === 9 && (
                  <WinbackMatrixStage
                    selectedSeg={selectedSeg}
                    launched={launched}
                    onSelectSeg={(i) => {
                      setSelectedSeg(i);
                      setLaunched(false);
                    }}
                    onToggleLaunch={() => setLaunched((l) => !l)}
                  />
                )}
              </div>
            </div>
          </main>
        )}
      </div>
    </section>
  );
};
