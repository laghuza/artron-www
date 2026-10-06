import * as THREE from 'three';
import { M, createBox, createLoop4, createFigure, createParts4 } from '../sceneUtils';
import { CYAN, GOLD } from '../sceneConfig';
import { SceneModelHandle } from './venueBuilders';

const setMeshOpacity = (mesh: THREE.Mesh | THREE.LineLoop, opacity: number) => {
  const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
  if (mat && 'opacity' in mat) {
    (mat as THREE.Material & { opacity: number }).opacity = opacity;
  }
};

const getMeshO0 = (mesh: THREE.Mesh | THREE.LineLoop, fallback: number): number => {
  const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
  return (mat?.userData?.o0 as number) ?? fallback;
};

export const buildGroup = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const acts: ((t: number, dt: number) => void)[] = [];
  const P = createParts4(g);

  // =========================================================================
  // 0 · SCALE — 24 studio mats, instructor podium, mirror wall & participants
  // =========================================================================
  {
    // Studio raised floor platform
    P[0].add(createBox(6.2, 0.12, 4.2, M.std(0x0b1218, 0.75, 0.12), 0, -1.32, 0));

    const matM = M.paint(0x102730, 0.95);
    const cells: { ring: THREE.Mesh; k: number }[] = [];
    const ppl: { f: THREE.Group; k: number }[] = [];
    const pBody = M.std(0x2a3a48, 0.6, 0.2);
    const pHead = M.glow(0xffffff, 0.8);

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 6; c++) {
        const x = -2.5 + c;
        const z = -1.05 + r * 0.9;
        const k = r * 6 + c;
        const isWaitlist = k % 7 === 0;

        P[0].add(createBox(0.8, 0.03, 0.62, matM, x, -1.24, z));

        const ring = new THREE.Mesh(
          new THREE.RingGeometry(0.2, 0.23, 26),
          M.glow(isWaitlist ? 0xffb347 : a, 0.6)
        );
        ring.rotation.x = -Math.PI / 2;
        ring.position.set(x, -1.21, z);
        P[0].add(ring);
        cells.push({ ring, k });

        // Participant figures on mats (empty slots represent dynamic waitlist spots)
        if (!isWaitlist) {
          const f = createFigure(pBody, pHead, 0.55);
          f.position.set(x, -1.22, z);
          P[0].add(f);
          ppl.push({ f, k });
        }
      }
    }

    // Instructor podium & animated leading instructor figure
    P[0].add(createBox(1.1, 0.22, 0.8, M.std(0x18222c, 0.5, 0.4), 0, -1.15, -1.75));
    const inst = createFigure(M.std(0x1e2a35, 0.6, 0.25), M.glow(0xffffff, 0.95), 1.0);
    inst.position.set(0, -1.04, -1.75);
    P[0].add(inst);

    // Front studio mirror wall
    P[0].add(createBox(6.0, 1.15, 0.03, M.std(0x9fb4c4, 0.08, 1, 0.3), 0, -0.7, -2.12));

    // Studio stereo speakers with glowing acoustic rings
    [-2.9, 2.9].forEach((x) => {
      P[0].add(createBox(0.3, 0.5, 0.25, M.std(0x131c25, 0.5, 0.4), x, -1.05, -1.95));
      const cone = new THREE.Mesh(new THREE.RingGeometry(0.04, 0.1, 20), M.glow(a, 0.6));
      cone.position.set(x, -1.0, -1.82);
      P[0].add(cone);
    });

    acts.push((t) => {
      cells.forEach((c) => {
        const o0 = getMeshO0(c.ring, 0.6);
        setMeshOpacity(c.ring, o0 * (0.3 + 0.7 * Math.abs(Math.sin(t * 1.2 + c.k * 0.4))));
      });
      inst.position.y = -1.04 + Math.abs(Math.sin(t * 2.2)) * 0.05;
      ppl.forEach((p) => {
        p.f.position.y = -1.22 + Math.abs(Math.sin(t * 2.2 - 0.3)) * 0.045;
        p.f.rotation.y = Math.sin(t * 1.1 + p.k) * 0.12;
      });
    });
  }

  // =========================================================================
  // 1 · DISCIPLINES — Spin bikes with riders, Yoga circle & TRX rig
  // =========================================================================
  {
    const fr = M.std(0x1b242e, 0.5, 0.5);
    const wheels: THREE.Mesh[] = [];
    const rd: THREE.Group[] = [];
    const rBody = M.std(0x2a3a48, 0.6, 0.2);
    const rHead = M.glow(0xffffff, 0.8);

    // 5 Spin cycle bikes & 3 active riders
    for (let i = 0; i < 5; i++) {
      const x = -1.6 + i * 0.8;
      const z = 2.6;
      P[1].add(createBox(0.16, 0.5, 0.9, fr, x, -1.05, z));
      P[1].add(createBox(0.34, 0.07, 0.14, M.std(0x232d38, 0.5, 0.4), x, -0.76, z - 0.22));

      const w = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.022, 8, 28), M.glow(a, 0.7));
      w.position.set(x, -1.06, z + 0.28);
      w.rotation.y = Math.PI / 2;
      P[1].add(w);
      wheels.push(w);
    }

    [0, 2, 4].forEach((i) => {
      const f = createFigure(rBody, rHead, 0.6);
      f.position.set(-1.6 + i * 0.8, -0.95, 2.52);
      f.rotation.x = 0.3;
      P[1].add(f);
      rd.push(f);
    });

    // Yoga / Mind & Body circle zone
    const yg = new THREE.Group();
    yg.position.set(-3.4, 0, 0);
    P[1].add(yg);

    const ym = M.paint(0x123038, 0.9);
    for (let i = 0; i < 4; i++) {
      const th = (i / 4) * Math.PI * 2;
      yg.add(createBox(0.62, 0.03, 0.4, ym, Math.cos(th) * 0.6, -1.26, Math.sin(th) * 0.6));
    }
    const om = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.012, 8, 50), M.glow(CYAN, 0.6));
    om.rotation.x = Math.PI / 2;
    om.position.y = -0.9;
    yg.add(om);

    // Functional TRX suspension rack with straps & kettlebells
    const tx = new THREE.Group();
    tx.position.set(3.4, 0, 0);
    P[1].add(tx);

    [-0.7, 0.7].forEach((o) => tx.add(createBox(0.09, 1.7, 0.09, fr, 0, -0.5, o)));
    tx.add(createBox(0.09, 0.09, 1.5, fr, 0, 0.3, 0));

    const straps = [-0.42, 0, 0.42].map((o) => {
      const s = createBox(0.03, 0.7, 0.03, M.glow(a, 0.6), 0, -0.1, o);
      tx.add(s);
      return s;
    });

    [-0.45, 0.45].forEach((z) => {
      const kb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 10), M.std(0x1a232d, 0.5, 0.6));
      kb.position.set(2.9, -1.2, z);
      P[1].add(kb);
      const hd = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.016, 8, 20, Math.PI), M.glow(a, 0.8));
      hd.position.set(2.9, -1.12, z);
      P[1].add(hd);
    });

    acts.push((t) => {
      wheels.forEach((w, i) => {
        w.rotation.x = t * (2 + i * 0.3);
      });
      rd.forEach((f, i) => {
        f.position.y = -0.95 + Math.sin(t * 6 + i) * 0.015;
      });
      om.rotation.z = t * 0.4;
      om.scale.setScalar(1 + 0.06 * Math.sin(t * 1.3));
      straps.forEach((s, i) => {
        s.rotation.z = Math.sin(t * 1.6 + i) * 0.12;
      });
    });
  }

  // =========================================================================
  // 2 · TECHNOLOGY — Live HR Equalizer Board & NFC Reader
  // =========================================================================
  {
    const G = new THREE.Group();
    G.position.set(0, 1.15, -2.2);
    P[2].add(G);

    // Floating Holographic Backplane & Wireframe Grid
    G.add(new THREE.Mesh(new THREE.PlaneGeometry(3.0, 1.1), M.glow(CYAN, 0.05)));
    G.add(new THREE.Mesh(new THREE.PlaneGeometry(3.0, 1.1, 12, 4), M.wire(CYAN, 0.14)));

    // 14 Animated Equalizer bars representing group member heart rate zones
    const zn = [0xff5a5a, 0xffb347, 0x7fe8b8, 0x00f0ff];
    const bars: THREE.Mesh[] = [];
    for (let i = 0; i < 14; i++) {
      const b = createBox(0.14, 0.5, 0.02, M.glow(zn[i % 4], 0.8), -1.4 + i * 0.21, -0.2, 0.03);
      G.add(b);
      bars.push(b);
    }

    // NFC Check-in pedestal with expanding radar wave rings & tapping card
    const nfc = new THREE.Group();
    nfc.position.set(2.5, -1.0, 2.2);
    P[2].add(nfc);

    nfc.add(createBox(0.3, 0.6, 0.3, M.std(0x1b242e, 0.5, 0.5), 0, -0.3, 0));
    nfc.add(createBox(0.26, 0.04, 0.26, M.glow(a, 0.9), 0, 0.02, 0));

    const waves = [0, 1, 2].map(() => {
      const r = new THREE.Mesh(new THREE.RingGeometry(0.14, 0.17, 32), M.glow(a, 0.5));
      r.rotation.x = -Math.PI / 2;
      r.position.y = 0.06;
      nfc.add(r);
      return r;
    });

    const card = createBox(0.2, 0.015, 0.13, M.paint(0xeaf4ff, 0.95), 2.5, -0.8, 2.2);
    P[2].add(card);

    acts.push((t) => {
      bars.forEach((b, i) => {
        const h = 0.12 + 0.62 * (0.5 + 0.5 * Math.sin(t * 1.5 + i * 0.55));
        b.scale.y = h / 0.5;
        b.position.y = -0.48 + h / 2;
      });

      waves.forEach((r, i) => {
        const k = (t * 0.7 + i / 3) % 1;
        r.scale.setScalar(0.6 + k * 2.2);
        const o0 = getMeshO0(r, 0.5);
        setMeshOpacity(r, o0 * (1 - k));
      });

      card.position.y = -0.94 + 0.2 * (0.5 + 0.5 * Math.cos(t * 1.4));
    });
  }

  // =========================================================================
  // 3 · STANDARDS — EREPS Certificate with Gold Seal, Ribbons & Spacing Box
  // =========================================================================
  {
    const G = new THREE.Group();
    G.position.set(-2.6, 0.6, -2.0);
    G.rotation.y = 0.6;
    P[3].add(G);

    G.add(new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.1), M.glow(CYAN, 0.05)));
    G.add(new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.1, 6, 4), M.wire(CYAN, 0.16)));

    // Metallic Gold Certification Seal with dual ribbon tails
    const seal = new THREE.Mesh(
      new THREE.TorusGeometry(0.18, 0.022, 10, 32),
      new THREE.MeshStandardMaterial({
        color: GOLD,
        roughness: 0.2,
        metalness: 1,
        transparent: true,
      })
    );
    seal.position.set(-0.45, -0.22, 0.04);
    G.add(seal);

    [-1, 1].forEach((sd) => {
      const r = createBox(0.06, 0.2, 0.01, M.paint(GOLD, 0.95), -0.45 + sd * 0.05, -0.44, 0.03);
      r.rotation.z = sd * 0.25;
      G.add(r);
    });

    [0, 1, 2].forEach((i) => {
      G.add(createBox(0.8 - i * 0.16, 0.045, 0.02, M.glow(a, 0.55), 0.1, 0.3 - i * 0.18, 0.04));
    });

    // Floor space compliance wireframe
    const sp = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 4.2, 12, 8), M.wire(a, 0.2));
    sp.rotation.x = -Math.PI / 2;
    sp.position.y = -1.2;
    P[3].add(sp);

    // One participant's personal 4 m² bounding square
    const sq = createLoop4(0.96, 0.86, -1.19, M.line(a, 0.9));
    sq.position.set(-0.5, 0, -0.15);
    P[3].add(sq);

    acts.push((t) => {
      seal.rotation.z = t * 0.6;
      const spO0 = getMeshO0(sp, 0.2);
      setMeshOpacity(sp, spO0 * (0.5 + 0.5 * Math.sin(t * 0.9)));
      const sqO0 = getMeshO0(sq, 0.9);
      setMeshOpacity(sq, sqO0 * (0.4 + 0.6 * Math.abs(Math.sin(t * 1.4))));
    });
  }

  return {
    group: g,
    parts: P,
    update(t, dt) {
      acts.forEach((f) => f(t, dt));
    },
  };
};
