import * as THREE from 'three';
import { M, createBox, createFigure, createParts4 } from '../sceneUtils';
import { CYAN } from '../sceneConfig';
import { SceneModelHandle } from './venueBuilders';

const setMeshOpacity = (mesh: THREE.Mesh, opacity: number) => {
  const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
  if (mat && 'opacity' in mat) {
    (mat as THREE.Material & { opacity: number }).opacity = opacity;
  }
};

const getMeshO0 = (mesh: THREE.Mesh, fallback: number): number => {
  const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
  return (mat?.userData?.o0 as number) ?? fallback;
};

export const buildMed = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const acts: ((t: number, dt: number) => void)[] = [];
  const P = createParts4(g);

  // =========================================================================
  // 0 · SCALE — treatment bay with 3 recovery beds, medical cross & patient
  // =========================================================================
  {
    const frame = M.std(0x1a232d, 0.5, 0.4);
    const pad = M.paint(0x0d222c, 0.95);
    const mons = [-1.9, 0, 1.9].map((x, i) => {
      const T = new THREE.Group();
      T.position.set(x, 0, 0);
      P[0].add(T);
      T.add(createBox(1.5, 0.08, 0.66, pad, 0, -0.78, 0));
      T.add(createBox(1.4, 0.05, 0.6, M.glow(CYAN, 0.22), 0, -0.73, 0));
      [-0.6, 0.6].forEach((o) => T.add(createBox(0.09, 0.44, 0.09, frame, o, -1.04, 0)));
      const mon = createBox(0.44, 0.3, 0.03, M.glow(i === 1 ? a : CYAN, 0.55), 0, -0.36, -0.42);
      T.add(mon);
      return mon;
    });

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 3.0, 16, 8), M.wire(CYAN, 0.12));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.3;
    P[0].add(floor);

    // Floating 3D Medical Cross above central treatment bay
    const cr = new THREE.Group();
    cr.position.set(0, 0.16, -0.44);
    P[0].add(cr);
    cr.add(createBox(0.34, 0.11, 0.03, M.glow(0xff5a5a, 0.95)));
    cr.add(createBox(0.11, 0.34, 0.03, M.glow(0xff5a5a, 0.95)));

    // Patient on the center bed
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.62, 6, 12), M.std(0x2a3a48, 0.6, 0.2));
    body.rotation.z = Math.PI / 2;
    body.position.set(0.08, -0.62, 0.02);
    P[0].add(body);

    const hd = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 10), M.glow(0xffffff, 0.9));
    hd.position.set(-0.5, -0.6, 0.02);
    P[0].add(hd);

    P[0].add(createBox(0.7, 0.03, 0.5, M.paint(0x1c5566, 0.9), 0.22, -0.56, 0.02));

    // Metallic IV drip stand & saline infusion pack
    const st = M.std(0x8a98a6, 0.4, 0.7);
    P[0].add(createBox(0.03, 1.4, 0.03, st, -0.95, -0.6, -0.3));
    P[0].add(createBox(0.22, 0.02, 0.02, st, -0.95, 0.1, -0.3));
    const bag = createBox(0.12, 0.18, 0.05, M.glow(CYAN, 0.7), -0.9, -0.02, -0.3);
    P[0].add(bag);

    acts.push((t) => {
      mons.forEach((m, i) => {
        const o0 = getMeshO0(m, 0.55);
        setMeshOpacity(m, o0 * (0.5 + 0.5 * Math.abs(Math.sin(t * 1.5 + i * 1.1))));
      });
      cr.scale.setScalar(1 + 0.05 * Math.sin(t * 2));
      body.scale.set(1, 1 + 0.05 * Math.sin(t * 1.3), 1);
      const bagO0 = getMeshO0(bag, 0.7);
      setMeshOpacity(bag, bagO0 * (0.6 + 0.4 * Math.sin(t * 2.6)));
    });
  }

  // =========================================================================
  // 1 · DISCIPLINES — joint / tendon scan, spine & kinetic wireframe silhouette
  // =========================================================================
  {
    const G = new THREE.Group();
    G.position.set(0, 0.2, 0);
    P[1].add(G);

    // Spine column - 10 glowing vertebrae nodes
    const bone = M.glow(CYAN, 0.8);
    const spine: THREE.Mesh[] = [];
    for (let i = 0; i < 10; i++) {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.055 - i * 0.001, 12, 8), bone);
      s.position.set(0, -0.5 + i * 0.11, 0);
      G.add(s);
      spine.push(s);
    }

    // Articulated joint monitoring rings (shoulders & knees)
    const joints = [
      [-0.34, 0.44],
      [0.34, 0.44],
      [-0.2, -0.52],
      [0.2, -0.52],
    ].map(([x, y], i) => {
      const r = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.012, 10, 32), M.glow(i < 2 ? a : 0xffb347, 0.85));
      r.position.set(x, y, 0);
      G.add(r);
      return r;
    });

    // Anatomical skeletal line segments
    const lg = new THREE.BufferGeometry();
    lg.setAttribute(
      'position',
      new THREE.BufferAttribute(
        new Float32Array([
          -0.34, 0.44, 0, -0.56, 0.06, 0, 0.34, 0.44, 0, 0.56, 0.06, 0, -0.2, -0.52, 0, -0.26, -1.06, 0, 0.2, -0.52,
          0, 0.26, -1.06, 0, -0.34, 0.44, 0, 0.34, 0.44, 0,
        ]),
        3
      )
    );
    G.add(new THREE.LineSegments(lg, M.line(CYAN, 0.5)));

    // Dynamic laser diagnostic sweep ring
    const scan = new THREE.Mesh(new THREE.RingGeometry(0.34, 0.44, 40), M.glow(a, 0.4));
    scan.rotation.x = -Math.PI / 2;
    G.add(scan);

    // Wireframe head on the scanned body — clearly recognized person
    const hd = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 10), M.wire(CYAN, 0.55));
    hd.position.set(0, 0.92, 0);
    P[1].add(hd);

    acts.push((t) => {
      const u = (t * 0.5) % 1;
      scan.position.y = -0.6 + u * 1.7;
      const scanO0 = getMeshO0(scan, 0.4);
      setMeshOpacity(scan, scanO0 * (0.35 + 0.65 * Math.sin(u * Math.PI)));
      joints.forEach((r, i) => {
        r.scale.setScalar(1 + 0.16 * Math.sin(t * 2.2 + i));
        r.rotation.z = t * 0.4;
      });
      spine.forEach((s, i) => {
        s.position.x = Math.sin(t * 0.8 + i * 0.4) * 0.012;
      });
      hd.rotation.y = t * 0.5;
    });
  }

  // =========================================================================
  // 2 · TECHNOLOGY — holographic biometric wall, realtime ECG wave & telemetry
  // =========================================================================
  {
    const G = new THREE.Group();
    G.position.set(2.7, 0.45, 0);
    G.rotation.y = -0.45;
    P[2].add(G);

    // Holographic telemetry backing panel & grid
    G.add(new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.3), M.glow(CYAN, 0.05)));
    G.add(new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.3, 8, 6), M.wire(CYAN, 0.14)));

    // Continuous dynamic ECG cardiac waveform (120 samples)
    const n = 120;
    const ep = new Float32Array(n * 3);
    const eg = new THREE.BufferGeometry();
    for (let i = 0; i < n; i++) {
      ep[i * 3] = -0.82 + (i / n) * 1.64;
      ep[i * 3 + 1] = 0.3;
      ep[i * 3 + 2] = 0.04;
    }
    eg.setAttribute('position', new THREE.BufferAttribute(ep, 3));
    G.add(new THREE.Line(eg, M.line(a, 0.9)));

    // HRV circle gauge ring
    const hrv = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.2, 40, 1, 0, Math.PI * 1.4), M.glow(a, 0.8));
    hrv.position.set(-0.52, -0.3, 0.04);
    G.add(hrv);

    // 3D Heart model inside the HRV ring (two spheres + inverted cone)
    const ht = new THREE.Group();
    ht.position.set(-0.52, -0.3, 0.05);
    G.add(ht);
    const hm = M.paint(0xff5a5a, 0.95);
    [-0.038, 0.038].forEach((x) => {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.05, 14, 10), hm);
      s.position.set(x, 0.02, 0);
      ht.add(s);
    });
    const cn = new THREE.Mesh(new THREE.ConeGeometry(0.083, 0.11, 16), hm);
    cn.rotation.z = Math.PI;
    cn.position.y = -0.045;
    ht.add(cn);

    // Sleep telemetry crescent moon
    const moon = new THREE.Mesh(new THREE.RingGeometry(0.06, 0.1, 28, 1, 0.9, 3.6), M.paint(0xeaf4ff, 0.9));
    moon.position.set(0.3, 0.02, 0.05);
    G.add(moon);

    // 4 vertical telemetry health bars
    const bars = [0, 1, 2, 3].map((i) => {
      const b = createBox(0.1, 0.3, 0.02, M.glow(CYAN, 0.7), 0.05 + i * 0.17, -0.34, 0.04);
      G.add(b);
      return b;
    });

    acts.push((t) => {
      for (let i = 0; i < n; i++) {
        const u = ((i / n) * 4 - t * 0.8) % 1;
        const s = u < 0 ? u + 1 : u;
        ep[i * 3 + 1] =
          0.3 + Math.exp(-Math.pow((s - 0.5) * 18, 2)) * 0.34 - Math.exp(-Math.pow((s - 0.43) * 34, 2)) * 0.1;
      }
      eg.attributes.position.needsUpdate = true;
      hrv.rotation.z = -t * 0.7;
      bars.forEach((b, i) => {
        const h = 0.12 + 0.34 * (0.5 + 0.5 * Math.sin(t * 1.6 + i));
        b.scale.y = h / 0.3;
        b.position.y = -0.48 + h / 2;
      });
      const u = (t * 0.8) % 1;
      ht.scale.setScalar(1 + 0.22 * Math.exp(-Math.pow((u - 0.1) * 12, 2)));
    });
  }

  // =========================================================================
  // 3 · STANDARDS — Return-to-Play 4-stage archways, athlete walking & vault
  // =========================================================================
  {
    const G = new THREE.Group();
    G.position.set(-2.8, 0, 0);
    P[3].add(G);

    // 4 Sequential RTP Gateway Arches (3 cleared + 1 awaiting doctor clearance)
    const gates = [0, 1, 2, 3].map((i) => {
      const z = -1.2 + i * 0.8;
      const pass = i < 3;
      const col = pass ? a : 0xffb347;
      const arch = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.026, 10, 40, Math.PI), M.glow(col, 0.75));
      arch.position.set(0, -0.95, z);
      arch.rotation.y = Math.PI / 2;
      G.add(arch);
      [-0.42, 0.42].forEach((o) =>
        G.add(createBox(0.07, 0.36, 0.07, M.std(0x1b242e, 0.5, 0.5), 0, -1.13, z + o))
      );
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 8), M.glow(col, 0.95));
      lamp.position.set(0, -0.5, z);
      G.add(lamp);
      return { lamp, pass };
    });

    // Medical compliance data vault cube with glowing lock ring
    G.add(createBox(0.5, 0.5, 0.5, M.std(0x16202a, 0.4, 0.6), 0, -0.2, 1.5));
    const lock = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.02, 10, 28, Math.PI), M.glow(a, 0.8));
    lock.position.set(0, 0.03, 1.5);
    G.add(lock);

    // Running lane demarcations
    const L = M.line(0xffffff, 0.35);
    [-0.34, 0.34].forEach((x) =>
      G.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(x, -1.29, -1.9),
            new THREE.Vector3(x, -1.29, 1.9),
          ]),
          L
        )
      )
    );

    // Crutches at the beginning of the recovery lane
    const cm = M.std(0x8a98a6, 0.4, 0.7);
    [-0.16, 0.16].forEach((x, i) => {
      const c = createBox(0.03, 0.62, 0.03, cm, x, -1.0, -1.8);
      c.rotation.x = 0.25;
      c.rotation.z = i ? -0.08 : 0.08;
      G.add(c);
    });

    // Soccer/sports ball at the end of the return-to-play lane
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 12), M.paint(0xffffff, 0.95));
    ball.position.set(0.1, -1.21, 1.72);
    G.add(ball);

    // Athlete figure walking through the rehabilitation gates
    const w = createFigure(M.std(0x1e2a35, 0.6, 0.25), M.glow(0xffffff, 0.95), 0.58);
    G.add(w);

    acts.push((t) => {
      gates.forEach((gt) => {
        const lampO0 = getMeshO0(gt.lamp, 0.95);
        setMeshOpacity(gt.lamp, lampO0 * (gt.pass ? 0.9 : 0.3 + 0.7 * Math.abs(Math.sin(t * 3))));
      });
      lock.rotation.z = Math.sin(t * 0.9) * 0.2;
      const u = (t * 0.22) % 1;
      w.position.set(0, -1.3 + Math.abs(Math.sin(t * 5)) * 0.02, -1.6 + Math.min(u * 1.25, 1) * 2.3);
      ball.rotation.x = t;
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
