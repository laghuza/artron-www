// <artron-scene variant="gym|pool|court|octagon|arena|human-*|trophy|podium|passport|medals|academy"
//                accent="#hex" focus="0..3"> — procedural WebGL sports digital twins
(() => {
  const SRC = 'https://unpkg.com/three@0.184.0/build/three.module.js';
  const GOLD = 0xffd700, CYAN = 0x00f0ff, EMER = 0x00ff88, WHITE = 0xeaf4ff;

  // per-variant orbit pose: [azimuth, elevation, fitMargin] — distance is solved from the
  // built group's bounding sphere:  d = r·margin / sin(min(vFov, hFov)/2)
  const VIEW = {
    gym: [0, 0.30, 1.05], pool: [0, 0.33, 1.04], court: [0, 0.32, 1.04], octagon: [0, 0.31, 1.06],
    arena: [0, 0.37, 1.03], human: [0, 0.17, 1.10], trophy: [0, 0.24, 1.04], podium: [0, 0.24, 1.04],
    passport: [0, 0.11, 1.12], medals: [0, 0.13, 1.10], academy: [0, 0.30, 1.03],
    coach: [0, 0.30, 1.06], med: [0, 0.24, 1.08], group: [0, 0.32, 1.05],
    ops: [0, 0.30, 1.06], guard: [0, 0.36, 1.04]
  };

  // per spec-tile camera poses: [camX, camY, camZ, tgtX, tgtY, tgtZ]
  const FOCUS = {
    gym: [[0, 4.4, 6.6, 0, -1.2, 0], [-1.1, 0.5, 1.6, -1.0, -0.8, -2.0], [-3.3, 0.4, 1.3, -3.9, -0.7, 0.5], [2.7, 0.8, 2.7, 2.4, -0.8, 0.8]],
    pool: [[0, 4.8, 7.4, 0, -0.9, 0], [3.2, 0.3, 3.4, 0.5, -0.8, 0], [-4.0, 0.3, 2.0, -4.6, -0.6, 0], [0, 1.1, 4.8, 0, -0.8, 2.2]],
    court: [[0, 5.2, 6.2, 0, -1.0, 0], [-3.9, 0.7, 3.2, -2.0, -0.85, 0], [0.9, 0.15, 2.1, 0, -0.5, 0], [0, 0.9, 5.6, 0, -0.35, 1.9]],
    octagon: [[0, 4.4, 5.6, 0, -1.1, 0], [1.7, 0.3, 2.3, 0, -1.0, 0], [2.3, 0.7, 2.5, 2.0, -0.35, 1.2], [0, -0.2, 4.4, 0, -0.9, 0]],
    arena: [[0, 6.6, 9.4, 0, -1.0, 0], [0, 1.5, 4.8, 0, -1.15, 0], [4.8, 2.8, 4.2, 3.9, 0.5, 3.0], [0, 2.2, 7.8, 0, 0.1, 0]],
    human: [[0, 1.7, 5.2, 0, 0.35, 0], [0.9, 0.7, 3.2, 0.05, 0.3, 0], [-0.9, 0.6, 2.6, -0.1, 0.55, 0], [0, 1.9, 4.4, 0, 1.15, 0]],
    trophy: [[0, 1.7, 6.6, 0, -0.1, 0], [-3.6, 1.0, 3.0, -2.95, 0.25, 0], [3.6, 0.9, 3.0, 2.95, 0.15, 0], [0, 1.6, 5.2, 0, -0.62, 2.55]],
    podium: [[0, 1.8, 6.8, 0, -0.3, 0], [-3.6, 0.9, 3.0, -2.95, 0.2, 0], [3.6, 0.9, 3.0, 2.95, 0.2, 0], [0, 1.6, 5.2, 0, -0.66, 2.55]],
    passport: [[0, 0.7, 4.6, 0, 0, 0], [-1.0, 0.35, 2.4, -0.7, 0.2, 0], [1.0, 0.2, 2.2, 0.8, -0.3, 0], [0, 1.9, 3.4, 0, 0, 0]],
    medals: [[0, 0.9, 5.2, 0, 0, 0], [-1.7, 0.4, 2.6, -1.4, 0.05, 0], [0, 0.2, 2.4, 0, 0.1, 0], [1.7, 0.5, 2.8, 1.4, 0, 0]],
    academy: [[0, 3.2, 7.2, 0, -0.5, 0], [-3.7, 1.0, 3.1, -2.95, 0.05, 0], [3.7, 1.0, 3.1, 2.95, 0.3, 0], [0, 1.6, 5.3, 0, -0.66, 2.6]],
    coach: [[0, 3.4, 5.8, 0, -0.6, 0], [0, 2.2, 3.0, 0, 0.9, 0], [3.6, 1.0, 2.4, 2.85, 0.25, 0], [-3.8, 1.0, 2.2, -2.9, 0.4, 0]],
    med: [[0, 2.8, 5.4, 0, -0.5, 0], [1.3, 1.1, 2.4, 0, 0.2, 0], [3.4, 1.1, 2.4, 2.7, 0.45, 0], [-3.7, 0.9, 2.4, -2.8, -0.6, 0]],
    group: [[0, 3.8, 6.2, 0, -0.8, 0], [0, 2.2, 5.2, 0, -0.9, 1.4], [0, 1.7, 0.4, 0, 1.05, -2.2], [-1.37, 1.3, -0.17, -2.6, 0.55, -2.0]],
    ops: [[0, 3.6, 5.8, 0, -0.5, 0], [0, 1.8, 3.2, 0, -0.95, 0], [1.85, 0.5, 2.11, 3.0, -0.25, 0], [-4.2, 0.6, 2.4, -2.9, -0.1, 0]],
    guard: [[0, 4.2, 6.6, 0, -0.9, 0], [2.4, 1.6, 3.4, 1.0, -0.9, 0.4], [0, 2.0, 3.4, 0, 0.3, 0], [-4.6, 1.2, 2.0, -3.5, 0.1, 0]]
  };

  class ArtronScene extends HTMLElement {
    static get observedAttributes() { return ['variant', 'accent', 'focus', 'shift']; }

    connectedCallback() {
      if (this._booted) return;
      this._booted = true;
      this.style.cssText = 'display:block;position:absolute;inset:0;width:100%;height:100%;overflow:hidden';
      this._boot();
    }

    attributeChangedCallback(n) {
      if (!this._ready) return;
      if (n === 'focus') this._applyFocus();
      else if (n === 'shift') { if (this._node) this._fitBase(); this._applyFocus(); }
      else this._swap();
    }

    disconnectedCallback() {
      cancelAnimationFrame(this._raf);
      if (this._ro) this._ro.disconnect();
    }

    async _boot() {
      const THREE = await import(SRC);
      this.THREE = THREE;
      const p = this.parentElement;
      const w = this.clientWidth || (p && p.clientWidth) || 900;
      const h = this.clientHeight || (p && p.clientHeight) || 600;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      renderer.setSize(w, h, false);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
      this.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x060911, 0.044);
      scene.environment = studioEnv(THREE);

      const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 120);
      camera.position.set(0, 2.5, 7.4);
      this._fov0 = 40;

      scene.add(new THREE.AmbientLight(0xbcd8ff, 0.5));
      const key = new THREE.DirectionalLight(0xffffff, 1.5); key.position.set(3.5, 7, 5); scene.add(key);
      const rim = new THREE.DirectionalLight(0x00d0ff, 0.9); rim.position.set(-6, 2.5, -4); scene.add(rim);
      const fill = new THREE.PointLight(0x00ff99, 18, 22, 2); fill.position.set(0, 1.5, 4); scene.add(fill);
      this._sweep = new THREE.PointLight(0xfff0c0, 22, 20, 2); this._sweep.position.set(3, 2, 3); scene.add(this._sweep);

      const grid = new THREE.GridHelper(48, 72, 0x0d1a26, 0x0a1219);
      grid.position.y = -1.42; grid.material.transparent = true; grid.material.opacity = 0.55; scene.add(grid);
      const glow = new THREE.Mesh(new THREE.PlaneGeometry(26, 26), new THREE.MeshBasicMaterial({
        map: radialTex(THREE), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
      }));
      glow.rotation.x = -Math.PI / 2; glow.position.y = -1.4; scene.add(glow);

      this._amb = ambientField(THREE); scene.add(this._amb.group);
      this._rays = lightRays(THREE); scene.add(this._rays.group);

      Object.assign(this, {
        renderer, scene, camera, _exiting: [], _enter: 0, _dolly: 0,
        _pointer: { x: 0, y: 0 }, _tgt: new THREE.Vector3(), _tgtGoal: new THREE.Vector3(),
        _centre: new THREE.Vector3(), _view: VIEW.gym, _camBase: new THREE.Vector3(0, 2.5, 7.4)
      });

      this._ro = new ResizeObserver(() => this._resize());
      this._ro.observe(this);
      this.addEventListener('pointermove', e => {
        const r = this.getBoundingClientRect();
        this._pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        this._pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      });

      this._ready = true;
      this._swap();
      this._clock = new THREE.Clock();
      const loop = () => { this._raf = requestAnimationFrame(loop); this._frame(); };
      loop();
    }

    _resize() {
      const w = this.clientWidth, h = this.clientHeight;
      if (!w || !h || !this.renderer) return;
      this.renderer.setSize(w, h, false);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      if (this._node) { this._fitBase(); this._applyFocus(); }
    }

    _shiftFrac() {
      return Math.max(0, Math.min(0.5, parseFloat(this.getAttribute('shift') || '0') || 0));
    }

    // frame the subject from its bounding box — no hand-tuned camera numbers.
    // For a corner at depth z toward the lens and lateral offset x, the exact
    // requirement is  d ≥ z + x / tan(fov/2);  take the max over all 8 corners.
    // The horizontal term uses the FREE part of the canvas (1 − shift), because the
    // projection window is slid left by shift/2 to clear the HUD.
    _fitBase() {
      const THREE = this.THREE;
      const bb = new THREE.Box3().setFromObject(this._node.group);
      if (bb.isEmpty()) return;
      bb.getCenter(this._centre);
      const [az, el, mg] = this._view;
      const vFov = this._fov0 * Math.PI / 180;
      const tanV = Math.tan(vFov / 2);
      const tanH = tanV * this.camera.aspect * (1 - this._shiftFrac());
      const dir = new THREE.Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el));
      const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), dir).normalize();
      const up = new THREE.Vector3().crossVectors(dir, right).normalize();
      const SW = 0.17;                                   // the group's idle yaw swing
      const yawA = new THREE.Matrix4().makeRotationY(SW);
      const yawB = new THREE.Matrix4().makeRotationY(-SW);
      const v = new THREE.Vector3();
      const c = new THREE.Vector3();
      let d = 0.001;
      for (let i = 0; i < 8; i++) {
        c.set(i & 1 ? bb.max.x : bb.min.x, i & 2 ? bb.max.y : bb.min.y, i & 4 ? bb.max.z : bb.min.z).sub(this._centre);
        for (let s = 0; s < 2; s++) {                     // both extremes of the idle swing
          v.copy(c).applyMatrix4(s ? yawA : yawB);
          const z = v.dot(dir), x = Math.abs(v.dot(right)), y = Math.abs(v.dot(up));
          d = Math.max(d, z + x / tanH, z + y / tanV);
        }
      }
      this._camBase = dir.multiplyScalar(d * mg).add(this._centre);
    }

    // off-axis frustum: the HUD covers the left `shift` fraction of the canvas, so the
    // projection window is slid instead of the camera — perspective stays undistorted
    _applyViewOffset() {
      const frac = this._shiftFrac();
      const w = this.clientWidth, h = this.clientHeight;
      if (!w || !h) return;
      if (frac < 0.01) { this.camera.clearViewOffset(); this.camera.updateProjectionMatrix(); }
      else this.camera.setViewOffset(w, h, -w * frac * 0.5, 0, w, h);
    }

    _swap() {
      const THREE = this.THREE;
      const variant = this.getAttribute('variant') || 'gym';
      const base = variant.split('-')[0];
      const mode = variant.split('-')[1] || '';
      const accent = new THREE.Color(this.getAttribute('accent') || '#00ff88');
      if (this._rays) this._rays.setColor(accent);
      if (this._node) { this._exiting.push({ node: this._node, k: 1 }); this._node = null; }
      const fn = BUILD[base] || BUILD.gym;
      const built = fn(THREE, accent, mode);
      built.group.traverse(o => {
        if (!o.material) return;
        (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => {
          m.transparent = true; m.userData.o0 = m.opacity; m.opacity = 0;
        });
      });
      this.scene.add(built.group);
      this._node = built;
      this._enter = 0;
      this._base = base;
      this._view = VIEW[base] || VIEW.gym;
      this._fitBase();
      this._dolly = 1;
      this._applyFocus();
    }

    _applyFocus() {
      const f = this.getAttribute('focus');
      const i = f === null || f === '' ? -1 : parseInt(f, 10);
      const set = FOCUS[this._base] || FOCUS.gym;
      const p = i >= 0 ? set[i] : null;
      this._focused = !!p;
      this._focusIdx = p ? i : -1;
      const THREE = this.THREE;
      // a narrow viewport — or a HUD-shrunk one — needs a longer throw for the same framing
      const sf = this._shiftFrac();
      const aspectFit = Math.max(1, 1.62 / Math.max(0.4, this.camera.aspect * (1 - sf))) * (1 + 0.5 * sf);
      if (p) {
        const tgt = new THREE.Vector3(p[3], p[4], p[5]);
        const off = new THREE.Vector3(p[0] - p[3], p[1] - p[4], p[2] - p[5]).multiplyScalar(aspectFit);
        if (i === 0 && this._camBase) {                  // WIDE ESTABLISH: never closer than the solved fit
          const need = this._camBase.distanceTo(this._centre), have = off.length() || 1;
          if (have < need) off.multiplyScalar(need / have);
        }
        this._camGoal = tgt.clone().add(off);
        this._tgtGoal.copy(tgt);
      } else {
        this._camGoal = this._camBase.clone();
        this._tgtGoal.copy(this._centre);
      }
      this._applyViewOffset();
    }

    _frame() {
      const dt = Math.min(0.05, this._clock.getDelta());
      const t = this._clock.elapsedTime;

      if (this._node) {
        this._enter = Math.min(1, this._enter + dt * 2.0);
        const e = 1 - Math.pow(1 - this._enter, 3);
        if (this._node.parts) {                            // spotlight the part the open spec-tile refers to
          const fi = this._focusIdx ?? -1;
          const kp = 1 - Math.exp(-5 * dt);
          this._node.parts.forEach((p, j) => {
            const goal = fi < 0 || j === fi ? 1 : 0.13;
            const cur = p.userData.w ?? 1;
            const w = cur + (goal - cur) * kp;
            p.userData.w = w;
            p.traverse(o => { o.userData.pk = w; });
          });
        }
        setOpacity(this._node.group, e);
        this._node.group.scale.setScalar(0.9 + 0.1 * e);
        if (this._node.spin) this._node.group.rotation.y += dt * 0.22;
        else this._node.group.rotation.y = Math.sin(t * 0.11) * 0.16;
        this._node.update(t, dt, e);
      }
      for (let i = this._exiting.length - 1; i >= 0; i--) {
        const x = this._exiting[i];
        x.k -= dt * 3.6;
        setOpacity(x.node.group, Math.max(0, x.k));
        x.node.group.scale.setScalar(0.9 + 0.14 * Math.max(0, x.k));
        if (x.k <= 0) { dispose(x.node.group, this.scene); this._exiting.splice(i, 1); }
      }

      // frame-rate independent damping:  k = 1 − e^(−λ·dt)
      const THREE = this.THREE;
      const g = this._camGoal || this._camBase;
      const lam = this._focused ? 3.6 : 2.7;
      const k = 1 - Math.exp(-lam * dt);
      this._dolly = Math.max(0, this._dolly - dt * 0.85);
      const de = this._dolly * this._dolly;                       // eased dolly-through weight
      const axis = g.clone().sub(this._tgtGoal);
      const len = axis.length() || 1;
      axis.multiplyScalar(1 / len);
      const goal = g.clone().addScaledVector(axis, de * len * 0.32);
      const par = (this._focused ? 0.22 : 0.6) * (1 - de);
      const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), axis).normalize();
      const up = new THREE.Vector3().crossVectors(axis, right).normalize();
      goal.addScaledVector(right, this._pointer.x * par).addScaledVector(up, -this._pointer.y * par * 0.7);
      this.camera.position.lerp(goal, k);
      this._tgt.lerp(this._tgtGoal, 1 - Math.exp(-lam * 1.35 * dt));
      this.camera.lookAt(this._tgt);
      const fov = this._fov0 * (1 + de * 0.14);
      if (Math.abs(fov - this.camera.fov) > 0.02) { this.camera.fov = fov; this._applyViewOffset(); this.camera.updateProjectionMatrix(); }

      if (this._amb) this._amb.update(t);
      if (this._rays) this._rays.update(t);
      this._sweep.position.set(Math.cos(t * 0.5) * 4.2, 2.4 + Math.sin(t * 0.7) * 1.2, Math.sin(t * 0.5) * 4.2);
      this.renderer.render(this.scene, this.camera);
    }
  }

  /* ---------- helpers ---------- */
  const setOpacity = (g, k) => g.traverse(o => {
    if (!o.material) return;
    const pk = o.userData.pk ?? 1;
    (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => { m.opacity = (m.userData.o0 ?? 1) * k * pk; });
  });
  const dispose = (g, scene) => {
    scene.remove(g);
    g.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => m.dispose());
    });
  };
  const studioEnv = THREE => {
    const c = document.createElement('canvas'); c.width = 128; c.height = 64;
    const x = c.getContext('2d');
    const g = x.createLinearGradient(0, 0, 0, 64);
    g.addColorStop(0, '#0b2a3a'); g.addColorStop(0.42, '#123a4e'); g.addColorStop(0.5, '#9fe8ff');
    g.addColorStop(0.58, '#0d2130'); g.addColorStop(1, '#04070c');
    x.fillStyle = g; x.fillRect(0, 0, 128, 64);
    x.fillStyle = 'rgba(255,255,255,0.85)'; x.fillRect(12, 10, 34, 5); x.fillRect(80, 22, 26, 4);
    const t = new THREE.CanvasTexture(c);
    t.mapping = THREE.EquirectangularReflectionMapping;
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };
  const radialTex = THREE => {
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const x = c.getContext('2d');
    const g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, 'rgba(0,240,255,0.20)'); g.addColorStop(0.45, 'rgba(0,120,180,0.06)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g; x.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  };

  const softTex = THREE => {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const x = c.getContext('2d');
    const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.32, 'rgba(206,234,255,0.55)'); g.addColorStop(1, 'rgba(150,200,255,0)');
    x.fillStyle = g; x.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  };
  const rayTex = THREE => {
    const c = document.createElement('canvas'); c.width = 48; c.height = 256;
    const x = c.getContext('2d');
    const v = x.createLinearGradient(0, 0, 0, 256);
    v.addColorStop(0, 'rgba(255,255,255,0.8)'); v.addColorStop(0.4, 'rgba(255,255,255,0.18)'); v.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = v; x.fillRect(0, 0, 48, 256);
    const h = x.createLinearGradient(0, 0, 48, 0);
    h.addColorStop(0, 'rgba(0,0,0,1)'); h.addColorStop(0.5, 'rgba(0,0,0,0)'); h.addColorStop(1, 'rgba(0,0,0,1)');
    x.globalCompositeOperation = 'destination-out'; x.fillStyle = h; x.fillRect(0, 0, 48, 256);
    return new THREE.CanvasTexture(c);
  };

  // one cohesive, harmonious floating particle atmosphere — persists across all variants
  const ambientField = THREE => {
    const group = new THREE.Group();
    const tex = softTex(THREE);
    const layers = [
      { n: 540, r: 17, h: 14, s: 0.085, o: 0.5, c: 0xb6d6f2, v: 0.05 },
      { n: 340, r: 11, h: 10, s: 0.14, o: 0.36, c: 0x9fd8ff, v: 0.08 },
      { n: 140, r: 6.6, h: 7, s: 0.22, o: 0.28, c: 0xffffff, v: 0.12 }
    ].map(L => {
      const pos = new Float32Array(L.n * 3), seed = [];
      for (let i = 0; i < L.n; i++) {
        const th = Math.random() * Math.PI * 2, rr = Math.sqrt(Math.random()) * L.r;
        seed.push({ x: Math.cos(th) * rr, z: Math.sin(th) * rr, y: Math.random() * L.h, w: 0.4 + Math.random() * 0.9, p: Math.random() * 6.28 });
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const pts = new THREE.Points(geo, new THREE.PointsMaterial({
        map: tex, color: L.c, size: L.s, transparent: true, opacity: L.o,
        depthWrite: false, blending: THREE.AdditiveBlending
      }));
      pts.frustumCulled = false;
      group.add(pts);
      return { L, pos, seed, geo };
    });
    return {
      group,
      update(t) {
        layers.forEach(({ L, pos, seed, geo }) => {
          for (let i = 0; i < L.n; i++) {
            const s = seed[i];
            let y = (s.y + t * L.v * s.w) % L.h;
            if (y < 0) y += L.h;
            pos[i * 3] = s.x + Math.sin(t * 0.17 * s.w + s.p) * 0.36;
            pos[i * 3 + 1] = y - 2.4;
            pos[i * 3 + 2] = s.z + Math.cos(t * 0.14 * s.w + s.p) * 0.36;
          }
          geo.attributes.position.needsUpdate = true;
        });
        group.rotation.y = t * 0.011;
      }
    };
  };

  // volumetric light shafts falling through the space
  const lightRays = THREE => {
    const group = new THREE.Group();
    const tex = rayTex(THREE);
    const beams = [[-6.6, 0.3, -3.2, 1.0], [-2.5, -0.15, -1.0, 1.65], [2.3, 0.12, -2.4, 1.25], [6.1, -0.32, -4.0, 0.85], [0.5, 0.06, 2.6, 0.7]]
      .map(([x, rz, z, k], i) => {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(2.7 * k, 16), new THREE.MeshBasicMaterial({
          map: tex, color: 0xcfe9ff, transparent: true, opacity: 0.08 * k,
          blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide
        }));
        m.position.set(x, 4.6, z);
        m.rotation.set(0, -0.22 + i * 0.15, rz);
        group.add(m);
        return { m, o: 0.08 * k, p: i };
      });
    return {
      group,
      setColor(c) { beams.forEach(b => b.m.material.color.copy(c).lerp(new THREE.Color(0xe4f3ff), 0.62)); },
      update(t) { beams.forEach(b => { b.m.material.opacity = b.o * (0.5 + 0.5 * Math.sin(t * 0.33 + b.p * 1.3)); }); }
    };
  };

  const M = {
    std: (THREE, c, r = 0.5, m = 0.35, o = 1) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m, opacity: o, transparent: true }),
    glow: (THREE, c, o = 0.9) => new THREE.MeshBasicMaterial({ color: c, opacity: o, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }),
    paint: (THREE, c, o = 0.95) => new THREE.MeshBasicMaterial({ color: c, opacity: o, transparent: true }),
    wire: (THREE, c, o = 0.4) => new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: o }),
    line: (THREE, c, o = 0.7) => new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: o }),
    dot: (THREE, c, s, o = 0.9) => new THREE.PointsMaterial({ color: c, size: s, opacity: o, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })
  };
  const box = (THREE, w, h, d, mat, x = 0, y = 0, z = 0) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); return m;
  };
  const loop4 = (THREE, w, d, y, mat) => {
    const p = [[-w / 2, y, -d / 2], [w / 2, y, -d / 2], [w / 2, y, d / 2], [-w / 2, y, d / 2]].map(v => new THREE.Vector3(...v));
    return new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(p), mat);
  };
  // a minimal standing person — staff, instructors, guards
  const figure = (THREE, body, head, s = 1) => {
    const G = new THREE.Group();
    const h = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 10), head); h.position.y = 0.62; G.add(h);
    const t = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.3, 6, 12), body); t.position.y = 0.33; G.add(t);
    const l = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.26, 6, 10), body); G.add(l);
    G.scale.setScalar(s);
    return G;
  };
  const parts4 = (THREE, g) => [0, 1, 2, 3].map(() => { const p = new THREE.Group(); g.add(p); return p; });
  // animate a material's opacity while respecting the enter fade (e) and the focus dim (pk)
  const pulse = (mesh, v, e) => {
    const m = mesh.material;
    m.opacity = (m.userData.o0 ?? 1) * v * (mesh.userData.pk ?? 1) * (e ?? 1);
  };

  /* ---------- builders ---------- */
  const BUILD = {
    // ATHLETIC HUB — high-tech gym floor, zones, cardio racks, RFID turnstiles
    gym(THREE, a) {
      const g = new THREE.Group();
      g.add(box(THREE, 9.4, 0.14, 6.6, M.std(THREE, 0x0a1017, 0.72, 0.15), 0, -1.31, 0));
      const zones = [[-2.6, -1.4, 3.4, 3.2], [1.6, -1.6, 3.6, 2.6], [1.8, 1.9, 3.4, 2.4], [-2.8, 2.0, 3.2, 2.2]];
      const zl = [];
      zones.forEach(([x, z, w, d], i) => {
        const l = loop4(THREE, w, d, -1.23, M.line(THREE, i % 2 ? a : CYAN, 0.55));
        l.position.set(x, 0, z); g.add(l); zl.push(l);
        const f = new THREE.Mesh(new THREE.PlaneGeometry(w, d), M.glow(THREE, i % 2 ? a : CYAN, 0.035));
        f.rotation.x = -Math.PI / 2; f.position.set(x, -1.225, z); g.add(f);
      });
      // cardio racks: treadmill units in two rows
      const screens = [];
      for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) {
        const x = -3.0 + i * 0.86, z = -2.35 + r * 0.95;
        g.add(box(THREE, 0.58, 0.16, 1.0, M.std(THREE, 0x171f28, 0.55, 0.45), x, -1.16, z));
        const belt = box(THREE, 0.5, 0.03, 0.86, M.paint(THREE, 0x0c1218, 0.9), x, -1.07, z + 0.02); g.add(belt);
        g.add(box(THREE, 0.5, 0.52, 0.06, M.std(THREE, 0x1c242e, 0.5, 0.5), x, -0.82, z - 0.46));
        const s = box(THREE, 0.34, 0.2, 0.02, M.glow(THREE, CYAN, 0.8), x, -0.72, z - 0.42);
        g.add(s); screens.push(s);
      }
      // free-weight racks
      const plates = [];
      for (let i = 0; i < 3; i++) {
        const x = 1.2 + i * 1.5, z = 1.6;
        [-0.62, 0.62].forEach(o => g.add(box(THREE, 0.1, 1.5, 0.1, M.std(THREE, 0x222b34, 0.45, 0.6), x + o, -0.55, z)));
        g.add(box(THREE, 1.4, 0.08, 0.08, M.std(THREE, 0x2b343d, 0.35, 0.75), x, -0.05, z));
        [-0.5, 0.5].forEach(o => {
          const p = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.07, 26), M.std(THREE, 0x151c24, 0.4, 0.5));
          p.rotation.z = Math.PI / 2; p.position.set(x + o, -0.05, z); g.add(p);
          const rr = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.012, 6, 36), M.glow(THREE, a, 0.75));
          rr.rotation.y = Math.PI / 2; rr.position.set(x + o, -0.05, z); g.add(rr); plates.push(rr);
        });
      }
      // RFID turnstile gates
      const beams = [];
      for (let i = 0; i < 3; i++) {
        const z = -0.9 + i * 0.9;
        [-0.34, 0.34].forEach(o => {
          g.add(box(THREE, 0.16, 1.0, 0.5, M.std(THREE, 0x1a222b, 0.5, 0.5), -4.1 + o * 0, -0.8, z + o * 0.62));
        });
        const b = box(THREE, 0.06, 0.5, 1.1, M.glow(THREE, a, 0.55), -4.1, -0.75, z);
        g.add(b); beams.push(b);
        const rd = box(THREE, 0.14, 0.1, 0.16, M.glow(THREE, CYAN, 0.95), -3.96, -0.4, z + 0.56); g.add(rd); beams.push(rd);
      }
      g.add(box(THREE, 0.07, 2.3, 6.4, M.wire(THREE, 0x2a3946, 0.22), -4.4, -0.2, 0));
      // members flowing in
      const N = 90, pos = new Float32Array(N * 3), ph = [];
      for (let i = 0; i < N; i++) ph.push({ u: Math.random(), z: (Math.random() - 0.5) * 5.6, s: 0.5 + Math.random() * 0.8 });
      const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      g.add(new THREE.Points(pg, M.dot(THREE, WHITE, 0.07, 0.8)));
      return {
        group: g,
        update(t) {
          screens.forEach((s, i) => { s.material.opacity = (s.material.userData.o0 || 0.8) * (0.55 + 0.45 * Math.abs(Math.sin(t * 1.6 + i))); });
          beams.forEach((b, i) => { b.material.opacity = (b.material.userData.o0 || 0.6) * (0.4 + 0.6 * Math.abs(Math.sin(t * 2.4 + i * 0.7))); });
          plates.forEach((p, i) => { p.rotation.x = t * (0.6 + i * 0.05); });
          zl.forEach((l, i) => { l.material.opacity = (l.material.userData.o0 || 0.55) * (0.6 + 0.4 * Math.sin(t * 0.9 + i * 1.3)); });
          for (let i = 0; i < N; i++) {
            const p = ph[i], u = (p.u + t * 0.06 * p.s) % 1;
            pos[i * 3] = -4.3 + u * 8.4;
            pos[i * 3 + 1] = -1.0 + Math.sin(t * 3 + i) * 0.03;
            pos[i * 3 + 2] = p.z * (0.35 + u * 0.8);
          }
          pg.attributes.position.needsUpdate = true;
        }
      };
    },

    // OLYMPIC POOL — 8 lanes, animated water, dividers, starting blocks, depth marks
    // OLYMPIC POOL — 50×25 m at 1 u = 5 m (2:1), 8 lanes × 2.5 m, 7 interior ropes
    pool(THREE, a) {
      const g = new THREE.Group();
      const S = 0.2, L = 50 * S, W = 25 * S, LW = 2.5 * S, SPAN = 8 * LW;
      g.add(box(THREE, L + 2.6, 0.2, W + 2.4, M.std(THREE, 0x101922, 0.8, 0.1), 0, -1.32, 0));
      [[L + 0.4, 0.9, 0.22, 0, -0.9, W / 2 + 0.1], [L + 0.4, 0.9, 0.22, 0, -0.9, -W / 2 - 0.1],
       [0.22, 0.9, W + 0.4, L / 2 + 0.1, -0.9, 0], [0.22, 0.9, W + 0.4, -L / 2 - 0.1, -0.9, 0]]
        .forEach(v => g.add(box(THREE, v[0], v[1], v[2], M.std(THREE, 0x16222d, 0.7, 0.2), v[3], v[4], v[5])));
      g.add(box(THREE, L, 0.06, W, M.paint(THREE, 0x062634, 1), 0, -1.28, 0));
      for (let i = 0; i < 8; i++) {
        const z = -SPAN / 2 + (i + 0.5) * LW;
        g.add(box(THREE, L - 4 * S * 2, 0.02, 0.05, M.paint(THREE, 0x03323f, 0.92), 0, -1.24, z));
        [-1, 1].forEach(s => g.add(box(THREE, 0.5, 0.02, 0.05, M.paint(THREE, 0x03323f, 0.92), s * (L / 2 - 2 * S - 0.25), -1.24, z)));
      }
      const geo = new THREE.PlaneGeometry(L, W, 110, 56);
      const water = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({
        color: 0x0a6f9e, roughness: 0.06, metalness: 0.25, transparent: true, opacity: 0.8,
        clearcoat: 1, clearcoatRoughness: 0.08, side: THREE.DoubleSide
      }));
      water.rotation.x = -Math.PI / 2; water.position.y = -0.84; g.add(water);
      const caus = new THREE.Mesh(new THREE.PlaneGeometry(L, W, 46, 26), M.wire(THREE, CYAN, 0.13));
      caus.rotation.x = -Math.PI / 2; caus.position.y = -0.82; g.add(caus);
      const base = geo.attributes.position.array.slice();
      // Gerstner set — deep-water dispersion ω = √(g·k), g = 9.81·S world units/s²
      const GW = [[1, 0.16, 1.30, 0.032, 0.62], [0.42, -1, 0.78, 0.019, 0.74], [-0.72, 0.5, 0.44, 0.009, 0.86]]
        .map(([dx, dz, lam, amp, q]) => {
          const l = Math.hypot(dx, dz), kk = 2 * Math.PI / lam;
          return { dx: dx / l, dz: dz / l, k: kk, w: Math.sqrt(9.81 * S * kk), a: amp, q: q / kk };
        });
      const floats = [];
      for (let i = 1; i < 8; i++) {
        const z = -SPAN / 2 + i * LW;
        const im = new THREE.InstancedMesh(new THREE.SphereGeometry(0.05, 12, 8), M.std(THREE, i % 2 ? 0xe8f6ff : a, 0.35, 0.2), 52);
        const d = new THREE.Object3D();
        for (let k = 0; k < 52; k++) { d.position.set(-L / 2 + (k / 51) * L, -0.8, z); d.updateMatrix(); im.setMatrixAt(k, d.matrix); }
        g.add(im); floats.push({ im, z });
      }
      // backstroke turn flags at 5 m from each wall
      [-1, 1].forEach(s => g.add(box(THREE, 0.03, 0.02, SPAN, M.glow(THREE, a, 0.5), s * (L / 2 - 5 * S), -0.55, 0)));
      // starting blocks, one per lane centre
      for (let i = 0; i < 8; i++) {
        const z = -SPAN / 2 + (i + 0.5) * LW, x = -L / 2 - 0.45;
        g.add(box(THREE, 0.42, 0.34, 0.42, M.std(THREE, 0x1d2732, 0.55, 0.4), x, -1.05, z));
        const top = box(THREE, 0.44, 0.04, 0.44, M.glow(THREE, i % 2 ? CYAN : a, 0.7), x, -0.87, z);
        top.rotation.x = -0.12; g.add(top);
        g.add(box(THREE, 0.06, 0.26, 0.06, M.std(THREE, 0x2b3742, 0.5, 0.6), x + 0.16, -0.72, z));
      }
      // depth markers along deck
      for (let i = 0; i < 9; i++) {
        const x = -L / 2 + (i / 8) * L;
        g.add(box(THREE, 0.04, 0.02, 0.3, M.glow(THREE, WHITE, 0.5), x, -1.2, W / 2 + 0.55));
        if (i % 2 === 0) g.add(box(THREE, 0.16, 0.02, 0.06, M.glow(THREE, a, 0.6), x, -1.2, W / 2 + 0.82));
      }
      const spray = (() => {
        const n = 240, p = new Float32Array(n * 3);
        for (let i = 0; i < n; i++) { p[i * 3] = (Math.random() - 0.5) * L; p[i * 3 + 1] = -0.8 + Math.random() * 0.5; p[i * 3 + 2] = (Math.random() - 0.5) * W; }
        const bg = new THREE.BufferGeometry(); bg.setAttribute('position', new THREE.BufferAttribute(p, 3));
        const pts = new THREE.Points(bg, M.dot(THREE, 0xdff6ff, 0.05, 0.6)); g.add(pts); return pts;
      })();
      return {
        group: g,
        update(t) {
          const p = geo.attributes.position.array, nr = geo.attributes.normal.array;
          for (let i = 0; i < p.length; i += 3) {
            const x0 = base[i], y0 = base[i + 1];
            let dx = 0, dy = 0, h = 0, nx = 0, ny = 0;
            for (let j = 0; j < GW.length; j++) {
              const q = GW[j], ph = q.k * (q.dx * x0 + q.dz * y0) - q.w * t;
              const c = Math.cos(ph), s = Math.sin(ph);
              dx += q.q * q.a * q.dx * c; dy += q.q * q.a * q.dz * c;
              h += q.a * s;
              nx += q.a * q.k * q.dx * c; ny += q.a * q.k * q.dz * c;
            }
            p[i] = x0 + dx; p[i + 1] = y0 + dy; p[i + 2] = h;
            const il = 1 / Math.hypot(nx, ny, 1);   // analytic normal — no per-frame recompute
            nr[i] = -nx * il; nr[i + 1] = -ny * il; nr[i + 2] = il;
          }
          geo.attributes.position.needsUpdate = true; geo.attributes.normal.needsUpdate = true;
          caus.rotation.z = Math.sin(t * 0.2) * 0.02;
          caus.material.opacity = (caus.material.userData.o0 || 0.13) * (0.6 + 0.4 * Math.sin(t * 1.4));
          floats.forEach((f, i) => { f.im.position.y = Math.sin(t * 1.8 + i * 0.6) * 0.022; });
          spray.rotation.y = Math.sin(t * 0.1) * 0.05;
        }
      };
    },

    // TENNIS / PADEL — regulation markings, net, glass walls, ball vector
    court(THREE, a) {
      const g = new THREE.Group();
      const S = 0.3;                                        // 1 u = 3.33 m
      const LEN = 23.77 * S, SL = 10.97 * S, WID = 8.23 * S, SVC = 6.40 * S;  // ITF doubles / singles / service
      g.add(box(THREE, LEN + 2.6, 0.12, SL + 1.6, M.std(THREE, 0x0a1a20, 0.9, 0.05), 0, -1.3, 0));
      const surf = box(THREE, LEN + 1.6, 0.04, SL + 0.9, M.paint(THREE, 0x0d3040, 1), 0, -1.23, 0); g.add(surf);
      const line = M.paint(THREE, 0xf2f8ff, 0.95);
      const L = (w, d, x, z) => g.add(box(THREE, w, 0.02, d, line, x, -1.2, z));
      L(0.055, SL, -LEN / 2, 0); L(0.055, SL, LEN / 2, 0);                  // baselines
      L(LEN, 0.055, 0, -SL / 2); L(LEN, 0.055, 0, SL / 2);                  // doubles sidelines
      L(LEN, 0.05, 0, -WID / 2); L(LEN, 0.05, 0, WID / 2);                  // singles sidelines
      L(0.05, WID, -SVC, 0); L(0.05, WID, SVC, 0);                          // service lines
      L(SVC * 2, 0.05, 0, 0);                                                // centre service line
      L(0.05, 0.22, -LEN / 2 + 0.03, 0); L(0.05, 0.22, LEN / 2 - 0.03, 0);  // centre marks
      // net
      // net: 1.07 m at the posts sagging to 0.914 m at centre — parabolic cord
      const NW = SL + 2 * 0.914 * S, HP = 1.07 * S, SAG = (1.07 - 0.914) * S, NY = -1.22;
      const ng = new THREE.PlaneGeometry(NW, HP, 64, 8);
      const np = ng.attributes.position.array;
      for (let i = 0; i < np.length; i += 3) {
        const u = np[i] / NW, v = (np[i + 1] + HP / 2) / HP;
        np[i + 1] -= SAG * (1 - 4 * u * u) * v;
      }
      const net = new THREE.Mesh(ng, M.wire(THREE, 0xa9c8d8, 0.5));
      net.rotation.y = Math.PI / 2; net.position.y = NY + HP / 2; g.add(net);
      const cord = new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, NY + HP, -NW / 2), new THREE.Vector3(0, NY + HP - 2 * SAG, 0), new THREE.Vector3(0, NY + HP, NW / 2)
      ), 44, 0.018, 8), M.paint(THREE, 0xffffff, 0.95));
      g.add(cord);
      [-1, 1].forEach(s => g.add(box(THREE, 0.07, HP + 0.06, 0.07, M.std(THREE, 0x263340, 0.5, 0.6), 0, NY + HP / 2, s * NW / 2)));
      // padel glass + mesh fence
      const glass = new THREE.MeshPhysicalMaterial({ color: 0xa9e6ff, roughness: 0.03, metalness: 0, transparent: true, opacity: 0.1, side: THREE.DoubleSide });
      [-1, 1].forEach(s => {
        const w = box(THREE, 0.04, 1.5, SL + 0.9, glass, s * (LEN / 2 + 0.7), -0.5, 0); g.add(w);
        g.add(loop4(THREE, 0.04, SL + 0.9, 0, M.line(THREE, a, 0.4)).translateX(s * (LEN / 2 + 0.7)).translateY(0.25));
      });
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.075, 22, 16), M.paint(THREE, 0xe8ff5a, 1));
      const bglow = new THREE.Mesh(new THREE.SphereGeometry(0.15, 18, 12), M.glow(THREE, a, 0.4));
      g.add(ball, bglow);
      const tg = new THREE.BufferGeometry(), TP = new Float32Array(140 * 3);
      tg.setAttribute('position', new THREE.BufferAttribute(TP, 3));
      g.add(new THREE.Line(tg, M.line(THREE, a, 0.6)));
      // dwell heat spots
      const heat = [];
      [[-2.6, 0.9], [-2.4, -1.0], [2.5, 0.8], [2.3, -0.9], [0.6, 0]].forEach(([x, z]) => {
        const m = new THREE.Mesh(new THREE.CircleGeometry(0.42, 32), M.glow(THREE, a, 0.09));
        m.rotation.x = -Math.PI / 2; m.position.set(x, -1.19, z); g.add(m); heat.push(m);
      });
      // rally: projectile motion, g = 9.81·S, ITF rebound coefficient e = 0.75
      const G = 9.81 * S, E = 0.75, FL = -1.2 + 0.075;
      const B = { x: -LEN / 2 + 0.6, y: FL + 0.85, z: 0.5, vx: 3.1, vy: 1.5, vz: -0.45 };
      return {
        group: g,
        update(t, dt) {
          B.vy -= G * dt;
          B.x += B.vx * dt; B.y += B.vy * dt; B.z += B.vz * dt;
          if (B.y < FL) {
            B.y = FL; B.vy = -B.vy * E;
            if (Math.abs(B.vy) < 0.4) B.vy = 1.5 + Math.random() * 0.8;
          }
          if (B.x > LEN / 2 - 0.3 || B.x < -LEN / 2 + 0.3) {          // baseline strike
            B.x = Math.max(-LEN / 2 + 0.3, Math.min(LEN / 2 - 0.3, B.x));
            B.vx = -Math.sign(B.x) * (2.9 + Math.random() * 0.9);
            B.vy = 1.8 + Math.random() * 0.7;
            B.vz = (Math.random() - 0.5) * 1.2;
          }
          if (Math.abs(B.z) > SL / 2 - 0.15) B.vz = -B.vz;
          ball.position.set(B.x, B.y, B.z); bglow.position.copy(ball.position);
          const x = B.x, y = B.y, z = B.z;
          for (let i = 139; i > 0; i--) { TP[i * 3] = TP[(i - 1) * 3]; TP[i * 3 + 1] = TP[(i - 1) * 3 + 1]; TP[i * 3 + 2] = TP[(i - 1) * 3 + 2]; }
          TP[0] = x; TP[1] = y; TP[2] = z;
          tg.attributes.position.needsUpdate = true;
          heat.forEach((h, i) => { h.material.opacity = (h.material.userData.o0 || 0.09) * (0.5 + 0.5 * Math.sin(t * 1.1 + i)); h.scale.setScalar(0.9 + 0.12 * Math.sin(t + i)); });
          net.material.opacity = (net.material.userData.o0 || 0.5) * (0.85 + 0.15 * Math.sin(t * 2));
        }
      };
    },

    // COMBAT — octagon cage over tatami, glowing perimeter, corner posts
    octagon(THREE, a) {
      const g = new THREE.Group(), R = 2.7, N = 8;
      g.add(box(THREE, 7.6, 0.24, 7.6, M.std(THREE, 0x0b1118, 0.8, 0.1), 0, -1.3, 0));
      const mat = new THREE.Mesh(new THREE.CircleGeometry(R, N, Math.PI / N), M.paint(THREE, 0x122028, 1));
      mat.rotation.x = -Math.PI / 2; mat.position.y = -1.16; g.add(mat);
      const tat = new THREE.Mesh(new THREE.CircleGeometry(R * 0.98, N, Math.PI / N), M.wire(THREE, a, 0.28));
      tat.rotation.x = -Math.PI / 2; tat.position.y = -1.15; g.add(tat);
      const inner = new THREE.Mesh(new THREE.RingGeometry(R * 0.52, R * 0.55, N * 8), M.glow(THREE, a, 0.55));
      inner.rotation.x = -Math.PI / 2; inner.position.y = -1.14; g.add(inner);
      const peri = new THREE.Mesh(new THREE.RingGeometry(R * 0.96, R, N, 1, Math.PI / N), M.glow(THREE, CYAN, 0.7));
      peri.rotation.x = -Math.PI / 2; peri.position.y = -1.13; g.add(peri);
      const caps = [];
      for (let i = 0; i < N; i++) {
        const th = (i / N) * Math.PI * 2 + Math.PI / N;
        const x = Math.cos(th) * R, z = Math.sin(th) * R;
        const p = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 2.0, 20), M.std(THREE, 0x222c36, 0.4, 0.7));
        p.position.set(x, -0.18, z); g.add(p);
        const c = new THREE.Mesh(new THREE.SphereGeometry(0.115, 18, 12), M.glow(THREE, a, 0.95));
        c.position.set(x, 0.88, z); g.add(c); caps.push(c);
        const th2 = ((i + 1) / N) * Math.PI * 2 + Math.PI / N;
        const x2 = Math.cos(th2) * R, z2 = Math.sin(th2) * R;
        const w = Math.hypot(x2 - x, z2 - z);
        const fence = new THREE.Mesh(new THREE.PlaneGeometry(w, 1.9, 9, 7), M.wire(THREE, 0x4e6472, 0.3));
        fence.position.set((x + x2) / 2, -0.2, (z + z2) / 2);
        fence.rotation.y = -Math.atan2(z2 - z, x2 - x) + Math.PI / 2; g.add(fence);
      }
      const ripples = [0, 1, 2].map(i => {
        const r = new THREE.Mesh(new THREE.RingGeometry(0.4, 0.44, 64), M.glow(THREE, CYAN, 0.5));
        r.rotation.x = -Math.PI / 2; r.position.y = -1.12; g.add(r); return r;
      });
      return {
        group: g,
        update(t) {
          peri.material.opacity = (peri.material.userData.o0 || 0.7) * (0.6 + 0.4 * Math.sin(t * 1.6));
          caps.forEach((c, i) => c.scale.setScalar(0.9 + 0.18 * Math.sin(t * 2.2 + i * 0.8)));
          ripples.forEach((r, i) => {
            const k = ((t * 0.45 + i / 3) % 1);
            r.scale.setScalar(0.5 + k * 5.6);
            r.material.opacity = (r.material.userData.o0 || 0.5) * (1 - k) * 0.9;
          });
          inner.rotation.z = t * 0.1;
        }
      };
    },

    // ARENA — tiered bowl, emerald pitch, floodlight beams, section heatmap
    arena(THREE, a) {
      const g = new THREE.Group();
      const PW = 5.0, PD = 3.2;
      g.add(box(THREE, PW, 0.06, PD, M.paint(THREE, 0x06170e, 1), 0, -1.26, 0));
      for (let i = 0; i < 10; i++) g.add(box(THREE, PW / 10, 0.02, PD, M.paint(THREE, i % 2 ? 0x0b2b18 : 0x082111, 1), -PW / 2 + (i + 0.5) * PW / 10, -1.22, 0));
      const grid = new THREE.Mesh(new THREE.PlaneGeometry(PW, PD, 10, 7), M.wire(THREE, EMER, 0.3));
      grid.rotation.x = -Math.PI / 2; grid.position.y = -1.2; g.add(grid);
      // FIFA markings at 1 u = 21 m — 105×68 m pitch
      const S = PW / 105, ink = M.paint(THREE, 0xdff3e6, 0.55), LY = -1.19;
      const mk = (w, d, x, z) => g.add(box(THREE, w, 0.02, d, ink, x, LY, z));
      mk(0.04, PD, -PW / 2, 0); mk(0.04, PD, PW / 2, 0);
      mk(PW, 0.04, 0, -PD / 2); mk(PW, 0.04, 0, PD / 2);
      mk(0.04, PD, 0, 0);
      [-1, 1].forEach(s => {
        mk(16.5 * S, 0.035, s * (PW / 2 - 16.5 * S / 2), -40.32 * S / 2);
        mk(16.5 * S, 0.035, s * (PW / 2 - 16.5 * S / 2), 40.32 * S / 2);
        mk(0.035, 40.32 * S, s * (PW / 2 - 16.5 * S), 0);
        mk(5.5 * S, 0.035, s * (PW / 2 - 5.5 * S / 2), -18.32 * S / 2);
        mk(5.5 * S, 0.035, s * (PW / 2 - 5.5 * S / 2), 18.32 * S / 2);
        mk(0.035, 18.32 * S, s * (PW / 2 - 5.5 * S), 0);
        const spot = new THREE.Mesh(new THREE.CircleGeometry(0.022, 16), ink);
        spot.rotation.x = -Math.PI / 2; spot.position.set(s * (PW / 2 - 11 * S), LY, 0); g.add(spot);
        g.add(box(THREE, 0.05, 0.12, 7.32 * S, M.glow(THREE, 0xeafff4, 0.5), s * (PW / 2 + 0.03), LY + 0.06, 0));
      });
      const cc = new THREE.Mesh(new THREE.RingGeometry(9.15 / 2 * S - 0.015, 9.15 / 2 * S + 0.015, 72), ink);
      cc.rotation.x = -Math.PI / 2; cc.position.y = LY; g.add(cc);
      const cs = new THREE.Mesh(new THREE.CircleGeometry(0.026, 18), ink);
      cs.rotation.x = -Math.PI / 2; cs.position.y = LY; g.add(cs);
      // tiers with heat colors
      // seating bowl: constant C-value sightline rake  y′ = y_f + d′·(y + C − y_f)/d
      const FX = PW / 2, FY = -1.23, CV = 0.075;
      const tiers = [];
      let rx = PW / 2 + 1.05, ey = -1.02;
      for (let tr = 0; tr < 5; tr++) {
        const rz = rx * (PD + 2.1) / (PW + 2.1);
        const per = Math.PI * (3 * (rx + rz) - Math.sqrt((3 * rx + rz) * (rx + 3 * rz)));  // Ramanujan
        const n = Math.max(52, Math.round(per / 0.3));
        const K = 512, cum = new Float32Array(K + 1);
        let px = rx, pz = 0;
        for (let i = 1; i <= K; i++) {
          const th = i / K * Math.PI * 2, qx = Math.cos(th) * rx, qz = Math.sin(th) * rz;
          cum[i] = cum[i - 1] + Math.hypot(qx - px, qz - pz); px = qx; pz = qz;
        }
        const thetaAt = s => {                      // uniform seat pitch along the ellipse
          let lo = 0, hi = K;
          while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (cum[mid] < s) lo = mid; else hi = mid; }
          const f = (s - cum[lo]) / Math.max(1e-6, cum[hi] - cum[lo]);
          return (lo + f) / K * Math.PI * 2;
        };
        const im = new THREE.InstancedMesh(new THREE.BoxGeometry(0.2, 0.1, 0.22), M.std(THREE, 0xffffff, 0.6, 0.2), n);
        const d = new THREE.Object3D(), col = new THREE.Color();
        for (let i = 0; i < n; i++) {
          const th = thetaAt(i / n * cum[K]), ct = Math.cos(th), st = Math.sin(th);
          d.position.set(ct * rx, ey, st * rz);
          d.rotation.set(0, Math.atan2(-rz * ct, -rx * st), -0.24);   // true inward ellipse normal
          d.updateMatrix(); im.setMatrixAt(i, d.matrix);
          col.setHSL(0.42 - 0.3 * Math.abs(Math.sin(th * 2 + tr)), 0.75, 0.16 + 0.2 * Math.abs(Math.cos(th * 3)));
          im.setColorAt(i, col);
        }
        im.instanceColor.needsUpdate = true;
        g.add(im); tiers.push({ im, n, rx, rz, tr, y: ey });
        const edge = new THREE.Mesh(new THREE.TorusGeometry(rx, 0.012, 6, 160), M.glow(THREE, tr % 2 ? CYAN : EMER, 0.3));
        edge.rotation.x = Math.PI / 2; edge.scale.set(1, rz / rx, 1); edge.position.y = ey + 0.07; g.add(edge);
        const nx = rx + 0.6;
        ey = FY + (nx - FX) * (ey + CV - FY) / (rx - FX);
        rx = nx;
      }
      // floodlight masts + beams
      const beams = [];
      [[-4.4, -3.3], [4.4, -3.3], [4.4, 3.3], [-4.4, 3.3]].forEach(([x, z]) => {
        g.add(box(THREE, 0.12, 3.4, 0.12, M.std(THREE, 0x263239, 0.5, 0.6), x, 0.4, z));
        g.add(box(THREE, 1.0, 0.34, 0.16, M.std(THREE, 0x2f3d46, 0.4, 0.7), x, 2.2, z));
        const head = box(THREE, 0.94, 0.26, 0.05, M.glow(THREE, 0xf4fbff, 0.95), x, 2.2, z - Math.sign(z) * 0.1); g.add(head);
        const beam = new THREE.Mesh(new THREE.ConeGeometry(1.5, 4.4, 28, 1, true), M.glow(THREE, 0xcdf6ff, 0.075));
        beam.position.set(x * 0.55, 0.3, z * 0.55);
        beam.lookAt(new THREE.Vector3(0, -1.2, 0));
        beam.rotateX(Math.PI / 2);
        g.add(beam); beams.push({ beam, head });
      });
      const crowd = (() => {
        const n = 420, p = new Float32Array(n * 3);
        for (let i = 0; i < n; i++) {
          const th = Math.random() * Math.PI * 2, T = tiers[Math.floor(Math.random() * tiers.length)];
          p[i * 3] = Math.cos(th) * T.rx; p[i * 3 + 1] = T.y + 0.07; p[i * 3 + 2] = Math.sin(th) * T.rz;
        }
        const bg = new THREE.BufferGeometry(); bg.setAttribute('position', new THREE.BufferAttribute(p, 3));
        const pts = new THREE.Points(bg, M.dot(THREE, 0xbfe9ff, 0.05, 0.5)); g.add(pts); return pts;
      })();
      const col = new THREE.Color();
      let f = 0;
      return {
        group: g,
        update(t) {
          beams.forEach((b, i) => {
            const k = 0.06 + 0.05 * Math.abs(Math.sin(t * 1.3 + i));
            b.beam.material.opacity = (b.beam.material.userData.o0 || 0.075) * (k / 0.075);
            b.head.material.opacity = (b.head.material.userData.o0 || 0.95) * (0.75 + 0.25 * Math.sin(t * 3 + i));
          });
          crowd.material.opacity = (crowd.material.userData.o0 || 0.5) * (0.6 + 0.4 * Math.abs(Math.sin(t * 2.2)));
          grid.material.opacity = (grid.material.userData.o0 || 0.3) * (0.7 + 0.3 * Math.sin(t * 1.1));
          if ((f++ % 8) === 0) tiers.forEach(({ im, n, tr }) => {
            for (let i = 0; i < n; i++) {
              const th = (i / n) * Math.PI * 2;
              const v = 0.5 + 0.5 * Math.sin(th * 2 + tr * 0.7 + t * 0.6);
              col.setHSL(0.42 - 0.3 * v, 0.78, 0.12 + 0.22 * v);
              im.setColorAt(i, col);
            }
            im.instanceColor.needsUpdate = true;
          });
        }
      };
    },

    // WORKFORCE — holographic athletic wireframe + biometrics + staff constellation
    human(THREE, a, mode) {
      const g = new THREE.Group();
      const rig = (col, s, x, dim) => {
        const G = new THREE.Group();
        const w = M.wire(THREE, col, dim ? 0.2 : 0.42), j = M.glow(THREE, col, dim ? 0.4 : 0.95);
        const add = (geo, px, py, pz, rz) => { const m = new THREE.Mesh(geo, w); m.position.set(px, py, pz); if (rz) m.rotation.z = rz; G.add(m); return m; };
        add(new THREE.SphereGeometry(0.21, 18, 14), 0, 1.62, 0);
        add(new THREE.CylinderGeometry(0.07, 0.09, 0.14, 12), 0, 1.4, 0);
        const torso = add(new THREE.CapsuleGeometry(0.29, 0.5, 8, 18), 0, 1.02, 0);
        add(new THREE.CapsuleGeometry(0.22, 0.16, 6, 16), 0, 0.62, 0);
        [-1, 1].forEach(sd => {
          add(new THREE.CapsuleGeometry(0.085, 0.42, 6, 12), sd * 0.4, 1.12, 0, sd * 0.22);
          add(new THREE.CapsuleGeometry(0.07, 0.4, 6, 12), sd * 0.55, 0.68, 0.04, sd * 0.1);
          add(new THREE.CapsuleGeometry(0.115, 0.5, 6, 14), sd * 0.16, 0.2, 0);
          add(new THREE.CapsuleGeometry(0.095, 0.48, 6, 14), sd * 0.18, -0.36, 0.02);
          const f = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.07, 0.3), w); f.position.set(sd * 0.18, -0.72, 0.07); G.add(f);
        });
        const joints = [[0, 1.38, 0], [-0.3, 1.3, 0], [0.3, 1.3, 0], [-0.52, 0.9, 0], [0.52, 0.9, 0], [-0.6, 0.47, 0.06], [0.6, 0.47, 0.06],
          [-0.16, 0.5, 0], [0.16, 0.5, 0], [-0.17, -0.09, 0], [0.17, -0.09, 0], [-0.18, -0.62, 0.02], [0.18, -0.62, 0.02]]
          .map(([px, py, pz]) => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.042, 12, 8), j); m.position.set(px, py, pz); G.add(m); return m; });
        G.position.set(x, -0.62, 0); G.scale.setScalar(s);
        g.add(G);
        return { G, torso, joints };
      };
      const main = rig(CYAN, 1, 0, false);
      if (mode === 'group') { rig(a, 0.78, -1.5, true); rig(a, 0.78, 1.5, true); }
      // chest pulse rings
      const pulses = [0, 1, 2].map(() => {
        const r = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.012, 8, 60), M.glow(THREE, a, 0.6));
        r.position.set(0, 0.45, 0.1); g.add(r); return r;
      });
      // ECG telemetry line
      const n = 260, ep = new Float32Array(n * 3), eg = new THREE.BufferGeometry();
      for (let i = 0; i < n; i++) { ep[i * 3] = -3.3 + (i / n) * 6.6; ep[i * 3 + 1] = -1.05; ep[i * 3 + 2] = 0.6; }
      eg.setAttribute('position', new THREE.BufferAttribute(ep, 3));
      g.add(new THREE.Line(eg, M.line(THREE, a, 0.85)));
      // hierarchy constellation
      const CN = mode === 'ops' ? 0 : 120, cp = new Float32Array(Math.max(1, CN) * 3), seeds = [];
      for (let i = 0; i < CN; i++) seeds.push({ r: 1.5 + Math.random() * 1.5, th: Math.random() * 6.28, ph: Math.acos(2 * Math.random() - 1), s: 0.3 + Math.random() * 0.7 });
      const cg = new THREE.BufferGeometry(); cg.setAttribute('position', new THREE.BufferAttribute(cp, 3));
      if (CN) g.add(new THREE.Points(cg, M.dot(THREE, a, 0.07, 0.9)));
      const LK = CN ? 34 : 0, lp = new Float32Array(Math.max(1, LK) * 6), lg = new THREE.BufferGeometry();
      lg.setAttribute('position', new THREE.BufferAttribute(lp, 3));
      if (LK) g.add(new THREE.LineSegments(lg, M.line(THREE, a, 0.22)));
      if (mode === 'ops') {
        const lat = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.2, 3.4, 9, 6, 9), M.wire(THREE, a, 0.16));
        lat.position.y = 0.3; g.add(lat);
        const scan = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 3.4), M.glow(THREE, a, 0.07));
        scan.rotation.x = -Math.PI / 2; g.add(scan);
        g.userData.scan = scan;
      }
      if (mode === 'guard') {
        const wa = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 4.4, 40, 28), M.wire(THREE, CYAN, 0.16));
        wa.rotation.x = -Math.PI / 2; wa.position.y = -1.32; g.add(wa);
        g.userData.wa = wa;
      }
      const halo = new THREE.Mesh(new THREE.RingGeometry(1.15, 1.2, 80), M.glow(THREE, a, 0.4));
      halo.rotation.x = -Math.PI / 2; halo.position.y = -1.34; g.add(halo);
      return {
        group: g,
        update(t) {
          const br = Math.sin(t * 1.3) * 0.02;
          main.G.position.y = -0.62 + Math.sin(t * 0.9) * 0.025;
          main.torso.scale.set(1 + br, 1 - br * 0.5, 1 + br);
          const beat = Math.pow(Math.max(0, Math.sin(t * 2.3)), 10);
          main.joints.forEach((j, i) => j.scale.setScalar(1 + beat * 0.5 + 0.1 * Math.sin(t * 3 + i)));
          pulses.forEach((r, i) => {
            const k = (t * 0.5 + i / 3) % 1;
            r.scale.setScalar(0.6 + k * 2.4);
            r.material.opacity = (r.material.userData.o0 || 0.6) * (1 - k);
          });
          for (let i = 0; i < n; i++) {
            const u = (i / n * 5 - t * 0.9) % 1, s = u < 0 ? u + 1 : u;
            ep[i * 3 + 1] = -1.05 + Math.exp(-Math.pow((s - 0.5) * 16, 2)) * 0.8 - Math.exp(-Math.pow((s - 0.43) * 30, 2)) * 0.24
              + Math.exp(-Math.pow((s - 0.62) * 24, 2)) * 0.16;
          }
          eg.attributes.position.needsUpdate = true;
          for (let i = 0; i < CN; i++) {
            const s = seeds[i], th = s.th + t * 0.2 * s.s, ph = s.ph + Math.sin(t * 0.3 + i) * 0.05;
            cp[i * 3] = Math.sin(ph) * Math.cos(th) * s.r;
            cp[i * 3 + 1] = 0.5 + Math.cos(ph) * s.r * 0.55;
            cp[i * 3 + 2] = Math.sin(ph) * Math.sin(th) * s.r;
          }
          if (CN) cg.attributes.position.needsUpdate = true;
          for (let j = 0; j < LK; j++) {
            const i = (j * 7 + Math.floor(t * 4)) % CN;
            lp[j * 6] = 0; lp[j * 6 + 1] = 1.0; lp[j * 6 + 2] = 0;
            lp[j * 6 + 3] = cp[i * 3]; lp[j * 6 + 4] = cp[i * 3 + 1]; lp[j * 6 + 5] = cp[i * 3 + 2];
          }
          if (LK) lg.attributes.position.needsUpdate = true;
          if (g.userData.scan) g.userData.scan.position.y = Math.sin(t * 0.7) * 1.1 + 0.3;
          if (g.userData.wa) {
            const p = g.userData.wa.geometry.attributes.position.array;
            for (let i = 0; i < p.length; i += 3) p[i + 2] = Math.sin(p[i] * 2 + t * 2.2) * 0.05;
            g.userData.wa.geometry.attributes.position.needsUpdate = true;
          }
          halo.material.opacity = (halo.material.userData.o0 || 0.4) * (0.6 + 0.4 * Math.sin(t * 1.5));
        }
      };
    },

    // COACHING STAFF — command table + holographic game model + GPS load + licence wall
    coach(THREE, a) {
      const g = new THREE.Group(), acts = [], P = parts4(THREE, g);
      {                                                   // 0 · SCALE — staff ring around the command table
        const suit = M.std(THREE, 0x1e2a35, 0.6, 0.25), hd = M.glow(THREE, a, 0.9);
        const disc = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.62, 0.16, 56), M.std(THREE, 0x121a23, 0.55, 0.35));
        disc.position.y = -0.78; P[0].add(disc);
        const top = new THREE.Mesh(new THREE.CircleGeometry(1.46, 56), M.glow(THREE, CYAN, 0.13));
        top.rotation.x = -Math.PI / 2; top.position.y = -0.69; P[0].add(top);
        const ring = new THREE.Mesh(new THREE.TorusGeometry(1.52, 0.014, 8, 90), M.glow(THREE, a, 0.7));
        ring.rotation.x = Math.PI / 2; ring.position.y = -0.7; P[0].add(ring);
        P[0].add(box(THREE, 0.9, 0.62, 0.9, M.std(THREE, 0x0e151d, 0.6, 0.3), 0, -1.15, 0));
        const st = [], sp = new Float32Array(10 * 6), sg = new THREE.BufferGeometry();
        sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
        for (let i = 0; i < 10; i++) {
          const th = i / 10 * Math.PI * 2, f = figure(THREE, suit, hd, 0.9);
          f.position.set(Math.cos(th) * 2.16, -1.3, Math.sin(th) * 2.16);
          f.rotation.y = -th + Math.PI / 2; P[0].add(f); st.push(f);
          sp[i * 6] = Math.cos(th) * 1.5; sp[i * 6 + 1] = -0.68; sp[i * 6 + 2] = Math.sin(th) * 1.5;
          sp[i * 6 + 3] = Math.cos(th) * 2.0; sp[i * 6 + 4] = -0.9; sp[i * 6 + 5] = Math.sin(th) * 2.0;
        }
        P[0].add(new THREE.LineSegments(sg, M.line(THREE, a, 0.2)));
        acts.push(t => {
          st.forEach((f, i) => { f.position.y = -1.3 + Math.sin(t * 1.1 + i * 0.7) * 0.02; });
          ring.material.opacity = (ring.material.userData.o0 ?? 0.7) * (0.6 + 0.4 * Math.sin(t * 1.4));
        });
      }
      {                                                   // 1 · DISCIPLINES — holographic game model
        const hb = new THREE.Group(); hb.position.set(0, 0.92, 0); hb.rotation.x = -0.18; P[1].add(hb);
        const pl = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.0), M.glow(THREE, CYAN, 0.05));
        pl.rotation.x = -Math.PI / 2; hb.add(pl);
        const gm = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.0, 10, 7), M.wire(THREE, CYAN, 0.22));
        gm.rotation.x = -Math.PI / 2; hb.add(gm);
        hb.add(loop4(THREE, 3.2, 2.0, 0.004, M.line(THREE, a, 0.55)));
        const cc = new THREE.Mesh(new THREE.RingGeometry(0.28, 0.3, 48), M.glow(THREE, a, 0.5));
        cc.rotation.x = -Math.PI / 2; cc.position.y = 0.004; hb.add(cc);
        const nodes = [[-1.35, 0], [-0.8, -0.62], [-0.8, 0.62], [-0.2, -0.3], [-0.2, 0.3], [0.35, -0.7], [0.35, 0], [0.35, 0.7], [0.95, -0.4], [0.95, 0.4], [1.4, 0]]
          .map(([x, z], i) => {
            const m = new THREE.Mesh(new THREE.SphereGeometry(0.07, 14, 10), M.glow(THREE, i ? a : 0xffffff, 0.95));
            m.position.set(x, 0.06, z); hb.add(m); return { m, x, z, i };
          });
        const pass = new THREE.BufferGeometry(), pp = new Float32Array(6 * 6);
        pass.setAttribute('position', new THREE.BufferAttribute(pp, 3));
        hb.add(new THREE.LineSegments(pass, M.line(THREE, a, 0.5)));
        acts.push(t => {
          nodes.forEach(n => {
            n.m.position.x = n.x + Math.sin(t * 0.6 + n.i) * 0.09;
            n.m.position.z = n.z + Math.cos(t * 0.5 + n.i * 1.3) * 0.07;
          });
          const k = Math.floor(t * 1.1);
          for (let j = 0; j < 6; j++) {
            const A = nodes[(j * 3 + k) % nodes.length].m, B = nodes[(j * 5 + 3 + k) % nodes.length].m;
            pp[j * 6] = A.position.x; pp[j * 6 + 1] = 0.06; pp[j * 6 + 2] = A.position.z;
            pp[j * 6 + 3] = B.position.x; pp[j * 6 + 4] = 0.06; pp[j * 6 + 5] = B.position.z;
          }
          pass.attributes.position.needsUpdate = true;
          gm.material.opacity = (gm.material.userData.o0 ?? 0.22) * (0.7 + 0.3 * Math.sin(t * 1.1));
        });
      }
      {                                                   // 2 · TECHNOLOGY — GPS / RPE / ACWR gauges
        const G = new THREE.Group(); G.position.set(2.85, 0.25, 0); G.rotation.y = -0.5; P[2].add(G);
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.3), M.glow(THREE, CYAN, 0.05)));
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.3, 6, 5), M.wire(THREE, CYAN, 0.14)));
        const arcs = [0, 1, 2].map(i => {
          const m = new THREE.Mesh(new THREE.RingGeometry(0.22 + i * 0.11, 0.26 + i * 0.11, 48, 1, 0, Math.PI * 1.2), M.glow(THREE, i === 2 ? a : CYAN, 0.7));
          m.position.set(0, 0.16, 0.03); G.add(m); return m;
        });
        const bars = [0, 1, 2, 3, 4].map(i => {
          const b = box(THREE, 0.1, 0.3, 0.02, M.glow(THREE, a, 0.75), -0.56 + i * 0.16, -0.44, 0.03); G.add(b); return b;
        });
        const sat = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 8), M.glow(THREE, 0xffffff, 0.95)); G.add(sat);
        const orb = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.005, 6, 80), M.glow(THREE, a, 0.32));
        orb.rotation.x = 1.25; G.add(orb);
        acts.push(t => {
          arcs.forEach((m, i) => { m.rotation.z = t * (0.5 - i * 0.14) * (i % 2 ? -1 : 1); });
          bars.forEach((b, i) => { const h = 0.14 + 0.4 * (0.5 + 0.5 * Math.sin(t * 1.3 + i * 0.8)); b.scale.y = h / 0.3; b.position.y = -0.58 + h / 2; });
          sat.position.set(Math.cos(t * 0.9) * 0.66, 0.16 + Math.sin(t * 0.9) * 0.22, Math.sin(t * 0.9) * 0.42);
        });
      }
      {                                                   // 3 · STANDARDS — licence / safeguarding wall
        const G = new THREE.Group(); G.position.set(-2.9, 0.4, 0); G.rotation.y = 0.5; P[3].add(G);
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.6), M.glow(THREE, CYAN, 0.045)));
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.6, 6, 6), M.wire(THREE, CYAN, 0.16)));
        const cards = [0, 1, 2, 3, 4].map(i => {
          const c = new THREE.Group(); c.position.set(0, 0.6 - i * 0.3, 0.03); G.add(c);
          c.add(box(THREE, 1.4, 0.2, 0.02, M.std(THREE, 0x16202a, 0.5, 0.3)));
          const tick = box(THREE, 0.1, 0.1, 0.02, M.glow(THREE, i === 3 ? 0xffb347 : a, 0.9), -0.6, 0, 0.02); c.add(tick);
          c.add(box(THREE, 0.7, 0.03, 0.02, M.glow(THREE, CYAN, 0.5), -0.05, 0.04, 0.02));
          c.add(box(THREE, 0.45, 0.025, 0.02, M.glow(THREE, CYAN, 0.28), -0.18, -0.03, 0.02));
          return { tick, i };
        });
        acts.push(t => cards.forEach(c => {
          c.tick.material.opacity = (c.tick.material.userData.o0 ?? 0.9) * (c.i === 3 ? 0.35 + 0.65 * Math.abs(Math.sin(t * 3)) : 0.9);
        }));
      }
      return { group: g, parts: P, update(t, dt) { acts.forEach(f => f(t, dt)); } };
    },

    // SPORTS MEDICINE — treatment bay, joint scan, biometrics, return-to-play gates
    med(THREE, a) {
      const g = new THREE.Group(), acts = [], P = parts4(THREE, g);
      {                                                   // 0 · SCALE — treatment bay
        const frame = M.std(THREE, 0x1a232d, 0.5, 0.4), pad = M.paint(THREE, 0x0d222c, 0.95);
        const mons = [-1.9, 0, 1.9].map((x, i) => {
          const T = new THREE.Group(); T.position.set(x, 0, 0); P[0].add(T);
          T.add(box(THREE, 1.5, 0.08, 0.66, pad, 0, -0.78, 0));
          T.add(box(THREE, 1.4, 0.05, 0.6, M.glow(THREE, CYAN, 0.22), 0, -0.73, 0));
          [-0.6, 0.6].forEach(o => T.add(box(THREE, 0.09, 0.44, 0.09, frame, o, -1.04, 0)));
          const mon = box(THREE, 0.44, 0.3, 0.03, M.glow(THREE, i === 1 ? a : CYAN, 0.55), 0, -0.36, -0.42);
          T.add(mon); return mon;
        });
        const floor = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 3.0, 16, 8), M.wire(THREE, CYAN, 0.12));
        floor.rotation.x = -Math.PI / 2; floor.position.y = -1.3; P[0].add(floor);
        acts.push(t => mons.forEach((m, i) => {
          m.material.opacity = (m.material.userData.o0 ?? 0.55) * (0.5 + 0.5 * Math.abs(Math.sin(t * 1.5 + i * 1.1)));
        }));
      }
      {                                                   // 1 · DISCIPLINES — joint / tendon scan
        const G = new THREE.Group(); G.position.set(0, 0.2, 0); P[1].add(G);
        const bone = M.glow(THREE, CYAN, 0.8), spine = [];
        for (let i = 0; i < 10; i++) {
          const s = new THREE.Mesh(new THREE.SphereGeometry(0.055 - i * 0.001, 12, 8), bone);
          s.position.set(0, -0.5 + i * 0.11, 0); G.add(s); spine.push(s);
        }
        const joints = [[-0.34, 0.44], [0.34, 0.44], [-0.2, -0.52], [0.2, -0.52]].map(([x, y], i) => {
          const r = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.012, 10, 32), M.glow(THREE, i < 2 ? a : 0xffb347, 0.85));
          r.position.set(x, y, 0); G.add(r); return r;
        });
        const lg = new THREE.BufferGeometry();
        lg.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
          -0.34, 0.44, 0, -0.56, 0.06, 0, 0.34, 0.44, 0, 0.56, 0.06, 0,
          -0.2, -0.52, 0, -0.26, -1.06, 0, 0.2, -0.52, 0, 0.26, -1.06, 0,
          -0.34, 0.44, 0, 0.34, 0.44, 0
        ]), 3));
        G.add(new THREE.LineSegments(lg, M.line(THREE, CYAN, 0.5)));
        const scan = new THREE.Mesh(new THREE.RingGeometry(0.34, 0.44, 40), M.glow(THREE, a, 0.4));
        scan.rotation.x = -Math.PI / 2; G.add(scan);
        acts.push(t => {
          const u = (t * 0.5) % 1;
          scan.position.y = -0.6 + u * 1.7;
          scan.material.opacity = (scan.material.userData.o0 ?? 0.4) * (0.35 + 0.65 * Math.sin(u * Math.PI));
          joints.forEach((r, i) => { r.scale.setScalar(1 + 0.16 * Math.sin(t * 2.2 + i)); r.rotation.z = t * 0.4; });
          spine.forEach((s, i) => { s.position.x = Math.sin(t * 0.8 + i * 0.4) * 0.012; });
        });
      }
      {                                                   // 2 · TECHNOLOGY — biometric wall
        const G = new THREE.Group(); G.position.set(2.7, 0.45, 0); G.rotation.y = -0.45; P[2].add(G);
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.3), M.glow(THREE, CYAN, 0.05)));
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.3, 8, 6), M.wire(THREE, CYAN, 0.14)));
        const n = 120, ep = new Float32Array(n * 3), eg = new THREE.BufferGeometry();
        for (let i = 0; i < n; i++) { ep[i * 3] = -0.82 + (i / n) * 1.64; ep[i * 3 + 1] = 0.3; ep[i * 3 + 2] = 0.04; }
        eg.setAttribute('position', new THREE.BufferAttribute(ep, 3));
        G.add(new THREE.Line(eg, M.line(THREE, a, 0.9)));
        const hrv = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.2, 40, 1, 0, Math.PI * 1.4), M.glow(THREE, a, 0.8));
        hrv.position.set(-0.52, -0.3, 0.04); G.add(hrv);
        const bars = [0, 1, 2, 3].map(i => {
          const b = box(THREE, 0.1, 0.3, 0.02, M.glow(THREE, CYAN, 0.7), 0.05 + i * 0.17, -0.34, 0.04); G.add(b); return b;
        });
        acts.push(t => {
          for (let i = 0; i < n; i++) {
            const u = ((i / n) * 4 - t * 0.8) % 1, s = u < 0 ? u + 1 : u;
            ep[i * 3 + 1] = 0.3 + Math.exp(-Math.pow((s - 0.5) * 18, 2)) * 0.34 - Math.exp(-Math.pow((s - 0.43) * 34, 2)) * 0.1;
          }
          eg.attributes.position.needsUpdate = true;
          hrv.rotation.z = -t * 0.7;
          bars.forEach((b, i) => { const h = 0.12 + 0.34 * (0.5 + 0.5 * Math.sin(t * 1.6 + i)); b.scale.y = h / 0.3; b.position.y = -0.48 + h / 2; });
        });
      }
      {                                                   // 3 · STANDARDS — RTP gates + data vault
        const G = new THREE.Group(); G.position.set(-2.8, 0, 0); P[3].add(G);
        const gates = [0, 1, 2, 3].map(i => {
          const z = -1.2 + i * 0.8, pass = i < 3, col = pass ? a : 0xffb347;
          const arch = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.026, 10, 40, Math.PI), M.glow(THREE, col, 0.75));
          arch.position.set(0, -0.95, z); arch.rotation.y = Math.PI / 2; G.add(arch);
          [-0.42, 0.42].forEach(o => G.add(box(THREE, 0.07, 0.36, 0.07, M.std(THREE, 0x1b242e, 0.5, 0.5), 0, -1.13, z + o)));
          const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 8), M.glow(THREE, col, 0.95));
          lamp.position.set(0, -0.5, z); G.add(lamp);
          return { lamp, i, pass };
        });
        G.add(box(THREE, 0.5, 0.5, 0.5, M.std(THREE, 0x16202a, 0.4, 0.6), 0, -0.2, 1.5));
        const lock = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.02, 10, 28, Math.PI), M.glow(THREE, a, 0.8));
        lock.position.set(0, 0.03, 1.5); G.add(lock);
        acts.push(t => {
          gates.forEach(gt => {
            gt.lamp.material.opacity = (gt.lamp.material.userData.o0 ?? 0.95) * (gt.pass ? 0.9 : 0.3 + 0.7 * Math.abs(Math.sin(t * 3)));
          });
          lock.rotation.z = Math.sin(t * 0.9) * 0.2;
        });
      }
      return { group: g, parts: P, update(t, dt) { acts.forEach(f => f(t, dt)); } };
    },

    // GROUP LEADERS — studio floor, class zones, live HR board, spacing + certification
    group(THREE, a) {
      const g = new THREE.Group(), acts = [], P = parts4(THREE, g);
      {                                                   // 0 · SCALE — 24 mats + instructor podium
        P[0].add(box(THREE, 6.2, 0.12, 4.2, M.std(THREE, 0x0b1218, 0.75, 0.12), 0, -1.32, 0));
        const matM = M.paint(THREE, 0x102730, 0.95), cells = [];
        for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) {
          const x = -2.5 + c, z = -1.05 + r * 0.9;
          P[0].add(box(THREE, 0.8, 0.03, 0.62, matM, x, -1.24, z));
          const ring = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.23, 26), M.glow(THREE, (r * 6 + c) % 7 === 0 ? 0xffb347 : a, 0.6));
          ring.rotation.x = -Math.PI / 2; ring.position.set(x, -1.21, z); P[0].add(ring);
          cells.push({ ring, k: r * 6 + c });
        }
        P[0].add(box(THREE, 1.1, 0.22, 0.8, M.std(THREE, 0x18222c, 0.5, 0.4), 0, -1.15, -1.75));
        const inst = figure(THREE, M.std(THREE, 0x1e2a35, 0.6, 0.25), M.glow(THREE, 0xffffff, 0.95), 1.0);
        inst.position.set(0, -1.04, -1.75); P[0].add(inst);
        acts.push(t => {
          cells.forEach(c => {
            c.ring.material.opacity = (c.ring.material.userData.o0 ?? 0.6) * (0.3 + 0.7 * Math.abs(Math.sin(t * 1.2 + c.k * 0.4)));
          });
          inst.position.y = -1.04 + Math.abs(Math.sin(t * 2.2)) * 0.05;
        });
      }
      {                                                   // 1 · DISCIPLINES — cycle / mind-body / functional
        const fr = M.std(THREE, 0x1b242e, 0.5, 0.5), wheels = [];
        for (let i = 0; i < 5; i++) {
          const x = -1.6 + i * 0.8, z = 2.6;
          P[1].add(box(THREE, 0.16, 0.5, 0.9, fr, x, -1.05, z));
          P[1].add(box(THREE, 0.34, 0.07, 0.14, M.std(THREE, 0x232d38, 0.5, 0.4), x, -0.76, z - 0.22));
          const w = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.022, 8, 28), M.glow(THREE, a, 0.7));
          w.position.set(x, -1.06, z + 0.28); w.rotation.y = Math.PI / 2; P[1].add(w); wheels.push(w);
        }
        const yg = new THREE.Group(); yg.position.set(-3.4, 0, 0); P[1].add(yg);
        const ym = M.paint(THREE, 0x123038, 0.9);
        for (let i = 0; i < 4; i++) { const th = i / 4 * Math.PI * 2; yg.add(box(THREE, 0.62, 0.03, 0.4, ym, Math.cos(th) * 0.6, -1.26, Math.sin(th) * 0.6)); }
        const om = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.012, 8, 50), M.glow(THREE, CYAN, 0.6));
        om.rotation.x = Math.PI / 2; om.position.y = -0.9; yg.add(om);
        const tx = new THREE.Group(); tx.position.set(3.4, 0, 0); P[1].add(tx);
        [-0.7, 0.7].forEach(o => tx.add(box(THREE, 0.09, 1.7, 0.09, fr, 0, -0.5, o)));
        tx.add(box(THREE, 0.09, 0.09, 1.5, fr, 0, 0.3, 0));
        const straps = [-0.42, 0, 0.42].map(o => { const s = box(THREE, 0.03, 0.7, 0.03, M.glow(THREE, a, 0.6), 0, -0.1, o); tx.add(s); return s; });
        acts.push(t => {
          wheels.forEach((w, i) => { w.rotation.x = t * (2 + i * 0.3); });
          om.rotation.z = t * 0.4; om.scale.setScalar(1 + 0.06 * Math.sin(t * 1.3));
          straps.forEach((s, i) => { s.rotation.z = Math.sin(t * 1.6 + i) * 0.12; });
        });
      }
      {                                                   // 2 · TECHNOLOGY — live HR zones + NFC check-in
        const G = new THREE.Group(); G.position.set(0, 1.15, -2.2); P[2].add(G);
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(3.0, 1.1), M.glow(THREE, CYAN, 0.05)));
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(3.0, 1.1, 12, 4), M.wire(THREE, CYAN, 0.14)));
        const zn = [0xff5a5a, 0xffb347, 0x7fe8b8, 0x00f0ff], bars = [];
        for (let i = 0; i < 14; i++) {
          const b = box(THREE, 0.14, 0.5, 0.02, M.glow(THREE, zn[i % 4], 0.8), -1.4 + i * 0.21, -0.2, 0.03);
          G.add(b); bars.push(b);
        }
        const nfc = new THREE.Group(); nfc.position.set(2.5, -1.0, 2.2); P[2].add(nfc);
        nfc.add(box(THREE, 0.3, 0.6, 0.3, M.std(THREE, 0x1b242e, 0.5, 0.5), 0, -0.3, 0));
        nfc.add(box(THREE, 0.26, 0.04, 0.26, M.glow(THREE, a, 0.9), 0, 0.02, 0));
        const waves = [0, 1, 2].map(() => {
          const r = new THREE.Mesh(new THREE.RingGeometry(0.14, 0.17, 32), M.glow(THREE, a, 0.5));
          r.rotation.x = -Math.PI / 2; r.position.y = 0.06; nfc.add(r); return r;
        });
        acts.push(t => {
          bars.forEach((b, i) => { const h = 0.12 + 0.62 * (0.5 + 0.5 * Math.sin(t * 1.5 + i * 0.55)); b.scale.y = h / 0.5; b.position.y = -0.48 + h / 2; });
          waves.forEach((r, i) => { const k = (t * 0.7 + i / 3) % 1; r.scale.setScalar(0.6 + k * 2.2); r.material.opacity = (r.material.userData.o0 ?? 0.5) * (1 - k); });
        });
      }
      {                                                   // 3 · STANDARDS — m² spacing + instructor certificate
        const G = new THREE.Group(); G.position.set(-2.6, 0.6, -2.0); G.rotation.y = 0.6; P[3].add(G);
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.1), M.glow(THREE, CYAN, 0.05)));
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.1, 6, 4), M.wire(THREE, CYAN, 0.16)));
        const seal = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.022, 10, 32), new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.2, metalness: 1, transparent: true }));
        seal.position.set(-0.45, -0.22, 0.04); G.add(seal);
        [0, 1, 2].forEach(i => G.add(box(THREE, 0.8 - i * 0.16, 0.045, 0.02, M.glow(THREE, a, 0.55), 0.1, 0.3 - i * 0.18, 0.04)));
        const sp = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 4.2, 12, 8), M.wire(THREE, a, 0.2));
        sp.rotation.x = -Math.PI / 2; sp.position.y = -1.2; P[3].add(sp);
        acts.push(t => {
          seal.rotation.z = t * 0.6;
          sp.material.opacity = (sp.material.userData.o0 ?? 0.2) * (0.5 + 0.5 * Math.sin(t * 0.9));
        });
      }
      return { group: g, parts: P, update(t, dt) { acts.forEach(f => f(t, dt)); } };
    },

    // OPS & COMPLIANCE — 24/7 rota ring, department pods, server + clock-in, audit ledger
    ops(THREE, a) {
      const g = new THREE.Group(), acts = [], P = parts4(THREE, g);
      {                                                   // 0 · SCALE — rota ring with 210 staff
        const G = new THREE.Group(); G.position.set(0, -0.5, 0); P[0].add(G);
        const base = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.05, 12, 120), M.std(THREE, 0x18222c, 0.45, 0.55));
        base.rotation.x = Math.PI / 2; G.add(base);
        const arcs = [[0, 2.09, a], [2.09, 4.18, CYAN], [4.18, 6.283, 0xffb347]].map(([s, e, c], i) => {
          const m = new THREE.Mesh(new THREE.RingGeometry(2.1, 2.3, 64, 1, s, e - s), M.glow(THREE, c, 0.5));
          m.rotation.x = -Math.PI / 2; m.position.y = 0.02 + i * 0.002; G.add(m); return m;
        });
        for (let i = 0; i < 24; i++) {
          const th = i / 24 * Math.PI * 2;
          const tk = box(THREE, 0.03, 0.02, i % 6 === 0 ? 0.24 : 0.12, M.glow(THREE, 0xeaf4ff, i % 6 === 0 ? 0.8 : 0.35), Math.cos(th) * 2.46, 0, Math.sin(th) * 2.46);
          tk.rotation.y = -th; G.add(tk);
        }
        const N = 210, pos = new Float32Array(N * 3), seed = [];
        for (let i = 0; i < N; i++) seed.push({ th: Math.random() * 6.28, r: 1.1 + Math.random() * 0.95, s: 0.4 + Math.random() * 0.9, y: Math.random() });
        const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        G.add(new THREE.Points(pg, M.dot(THREE, a, 0.06, 0.8)));
        const hand = box(THREE, 2.0, 0.02, 0.03, M.glow(THREE, 0xffffff, 0.75), 0, 0.06, 0); G.add(hand);
        acts.push(t => {
          hand.position.set(Math.cos(t * 0.35) * 1.0, 0.06, -Math.sin(t * 0.35) * 1.0);
          hand.rotation.y = t * 0.35;
          for (let i = 0; i < N; i++) {
            const s = seed[i], th = s.th + t * 0.12 * s.s;
            pos[i * 3] = Math.cos(th) * s.r; pos[i * 3 + 1] = s.y * 0.14 + Math.sin(t + i) * 0.02; pos[i * 3 + 2] = Math.sin(th) * s.r;
          }
          pg.attributes.position.needsUpdate = true;
          arcs.forEach((m, i) => { m.material.opacity = (m.material.userData.o0 ?? 0.5) * (0.45 + 0.55 * Math.abs(Math.sin(t * 0.8 + i * 2))); });
        });
      }
      {                                                   // 1 · DISCIPLINES — department pods
        const pods = [a, CYAN, 0x7fe8b8, 0xffb347].map((c, i) => {
          const h = [0.5, 0.62, 0.42, 0.56][i], th = i / 4 * Math.PI * 2 + Math.PI / 4;
          const Gp = new THREE.Group(); Gp.position.set(Math.cos(th) * 1.15, -1.3, Math.sin(th) * 1.15);
          Gp.rotation.y = -th; P[1].add(Gp);
          Gp.add(box(THREE, 0.62, h, 0.5, M.std(THREE, 0x151e27, 0.5, 0.4), 0, h / 2, 0));
          Gp.add(box(THREE, 0.66, 0.03, 0.54, M.glow(THREE, c, 0.7), 0, h + 0.02, 0));
          const scr = box(THREE, 0.4, 0.24, 0.02, M.glow(THREE, c, 0.65), 0, h + 0.2, -0.2); Gp.add(scr);
          return { scr, i };
        });
        acts.push(t => pods.forEach(p => {
          p.scr.material.opacity = (p.scr.material.userData.o0 ?? 0.65) * (0.45 + 0.55 * Math.abs(Math.sin(t * 1.4 + p.i * 1.2)));
        }));
      }
      {                                                   // 2 · TECHNOLOGY — rack + biometric clock-in
        const G = new THREE.Group(); G.position.set(3.0, 0, 0); G.rotation.y = -0.5; P[2].add(G);
        G.add(box(THREE, 0.7, 2.0, 0.7, M.std(THREE, 0x131c25, 0.5, 0.5), 0, -0.3, 0));
        const leds = [];
        for (let i = 0; i < 9; i++) { const l = box(THREE, 0.5, 0.06, 0.02, M.glow(THREE, i % 3 ? CYAN : a, 0.8), 0, 0.55 - i * 0.2, 0.36); G.add(l); leds.push(l); }
        const clock = new THREE.Group(); clock.position.set(-0.05, -1.0, 1.2); G.add(clock);
        clock.add(box(THREE, 0.4, 0.5, 0.1, M.std(THREE, 0x1a232d, 0.5, 0.4)));
        const scan = box(THREE, 0.3, 0.04, 0.02, M.glow(THREE, a, 0.9), 0, 0, 0.06); clock.add(scan);
        acts.push(t => {
          leds.forEach((l, i) => { l.material.opacity = (l.material.userData.o0 ?? 0.8) * (0.3 + 0.7 * Math.abs(Math.sin(t * 2.2 + i * 0.7))); });
          scan.position.y = Math.sin(t * 1.6) * 0.18;
        });
      }
      {                                                   // 3 · STANDARDS — immutable audit ledger
        const G = new THREE.Group(); G.position.set(-2.9, 0, 0); P[3].add(G);
        const blocks = [];
        for (let i = 0; i < 6; i++) {
          const y = -1.2 + i * 0.34, x = Math.sin(i * 0.9) * 0.12, z = Math.cos(i * 0.9) * 0.12;
          G.add(box(THREE, 0.44, 0.28, 0.44, M.std(THREE, 0x16202a, 0.45, 0.55), x, y, z));
          const e = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.3, 0.46), M.wire(THREE, i === 5 ? GOLD : a, 0.45));
          e.position.set(x, y, z); G.add(e); blocks.push({ e, i });
        }
        const seal = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.02, 10, 30), new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.2, metalness: 1, transparent: true }));
        seal.position.set(0, 0.95, 0); G.add(seal);
        acts.push(t => {
          blocks.forEach(bl => {
            const k = 0.5 + 0.5 * Math.sin(t * 1.2 - bl.i * 0.6);
            bl.e.material.opacity = (bl.e.material.userData.o0 ?? 0.45) * (0.35 + 0.65 * k);
          });
          seal.rotation.z = t * 0.7; seal.rotation.x = Math.PI / 2 + Math.sin(t * 0.8) * 0.2;
        });
      }
      return { group: g, parts: P, update(t, dt) { acts.forEach(f => f(t, dt)); } };
    },

    // WATER SAFETY — guarded basins, scan cones, response mesh, drill beacon
    guard(THREE, a) {
      const g = new THREE.Group(), acts = [], P = parts4(THREE, g);
      const TP = [[-2.9, -2.1], [2.9, -2.1], [2.9, 2.1], [-2.9, 2.1]];
      {                                                   // 0 · SCALE — basins + guard towers
        P[0].add(box(THREE, 7.2, 0.16, 5.4, M.std(THREE, 0x0e1620, 0.8, 0.1), 0, -1.34, 0));
        const wg = new THREE.PlaneGeometry(6.4, 4.6, 56, 40);
        const water = new THREE.Mesh(wg, new THREE.MeshPhysicalMaterial({
          color: 0x0a6f9e, roughness: 0.07, metalness: 0.25, transparent: true, opacity: 0.78,
          clearcoat: 1, clearcoatRoughness: 0.08, side: THREE.DoubleSide
        }));
        water.rotation.x = -Math.PI / 2; water.position.y = -1.1; P[0].add(water);
        const wb = wg.attributes.position.array.slice();
        const kerb = M.std(THREE, 0x18222c, 0.6, 0.2);
        [-1.62, 1.62].forEach(x => P[0].add(box(THREE, 0.16, 0.3, 4.8, kerb, x, -1.12, 0)));
        P[0].add(box(THREE, 6.6, 0.3, 0.16, kerb, 0, -1.12, 0));
        const towers = TP.map(([x, z], i) => {
          const T = new THREE.Group(); T.position.set(x, -1.26, z); P[0].add(T);
          const leg = M.std(THREE, 0x1d2731, 0.5, 0.5);
          [[-0.18, -0.18], [0.18, -0.18], [0.18, 0.18], [-0.18, 0.18]].forEach(([ox, oz]) => T.add(box(THREE, 0.06, 0.9, 0.06, leg, ox, 0.45, oz)));
          T.add(box(THREE, 0.56, 0.05, 0.56, M.std(THREE, 0x232d38, 0.5, 0.4), 0, 0.92, 0));
          const seat = figure(THREE, M.std(THREE, 0xff6b4a, 0.6, 0.15), M.glow(THREE, 0xffffff, 0.95), 0.8);
          seat.position.set(0, 0.94, 0); T.add(seat);
          return { seat, i };
        });
        acts.push(t => {
          const p = wg.attributes.position.array;
          for (let i = 0; i < p.length; i += 3) {
            p[i + 2] = Math.sin(wb[i] * 1.6 + t * 1.3) * 0.035 + Math.sin(wb[i + 1] * 2.1 - t * 0.9) * 0.025;
          }
          wg.attributes.position.needsUpdate = true;
          towers.forEach(tw => { tw.seat.rotation.y = Math.sin(t * 0.5 + tw.i) * 0.8; });
        });
      }
      {                                                   // 1 · DISCIPLINES — scan cones + rescue zones
        const cones = TP.map(([x, z], i) => {
          const c = new THREE.Mesh(new THREE.ConeGeometry(0.85, 2.4, 26, 1, true), M.glow(THREE, i % 2 ? CYAN : a, 0.075));
          c.position.set(x * 0.72, -0.55, z * 0.72); c.rotation.x = Math.PI; P[1].add(c); return { c, i };
        });
        const mk = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.05, 10, 30), M.paint(THREE, 0xff6b4a, 0.95));
        mk.rotation.x = -Math.PI / 2; mk.position.set(1.0, -1.05, 0.9); P[1].add(mk);
        P[1].add(box(THREE, 0.4, 0.24, 0.3, M.paint(THREE, 0xff6b4a, 0.9), -2.2, -1.1, 2.5));
        P[1].add(box(THREE, 0.16, 0.04, 0.02, M.glow(THREE, 0xffffff, 0.95), -2.2, -1.0, 2.36));
        const zones = [[-2.4, -1.2], [0, 1.4], [2.4, -1.0]].map(([x, z]) => {
          const r = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.56, 40), M.glow(THREE, a, 0.4));
          r.rotation.x = -Math.PI / 2; r.position.set(x, -1.06, z); P[1].add(r); return r;
        });
        acts.push(t => {
          cones.forEach(cn => {
            cn.c.rotation.z = Math.sin(t * 0.6 + cn.i * 1.6) * 0.5;
            cn.c.material.opacity = (cn.c.material.userData.o0 ?? 0.075) * (0.5 + 0.5 * Math.sin(t * 1.2 + cn.i));
          });
          mk.position.y = -1.05 + Math.sin(t * 1.6) * 0.03;
          zones.forEach((r, i) => {
            const k = (t * 0.5 + i / 3) % 1;
            r.scale.setScalar(0.7 + k * 0.8);
            r.material.opacity = (r.material.userData.o0 ?? 0.4) * (1 - k) * 0.9;
          });
        });
      }
      {                                                   // 2 · TECHNOLOGY — response timer, detection grid, panic mesh
        const grid = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 4.6, 26, 18), M.wire(THREE, CYAN, 0.18));
        grid.rotation.x = -Math.PI / 2; grid.position.y = -1.22; P[2].add(grid);
        const G = new THREE.Group(); G.position.set(0, 0.85, 0); P[2].add(G);
        const dial = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.016, 8, 90), M.glow(THREE, a, 0.7));
        dial.rotation.x = Math.PI / 2; G.add(dial);
        const sweep = new THREE.Mesh(new THREE.RingGeometry(0.58, 0.64, 64, 1, 0, Math.PI * 0.45), M.glow(THREE, a, 0.65));
        sweep.rotation.x = -Math.PI / 2; G.add(sweep);
        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.2, 1), M.wire(THREE, CYAN, 0.45)); G.add(core);
        const pts = [[-2.6, 2.5], [0, 2.6], [2.6, 2.5], [2.6, -2.5], [-2.6, -2.5]], btns = [];
        const stem = M.std(THREE, 0x1d2731, 0.5, 0.5);
        pts.forEach(([x, z], i) => {
          const b = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.06, 20), M.glow(THREE, 0xff6b4a, 0.9));
          b.position.set(x, -1.06, z); P[2].add(b); btns.push({ b, i });
          P[2].add(box(THREE, 0.05, 0.4, 0.05, stem, x, -1.3, z));
        });
        const mg = new THREE.BufferGeometry(), mp = new Float32Array(5 * 6);
        for (let i = 0; i < 5; i++) {
          const A = pts[i], B = pts[(i + 1) % 5];
          mp[i * 6] = A[0]; mp[i * 6 + 1] = -1.06; mp[i * 6 + 2] = A[1];
          mp[i * 6 + 3] = B[0]; mp[i * 6 + 4] = -1.06; mp[i * 6 + 5] = B[1];
        }
        mg.setAttribute('position', new THREE.BufferAttribute(mp, 3));
        P[2].add(new THREE.LineSegments(mg, M.line(THREE, 0xff6b4a, 0.25)));
        acts.push(t => {
          sweep.rotation.z = -t * 1.4;
          core.rotation.y = t * 0.6; core.rotation.x = t * 0.3;
          grid.material.opacity = (grid.material.userData.o0 ?? 0.18) * (0.55 + 0.45 * Math.sin(t * 1.1));
          btns.forEach(bt => { bt.b.material.opacity = (bt.b.material.userData.o0 ?? 0.9) * (0.35 + 0.65 * Math.abs(Math.sin(t * 2.4 + bt.i * 0.9))); });
        });
      }
      {                                                   // 3 · STANDARDS — re-certification dial + drill beacon
        const G = new THREE.Group(); G.position.set(-3.5, -1.3, 0); P[3].add(G);
        G.add(box(THREE, 0.1, 1.9, 0.1, M.std(THREE, 0x1d2731, 0.5, 0.5), 0, 0.95, 0));
        const bea = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.16, 20), M.glow(THREE, 0xff6b4a, 0.9));
        bea.position.y = 2.0; G.add(bea);
        const fan = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.1, 22, 1, true), M.glow(THREE, 0xff6b4a, 0.1));
        fan.position.y = 2.0; fan.rotation.z = Math.PI / 2; G.add(fan);
        const dial = new THREE.Group(); dial.position.y = 1.35; G.add(dial);
        const months = [];
        for (let i = 0; i < 12; i++) {
          const th = i / 12 * Math.PI * 2;
          const m = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), M.glow(THREE, i < 9 ? a : 0x40515e, 0.85));
          m.position.set(Math.cos(th) * 0.5, 0, Math.sin(th) * 0.5); dial.add(m); months.push({ m, i });
        }
        const rr = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.008, 6, 64), M.glow(THREE, a, 0.4));
        rr.rotation.x = Math.PI / 2; dial.add(rr);
        const rot = new THREE.Mesh(new THREE.RingGeometry(0.56, 0.62, 48, 1, 0, Math.PI * 0.5), M.glow(THREE, a, 0.6));
        rot.rotation.x = -Math.PI / 2; dial.add(rot);
        acts.push(t => {
          bea.material.opacity = (bea.material.userData.o0 ?? 0.9) * (0.4 + 0.6 * Math.abs(Math.sin(t * 3)));
          fan.rotation.y = t * 2.2;
          rot.rotation.z = -t * 0.8;
          months.forEach(mo => { mo.m.scale.setScalar(1 + 0.2 * Math.sin(t * 2 + mo.i * 0.5)); });
        });
      }
      return { group: g, parts: P, update(t, dt) { acts.forEach(f => f(t, dt)); } };
    },

    // MSIC ELITE — verified elite dossier: cup core + 37 athletes, discipline banners,
    // motion-capture volume, signed protocol chain
    trophy(THREE, a) {
      const g = new THREE.Group(), acts = [], P = parts4(THREE, g);
      const gold = () => new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.14, metalness: 1, transparent: true });
      {                                                   // 0 · SCALE — one verified cup, 37 athletes, a 4-year cycle ring
        const gm = gold(), pts = [];
        for (let i = 0; i <= 26; i++) { const u = i / 26; pts.push(new THREE.Vector2(0.1 + Math.sin(u * Math.PI * 0.86) * 0.44 * (1 - u * 0.3), u * 0.95)); }
        const cup = new THREE.Mesh(new THREE.LatheGeometry(pts, 60), gm); cup.position.y = 0.36; P[0].add(cup);
        [-1, 1].forEach(s => {
          const h = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.035, 14, 40, Math.PI * 1.25), gm);
          h.position.set(s * 0.42, 0.78, 0); h.rotation.z = s * 1.9; h.rotation.y = Math.PI / 2; P[0].add(h);
        });
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, 0.34, 32), gm); stem.position.y = 0.2; P[0].add(stem);
        const knob = new THREE.Mesh(new THREE.SphereGeometry(0.14, 24, 16), gm); knob.position.y = 0.34; P[0].add(knob);
        const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.22, 44), gm); plinth.position.y = -0.03; P[0].add(plinth);
        const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.76, 0.86, 1.14, 52),
          new THREE.MeshStandardMaterial({ color: 0x10161d, roughness: 0.35, metalness: 0.6, transparent: true }));
        ped.position.y = -0.72; P[0].add(ped);
        const band = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.02, 10, 90), M.glow(THREE, a, 0.8));
        band.rotation.x = Math.PI / 2; band.position.y = -0.34; P[0].add(band);
        const ath = [];
        for (let i = 0; i < 37; i++) {                    // every MSIC athlete is one tracked dossier
          const m = new THREE.Mesh(new THREE.SphereGeometry(0.042, 12, 9), M.glow(THREE, i % 4 ? GOLD : 0xffffff, 0.85));
          m.userData.orb = { th: i / 37 * 6.28, r: 1.5 + (i % 3) * 0.3, y: -1.0 + (i % 5) * 0.13 };
          P[0].add(m); ath.push(m);
        }
        const cyc = [0, 1, 2, 3].map(i => {               // the olympic cycle — three quarters already run
          const m = new THREE.Mesh(new THREE.RingGeometry(2.46, 2.56, 76, 1, i * Math.PI / 2 + 0.05, Math.PI / 2 - 0.1),
            M.glow(THREE, i < 3 ? a : GOLD, i < 3 ? 0.32 : 0.7));
          m.rotation.x = -Math.PI / 2; m.position.y = -1.32; P[0].add(m); return m;
        });
        const sweep = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 3.4), M.glow(THREE, 0xfff6d8, 0.16));
        sweep.position.set(0, 0.3, 1.2); P[0].add(sweep);
        acts.push((t, dt, e) => {
          ath.forEach((m, i) => {
            const o = m.userData.orb, th = o.th + t * 0.16;
            m.position.set(Math.cos(th) * o.r, o.y + Math.sin(t * 1.3 + i) * 0.03, Math.sin(th) * o.r);
          });
          cyc.forEach((c, i) => pulse(c, 0.45 + 0.55 * Math.abs(Math.sin(t * 0.5 + i * 1.1)), e));
          pulse(band, 0.6 + 0.4 * Math.sin(t * 1.6), e);
          sweep.position.x = Math.sin(t * 0.8) * 1.6;
          sweep.rotation.z = Math.sin(t * 0.8) * 0.22;
          pulse(sweep, 0.5 + 0.5 * Math.cos(t * 0.8), e);
        });
      }
      {                                                   // 1 · DISCIPLINES — individual / combat / team, each with its own standard table
        const G = new THREE.Group(); G.position.set(-2.95, 0.25, 0); G.rotation.y = 0.55; P[1].add(G);
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(2.1, 1.6), M.glow(THREE, CYAN, 0.05)));
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(2.1, 1.6, 8, 6), M.wire(THREE, CYAN, 0.14)));
        const cards = [GOLD, a, CYAN].map((c, i) => {
          const C = new THREE.Group(); C.position.set(0, 0.48 - i * 0.48, 0.05); G.add(C);
          C.add(box(THREE, 1.86, 0.4, 0.02, M.std(THREE, 0x141d26, 0.5, 0.35)));
          const bar = box(THREE, 0.05, 0.34, 0.02, M.glow(THREE, c, 0.9), -0.86, 0, 0.02); C.add(bar);
          [0, 1, 2].forEach(k => C.add(box(THREE, 0.4 - k * 0.09, 0.03, 0.02, M.glow(THREE, c, 0.42), -0.5 + k * 0.44, 0.1, 0.02)));
          const dots = [0, 1, 2, 3].map(k => {
            const d = new THREE.Mesh(new THREE.SphereGeometry(0.028, 10, 8), M.glow(THREE, c, 0.8));
            d.position.set(-0.6 + k * 0.28, -0.1, 0.03); C.add(d); return d;
          });
          return { bar, dots, i };
        });
        acts.push((t, dt, e) => cards.forEach(cd => {
          pulse(cd.bar, 0.4 + 0.6 * Math.abs(Math.sin(t * 1.3 + cd.i)), e);
          cd.dots.forEach((d, k) => d.scale.setScalar(1 + 0.3 * Math.sin(t * 2 + k + cd.i)));
        }));
      }
      {                                                   // 2 · TECHNOLOGY — 240 fps capture volume + world-rank benchmark
        const G = new THREE.Group(); G.position.set(2.95, 0.15, 0); G.rotation.y = -0.55; P[2].add(G);
        G.add(new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 1.8, 5, 5, 5), M.wire(THREE, CYAN, 0.14)));
        const rigs = [[-0.9, 0.9, -0.9], [0.9, 0.9, -0.9], [0.9, 0.9, 0.9], [-0.9, 0.9, 0.9], [-0.9, -0.9, 0], [0.9, -0.9, 0]].map((p, i) => {
          const c = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.17, 12), M.glow(THREE, i % 2 ? a : CYAN, 0.9));
          c.position.set(p[0], p[1], p[2]); c.lookAt(0, 0, 0); c.rotateX(Math.PI / 2); G.add(c); return c;
        });
        const JP = [[0, 0.62, 0], [0, 0.36, 0], [-0.24, 0.32, 0], [0.24, 0.32, 0], [-0.33, 0.02, 0], [0.33, 0.02, 0],
          [-0.12, 0, 0], [0.12, 0, 0], [-0.15, -0.38, 0], [0.15, -0.38, 0], [-0.16, -0.72, 0], [0.16, -0.72, 0]];
        const PAIR = [[0, 1], [1, 2], [1, 3], [2, 4], [3, 5], [1, 6], [1, 7], [6, 8], [7, 9], [8, 10], [9, 11], [6, 7]];
        const joints = JP.map(p => {
          const m = new THREE.Mesh(new THREE.SphereGeometry(0.032, 10, 8), M.glow(THREE, 0xffffff, 0.9));
          m.position.set(p[0], p[1], p[2]); G.add(m); return m;
        });
        const sg = new THREE.BufferGeometry(), sp = new Float32Array(PAIR.length * 6);
        sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
        G.add(new THREE.LineSegments(sg, M.line(THREE, a, 0.55)));
        const scan = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.8), M.glow(THREE, CYAN, 0.06));
        scan.rotation.x = -Math.PI / 2; G.add(scan);
        const bars = [0, 1, 2, 3, 4].map(i => {           // benchmark against the world rank
          const b = box(THREE, 0.1, 0.3, 0.02, M.glow(THREE, i === 4 ? GOLD : CYAN, 0.75), -0.36 + i * 0.18, -1.2, 0);
          G.add(b); return b;
        });
        acts.push((t, dt, e) => {
          joints.forEach((m, i) => {
            const p = JP[i];
            m.position.set(p[0] + Math.sin(t * 1.7 + i) * 0.035, p[1] + Math.sin(t * 2.1 + i * 0.7) * 0.03, p[2] + Math.cos(t * 1.4 + i) * 0.03);
          });
          PAIR.forEach((pr, i) => {
            const A = joints[pr[0]].position, B = joints[pr[1]].position;
            sp[i * 6] = A.x; sp[i * 6 + 1] = A.y; sp[i * 6 + 2] = A.z;
            sp[i * 6 + 3] = B.x; sp[i * 6 + 4] = B.y; sp[i * 6 + 5] = B.z;
          });
          sg.attributes.position.needsUpdate = true;
          scan.position.y = Math.sin(t * 0.8) * 0.82;
          rigs.forEach((c, i) => pulse(c, 0.35 + 0.65 * Math.abs(Math.sin(t * 2.6 + i * 0.8)), e));
          bars.forEach((b, i) => { const h = 0.14 + 0.46 * (0.5 + 0.5 * Math.sin(t * 1.2 + i * 0.7)); b.scale.y = h / 0.3; b.position.y = -1.34 + h / 2; });
        });
      }
      {                                                   // 3 · STANDARD — the document chain: three signed, one pending
        const G = new THREE.Group(); G.position.set(0, -0.62, 2.55); G.rotation.x = -0.5; P[3].add(G);
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.5), M.glow(THREE, CYAN, 0.045)));
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.5, 12, 5), M.wire(THREE, CYAN, 0.13)));
        const docs = [0, 1, 2, 3].map(i => {
          const D = new THREE.Group(); D.position.set(-1.2 + i * 0.8, 0.04, 0.05); G.add(D);
          D.add(box(THREE, 0.62, 0.9, 0.02, M.std(THREE, 0x16202a, 0.5, 0.3)));
          [0, 1, 2, 3].forEach(k => D.add(box(THREE, 0.42 - k * 0.06, 0.028, 0.02, M.glow(THREE, CYAN, 0.34), 0, 0.26 - k * 0.12, 0.02)));
          const seal = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.018, 10, 28),
            i < 3 ? new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.2, metalness: 1, transparent: true }) : M.glow(THREE, 0xffb347, 0.9));
          seal.position.set(0, -0.26, 0.04); D.add(seal);
          return { seal, i, done: i < 3 };
        });
        const lg = new THREE.BufferGeometry(), lp = new Float32Array(3 * 6);
        for (let i = 0; i < 3; i++) {
          lp[i * 6] = -1.2 + i * 0.8; lp[i * 6 + 1] = 0.04; lp[i * 6 + 2] = 0.07;
          lp[i * 6 + 3] = -1.2 + (i + 1) * 0.8; lp[i * 6 + 4] = 0.04; lp[i * 6 + 5] = 0.07;
        }
        lg.setAttribute('position', new THREE.BufferAttribute(lp, 3));
        G.add(new THREE.LineSegments(lg, M.line(THREE, a, 0.45)));
        const gate = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.02, 10, 44, Math.PI), M.glow(THREE, a, 0.65));
        gate.position.set(1.52, -0.14, 0.06); G.add(gate);
        acts.push((t, dt, e) => {
          docs.forEach(d => {
            pulse(d.seal, d.done ? 0.9 : 0.25 + 0.75 * Math.abs(Math.sin(t * 3)), e);
            d.seal.rotation.z = t * (0.4 + d.i * 0.08);
          });
          pulse(gate, 0.5 + 0.5 * Math.sin(t * 1.5), e);
        });
      }
      return { group: g, parts: P, update(t, dt, e) { acts.forEach(f => f(t, dt, e)); } };
    },

    // MASTERS & CHAMPIONS — podium + season ring, weight-category ladder,
    // result→protocol→rank chain, classification codex with the appeal window
    podium(THREE, a) {
      const g = new THREE.Group(), acts = [], P = parts4(THREE, g);
      {                                                   // 0 · SCALE — 124 title holders around one podium, 46 season starts
        const hs = [1.35, 0.95, 0.72], xs = [0, -1.42, 1.42], cols = [GOLD, 0xd8dde3, 0xc08a4a], meds = [];
        hs.forEach((h, i) => {
          P[0].add(box(THREE, 1.26, h, 1.26, M.std(THREE, i ? 0x131a22 : 0x1b242e, 0.4, 0.55), xs[i], -1.3 + h / 2, 0));
          P[0].add(box(THREE, 1.32, 0.04, 1.32, M.glow(THREE, cols[i], i ? 0.5 : 0.9), xs[i], -1.3 + h + 0.02, 0));
          P[0].add(loop4(THREE, 1.28, 1.28, -1.3 + h, M.line(THREE, cols[i], 0.6)).translateX(xs[i]));
          const med = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.05, 44),
            new THREE.MeshStandardMaterial({ color: cols[i], roughness: 0.16, metalness: 1, transparent: true }));
          med.rotation.x = Math.PI / 2; med.position.set(xs[i], -1.3 + h + 0.62, 0); P[0].add(med); meds.push(med);
          P[0].add(box(THREE, 0.12, 0.34, 0.02, M.paint(THREE, i ? 0x25313c : 0x2f3b2a, 0.9), xs[i], -1.3 + h + 0.88, 0));
        });
        const beam = new THREE.Mesh(new THREE.ConeGeometry(1.5, 3.6, 30, 1, true), M.glow(THREE, 0xfff3d0, 0.07));
        beam.position.y = 1.4; beam.rotation.x = Math.PI; P[0].add(beam);
        const N = 124, pos = new Float32Array(N * 3), seed = [];
        for (let i = 0; i < N; i++) seed.push({ th: Math.random() * 6.28, r: 2.0 + Math.random() * 0.95, s: 0.35 + Math.random() * 0.8, y: Math.random() * 0.3 });
        const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        P[0].add(new THREE.Points(pg, M.dot(THREE, GOLD, 0.06, 0.8)));
        const ticks = [];
        for (let i = 0; i < 46; i++) {                    // the season: every start, medalled ones lit gold
          const th = i / 46 * Math.PI * 2, hit = i % 3 === 0;
          const tk = box(THREE, 0.026, 0.02, hit ? 0.24 : 0.12, M.glow(THREE, hit ? GOLD : a, hit ? 0.8 : 0.3),
            Math.cos(th) * 3.1, -1.31, Math.sin(th) * 3.1);
          tk.rotation.y = -th; P[0].add(tk); ticks.push(tk);
        }
        acts.push((t, dt, e) => {
          meds.forEach((m, i) => { m.rotation.y = t * (0.9 - i * 0.2); });
          for (let i = 0; i < N; i++) {
            const s = seed[i], th = s.th + t * 0.1 * s.s;
            pos[i * 3] = Math.cos(th) * s.r; pos[i * 3 + 1] = -1.22 + s.y + Math.sin(t + i) * 0.02; pos[i * 3 + 2] = Math.sin(th) * s.r;
          }
          pg.attributes.position.needsUpdate = true;
          ticks.forEach((tk, i) => pulse(tk, 0.4 + 0.6 * Math.abs(Math.sin(t * 1.1 - i * 0.18)), e));
          pulse(beam, 0.7 + 0.3 * Math.sin(t * 1.2), e);
        });
      }
      {                                                   // 1 · DISCIPLINES — weight-category ladder, cup bracket, masters class
        const G = new THREE.Group(); G.position.set(-2.95, 0.2, 0); G.rotation.y = 0.55; P[1].add(G);
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.7), M.glow(THREE, CYAN, 0.05)));
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.7, 8, 6), M.wire(THREE, CYAN, 0.14)));
        const rungs = [0, 1, 2, 3, 4, 5].map(i => {
          const act = i === 2;
          const r = box(THREE, 0.9 + i * 0.13, 0.055, 0.02, M.glow(THREE, act ? GOLD : a, act ? 0.9 : 0.4), -0.28, 0.66 - i * 0.24, 0.05);
          G.add(r);
          const d = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), M.glow(THREE, act ? GOLD : CYAN, 0.8));
          d.position.set(0.72, 0.66 - i * 0.24, 0.05); G.add(d);
          return { r, d, i, act };
        });
        const br = new THREE.BufferGeometry(), bp = new Float32Array(5 * 6);
        for (let i = 0; i < 5; i++) {
          bp[i * 6] = 0.72; bp[i * 6 + 1] = 0.66 - i * 0.24; bp[i * 6 + 2] = 0.05;
          bp[i * 6 + 3] = 0.72; bp[i * 6 + 4] = 0.66 - (i + 1) * 0.24; bp[i * 6 + 5] = 0.05;
        }
        br.setAttribute('position', new THREE.BufferAttribute(bp, 3));
        G.add(new THREE.LineSegments(br, M.line(THREE, a, 0.4)));
        const mst = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.018, 10, 30), M.glow(THREE, 0xffb347, 0.75));
        mst.position.set(-0.78, -0.72, 0.06); G.add(mst);
        acts.push((t, dt, e) => {
          rungs.forEach(rg => {
            pulse(rg.r, rg.act ? 0.7 + 0.3 * Math.sin(t * 2.4) : 0.35 + 0.35 * Math.abs(Math.sin(t * 1.1 + rg.i * 0.6)), e);
            rg.d.scale.setScalar(1 + 0.25 * Math.sin(t * 1.8 + rg.i));
          });
          mst.rotation.z = t * 0.6;
        });
      }
      {                                                   // 2 · TECHNOLOGY — result → protocol → rank, Elo curve, RFID medallion
        const G = new THREE.Group(); G.position.set(2.95, 0.2, 0); G.rotation.y = -0.55; P[2].add(G);
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.7), M.glow(THREE, CYAN, 0.05)));
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.7, 8, 6), M.wire(THREE, CYAN, 0.14)));
        const chain = [0, 1, 2].map(i => {
          const c = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.34, 0.34), M.wire(THREE, i === 2 ? GOLD : a, 0.55));
          c.position.set(-0.68 + i * 0.68, 0.5, 0.2); G.add(c);
          const core = box(THREE, 0.2, 0.2, 0.2, M.glow(THREE, i === 2 ? GOLD : CYAN, 0.6), -0.68 + i * 0.68, 0.5, 0.2); G.add(core);
          return { c, core, i };
        });
        const flow = new THREE.BufferGeometry(), fp = new Float32Array(2 * 6);
        flow.setAttribute('position', new THREE.BufferAttribute(fp, 3));
        for (let i = 0; i < 2; i++) {
          fp[i * 6] = -0.68 + i * 0.68; fp[i * 6 + 1] = 0.5; fp[i * 6 + 2] = 0.2;
          fp[i * 6 + 3] = -0.68 + (i + 1) * 0.68; fp[i * 6 + 4] = 0.5; fp[i * 6 + 5] = 0.2;
        }
        G.add(new THREE.LineSegments(flow, M.line(THREE, a, 0.5)));
        const n = 90, ep = new Float32Array(n * 3), eg = new THREE.BufferGeometry();
        for (let i = 0; i < n; i++) { ep[i * 3] = -0.95 + (i / n) * 1.9; ep[i * 3 + 1] = -0.2; ep[i * 3 + 2] = 0.05; }
        eg.setAttribute('position', new THREE.BufferAttribute(ep, 3));
        G.add(new THREE.Line(eg, M.line(THREE, GOLD, 0.85)));
        const rfid = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.04, 36),
          new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.18, metalness: 1, transparent: true }));
        rfid.rotation.x = Math.PI / 2; rfid.position.set(0, -0.62, 0.1); G.add(rfid);
        const waves = [0, 1, 2].map(() => {
          const r = new THREE.Mesh(new THREE.RingGeometry(0.18, 0.21, 34), M.glow(THREE, a, 0.55));
          r.position.set(0, -0.62, 0.11); G.add(r); return r;
        });
        acts.push((t, dt, e) => {
          chain.forEach(c => { c.c.rotation.y = t * (0.5 + c.i * 0.2); c.c.rotation.x = t * 0.2; pulse(c.core, 0.4 + 0.6 * Math.abs(Math.sin(t * 1.6 - c.i * 0.9)), e); });
          for (let i = 0; i < n; i++) {
            const u = i / n;
            ep[i * 3 + 1] = -0.42 + 0.44 * (u * u * 0.8 + 0.2 * Math.sin(u * 9 + t * 0.9) * u);
          }
          eg.attributes.position.needsUpdate = true;
          rfid.rotation.z = t * 0.8;
          waves.forEach((r, i) => { const k = (t * 0.7 + i / 3) % 1; r.scale.setScalar(0.6 + k * 2.1); pulse(r, (1 - k), e); });
        });
      }
      {                                                   // 3 · STANDARD — classification codex, judge licences, 72 h appeal window
        const G = new THREE.Group(); G.position.set(0, -0.66, 2.55); G.rotation.x = -0.5; P[3].add(G);
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.5), M.glow(THREE, CYAN, 0.045)));
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.5, 12, 5), M.wire(THREE, CYAN, 0.13)));
        const rows = [0, 1, 2, 3].map(i => {
          const R = new THREE.Group(); R.position.set(-0.55, 0.42 - i * 0.28, 0.05); G.add(R);
          R.add(box(THREE, 1.9, 0.2, 0.02, M.std(THREE, 0x16202a, 0.5, 0.3)));
          const tick = box(THREE, 0.09, 0.09, 0.02, M.glow(THREE, i === 3 ? 0xffb347 : a, 0.9), -0.86, 0, 0.02); R.add(tick);
          R.add(box(THREE, 0.9, 0.03, 0.02, M.glow(THREE, CYAN, 0.4), -0.1, 0.03, 0.02));
          return { tick, i };
        });
        const dial = new THREE.Group(); dial.position.set(1.32, -0.06, 0.08); G.add(dial);
        dial.add(new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.014, 8, 56), M.glow(THREE, a, 0.5)));
        const arc = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.38, 48, 1, 0, Math.PI * 0.75), M.glow(THREE, 0xffb347, 0.7));
        dial.add(arc);
        const hold = new THREE.Mesh(new THREE.IcosahedronGeometry(0.13, 1), M.wire(THREE, 0xffb347, 0.5));
        dial.add(hold);
        acts.push((t, dt, e) => {
          rows.forEach(r => pulse(r.tick, r.i === 3 ? 0.3 + 0.7 * Math.abs(Math.sin(t * 3)) : 0.9, e));
          arc.rotation.z = -t * 0.8;
          hold.rotation.y = t * 0.7; hold.rotation.x = t * 0.4;
        });
      }
      return { group: g, parts: P, update(t, dt, e) { acts.forEach(f => f(t, dt, e)); } };
    },

    // MASTERY — holographic sports passport
    passport(THREE, a) {
      const g = new THREE.Group();
      const card = new THREE.Mesh(new THREE.BoxGeometry(2.7, 1.74, 0.05), new THREE.MeshPhysicalMaterial({
        color: 0x08151f, roughness: 0.12, metalness: 0.85, iridescence: 1, iridescenceIOR: 1.8,
        clearcoat: 1, transparent: true
      }));
      g.add(card);
      g.add(loop4(THREE, 2.62, 0.001, 0, M.line(THREE, a, 0)).translateZ(0.03));
      const frame = new THREE.Mesh(new THREE.PlaneGeometry(2.58, 1.62), M.wire(THREE, a, 0.25));
      frame.position.z = 0.03; g.add(frame);
      const crest = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.035, 16, 44), new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.15, metalness: 1, transparent: true }));
      crest.position.set(-0.86, 0.42, 0.06); g.add(crest);
      const chip = box(THREE, 0.3, 0.24, 0.02, new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.25, metalness: 1, transparent: true }), -0.86, -0.3, 0.05); g.add(chip);
      const rows = [];
      for (let i = 0; i < 6; i++) {
        const w = 0.5 + Math.random() * 0.9;
        const r = box(THREE, w, 0.05, 0.01, M.glow(THREE, i % 2 ? CYAN : a, 0.7), -0.25 + w / 2, 0.52 - i * 0.2, 0.05);
        g.add(r); rows.push(r);
      }
      const qn = 10, qim = new THREE.InstancedMesh(new THREE.BoxGeometry(0.05, 0.05, 0.01), M.glow(THREE, WHITE, 0.75), qn * qn);
      const d = new THREE.Object3D();
      for (let i = 0; i < qn * qn; i++) {
        const x = i % qn, y = Math.floor(i / qn);
        d.position.set(0.86 + (x - qn / 2) * 0.058, -0.42 + (y - qn / 2) * 0.058, 0.05);
        d.scale.setScalar(Math.random() > 0.45 ? 1 : 0.001); d.updateMatrix(); qim.setMatrixAt(i, d.matrix);
      }
      g.add(qim);
      const sweep = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 2.0), M.glow(THREE, 0xa8f0ff, 0.2));
      sweep.position.z = 0.09; sweep.rotation.z = 0.32; g.add(sweep);
      const holo = new THREE.Mesh(new THREE.PlaneGeometry(2.7, 1.74, 18, 12), M.wire(THREE, a, 0.1));
      holo.position.z = 0.12; g.add(holo);
      return {
        spin: true, group: g,
        update(t) {
          g.rotation.x = Math.sin(t * 0.5) * 0.14;
          sweep.position.x = ((t * 0.9) % 2.6) - 1.3;
          rows.forEach((r, i) => { r.material.opacity = (r.material.userData.o0 || 0.7) * (0.5 + 0.5 * Math.sin(t * 2 + i * 0.6)); });
          crest.rotation.z = t * 0.6;
          holo.material.opacity = (holo.material.userData.o0 || 0.1) * (0.5 + 0.5 * Math.sin(t * 1.3));
        }
      };
    },

    // RANKS — three medallion tiers orbiting a verified core
    medals(THREE, a) {
      const g = new THREE.Group();
      const cols = [GOLD, 0xd8dde3, 0xc08a4a];
      const meds = cols.map((c, i) => {
        const grp = new THREE.Group();
        const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.44 - i * 0.05, 0.44 - i * 0.05, 0.06, 52),
          new THREE.MeshStandardMaterial({ color: c, roughness: 0.16, metalness: 1, transparent: true }));
        disc.rotation.x = Math.PI / 2; grp.add(disc);
        const rim = new THREE.Mesh(new THREE.TorusGeometry(0.47 - i * 0.05, 0.015, 12, 56), M.glow(THREE, c, 0.7)); grp.add(rim);
        const ribbon = box(THREE, 0.2, 0.5, 0.02, M.paint(THREE, i ? 0x22303c : 0x2d3a26, 0.92), 0, 0.6, 0); grp.add(ribbon);
        grp.position.set((i - 1) * 1.5, 0.1 - i * 0.16, 0); g.add(grp); return grp;
      });
      const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.34, 1), M.wire(THREE, a, 0.4));
      core.position.y = -0.85; g.add(core);
      const shells = [0, 1, 2].map(i => {
        const r = new THREE.Mesh(new THREE.TorusGeometry(0.7 + i * 0.45, 0.007, 8, 110), M.glow(THREE, a, 0.4 - i * 0.08));
        r.rotation.x = Math.PI / 2 + i * 0.3; r.position.y = -0.85; g.add(r); return r;
      });
      return {
        group: g,
        update(t) {
          meds.forEach((m, i) => { m.rotation.y = t * (0.8 - i * 0.18); m.position.y = (0.1 - i * 0.16) + Math.sin(t * 1.3 + i) * 0.06; });
          core.rotation.y = t * 0.5;
          shells.forEach((s, i) => { s.rotation.z = t * (0.3 - i * 0.08) * (i % 2 ? -1 : 1); });
        }
      };
    },

    // YOUTH ACADEMY — U8–U18 cohort staircase, specialisation pods,
    // growth + skill panel, consent gate
    academy(THREE, a) {
      const g = new THREE.Group(), acts = [], P = parts4(THREE, g);
      {                                                   // 0 · SCALE — six age steps, the cohort thinning as it climbs
        const T = 6, kids = [];
        for (let i = 0; i < T; i++) {
          const w = 4.4 - i * 0.62, h = 0.28;
          P[0].add(box(THREE, w, h, w, M.std(THREE, i % 2 ? 0x101720 : 0x161f29, 0.5, 0.4), 0, -1.32 + i * h + h / 2, 0));
          P[0].add(box(THREE, w + 0.03, 0.014, w + 0.03, M.glow(THREE, i === T - 1 ? GOLD : a, 0.22 + i * 0.14), 0, -1.32 + i * h + h + 0.008, 0));
        }
        const crown = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.03, 14, 48),
          new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.16, metalness: 1, transparent: true }));
        crown.rotation.x = Math.PI / 2; crown.position.y = 0.55; P[0].add(crown);
        for (let i = 0; i < 40; i++) {                    // the cohort — fewer markers on every higher step
          const tier = Math.min(T - 1, Math.floor(Math.pow(i / 40, 0.62) * T));
          const m = new THREE.Mesh(new THREE.SphereGeometry(0.048, 14, 10), M.glow(THREE, tier > 3 ? GOLD : a, 0.85));
          m.userData.step = { th: (i / 40) * 6.28, r: (4.4 - tier * 0.62) / 2 - 0.22, tier, i };
          P[0].add(m); kids.push(m);
        }
        const ret = new THREE.Mesh(new THREE.RingGeometry(2.62, 2.72, 80, 1, 0, Math.PI * 2 * 0.74), M.glow(THREE, a, 0.55));
        ret.rotation.x = -Math.PI / 2; ret.position.y = -1.33; P[0].add(ret);
        const lost = new THREE.Mesh(new THREE.RingGeometry(2.62, 2.72, 80, 1, Math.PI * 2 * 0.74, Math.PI * 2 * 0.26), M.glow(THREE, 0xffb347, 0.35));
        lost.rotation.x = -Math.PI / 2; lost.position.y = -1.33; P[0].add(lost);
        const rise = (() => {
          const n = 160, p = new Float32Array(n * 3);
          const bg = new THREE.BufferGeometry(); bg.setAttribute('position', new THREE.BufferAttribute(p, 3));
          const pp = new THREE.Points(bg, M.dot(THREE, a, 0.05, 0.6)); P[0].add(pp);
          return { pp, p, n, seed: Array.from({ length: n }, () => ({ x: (Math.random() - 0.5) * 4, z: (Math.random() - 0.5) * 4, u: Math.random() })) };
        })();
        acts.push((t, dt, e) => {
          kids.forEach(m => {
            const u = m.userData.step, th = u.th + t * 0.3;
            m.position.set(Math.cos(th) * u.r, -1.32 + u.tier * 0.28 + 0.33 + Math.sin(t * 2 + u.i) * 0.035, Math.sin(th) * u.r);
          });
          crown.rotation.z = t * 0.5; crown.position.y = 0.55 + Math.sin(t * 1.2) * 0.07;
          pulse(ret, 0.6 + 0.4 * Math.sin(t * 1.1), e);
          pulse(lost, 0.3 + 0.7 * Math.abs(Math.sin(t * 2.6)), e);
          for (let i = 0; i < rise.n; i++) {
            const s = rise.seed[i], u = (s.u + t * 0.09) % 1;
            rise.p[i * 3] = s.x * (1 - u * 0.5); rise.p[i * 3 + 1] = -1.3 + u * 3.0; rise.p[i * 3 + 2] = s.z * (1 - u * 0.5);
          }
          rise.pp.geometry.attributes.position.needsUpdate = true;
        });
      }
      {                                                   // 1 · DISCIPLINES — ABC base ladder + nine specialisation pods
        const G = new THREE.Group(); G.position.set(-2.95, 0.05, 0); G.rotation.y = 0.55; P[1].add(G);
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(2.3, 1.9), M.glow(THREE, CYAN, 0.05)));
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(2.3, 1.9, 8, 7), M.wire(THREE, CYAN, 0.14)));
        const pods = [];
        for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
          const ring = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.017, 10, 28), M.glow(THREE, (r * 3 + c) % 4 ? a : CYAN, 0.7));
          ring.position.set(-0.62 + c * 0.62, 0.36 - r * 0.46, 0.06); G.add(ring);
          const core = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 9), M.glow(THREE, 0xffffff, 0.75));
          core.position.copy(ring.position); G.add(core);
          pods.push({ ring, core, k: r * 3 + c });
        }
        const abc = [0, 1, 2].map(i => box(THREE, 1.9 - i * 0.2, 0.05, 0.02, M.glow(THREE, i ? a : GOLD, 0.45 + (i ? 0 : 0.35)), 0, -0.78 - i * 0.13, 0.05));
        abc.forEach(b => G.add(b));
        acts.push((t, dt, e) => {
          pods.forEach(p => {
            p.ring.rotation.z = t * (0.3 + p.k * 0.05);
            p.core.scale.setScalar(1 + 0.25 * Math.sin(t * 1.6 + p.k * 0.7));
            pulse(p.ring, 0.4 + 0.6 * Math.abs(Math.sin(t * 1.1 + p.k * 0.5)), e);
          });
          abc.forEach((b, i) => pulse(b, 0.45 + 0.55 * Math.abs(Math.sin(t * 1.4 - i * 0.8)), e));
        });
      }
      {                                                   // 2 · TECHNOLOGY — PHV growth curve, skill matrix, parent portal
        const G = new THREE.Group(); G.position.set(2.95, 0.3, 0); G.rotation.y = -0.55; P[2].add(G);
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(2.3, 1.9), M.glow(THREE, CYAN, 0.05)));
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(2.3, 1.9, 9, 7), M.wire(THREE, CYAN, 0.14)));
        const n = 100, cp = new Float32Array(n * 3), cg = new THREE.BufferGeometry();
        for (let i = 0; i < n; i++) { cp[i * 3] = -0.95 + (i / n) * 1.9; cp[i * 3 + 1] = 0.4; cp[i * 3 + 2] = 0.06; }
        cg.setAttribute('position', new THREE.BufferAttribute(cp, 3));
        G.add(new THREE.Line(cg, M.line(THREE, a, 0.9)));
        const peak = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 9), M.glow(THREE, GOLD, 0.95));
        peak.position.set(0.12, 0.62, 0.07); G.add(peak);
        const halo = new THREE.Mesh(new THREE.RingGeometry(0.09, 0.11, 30), M.glow(THREE, GOLD, 0.6));
        halo.position.copy(peak.position); G.add(halo);
        const cells = [];
        for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) {
          const q = box(THREE, 0.16, 0.16, 0.02, M.glow(THREE, (r + c) % 3 ? CYAN : a, 0.3 + ((r * 6 + c) % 5) * 0.12),
            -0.72 + c * 0.29, -0.32 - r * 0.22, 0.06);
          G.add(q); cells.push({ q, k: r * 6 + c });
        }
        const portal = new THREE.Group(); portal.position.set(0.72, -0.86, 0.1); G.add(portal);
        portal.add(box(THREE, 0.34, 0.5, 0.03, M.std(THREE, 0x16202a, 0.5, 0.35)));
        const scr = box(THREE, 0.28, 0.4, 0.02, M.glow(THREE, a, 0.5), 0, 0, 0.03); portal.add(scr);
        acts.push((t, dt, e) => {
          for (let i = 0; i < n; i++) {
            const u = i / n;                              // height velocity: baseline + the PHV spike
            cp[i * 3 + 1] = 0.16 + u * 0.3 + 0.36 * Math.exp(-Math.pow((u - 0.56) * 6.4, 2)) * (0.9 + 0.1 * Math.sin(t * 1.4));
          }
          cg.attributes.position.needsUpdate = true;
          const k = 0.16 + 0.56 * 0.3 + 0.36 * (0.9 + 0.1 * Math.sin(t * 1.4));
          peak.position.y = k; halo.position.y = k;
          halo.scale.setScalar(1 + 0.4 * Math.sin(t * 2.2));
          cells.forEach(c => pulse(c.q, 0.35 + 0.65 * Math.abs(Math.sin(t * 1.2 + c.k * 0.4)), e));
          pulse(scr, 0.45 + 0.55 * Math.abs(Math.sin(t * 0.9)), e);
        });
      }
      {                                                   // 3 · STANDARD — verified consent gate, sealed record, access log
        const G = new THREE.Group(); G.position.set(0, -0.66, 2.6); G.rotation.x = -0.5; P[3].add(G);
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.5), M.glow(THREE, CYAN, 0.045)));
        G.add(new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1.5, 12, 5), M.wire(THREE, CYAN, 0.13)));
        const shield = new THREE.Group(); shield.position.set(-1.2, 0, 0.08); G.add(shield);
        shield.add(new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.022, 12, 50), M.glow(THREE, a, 0.7)));
        const lock = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.024, 10, 26, Math.PI), M.glow(THREE, GOLD, 0.9));
        lock.position.y = 0.12; shield.add(lock);
        shield.add(box(THREE, 0.26, 0.22, 0.03, M.std(THREE, 0x1b2530, 0.45, 0.5), 0, -0.04, 0));
        const rings = [0, 1].map(() => {
          const r = new THREE.Mesh(new THREE.RingGeometry(0.42, 0.45, 48), M.glow(THREE, a, 0.5));
          shield.add(r); return r;
        });
        const cards = [0, 1, 2].map(i => {
          const C = new THREE.Group(); C.position.set(0.32, 0.4 - i * 0.36, 0.06); G.add(C);
          C.add(box(THREE, 1.5, 0.26, 0.02, M.std(THREE, 0x16202a, 0.5, 0.3)));
          const tick = box(THREE, 0.1, 0.1, 0.02, M.glow(THREE, i === 2 ? 0xffb347 : a, 0.9), -0.64, 0, 0.02); C.add(tick);
          C.add(box(THREE, 0.7, 0.03, 0.02, M.glow(THREE, CYAN, 0.38), 0.02, 0.04, 0.02));
          return { tick, i };
        });
        const vault = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.36, 0.36), M.wire(THREE, GOLD, 0.5));
        vault.position.set(1.42, -0.16, 0.12); G.add(vault);
        acts.push((t, dt, e) => {
          lock.rotation.z = Math.sin(t * 0.9) * 0.18;
          rings.forEach((r, i) => { const k = (t * 0.5 + i / 2) % 1; r.scale.setScalar(1 + k * 0.6); pulse(r, (1 - k) * 0.9, e); });
          cards.forEach(c => pulse(c.tick, c.i === 2 ? 0.3 + 0.7 * Math.abs(Math.sin(t * 3)) : 0.9, e));
          vault.rotation.y = t * 0.5; vault.rotation.x = t * 0.25;
          vault.scale.setScalar(0.9 + 0.08 * Math.sin(t * 1.6));
        });
      }
      return { group: g, parts: P, update(t, dt, e) { acts.forEach(f => f(t, dt, e)); } };
    }
  };
  // legacy aliases
  BUILD.hub = BUILD.gym; BUILD.water = BUILD.pool; BUILD.ring = BUILD.octagon;
  BUILD.pulse = (T, a) => BUILD.human(T, a, 'med'); BUILD.swarm = (T, a) => BUILD.human(T, a, 'coach');
  BUILD.matrix = (T, a) => BUILD.human(T, a, 'ops'); BUILD.orbit = BUILD.medals; BUILD.steps = BUILD.academy;

  if (!customElements.get('artron-scene')) customElements.define('artron-scene', ArtronScene);
})();
