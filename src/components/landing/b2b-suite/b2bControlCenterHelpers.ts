import { LOGICS, DAYS_FULL, BANDS, LOAD, tier, SEGS, fmt, EM, AM, INK } from './constants';
import { MathEquation } from './types';

export interface B2BLogicCalcInput {
  node: number;
  occ: number[][];
  offline: boolean;
  queue: number;
  migProgress: number;
  visits: number;
  mins: number;
  rate: number;
  selectedOkr: number;
  selectedCell: [number, number];
  selectedSeg: number;
  launched: boolean;
}

export function computeB2BCurrentLogic(input: B2BLogicCalcInput) {
  const {
    node,
    occ,
    offline,
    queue,
    migProgress,
    visits,
    mins,
    rate,
    selectedOkr,
    selectedCell,
    selectedSeg,
    launched,
  } = input;

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
}

export const B2B_HASH_NODE_MAP: Record<string, number> = {
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

