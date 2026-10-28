import { InnerBeamCoords } from './types';
import { SLOT_INDEX_MAP } from './mobileShowcaseConfig';

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

export interface BeamMeasureRefs {
  cards: HTMLDivElement | null;
  phoneCol: HTMLDivElement | null;
  phone: HTMLDivElement | null;
  targets: (HTMLElement | null)[];
}

export function computeBeamMeasurement(
  refs: BeamMeasureRefs,
  activeId: number,
  shownId: number,
  pickedSlot: number
): { isWideScreen: boolean; bridgeW: number; inner: InnerBeamCoords | null } | null {
  const { cards: c, phoneCol: p, phone: ph, targets } = refs;
  if (!c || !p || !ph) return null;

  const cr = c.getBoundingClientRect();
  const pr = p.getBoundingClientRect();
  const phoneLeft = pr.left + pr.width / 2 - 183;
  const w = Math.round(phoneLeft - cr.right - 3);
  const isWideScreen = pr.left > cr.right && w > 16;
  const bridgeW = Math.max(0, w);

  if (!isWideScreen || shownId !== activeId) {
    return { isWideScreen, bridgeW, inner: null };
  }

  const targetEl = targets[shownId];
  const cardEl = c.children[SLOT_INDEX_MAP[activeId]] as HTMLElement | undefined;

  if (!targetEl || !cardEl) {
    return { isWideScreen, bridgeW, inner: null };
  }

  const phr = ph.getBoundingClientRect();
  const cardRect = cardEl.getBoundingClientRect();
  const tr = targetEl.getBoundingClientRect();

  const sx = 300 / phr.width;
  const sy = 620 / phr.height;
  const by = Math.round((cardRect.top + cardRect.height / 2 - phr.top) * sy);

  if (by < 20 || by > 600) {
    return { isWideScreen, bridgeW, inner: null };
  }

  return {
    isWideScreen,
    bridgeW,
    inner: {
      key: `${shownId}-${pickedSlot}`,
      by,
      bx: Math.round((tr.left - phr.left) * sx),
      bty: Math.round((tr.top - phr.top) * sy),
      bw: Math.round(tr.width * sx),
      bh: Math.round(tr.height * sy),
    },
  };
}

