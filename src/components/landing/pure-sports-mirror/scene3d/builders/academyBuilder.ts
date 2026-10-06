import * as THREE from 'three';
import { M, createBox, createParts4, pulseMesh } from '../sceneUtils';
import { CYAN, GOLD, WHITE } from '../sceneConfig';
import { SceneModelHandle } from './venueBuilders';

/**
 * YOUTH ACADEMY (MST-05 / YOUTH ACADEMY):
 * 
 * High-fidelity 3D scene matching Claude design & screenshots:
 * - Part 0: SCALE & CAPACITY — 6-tier cohort staircase (U8–U18) where cohort thins as it climbs,
 *   floating golden championship crown, 40 orbiting kid markers, dual floor retention (74%)/lost (26%) arcs,
 *   and 160 rising talent emergence particles.
 * - Part 1: DISCIPLINES — Left console (-2.95, 0.05, 0) featuring 9 (3x3) specialisation pod rings
 *   with pulsing cores and 3 ABC foundation ladder rungs.
 * - Part 2: TELEMETRY & BIO — Right console (2.95, 0.3, 0) featuring dynamic PHV growth curve
 *   with golden apex beacon & halo, 18 (3x6) skill matrix tiles, and parent portal screen.
 * - Part 3: COMPLIANCE — Front safety console (0, -0.66, 2.6) with verified consent shield,
 *   golden security padlock, expanding sonar rings, 3 compliance cards with status ticks,
 *   and rotating 3D golden wireframe data vault.
 */
export const buildAcademy = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const P = createParts4(g);
  const acts: ((t: number, dt: number, e: number) => void)[] = [];

  // ─────────────────────────────────────────────────────────────────────────
  // 0 · SCALE & CAPACITY — 6 Age-step cohorts, crown, orbiting markers, arcs
  // ─────────────────────────────────────────────────────────────────────────
  {
    const T = 6;
    const kids: THREE.Mesh[] = [];

    // Stepped staircase cohorts
    for (let i = 0; i < T; i++) {
      const w = 4.4 - i * 0.62;
      const h = 0.28;
      P[0].add(
        createBox(
          w,
          h,
          w,
          M.std(i % 2 ? 0x101720 : 0x161f29, 0.5, 0.4),
          0,
          -1.32 + i * h + h / 2,
          0
        )
      );
      P[0].add(
        createBox(
          w + 0.03,
          0.014,
          w + 0.03,
          M.glow(i === T - 1 ? GOLD : a, 0.22 + i * 0.14),
          0,
          -1.32 + i * h + h + 0.008,
          0
        )
      );
    }

    // Top tier championship crown
    const crown = new THREE.Mesh(
      new THREE.TorusGeometry(0.5, 0.03, 14, 48),
      new THREE.MeshStandardMaterial({
        color: GOLD,
        roughness: 0.16,
        metalness: 1,
        transparent: true,
      })
    );
    crown.rotation.x = Math.PI / 2;
    crown.position.y = 0.55;
    P[0].add(crown);

    // 40 Kid markers distributed across cohorts — fewer at higher tiers
    for (let i = 0; i < 40; i++) {
      const tier = Math.min(T - 1, Math.floor(Math.pow(i / 40, 0.62) * T));
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.048, 14, 10),
        M.glow(tier > 3 ? GOLD : a, 0.85)
      );
      m.userData.step = {
        th: (i / 40) * Math.PI * 2,
        r: (4.4 - tier * 0.62) / 2 - 0.22,
        tier,
        i,
      };
      P[0].add(m);
      kids.push(m);
    }

    // Retention ring (74% arc) on floor
    const ret = new THREE.Mesh(
      new THREE.RingGeometry(2.62, 2.72, 80, 1, 0, Math.PI * 2 * 0.74),
      M.glow(a, 0.55)
    );
    ret.rotation.x = -Math.PI / 2;
    ret.position.y = -1.33;
    P[0].add(ret);

    // Lost cohort ring (26% arc) on floor in warning amber
    const lost = new THREE.Mesh(
      new THREE.RingGeometry(2.62, 2.72, 80, 1, Math.PI * 2 * 0.74, Math.PI * 2 * 0.26),
      M.glow(0xffb347, 0.35)
    );
    lost.rotation.x = -Math.PI / 2;
    lost.position.y = -1.33;
    P[0].add(lost);

    // Talent emergence rising particles
    const riseCount = 160;
    const risePos = new Float32Array(riseCount * 3);
    const riseGeo = new THREE.BufferGeometry();
    riseGeo.setAttribute('position', new THREE.BufferAttribute(risePos, 3));
    const risePoints = new THREE.Points(riseGeo, M.dot(a, 0.05, 0.6));
    P[0].add(risePoints);

    const riseSeeds = Array.from({ length: riseCount }, () => ({
      x: (Math.random() - 0.5) * 4,
      z: (Math.random() - 0.5) * 4,
      u: Math.random(),
    }));

    acts.push((t, dt, e) => {
      kids.forEach((m) => {
        const u = m.userData.step;
        const th = u.th + t * 0.3;
        m.position.set(
          Math.cos(th) * u.r,
          -1.32 + u.tier * 0.28 + 0.33 + Math.sin(t * 2 + u.i) * 0.035,
          Math.sin(th) * u.r
        );
      });
      crown.rotation.z = t * 0.5;
      crown.position.y = 0.55 + Math.sin(t * 1.2) * 0.07;
      pulseMesh(ret, 0.6 + 0.4 * Math.sin(t * 1.1), e);
      pulseMesh(lost, 0.3 + 0.7 * Math.abs(Math.sin(t * 2.6)), e);

      for (let i = 0; i < riseCount; i++) {
        const s = riseSeeds[i];
        const u = (s.u + t * 0.09) % 1;
        risePos[i * 3] = s.x * (1 - u * 0.5);
        risePos[i * 3 + 1] = -1.3 + u * 3.0;
        risePos[i * 3 + 2] = s.z * (1 - u * 0.5);
      }
      riseGeo.attributes.position.needsUpdate = true;
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 1 · DISCIPLINES — ABC base ladder + 9 specialisation pods
  // ─────────────────────────────────────────────────────────────────────────
  {
    const G = new THREE.Group();
    G.position.set(-2.95, 0.05, 0);
    G.rotation.y = 0.55;
    P[1].add(G);

    G.add(new THREE.Mesh(new THREE.PlaneGeometry(2.3, 1.9), M.glow(CYAN, 0.05)));
    G.add(new THREE.Mesh(new THREE.PlaneGeometry(2.3, 1.9, 8, 7), M.wire(CYAN, 0.14)));

    const pods: { ring: THREE.Mesh; core: THREE.Mesh; k: number }[] = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const k = r * 3 + c;
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.16, 0.017, 10, 28),
          M.glow(k % 4 ? a : CYAN, 0.7)
        );
        ring.position.set(-0.62 + c * 0.62, 0.36 - r * 0.46, 0.06);
        G.add(ring);

        const core = new THREE.Mesh(
          new THREE.SphereGeometry(0.055, 12, 9),
          M.glow(0xffffff, 0.75)
        );
        core.position.copy(ring.position);
        G.add(core);

        pods.push({ ring, core, k });
      }
    }

    const abc = [0, 1, 2].map((i) =>
      createBox(
        1.9 - i * 0.2,
        0.05,
        0.02,
        M.glow(i ? a : GOLD, 0.45 + (i ? 0 : 0.35)),
        0,
        -0.78 - i * 0.13,
        0.05
      )
    );
    abc.forEach((b) => G.add(b));

    acts.push((t, dt, e) => {
      pods.forEach((p) => {
        p.ring.rotation.z = t * (0.3 + p.k * 0.05);
        p.core.scale.setScalar(1 + 0.25 * Math.sin(t * 1.6 + p.k * 0.7));
        pulseMesh(p.ring, 0.4 + 0.6 * Math.abs(Math.sin(t * 1.1 + p.k * 0.5)), e);
      });
      abc.forEach((b, i) =>
        pulseMesh(b, 0.45 + 0.55 * Math.abs(Math.sin(t * 1.4 - i * 0.8)), e)
      );
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 2 · TELEMETRY — PHV growth curve, skill matrix, parent portal
  // ─────────────────────────────────────────────────────────────────────────
  {
    const G = new THREE.Group();
    G.position.set(2.95, 0.3, 0);
    G.rotation.y = -0.55;
    P[2].add(G);

    G.add(new THREE.Mesh(new THREE.PlaneGeometry(2.3, 1.9), M.glow(CYAN, 0.05)));
    G.add(new THREE.Mesh(new THREE.PlaneGeometry(2.3, 1.9, 9, 7), M.wire(CYAN, 0.14)));

    const n = 100;
    const cp = new Float32Array(n * 3);
    const cg = new THREE.BufferGeometry();
    for (let i = 0; i < n; i++) {
      cp[i * 3] = -0.95 + (i / n) * 1.9;
      cp[i * 3 + 1] = 0.4;
      cp[i * 3 + 2] = 0.06;
    }
    cg.setAttribute('position', new THREE.BufferAttribute(cp, 3));
    G.add(new THREE.Line(cg, M.line(a, 0.9)));

    const peak = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 9), M.glow(GOLD, 0.95));
    peak.position.set(0.12, 0.62, 0.07);
    G.add(peak);

    const halo = new THREE.Mesh(new THREE.RingGeometry(0.09, 0.11, 30), M.glow(GOLD, 0.6));
    halo.position.copy(peak.position);
    G.add(halo);

    const cells: { q: THREE.Mesh; k: number }[] = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 6; c++) {
        const k = r * 6 + c;
        const q = createBox(
          0.16,
          0.16,
          0.02,
          M.glow((r + c) % 3 ? CYAN : a, 0.3 + (k % 5) * 0.12),
          -0.72 + c * 0.29,
          -0.32 - r * 0.22,
          0.06
        );
        G.add(q);
        cells.push({ q, k });
      }
    }

    const portal = new THREE.Group();
    portal.position.set(0.72, -0.86, 0.1);
    G.add(portal);
    portal.add(createBox(0.34, 0.5, 0.03, M.std(0x16202a, 0.5, 0.35)));
    const scr = createBox(0.28, 0.4, 0.02, M.glow(a, 0.5), 0, 0, 0.03);
    portal.add(scr);

    acts.push((t, dt, e) => {
      for (let i = 0; i < n; i++) {
        const u = i / n;
        cp[i * 3 + 1] =
          0.16 +
          u * 0.3 +
          0.36 * Math.exp(-Math.pow((u - 0.56) * 6.4, 2)) * (0.9 + 0.1 * Math.sin(t * 1.4));
      }
      cg.attributes.position.needsUpdate = true;

      const k = 0.16 + 0.56 * 0.3 + 0.36 * (0.9 + 0.1 * Math.sin(t * 1.4));
      peak.position.y = k;
      halo.position.y = k;
      halo.scale.setScalar(1 + 0.4 * Math.sin(t * 2.2));
      cells.forEach((c) =>
        pulseMesh(c.q, 0.35 + 0.65 * Math.abs(Math.sin(t * 1.2 + c.k * 0.4)), e)
      );
      pulseMesh(scr, 0.45 + 0.55 * Math.abs(Math.sin(t * 0.9)), e);
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 3 · STANDARD & COMPLIANCE — Verified consent gate, sealed records, vault
  // ─────────────────────────────────────────────────────────────────────────
  {
    const G = new THREE.Group();
    G.position.set(0, -0.66, 2.6);
    G.rotation.x = -0.5;
    P[3].add(G);

    G.add(new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.5), M.glow(CYAN, 0.045)));
    G.add(new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.5, 12, 5), M.wire(CYAN, 0.13)));

    const shield = new THREE.Group();
    shield.position.set(-1.2, 0, 0.08);
    G.add(shield);

    shield.add(new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.022, 12, 50), M.glow(a, 0.7)));
    const lock = new THREE.Mesh(
      new THREE.TorusGeometry(0.13, 0.024, 10, 26, Math.PI),
      M.glow(GOLD, 0.9)
    );
    lock.position.y = 0.12;
    shield.add(lock);
    shield.add(createBox(0.26, 0.22, 0.03, M.std(0x1b2530, 0.45, 0.5), 0, -0.04, 0));

    const rings = [0, 1].map(() => {
      const r = new THREE.Mesh(new THREE.RingGeometry(0.42, 0.45, 48), M.glow(a, 0.5));
      shield.add(r);
      return r;
    });

    const cards = [0, 1, 2].map((i) => {
      const C = new THREE.Group();
      C.position.set(0.32, 0.4 - i * 0.36, 0.06);
      G.add(C);
      C.add(createBox(1.5, 0.26, 0.02, M.std(0x16202a, 0.5, 0.3)));
      const tick = createBox(
        0.1,
        0.1,
        0.02,
        M.glow(i === 2 ? 0xffb347 : a, 0.9),
        -0.64,
        0,
        0.02
      );
      C.add(tick);
      C.add(createBox(0.7, 0.03, 0.02, M.glow(CYAN, 0.38), 0.02, 0.04, 0.02));
      return { tick, i };
    });

    const vault = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.36, 0.36), M.wire(GOLD, 0.5));
    vault.position.set(1.42, -0.16, 0.12);
    G.add(vault);

    acts.push((t, dt, e) => {
      lock.rotation.z = Math.sin(t * 0.9) * 0.18;
      rings.forEach((r, i) => {
        const k = (t * 0.5 + i / 2) % 1;
        r.scale.setScalar(1 + k * 0.6);
        pulseMesh(r, (1 - k) * 0.9, e);
      });
      cards.forEach((c) =>
        pulseMesh(
          c.tick,
          c.i === 2 ? 0.3 + 0.7 * Math.abs(Math.sin(t * 3)) : 0.9,
          e
        )
      );
      vault.rotation.y = t * 0.5;
      vault.rotation.x = t * 0.25;
      vault.scale.setScalar(0.9 + 0.08 * Math.sin(t * 1.6));
    });
  }

  return {
    group: g,
    parts: P,
    update(t, dt, e = 1) {
      acts.forEach((f) => f(t, dt, e));
    },
  };
};
