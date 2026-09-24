import * as THREE from 'three';
import { M, createBox } from '../sceneUtils';
import { CYAN, EMER } from '../sceneConfig';
import { SceneModelHandle } from './venueBuilders';

interface TierData {
  im: THREE.InstancedMesh;
  n: number;
  rx: number;
  rz: number;
  tr: number;
  y: number;
}

interface BeamData {
  beam: THREE.Mesh;
  head: THREE.Mesh;
}

export const buildArena = (_a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const PW = 5.0;
  const PD = 3.2;

  // 1. Base turf & 10 alternating green stripes
  g.add(createBox(PW, 0.06, PD, M.paint(0x06170e, 1), 0, -1.26, 0));
  for (let i = 0; i < 10; i++) {
    g.add(
      createBox(
        PW / 10,
        0.02,
        PD,
        M.paint(i % 2 ? 0x0b2b18 : 0x082111, 1),
        -PW / 2 + (i + 0.5) * (PW / 10),
        -1.22,
        0
      )
    );
  }

  // 2. Wireframe overlay grid
  const grid = new THREE.Mesh(new THREE.PlaneGeometry(PW, PD, 10, 7), M.wire(EMER, 0.3));
  grid.rotation.x = -Math.PI / 2;
  grid.position.y = -1.2;
  g.add(grid);

  // 3. FIFA markings at 1 u = 21 m — 105×68 m pitch
  const S = PW / 105;
  const ink = M.paint(0xdff3e6, 0.55);
  const LY = -1.19;
  const mk = (w: number, d: number, x: number, z: number) => g.add(createBox(w, 0.02, d, ink, x, LY, z));

  // Touchlines & Goal lines
  mk(0.04, PD, -PW / 2, 0);
  mk(0.04, PD, PW / 2, 0);
  mk(PW, 0.04, 0, -PD / 2);
  mk(PW, 0.04, 0, PD / 2);
  mk(0.04, PD, 0, 0); // Halfway line

  // Penalty areas & Goal boxes
  [-1, 1].forEach((s) => {
    mk(16.5 * S, 0.035, s * (PW / 2 - (16.5 * S) / 2), (-40.32 * S) / 2);
    mk(16.5 * S, 0.035, s * (PW / 2 - (16.5 * S) / 2), (40.32 * S) / 2);
    mk(0.035, 40.32 * S, s * (PW / 2 - 16.5 * S), 0);
    mk(5.5 * S, 0.035, s * (PW / 2 - (5.5 * S) / 2), (-18.32 * S) / 2);
    mk(5.5 * S, 0.035, s * (PW / 2 - (5.5 * S) / 2), (18.32 * S) / 2);
    mk(0.035, 18.32 * S, s * (PW / 2 - 5.5 * S), 0);

    // Penalty spots
    const spot = new THREE.Mesh(new THREE.CircleGeometry(0.022, 16), ink);
    spot.rotation.x = -Math.PI / 2;
    spot.position.set(s * (PW / 2 - 11 * S), LY, 0);
    g.add(spot);

    // Glowing goal posts
    g.add(createBox(0.05, 0.12, 7.32 * S, M.glow(0xeafff4, 0.5), s * (PW / 2 + 0.03), LY + 0.06, 0));
  });

  // Center circle & Center spot
  const cc = new THREE.Mesh(
    new THREE.RingGeometry((9.15 / 2) * S - 0.015, (9.15 / 2) * S + 0.015, 72),
    ink
  );
  cc.rotation.x = -Math.PI / 2;
  cc.position.y = LY;
  g.add(cc);

  const cs = new THREE.Mesh(new THREE.CircleGeometry(0.026, 18), ink);
  cs.rotation.x = -Math.PI / 2;
  cs.position.y = LY;
  g.add(cs);

  // 4. Seating bowl: constant C-value sightline rake y′ = y_f + d′·(y + C − y_f)/d
  const FX = PW / 2;
  const FY = -1.23;
  const CV = 0.075;
  const tiers: TierData[] = [];
  let rx = PW / 2 + 1.05;
  let ey = -1.02;

  for (let tr = 0; tr < 5; tr++) {
    const rz = (rx * (PD + 2.1)) / (PW + 2.1);
    // Ramanujan ellipse circumference approximation
    const per = Math.PI * (3 * (rx + rz) - Math.sqrt((3 * rx + rz) * (rx + 3 * rz)));
    const n = Math.max(52, Math.round(per / 0.3));
    const K = 512;
    const cum = new Float32Array(K + 1);
    let px = rx;
    let pz = 0;

    for (let i = 1; i <= K; i++) {
      const th = (i / K) * Math.PI * 2;
      const qx = Math.cos(th) * rx;
      const qz = Math.sin(th) * rz;
      cum[i] = cum[i - 1] + Math.hypot(qx - px, qz - pz);
      px = qx;
      pz = qz;
    }

    const thetaAt = (s: number) => {
      let lo = 0;
      let hi = K;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (cum[mid] < s) lo = mid;
        else hi = mid;
      }
      const f = (s - cum[lo]) / Math.max(1e-6, cum[hi] - cum[lo]);
      return ((lo + f) / K) * Math.PI * 2;
    };

    const im = new THREE.InstancedMesh(
      new THREE.BoxGeometry(0.2, 0.1, 0.22),
      M.std(0xffffff, 0.6, 0.2),
      n
    );
    const d = new THREE.Object3D();
    const col = new THREE.Color();

    for (let i = 0; i < n; i++) {
      const th = thetaAt((i / n) * cum[K]);
      const ct = Math.cos(th);
      const st = Math.sin(th);
      d.position.set(ct * rx, ey, st * rz);
      d.rotation.set(0, Math.atan2(-rz * ct, -rx * st), -0.24); // inward normal
      d.updateMatrix();
      im.setMatrixAt(i, d.matrix);
      col.setHSL(0.42 - 0.3 * Math.abs(Math.sin(th * 2 + tr)), 0.75, 0.16 + 0.2 * Math.abs(Math.cos(th * 3)));
      im.setColorAt(i, col);
    }
    if (im.instanceColor) im.instanceColor.needsUpdate = true;
    g.add(im);
    tiers.push({ im, n, rx, rz, tr, y: ey });

    // Tier glowing rim edge
    const edge = new THREE.Mesh(
      new THREE.TorusGeometry(rx, 0.012, 6, 160),
      M.glow(tr % 2 ? CYAN : EMER, 0.3)
    );
    edge.rotation.x = Math.PI / 2;
    edge.scale.set(1, rz / rx, 1);
    edge.position.y = ey + 0.07;
    g.add(edge);

    const nx = rx + 0.6;
    ey = FY + ((nx - FX) * (ey + CV - FY)) / (rx - FX);
    rx = nx;
  }

  // 5. Floodlight masts + glowing heads + volumetric beams
  const beams: BeamData[] = [];
  [
    [-4.4, -3.3],
    [4.4, -3.3],
    [4.4, 3.3],
    [-4.4, 3.3],
  ].forEach(([x, z]) => {
    g.add(createBox(0.12, 3.4, 0.12, M.std(0x263239, 0.5, 0.6), x, 0.4, z));
    g.add(createBox(1.0, 0.34, 0.16, M.std(0x2f3d46, 0.4, 0.7), x, 2.2, z));
    const head = createBox(0.94, 0.26, 0.05, M.glow(0xf4fbff, 0.95), x, 2.2, z - Math.sign(z) * 0.1);
    g.add(head);

    const beam = new THREE.Mesh(
      new THREE.ConeGeometry(1.5, 4.4, 28, 1, true),
      M.glow(0xcdf6ff, 0.075)
    );
    beam.position.set(x * 0.55, 0.3, z * 0.55);
    beam.lookAt(new THREE.Vector3(0, -1.2, 0));
    beam.rotateX(Math.PI / 2);
    g.add(beam);
    beams.push({ beam, head });
  });

  // 6. Crowd particle points on tiers
  const crowd = (() => {
    const n = 420;
    const p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const th = Math.random() * Math.PI * 2;
      const T = tiers[Math.floor(Math.random() * tiers.length)];
      p[i * 3] = Math.cos(th) * T.rx;
      p[i * 3 + 1] = T.y + 0.07;
      p[i * 3 + 2] = Math.sin(th) * T.rz;
    }
    const bg = new THREE.BufferGeometry();
    bg.setAttribute('position', new THREE.BufferAttribute(p, 3));
    const pts = new THREE.Points(bg, M.dot(0xbfe9ff, 0.05, 0.5));
    g.add(pts);
    return pts;
  })();

  const dynColor = new THREE.Color();
  let frameCounter = 0;

  return {
    group: g,
    update(t: number) {
      // Pulse floodlight beams and heads
      beams.forEach((b, i) => {
        const k = 0.06 + 0.05 * Math.abs(Math.sin(t * 1.3 + i));
        (b.beam.material as THREE.MeshBasicMaterial).opacity = 0.075 * (k / 0.075);
        (b.head.material as THREE.MeshBasicMaterial).opacity = 0.75 + 0.25 * Math.sin(t * 3 + i);
      });

      // Crowd & grid breathing
      (crowd.material as THREE.PointsMaterial).opacity = 0.3 + 0.2 * Math.abs(Math.sin(t * 2.2));
      (grid.material as THREE.MeshBasicMaterial).opacity = 0.2 + 0.1 * Math.sin(t * 1.1);

      // Seat heatmap dynamic color waves
      if (frameCounter++ % 6 === 0) {
        tiers.forEach(({ im, n, tr }) => {
          for (let i = 0; i < n; i++) {
            const th = (i / n) * Math.PI * 2;
            const v = 0.5 + 0.5 * Math.sin(th * 2 + tr * 0.7 + t * 0.6);
            dynColor.setHSL(0.42 - 0.3 * v, 0.78, 0.12 + 0.22 * v);
            im.setColorAt(i, dynColor);
          }
          if (im.instanceColor) im.instanceColor.needsUpdate = true;
        });
      }
    },
  };
};
