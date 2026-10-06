import * as THREE from 'three';
import { M, createBox, createLoop4, createParts4, pulseMesh } from '../sceneUtils';
import { CYAN, GOLD, WHITE } from '../sceneConfig';
import { SceneModelHandle } from './venueBuilders';

/**
 * RANKED ATHLETES — I, II, III თანრიგი (RST-04 / RANKED ATHLETES):
 * 
 * Composition matching Claude design:
 * - 3 Suspended Medallions hanging from ceiling ribbons:
 *   1. Rank I (Gold / Olive-Green sheen, Dark Olive ribbon, Gold Bezel)
 *   2. Rank II (Silver / Ice-Cyan Steel sheen, Dark Slate ribbon, Silver Chrome Bezel)
 *   3. Rank III (Bronze / Deep Amber sheen, Dark Bronze ribbon, Bronze Bezel)
 * - Geodesic wireframe sphere core positioned on the floor axis
 * - 3 Concentric tilted orbital rings encircling the lower core
 * - 4 Functional Telemetry Parts (Scale, Disciplines, Technology, Compliance)
 */
export const buildMedals = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const P = createParts4(g);
  const acts: ((t: number, dt: number, e: number) => void)[] = [];

  // Base persistent group — Medallions, Ribbons, Floor Orbits & Geodesic Core remain visible across all camera tiles
  const base = new THREE.Group();
  g.add(base);

  // ─────────────────────────────────────────────────────────────────────────
  // 1 · MEDALLIONS & CEILING RIBBONS CONFIGURATION
  // ─────────────────────────────────────────────────────────────────────────
  const medalConfigs = [
    {
      name: 'Rank I (Gold)',
      pos: new THREE.Vector3(-1.65, 0.22, 0.1),
      radius: 0.64,
      rimColor: 0xd4af37, // Polished Rich Gold
      faceColor: 0x6e8412, // Vibrant Olive-Gold satin sheen
      ribbonColor: 0x223616, // Deep Olive Forest Green ribbon
      roughness: 0.18,
      metalness: 0.95,
      tiltZ: 0.02,
    },
    {
      name: 'Rank II (Silver)',
      pos: new THREE.Vector3(0.22, 0.32, -0.05),
      radius: 0.62,
      rimColor: 0xdce5ed, // Polished Chrome Silver
      faceColor: 0x3d586e, // Steel Ice-Cyan metallic sheen
      ribbonColor: 0x182836, // Deep Slate Navy ribbon
      roughness: 0.12,
      metalness: 1.0,
      tiltZ: -0.015,
    },
    {
      name: 'Rank III (Bronze)',
      pos: new THREE.Vector3(2.05, 0.15, 0.05),
      radius: 0.59,
      rimColor: 0xb87333, // Polished Copper Bronze
      faceColor: 0x3f2f1e, // Deep Amber Bronze metallic sheen
      ribbonColor: 0x221a14, // Dark Espresso Bronze ribbon
      roughness: 0.22,
      metalness: 0.92,
      tiltZ: -0.03,
    },
  ];

  const medalMeshes: {
    group: THREE.Group;
    disc: THREE.Mesh;
    baseY: number;
    swaySpeed: number;
    swayPhase: number;
  }[] = [];

  medalConfigs.forEach((cfg, i) => {
    const mGroup = new THREE.Group();
    mGroup.position.copy(cfg.pos);

    // ── Ceiling Hanging Ribbon ──
    const ribbonWidth = 0.22;
    const ribbonHeight = 3.2;
    const ribbonGeo = new THREE.PlaneGeometry(ribbonWidth, ribbonHeight, 1, 8);
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: cfg.ribbonColor,
      roughness: 0.85,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
    const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
    // Position ribbon from top of medallion upwards to ceiling
    ribbon.position.set(0, cfg.radius + ribbonHeight / 2 - 0.05, -0.01);
    mGroup.add(ribbon);

    // Ribbon bottom loop clasp / metallic bracket
    const claspMat = new THREE.MeshStandardMaterial({
      color: cfg.rimColor,
      roughness: cfg.roughness,
      metalness: cfg.metalness,
    });
    const clasp = createBox(0.26, 0.08, 0.06, claspMat, 0, cfg.radius + 0.03, 0);
    mGroup.add(clasp);

    // ── Outer Beveled Metallic Rim (Chamfered Torus + Outer Ring) ──
    const rimRadius = cfg.radius;
    const tubeRadius = 0.045;
    const rimGeo = new THREE.TorusGeometry(rimRadius, tubeRadius, 20, 64);
    const rimMat = new THREE.MeshStandardMaterial({
      color: cfg.rimColor,
      roughness: cfg.roughness,
      metalness: cfg.metalness,
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    mGroup.add(rim);

    // Inner stepped bezel border
    const innerRimGeo = new THREE.TorusGeometry(rimRadius - 0.04, 0.018, 14, 48);
    const innerRimMat = new THREE.MeshStandardMaterial({
      color: cfg.rimColor,
      roughness: 0.25,
      metalness: 0.85,
    });
    const innerRim = new THREE.Mesh(innerRimGeo, innerRimMat);
    mGroup.add(innerRim);

    // ── Main Medallion Body Cylinder ──
    const cylinderGeo = new THREE.CylinderGeometry(rimRadius, rimRadius, 0.07, 64);
    const cylinderMat = new THREE.MeshStandardMaterial({
      color: cfg.rimColor,
      roughness: cfg.roughness,
      metalness: cfg.metalness,
    });
    const cylinder = new THREE.Mesh(cylinderGeo, cylinderMat);
    cylinder.rotation.x = Math.PI / 2;
    mGroup.add(cylinder);

    // ── Front & Back Inset Faces (High-sheen Colored Face) ──
    const faceGeo = new THREE.CircleGeometry(rimRadius - 0.035, 64);
    const faceMat = new THREE.MeshPhysicalMaterial({
      color: cfg.faceColor,
      roughness: 0.22,
      metalness: 0.88,
      clearcoat: 0.85,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
    });
    const frontFace = new THREE.Mesh(faceGeo, faceMat);
    frontFace.position.z = 0.038;
    mGroup.add(frontFace);

    const backFace = new THREE.Mesh(faceGeo, faceMat);
    backFace.position.z = -0.038;
    backFace.rotation.y = Math.PI;
    mGroup.add(backFace);

    // Subtle glowing neon halo around rim edge
    const glowTorus = new THREE.Mesh(
      new THREE.TorusGeometry(rimRadius + 0.015, 0.01, 10, 48),
      M.glow(cfg.rimColor, 0.45)
    );
    mGroup.add(glowTorus);

    base.add(mGroup);

    medalMeshes.push({
      group: mGroup,
      disc: frontFace,
      baseY: cfg.pos.y,
      swaySpeed: 0.95 - i * 0.12,
      swayPhase: i * 1.5,
    });
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 2 · LOWER GEODESIC WIREFRAME CORE & CONCENTRIC ORBIT RINGS
  // ─────────────────────────────────────────────────────────────────────────
  const coreGroup = new THREE.Group();
  coreGroup.position.set(0.18, -0.82, 0.05);

  // Geodesic Wireframe Icosphere Core
  const coreIcoGeo = new THREE.IcosahedronGeometry(0.38, 2);
  const coreWireMat = new THREE.MeshBasicMaterial({
    color: GOLD,
    wireframe: true,
    transparent: true,
    opacity: 0.48,
  });
  const coreWire = new THREE.Mesh(coreIcoGeo, coreWireMat);
  coreGroup.add(coreWire);

  // Inner pulsing jewel octahedron
  const innerJewel = new THREE.Mesh(new THREE.OctahedronGeometry(0.14, 0), M.glow(WHITE, 0.85));
  coreGroup.add(innerJewel);

  // 3 Concentric Tilted Orbital Rings on the floor plane
  const ringParams = [
    { radius: 1.05, tiltX: 0.42, tiltY: 0.08, opacity: 0.38, rotSpeed: 0.06 },
    { radius: 1.62, tiltX: 0.44, tiltY: -0.06, opacity: 0.28, rotSpeed: -0.045 },
    { radius: 2.25, tiltX: 0.45, tiltY: 0.04, opacity: 0.18, rotSpeed: 0.03 },
  ];

  const orbitRings: { mesh: THREE.LineLoop; speed: number }[] = [];

  ringParams.forEach((rp) => {
    const pts: THREE.Vector3[] = [];
    const segments = 96;
    for (let s = 0; s <= segments; s++) {
      const theta = (s / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * rp.radius, 0, Math.sin(theta) * rp.radius));
    }
    const ringGeo = new THREE.BufferGeometry().setFromPoints(pts);
    const ringMat = new THREE.LineBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: rp.opacity,
    });
    const ringMesh = new THREE.LineLoop(ringGeo, ringMat);
    ringMesh.rotation.x = rp.tiltX;
    ringMesh.rotation.z = rp.tiltY;
    coreGroup.add(ringMesh);
    orbitRings.push({ mesh: ringMesh, speed: rp.rotSpeed });
  });

  base.add(coreGroup);

  // ─────────────────────────────────────────────────────────────────────────
  // 3 · TELEMETRY FOCUS LAYERS (P[0], P[1], P[2], P[3])
  // ─────────────────────────────────────────────────────────────────────────

  // ── Part 0: SCALE & CAPACITY (WIDE ESTABLISH) ──
  {
    // Outer telemetry ellipse and horizon scan arc
    const wideArc = new THREE.Mesh(
      new THREE.RingGeometry(2.4, 2.44, 64, 1, 0, Math.PI * 2),
      M.glow(GOLD, 0.35)
    );
    wideArc.position.set(0.18, -0.82, 0.05);
    wideArc.rotation.x = Math.PI * 0.44;
    P[0].add(wideArc);

    // Floor holographic coordinates grid
    const floorHolo = new THREE.Mesh(new THREE.PlaneGeometry(5.4, 3.2, 18, 10), M.wire(GOLD, 0.14));
    floorHolo.rotation.x = -Math.PI / 2;
    floorHolo.position.set(0.18, -1.2, 0.05);
    P[0].add(floorHolo);
  }

  // ── Part 1: DISCIPLINES (DISCIPLINE PASS) ──
  {
    // Olympic & non-Olympic discipline radial tick rays around Rank I medallion
    const tickGroup = new THREE.Group();
    tickGroup.position.set(-1.65, 0.22, 0.1);
    const totalTicks = 29; // 18 Olympic + 11 Non-Olympic
    for (let k = 0; k < totalTicks; k++) {
      const angle = (k / totalTicks) * Math.PI * 2;
      const isOlympic = k < 18;
      const len = isOlympic ? 0.14 : 0.08;
      const rInner = 0.72;
      const pts = [
        new THREE.Vector3(Math.cos(angle) * rInner, Math.sin(angle) * rInner, 0),
        new THREE.Vector3(Math.cos(angle) * (rInner + len), Math.sin(angle) * (rInner + len), 0),
      ];
      const tickGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const tickLine = new THREE.Line(
        tickGeo,
        new THREE.LineBasicMaterial({
          color: isOlympic ? GOLD : CYAN,
          transparent: true,
          opacity: 0.6,
        })
      );
      tickGroup.add(tickLine);
    }
    P[1].add(tickGroup);

    acts.push((t) => {
      tickGroup.rotation.z = t * 0.12;
    });
  }

  // ── Part 2: TECHNOLOGY (TECH CLOSE-UP) ──
  {
    // QR / RFID Bulk Import Digital stream matrix beam
    const techGroup = new THREE.Group();
    techGroup.position.set(0.22, 0.32, -0.05);

    // Vertical holographic scanner line
    const scanLine = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.03), M.glow(CYAN, 0.85));
    techGroup.add(scanLine);

    // Concentric digital data reticle
    const reticle = new THREE.Mesh(new THREE.RingGeometry(0.68, 0.71, 48), M.glow(CYAN, 0.5));
    techGroup.add(reticle);

    P[2].add(techGroup);

    acts.push((t) => {
      scanLine.position.y = Math.sin(t * 2.2) * 0.55;
      reticle.rotation.z = -t * 0.3;
    });
  }

  // ── Part 3: COMPLIANCE (STANDARD SWEEP) ──
  {
    // National classification sweep plane & statutory verification seal
    const sweepPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(2.2, 0.04),
      M.glow(GOLD, 0.8)
    );
    sweepPlane.position.set(0.22, 0.32, 0.12);
    P[3].add(sweepPlane);

    // Audit compliance protective boundary ring
    const auditRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.78, 0.015, 12, 48),
      M.glow(GOLD, 0.55)
    );
    auditRing.position.set(0.22, 0.32, 0.08);
    P[3].add(auditRing);

    acts.push((t) => {
      sweepPlane.rotation.z = t * 1.4;
      auditRing.rotation.y = t * 0.4;
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 4 · CONTINUOUS ANIMATION LOOP
  // ─────────────────────────────────────────────────────────────────────────
  return {
    group: g,
    parts: P,
    update(t: number, dt: number) {
      // Gentle realistic pendulum sway & hovering for suspended medallions
      medalMeshes.forEach((m) => {
        // Natural hovering vertical motion
        m.group.position.y = m.baseY + Math.sin(t * m.swaySpeed + m.swayPhase) * 0.038;
        // Subtle natural pendulum sway on Z
        m.group.rotation.z = Math.sin(t * (m.swaySpeed * 0.85) + m.swayPhase) * 0.028;
        // Gentle yaw angle oscillation (front-facing, not spinning around)
        m.group.rotation.y = Math.sin(t * (m.swaySpeed * 0.6) + m.swayPhase) * 0.09;
      });

      // Lower Geodesic core slow 3D rotation
      coreWire.rotation.y = t * 0.22;
      coreWire.rotation.x = Math.sin(t * 0.15) * 0.15;
      innerJewel.rotation.y = -t * 0.4;

      // Orbit rings rotation
      orbitRings.forEach((or) => {
        or.mesh.rotation.y += or.speed * dt;
      });

      // Execute telemetry layer actions
      acts.forEach((f) => f(t, dt, 1));
    },
  };
};
