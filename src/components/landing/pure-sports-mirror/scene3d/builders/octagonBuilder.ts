import * as THREE from 'three';
import { M, createBox } from '../sceneUtils';
import { CYAN } from '../sceneConfig';
import { SceneModelHandle } from './venueBuilders';

/**
 * Builds the Octagon Combat Arts arena (VEN-04 / COMBAT ARTS).
 * Features:
 * - 8-sided regular polygon mat with tatami wire texture and glowing perimeter ring
 * - Central telemetry radar rings and radial spoke lines
 * - 8 corner cylindrical posts with base collars and pulsating sensor beacon spheres
 * - 8 perimeter cage fence panels with top and bottom rails, precisely oriented to enclose the octagon
 * - Expanding telemetry ripples on the floor
 */
export const buildOctagon = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const R = 2.7;
  const N = 8;

  // 1. Base platform podium
  g.add(createBox(7.6, 0.24, 7.6, M.std(0x0b1118, 0.8, 0.1), 0, -1.3, 0));

  // 2. Octagon mat canvas
  const mat = new THREE.Mesh(new THREE.CircleGeometry(R, N, Math.PI / N), M.paint(0x122028, 1));
  mat.rotation.x = -Math.PI / 2;
  mat.position.y = -1.16;
  g.add(mat);

  // 3. Tatami wire grid pattern
  const tat = new THREE.Mesh(new THREE.CircleGeometry(R * 0.98, N, Math.PI / N), M.wire(a, 0.28));
  tat.rotation.x = -Math.PI / 2;
  tat.position.y = -1.15;
  g.add(tat);

  // 4. Glowing inner ring
  const inner = new THREE.Mesh(new THREE.RingGeometry(R * 0.52, R * 0.55, N * 8), M.glow(a, 0.55));
  inner.rotation.x = -Math.PI / 2;
  inner.position.y = -1.14;
  g.add(inner);

  // 5. Outer glowing perimeter octagon ring
  const peri = new THREE.Mesh(new THREE.RingGeometry(R * 0.96, R, N, 1, Math.PI / N), M.glow(CYAN, 0.7));
  (peri.material as THREE.Material & { userData?: { o0?: number } }).userData = { o0: 0.7 };
  peri.rotation.x = -Math.PI / 2;
  peri.position.y = -1.13;
  g.add(peri);

  // 6. Central telemetry concentric rings & radial spoke lines
  const centerRing = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.58, 48), M.glow(CYAN, 0.35));
  centerRing.rotation.x = -Math.PI / 2;
  centerRing.position.y = -1.135;
  g.add(centerRing);

  const spokePoints: number[] = [];
  for (let i = 0; i < N; i++) {
    const th = (i / N) * Math.PI * 2 + Math.PI / N;
    spokePoints.push(0, -1.135, 0);
    spokePoints.push(Math.cos(th) * R * 0.94, -1.135, Math.sin(th) * R * 0.94);
  }
  const spokeGeo = new THREE.BufferGeometry();
  spokeGeo.setAttribute('position', new THREE.Float32BufferAttribute(spokePoints, 3));
  const spokes = new THREE.LineSegments(spokeGeo, M.line(a, 0.35));
  g.add(spokes);

  // 7. Corner posts, glowing sensor caps, and precisely oriented cage fences
  const caps: THREE.Mesh[] = [];
  for (let i = 0; i < N; i++) {
    const th = (i / N) * Math.PI * 2 + Math.PI / N;
    const x = Math.cos(th) * R;
    const z = Math.sin(th) * R;

    // Corner pillar post
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 2.0, 20), M.std(0x222c36, 0.4, 0.7));
    p.position.set(x, -0.18, z);
    g.add(p);

    // Post base collar
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.2, 16), M.std(0x182028, 0.5, 0.6));
    collar.position.set(x, -1.06, z);
    g.add(collar);

    // Glowing telemetry beacon sensor cap
    const c = new THREE.Mesh(new THREE.SphereGeometry(0.115, 18, 12), M.glow(a, 0.95));
    c.position.set(x, 0.88, z);
    g.add(c);
    caps.push(c);

    // 8-Sided Perimeter Cage Wall / Fence Segments (strictly bounding the octagon between post i and post i+1)
    const th2 = ((i + 1) / N) * Math.PI * 2 + Math.PI / N;
    const x2 = Math.cos(th2) * R;
    const z2 = Math.sin(th2) * R;
    const w = Math.hypot(x2 - x, z2 - z);
    const midX = (x + x2) / 2;
    const midZ = (z + z2) / 2;
    // Exactly aligned along the segment connecting (x, z) to (x2, z2)
    const angleY = -Math.atan2(z2 - z, x2 - x);

    // Wire mesh fence panel
    const fenceMat = M.wire(0x4e6472, 0.32);
    fenceMat.side = THREE.DoubleSide;
    const fence = new THREE.Mesh(new THREE.PlaneGeometry(w, 1.9, 10, 8), fenceMat);
    fence.position.set(midX, -0.2, midZ);
    fence.rotation.y = angleY;
    g.add(fence);

    // Protective padded top rail
    const topRail = createBox(w, 0.07, 0.07, M.std(0x1a2530, 0.55, 0.5));
    topRail.position.set(midX, 0.75, midZ);
    topRail.rotation.y = angleY;
    g.add(topRail);

    // Bottom structural boundary rail
    const bottomRail = createBox(w, 0.05, 0.05, M.std(0x141c24, 0.6, 0.5));
    bottomRail.position.set(midX, -1.14, midZ);
    bottomRail.rotation.y = angleY;
    g.add(bottomRail);
  }

  // 8. Expanding pulse ripple rings
  const ripples = [0, 1, 2].map(() => {
    const r = new THREE.Mesh(new THREE.RingGeometry(0.4, 0.44, 64), M.glow(CYAN, 0.5));
    (r.material as THREE.Material & { userData?: { o0?: number } }).userData = { o0: 0.5 };
    r.rotation.x = -Math.PI / 2;
    r.position.y = -1.12;
    g.add(r);
    return r;
  });

  return {
    group: g,
    update(t: number) {
      const pm = peri.material as THREE.Material & { opacity: number; userData?: { o0?: number } };
      pm.opacity = (pm.userData?.o0 || 0.7) * (0.6 + 0.4 * Math.sin(t * 1.6));

      caps.forEach((c, i) => c.scale.setScalar(0.9 + 0.18 * Math.sin(t * 2.2 + i * 0.8)));

      ripples.forEach((r, i) => {
        const k = (t * 0.45 + i / 3) % 1;
        r.scale.setScalar(0.5 + k * 5.6);
        const rm = r.material as THREE.Material & { opacity: number; userData?: { o0?: number } };
        rm.opacity = (rm.userData?.o0 || 0.5) * (1 - k) * 0.9;
      });

      inner.rotation.z = t * 0.1;
    },
  };
};
