import * as THREE from 'three';
import { M, createBox, createFigure, createParts4 } from '../sceneUtils';
import { CYAN } from '../sceneConfig';
import { SceneModelHandle } from './venueBuilders';

const setMeshOpacity = (mesh: THREE.Mesh | THREE.Points | THREE.Line, opacity: number) => {
  const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
  if (mat && 'opacity' in mat) {
    (mat as THREE.Material & { opacity: number }).opacity = opacity;
  }
};

const getMeshO0 = (mesh: THREE.Mesh | THREE.Points | THREE.Line, fallback: number): number => {
  const mat = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
  return (mat?.userData?.o0 as number) ?? fallback;
};

/**
 * WATER SAFETY — guarded basins, scan cones, response mesh, drill beacon
 * Exactly replicates Claude Design Sport-OS System Mirror HC-05
 */
export const buildGuard = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const acts: ((t: number, dt: number) => void)[] = [];
  const P = createParts4(g);
  const TP: [number, number][] = [
    [-2.9, -2.1],
    [2.9, -2.1],
    [2.9, 2.1],
    [-2.9, 2.1],
  ];

  // =========================================================================
  // 0 · SCALE — Basins + 4 Guard Towers + Animated Wave Water
  // =========================================================================
  {
    // Platform base
    P[0].add(createBox(7.2, 0.16, 5.4, M.std(0x0e1620, 0.8, 0.1), 0, -1.34, 0));

    // Dynamic wave pool plane
    const wg = new THREE.PlaneGeometry(6.4, 4.6, 56, 40);
    const water = new THREE.Mesh(
      wg,
      new THREE.MeshPhysicalMaterial({
        color: 0x0a6f9e,
        roughness: 0.07,
        metalness: 0.25,
        transparent: true,
        opacity: 0.78,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        side: THREE.DoubleSide,
      })
    );
    water.rotation.x = -Math.PI / 2;
    water.position.y = -1.1;
    P[0].add(water);

    const wb = new Float32Array(wg.attributes.position.array);

    // Kerbs / stone pool borders
    const kerb = M.std(0x18222c, 0.6, 0.2);
    [-1.62, 1.62].forEach((x) => P[0].add(createBox(0.16, 0.3, 4.8, kerb, x, -1.12, 0)));
    P[0].add(createBox(6.6, 0.3, 0.16, kerb, 0, -1.12, 0));

    // 4 Lifeguard observation towers with scanning personnel
    const towers = TP.map(([x, z], i) => {
      const T = new THREE.Group();
      T.position.set(x, -1.26, z);
      P[0].add(T);

      const leg = M.std(0x1d2731, 0.5, 0.5);
      [
        [-0.18, -0.18],
        [0.18, -0.18],
        [0.18, 0.18],
        [-0.18, 0.18],
      ].forEach(([ox, oz]) => T.add(createBox(0.06, 0.9, 0.06, leg, ox, 0.45, oz)));

      T.add(createBox(0.56, 0.05, 0.56, M.std(0x232d38, 0.5, 0.4), 0, 0.92, 0));
      const seat = createFigure(M.std(0xff6b4a, 0.6, 0.15), M.glow(0xffffff, 0.95), 0.8);
      seat.position.set(0, 0.94, 0);
      T.add(seat);
      return { seat, i };
    });

    acts.push((t) => {
      const p = wg.attributes.position.array as Float32Array;
      for (let i = 0; i < p.length; i += 3) {
        p[i + 2] =
          Math.sin(wb[i] * 1.6 + t * 1.3) * 0.035 +
          Math.sin(wb[i + 1] * 2.1 - t * 0.9) * 0.025;
      }
      wg.attributes.position.needsUpdate = true;
      towers.forEach((tw) => {
        tw.seat.rotation.y = Math.sin(t * 0.5 + tw.i) * 0.8;
      });
    });
  }

  // =========================================================================
  // 1 · DISCIPLINES — Scan Cones + Floating Rescue Buoy + First-aid Kit + Pulsing Zones
  // =========================================================================
  {
    // Translucent vision scan cones projecting from guard towers down onto water
    const cones = TP.map(([x, z], i) => {
      const c = new THREE.Mesh(
        new THREE.ConeGeometry(0.85, 2.4, 26, 1, true),
        M.glow(i % 2 ? CYAN : a, 0.075)
      );
      c.position.set(x * 0.72, -0.55, z * 0.72);
      c.rotation.x = Math.PI;
      P[1].add(c);
      return { c, i };
    });

    // Orange rescue life-ring floating on water
    const mk = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.05, 10, 30),
      M.paint(0xff6b4a, 0.95)
    );
    mk.rotation.x = -Math.PI / 2;
    mk.position.set(1.0, -1.05, 0.9);
    P[1].add(mk);

    // Red first-aid medical kit box with glowing white cross
    P[1].add(createBox(0.4, 0.24, 0.3, M.paint(0xff6b4a, 0.9), -2.2, -1.1, 2.5));
    P[1].add(createBox(0.16, 0.04, 0.02, M.glow(0xffffff, 0.95), -2.2, -1.0, 2.36));

    // Pulsing rescue water ripple rings
    const zones = [
      [-2.4, -1.2],
      [0, 1.4],
      [2.4, -1.0],
    ].map(([x, z]) => {
      const r = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.56, 40), M.glow(a, 0.4));
      r.rotation.x = -Math.PI / 2;
      r.position.set(x, -1.06, z);
      P[1].add(r);
      return r;
    });

    acts.push((t) => {
      cones.forEach((cn) => {
        cn.c.rotation.z = Math.sin(t * 0.6 + cn.i * 1.6) * 0.5;
        const o0 = getMeshO0(cn.c, 0.075);
        setMeshOpacity(cn.c, o0 * (0.5 + 0.5 * Math.sin(t * 1.2 + cn.i)));
      });
      mk.position.y = -1.05 + Math.sin(t * 1.6) * 0.03;
      zones.forEach((r, i) => {
        const k = (t * 0.5 + i / 3) % 1;
        r.scale.setScalar(0.7 + k * 0.8);
        const o0 = getMeshO0(r, 0.4);
        setMeshOpacity(r, o0 * (1 - k) * 0.9);
      });
    });
  }

  // =========================================================================
  // 2 · TECHNOLOGY — Response Timer Radar, Underwater Grid & Perimeter Panic Mesh
  // =========================================================================
  {
    // Underwater sensor detection grid
    const grid = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 4.6, 26, 18), M.wire(CYAN, 0.18));
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -1.22;
    P[2].add(grid);

    // Floating central response timer hologram
    const G = new THREE.Group();
    G.position.set(0, 0.85, 0);
    P[2].add(G);

    const dial = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.016, 8, 90), M.glow(a, 0.7));
    dial.rotation.x = Math.PI / 2;
    G.add(dial);

    const sweep = new THREE.Mesh(
      new THREE.RingGeometry(0.58, 0.64, 64, 1, 0, Math.PI * 0.45),
      M.glow(a, 0.65)
    );
    sweep.rotation.x = -Math.PI / 2;
    G.add(sweep);

    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.2, 1), M.wire(CYAN, 0.45));
    G.add(core);

    // Perimeter panic button posts with laser mesh interconnects
    const pts: [number, number][] = [
      [-2.6, 2.5],
      [0, 2.6],
      [2.6, 2.5],
      [2.6, -2.5],
      [-2.6, -2.5],
    ];
    const btns: { b: THREE.Mesh; i: number }[] = [];
    const stem = M.std(0x1d2731, 0.5, 0.5);

    pts.forEach(([x, z], i) => {
      const b = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 0.06, 20),
        M.glow(0xff6b4a, 0.9)
      );
      b.position.set(x, -1.06, z);
      P[2].add(b);
      btns.push({ b, i });
      P[2].add(createBox(0.05, 0.4, 0.05, stem, x, -1.3, z));
    });

    const mg = new THREE.BufferGeometry();
    const mp = new Float32Array(5 * 6);
    for (let i = 0; i < 5; i++) {
      const A = pts[i];
      const B = pts[(i + 1) % 5];
      mp[i * 6] = A[0];
      mp[i * 6 + 1] = -1.06;
      mp[i * 6 + 2] = A[1];
      mp[i * 6 + 3] = B[0];
      mp[i * 6 + 4] = -1.06;
      mp[i * 6 + 5] = B[1];
    }
    mg.setAttribute('position', new THREE.BufferAttribute(mp, 3));
    P[2].add(new THREE.LineSegments(mg, M.line(0xff6b4a, 0.25)));

    acts.push((t) => {
      sweep.rotation.z = -t * 1.4;
      core.rotation.y = t * 0.6;
      core.rotation.x = t * 0.3;
      const gO0 = getMeshO0(grid, 0.18);
      setMeshOpacity(grid, gO0 * (0.55 + 0.45 * Math.sin(t * 1.1)));
      btns.forEach((bt) => {
        const bO0 = getMeshO0(bt.b, 0.9);
        setMeshOpacity(
          bt.b,
          bO0 * (0.35 + 0.65 * Math.abs(Math.sin(t * 2.4 + bt.i * 0.9)))
        );
      });
    });
  }

  // =========================================================================
  // 3 · STANDARDS — Re-certification Dial + Rotating Drill Beacon
  // =========================================================================
  {
    const G = new THREE.Group();
    G.position.set(-3.5, -1.3, 0);
    P[3].add(G);

    // Beacon tower post
    G.add(createBox(0.1, 1.9, 0.1, M.std(0x1d2731, 0.5, 0.5), 0, 0.95, 0));

    // Pulsing orange beacon dome
    const bea = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.14, 0.16, 20),
      M.glow(0xff6b4a, 0.9)
    );
    bea.position.y = 2.0;
    G.add(bea);

    // Rotating beacon light fan cone
    const fan = new THREE.Mesh(
      new THREE.ConeGeometry(0.5, 1.1, 22, 1, true),
      M.glow(0xff6b4a, 0.1)
    );
    fan.position.y = 2.0;
    fan.rotation.z = Math.PI / 2;
    G.add(fan);

    // 12-month certification audit dial
    const dial = new THREE.Group();
    dial.position.y = 1.35;
    G.add(dial);

    const months: { m: THREE.Mesh; i: number }[] = [];
    for (let i = 0; i < 12; i++) {
      const th = (i / 12) * Math.PI * 2;
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 10, 8),
        M.glow(i < 9 ? a : 0x40515e, 0.85)
      );
      m.position.set(Math.cos(th) * 0.5, 0, Math.sin(th) * 0.5);
      dial.add(m);
      months.push({ m, i });
    }

    const rr = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.008, 6, 64), M.glow(a, 0.4));
    rr.rotation.x = Math.PI / 2;
    dial.add(rr);

    const rot = new THREE.Mesh(
      new THREE.RingGeometry(0.56, 0.62, 48, 1, 0, Math.PI * 0.5),
      M.glow(a, 0.6)
    );
    rot.rotation.x = -Math.PI / 2;
    dial.add(rot);

    acts.push((t) => {
      const beaO0 = getMeshO0(bea, 0.9);
      setMeshOpacity(bea, beaO0 * (0.4 + 0.6 * Math.abs(Math.sin(t * 3))));
      fan.rotation.y = t * 2.2;
      rot.rotation.z = -t * 0.8;
      months.forEach((mo) => {
        mo.m.scale.setScalar(1 + 0.2 * Math.sin(t * 2 + mo.i * 0.5));
      });
    });
  }

  return {
    group: g,
    update(t, dt) {
      acts.forEach((f) => f(t, dt));
    },
  };
};
