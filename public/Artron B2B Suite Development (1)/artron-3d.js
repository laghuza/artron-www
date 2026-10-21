(function () {
  'use strict';
  const C = { em: 0x2BD397, cy: 0x3CC4F0, am: 0xF2B33D, ink: 0xE6ECF3, dim: 0x56606E, bg: 0x05070B };
  const L = (a, b, t) => a + (b - a) * t;
  const K = (dt, r) => 1 - Math.pow(r || 0.002, dt);
  const pad = n => String(n).padStart(2, '0');
  let _tex;
  function tex() {
    if (_tex) return _tex;
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const g = c.getContext('2d'), r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.16, 'rgba(255,255,255,0.6)');
    r.addColorStop(0.45, 'rgba(255,255,255,0.12)'); r.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = r; g.fillRect(0, 0, 128, 128);
    return (_tex = new THREE.CanvasTexture(c));
  }
  function glow(color, size, op) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex(), color, transparent: true, opacity: op ?? 1, blending: THREE.AdditiveBlending, depthWrite: false }));
    s.scale.set(size, size, 1); return s;
  }
  const std = (color, o) => new THREE.MeshStandardMaterial(Object.assign({ color, metalness: 0.55, roughness: 0.38 }, o || {}));
  const basic = (color, op) => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: op ?? 1, depthWrite: false });
  const addm = (color, op) => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: op ?? 1, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
  function pts(n, size, color, op, vc) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    if (vc) g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    const p = new THREE.Points(g, new THREE.PointsMaterial({ size, map: tex(), color: vc ? 0xffffff : color, vertexColors: !!vc, transparent: true, opacity: op ?? 1, depthWrite: false, blending: THREE.AdditiveBlending }));
    p.frustumCulled = false; return p;
  }
  const edges = (geo, color, op) => new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color, transparent: true, opacity: op ?? 1 }));
  function hitbox(geo, data) { const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })); m.userData = data; return m; }
  function free(o) { o.traverse(x => { x.geometry && x.geometry.dispose(); if (x.material) [].concat(x.material).forEach(m => m.dispose()); }); }

  class Stage {
    constructor(el, o) {
      this.el = el; o = o || {};
      const lite = this.lite = !!o.lite;
      const r = this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: lite ? 'default' : 'high-performance' });
      r.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      r.outputEncoding = THREE.sRGBEncoding; r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.2;
      r.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:pan-y;cursor:grab';
      el.appendChild(r.domElement);
      this.scene = new THREE.Scene(); this.scene.fog = new THREE.FogExp2(C.bg, o.fog ?? 0.035);
      this.cam = new THREE.PerspectiveCamera(o.fov || 36, 1, 0.1, 300);
      this.yaw = this.tYaw = o.yaw ?? 0.6; this.pitch = this.tPitch = o.pitch ?? 0.35; this.dist = this.tDist = o.dist ?? 12;
      this.target = new THREE.Vector3(); this.tTarget = new THREE.Vector3();
      this.auto = o.auto ?? 0.06; this.mouse = new THREE.Vector2(-9, -9); this.ray = new THREE.Raycaster(); this.pick = [];
      this.px = 0; this.py = 0; this.idle = 9; this.t = 0;
      const cv = r.domElement; let drag = null;
      const setM = e => { const b = cv.getBoundingClientRect(); this.mouse.set((e.clientX - b.left) / b.width * 2 - 1, -((e.clientY - b.top) / b.height * 2 - 1)); return b; };
      cv.addEventListener('pointerdown', e => { setM(e); drag = { x: e.clientX, y: e.clientY, yaw: this.tYaw, pitch: this.tPitch, m: 0 }; cv.style.cursor = 'grabbing'; });
      this._pm = e => {
        const b = cv.getBoundingClientRect();
        const inside = e.clientX >= b.left && e.clientX <= b.right && e.clientY >= b.top && e.clientY <= b.bottom;
        if (inside || drag) setM(e); else this.mouse.set(-9, -9);
        if (drag) { const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.m = Math.max(drag.m, Math.abs(dx) + Math.abs(dy)); this.tYaw = drag.yaw - dx * 0.006; this.tPitch = Math.max(-0.15, Math.min(1.25, drag.pitch + dy * 0.004)); this.idle = 0; }
      };
      this._pu = e => { if (drag && drag.m < 6) { setM(e); const h = this.hit(); if (h && this.onPick) this.onPick(h); } if (drag) cv.style.cursor = 'grab'; drag = null; if (e.pointerType && e.pointerType !== 'mouse') this.mouse.set(-9, -9); };
      this._pc = () => { drag = null; this.mouse.set(-9, -9); cv.style.cursor = 'grab'; };
      window.addEventListener('pointermove', this._pm); window.addEventListener('pointerup', this._pu); cv.addEventListener('pointercancel', this._pc);
      const s = this.scene;
      s.add(new THREE.HemisphereLight(0x9cc4ff, 0x05070b, 0.55));
      const d = new THREE.DirectionalLight(0xffffff, 1.1); d.position.set(5, 9, 6); s.add(d);
      const p1 = new THREE.PointLight(C.em, 1.6, 34); p1.position.set(-5, 3, -2); s.add(p1);
      const p2 = new THREE.PointLight(C.cy, 1.0, 34); p2.position.set(6, 2, 5); s.add(p2);
      this.root = new THREE.Group(); s.add(this.root);
      this.ro = new ResizeObserver(() => this.resize()); this.ro.observe(el);
      this.vis = true; this.io = new IntersectionObserver(es => { this.vis = es[es.length - 1].isIntersecting; }, { rootMargin: '80px' }); this.io.observe(el);
      this.clock = new THREE.Clock();
      let acc = 0;
      const loop = () => { this.raf = requestAnimationFrame(loop); const dt = Math.min(0.05, this.clock.getDelta()); if (!this.vis || document.hidden) return; if (lite) { acc += dt; if (acc < 1 / 30) return; const d = Math.min(0.06, acc); acc = 0; this.t += d; this.frame(d); return; } this.t += dt; this.frame(dt); };
      this.resize(); loop();
    }
    hit() { if (!this.pick.length || this.mouse.x < -5) return null; this.ray.setFromCamera(this.mouse, this.cam); const h = this.ray.intersectObjects(this.pick, false)[0]; return h ? h.object : null; }
    resize() { const w = this.el.clientWidth || 1, h = this.el.clientHeight || 1; this.renderer.setSize(w, h, false); this.cam.aspect = w / h; this.cam.updateProjectionMatrix(); this.w = w; this.h = h; this.onResize && this.onResize(w, h); }
    frame(dt) {
      this.idle += dt; if (this.idle > 2.5) this.tYaw += this.auto * dt;
      const k = K(dt, 0.0015);
      this.yaw = L(this.yaw, this.tYaw, k); this.pitch = L(this.pitch, this.tPitch, k); this.dist = L(this.dist, this.tDist, k); this.target.lerp(this.tTarget, k);
      const mx = this.mouse.x > -5 ? this.mouse.x : 0, my = this.mouse.y > -5 ? this.mouse.y : 0;
      this.px = L(this.px, mx * 0.09, k * 0.6); this.py = L(this.py, my * 0.05, k * 0.6);
      const y = this.yaw + this.px, p = this.pitch + this.py, c = this.cam;
      c.position.set(this.target.x + this.dist * Math.cos(p) * Math.sin(y), this.target.y + this.dist * Math.sin(p), this.target.z + this.dist * Math.cos(p) * Math.cos(y));
      c.lookAt(this.target);
      const h = this.hit();
      if (h !== this._hov) { this._hov = h; this.renderer.domElement.style.cursor = h ? 'pointer' : 'grab'; this.onHover && this.onHover(h); }
      this.onFrame && this.onFrame(dt, this.t);
      this.renderer.render(this.scene, c);
    }
    clear() { [...this.root.children].forEach(ch => { this.root.remove(ch); free(ch); }); this.pick = []; this._hov = null; }
    dispose() { cancelAnimationFrame(this.raf); this.ro.disconnect(); this.io.disconnect(); window.removeEventListener('pointermove', this._pm); window.removeEventListener('pointerup', this._pu); this.renderer.domElement.removeEventListener('pointercancel', this._pc); free(this.scene); this.renderer.dispose(); this.renderer.domElement.remove(); }
  }

  const line = (P, color, op) => { const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(P), new THREE.LineBasicMaterial({ color, transparent: true, opacity: Math.min(1, op), depthWrite: false, fog: false, blending: THREE.AdditiveBlending })); l.frustumCulled = false; return l; };
  function mathField(R) {
    const F = new THREE.Group(); R.add(F);
    const V = (x, y, z) => new THREE.Vector3(x, y, z), TAU = Math.PI * 2, PHI = (1 + Math.sqrt(5)) / 2;
    // polar coordinate plane with degree ticks
    const polar = new THREE.Group(); polar.position.y = -3.2; F.add(polar);
    [2, 4, 6, 8, 10, 12].forEach((r, i) => { const P = []; for (let k = 0; k <= 256; k++) { const a = k / 256 * TAU; P.push(V(Math.cos(a) * r, 0, Math.sin(a) * r)); } polar.add(line(P, i % 2 ? C.cy : C.em, i % 2 ? 0.26 : 0.34)); });
    for (let k = 0; k < 24; k++) { const a = k / 24 * TAU; polar.add(line([V(Math.cos(a) * 2, 0, Math.sin(a) * 2), V(Math.cos(a) * 12.6, 0, Math.sin(a) * 12.6)], C.cy, k % 6 ? 0.14 : 0.38)); }
    const tk = []; for (let k = 0; k < 360; k += 2) { const a = k / 180 * Math.PI, l = k % 30 === 0 ? 0.7 : k % 10 === 0 ? 0.35 : 0.16; tk.push(V(Math.cos(a) * 12, 0, Math.sin(a) * 12), V(Math.cos(a) * (12 + l), 0, Math.sin(a) * (12 + l))); }
    polar.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(tk), new THREE.LineBasicMaterial({ color: C.cy, transparent: true, opacity: 0.55, depthWrite: false, fog: false })));
    // golden spiral r = a·φ^(2θ/π) on the plane
    const gs = []; for (let k = 0; k <= 600; k++) { const th = k / 600 * 4 * Math.PI, r = 0.35 * Math.pow(PHI, th * 2 / Math.PI) * 0.62; if (r > 12) break; gs.push(V(Math.cos(th) * r, 0.01, Math.sin(th) * r)); }
    const spiral = line(gs, C.am, 0.75); polar.add(spiral);
    // (2,3) torus knot
    const kn = []; for (let k = 0; k <= 900; k++) { const u = k / 900 * TAU, p = 2, q = 3, rr = 3.4 + 0.9 * Math.cos(q * u); kn.push(V(rr * Math.cos(p * u), 0.9 * Math.sin(q * u), rr * Math.sin(p * u))); }
    const knot = line(kn, C.em, 0.42); F.add(knot);
    // 3D Lissajous (3:4:5)
    const ls = []; for (let k = 0; k <= 1400; k++) { const u = k / 1400 * TAU; ls.push(V(9.5 * Math.sin(3 * u + Math.PI / 2), 4.2 * Math.sin(4 * u), 9.5 * Math.sin(5 * u))); }
    const liss = line(ls, C.cy, 0.24); F.add(liss);
    // Fibonacci sphere lattice (golden angle)
    const FN = 420, fib = pts(FN, 0.1, C.cy, 1), fa = fib.geometry.attributes.position.array, GA = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < FN; i++) { const y = 1 - (i + 0.5) / FN * 2, r = Math.sqrt(1 - y * y), a = i * GA; fa[i * 3] = Math.cos(a) * r * 2.05; fa[i * 3 + 1] = y * 2.05; fa[i * 3 + 2] = Math.sin(a) * r * 2.05; }
    F.add(fib);
    // far geodesic + dual polyhedra
    const geo1 = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(22, 1)), new THREE.LineBasicMaterial({ color: C.cy, transparent: true, opacity: 0.15, depthWrite: false, fog: false })); F.add(geo1);
    const dod = edges(new THREE.DodecahedronGeometry(15, 0), C.em, 0.16); dod.material.fog = false; F.add(dod);
    // sine-wave lattice behind
    const waves = new THREE.Group(); waves.position.set(0, 0.5, -14); F.add(waves);
    const wl = []; for (let r = 0; r < 7; r++) { const P = []; for (let k = 0; k <= 160; k++) P.push(V(-22 + k / 160 * 44, 0, 0)); const l = line(P, r % 2 ? C.cy : C.em, 0.26); l.position.y = (r - 3) * 1.1; waves.add(l); wl.push(l); }
    return {
      frame(dt, t) {
        polar.rotation.y -= dt * 0.012; spiral.rotation.y += dt * 0.05;
        knot.rotation.y += dt * 0.06; knot.material.opacity = 0.38 + Math.sin(t * 0.7) * 0.08;
        liss.rotation.y -= dt * 0.015; liss.rotation.x = Math.sin(t * 0.1) * 0.15;
        fib.rotation.y += dt * 0.1; fib.rotation.x += dt * 0.03; fib.material.fog = false;
        geo1.rotation.y += dt * 0.004; dod.rotation.y -= dt * 0.008; dod.rotation.x += dt * 0.005;
        wl.forEach((l, r) => { const a = l.geometry.attributes.position.array; for (let k = 0; k <= 160; k++) { const x = a[k * 3]; a[k * 3 + 1] = Math.sin(x * 0.42 + t * 0.8 + r * 0.6) * 0.45 * Math.cos(x * 0.07); a[k * 3 + 2] = Math.cos(x * 0.3 + t * 0.5 + r) * 0.5; } l.geometry.attributes.position.needsUpdate = true; });
      }
    };
  }

  /* ───────── HERO · 10-node matrix ───────── */
  function hero(el, o) {
    const S = new Stage(el, { dist: 17, pitch: 0.26, yaw: 0.5, fov: 34, fog: 0.02, auto: o.motion ?? 0.06 });
    const R = S.root, tmp = new THREE.Vector3();
    const st = pts(1800, 0.24, 0x8fa9cc, 0.8); st.material.fog = false;
    const sp = st.geometry.attributes.position.array;
    for (let i = 0; i < 1800; i++) { const u = Math.random() * 2 - 1, a = Math.random() * 6.283, r = 40 + Math.random() * 70, q = Math.sqrt(1 - u * u); sp[i * 3] = r * q * Math.cos(a); sp[i * 3 + 1] = r * u; sp[i * 3 + 2] = r * q * Math.sin(a); }
    R.add(st);
    const DN = 1100, dust = pts(DN, 0.1, C.em, 0.6), dp = dust.geometry.attributes.position.array;
    for (let i = 0; i < DN; i++) { const r = 2.2 + Math.pow(Math.random(), 0.8) * 10, a = Math.random() * 6.283; dp[i * 3] = Math.cos(a) * r; dp[i * 3 + 1] = (Math.random() - 0.5) * 0.12 * r; dp[i * 3 + 2] = Math.sin(a) * r; }
    dust.rotation.x = 0.2; R.add(dust);
    const geo = mathField(R);
    const core = new THREE.Group(); R.add(core);
    const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(1.0, 4), std(0x0A1320, { emissive: C.em, emissiveIntensity: 0.38, metalness: 0.85, roughness: 0.2 }));
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.45, 1), new THREE.MeshBasicMaterial({ color: C.cy, wireframe: true, transparent: true, opacity: 0.42 }));
    const shell2 = new THREE.Mesh(new THREE.IcosahedronGeometry(1.8, 0), new THREE.MeshBasicMaterial({ color: C.em, wireframe: true, transparent: true, opacity: 0.2 }));
    core.add(inner, shell, shell2, glow(C.em, 6.5, 0.55), glow(C.cy, 13, 0.14));
    const rings = [2.3, 2.75, 3.2].map((r, i) => { const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.011, 6, 200), addm(i === 1 ? C.em : C.cy, 0.55)); m.rotation.set(Math.PI / 2 + (i - 1) * 0.55, i * 0.7, 0); core.add(m); return m; });
    const orbits = [{ r: 4.7, tilt: 0.3, n: 4, sp: 0.05, off: 0.4 }, { r: 7.6, tilt: -0.2, n: 6, sp: -0.03, off: 0 }].map(d => {
      const g = new THREE.Group(); g.rotation.x = d.tilt; g.rotation.z = d.tilt * 0.5; R.add(g);
      const spin = new THREE.Group(); g.add(spin);
      const path = new THREE.Mesh(new THREE.TorusGeometry(d.r, 0.009, 4, 300), addm(C.cy, 0.24)); path.rotation.x = Math.PI / 2; g.add(path);
      return Object.assign(d, { g, spin });
    });
    const nodes = [];
    for (let i = 0; i < 10; i++) {
      const O = i < 4 ? orbits[0] : orbits[1], j = i < 4 ? i : i - 4, a = O.off + j / O.n * Math.PI * 2;
      const g = new THREE.Group(); g.position.set(Math.cos(a) * O.r, 0, Math.sin(a) * O.r); O.spin.add(g);
      const mat = std(0x0E1724, { emissive: C.cy, emissiveIntensity: 0.95 });
      const body = new THREE.Mesh(new THREE.OctahedronGeometry(0.3, 0), mat);
      const cage = new THREE.Mesh(new THREE.OctahedronGeometry(0.54, 0), new THREE.MeshBasicMaterial({ color: C.cy, wireframe: true, transparent: true, opacity: 0.55 }));
      const gl = glow(C.cy, 1.8, 0.55);
      const hit = hitbox(new THREE.SphereGeometry(0.8, 8, 8), { i }); S.pick.push(hit);
      g.add(body, cage, gl, hit);
      const lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
      const line = new THREE.Line(lg, new THREE.LineBasicMaterial({ color: C.cy, transparent: true, opacity: 0.15, depthWrite: false, blending: THREE.AdditiveBlending }));
      line.frustumCulled = false; R.add(line);
      const pulse = glow(C.em, 0.7, 0.9); R.add(pulse);
      let lab = null;
      if (o.labels !== false) { lab = document.createElement('div'); lab.style.cssText = 'position:absolute;left:0;top:0;z-index:0;transition:opacity .3s;pointer-events:none;font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:0.14em;color:#7A8697;white-space:nowrap;will-change:transform;text-shadow:0 0 12px #05070B'; el.appendChild(lab); }
      nodes.push({ g, body, cage, gl, mat, line, pulse, lab, ph: Math.random(), s: 1, w: new THREE.Vector3(), txt: '' });
    }
    const wave = new THREE.Mesh(new THREE.RingGeometry(0.9, 0.97, 64), addm(C.am, 0)); R.add(wave);
    let waveT = 9, sel = -1, hov = -1;
    S.onHover = h => { hov = h ? h.userData.i : -1; o.onHover && o.onHover(hov); };
    S.onPick = h => o.onSelect && o.onSelect(h.userData.i);
    const cA = new THREE.Color(C.am), cC = new THREE.Color(C.cy), cE = new THREE.Color(C.em), base = new THREE.Vector3();
    S.onResize = (w, h) => { const a = w / h; base.set(0, -0.4, 0); S.tDist = a > 1.6 ? 19 : a > 1.1 ? 22 : 30; S.cam.clearViewOffset(); };
    S.resize();
    S.onFrame = (dt, t) => {
      const k = K(dt, 0.001);
      core.rotation.y += dt * 0.15; shell.rotation.x -= dt * 0.1; shell2.rotation.y -= dt * 0.22;
      inner.scale.setScalar(1 + Math.sin(t * 1.6) * 0.035);
      rings.forEach((r, i) => { r.rotation.z += dt * (0.2 + i * 0.12) * (i % 2 ? -1 : 1); });
      dust.rotation.y += dt * 0.02;
      geo.frame(dt, t);
      orbits.forEach(O => { O.spin.rotation.y += dt * O.sp; });
      nodes.forEach((n, i) => {
        const on = i === sel, hv = i === hov;
        n.s = L(n.s, on ? 1.7 : hv ? 1.35 : 1, k);
        n.body.scale.setScalar(n.s); n.cage.scale.setScalar(n.s);
        n.body.rotation.y += dt * (on ? 1.6 : 0.5); n.cage.rotation.y -= dt * 0.4; n.cage.rotation.x += dt * 0.3;
        const tc = on ? cA : cC;
        n.mat.emissive.lerp(tc, k); n.cage.material.color.lerp(tc, k); n.gl.material.color.lerp(tc, k);
        n.gl.scale.setScalar(L(n.gl.scale.x, on ? 3.6 : hv ? 2.5 : 1.8, k));
        n.g.getWorldPosition(n.w);
        const a = n.line.geometry.attributes.position.array; a[3] = n.w.x; a[4] = n.w.y; a[5] = n.w.z; n.line.geometry.attributes.position.needsUpdate = true;
        n.line.material.opacity = L(n.line.material.opacity, on ? 0.9 : hv ? 0.45 : 0.14, k); n.line.material.color.lerp(tc, k);
        const f = (t * (on ? 0.9 : 0.32) + n.ph) % 1;
        n.pulse.position.copy(n.w).multiplyScalar(on ? f : 1 - f);
        n.pulse.material.color.copy(on ? cA : cE); n.pulse.material.opacity = Math.sin(f * Math.PI) * (on ? 1 : 0.55);
        if (n.lab) {
          tmp.copy(n.w).project(S.cam);
          const x = (tmp.x * 0.5 + 0.5) * S.w, y = (-tmp.y * 0.5 + 0.5) * S.h;
          const lw = n.lab.offsetWidth || 0, lx = x + 16 + lw > S.w - 16 ? x - 16 - lw : x + 16;
          n.lab.style.transform = 'translate(' + Math.max(8, lx).toFixed(1) + 'px,' + (y - 24).toFixed(1) + 'px)';
          const blk = (x > S.w - 200 && y < 110) || (x > S.w - 300 && y > S.h - 70);
          n.lab.style.opacity = tmp.z < 1 && !blk ? 1 : 0;
          const txt = (on || hv) ? pad(i) + ' · ' + o.titles[i] : pad(i);
          if (txt !== n.txt) { n.txt = txt; n.lab.textContent = txt; }
          n.lab.style.color = on ? '#F2B33D' : hv ? '#E6ECF3' : '#7A8697';
        }
      });
      if (sel >= 0) { waveT += dt; const n = nodes[sel], p = Math.min(1, waveT / 1.5); wave.position.copy(n.w); wave.lookAt(S.cam.position); wave.scale.setScalar(1 + p * 1.6); wave.material.opacity = (1 - p) * 0.6; }
      S.tTarget.copy(base); if (sel >= 0) S.tTarget.addScaledVector(nodes[sel].w, 0.16);
    };
    return {
      select(i) { if (i !== sel) { sel = i; waveT = 0; } },
      setMotion(m) { S.auto = m; },
      dispose() { nodes.forEach(n => n.lab && n.lab.remove()); S.dispose(); }
    };
  }

  /* ───────── MODULE SCENES ───────── */
  function bTurn(S) {
    const R = S.root, metal = std(0x1A2433, { metalness: 0.85, roughness: 0.28 }), dark = std(0x0F1620, { metalness: 0.6, roughness: 0.5 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.14, 2.6), dark); base.position.y = -1.43; R.add(base);
    const strips = [];
    [-1, 1].forEach(sx => {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.3, 1.9), metal); p.position.set(sx * 2.15, -0.2, 0); R.add(p);
      const top = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.05, 1.94), std(0x0B1119, { metalness: 0.2, roughness: 0.2 })); top.position.set(sx * 2.15, 0.97, 0); R.add(top);
      const sm = basic(C.dim, 1); strips.push(sm);
      [0.62, -0.62].forEach(z => { const s = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.8, 0.03), sm); s.position.set(sx * 1.89, -0.2, z); R.add(s); });
    });
    const reader = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.04, 0.4), std(0x0A1018, { emissive: C.cy, emissiveIntensity: 1 })); reader.position.set(-2.15, 1.01, 0.5); R.add(reader);
    const rg = glow(C.cy, 1.2, 0.6); rg.position.copy(reader.position); R.add(rg);
    const hub = new THREE.Group(); hub.position.set(-1.65, 0.35, 0); hub.rotation.z = -0.62; R.add(hub);
    const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.55, 40), metal); drum.rotation.z = Math.PI / 2; hub.add(drum);
    const capM = std(0x0A1018, { emissive: C.am, emissiveIntensity: 1.3 });
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.15, 24, 16), capM); cap.position.x = 0.32; hub.add(cap);
    const capG = glow(C.am, 1.4, 0.7); capG.position.x = 0.34; hub.add(capG);
    const spin = new THREE.Group(); spin.position.x = 0.22; hub.add(spin);
    for (let k = 0; k < 3; k++) { const ag = new THREE.CylinderGeometry(0.05, 0.05, 1.75, 20); ag.translate(0, 1.05, 0); const arm = new THREE.Mesh(ag, std(0xC9D3DE, { metalness: 1, roughness: 0.12 })); arm.rotation.x = k * Math.PI * 2 / 3; spin.add(arm); }
    const beam = new THREE.Mesh(new THREE.PlaneGeometry(3.75, 1.8), addm(C.em, 0)); beam.position.set(0, -0.2, 0.62); R.add(beam);
    const ringF = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.6, 64), addm(C.em, 0.3)); ringF.rotation.x = -Math.PI / 2; ringF.position.set(0, -1.34, 1.9); R.add(ringF);
    let tr = 0, cur = 0, open = false, ow = 0;
    const cOn = new THREE.Color(C.em), cOff = new THREE.Color(C.dim), cAm = new THREE.Color(C.am);
    return {
      dist: 9.5, pitch: 0.36, ty: -0.3,
      update(d) { tr = d.rot * Math.PI / 180; open = d.open; },
      frame(dt, t) {
        cur = L(cur, tr, K(dt, 0.03)); spin.rotation.x = cur;
        ow = L(ow, open ? 1 : 0, K(dt, 0.001));
        strips.forEach(m => m.color.copy(cOff).lerp(cOn, ow));
        capM.emissive.copy(cAm).lerp(cOn, ow); capG.material.color.copy(capM.emissive);
        beam.material.opacity = ow * (0.1 + Math.sin(t * 9) * 0.03);
        ringF.material.opacity = 0.2 + ow * 0.7; ringF.scale.setScalar(1 + ow * 0.25 * (1 + Math.sin(t * 4)));
        reader.material.emissiveIntensity = 0.6 + Math.sin(t * 3) * 0.4;
      }
    };
  }

  function bBook(S, o) {
    const R = S.root, cells = [], cC = new THREE.Color(C.cy);
    for (let f = 0; f < 3; f++) for (let h = 0; h < 6; h++) {
      const x = (h - 2.5) * 1.25, z = (f - 1) * 1.75;
      const plate = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.06, 1.48), std(0x0F1621)); plate.position.set(x, -1.46, z); R.add(plate);
      const bg = new THREE.BoxGeometry(1.0, 1, 1.36); bg.translate(0, 0.5, 0);
      const mat = std(0x13202E, { emissive: C.em, emissiveIntensity: 0, metalness: 0.45, roughness: 0.32 });
      const blk = new THREE.Mesh(bg, mat); blk.position.set(x, -1.43, z); blk.scale.y = 0.01; R.add(blk);
      const eg = edges(new THREE.BoxGeometry(1.0, 0.02, 1.36), C.cy, 0.35); eg.position.set(x, -1.41, z); R.add(eg);
      const hit = hitbox(new THREE.BoxGeometry(1.1, 0.9, 1.48), { f, h }); hit.position.set(x, -1.0, z); R.add(hit); S.pick.push(hit);
      const gl = glow(C.am, 2.4, 0); gl.position.set(x, -0.6, z); R.add(gl);
      cells.push({ blk, mat, eg, gl, st: 0, y: 0.01, dl: (f * 6 + h) * 0.03 });
    }
    let hov = null;
    const cE = new THREE.Color(C.em), cA = new THREE.Color(C.am);
    return {
      dist: 12.5, pitch: 0.74, ty: -1,
      update(d) { d.cells.forEach((row, f) => row.forEach((s, h) => { cells[f * 6 + h].st = s; })); },
      hover(h) { hov = h ? h.userData : null; },
      pick(h) { const u = h.userData, st = cells[u.f * 6 + u.h].st; if (st === 0 && o.onBook) o.onBook(u.f, u.h); else if (st === 3 && o.onCancel) o.onCancel(u.f, u.h); },
      frame(dt, t) {
        const k = K(dt, 0.004);
        cells.forEach((c, i) => {
          if (c.dl > 0) { c.dl -= dt; return; }
          const s = c.st, isH = hov && hov.f * 6 + hov.h === i && (s === 0 || s === 3);
          const ty = s === 2 ? 0.92 : (s === 1 || s === 3) ? 0.62 + (isH ? 0.12 : 0) : s === 4 ? 0.01 : isH ? 0.14 : 0.01;
          c.y = L(c.y, ty, s === 4 ? K(dt, 0.0004) : k); c.blk.scale.y = c.y;
          c.mat.emissive.lerp(s === 3 ? cC : s === 4 ? cA : cE, k);
          c.mat.emissiveIntensity = L(c.mat.emissiveIntensity, s === 2 ? 1.3 : s === 3 ? 0.62 + Math.sin(t * 2.4 + i) * 0.12 : s === 4 ? 0.9 : s ? 0.3 + Math.sin(t * 2 + i) * 0.04 : isH ? 0.7 : 0, k);
          c.eg.material.color.lerp(s === 4 ? cA : cC, k);
          c.eg.material.opacity = L(c.eg.material.opacity, (s === 1 || s === 2 || s === 3) ? 0 : s === 4 ? 1 : isH ? 1 : 0.35, k);
          c.gl.material.color.lerp(s === 4 ? cA : cE, k);
          c.gl.material.opacity = L(c.gl.material.opacity, (s === 2 || s === 4) ? 0.85 : s === 3 ? 0.16 : 0, k);
          c.gl.position.y = -1.43 + c.y + 0.1;
        });
      }
    };
  }

  function bCyber(S) {
    const R = S.root;
    const shellM = new THREE.MeshBasicMaterial({ color: C.cy, wireframe: true, transparent: true, opacity: 0.3 });
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(2.6, 2), shellM); R.add(shell);
    const skin = new THREE.Mesh(new THREE.SphereGeometry(2.58, 48, 32), basic(C.cy, 0.035)); R.add(skin);
    const srv = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.2, 0.9), std(0x101A28, { emissive: C.cy, emissiveIntensity: 0.22, metalness: 0.8, roughness: 0.25 })); R.add(srv);
    srv.add(edges(new THREE.BoxGeometry(0.92, 1.22, 0.92), C.cy, 0.8));
    const leds = []; for (let i = 0; i < 3; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.04, 0.02), basic(C.em, 1)); m.position.set(0, -0.35 + i * 0.35, 0.462); srv.add(m); leds.push(m); }
    const srvG = glow(C.cy, 3.6, 0.45); R.add(srvG);
    const cloud = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), new THREE.MeshBasicMaterial({ color: C.em, wireframe: true, transparent: true, opacity: 0.9 })); cloud.position.y = 4.6; R.add(cloud);
    const cloudG = glow(C.em, 2.6, 0.6); cloudG.position.y = 4.6; R.add(cloudG);
    const AN = 130, att = pts(AN, 0.17, C.am, 0.95), ap = att.geometry.attributes.position.array, A = [];
    for (let i = 0; i < AN; i++) A.push({ d: new THREE.Vector3().randomDirection(), r: 2.8 + Math.random() * 5, v: 1 + Math.random() * 1.6 });
    R.add(att);
    const hits = []; for (let i = 0; i < 12; i++) { const g = glow(C.am, 1, 0); R.add(g); hits.push({ g, t: 9 }); }
    let hi = 0;
    const SN = 70, syn = pts(SN, 0.15, C.em, 1), sp = syn.geometry.attributes.position.array, sT = Array.from({ length: SN }, () => Math.random()); R.add(syn);
    const QN = 240, que = pts(QN, 0.13, C.am, 1), qp = que.geometry.attributes.position.array;
    for (let i = 0; i < QN; i++) { const a = i * 2.39996, r = 0.95 + (i % 6) * 0.13; qp[i * 3] = Math.cos(a) * r; qp[i * 3 + 1] = -0.6 + ((i * 7) % 13) / 11; qp[i * 3 + 2] = Math.sin(a) * r; }
    que.geometry.setDrawRange(0, 0); R.add(que);
    let online = true, q = 0, on = 1;
    const cC = new THREE.Color(C.cy), cA = new THREE.Color(C.am);
    return {
      dist: 12.5, pitch: 0.28, ty: 0.7,
      update(d) { online = d.online; q = Math.min(QN, d.queued * 2); },
      frame(dt, t) {
        on = L(on, online ? 1 : 0, K(dt, 0.003));
        shell.rotation.y += dt * 0.08; shell.rotation.x += dt * 0.03;
        shellM.color.copy(cA).lerp(cC, on); skin.material.color.copy(shellM.color); srvG.material.color.copy(shellM.color);
        srv.rotation.y += dt * 0.25;
        leds.forEach((m, i) => { m.material.opacity = 0.35 + 0.65 * Math.max(0, Math.sin(t * 6 + i * 1.7)); });
        for (let i = 0; i < AN; i++) {
          const a = A[i]; a.r -= a.v * dt;
          if (a.r < 2.68) { const h = hits[hi++ % hits.length]; h.g.position.copy(a.d).multiplyScalar(2.62); h.t = 0; a.r = 6 + Math.random() * 3; a.d.randomDirection(); }
          ap[i * 3] = a.d.x * a.r; ap[i * 3 + 1] = a.d.y * a.r; ap[i * 3 + 2] = a.d.z * a.r;
        }
        att.geometry.attributes.position.needsUpdate = true;
        hits.forEach(h => { h.t += dt; const p = Math.min(1, h.t / 0.6); h.g.material.opacity = (1 - p) * 0.95; h.g.scale.setScalar(0.4 + p * 1.6); });
        for (let i = 0; i < SN; i++) { sT[i] = (sT[i] + dt * 0.35) % 1; const u = sT[i], a = u * 12 + i; sp[i * 3] = Math.cos(a) * 0.3 * (1 - u); sp[i * 3 + 1] = 0.6 + u * 4; sp[i * 3 + 2] = Math.sin(a) * 0.3 * (1 - u); }
        syn.geometry.attributes.position.needsUpdate = true; syn.material.opacity = on;
        cloud.material.opacity = 0.15 + on * 0.75; cloudG.material.opacity = on * 0.6; cloud.rotation.y += dt;
        que.geometry.setDrawRange(0, Math.round(q)); que.rotation.y += dt * 0.4;
      }
    };
  }

  function bMig(S) {
    const R = S.root, src = [], N = 70, v = new THREE.Vector3();
    const cp = new THREE.Vector3(3.4, 0, 0);
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.85, 3), std(0x0A1320, { emissive: C.em, emissiveIntensity: 0.45, metalness: 0.85, roughness: 0.2 })); core.position.copy(cp); R.add(core);
    const coreW = new THREE.Mesh(new THREE.IcosahedronGeometry(1.25, 1), new THREE.MeshBasicMaterial({ color: C.em, wireframe: true, transparent: true, opacity: 0.35 })); coreW.position.copy(cp); R.add(coreW);
    const coreG = glow(C.em, 5, 0.5); coreG.position.copy(cp); R.add(coreG);
    [-1.9, 0, 1.9].forEach((z, i) => {
      const p = new THREE.Vector3(-3.6, -0.3, z);
      const cage = edges(new THREE.BoxGeometry(1.1, 1.1, 1.1), C.em, 0.7); cage.position.copy(p); R.add(cage);
      const fg = new THREE.BoxGeometry(0.96, 0.96, 0.96); fg.translate(0, 0.48, 0);
      const fill = new THREE.Mesh(fg, std(0x12202E, { emissive: C.cy, emissiveIntensity: 0.5 })); fill.position.set(p.x, p.y - 0.48, p.z); fill.scale.y = 0.02; R.add(fill);
      const curve = new THREE.QuadraticBezierCurve3(p.clone().add(new THREE.Vector3(0.6, 0, 0)), new THREE.Vector3(0, 2.3 - i * 0.35, z * 0.4), cp.clone());
      R.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(64)), new THREE.LineBasicMaterial({ color: C.cy, transparent: true, opacity: 0.2 })));
      const P = pts(N, 0.17, C.em, 0); R.add(P);
      src.push({ cage, fill, curve, P, ts: Array.from({ length: N }, () => Math.random()), p: 100 });
    });
    let run = false, ro = 0, flash = 0;
    return {
      dist: 11.5, pitch: 0.42, ty: 0,
      update(d) { if (run && !d.run) flash = 1; run = d.run; d.mig.forEach((p, i) => { src[i].p = p; src[i].cage.material.color.set(p >= 100 ? C.em : C.cy); }); },
      frame(dt, t) {
        const k = K(dt, 0.01); ro = L(ro, run ? 1 : 0.14, k);
        core.rotation.y += dt * 0.3; coreW.rotation.y -= dt * 0.2; coreW.rotation.x += dt * 0.1;
        flash = Math.max(0, flash - dt * 0.7); coreG.scale.setScalar(5 + flash * 5 + ro * 1.2); coreG.material.opacity = 0.45 + flash * 0.45;
        src.forEach(s => {
          s.fill.scale.y = L(s.fill.scale.y, Math.max(0.02, 1 - s.p / 100), K(dt, 0.02));
          const a = s.P.geometry.attributes.position.array;
          for (let i = 0; i < N; i++) { s.ts[i] = (s.ts[i] + dt * (0.12 + ro * 0.55)) % 1; s.curve.getPoint(s.ts[i], v); a[i * 3] = v.x; a[i * 3 + 1] = v.y + Math.sin(t * 3 + i) * 0.04; a[i * 3 + 2] = v.z; }
          s.P.geometry.attributes.position.needsUpdate = true; s.P.material.opacity = ro;
        });
      }
    };
  }

  function bRoi(S) {
    const R = S.root, MAX = 64, coins = [], stacks = 5;
    const geo = new THREE.CylinderGeometry(0.62, 0.62, 0.11, 56);
    const mat = std(0x1C3A2F, { emissive: C.em, emissiveIntensity: 0.2, metalness: 0.95, roughness: 0.2 });
    const rimG = new THREE.TorusGeometry(0.62, 0.013, 6, 72), rimM = addm(C.em, 0.7);
    for (let i = 0; i < MAX; i++) {
      const s = i % stacks, lvl = Math.floor(i / stacks), g = new THREE.Group();
      const c = new THREE.Mesh(geo, mat), r = new THREE.Mesh(rimG, rimM); r.rotation.x = Math.PI / 2; r.position.y = 0.056; g.add(c, r);
      const x = (s - 2) * 1.45, z = (s % 2) * 0.6 - 0.3;
      g.userData = { x, z, y: -1.44 + 0.055 + lvl * 0.125, cy: 8, vy: 0, on: false, rz: (Math.random() - 0.5) * 0.3 };
      g.position.set(x, 8, z); g.visible = false; R.add(g); coins.push(g);
    }
    const HN = 130, hp = pts(HN, 0.14, C.cy, 0.95), ha = hp.geometry.attributes.position.array;
    for (let i = 0; i < HN; i++) { const a = i / HN * Math.PI * 2; ha[i * 3] = Math.cos(a) * 4.6; ha[i * 3 + 1] = -0.6 + Math.sin(a * 3) * 0.35; ha[i * 3 + 2] = Math.sin(a) * 4.6; }
    hp.geometry.setDrawRange(0, 0); R.add(hp);
    let n = 0, hrs = 0;
    return {
      dist: 11.5, pitch: 0.34, ty: -0.2,
      update(d) { n = Math.max(1, Math.min(MAX, Math.round(d.annual / 2000))); hrs = Math.min(HN, Math.round(d.hours / 4)); },
      frame(dt, t) {
        coins.forEach((c, i) => {
          const u = c.userData, want = i < n;
          if (want && !u.on) { u.on = true; c.visible = true; u.cy = u.y + 3 + (i % 7) * 0.35; u.vy = 0; }
          if (!want && u.on) u.on = false;
          if (u.on) { if (u.cy > u.y) { u.vy -= 24 * dt; u.cy = Math.max(u.y, u.cy + u.vy * dt); } }
          else if (c.visible) { u.cy += 10 * dt; if (u.cy > 7) c.visible = false; }
          c.position.set(u.x, u.cy, u.z); c.rotation.y = u.rz;
        });
        hp.geometry.setDrawRange(0, hrs); hp.rotation.y += dt * 0.15;
      }
    };
  }

  function bOkr(S) {
    const R = S.root, G = new THREE.Group(); G.rotation.x = -1.05; R.add(G);
    const cE = new THREE.Color(C.em), cD = new THREE.Color(C.dim), cA = new THREE.Color(C.am);
    const rs = [1.5, 2.3, 3.1].map(r => {
      G.add(new THREE.Mesh(new THREE.TorusGeometry(r, 0.04, 8, 200), basic(0x223040, 0.7)));
      const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.12, 12, 4, 0.01), std(0x10261E, { emissive: C.em, emissiveIntensity: 0.85, metalness: 0.6, roughness: 0.3 })); G.add(m);
      const tip = glow(C.em, 1.3, 0.95); G.add(tip);
      return { r, m, tip, cur: 0, tgt: 0, last: -1 };
    });
    const heart = new THREE.Mesh(new THREE.IcosahedronGeometry(0.45, 2), std(0x0A1320, { emissive: C.em, emissiveIntensity: 0.5 })); R.add(heart);
    R.add(glow(C.em, 3.2, 0.4));
    return {
      dist: 10, pitch: 0.5, ty: 0,
      update(d) { d.p.forEach((p, i) => { rs[i].tgt = p; }); },
      frame(dt, t) {
        const k = K(dt, 0.01); G.rotation.z += dt * 0.06; heart.rotation.y += dt * 0.5;
        rs.forEach(o => {
          o.cur = L(o.cur, o.tgt, k);
          const arc = Math.max(0.01, Math.min(100, o.cur) / 100 * Math.PI * 2);
          if (Math.abs(arc - o.last) > 0.003) { o.m.geometry.dispose(); o.m.geometry = new THREE.TorusGeometry(o.r, 0.12, 12, Math.max(4, Math.round(arc * 40)), arc); o.last = arc; }
          o.m.material.emissive.lerp(o.cur >= 99.5 ? cA : o.cur >= 70 ? cE : cD, k);
          o.tip.material.color.copy(o.m.material.emissive);
          o.tip.position.set(Math.cos(arc) * o.r, Math.sin(arc) * o.r, 0);
          o.tip.scale.setScalar(1.3 + Math.sin(t * 4) * 0.15);
        });
      }
    };
  }

  function bKpi(S) {
    const R = S.root, bars = [], N = 12;
    for (let i = 0; i < N; i++) {
      const g = new THREE.BoxGeometry(0.56, 1, 0.56); g.translate(0, 0.5, 0);
      const last = i === N - 1;
      const m = new THREE.Mesh(g, std(last ? 0x0F2A20 : 0x152030, { emissive: last ? C.em : C.cy, emissiveIntensity: last ? 0.95 : 0.07, metalness: 0.5, roughness: 0.32 }));
      m.position.set((i - 5.5) * 0.82, -1.45, 0); m.scale.y = 0.01; R.add(m);
      const e = edges(g, last ? C.em : C.cy, last ? 0.9 : 0.28); e.position.copy(m.position); e.scale.y = 0.01; R.add(e);
      bars.push({ m, e, h: 0.01, t: 0.01, dl: i * 0.06 });
    }
    const topG = glow(C.em, 2.4, 0.8); R.add(topG);
    const lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    const line = new THREE.Line(lg, new THREE.LineBasicMaterial({ color: C.em, transparent: true, opacity: 0.75 })); line.frustumCulled = false; R.add(line);
    const dots = pts(N, 0.24, C.em, 1); dots.geometry.setAttribute('position', lg.attributes.position); R.add(dots);
    return {
      dist: 12.5, pitch: 0.26, ty: 0.7,
      update(d) { d.bars.forEach((v, i) => { bars[i].t = v / 52 * 4.6; }); },
      frame(dt, t) {
        const k = K(dt, 0.01), a = lg.attributes.position.array;
        bars.forEach((b, i) => {
          if (b.dl > 0) b.dl -= dt; else b.h = L(b.h, b.t, k);
          b.m.scale.y = b.e.scale.y = b.h;
          a[i * 3] = b.m.position.x; a[i * 3 + 1] = -1.45 + b.h + 0.18; a[i * 3 + 2] = 0;
        });
        lg.attributes.position.needsUpdate = true;
        const b = bars[N - 1]; topG.position.set(b.m.position.x, -1.45 + b.h + 0.2, 0); topG.material.opacity = 0.6 + Math.sin(t * 3) * 0.25;
      }
    };
  }

  function bRet(S) {
    const R = S.root, G = new THREE.Group(); R.add(G);
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.6, 3), std(0x0A1320, { emissive: C.em, emissiveIntensity: 0.55, metalness: 0.85, roughness: 0.2 })); R.add(core);
    R.add(glow(C.em, 4, 0.5));
    const CN = 700, cl = pts(CN, 0.09, C.em, 0.7), ca = cl.geometry.attributes.position.array, v = new THREE.Vector3();
    for (let i = 0; i < CN; i++) { v.randomDirection().multiplyScalar(1.2 + Math.random() * 1.4); ca[i * 3] = v.x; ca[i * 3 + 1] = v.y * 0.7; ca[i * 3 + 2] = v.z; }
    R.add(cl);
    const thr = new THREE.Mesh(new THREE.TorusGeometry(4.6, 0.01, 4, 240), addm(C.am, 0.35)); thr.rotation.x = Math.PI / 2; G.add(thr);
    const safe = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.008, 4, 200), addm(C.em, 0.35)); safe.rotation.x = Math.PI / 2; G.add(safe);
    const cA = new THREE.Color(C.am), cE = new THREE.Color(C.em);
    const ms = [0, 1, 2, 3].map(i => {
      const a = i / 4 * Math.PI * 2 + 0.4;
      const mat = std(0x1A1408, { emissive: C.am, emissiveIntensity: 1.1 });
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 16), mat); G.add(s);
      const gl = glow(C.am, 1.6, 0.8); G.add(gl);
      const lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
      const ln = new THREE.Line(lg, new THREE.LineBasicMaterial({ color: C.am, transparent: true, opacity: 0.4 })); ln.frustumCulled = false; G.add(ln);
      return { a, s, mat, gl, ln, r: 6, tr: 6, sent: false, y: (i % 2 ? 0.4 : -0.3) };
    });
    return {
      dist: 13.5, pitch: 0.55, ty: 0,
      update(d) { d.risk.forEach((r, i) => { ms[i].sent = d.sent[i]; ms[i].tr = d.sent[i] ? 2.8 : 3 + r / 100 * 3.5; }); },
      frame(dt, t) {
        const k = K(dt, 0.02); G.rotation.y += dt * 0.08; cl.rotation.y += dt * 0.12; core.rotation.y += dt * 0.4;
        ms.forEach((m, i) => {
          m.r = L(m.r, m.tr, k);
          const a = m.a + t * 0.05 * (i % 2 ? 1 : -1), x = Math.cos(a) * m.r, z = Math.sin(a) * m.r, y = m.y + Math.sin(t + i) * 0.1;
          m.s.position.set(x, y, z); m.gl.position.set(x, y, z);
          const p = m.ln.geometry.attributes.position.array; p[3] = x; p[4] = y; p[5] = z; m.ln.geometry.attributes.position.needsUpdate = true;
          const c = m.sent ? cE : cA; m.mat.emissive.lerp(c, k); m.gl.material.color.lerp(c, k); m.ln.material.color.lerp(c, k);
        });
      }
    };
  }

  function bHeat(S, o) {
    const R = S.root, cols = [];
    const cS = new THREE.Color(0x1A2738), cE = new THREE.Color(C.em), cA = new THREE.Color(C.am), tc = new THREE.Color();
    for (let d = 0; d < 7; d++) for (let b = 0; b < 6; b++) {
      const g = new THREE.BoxGeometry(0.8, 1, 0.8); g.translate(0, 0.5, 0);
      const m = new THREE.Mesh(g, std(0x152030, { emissive: C.em, emissiveIntensity: 0.3, metalness: 0.35, roughness: 0.38 }));
      m.position.set((b - 2.5) * 0.96, -1.45, (d - 3) * 0.96); m.scale.y = 0.01; m.userData = { d, b }; R.add(m); S.pick.push(m);
      cols.push({ m, h: 0.01, t: 0.1, v: 0, dl: (d + b) * 0.045 });
    }
    const sg = new THREE.BoxGeometry(0.86, 1, 0.86); sg.translate(0, 0.5, 0);
    const selE = edges(sg, C.ink, 1); R.add(selE);
    const selG = glow(C.am, 2.6, 0.9); R.add(selG);
    let sel = [0, 0], hov = null;
    return {
      dist: 12, pitch: 0.72, ty: -0.6,
      update(d) { d.load.forEach((row, di) => row.forEach((v, bi) => { const c = cols[di * 6 + bi]; c.v = v; c.t = 0.1 + v / 100 * 3.4; })); sel = d.sel; },
      hover(h) { hov = h ? h.userData : null; },
      pick(h) { o.onPick && o.onPick(h.userData.d, h.userData.b); },
      frame(dt, t) {
        const k = K(dt, 0.008);
        cols.forEach((c, i) => {
          const v = c.v / 100;
          if (v > 0.85) tc.copy(cE).lerp(cA, Math.min(1, (v - 0.85) / 0.12)); else tc.copy(cS).lerp(cE, Math.max(0, (v - 0.15) / 0.7));
          c.m.material.emissive.copy(tc); c.m.material.emissiveIntensity = 0.12 + v * 0.9;
          if (c.dl > 0) { c.dl -= dt; return; }
          const isH = hov && hov.d * 6 + hov.b === i;
          c.h = L(c.h, c.t + (isH ? 0.3 : 0), k); c.m.scale.y = c.h;
        });
        const sc = cols[sel[0] * 6 + sel[1]];
        selE.position.copy(sc.m.position); selE.scale.y = sc.h + 0.002;
        selG.position.set(sc.m.position.x, -1.45 + sc.h + 0.25, sc.m.position.z); selG.material.opacity = 0.7 + Math.sin(t * 4) * 0.2;
      }
    };
  }

  function bCamp(S) {
    const R = S.root, MAX = 220;
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.7, 3), std(0x0A1320, { emissive: C.em, emissiveIntensity: 0.55, metalness: 0.85, roughness: 0.2 })); R.add(core);
    const cw = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 1), new THREE.MeshBasicMaterial({ color: C.em, wireframe: true, transparent: true, opacity: 0.3 })); R.add(cw);
    const cg = glow(C.em, 4.5, 0.5); R.add(cg);
    const P = pts(MAX, 0.2, 0xffffff, 1, true), pa = P.geometry.attributes.position.array, pc = P.geometry.attributes.color.array;
    const home = [], away = [], v = new THREE.Vector3();
    for (let i = 0; i < MAX; i++) {
      v.randomDirection(); away.push(v.clone().multiplyScalar(5.2 + Math.random() * 3).multiply(new THREE.Vector3(1, 0.45, 1)));
      v.randomDirection(); home.push(v.clone().multiplyScalar(1.4 + Math.random() * 0.9));
      pa[i * 3] = away[i].x; pa[i * 3 + 1] = away[i].y; pa[i * 3 + 2] = away[i].z; pc[i * 3] = 0.29; pc[i * 3 + 1] = 0.35; pc[i * 3 + 2] = 0.44;
    }
    R.add(P);
    let n = 0, react = 0, pulse = 0, last = 0;
    const sp = Array.from({ length: MAX }, () => 0.4 + Math.random() * 0.8);
    return {
      dist: 13, pitch: 0.42, ty: 0,
      update(d) { n = Math.min(MAX, d.n); if (d.react > last) pulse = 1; last = d.react; react = d.react; P.geometry.setDrawRange(0, n); },
      frame(dt, t) {
        P.rotation.y += dt * 0.05; core.rotation.y += dt * 0.4; cw.rotation.y -= dt * 0.25;
        pulse = Math.max(0, pulse - dt * 2); cg.scale.setScalar(4.5 + pulse * 1.5);
        for (let i = 0; i < n; i++) {
          const back = i < react, T = back ? home[i] : away[i], k = K(dt, back ? 0.08 / sp[i] : 0.3);
          pa[i * 3] = L(pa[i * 3], T.x, k); pa[i * 3 + 1] = L(pa[i * 3 + 1], T.y, k); pa[i * 3 + 2] = L(pa[i * 3 + 2], T.z, k);
          pc[i * 3] = L(pc[i * 3], back ? 0.17 : 0.29, k); pc[i * 3 + 1] = L(pc[i * 3 + 1], back ? 0.83 : 0.35, k); pc[i * 3 + 2] = L(pc[i * 3 + 2], back ? 0.59 : 0.44, k);
        }
        P.geometry.attributes.position.needsUpdate = true; P.geometry.attributes.color.needsUpdate = true;
      }
    };
  }

  const BUILD = [bTurn, bBook, bCyber, bMig, bRoi, bOkr, bKpi, bRet, bHeat, bCamp];

  function renaissance(S, lite, P) {
    P = P || { hemi: 0xE8D2AE, gnd: 0x050403, key: 0xFFE0B2, can: 0xFFB067, rim: 0x9DB8E8, ln: 0xC9A46A, sp: 0xE8C690 };
    const r = S.renderer, sc = S.scene, PHI = (1 + Math.sqrt(5)) / 2, TAU = Math.PI * 2, V = (x, y, z) => new THREE.Vector3(x, y, z);
    r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFShadowMap; r.toneMappingExposure = 1.02;
    sc.children.slice().forEach(l => {
      if (l.isHemisphereLight) { l.color.set(P.hemi); l.groundColor.set(P.gnd); l.intensity = 0.2; }
      else if (l.isDirectionalLight) { l.color.set(P.key); l.intensity = 2.1; l.position.set(-6.5, 10.5, 4.2); l.castShadow = true; const c = l.shadow.camera; c.left = c.bottom = -9; c.right = c.top = 9; c.near = 1; c.far = 40; l.shadow.mapSize.set(lite ? 1024 : 2048, lite ? 1024 : 2048); l.shadow.radius = 5; l.shadow.bias = -0.0005; l.shadow.normalBias = 0.02; }
      else if (l.isPointLight) l.intensity *= 0.45;
    });
    const candle = new THREE.PointLight(P.can, 1.5, 24); candle.position.set(-3.6, 2.4, 3.4); sc.add(candle);
    const rim = new THREE.DirectionalLight(P.rim, 0.4); rim.position.set(7, 3.5, -8); sc.add(rim);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.ShadowMaterial({ opacity: 0.62 })); floor.rotation.x = -Math.PI / 2; floor.position.y = -1.5; floor.receiveShadow = true; sc.add(floor);
    const LN = P.ln, G = new THREE.Group(); G.position.y = -1.495; sc.add(G);
    const ring = (rad, op, seg) => { const P = []; for (let k = 0; k <= (seg || 160); k++) { const a = k / (seg || 160) * TAU; P.push(V(Math.cos(a) * rad, 0, Math.sin(a) * rad)); } G.add(line(P, LN, op)); };
    for (let k = 0; k < 6; k++) ring(0.9 * Math.pow(PHI, k), 0.34 - k * 0.045);
    const sq = (h, op, rot) => { const P = [V(-h, 0, -h), V(h, 0, -h), V(h, 0, h), V(-h, 0, h), V(-h, 0, -h)].map(p => p.applyAxisAngle(V(0, 1, 0), rot)); G.add(line(P, LN, op)); };
    const R4 = 0.9 * Math.pow(PHI, 4);
    sq(R4, 0.16, 0); sq(R4 / Math.SQRT2, 0.12, Math.PI / 4); sq(R4 / Math.SQRT2, 0.12, 0);
    const tk = []; for (let k = 0; k < 120; k++) { const a = k / 120 * TAU, l = k % 10 === 0 ? 0.55 : 0.18; tk.push(V(Math.cos(a) * R4, 0, Math.sin(a) * R4), V(Math.cos(a) * (R4 + l), 0, Math.sin(a) * (R4 + l))); }
    G.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(tk), new THREE.LineBasicMaterial({ color: LN, transparent: true, opacity: 0.32, depthWrite: false, fog: false })));
    const gs = []; for (let k = 0; k <= 520; k++) { const th = k / 520 * 4.5 * Math.PI, rr = 0.12 * Math.pow(PHI, th * 2 / Math.PI); if (rr > R4) break; gs.push(V(Math.cos(th) * rr, 0.002, Math.sin(th) * rr)); }
    G.add(line(gs, P.sp, 0.22));
    return (dt, t) => { candle.intensity = 1.5 + Math.sin(t * 7.3) * 0.07 + Math.sin(t * 13.7 + 1.3) * 0.05 + Math.sin(t * 2.1) * 0.04; G.rotation.y += dt * 0.012; };
  }

  function module(el, o) {
    const min = o.mood === 'mineral', ren = o.mood === 'renaissance' || min;
    if (min) Object.assign(C, { em: 0x10B981, cy: 0xBAE6FD, am: 0xF59E0B, ink: 0xF0F9FF, dim: 0x3A4A5C, bg: 0x030508 });
    else if (ren) Object.assign(C, { cy: 0xD9B77A, am: 0xE0A458, ink: 0xEFE8DA, dim: 0x6E6452, bg: 0x0A0907 });
    const S = new Stage(el, { dist: 11, pitch: 0.5, yaw: 0.7, fov: 34, fog: ren ? 0.03 : 0.04, auto: o.motion ?? 0.05, lite: o.lite });
    const grid = new THREE.GridHelper(40, 40, 0x1E2C40, 0x0F1824); grid.material.transparent = true; grid.material.opacity = 0.75; grid.position.y = -1.5; grid.visible = !ren; S.scene.add(grid);
    const pool = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.MeshBasicMaterial({ map: tex(), color: min ? 0xBAE6FD : ren ? 0xE8C690 : C.em, transparent: true, opacity: ren ? 0.11 : 0.2, blending: THREE.AdditiveBlending, depthWrite: false })); pool.rotation.x = -Math.PI / 2; pool.position.y = -1.49; S.scene.add(pool);
    const renFrame = ren ? renaissance(S, o.lite, min ? { hemi: 0xBAE6FD, gnd: 0x030508, key: 0xF0F9FF, can: 0xD97706, rim: 0xBAE6FD, ln: 0xBAE6FD, sp: 0xF0F9FF } : null) : null;
    const shade = () => { if (ren) S.root.traverse(m => { if (m.isMesh && m.material && m.material.isMeshStandardMaterial) { m.castShadow = true; m.receiveShadow = true; } }); };
    let cur = -1, B = null, sc = 1;
    const fit = () => { if (!B) return; const a = S.cam.aspect, f = a >= 1.8 ? 1 : Math.min(1.7, Math.pow(1.8 / a, 0.65)); S.tDist = B.dist * f; S.scene.fog.density = 0.04 / (f * f); };
    S.onResize = fit;
    S.onFrame = (dt, t) => { sc = L(sc, 1, K(dt, 0.004)); S.root.scale.setScalar(sc); B && B.frame && B.frame(dt, t); renFrame && renFrame(dt, t); };
    S.onPick = h => B && B.pick && B.pick(h);
    S.onHover = h => B && B.hover && B.hover(h);
    return {
      set(node, data) {
        if (node !== cur) {
          S.clear(); cur = node; B = BUILD[node](S, o); sc = 0.82; shade();
          S.tPitch = B.pitch ?? 0.5; S.tTarget.set(0, B.ty || 0, 0); S.tYaw = Math.round(S.tYaw / 6.283) * 6.283 + 0.62; fit();
        }
        B.update(data);
      },
      setMotion(m) { S.auto = m; },
      dispose() { S.dispose(); }
    };
  }

  window.Artron3D = { hero, module };
})();
