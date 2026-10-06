import * as THREE from 'three';
import { M, createBox, createFigure, createParts4 } from '../sceneUtils';
import { CYAN, GOLD } from '../sceneConfig';
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

export const buildOps = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const acts: ((t: number, dt: number) => void)[] = [];
  const P = createParts4(g);

  // =========================================================================
  // 0 · SCALE — 24/7 Rota Ring with 210 staff, 3 shift arcs & solar/lunar markers
  // =========================================================================
  {
    const G0 = new THREE.Group();
    G0.position.set(0, -0.5, 0);
    P[0].add(G0);

    const base = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.05, 12, 120),
      M.std(0x18222c, 0.45, 0.55)
    );
    base.rotation.x = Math.PI / 2;
    G0.add(base);

    // 3 shift arcs (morning / day / night shifts)
    const arcDefs: [number, number, number][] = [
      [0, 2.09, a],
      [2.09, 4.18, CYAN],
      [4.18, 6.283, 0xffb347],
    ];
    const arcs = arcDefs.map(([s, e, c], i) => {
      const m = new THREE.Mesh(
        new THREE.RingGeometry(2.1, 2.3, 64, 1, s, e - s),
        M.glow(c, 0.5)
      );
      m.rotation.x = -Math.PI / 2;
      m.position.y = 0.02 + i * 0.002;
      G0.add(m);
      return m;
    });

    // 24-hour tick marks around the rota perimeter
    for (let i = 0; i < 24; i++) {
      const th = (i / 24) * Math.PI * 2;
      const isMajor = i % 6 === 0;
      const tk = createBox(
        0.03,
        0.02,
        isMajor ? 0.24 : 0.12,
        M.glow(0xeaf4ff, isMajor ? 0.8 : 0.35),
        Math.cos(th) * 2.46,
        0,
        Math.sin(th) * 2.46
      );
      tk.rotation.y = -th;
      G0.add(tk);
    }

    // 210 staff members in dynamic orbital circulation
    const N = 210;
    const pos = new Float32Array(N * 3);
    const seed: { th: number; r: number; s: number; y: number }[] = [];
    for (let i = 0; i < N; i++) {
      seed.push({
        th: Math.random() * 6.28,
        r: 1.1 + Math.random() * 0.95,
        s: 0.4 + Math.random() * 0.9,
        y: Math.random(),
      });
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const points = new THREE.Points(pg, M.dot(a, 0.06, 0.8));
    G0.add(points);

    // Rotating 24h clock hand
    const hand = createBox(2.0, 0.02, 0.03, M.glow(0xffffff, 0.75), 0, 0.06, 0);
    G0.add(hand);

    // Sun / Dusk / Moon celestial markers
    const at = (th: number): [number, number, number] => [
      Math.cos(th) * 2.2,
      0.42,
      -Math.sin(th) * 2.2,
    ];

    const sun = new THREE.Group();
    sun.position.set(...at(1.045));
    G0.add(sun);
    sun.add(new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 12), M.glow(GOLD, 0.95)));
    const rays = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.012, 6, 40), M.glow(GOLD, 0.6));
    sun.add(rays);

    const dusk = new THREE.Group();
    dusk.position.set(...at(3.14));
    G0.add(dusk);
    dusk.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(0.13, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2),
        M.glow(0xffb347, 0.95)
      )
    );
    dusk.add(createBox(0.4, 0.015, 0.015, M.glow(0xffb347, 0.8)));

    const moon = new THREE.Mesh(
      new THREE.RingGeometry(0.08, 0.14, 28, 1, 0.9, 3.6),
      M.paint(0xeaf4ff, 0.95)
    );
    moon.position.set(...at(5.23));
    G0.add(moon);

    acts.push((t) => {
      hand.position.set(Math.cos(t * 0.35) * 1.0, 0.06, -Math.sin(t * 0.35) * 1.0);
      hand.rotation.y = t * 0.35;

      for (let i = 0; i < N; i++) {
        const s = seed[i];
        const th = s.th + t * 0.12 * s.s;
        pos[i * 3] = Math.cos(th) * s.r;
        pos[i * 3 + 1] = s.y * 0.14 + Math.sin(t + i) * 0.02;
        pos[i * 3 + 2] = Math.sin(th) * s.r;
      }
      pg.attributes.position.needsUpdate = true;

      arcs.forEach((m, i) => {
        const o0 = getMeshO0(m, 0.5);
        setMeshOpacity(m, o0 * (0.45 + 0.55 * Math.abs(Math.sin(t * 0.8 + i * 2))));
      });

      rays.scale.setScalar(1 + 0.12 * Math.sin(t * 2));
      sun.position.y = 0.42 + Math.sin(t) * 0.03;
      moon.position.y = 0.42 + Math.sin(t + 2) * 0.03;
    });
  }

  // =========================================================================
  // 1 · DISCIPLINES — 4 Department Pods (Front Desk, Maintenance, Housekeeping, Security)
  // =========================================================================
  {
    const podColors = [a, CYAN, 0x7fe8b8, 0xffb347];
    const podHeights = [0.5, 0.62, 0.42, 0.56];
    const podScreens: { scr: THREE.Mesh; i: number }[] = [];
    const cams: { cam: THREE.Group; led: THREE.Mesh }[] = [];

    podHeights.forEach((h, i) => {
      const c = podColors[i];
      const th = (i / 4) * Math.PI * 2 + Math.PI / 4;
      const Gp = new THREE.Group();
      Gp.position.set(Math.cos(th) * 1.15, -1.3, Math.sin(th) * 1.15);
      Gp.rotation.y = -th;
      P[1].add(Gp);

      // Desk base pedestal and glowing contour
      Gp.add(createBox(0.62, h, 0.5, M.std(0x151e27, 0.5, 0.4), 0, h / 2, 0));
      Gp.add(createBox(0.66, 0.03, 0.54, M.glow(c, 0.7), 0, h + 0.02, 0));

      // Glowing glass division screen
      const scr = createBox(0.4, 0.24, 0.02, M.glow(c, 0.65), 0, h + 0.2, -0.2);
      Gp.add(scr);
      podScreens.push({ scr, i });

      // Specific discipline artifacts
      if (i === 0) {
        // Reception & Front Desk: Staff figure + service bell
        const f = createFigure(M.std(a, 0.55, 0.2), M.glow(0xffffff, 0.95), 0.75);
        f.position.set(0, 0, -0.42);
        Gp.add(f);

        const bell = new THREE.Mesh(
          new THREE.SphereGeometry(0.06, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2),
          M.std(GOLD, 0.2, 1)
        );
        bell.position.set(0.18, h + 0.03, 0.12);
        Gp.add(bell);
      } else if (i === 1) {
        // Maintenance & HVAC: Red toolbox + steel handle
        Gp.add(createBox(0.32, 0.13, 0.15, M.paint(0xff5a5a, 0.95), 0, h + 0.1, 0.1));
        const hd = new THREE.Mesh(
          new THREE.TorusGeometry(0.06, 0.012, 8, 20, Math.PI),
          M.std(0x8a98a6, 0.4, 0.8)
        );
        hd.position.set(0, h + 0.165, 0.1);
        Gp.add(hd);
      } else if (i === 2) {
        // Housekeeping & Hygiene: Sanitation bucket + mop
        const bk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.1, 0.08, 0.15, 18),
          M.paint(0xffd23f, 0.95)
        );
        bk.position.set(0.08, h + 0.1, 0.08);
        Gp.add(bk);

        const mop = createBox(0.025, 0.75, 0.025, M.std(0x8a98a6, 0.4, 0.7), -0.02, h + 0.4, 0.08);
        mop.rotation.z = 0.3;
        Gp.add(mop);
      } else {
        // Security & Surveillance: Mounting stalk + pan-tilt CCTV with red LED
        Gp.add(createBox(0.03, 0.34, 0.03, M.std(0x8a98a6, 0.4, 0.7), 0.2, h + 0.17, 0.12));
        const cam = new THREE.Group();
        cam.position.set(0.2, h + 0.36, 0.12);
        Gp.add(cam);

        cam.add(createBox(0.2, 0.09, 0.09, M.paint(0xeaf4ff, 0.95), 0.06, 0, 0));
        const led = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 6), M.glow(0xff5a5a, 0.95));
        led.position.set(0.17, 0.03, 0);
        cam.add(led);
        cams.push({ cam, led });
      }
    });

    acts.push((t) => {
      podScreens.forEach((p) => {
        const o0 = getMeshO0(p.scr, 0.65);
        setMeshOpacity(p.scr, o0 * (0.45 + 0.55 * Math.abs(Math.sin(t * 1.4 + p.i * 1.2))));
      });
      cams.forEach((c) => {
        c.cam.rotation.y = Math.sin(t * 0.7) * 0.8;
        const o0 = getMeshO0(c.led, 0.95);
        setMeshOpacity(c.led, o0 * (Math.sin(t * 4) > 0 ? 1 : 0.2));
      });
    });
  }

  // =========================================================================
  // 2 · TECHNOLOGY — Server Rack, 9 Status Slats, Biometric Clock-in & Payroll
  // =========================================================================
  {
    const G2 = new THREE.Group();
    G2.position.set(3.0, 0, 0);
    G2.rotation.y = -0.5;
    P[2].add(G2);

    // Main Server Rack Cabinet
    G2.add(createBox(0.7, 2.0, 0.7, M.std(0x131c25, 0.5, 0.5), 0, -0.3, 0));

    // 9 Horizontal Server Status LED Slats
    const leds: THREE.Mesh[] = [];
    for (let i = 0; i < 9; i++) {
      const l = createBox(
        0.5,
        0.06,
        0.02,
        M.glow(i % 3 ? CYAN : a, 0.8),
        0,
        0.55 - i * 0.2,
        0.36
      );
      G2.add(l);
      leds.push(l);
    }

    // Biometric Clock-in Terminal
    const clock = new THREE.Group();
    clock.position.set(-0.05, -1.0, 1.2);
    G2.add(clock);
    clock.add(createBox(0.4, 0.5, 0.1, M.std(0x1a232d, 0.5, 0.4)));

    // Active Scanning Beam
    const scan = createBox(0.3, 0.04, 0.02, M.glow(a, 0.9), 0, 0, 0.06);
    clock.add(scan);

    // Concentric Fingerprint Rings
    const fp = new THREE.Group();
    fp.position.set(-0.05, -1.0, 1.26);
    G2.add(fp);
    [0.035, 0.065, 0.095, 0.125].forEach((r, i) =>
      fp.add(
        new THREE.Mesh(
          new THREE.RingGeometry(r, r + 0.012, 28, 1, 0.3 + i * 0.2, 4.6 - i * 0.3),
          M.glow(a, 0.85)
        )
      )
    );

    // Employee Figure at Clock-in
    const emp = createFigure(M.std(0x2a3a48, 0.6, 0.2), M.glow(0xffffff, 0.95), 0.9);
    emp.position.set(-0.05, -1.3, 1.72);
    G2.add(emp);

    // Dynamically Stacking Gold Payroll Coins
    const coins = [0, 1, 2, 3, 4].map((i) => {
      const c = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 0.04, 22),
        M.std(GOLD, 0.25, 1)
      );
      c.position.set(0.62, -1.28 + i * 0.05, 0.9);
      G2.add(c);
      return c;
    });

    acts.push((t) => {
      leds.forEach((l, i) => {
        const o0 = getMeshO0(l, 0.8);
        setMeshOpacity(l, o0 * (0.3 + 0.7 * Math.abs(Math.sin(t * 2.2 + i * 0.7))));
      });
      scan.position.y = Math.sin(t * 1.6) * 0.18;
      const u = (t * 0.25) % 1;
      coins.forEach((c, i) => {
        c.visible = i < 1 + Math.floor(u * 5);
      });
      fp.scale.setScalar(1 + 0.08 * Math.sin(t * 3));
    });
  }

  // =========================================================================
  // 3 · COMPLIANCE & STANDARDS — Immutable Audit Ledger Tower, Gold Seal & Document
  // =========================================================================
  {
    const G3 = new THREE.Group();
    G3.position.set(-2.9, 0, 0);
    P[3].add(G3);

    // Helical stack of 6 immutable audit blocks with glowing wireframes
    const blocks: { e: THREE.Mesh; i: number }[] = [];
    for (let i = 0; i < 6; i++) {
      const y = -1.2 + i * 0.34;
      const x = Math.sin(i * 0.9) * 0.12;
      const z = Math.cos(i * 0.9) * 0.12;

      G3.add(createBox(0.44, 0.28, 0.44, M.std(0x16202a, 0.45, 0.55), x, y, z));
      const e = new THREE.Mesh(
        new THREE.BoxGeometry(0.46, 0.3, 0.46),
        M.wire(i === 5 ? GOLD : a, 0.45)
      );
      e.position.set(x, y, z);
      G3.add(e);
      blocks.push({ e, i });
    }

    // Floating Gold Audit Seal Torus
    const seal = new THREE.Mesh(
      new THREE.TorusGeometry(0.16, 0.02, 10, 30),
      new THREE.MeshStandardMaterial({
        color: GOLD,
        roughness: 0.2,
        metalness: 1,
        transparent: true,
      })
    );
    seal.position.set(0, 0.95, 0);
    G3.add(seal);

    // Flying compliance document sliding into the ledger
    const doc = new THREE.Group();
    G3.add(doc);
    const sheet = createBox(0.3, 0.4, 0.01, M.paint(0xeaf4ff, 0.95));
    doc.add(sheet);

    // Text lines on sheet
    [0.12, 0.05, -0.02, -0.09].forEach((y, i) =>
      doc.add(createBox(0.2 - (i % 2) * 0.06, 0.02, 0.012, M.paint(0x2a3a48, 0.95), -0.02, y, 0.006))
    );
    // Red compliance stamp
    doc.add(createBox(0.07, 0.07, 0.014, M.paint(0xff5a5a, 0.9), 0.07, -0.15, 0.007));

    acts.push((t) => {
      blocks.forEach((bl) => {
        const k = 0.5 + 0.5 * Math.sin(t * 1.2 - bl.i * 0.6);
        const o0 = getMeshO0(bl.e, 0.45);
        setMeshOpacity(bl.e, o0 * (0.35 + 0.65 * k));
      });

      seal.rotation.z = t * 0.7;
      seal.rotation.x = Math.PI / 2 + Math.sin(t * 0.8) * 0.2;

      // Smooth cubic ease-in of sliding document into ledger
      const u = (t * 0.3) % 1;
      const e = 1 - Math.pow(1 - Math.min(u * 1.4, 1), 3);
      doc.position.set(0.95 - e * 0.95, 1.35 - e * 0.55, 0.3 - e * 0.3);
      doc.rotation.set(0, 0.3 * (1 - e), 0.25 * (1 - e));
      doc.scale.setScalar(u > 0.85 ? Math.max(0.01, (1 - u) / 0.15) : 1);
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
