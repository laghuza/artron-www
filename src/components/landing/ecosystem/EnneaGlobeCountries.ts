import * as THREE from "three";
import { Adm1Feature, Ring, latLonToVec3, SPHERE_R, radialGlowTexture } from "./EnneaMath";

/**
 * Multi-Country Network Configuration
 * Scalable for future international gym onboarding (Armenia, Azerbaijan, Turkey, UAE, Europe, etc.)
 */
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
function extractBorders(features: Adm1Feature[]) {
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
function sampleLoopPoint(
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

/**
 * Builds a glowing 3D spherical contour with a gentle moving light beam and photons running around Georgia.
 */
export function createSphericalCountryMesh(
  features: Adm1Feature[],
  accentColorHex = 0x00e5ff
): GlobeCountryVisual {
  const group = new THREE.Group();
  group.name = "spherical-country-geo";

  const disposables: Array<{ dispose: () => void }> = [];
  const materials: THREE.Material[] = [];
  const fadeMaterials: Array<{ mat: THREE.Material & { opacity: number }; baseOpacity: number }> = [];

  const R_BASE = SPHERE_R * 1.0035;
  const R_LIGHT = SPHERE_R * 1.0048;
  const R_SKIN = SPHERE_R * 1.0015;

  const { loopCoords, internalEdges, skinRings } = extractBorders(features);

  // 1. Semi-transparent spherical territory skin
  const skinMeshes: THREE.Mesh[] = [];
  for (const poly of skinRings) {
    const outer = poly[0];
    if (!outer || outer.length < 4) continue;
    try {
      const shapePoints = outer.map((c) => new THREE.Vector2(c[0], c[1]));
      const shape = new THREE.Shape(shapePoints);
      for (let h = 1; h < poly.length; h++) {
        const hole = poly[h];
        if (hole && hole.length > 3) {
          shape.holes.push(new THREE.Path(hole.map((c) => new THREE.Vector2(c[0], c[1]))));
        }
      }

      const shapeGeo = new THREE.ShapeGeometry(shape, 1);
      const posAttr = shapeGeo.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const lon = posAttr.getX(i);
        const lat = posAttr.getY(i);
        const v = latLonToVec3(lat, lon, R_SKIN);
        posAttr.setXYZ(i, v.x, v.y, v.z);
      }
      shapeGeo.computeVertexNormals();
      shapeGeo.computeBoundingSphere();

      const skinMat = new THREE.MeshBasicMaterial({
        color: accentColorHex,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });

      const skinMesh = new THREE.Mesh(shapeGeo, skinMat);
      skinMesh.frustumCulled = false;
      skinMesh.renderOrder = 3;
      group.add(skinMesh);

      skinMeshes.push(skinMesh);
      disposables.push(shapeGeo, skinMat);
      materials.push(skinMat);
      fadeMaterials.push({ mat: skinMat, baseOpacity: 0.12 });
    } catch {
      // Fallback gracefully on triangulation
    }
  }

  // 2. Internal regional boundary lines (soft, non-distracting)
  const internalPos: number[] = [];
  const seenEdges = new Set<string>();
  for (const ed of internalEdges) {
    if (seenEdges.has(ed.e)) continue;
    seenEdges.add(ed.e);
    const v1 = latLonToVec3(ed.c1[1], ed.c1[0], R_BASE);
    const v2 = latLonToVec3(ed.c2[1], ed.c2[0], R_BASE);
    internalPos.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
  }
  const internalGeo = new THREE.BufferGeometry();
  internalGeo.setAttribute("position", new THREE.Float32BufferAttribute(internalPos, 3));
  internalGeo.computeBoundingSphere();
  const internalMat = new THREE.LineBasicMaterial({
    color: accentColorHex,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const internalLines = new THREE.LineSegments(internalGeo, internalMat);
  internalLines.frustumCulled = false;
  internalLines.renderOrder = 4;
  group.add(internalLines);
  disposables.push(internalGeo, internalMat);
  materials.push(internalMat);
  fadeMaterials.push({ mat: internalMat, baseOpacity: 0.22 });

  // 3. Crisp outer perimeter contour line of Georgia
  const loopVecs = loopCoords.map((c) => latLonToVec3(c[1], c[0], R_BASE));
  const loopLen = loopVecs.length;
  const loopDists = [0];
  for (let i = 0; i < loopLen; i++) {
    const next = loopVecs[(i + 1) % loopLen];
    loopDists.push(loopDists[i] + loopVecs[i].distanceTo(next));
  }
  const totalPerimeterDist = loopDists[loopLen] || 1;

  const outerLinePos: number[] = [];
  const outerProgress: number[] = [];
  for (let i = 0; i < loopLen; i++) {
    const v1 = loopVecs[i];
    const v2 = loopVecs[(i + 1) % loopLen];
    outerLinePos.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
    const p1 = loopDists[i] / totalPerimeterDist;
    const p2 = loopDists[i + 1] / totalPerimeterDist;
    outerProgress.push(p1, p2);
  }

  const baseBorderGeo = new THREE.BufferGeometry();
  baseBorderGeo.setAttribute("position", new THREE.Float32BufferAttribute(outerLinePos, 3));
  baseBorderGeo.computeBoundingSphere();
  const baseBorderMat = new THREE.LineBasicMaterial({
    color: 0x9deeff,
    transparent: true,
    opacity: 0.72,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const baseBorder = new THREE.LineSegments(baseBorderGeo, baseBorderMat);
  baseBorder.frustumCulled = false;
  baseBorder.renderOrder = 4;
  group.add(baseBorder);
  disposables.push(baseBorderGeo, baseBorderMat);
  materials.push(baseBorderMat);
  fadeMaterials.push({ mat: baseBorderMat, baseOpacity: 0.72 });

  // 4. Moving light beam shader along the outer contour (მოსიარულე ნათება)
  const movingLinePos = loopVecs.map((v) => {
    const elevated = v.clone().normalize().multiplyScalar(R_LIGHT);
    return [elevated.x, elevated.y, elevated.z];
  });
  const flatMovingPos: number[] = [];
  const flatProgress: number[] = [];
  for (let i = 0; i < loopLen; i++) {
    const nextIdx = (i + 1) % loopLen;
    flatMovingPos.push(
      movingLinePos[i][0], movingLinePos[i][1], movingLinePos[i][2],
      movingLinePos[nextIdx][0], movingLinePos[nextIdx][1], movingLinePos[nextIdx][2]
    );
    flatProgress.push(loopDists[i] / totalPerimeterDist, loopDists[i + 1] / totalPerimeterDist);
  }

  const pulseGeo = new THREE.BufferGeometry();
  pulseGeo.setAttribute("position", new THREE.Float32BufferAttribute(flatMovingPos, 3));
  pulseGeo.setAttribute("aProgress", new THREE.Float32BufferAttribute(flatProgress, 1));
  pulseGeo.computeBoundingSphere();

  const pulseUniforms = {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(accentColorHex) },
    uOpacity: { value: 0.95 },
  };

  const pulseMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: pulseUniforms,
    vertexShader: /* glsl */ `
      attribute float aProgress;
      varying float vProgress;
      void main() {
        vProgress = aProgress;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vProgress;

      void main() {
        // Three smooth photon waves traveling around the contour in equidistant phase (120 deg)
        float p1 = fract(vProgress - uTime * 0.14);
        float comet1 = smoothstep(0.0, 0.12, p1) * smoothstep(0.32, 0.12, p1);

        float p2 = fract(vProgress - uTime * 0.14 + 0.33333);
        float comet2 = smoothstep(0.0, 0.12, p2) * smoothstep(0.32, 0.12, p2);

        float p3 = fract(vProgress - uTime * 0.14 + 0.66667);
        float comet3 = smoothstep(0.0, 0.12, p3) * smoothstep(0.32, 0.12, p3);

        float glow = (pow(comet1, 2.2) + pow(comet2, 2.2) + pow(comet3, 2.2)) * 2.2;
        if (glow < 0.02) discard;

        vec3 col = mix(uColor, vec3(1.0, 1.0, 1.0), clamp(glow * 0.7, 0.0, 1.0));
        gl_FragColor = vec4(col, glow * uOpacity);
      }
    `,
  });

  const pulseLines = new THREE.LineSegments(pulseGeo, pulseMat);
  pulseLines.frustumCulled = false;
  pulseLines.renderOrder = 5;
  group.add(pulseLines);
  disposables.push(pulseGeo, pulseMat);

  // 5. Gentle traveling micro-spark beads gliding along the contour (3 lights)
  const glowTex = radialGlowTexture();
  disposables.push(glowTex);

  const sparkMat1 = new THREE.SpriteMaterial({
    map: glowTex,
    color: 0xffffff,
    transparent: true,
    opacity: 0.88,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const spark1 = new THREE.Sprite(sparkMat1);
  spark1.scale.setScalar(0.05);
  spark1.renderOrder = 6;
  group.add(spark1);
  disposables.push(sparkMat1);

  const sparkMat2 = sparkMat1.clone();
  const spark2 = new THREE.Sprite(sparkMat2);
  spark2.scale.setScalar(0.046);
  spark2.renderOrder = 6;
  group.add(spark2);
  disposables.push(sparkMat2);

  const sparkMat3 = sparkMat1.clone();
  const spark3 = new THREE.Sprite(sparkMat3);
  spark3.scale.setScalar(0.046);
  spark3.renderOrder = 6;
  group.add(spark3);
  disposables.push(sparkMat3);

  const tempPos1 = new THREE.Vector3();
  const tempPos2 = new THREE.Vector3();
  const tempPos3 = new THREE.Vector3();

  let masterOpacity = 1;

  const setOpacity = (alpha: number) => {
    masterOpacity = Math.max(0, Math.min(1, alpha));
    for (const item of fadeMaterials) {
      item.mat.opacity = item.baseOpacity * masterOpacity;
    }
    pulseUniforms.uOpacity.value = 0.95 * masterOpacity;
    sparkMat1.opacity = 0.88 * masterOpacity;
    sparkMat2.opacity = 0.82 * masterOpacity;
    sparkMat3.opacity = 0.82 * masterOpacity;
    group.visible = masterOpacity > 0.01;
  };

  const tick = (time: number, isHovered = false) => {
    if (masterOpacity <= 0.01) return;

    const speed = isHovered ? 1.5 : 1.0;
    pulseUniforms.uTime.value = time * speed;

    // Organic breathing of the territory skin
    const breathing = 0.5 + 0.5 * Math.sin(time * 2.4);
    for (const sm of skinMeshes) {
      const smMat = sm.material as THREE.MeshBasicMaterial;
      smMat.opacity = (0.09 + 0.08 * breathing) * (isHovered ? 1.3 : 1.0) * masterOpacity;
    }

    // Glide 3 micro-spark beads along the actual perimeter loop
    if (loopVecs.length > 3) {
      const t1 = (time * 0.14 * speed) % 1.0;
      const t2 = (time * 0.14 * speed + 0.333333) % 1.0;
      const t3 = (time * 0.14 * speed + 0.666667) % 1.0;
      sampleLoopPoint(loopVecs, loopDists, totalPerimeterDist, t1, tempPos1);
      sampleLoopPoint(loopVecs, loopDists, totalPerimeterDist, t2, tempPos2);
      sampleLoopPoint(loopVecs, loopDists, totalPerimeterDist, t3, tempPos3);

      tempPos1.normalize().multiplyScalar(R_LIGHT);
      tempPos2.normalize().multiplyScalar(R_LIGHT);
      tempPos3.normalize().multiplyScalar(R_LIGHT);

      spark1.position.copy(tempPos1);
      spark2.position.copy(tempPos2);
      spark3.position.copy(tempPos3);

      const sparkle = 0.8 + 0.2 * Math.sin(time * 6.0);
      sparkMat1.opacity = 0.88 * sparkle * masterOpacity;
      sparkMat2.opacity = 0.82 * sparkle * masterOpacity;
      sparkMat3.opacity = 0.82 * sparkle * masterOpacity;
    }
  };

  return {
    group,
    materials,
    disposables,
    setOpacity,
    tick,
  };
}
