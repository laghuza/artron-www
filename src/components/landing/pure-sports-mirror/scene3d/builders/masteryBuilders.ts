import * as THREE from 'three';
import { M, createBox, createLoop4, createParts4, pulseMesh } from '../sceneUtils';
import { CYAN, GOLD, WHITE } from '../sceneConfig';
import { SceneModelHandle } from './venueBuilders';

export const buildTrophy = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const P = createParts4(g);
  const acts: ((t: number, dt: number, e: number) => void)[] = [];

  // 0 · Verified Cup & Pedestal
  const goldMat = new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.14, metalness: 1, transparent: true });
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= 20; i++) {
    const u = i / 20;
    pts.push(new THREE.Vector2(0.1 + Math.sin(u * Math.PI * 0.86) * 0.44 * (1 - u * 0.3), u * 0.95));
  }
  const cup = new THREE.Mesh(new THREE.LatheGeometry(pts, 32), goldMat);
  cup.position.y = 0.36;
  P[0].add(cup);

  const ped = new THREE.Mesh(
    new THREE.CylinderGeometry(0.76, 0.86, 1.14, 32),
    new THREE.MeshStandardMaterial({ color: 0x10161d, roughness: 0.35, metalness: 0.6, transparent: true })
  );
  ped.position.y = -0.72;
  P[0].add(ped);

  const band = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.02, 8, 48), M.glow(a, 0.8));
  band.rotation.x = Math.PI / 2;
  band.position.y = -0.34;
  P[0].add(band);

  const ath: THREE.Mesh[] = [];
  for (let i = 0; i < 24; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.042, 10, 8), M.glow(i % 4 ? GOLD : 0xffffff, 0.85));
    m.userData.orb = { th: (i / 24) * 6.28, r: 1.5 + (i % 3) * 0.3, y: -1.0 + (i % 5) * 0.13 };
    P[0].add(m);
    ath.push(m);
  }

  acts.push((t, _dt, e) => {
    ath.forEach((m, i) => {
      const o = m.userData.orb;
      const th = o.th + t * 0.16;
      m.position.set(Math.cos(th) * o.r, o.y + Math.sin(t * 1.3 + i) * 0.03, Math.sin(th) * o.r);
    });
    pulseMesh(band, 0.6 + 0.4 * Math.sin(t * 1.6), e);
  });

  // 2 · MOCAP Volume
  const G2 = new THREE.Group();
  G2.position.set(2.95, 0.15, 0);
  G2.rotation.y = -0.55;
  P[2].add(G2);
  G2.add(new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 1.8, 4, 4, 4), M.wire(CYAN, 0.14)));

  return {
    group: g,
    update(t, dt) {
      acts.forEach((f) => f(t, dt, 1));
    },
  };
};

export const buildPodium = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const P = createParts4(g);
  const acts: ((t: number, dt: number, e: number) => void)[] = [];

  const hs = [1.35, 0.95, 0.72];
  const xs = [0, -1.42, 1.42];
  const cols = [GOLD, 0xd8dde3, 0xc08a4a];
  const meds: THREE.Mesh[] = [];

  hs.forEach((h, i) => {
    P[0].add(createBox(1.26, h, 1.26, M.std(i ? 0x131a22 : 0x1b242e, 0.4, 0.55), xs[i], -1.3 + h / 2, 0));
    P[0].add(createBox(1.32, 0.04, 1.32, M.glow(cols[i], i ? 0.5 : 0.9), xs[i], -1.3 + h + 0.02, 0));
    const med = new THREE.Mesh(
      new THREE.CylinderGeometry(0.26, 0.26, 0.05, 32),
      new THREE.MeshStandardMaterial({ color: cols[i], roughness: 0.16, metalness: 1, transparent: true })
    );
    med.rotation.x = Math.PI / 2;
    med.position.set(xs[i], -1.3 + h + 0.62, 0);
    P[0].add(med);
    meds.push(med);
  });

  // Season ring
  const ticks: THREE.Mesh[] = [];
  for (let i = 0; i < 28; i++) {
    const th = (i / 28) * Math.PI * 2;
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
    ticks.forEach((tk, i) => {
      pulseMesh(tk, 0.4 + 0.6 * Math.abs(Math.sin(t * 1.1 - i * 0.18)), e);
    });
  });

  return {
    group: g,
    update(t, dt) {
      acts.forEach((f) => f(t, dt, 1));
    },
  };
};

export const buildPassport = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const card = new THREE.Mesh(
    new THREE.BoxGeometry(2.7, 1.74, 0.05),
    new THREE.MeshPhysicalMaterial({
      color: 0x08151f,
      roughness: 0.12,
      metalness: 0.85,
      clearcoat: 1,
      transparent: true,
    })
  );
  g.add(card);
  const frame = new THREE.Mesh(new THREE.PlaneGeometry(2.58, 1.62), M.wire(a, 0.25));
  frame.position.z = 0.03;
  g.add(frame);

  const crest = new THREE.Mesh(
    new THREE.TorusGeometry(0.26, 0.035, 12, 36),
    new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.15, metalness: 1, transparent: true })
  );
  crest.position.set(-0.86, 0.42, 0.06);
  g.add(crest);

  const chip = createBox(
    0.3,
    0.24,
    0.02,
    new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.25, metalness: 1, transparent: true }),
    -0.86,
    -0.3,
    0.05
  );
  g.add(chip);

  const sweep = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 2.0), M.glow(0xa8f0ff, 0.2));
  sweep.position.z = 0.09;
  sweep.rotation.z = 0.32;
  g.add(sweep);

  return {
    group: g,
    update(t: number) {
      g.rotation.x = Math.sin(t * 0.5) * 0.14;
      sweep.position.x = ((t * 0.9) % 2.6) - 1.3;
      crest.rotation.z = t * 0.6;
    },
  };
};

export const buildMedals = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const cols = [GOLD, 0xd8dde3, 0xc08a4a];
  const meds = cols.map((c, i) => {
    const grp = new THREE.Group();
    const disc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.44 - i * 0.05, 0.44 - i * 0.05, 0.06, 36),
      new THREE.MeshStandardMaterial({ color: c, roughness: 0.16, metalness: 1, transparent: true })
    );
    disc.rotation.x = Math.PI / 2;
    grp.add(disc);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.47 - i * 0.05, 0.015, 10, 36), M.glow(c, 0.7));
    grp.add(rim);
    grp.position.set((i - 1) * 1.5, 0.1 - i * 0.16, 0);
    g.add(grp);
    return grp;
  });

  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.34, 1), M.wire(a, 0.4));
  core.position.y = -0.85;
  g.add(core);

  return {
    group: g,
    update(t: number) {
      meds.forEach((m, i) => {
        m.rotation.y = t * (0.8 - i * 0.18);
        m.position.y = 0.1 - i * 0.16 + Math.sin(t * 1.3 + i) * 0.06;
      });
      core.rotation.y = t * 0.5;
    },
  };
};

export const buildAcademy = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const P = createParts4(g);
  const acts: ((t: number, dt: number, e: number) => void)[] = [];

  const T = 5;
  for (let i = 0; i < T; i++) {
    const w = 4.4 - i * 0.7;
    const h = 0.28;
    P[0].add(createBox(w, h, w, M.std(i % 2 ? 0x101720 : 0x161f29, 0.5, 0.4), 0, -1.32 + i * h + h / 2, 0));
    P[0].add(
      createBox(w + 0.03, 0.014, w + 0.03, M.glow(i === T - 1 ? GOLD : a, 0.22 + i * 0.14), 0, -1.32 + i * h + h + 0.008, 0)
    );
  }

  const crown = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.03, 10, 36),
    new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.16, metalness: 1, transparent: true })
  );
  crown.rotation.x = Math.PI / 2;
  crown.position.y = 0.45;
  P[0].add(crown);

  acts.push((t) => {
    crown.rotation.z = t * 0.5;
    crown.position.y = 0.45 + Math.sin(t * 1.2) * 0.05;
  });

  return {
    group: g,
    update(t, dt) {
      acts.forEach((f) => f(t, dt, 1));
    },
  };
};
