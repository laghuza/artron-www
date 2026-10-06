import * as THREE from 'three';
import { M, createBox, createLoop4, createParts4, pulseMesh } from '../sceneUtils';
import { CYAN, GOLD } from '../sceneConfig';
import { SceneModelHandle } from './venueBuilders';

/**
 * MASTERS & CHAMPIONS (MST-02):
 * - Part 0: SCALE — 124 title holders around 3-tier podium (Gold, Silver, Bronze), top spotlight beam, 46 season starts ring
 * - Part 1: DISCIPLINES — Weight-category ladder (6 rungs, active tier in gold), dot junctions & masters class ring
 * - Part 2: TECHNOLOGY — Result → Protocol → Rank 3-block chain, dynamic Elo curve & RFID medallion with pulsing waves
 * - Part 3: COMPLIANCE — Classification codex (4 audit rows, row 3 appeal status) + 72h window circular dial & crystal
 */
export const buildPodium = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const acts: ((t: number, dt: number, e: number) => void)[] = [];
  const P = createParts4(g);

  // ─────────────────────────────────────────────────────────────────────────
  // 0 · SCALE — 124 title holders around 3-tier podium, 46 season starts
  // ─────────────────────────────────────────────────────────────────────────
  {
    const hs = [1.35, 0.95, 0.72];
    const xs = [0, -1.42, 1.42];
    const cols = [GOLD, 0xd8dde3, 0xc08a4a];
    const meds: THREE.Mesh[] = [];

    hs.forEach((h, i) => {
      // Pedestal body
      P[0].add(
        createBox(
          1.26,
          h,
          1.26,
          M.std(i ? 0x131a22 : 0x1b242e, 0.4, 0.55),
          xs[i],
          -1.3 + h / 2,
          0
        )
      );
      // Glowing top platform surface
      P[0].add(
        createBox(
          1.32,
          0.04,
          1.32,
          M.glow(cols[i], i ? 0.5 : 0.9),
          xs[i],
          -1.3 + h + 0.02,
          0
        )
      );
      // Contour perimeter wire loop
      P[0].add(createLoop4(1.28, 1.28, -1.3 + h, M.line(cols[i], 0.6)).translateX(xs[i]));

      // Floating rotating medal disc
      const med = new THREE.Mesh(
        new THREE.CylinderGeometry(0.26, 0.26, 0.05, 44),
        new THREE.MeshStandardMaterial({
          color: cols[i],
          roughness: 0.16,
          metalness: 1,
          transparent: true,
        })
      );
      med.rotation.x = Math.PI / 2;
      med.position.set(xs[i], -1.3 + h + 0.62, 0);
      P[0].add(med);
      meds.push(med);

      // Ribbon suspension box
      P[0].add(
        createBox(
          0.12,
          0.34,
          0.02,
          M.paint(i ? 0x25313c : 0x2f3b2a, 0.9),
          xs[i],
          -1.3 + h + 0.88,
          0
        )
      );
    });

    // Top spotlight cone beam centered on gold 1st place podium
    const beam = new THREE.Mesh(
      new THREE.ConeGeometry(1.5, 3.6, 30, 1, true),
      M.glow(0xfff3d0, 0.07)
    );
    beam.position.y = 1.4;
    beam.rotation.x = Math.PI;
    P[0].add(beam);

    // 124 title holders particle cloud orbiting around podium
    const N = 124;
    const pos = new Float32Array(N * 3);
    const seed: { th: number; r: number; s: number; y: number }[] = [];
    for (let i = 0; i < N; i++) {
      seed.push({
        th: Math.random() * 6.28,
        r: 2.0 + Math.random() * 0.95,
        s: 0.35 + Math.random() * 0.8,
        y: Math.random() * 0.3,
      });
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    P[0].add(new THREE.Points(pg, M.dot(GOLD, 0.06, 0.8)));

    // 46 season starts ticks around circumference (medalled starts lit gold)
    const ticks: THREE.Mesh[] = [];
    for (let i = 0; i < 46; i++) {
      const th = (i / 46) * Math.PI * 2;
      const hit = i % 3 === 0;
      const tk = createBox(
        0.026,
        0.02,
        hit ? 0.24 : 0.12,
        M.glow(hit ? GOLD : a, hit ? 0.8 : 0.3),
        Math.cos(th) * 3.1,
        -1.31,
        Math.sin(th) * 3.1
      );
      tk.rotation.y = -th;
      P[0].add(tk);
      ticks.push(tk);
    }

    acts.push((t, _dt, e) => {
      meds.forEach((m, i) => {
        m.rotation.y = t * (0.9 - i * 0.2);
      });
      for (let i = 0; i < N; i++) {
        const s = seed[i];
        const th = s.th + t * 0.1 * s.s;
        pos[i * 3] = Math.cos(th) * s.r;
        pos[i * 3 + 1] = -1.22 + s.y + Math.sin(t + i) * 0.02;
        pos[i * 3 + 2] = Math.sin(th) * s.r;
      }
      pg.attributes.position.needsUpdate = true;
      ticks.forEach((tk, i) => {
        pulseMesh(tk, 0.4 + 0.6 * Math.abs(Math.sin(t * 1.1 - i * 0.18)), e);
      });
      pulseMesh(beam, 0.7 + 0.3 * Math.sin(t * 1.2), e);
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 1 · DISCIPLINES — Weight-category ladder, cup bracket & masters class
  // ─────────────────────────────────────────────────────────────────────────
  {
    const G = new THREE.Group();
    G.position.set(-2.95, 0.2, 0);
    G.rotation.y = 0.55;
    P[1].add(G);

    // Holographic backplane & cyan wireframe grid
    G.add(new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.7), M.glow(CYAN, 0.05)));
    G.add(new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.7, 8, 6), M.wire(CYAN, 0.14)));

    // 6 ladder rungs (rung 2 active in gold)
    const rungs = [0, 1, 2, 3, 4, 5].map((i) => {
      const act = i === 2;
      const r = createBox(
        0.9 + i * 0.13,
        0.055,
        0.02,
        M.glow(act ? GOLD : a, act ? 0.9 : 0.4),
        -0.28,
        0.66 - i * 0.24,
        0.05
      );
      G.add(r);
      const d = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 10, 8),
        M.glow(act ? GOLD : CYAN, 0.8)
      );
      d.position.set(0.72, 0.66 - i * 0.24, 0.05);
      G.add(d);
      return { r, d, i, act };
    });

    // Vertical ladder rail connecting dot indicators
    const br = new THREE.BufferGeometry();
    const bp = new Float32Array(5 * 6);
    for (let i = 0; i < 5; i++) {
      bp[i * 6] = 0.72;
      bp[i * 6 + 1] = 0.66 - i * 0.24;
      bp[i * 6 + 2] = 0.05;
      bp[i * 6 + 3] = 0.72;
      bp[i * 6 + 4] = 0.66 - (i + 1) * 0.24;
      bp[i * 6 + 5] = 0.05;
    }
    br.setAttribute('position', new THREE.BufferAttribute(bp, 3));
    G.add(new THREE.LineSegments(br, M.line(a, 0.4)));

    // Masters 35+ emblem ring
    const mst = new THREE.Mesh(
      new THREE.TorusGeometry(0.15, 0.018, 10, 30),
      M.glow(0xffb347, 0.75)
    );
    mst.position.set(-0.78, -0.72, 0.06);
    G.add(mst);

    acts.push((t, _dt, e) => {
      rungs.forEach((rg) => {
        pulseMesh(
          rg.r,
          rg.act
            ? 0.7 + 0.3 * Math.sin(t * 2.4)
            : 0.35 + 0.35 * Math.abs(Math.sin(t * 1.1 + rg.i * 0.6)),
          e
        );
        rg.d.scale.setScalar(1 + 0.25 * Math.sin(t * 1.8 + rg.i));
      });
      mst.rotation.z = t * 0.6;
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 2 · TECHNOLOGY — Result → Protocol → Rank chain, Elo curve, RFID medallion
  // ─────────────────────────────────────────────────────────────────────────
  {
    const G = new THREE.Group();
    G.position.set(2.95, 0.2, 0);
    G.rotation.y = -0.55;
    P[2].add(G);

    // Holographic backplane & wireframe grid
    G.add(new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.7), M.glow(CYAN, 0.05)));
    G.add(new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.7, 8, 6), M.wire(CYAN, 0.14)));

    // 3-step chain blocks (Result -> Protocol -> Rank)
    const chain = [0, 1, 2].map((i) => {
      const c = new THREE.Mesh(
        new THREE.BoxGeometry(0.34, 0.34, 0.34),
        M.wire(i === 2 ? GOLD : a, 0.55)
      );
      c.position.set(-0.68 + i * 0.68, 0.5, 0.2);
      G.add(c);
      const core = createBox(
        0.2,
        0.2,
        0.2,
        M.glow(i === 2 ? GOLD : CYAN, 0.6),
        -0.68 + i * 0.68,
        0.5,
        0.2
      );
      G.add(core);
      return { c, core, i };
    });

    // Connecting workflow flowline segments
    const flow = new THREE.BufferGeometry();
    const fp = new Float32Array(2 * 6);
    flow.setAttribute('position', new THREE.BufferAttribute(fp, 3));
    for (let i = 0; i < 2; i++) {
      fp[i * 6] = -0.68 + i * 0.68;
      fp[i * 6 + 1] = 0.5;
      fp[i * 6 + 2] = 0.2;
      fp[i * 6 + 3] = -0.68 + (i + 1) * 0.68;
      fp[i * 6 + 4] = 0.5;
      fp[i * 6 + 5] = 0.2;
    }
    G.add(new THREE.LineSegments(flow, M.line(a, 0.5)));

    // Dynamic Elo rating trajectory curve
    const n = 90;
    const ep = new Float32Array(n * 3);
    const eg = new THREE.BufferGeometry();
    for (let i = 0; i < n; i++) {
      ep[i * 3] = -0.95 + (i / n) * 1.9;
      ep[i * 3 + 1] = -0.2;
      ep[i * 3 + 2] = 0.05;
    }
    eg.setAttribute('position', new THREE.BufferAttribute(ep, 3));
    G.add(new THREE.Line(eg, M.line(GOLD, 0.85)));

    // Gold RFID Medallion cylinder
    const rfid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.16, 0.04, 36),
      new THREE.MeshStandardMaterial({
        color: GOLD,
        roughness: 0.18,
        metalness: 1,
        transparent: true,
      })
    );
    rfid.rotation.x = Math.PI / 2;
    rfid.position.set(0, -0.62, 0.1);
    G.add(rfid);

    // 3 expanding RFID telemetry wave rings
    const waves = [0, 1, 2].map(() => {
      const r = new THREE.Mesh(
        new THREE.RingGeometry(0.18, 0.21, 34),
        M.glow(a, 0.55)
      );
      r.position.set(0, -0.62, 0.11);
      G.add(r);
      return r;
    });

    acts.push((t, _dt, e) => {
      chain.forEach((c) => {
        c.c.rotation.y = t * (0.5 + c.i * 0.2);
        c.c.rotation.x = t * 0.2;
        pulseMesh(c.core, 0.4 + 0.6 * Math.abs(Math.sin(t * 1.6 - c.i * 0.9)), e);
      });
      for (let i = 0; i < n; i++) {
        const u = i / n;
        ep[i * 3 + 1] =
          -0.42 + 0.44 * (u * u * 0.8 + 0.2 * Math.sin(u * 9 + t * 0.9) * u);
      }
      eg.attributes.position.needsUpdate = true;
      rfid.rotation.z = t * 0.8;
      waves.forEach((r, i) => {
        const k = (t * 0.7 + i / 3) % 1;
        r.scale.setScalar(0.6 + k * 2.1);
        pulseMesh(r, 1 - k, e);
      });
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 3 · STANDARD — Classification codex, judge licences & 72h appeal window
  // ─────────────────────────────────────────────────────────────────────────
  {
    const G = new THREE.Group();
    G.position.set(0, -0.66, 2.55);
    G.rotation.x = -0.5;
    P[3].add(G);

    // Wide holographic plane & wireframe grid
    G.add(new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.5), M.glow(CYAN, 0.045)));
    G.add(new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.5, 12, 5), M.wire(CYAN, 0.13)));

    // 4 protocol verification rows (row 3 is amber for pending 72h appeal window)
    const rows = [0, 1, 2, 3].map((i) => {
      const R = new THREE.Group();
      R.position.set(-0.55, 0.42 - i * 0.28, 0.05);
      G.add(R);
      R.add(createBox(1.9, 0.2, 0.02, M.std(0x16202a, 0.5, 0.3)));
      const tick = createBox(
        0.09,
        0.09,
        0.02,
        M.glow(i === 3 ? 0xffb347 : a, 0.9),
        -0.86,
        0,
        0.02
      );
      R.add(tick);
      R.add(createBox(0.9, 0.03, 0.02, M.glow(CYAN, 0.4), -0.1, 0.03, 0.02));
      return { tick, i };
    });

    // Circular gauge dial for 72h appeal window
    const dial = new THREE.Group();
    dial.position.set(1.32, -0.06, 0.08);
    G.add(dial);
    dial.add(
      new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.014, 8, 56), M.glow(a, 0.5))
    );
    const arc = new THREE.Mesh(
      new THREE.RingGeometry(0.3, 0.38, 48, 1, 0, Math.PI * 0.75),
      M.glow(0xffb347, 0.7)
    );
    dial.add(arc);

    // Floating center crystalline icosahedron representing appeal verdict
    const hold = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.13, 1),
      M.wire(0xffb347, 0.5)
    );
    dial.add(hold);

    acts.push((t, _dt, e) => {
      rows.forEach((r) =>
        pulseMesh(
          r.tick,
          r.i === 3 ? 0.3 + 0.7 * Math.abs(Math.sin(t * 3)) : 0.9,
          e
        )
      );
      arc.rotation.z = -t * 0.8;
      hold.rotation.y = t * 0.7;
      hold.rotation.x = t * 0.4;
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
