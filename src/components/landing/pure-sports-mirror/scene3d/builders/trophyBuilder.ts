import * as THREE from 'three';
import { M, createBox, createParts4, pulseMesh } from '../sceneUtils';
import { CYAN, GOLD } from '../sceneConfig';
import { SceneModelHandle } from './venueBuilders';

/**
 * MSIC ELITE (MST-01) — International Masters & Verified Elite Dossier:
 * - Part 0: Cup core + 37 tracked athletes orbiting + 4-year Olympic cycle ring + sweep plane
 * - Part 1: Discipline banners (Individual, Combat, Team) with status bars & metrics
 * - Part 2: Biomechanical 240 fps MOCAP volume with 12-joint skeleton & world-rank benchmark bars
 * - Part 3: Verified protocol document chain (3 signed with gold seal, 1 pending) + gate
 */
export const buildTrophy = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const P = createParts4(g);
  const acts: ((t: number, dt: number, e: number) => void)[] = [];

  const createGoldMat = () =>
    new THREE.MeshStandardMaterial({
      color: GOLD,
      roughness: 0.14,
      metalness: 1,
      transparent: true,
    });

  // ─────────────────────────────────────────────────────────────────────────
  // 0 · SCALE — One verified cup, 37 athletes, 4-year Olympic cycle ring
  // ─────────────────────────────────────────────────────────────────────────
  {
    const gm = createGoldMat();
    const pts: THREE.Vector2[] = [];
    for (let i = 0; i <= 26; i++) {
      const u = i / 26;
      pts.push(
        new THREE.Vector2(
          0.1 + Math.sin(u * Math.PI * 0.86) * 0.44 * (1 - u * 0.3),
          u * 0.95
        )
      );
    }
    const cup = new THREE.Mesh(new THREE.LatheGeometry(pts, 60), gm);
    cup.position.y = 0.36;
    P[0].add(cup);

    // Lateral handles on cup
    [-1, 1].forEach((s) => {
      const h = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.035, 14, 40, Math.PI * 1.25), gm);
      h.position.set(s * 0.42, 0.78, 0);
      h.rotation.z = s * 1.9;
      h.rotation.y = Math.PI / 2;
      P[0].add(h);
    });

    // Stem, knob, and plinth
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, 0.34, 32), gm);
    stem.position.y = 0.2;
    P[0].add(stem);

    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.14, 24, 16), gm);
    knob.position.y = 0.34;
    P[0].add(knob);

    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.22, 44), gm);
    plinth.position.y = -0.03;
    P[0].add(plinth);

    // Dark pedestal column with glowing accent torus band
    const ped = new THREE.Mesh(
      new THREE.CylinderGeometry(0.76, 0.86, 1.14, 52),
      new THREE.MeshStandardMaterial({
        color: 0x10161d,
        roughness: 0.35,
        metalness: 0.6,
        transparent: true,
      })
    );
    ped.position.y = -0.72;
    P[0].add(ped);

    const band = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.02, 10, 90), M.glow(a, 0.8));
    band.rotation.x = Math.PI / 2;
    band.position.y = -0.34;
    P[0].add(band);

    // 37 MSIC athletes orbiting as tracked dossiers
    const ath: THREE.Mesh[] = [];
    for (let i = 0; i < 37; i++) {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.042, 12, 9),
        M.glow(i % 4 ? GOLD : 0xffffff, 0.85)
      );
      m.userData.orb = {
        th: (i / 37) * 6.28,
        r: 1.5 + (i % 3) * 0.3,
        y: -1.0 + (i % 5) * 0.13,
      };
      P[0].add(m);
      ath.push(m);
    }

    // Olympic cycle ring — three quarters already run (accent), final quarter (gold)
    const cyc = [0, 1, 2, 3].map((i) => {
      const m = new THREE.Mesh(
        new THREE.RingGeometry(2.46, 2.56, 76, 1, (i * Math.PI) / 2 + 0.05, Math.PI / 2 - 0.1),
        M.glow(i < 3 ? a : GOLD, i < 3 ? 0.32 : 0.7)
      );
      m.rotation.x = -Math.PI / 2;
      m.position.y = -1.32;
      P[0].add(m);
      return m;
    });

    const sweep = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 3.4), M.glow(0xfff6d8, 0.16));
    sweep.position.set(0, 0.3, 1.2);
    P[0].add(sweep);

    acts.push((t, _dt, e) => {
      ath.forEach((m, i) => {
        const o = m.userData.orb;
        const th = o.th + t * 0.16;
        m.position.set(Math.cos(th) * o.r, o.y + Math.sin(t * 1.3 + i) * 0.03, Math.sin(th) * o.r);
      });
      cyc.forEach((c, i) => pulseMesh(c, 0.45 + 0.55 * Math.abs(Math.sin(t * 0.5 + i * 1.1)), e));
      pulseMesh(band, 0.6 + 0.4 * Math.sin(t * 1.6), e);
      sweep.position.x = Math.sin(t * 0.8) * 1.6;
      sweep.rotation.z = Math.sin(t * 0.8) * 0.22;
      pulseMesh(sweep, 0.5 + 0.5 * Math.cos(t * 0.8), e);
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 1 · DISCIPLINES — Individual / Combat / Team standard table cards
  // ─────────────────────────────────────────────────────────────────────────
  {
    const G = new THREE.Group();
    G.position.set(-2.95, 0.25, 0);
    G.rotation.y = 0.55;
    P[1].add(G);

    G.add(new THREE.Mesh(new THREE.PlaneGeometry(2.1, 1.6), M.glow(CYAN, 0.05)));
    G.add(new THREE.Mesh(new THREE.PlaneGeometry(2.1, 1.6, 8, 6), M.wire(CYAN, 0.14)));

    const cards = [GOLD, a, CYAN].map((c, i) => {
      const C = new THREE.Group();
      C.position.set(0, 0.48 - i * 0.48, 0.05);
      G.add(C);

      C.add(createBox(1.86, 0.4, 0.02, M.std(0x141d26, 0.5, 0.35)));
      const bar = createBox(0.05, 0.34, 0.02, M.glow(c, 0.9), -0.86, 0, 0.02);
      C.add(bar);

      [0, 1, 2].forEach((k) =>
        C.add(
          createBox(
            0.4 - k * 0.09,
            0.03,
            0.02,
            M.glow(c, 0.42),
            -0.5 + k * 0.44,
            0.1,
            0.02
          )
        )
      );

      const dots = [0, 1, 2, 3].map((k) => {
        const d = new THREE.Mesh(new THREE.SphereGeometry(0.028, 10, 8), M.glow(c, 0.8));
        d.position.set(-0.6 + k * 0.28, -0.1, 0.03);
        C.add(d);
        return d;
      });

      return { bar, dots, i };
    });

    acts.push((t, _dt, e) => {
      cards.forEach((cd) => {
        pulseMesh(cd.bar, 0.4 + 0.6 * Math.abs(Math.sin(t * 1.3 + cd.i)), e);
        cd.dots.forEach((d, k) => d.scale.setScalar(1 + 0.3 * Math.sin(t * 2 + k + cd.i)));
      });
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 2 · TECHNOLOGY — 240 fps capture volume + 12-joint skeleton + benchmark
  // ─────────────────────────────────────────────────────────────────────────
  {
    const G = new THREE.Group();
    G.position.set(2.95, 0.15, 0);
    G.rotation.y = -0.55;
    P[2].add(G);

    G.add(new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 1.8, 5, 5, 5), M.wire(CYAN, 0.14)));

    // 6 optical sensor camera cones pointing towards capture center
    const rigs = [
      [-0.9, 0.9, -0.9],
      [0.9, 0.9, -0.9],
      [0.9, 0.9, 0.9],
      [-0.9, 0.9, 0.9],
      [-0.9, -0.9, 0],
      [0.9, -0.9, 0],
    ].map((p, i) => {
      const c = new THREE.Mesh(
        new THREE.ConeGeometry(0.07, 0.17, 12),
        M.glow(i % 2 ? a : CYAN, 0.9)
      );
      c.position.set(p[0], p[1], p[2]);
      c.lookAt(0, 0, 0);
      c.rotateX(Math.PI / 2);
      G.add(c);
      return c;
    });

    // 12 biomechanical joint landmarks (head, neck, shoulders, elbows, hands, hips, knees, feet)
    const JP = [
      [0, 0.62, 0],
      [0, 0.36, 0],
      [-0.24, 0.32, 0],
      [0.24, 0.32, 0],
      [-0.33, 0.02, 0],
      [0.33, 0.02, 0],
      [-0.12, 0, 0],
      [0.12, 0, 0],
      [-0.15, -0.38, 0],
      [0.15, -0.38, 0],
      [-0.16, -0.72, 0],
      [0.16, -0.72, 0],
    ];

    const PAIR = [
      [0, 1],
      [1, 2],
      [1, 3],
      [2, 4],
      [3, 5],
      [1, 6],
      [1, 7],
      [6, 8],
      [7, 9],
      [8, 10],
      [9, 11],
      [6, 7],
    ];

    const joints = JP.map((p) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.032, 10, 8), M.glow(0xffffff, 0.9));
      m.position.set(p[0], p[1], p[2]);
      G.add(m);
      return m;
    });

    const sg = new THREE.BufferGeometry();
    const sp = new Float32Array(PAIR.length * 6);
    sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
    G.add(new THREE.LineSegments(sg, M.line(a, 0.55)));

    const scan = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.8), M.glow(CYAN, 0.06));
    scan.rotation.x = -Math.PI / 2;
    G.add(scan);

    // 5 dynamic benchmark bars against world rank
    const bars = [0, 1, 2, 3, 4].map((i) => {
      const b = createBox(
        0.1,
        0.3,
        0.02,
        M.glow(i === 4 ? GOLD : CYAN, 0.75),
        -0.36 + i * 0.18,
        -1.2,
        0
      );
      G.add(b);
      return b;
    });

    acts.push((t, _dt, e) => {
      joints.forEach((m, i) => {
        const p = JP[i];
        m.position.set(
          p[0] + Math.sin(t * 1.7 + i) * 0.035,
          p[1] + Math.sin(t * 2.1 + i * 0.7) * 0.03,
          p[2] + Math.cos(t * 1.4 + i) * 0.03
        );
      });

      PAIR.forEach((pr, i) => {
        const A = joints[pr[0]].position;
        const B = joints[pr[1]].position;
        sp[i * 6] = A.x;
        sp[i * 6 + 1] = A.y;
        sp[i * 6 + 2] = A.z;
        sp[i * 6 + 3] = B.x;
        sp[i * 6 + 4] = B.y;
        sp[i * 6 + 5] = B.z;
      });
      sg.attributes.position.needsUpdate = true;

      scan.position.y = Math.sin(t * 0.8) * 0.82;
      rigs.forEach((c, i) =>
        pulseMesh(c, 0.35 + 0.65 * Math.abs(Math.sin(t * 2.6 + i * 0.8)), e)
      );

      bars.forEach((b, i) => {
        const h = 0.14 + 0.46 * (0.5 + 0.5 * Math.sin(t * 1.2 + i * 0.7));
        b.scale.y = h / 0.3;
        b.position.y = -1.34 + h / 2;
      });
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 3 · STANDARD — Verified protocol document chain (3 signed, 1 pending)
  // ─────────────────────────────────────────────────────────────────────────
  {
    const G = new THREE.Group();
    G.position.set(0, -0.62, 2.55);
    G.rotation.x = -0.5;
    P[3].add(G);

    G.add(new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.5), M.glow(CYAN, 0.045)));
    G.add(new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.5, 12, 5), M.wire(CYAN, 0.13)));

    const docs = [0, 1, 2, 3].map((i) => {
      const D = new THREE.Group();
      D.position.set(-1.2 + i * 0.8, 0.04, 0.05);
      G.add(D);

      D.add(createBox(0.62, 0.9, 0.02, M.std(0x16202a, 0.5, 0.3)));
      [0, 1, 2, 3].forEach((k) =>
        D.add(
          createBox(
            0.42 - k * 0.06,
            0.028,
            0.02,
            M.glow(CYAN, 0.34),
            0,
            0.26 - k * 0.12,
            0.02
          )
        )
      );

      const seal = new THREE.Mesh(
        new THREE.TorusGeometry(0.1, 0.018, 10, 28),
        i < 3
          ? new THREE.MeshStandardMaterial({
              color: GOLD,
              roughness: 0.2,
              metalness: 1,
              transparent: true,
            })
          : M.glow(0xffb347, 0.9)
      );
      seal.position.set(0, -0.26, 0.04);
      D.add(seal);
      return { seal, i, done: i < 3 };
    });

    const lg = new THREE.BufferGeometry();
    const lp = new Float32Array(3 * 6);
    for (let i = 0; i < 3; i++) {
      lp[i * 6] = -1.2 + i * 0.8;
      lp[i * 6 + 1] = 0.04;
      lp[i * 6 + 2] = 0.07;
      lp[i * 6 + 3] = -1.2 + (i + 1) * 0.8;
      lp[i * 6 + 4] = 0.04;
      lp[i * 6 + 5] = 0.07;
    }
    lg.setAttribute('position', new THREE.BufferAttribute(lp, 3));
    G.add(new THREE.LineSegments(lg, M.line(a, 0.45)));

    const gate = new THREE.Mesh(
      new THREE.TorusGeometry(0.34, 0.02, 10, 44, Math.PI),
      M.glow(a, 0.65)
    );
    gate.position.set(1.52, -0.14, 0.06);
    G.add(gate);

    acts.push((t, _dt, e) => {
      docs.forEach((d) => {
        pulseMesh(d.seal, d.done ? 0.9 : 0.25 + 0.75 * Math.abs(Math.sin(t * 3)), e);
        d.seal.rotation.z = t * (0.4 + d.i * 0.08);
      });
      pulseMesh(gate, 0.5 + 0.5 * Math.sin(t * 1.5), e);
    });
  }

  return {
    group: g,
    parts: P,
    update(t, dt) {
      acts.forEach((f) => f(t, dt, 1));
    },
  };
};
