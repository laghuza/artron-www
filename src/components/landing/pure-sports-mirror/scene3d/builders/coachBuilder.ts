import * as THREE from 'three';
import { M, createBox, createLoop4, createFigure, createParts4 } from '../sceneUtils';
import { CYAN } from '../sceneConfig';
import { SceneModelHandle } from './venueBuilders';

export const buildCoach = (a: number): SceneModelHandle => {
  const g = new THREE.Group();
  const acts: ((t: number, dt: number) => void)[] = [];
  const P = createParts4(g);

  // 0 · SCALE — Staff command table + tactics board + head coach
  {
    const suit = M.std(0x1e2a35, 0.6, 0.25);
    const hd = M.glow(a, 0.9);
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.62, 0.16, 56), M.std(0x121a23, 0.55, 0.35));
    disc.position.y = -0.78;
    P[0].add(disc);

    const top = new THREE.Mesh(new THREE.CircleGeometry(1.46, 56), M.glow(CYAN, 0.13));
    top.rotation.x = -Math.PI / 2;
    top.position.y = -0.69;
    P[0].add(top);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.52, 0.014, 8, 90), M.glow(a, 0.7));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.7;
    P[0].add(ring);

    P[0].add(createBox(0.9, 0.62, 0.9, M.std(0x0e151d, 0.6, 0.3), 0, -1.15, 0));

    const st: THREE.Group[] = [];
    const sp = new Float32Array(10 * 6);
    const sg = new THREE.BufferGeometry();
    sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));

    for (let i = 0; i < 10; i++) {
      const th = (i / 10) * Math.PI * 2;
      const f = createFigure(suit, hd, 0.9);
      f.position.set(Math.cos(th) * 2.16, -1.3, Math.sin(th) * 2.16);
      f.rotation.y = -th + Math.PI / 2;
      P[0].add(f);
      st.push(f);
      sp[i * 6] = Math.cos(th) * 1.5;
      sp[i * 6 + 1] = -0.68;
      sp[i * 6 + 2] = Math.sin(th) * 1.5;
      sp[i * 6 + 3] = Math.cos(th) * 2.0;
      sp[i * 6 + 4] = -0.9;
      sp[i * 6 + 5] = Math.sin(th) * 2.0;
    }
    P[0].add(new THREE.LineSegments(sg, M.line(a, 0.2)));

    // Tactics board pitch markings on the table
    const L = M.line(0xffffff, 0.6);
    const y = -0.684;
    P[0].add(createLoop4(1.9, 1.2, y, L));
    P[0].add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, y, -0.6), new THREE.Vector3(0, y, 0.6)]), L));
    const cc = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.216, 40), M.glow(0xffffff, 0.55));
    cc.rotation.x = -Math.PI / 2;
    cc.position.y = y;
    P[0].add(cc);
    [-1, 1].forEach((sx) => {
      const b = createLoop4(0.3, 0.6, y, L);
      b.position.x = sx * 0.8;
      P[0].add(b);
    });

    // 5 pairs of red and blue tactical magnets oscillating on pitch
    const mags: { m: THREE.Mesh; x: number; i: number }[] = [];
    [[-0.62, -0.3], [-0.62, 0.3], [-0.32, 0], [-0.2, -0.42], [-0.2, 0.42]].forEach(([mx, mz], i) =>
      [1, -1].forEach((sd) => {
        const m = new THREE.Mesh(
          new THREE.CylinderGeometry(0.05, 0.05, 0.03, 16),
          M.paint(sd > 0 ? 0xff5a5a : 0x4aa8ff, 0.95)
        );
        m.position.set(mx * sd, y + 0.016, mz * sd);
        P[0].add(m);
        mags.push({ m, x: mx * sd, i });
      })
    );

    // Standing Head Coach with clipboard
    const hc = createFigure(M.std(a, 0.55, 0.2), M.glow(0xffffff, 0.95), 1.08);
    hc.position.set(0, -1.3, 2.0);
    P[0].add(hc);
    hc.add(createBox(0.2, 0.26, 0.02, M.paint(0xf2f6fa, 0.95), 0.1, 0.38, -0.16));
    hc.add(createBox(0.08, 0.03, 0.03, M.paint(0x8a98a6, 0.95), 0.1, 0.51, -0.16));

    acts.push((t) => {
      st.forEach((f, i) => {
        f.position.y = -1.3 + Math.sin(t * 1.1 + i * 0.7) * 0.02;
      });
      const o0 = (ring.material as THREE.Material & { userData: { o0?: number } }).userData.o0 ?? 0.7;
      (ring.material as THREE.Material).opacity = o0 * (0.6 + 0.4 * Math.sin(t * 1.4));
      mags.forEach((g) => {
        g.m.position.x = g.x + Math.sin(t * 0.7 + g.i) * 0.05;
      });
    });
  }

  // 1 · DISCIPLINES — Holographic game model pitch + passing nodes + cones + ball
  {
    const hb = new THREE.Group();
    hb.position.set(0, 0.92, 0);
    hb.rotation.x = -0.18;
    P[1].add(hb);

    const pl = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.0), M.glow(CYAN, 0.05));
    pl.rotation.x = -Math.PI / 2;
    hb.add(pl);

    const gm = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.0, 10, 7), M.wire(CYAN, 0.22));
    gm.rotation.x = -Math.PI / 2;
    hb.add(gm);

    hb.add(createLoop4(3.2, 2.0, 0.004, M.line(a, 0.55)));
    const cc = new THREE.Mesh(new THREE.RingGeometry(0.28, 0.3, 48), M.glow(a, 0.5));
    cc.rotation.x = -Math.PI / 2;
    cc.position.y = 0.004;
    hb.add(cc);

    // 11 player nodes
    const nodes = [
      [-1.35, 0], [-0.8, -0.62], [-0.8, 0.62], [-0.2, -0.3], [-0.2, 0.3],
      [0.35, -0.7], [0.35, 0], [0.35, 0.7], [0.95, -0.4], [0.95, 0.4], [1.4, 0]
    ].map(([x, z], i) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.07, 14, 10), M.glow(i ? a : 0xffffff, 0.95));
      m.position.set(x, 0.06, z);
      hb.add(m);
      return { m, x, z, i };
    });

    const pass = new THREE.BufferGeometry();
    const pp = new Float32Array(6 * 6);
    pass.setAttribute('position', new THREE.BufferAttribute(pp, 3));
    hb.add(new THREE.LineSegments(pass, M.line(a, 0.5)));

    // Real pitch markings on hologram
    const L = M.line(0xffffff, 0.5);
    hb.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0.005, -1), new THREE.Vector3(0, 0.005, 1)]), L));
    [-1, 1].forEach((sx) => {
      const b = createLoop4(0.5, 1.1, 0.005, L);
      b.position.x = sx * 1.35;
      hb.add(b);
      const gl = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.2, 0.5), M.wire(0xffffff, 0.55));
      gl.position.set(sx * 1.68, 0.1, 0);
      hb.add(gl);
    });

    // 5 Orange training cones
    for (let i = 0; i < 5; i++) {
      const c = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.09, 12), M.paint(0xffb347, 0.95));
      c.position.set(-0.9 + i * 0.3, 0.045, 0.82);
      hb.add(c);
    }

    // Animated soccer ball
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.05, 14, 10), M.paint(0xffffff, 0.98));
    hb.add(ball);

    acts.push((t) => {
      nodes.forEach((n) => {
        n.m.position.x = n.x + Math.sin(t * 0.6 + n.i) * 0.09;
        n.m.position.z = n.z + Math.cos(t * 0.5 + n.i * 1.3) * 0.07;
      });
      const k = Math.floor(t * 1.1);
      for (let j = 0; j < 6; j++) {
        const A = nodes[(j * 3 + k) % nodes.length].m;
        const B = nodes[(j * 5 + 3 + k) % nodes.length].m;
        pp[j * 6] = A.position.x;
        pp[j * 6 + 1] = 0.06;
        pp[j * 6 + 2] = A.position.z;
        pp[j * 6 + 3] = B.position.x;
        pp[j * 6 + 4] = 0.06;
        pp[j * 6 + 5] = B.position.z;
      }
      pass.attributes.position.needsUpdate = true;
      const gmO0 = (gm.material as THREE.Material & { userData: { o0?: number } }).userData.o0 ?? 0.22;
      (gm.material as THREE.Material).opacity = gmO0 * (0.7 + 0.3 * Math.sin(t * 1.1));
      ball.position.set(Math.sin(t * 0.55) * 1.3, 0.05 + Math.abs(Math.sin(t * 2.2)) * 0.08, Math.sin(t * 1.1) * 0.55);
    });
  }

  // 2 · TECHNOLOGY — GPS Telemetry / RPE / ACWR gauges + Stopwatch + Satellite linked athlete
  {
    const G = new THREE.Group();
    G.position.set(2.85, 0.25, 0);
    G.rotation.y = -0.5;
    P[2].add(G);

    G.add(new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.3), M.glow(CYAN, 0.05)));
    G.add(new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.3, 6, 5), M.wire(CYAN, 0.14)));

    const arcs = [0, 1, 2].map((i) => {
      const m = new THREE.Mesh(
        new THREE.RingGeometry(0.22 + i * 0.11, 0.26 + i * 0.11, 48, 1, 0, Math.PI * 1.2),
        M.glow(i === 2 ? a : CYAN, 0.7)
      );
      m.position.set(0, 0.16, 0.03);
      G.add(m);
      return m;
    });

    const bars = [0, 1, 2, 3, 4].map((i) => {
      const b = createBox(0.1, 0.3, 0.02, M.glow(a, 0.75), -0.56 + i * 0.16, -0.44, 0.03);
      G.add(b);
      return b;
    });

    const sat = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 8), M.glow(0xffffff, 0.95));
    G.add(sat);

    const orb = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.005, 6, 80), M.glow(a, 0.32));
    orb.rotation.x = 1.25;
    G.add(orb);

    // Stopwatch
    const sw = new THREE.Group();
    sw.position.set(1.02, 0.42, 0.08);
    G.add(sw);
    sw.add(new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.024, 10, 40), M.paint(0xeaf4ff, 0.95)));
    sw.add(createBox(0.07, 0.07, 0.04, M.paint(0xeaf4ff, 0.95), 0, 0.21, 0));
    const hand = new THREE.Group();
    sw.add(hand);
    hand.add(createBox(0.014, 0.13, 0.01, M.glow(a, 0.95), 0, 0.065, 0.01));

    // Athlete in orange GPS vest
    const ath = createFigure(M.std(0x1e2a35, 0.6, 0.25), M.glow(0xffffff, 0.9), 1.0);
    ath.position.set(0.15, -1.55, 0.6);
    G.add(ath);
    ath.add(createBox(0.25, 0.2, 0.25, M.paint(0xffb347, 0.9), 0, 0.42, 0));
    ath.add(createBox(0.07, 0.05, 0.04, M.glow(0xffffff, 0.95), 0, 0.5, -0.14));

    // Satellite laser link line
    const lg = new THREE.BufferGeometry();
    const lp = new Float32Array(6);
    lg.setAttribute('position', new THREE.BufferAttribute(lp, 3));
    G.add(new THREE.Line(lg, M.line(a, 0.45)));

    acts.push((t) => {
      arcs.forEach((m, i) => {
        m.rotation.z = t * (0.5 - i * 0.14) * (i % 2 ? -1 : 1);
      });
      bars.forEach((b, i) => {
        const h = 0.14 + 0.4 * (0.5 + 0.5 * Math.sin(t * 1.3 + i * 0.8));
        b.scale.y = h / 0.3;
        b.position.y = -0.58 + h / 2;
      });
      sat.position.set(Math.cos(t * 0.9) * 0.66, 0.16 + Math.sin(t * 0.9) * 0.22, Math.sin(t * 0.9) * 0.42);
      hand.rotation.z = -t * 2.4;
      lp[0] = 0.15;
      lp[1] = -1.05;
      lp[2] = 0.46;
      lp[3] = Math.cos(t * 0.9) * 0.66;
      lp[4] = 0.16 + Math.sin(t * 0.9) * 0.22;
      lp[5] = Math.sin(t * 0.9) * 0.42;
      lg.attributes.position.needsUpdate = true;
      ath.position.y = -1.55 + Math.abs(Math.sin(t * 3)) * 0.03;
    });
  }

  // 3 · STANDARDS — Licence wall + Blinking warning + Coach ID badge on lanyard
  {
    const G = new THREE.Group();
    G.position.set(-2.9, 0.4, 0);
    G.rotation.y = 0.5;
    P[3].add(G);

    G.add(new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.6), M.glow(CYAN, 0.045)));
    G.add(new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.6, 6, 6), M.wire(CYAN, 0.16)));

    const cards = [0, 1, 2, 3, 4].map((i) => {
      const c = new THREE.Group();
      c.position.set(0, 0.6 - i * 0.3, 0.03);
      G.add(c);
      c.add(createBox(1.4, 0.2, 0.02, M.std(0x16202a, 0.5, 0.3)));
      const tick = createBox(0.1, 0.1, 0.02, M.glow(i === 3 ? 0xffb347 : a, 0.9), -0.6, 0, 0.02);
      c.add(tick);
      c.add(createBox(0.7, 0.03, 0.02, M.glow(CYAN, 0.5), -0.05, 0.04, 0.02));
      c.add(createBox(0.45, 0.025, 0.02, M.glow(CYAN, 0.28), -0.18, -0.03, 0.02));
      return { tick, i };
    });

    // Coach ID badge on lanyard
    const bd = new THREE.Group();
    bd.position.set(1.15, -0.05, 0.14);
    G.add(bd);
    bd.add(createBox(0.42, 0.58, 0.02, M.paint(0xeaf4ff, 0.95)));
    bd.add(createBox(0.42, 0.08, 0.025, M.paint(a, 0.95), 0, 0.25, 0));
    bd.add(createBox(0.2, 0.2, 0.01, M.paint(0x2a3a48, 0.95), 0, 0.07, 0.016));
    const ph = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 8), M.paint(0x9fb4c4, 0.95));
    ph.position.set(0, 0.1, 0.03);
    bd.add(ph);
    bd.add(createBox(0.12, 0.05, 0.01, M.paint(0x9fb4c4, 0.95), 0, 0.005, 0.022));
    [-0.1, -0.17].forEach((yy, i) =>
      bd.add(createBox(0.3 - i * 0.1, 0.03, 0.01, M.paint(0x2a3a48, 0.95), 0, yy, 0.016))
    );
    bd.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-0.12, 0.29, 0),
          new THREE.Vector3(0, 0.72, 0),
          new THREE.Vector3(0.12, 0.29, 0),
        ]),
        M.line(a, 0.8)
      )
    );

    acts.push((t) => {
      cards.forEach((c) => {
        const tickMat = c.tick.material as THREE.Material & { userData: { o0?: number } };
        const o0 = tickMat.userData.o0 ?? 0.9;
        tickMat.opacity = o0 * (c.i === 3 ? 0.35 + 0.65 * Math.abs(Math.sin(t * 3)) : 0.9);
      });
      bd.rotation.z = Math.sin(t * 0.8) * 0.06;
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
