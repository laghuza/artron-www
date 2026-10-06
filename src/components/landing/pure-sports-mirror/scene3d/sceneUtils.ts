import * as THREE from 'three';

export const disposeGroup = (group: THREE.Group, scene: THREE.Scene) => {
  scene.remove(group);
  group.traverse((obj) => {
    if ((obj as THREE.Mesh).geometry) {
      (obj as THREE.Mesh).geometry.dispose();
    }
    const mesh = obj as THREE.Mesh;
    if (mesh.material) {
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((m) => m.dispose());
      } else {
        mesh.material.dispose();
      }
    }
  });
};

export const createStudioEnv = (): THREE.CanvasTexture => {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 64;
  const x = c.getContext('2d');
  if (x) {
    const g = x.createLinearGradient(0, 0, 0, 64);
    g.addColorStop(0, '#0b2a3a');
    g.addColorStop(0.42, '#123a4e');
    g.addColorStop(0.5, '#9fe8ff');
    g.addColorStop(0.58, '#0d2130');
    g.addColorStop(1, '#04070c');
    x.fillStyle = g;
    x.fillRect(0, 0, 128, 64);
    x.fillStyle = 'rgba(255,255,255,0.85)';
    x.fillRect(12, 10, 34, 5);
    x.fillRect(80, 22, 26, 4);
  }
  const t = new THREE.CanvasTexture(c);
  t.mapping = THREE.EquirectangularReflectionMapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
};

export const createRadialTex = (): THREE.CanvasTexture => {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const x = c.getContext('2d');
  if (x) {
    const g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, 'rgba(0,240,255,0.20)');
    g.addColorStop(0.45, 'rgba(0,120,180,0.06)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g;
    x.fillRect(0, 0, 256, 256);
  }
  return new THREE.CanvasTexture(c);
};

export const createSoftTex = (): THREE.CanvasTexture => {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const x = c.getContext('2d');
  if (x) {
    const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.32, 'rgba(206,234,255,0.55)');
    g.addColorStop(1, 'rgba(150,200,255,0)');
    x.fillStyle = g;
    x.fillRect(0, 0, 64, 64);
  }
  return new THREE.CanvasTexture(c);
};

export const createRayTex = (): THREE.CanvasTexture => {
  const c = document.createElement('canvas');
  c.width = 48;
  c.height = 256;
  const x = c.getContext('2d');
  if (x) {
    const v = x.createLinearGradient(0, 0, 0, 256);
    v.addColorStop(0, 'rgba(255,255,255,0.8)');
    v.addColorStop(0.4, 'rgba(255,255,255,0.18)');
    v.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = v;
    x.fillRect(0, 0, 48, 256);
    const h = x.createLinearGradient(0, 0, 48, 0);
    h.addColorStop(0, 'rgba(0,0,0,1)');
    h.addColorStop(0.5, 'rgba(0,0,0,0)');
    h.addColorStop(1, 'rgba(0,0,0,1)');
    x.globalCompositeOperation = 'destination-out';
    x.fillStyle = h;
    x.fillRect(0, 0, 48, 256);
  }
  return new THREE.CanvasTexture(c);
};

export const M = {
  std: (c: number | THREE.ColorRepresentation, r = 0.5, m = 0.35, o = 1) => {
    const mat = new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m, opacity: o, transparent: true });
    mat.userData = { o0: o };
    return mat;
  },
  glow: (c: number | THREE.ColorRepresentation, o = 0.9) => {
    const mat = new THREE.MeshBasicMaterial({ color: c, opacity: o, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    mat.userData = { o0: o };
    return mat;
  },
  paint: (c: number | THREE.ColorRepresentation, o = 0.95) => {
    const mat = new THREE.MeshBasicMaterial({ color: c, opacity: o, transparent: true });
    mat.userData = { o0: o };
    return mat;
  },
  wire: (c: number | THREE.ColorRepresentation, o = 0.4) => {
    const mat = new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: o });
    mat.userData = { o0: o };
    return mat;
  },
  line: (c: number | THREE.ColorRepresentation, o = 0.7) => {
    const mat = new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: o });
    mat.userData = { o0: o };
    return mat;
  },
  dot: (c: number | THREE.ColorRepresentation, s: number, o = 0.9) => {
    const mat = new THREE.PointsMaterial({ color: c, size: s, opacity: o, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    mat.userData = { o0: o };
    return mat;
  },
};

export const createBox = (
  w: number,
  h: number,
  d: number,
  mat: THREE.Material,
  x = 0,
  y = 0,
  z = 0
): THREE.Mesh => {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  return m;
};

export const createLoop4 = (w: number, d: number, y: number, mat: THREE.LineBasicMaterial): THREE.LineLoop => {
  const p = [
    [-w / 2, y, -d / 2],
    [w / 2, y, -d / 2],
    [w / 2, y, d / 2],
    [-w / 2, y, d / 2],
  ].map((v) => new THREE.Vector3(v[0], v[1], v[2]));
  return new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(p), mat);
};

export const createFigure = (bodyMat: THREE.Material, headMat: THREE.Material, scale = 1): THREE.Group => {
  const g = new THREE.Group();
  const h = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 10), headMat);
  h.position.y = 0.62;
  g.add(h);
  const t = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.3, 6, 12), bodyMat);
  t.position.y = 0.33;
  g.add(t);
  const l = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.26, 6, 10), bodyMat);
  g.add(l);
  g.scale.setScalar(scale);
  return g;
};

export const createParts4 = (g: THREE.Group): THREE.Group[] => {
  return [0, 1, 2, 3].map(() => {
    const p = new THREE.Group();
    g.add(p);
    return p;
  });
};

export const pulseMesh = (mesh: THREE.Mesh, v: number, e?: number) => {
  const m = mesh.material as THREE.Material & { opacity: number; userData?: { o0?: number; pk?: number } };
  if (!m) return;
  const o0 = m.userData?.o0 ?? 1;
  const pk = m.userData?.pk ?? 1;
  m.opacity = o0 * v * pk * (e ?? 1);
};

export const computeFitBase = (
  group: THREE.Group,
  viewParams: [number, number, number],
  aspect: number,
  lateralShift: number
): { camPos: THREE.Vector3; center: THREE.Vector3 } | null => {
  const bb = new THREE.Box3().setFromObject(group);
  if (bb.isEmpty()) return null;

  const center = new THREE.Vector3();
  bb.getCenter(center);

  const [az, el, mg] = viewParams;
  const vFov = (40 * Math.PI) / 180;
  const tanV = Math.tan(vFov / 2);
  const tanH = tanV * aspect * (1 - lateralShift);

  const dir = new THREE.Vector3(
    Math.sin(az) * Math.cos(el),
    Math.sin(el),
    Math.cos(az) * Math.cos(el)
  );
  const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), dir).normalize();
  const up = new THREE.Vector3().crossVectors(dir, right).normalize();

  const SW = 0.17;
  const yawA = new THREE.Matrix4().makeRotationY(SW);
  const yawB = new THREE.Matrix4().makeRotationY(-SW);
  const v = new THREE.Vector3();
  const c = new THREE.Vector3();
  let maxD = 0.001;

  for (let i = 0; i < 8; i++) {
    c.set(
      i & 1 ? bb.max.x : bb.min.x,
      i & 2 ? bb.max.y : bb.min.y,
      i & 4 ? bb.max.z : bb.min.z
    ).sub(center);

    for (let s = 0; s < 2; s++) {
      v.copy(c).applyMatrix4(s ? yawA : yawB);
      const z = v.dot(dir);
      const x = Math.abs(v.dot(right));
      const y = Math.abs(v.dot(up));
      maxD = Math.max(maxD, z + x / tanH, z + y / tanV);
    }
  }

  const camPos = dir.multiplyScalar(maxD * mg).add(center);
  return { camPos, center };
};
