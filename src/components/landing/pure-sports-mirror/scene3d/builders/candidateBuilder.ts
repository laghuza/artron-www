import * as THREE from 'three';
import { M, createBox, createLoop4, createParts4, pulseMesh } from '../sceneUtils';
import { CYAN, GOLD, WHITE } from '../sceneConfig';
import { SceneModelHandle } from './venueBuilders';

/**
 * CANDIDATE MASTERS (MST-03 / CMS PIPELINE):
 * - Part 0: SCALE & PIPELINE — Iridescent glass identity passport plate (2.7 x 1.74), outer wireframe border & holographic grid
 * - Part 1: DISCIPLINES — Rotating gold seal torus crest + qualification microchip with gold pins (Speed • Power • VO2)
 * - Part 2: TECHNOLOGY — 6 pulsing biometric/gap telemetry data rows & 10x10 instanced RFID/QR verification matrix
 * - Part 3: COMPLIANCE — Dynamic diagonal laser sweep plane (0.45 x 2.0), anti-passback security ring & certified audit seal
 */
export const buildPassport = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const P = createParts4(g);
  const acts: ((t: number, dt: number, e: number) => void)[] = [];

  const createGoldMat = () =>
    new THREE.MeshStandardMaterial({
      color: GOLD,
      roughness: 0.15,
      metalness: 1,
      transparent: true,
    });

  // ─────────────────────────────────────────────────────────────────────────
  // 0 · SCALE — Iridescent holographic passport plate, perimeter loop & grid
  // ─────────────────────────────────────────────────────────────────────────
  {
    // Main passport substrate body
    const card = new THREE.Mesh(
      new THREE.BoxGeometry(2.7, 1.74, 0.05),
      new THREE.MeshPhysicalMaterial({
        color: 0x08151f,
        roughness: 0.12,
        metalness: 0.85,
        iridescence: 1,
        iridescenceIOR: 1.8,
        clearcoat: 1,
        transparent: true,
      })
    );
    P[0].add(card);

    // Outer perimeter wire loop
    P[0].add(createLoop4(2.62, 1.66, 0.03, M.line(a, 0.65)));

    // Thin inner boundary wire frame
    const frame = new THREE.Mesh(new THREE.PlaneGeometry(2.58, 1.62), M.wire(a, 0.25));
    frame.position.z = 0.03;
    P[0].add(frame);

    // Front holographic perspective grid
    const holo = new THREE.Mesh(new THREE.PlaneGeometry(2.7, 1.74, 18, 12), M.wire(a, 0.12));
    holo.position.z = 0.12;
    P[0].add(holo);

    // Background pipeline halo ring
    const pipeRing = new THREE.Mesh(new THREE.TorusGeometry(1.68, 0.015, 12, 64), M.glow(a, 0.28));
    pipeRing.position.z = -0.06;
    P[0].add(pipeRing);

    acts.push((t, dt, e) => {
      pulseMesh(holo, 0.5 + 0.5 * Math.sin(t * 1.3), e);
      pipeRing.rotation.z = -t * 0.15;
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 1 · DISCIPLINES — Rotating gold seal torus crest + qualification microchip
  // ─────────────────────────────────────────────────────────────────────────
  {
    // Golden heraldic seal / qualification torus ring
    const crest = new THREE.Mesh(
      new THREE.TorusGeometry(0.26, 0.035, 16, 44),
      createGoldMat()
    );
    crest.position.set(-0.86, 0.42, 0.06);
    P[1].add(crest);

    // Inner glowing ring inside crest
    const innerRing = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.012, 10, 32), M.glow(GOLD, 0.75));
    innerRing.position.set(-0.86, 0.42, 0.06);
    P[1].add(innerRing);

    // Center jewel core
    const crestCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.06, 0), M.glow(WHITE, 0.9));
    crestCore.position.set(-0.86, 0.42, 0.06);
    P[1].add(crestCore);

    // Gold integrated microchip platform
    const chip = createBox(
      0.3,
      0.24,
      0.02,
      new THREE.MeshStandardMaterial({
        color: GOLD,
        roughness: 0.25,
        metalness: 1,
        transparent: true,
      }),
      -0.86,
      -0.3,
      0.05
    );
    P[1].add(chip);

    // Chip contact pin lines
    for (let c = 0; c < 4; c++) {
      const pin = createBox(0.04, 0.03, 0.005, M.glow(0x1a2634, 0.9), -0.95 + c * 0.06, -0.3, 0.062);
      P[1].add(pin);
    }

    acts.push((t, dt, e) => {
      crest.rotation.z = t * 0.6;
      innerRing.rotation.z = -t * 0.8;
      crestCore.scale.setScalar(1 + 0.2 * Math.sin(t * 3));
      pulseMesh(innerRing, 0.6 + 0.4 * Math.sin(t * 2.2), e);
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 2 · TECHNOLOGY — 6 Biometric data rows & 10x10 instanced RFID/QR matrix
  // ─────────────────────────────────────────────────────────────────────────
  {
    const rows: THREE.Mesh[] = [];
    // Fixed deterministic row lengths representing standard gap metrics
    const rowWidths = [0.88, 1.25, 0.72, 1.1, 0.95, 1.32];

    for (let i = 0; i < 6; i++) {
      const w = rowWidths[i];
      const r = createBox(
        w,
        0.05,
        0.01,
        M.glow(i % 2 ? CYAN : a, 0.7),
        -0.25 + w / 2,
        0.52 - i * 0.2,
        0.05
      );
      P[2].add(r);
      rows.push(r);

      // Status indicator dot at the end of each row
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.022, 10, 8),
        M.glow(i === 0 ? GOLD : CYAN, 0.85)
      );
      dot.position.set(-0.25 + w + 0.05, 0.52 - i * 0.2, 0.05);
      P[2].add(dot);
    }

    // 10x10 Instanced Mesh for QR / Telemetry Matrix
    const qn = 10;
    const qim = new THREE.InstancedMesh(
      new THREE.BoxGeometry(0.05, 0.05, 0.01),
      M.glow(WHITE, 0.75),
      qn * qn
    );
    const d = new THREE.Object3D();
    // Deterministic pseudo-random seed pattern matching biometric code
    for (let i = 0; i < qn * qn; i++) {
      const x = i % qn;
      const y = Math.floor(i / qn);
      d.position.set(0.86 + (x - qn / 2) * 0.058, -0.42 + (y - qn / 2) * 0.058, 0.05);
      // High-density QR-like pattern
      const isCorner = (x < 3 && y < 3) || (x > 6 && y < 3) || (x < 3 && y > 6);
      const isLit = isCorner || (i * 17 + 5) % 100 > 45;
      d.scale.setScalar(isLit ? 1 : 0.001);
      d.updateMatrix();
      qim.setMatrixAt(i, d.matrix);
    }
    P[2].add(qim);

    // ACWR load telemetry indicator wave under QR
    const acwrBar = createBox(0.58, 0.03, 0.01, M.glow(CYAN, 0.65), 0.86, -0.74, 0.05);
    P[2].add(acwrBar);

    acts.push((t, dt, e) => {
      rows.forEach((r, i) => {
        pulseMesh(r, 0.5 + 0.5 * Math.sin(t * 2 + i * 0.6), e);
      });
      pulseMesh(acwrBar, 0.7 + 0.3 * Math.cos(t * 2.8), e);
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 3 · COMPLIANCE — Laser sweep plane, anti-passback ring & verified seal
  // ─────────────────────────────────────────────────────────────────────────
  {
    // Sweeping holographic laser scanner plane across passport surface
    const sweep = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 2.0), M.glow(0xa8f0ff, 0.22));
    sweep.position.z = 0.09;
    sweep.rotation.z = 0.32;
    P[3].add(sweep);

    // Compliance certification seal in upper right
    const seal = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.018, 12, 36), M.glow(GOLD, 0.7));
    seal.position.set(0.86, 0.54, 0.055);
    P[3].add(seal);

    const sealStar = new THREE.Mesh(new THREE.OctahedronGeometry(0.07, 0), M.glow(WHITE, 0.85));
    sealStar.position.set(0.86, 0.54, 0.06);
    P[3].add(sealStar);

    // Bottom compliance status line
    const compLine = createBox(2.2, 0.02, 0.005, M.glow(a, 0.5), 0, -0.74, 0.035);
    P[3].add(compLine);

    acts.push((t, dt, e) => {
      sweep.position.x = ((t * 0.9) % 2.6) - 1.3;
      pulseMesh(sweep, 0.75 + 0.25 * Math.sin(t * 3.5), e);
      seal.rotation.z = -t * 0.45;
      sealStar.rotation.y = t * 1.2;
      pulseMesh(seal, 0.6 + 0.4 * Math.sin(t * 1.8), e);
    });
  }

  return {
    group: g,
    parts: P,
    update(t: number, dt: number, e = 1) {
      g.rotation.x = Math.sin(t * 0.5) * 0.14;
      acts.forEach((fn) => fn(t, dt, e));
    },
  };
};
