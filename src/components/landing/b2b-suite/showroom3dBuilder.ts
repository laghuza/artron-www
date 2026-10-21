import * as THREE from 'three';

export const col = (hex: number) => new THREE.Color().setHex(hex, THREE.LinearSRGBColorSpace);

// Canvas Texture Generators
let _rad: THREE.CanvasTexture | null = null;
let _fa: THREE.CanvasTexture | null = null;
let _vg: THREE.CanvasTexture | null = null;

const cv = (w: number, h: number, fn: (g: CanvasRenderingContext2D, w: number, h: number) => void) => {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  fn(c.getContext('2d')!, w, h);
  return new THREE.CanvasTexture(c);
};

export const getRadialTexture = () =>
  _rad ||
  (_rad = cv(256, 256, (g) => {
    const r = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    r.addColorStop(0, 'rgba(255,255,255,1)');
    r.addColorStop(0.18, 'rgba(255,255,255,0.55)');
    r.addColorStop(0.5, 'rgba(255,255,255,0.12)');
    r.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = r;
    g.fillRect(0, 0, 256, 256);
  }));

export const getFloorAlphaTexture = () =>
  _fa ||
  (_fa = cv(256, 256, (g) => {
    g.fillStyle = '#000';
    g.fillRect(0, 0, 256, 256);
    const r = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    r.addColorStop(0, '#fff');
    r.addColorStop(0.35, '#888');
    r.addColorStop(1, '#000');
    g.fillStyle = r;
    g.fillRect(0, 0, 256, 256);
  }));

export const getVGradTexture = () =>
  _vg ||
  (_vg = cv(4, 256, (g) => {
    const r = g.createLinearGradient(0, 0, 0, 256);
    r.addColorStop(0, '#000');
    r.addColorStop(0.6, '#555');
    r.addColorStop(1, '#fff');
    g.fillStyle = r;
    g.fillRect(0, 0, 4, 256);
  }));

export const addMat = (color: THREE.Color, op: number, extra: Record<string, unknown> = {}) =>
  new THREE.MeshBasicMaterial(
    Object.assign(
      { color, transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, toneMapped: false },
      extra
    )
  );

export const glowSprite = (color: THREE.Color, size: number, op: number) => {
  const s = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: getRadialTexture(), color, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
  );
  s.scale.set(size, size, 1);
  return s;
};

// High-fidelity PMREM reflection generator with vibrant color balance
export function buildPMREMEnvironment(renderer: THREE.WebGLRenderer) {
  const pm = new THREE.PMREMGenerator(renderer);
  const s = new THREE.Scene();
  s.add(new THREE.Mesh(new THREE.BoxGeometry(24, 24, 24), new THREE.MeshBasicMaterial({ color: col(0x04070b), side: THREE.BackSide })));
  const panel = (w: number, h: number, hex: number, k: number, x: number, y: number, z: number) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
    m.material.color.copy(col(hex)).multiplyScalar(k);
    m.position.set(x, y, z);
    m.lookAt(0, 0, 0);
    s.add(m);
  };
  panel(10, 3, 0xf0f9ff, 2.4, 0, 9, 3);
  panel(1.2, 12, 0x10b981, 2.6, -9, 0, 2);
  panel(1.2, 12, 0xbae6fd, 1.8, 9, 1, -3);
  panel(14, 0.6, 0xbae6fd, 1.3, 0, -2, -10);
  const t = pm.fromScene(s, 0.035).texture;
  pm.dispose();
  return t;
}

export interface TurnstileSceneElements {
  modelGroup: THREE.Group;
  spinGroup: THREE.Group;
  pickObjects: THREE.Object3D[];
  anchor: THREE.Object3D;
  neonMat: THREE.MeshBasicMaterial;
  edgeMat: THREE.LineBasicMaterial;
  capMat: THREE.MeshStandardMaterial;
  capGlow: THREE.Sprite;
  scannerScreen: THREE.Mesh;
  pointLights: THREE.PointLight[];
  beamMat: THREE.MeshBasicMaterial;
  poolMesh: THREE.Mesh;
  ringMat: THREE.MeshBasicMaterial;
  pulseMesh: THREE.Mesh;
  pulseMat: THREE.MeshBasicMaterial;
  dashedRing: THREE.LineSegments;
  haloGlow: THREE.Sprite;
  ticksLines: THREE.LineSegments;
  outerRing: THREE.Mesh;
  motes: THREE.Points;
  motesPosArray: Float32Array;
  motesVelArray: number[];
  motesCount: number;
  floorY: number;
}

export function buildTurnstileScene(scene: THREE.Scene, neonColor: THREE.Color): TurnstileSceneElements {
  const TAU = Math.PI * 2;
  const FY = -1.5, H = 2.25, TOP = FY + H;
  const M = new THREE.Group();
  scene.add(M);
  const pick: THREE.Object3D[] = [];

  const body = new THREE.MeshStandardMaterial({ color: col(0x1a2433), metalness: 0.88, roughness: 0.3, envMapIntensity: 1.1 });
  const dark = new THREE.MeshStandardMaterial({ color: col(0x080c12), metalness: 0.4, roughness: 0.1, envMapIntensity: 1.3 });
  const steel = new THREE.MeshStandardMaterial({ color: col(0xdce4ee), metalness: 1, roughness: 0.13, envMapIntensity: 1.5 });
  const neonM = new THREE.MeshBasicMaterial({ color: neonColor.clone(), toneMapped: false });
  const edgeM = new THREE.LineBasicMaterial({ color: neonColor.clone(), transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
  const iceM = new THREE.MeshBasicMaterial({ color: col(0xbae6fd), toneMapped: false });

  // 2 Pedestals
  [-1, 1].forEach((sx) => {
    const x = sx * 2.1, g = new THREE.BoxGeometry(0.6, H, 2.3);
    const c = new THREE.Mesh(g, body);
    c.position.set(x, FY + H / 2, 0);
    M.add(c);
    pick.push(c);

    const e = new THREE.LineSegments(new THREE.EdgesGeometry(g), edgeM);
    e.position.copy(c.position);
    M.add(e);

    const cap = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.07, 2.36), dark);
    cap.position.set(x, TOP + 0.035, 0);
    M.add(cap);
    pick.push(cap);

    const ix = x - sx * 0.305;
    [-0.98, 0.98].forEach((z) => {
      const s = new THREE.Mesh(new THREE.BoxGeometry(0.016, 1.95, 0.035), neonM);
      s.position.set(ix, FY + H / 2 + 0.04, z);
      M.add(s);
    });
    const ht = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.03, 1.96), neonM);
    ht.position.set(ix, TOP - 0.12, 0);
    M.add(ht);

    const kb = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.02, 2.34), neonM);
    kb.position.set(x, FY + 0.05, 0);
    M.add(kb);

    const ind = new THREE.Mesh(new THREE.CircleGeometry(0.07, 32), neonM);
    ind.position.set(x, TOP - 0.4, 1.152);
    M.add(ind);

    const indR = new THREE.Mesh(new THREE.RingGeometry(0.11, 0.122, 48), iceM);
    indR.position.set(x, TOP - 0.4, 1.152);
    M.add(indR);
  });

  // Scanner & 3D anchor tag point
  const rdr = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.03, 0.56), dark);
  rdr.position.set(-2.1, TOP + 0.085, 0.55);
  M.add(rdr);

  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.42), new THREE.MeshBasicMaterial({ color: col(0xbae6fd), toneMapped: false, transparent: true, opacity: 0.9 }));
  scr.rotation.x = -Math.PI / 2;
  scr.position.set(-2.1, TOP + 0.102, 0.55);
  M.add(scr);

  const scrG = glowSprite(col(0xbae6fd), 1.3, 0.55);
  scrG.position.set(-2.1, TOP + 0.2, 0.55);
  M.add(scrG);

  const anchor = new THREE.Object3D();
  anchor.position.set(-2.1, TOP + 0.12, 0.55);
  M.add(anchor);

  // Rotating Hub & Arms
  const hub = new THREE.Group();
  hub.position.set(-1.62, 0.12, 0);
  hub.rotation.z = -0.62;
  M.add(hub);

  const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.55, 48), body);
  drum.rotation.z = Math.PI / 2;
  hub.add(drum);
  pick.push(drum);

  const capM = new THREE.MeshStandardMaterial({ color: col(0x050a08), emissive: neonColor.clone(), emissiveIntensity: 1.5, metalness: 0.3, roughness: 0.2 });
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.16, 32, 16), capM);
  cap.position.x = 0.31;
  hub.add(cap);

  const capG = glowSprite(neonColor.clone(), 1.6, 0.7);
  capG.position.x = 0.36;
  hub.add(capG);

  const spin = new THREE.Group();
  spin.position.x = 0.22;
  hub.add(spin);

  for (let k = 0; k < 3; k++) {
    const ag = new THREE.CylinderGeometry(0.045, 0.045, 1.75, 24);
    ag.translate(0, 1.05, 0);
    const arm = new THREE.Mesh(ag, steel);
    arm.rotation.x = (k * TAU) / 3;
    spin.add(arm);
    pick.push(arm);

    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 12), dark);
    tip.position.y = 1.93;
    arm.add(tip);
  }

  const pl = [0.9, -0.9].map((z) => {
    const p = new THREE.PointLight(neonColor.clone(), 1.4, 7.5, 1);
    p.position.set(0, 0.1, z);
    scene.add(p);
    return p;
  });

  // Cybernetic Floor Rims & Ticks
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(26, 26),
    new THREE.MeshStandardMaterial({ color: col(0x070b11), metalness: 0.9, roughness: 0.3, alphaMap: getFloorAlphaTexture(), transparent: true, envMapIntensity: 0.55, depthWrite: false })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = FY;
  scene.add(floor);

  const pool = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), addMat(neonColor.clone(), 0.24, { map: getRadialTexture() }));
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = FY + 0.004;
  scene.add(pool);

  const ringM = addMat(neonColor.clone(), 0.55);
  const ring = new THREE.Mesh(new THREE.RingGeometry(1.15, 1.17, 160), ringM);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = FY + 0.01;
  scene.add(ring);

  const outer = new THREE.Mesh(new THREE.RingGeometry(3.2, 3.21, 200), addMat(col(0xbae6fd), 0.2));
  outer.rotation.x = -Math.PI / 2;
  outer.position.y = FY + 0.008;
  scene.add(outer);

  const tk: THREE.Vector3[] = [];
  for (let k = 0; k < 120; k++) {
    const a = (k / 120) * TAU, l = k % 10 === 0 ? 0.28 : 0.1;
    tk.push(new THREE.Vector3(Math.cos(a) * 3.3, 0, Math.sin(a) * 3.3), new THREE.Vector3(Math.cos(a) * (3.3 + l), 0, Math.sin(a) * (3.3 + l)));
  }
  const ticks = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(tk),
    new THREE.LineBasicMaterial({ color: col(0xbae6fd), transparent: true, opacity: 0.3, depthWrite: false, toneMapped: false })
  );
  ticks.position.y = FY + 0.01;
  scene.add(ticks);

  const pulseM = addMat(neonColor.clone(), 0);
  const pulse = new THREE.Mesh(new THREE.RingGeometry(1, 1.05, 160), pulseM);
  pulse.rotation.x = -Math.PI / 2;
  pulse.position.y = FY + 0.012;
  scene.add(pulse);

  const beamM = addMat(neonColor.clone(), 0, { alphaMap: getVGradTexture() });
  const beam = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 2.3), beamM);
  beam.position.set(0, FY + 1.15, 0.15);
  M.add(beam);

  // Background Dashed Halo
  const halo = new THREE.Group();
  halo.position.set(0, 0.1, -4.2);
  scene.add(halo);
  halo.add(new THREE.Mesh(new THREE.TorusGeometry(4.6, 0.006, 4, 300), addMat(col(0xbae6fd), 0.14)));

  const dash: THREE.Vector3[] = [];
  for (let k = 0; k < 72; k++) {
    const a0 = (k / 72) * TAU, a1 = a0 + (TAU / 72) * 0.55;
    for (let j = 0; j < 6; j++) {
      dash.push(
        new THREE.Vector3(Math.cos(a0 + ((a1 - a0) * j) / 6) * 5.9, Math.sin(a0 + ((a1 - a0) * j) / 6) * 5.9, 0),
        new THREE.Vector3(Math.cos(a0 + ((a1 - a0) * (j + 1)) / 6) * 5.9, Math.sin(a0 + ((a1 - a0) * (j + 1)) / 6) * 5.9, 0)
      );
    }
  }
  const dashed = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(dash),
    new THREE.LineBasicMaterial({ color: neonColor.clone(), transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })
  );
  halo.add(dashed);
  const haloG = glowSprite(neonColor.clone(), 16, 0.08);
  halo.add(haloG);

  // Motes (Particles)
  const MN = 120;
  const mg = new THREE.BufferGeometry();
  const mp = new Float32Array(MN * 3);
  const mv: number[] = [];
  for (let i = 0; i < MN; i++) {
    const a = Math.random() * TAU, rr = 0.8 + Math.random() * 5;
    mp[i * 3] = Math.cos(a) * rr;
    mp[i * 3 + 1] = FY + Math.random() * 4.5;
    mp[i * 3 + 2] = Math.sin(a) * rr;
    mv.push(0.05 + Math.random() * 0.18);
  }
  mg.setAttribute('position', new THREE.BufferAttribute(mp, 3));
  const motes = new THREE.Points(
    mg,
    new THREE.PointsMaterial({ size: 0.06, map: getRadialTexture(), color: col(0xbae6fd), transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false })
  );
  motes.frustumCulled = false;
  scene.add(motes);

  return {
    modelGroup: M,
    spinGroup: spin,
    pickObjects: pick,
    anchor,
    neonMat: neonM,
    edgeMat: edgeM,
    capMat: capM,
    capGlow: capG,
    scannerScreen: scr,
    pointLights: pl,
    beamMat: beamM,
    poolMesh: pool,
    ringMat: ringM,
    pulseMesh: pulse,
    pulseMat: pulseM,
    dashedRing: dashed,
    haloGlow: haloG,
    ticksLines: ticks,
    outerRing: outer,
    motes,
    motesPosArray: mp,
    motesVelArray: mv,
    motesCount: MN,
    floorY: FY,
  };
}
