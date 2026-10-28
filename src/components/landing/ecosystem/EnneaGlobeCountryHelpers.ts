import * as THREE from "three";
import { Adm1Feature, Ring } from "./EnneaMath";

export interface CountryNetworkConfig {
  id: string;
  code: string;
  nameKa: string;
  nameEn: string;
  nameRu: string;
  center: { lat: number; lon: number };
  accentColor: number;
  status: "LIVE" | "EXPANDING" | "UPCOMING";
  venuesCount: number;
}

export const NETWORK_COUNTRIES: CountryNetworkConfig[] = [
  {
    id: "GEO",
    code: "GE",
    nameKa: "საქართველო",
    nameEn: "Georgia",
    nameRu: "Грузия",
    center: { lat: 41.7, lon: 44.8 },
    accentColor: 0x00e5ff,
    status: "LIVE",
    venuesCount: 5,
  },
];

export interface GlobeCountryVisual {
  group: THREE.Group;
  materials: THREE.Material[];
  disposables: Array<{ dispose: () => void }>;
  setOpacity: (alpha: number) => void;
  tick: (time: number, isHovered?: boolean) => void;
}

/**
 * Extracts a closed outer perimeter loop and internal division edges from GeoJSON polygon features.
 */
export function extractBorders(features: Adm1Feature[]) {
  const coordKey = (c: [number, number]) => `${c[0].toFixed(4)},${c[1].toFixed(4)}`;
  const edgeKey = (c1: [number, number], c2: [number, number]) => {
    const k1 = coordKey(c1);
    const k2 = coordKey(c2);
    return k1 < k2 ? `${k1}|${k2}` : `${k2}|${k1}`;
  };

  const edgeCounts = new Map<string, number>();
  const allEdges: Array<{ e: string; c1: [number, number]; c2: [number, number] }> = [];
  const skinRings: Ring[][] = [];

  for (const feat of features) {
    const geom = feat.geometry;
    if (!geom) continue;
    const polys: Ring[][] =
      geom.type === "Polygon"
        ? [geom.coordinates as Ring[]]
        : geom.type === "MultiPolygon"
        ? (geom.coordinates as Ring[][])
        : [];

    for (const poly of polys) {
      if (!poly || poly.length === 0) continue;
      skinRings.push(poly);
      const outer = poly[0];
      if (!outer || outer.length < 4) continue;
      for (let i = 0; i < outer.length - 1; i++) {
        const c1: [number, number] = [outer[i][0], outer[i][1]];
        const c2: [number, number] = [outer[i + 1][0], outer[i + 1][1]];
        const e = edgeKey(c1, c2);
        edgeCounts.set(e, (edgeCounts.get(e) || 0) + 1);
        allEdges.push({ e, c1, c2 });
      }
    }
  }

  // Edges that appear only once form the sovereign outer boundary of Georgia
  const outerEdges = allEdges.filter((ed) => edgeCounts.get(ed.e) === 1);
  const internalEdges = allEdges.filter((ed) => edgeCounts.get(ed.e)! > 1);

  // Chain outer boundary into an ordered continuous closed loop
  const adj = new Map<string, Array<{ next: string; pt: [number, number]; orig: [number, number] }>>();
  for (const ed of outerEdges) {
    const k1 = coordKey(ed.c1);
    const k2 = coordKey(ed.c2);
    if (!adj.has(k1)) adj.set(k1, []);
    if (!adj.has(k2)) adj.set(k2, []);
    adj.get(k1)!.push({ next: k2, pt: ed.c2, orig: ed.c1 });
    adj.get(k2)!.push({ next: k1, pt: ed.c1, orig: ed.c2 });
  }

  const startKey = adj.keys().next().value;
  const loopCoords: [number, number][] = [];
  if (startKey) {
    let current: string | undefined = startKey;
    let prev: string | null = null;
    const visited = new Set<string>();

    while (current && !visited.has(current)) {
      visited.add(current);
      const neighbors = adj.get(current);
      if (!neighbors || neighbors.length === 0) break;
      const nextN = neighbors.find((n) => n.next !== prev) || neighbors[0];
      loopCoords.push(nextN.orig);
      prev = current;
      current = nextN.next;
    }
  }

  return { loopCoords, internalEdges, skinRings };
}

/**
 * Samples an interpolated point along the perimeter loop using binary search on cumulative distances.
 */
export function sampleLoopPoint(
  loop: THREE.Vector3[],
  dists: number[],
  totalDist: number,
  t: number,
  out: THREE.Vector3
): THREE.Vector3 {
  const normT = ((t % 1) + 1) % 1;
  const targetDist = normT * totalDist;
  const len = loop.length;

  let low = 0;
  let high = len;
  while (low < high) {
    const mid = (low + high) >> 1;
    if (dists[mid] <= targetDist) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  const idx = Math.max(0, low - 1);
  const nextIdx = (idx + 1) % len;
  const d0 = dists[idx];
  const d1 = dists[idx + 1] ?? totalDist;
  const span = Math.max(0.00001, d1 - d0);
  const segT = (targetDist - d0) / span;

  return out.lerpVectors(loop[idx], loop[nextIdx], THREE.MathUtils.clamp(segT, 0, 1));
}

