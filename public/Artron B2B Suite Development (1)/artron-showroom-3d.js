(function () {
  'use strict';
  const L = (a, b, t) => a + (b - a) * t, K = (dt, r) => 1 - Math.pow(r, dt), TAU = Math.PI * 2;
  const cv = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return new THREE.CanvasTexture(c); };
  let _rad, _fa, _vg;
  const radial = () => _rad || (_rad = cv(256, 256, (g) => { const r = g.createRadialGradient(128, 128, 0, 128, 128, 128); r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.18, 'rgba(255,255,255,0.55)'); r.addColorStop(0.5, 'rgba(255,255,255,0.12)'); r.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = r; g.fillRect(0, 0, 256, 256); }));
  const floorA = () => _fa || (_fa = cv(256, 256, (g) => { g.fillStyle = '#000'; g.fillRect(0, 0, 256, 256); const r = g.createRadialGradient(128, 128, 0, 128, 128, 128); r.addColorStop(0, '#fff'); r.addColorStop(0.35, '#888'); r.addColorStop(1, '#000'); g.fillStyle = r; g.fillRect(0, 0, 256, 256); }));
  const vgrad = () => _vg || (_vg = cv(4, 256, (g) => { const r = g.createLinearGradient(0, 0, 0, 256); r.addColorStop(0, '#000'); r.addColorStop(0.6, '#555'); r.addColorStop(1, '#fff'); g.fillStyle = r; g.fillRect(0, 0, 4, 256); }));
  const add = (color, op, extra) => new THREE.MeshBasicMaterial(Object.assign({ color, transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, toneMapped: false }, extra || {}));
  const glow = (color, size, op) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: radial(), color, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })); s.scale.set(size, size, 1); return s; };

  function env(r) {
    const pm = new THREE.PMREMGenerator(r), s = new THREE.Scene();
    s.add(new THREE.Mesh(new THREE.BoxGeometry(24, 24, 24), new THREE.MeshBasicMaterial({ color: 0x04070B, side: THREE.BackSide })));
    const panel = (w, h, col, k, x, y, z) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })); m.material.color.set(col).multiplyScalar(k); m.position.set(x, y, z); m.lookAt(0, 0, 0); s.add(m); };
    panel(10, 3, 0xF0F9FF, 2.2, 0, 9, 3);
    panel(1.2, 12, 0x10B981, 2.4, -9, 0, 2);
    panel(1.2, 12, 0xBAE6FD, 1.6, 9, 1, -3);
    panel(14, 0.6, 0xBAE6FD, 1.2, 0, -2, -10);
    const t = pm.fromScene(s, 0.035).texture; pm.dispose(); return t;
  }

  function create(el, o) {
    o = o || {};
    const lite = !!o.lite;
    let neon = new THREE.Color(o.neon ?? 0x10B981), motion = o.motion ?? 1, shift = o.shift ?? 0;
    const r = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: lite ? 'default' : 'high-performance' });
    r.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    r.outputEncoding = THREE.sRGBEncoding; r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.15;
    r.setClearColor(0x000000, 0);
    r.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:pan-y;cursor:grab';
    el.appendChild(r.domElement);
    const scene = new THREE.Scene(); scene.fog = new THREE.FogExp2(0x030508, 0.035);
    scene.environment = env(r);
    const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 200);

    scene.add(new THREE.HemisphereLight(0xBAE6FD, 0x030508, 0.18));
    const key = new THREE.DirectionalLight(0xE6F0FF, 0.75); key.position.set(3, 7, 5); scene.add(key);
    const rim = new THREE.DirectionalLight(0xBAE6FD, 1.1); rim.position.set(-5, 3, -6); scene.add(rim);
    const mouseL = new THREE.PointLight(0xBAE6FD, 1.4, 11); scene.add(mouseL);

    const M = new THREE.Group(); scene.add(M);
    const pick = [];
    const body = new THREE.MeshStandardMaterial({ color: 0x1A2433, metalness: 0.88, roughness: 0.3, envMapIntensity: 0.9 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x080C12, metalness: 0.4, roughness: 0.1, envMapIntensity: 1.3 });
    const steel = new THREE.MeshStandardMaterial({ color: 0xDCE4EE, metalness: 1, roughness: 0.13, envMapIntensity: 1.4 });
    const neonM = new THREE.MeshBasicMaterial({ color: neon.clone(), toneMapped: false });
    const edgeM = new THREE.LineBasicMaterial({ color: neon.clone(), transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
    const iceM = new THREE.MeshBasicMaterial({ color: 0xBAE6FD, toneMapped: false });
    const FY = -1.5, H = 2.25, TOP = FY + H;

    [-1, 1].forEach(sx => {
      const x = sx * 2.1, g = new THREE.BoxGeometry(0.6, H, 2.3);
      const c = new THREE.Mesh(g, body); c.position.set(x, FY + H / 2, 0); M.add(c); pick.push(c);
      const e = new THREE.LineSegments(new THREE.EdgesGeometry(g), edgeM); e.position.copy(c.position); M.add(e);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.07, 2.36), dark); cap.position.set(x, TOP + 0.035, 0); M.add(cap); pick.push(cap);
      const ix = x - sx * 0.305;
      [-0.98, 0.98].forEach(z => { const s = new THREE.Mesh(new THREE.BoxGeometry(0.016, 1.95, 0.035), neonM); s.position.set(ix, FY + H / 2 + 0.04, z); M.add(s); });
      const ht = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.03, 1.96), neonM); ht.position.set(ix, TOP - 0.12, 0); M.add(ht);
      const kb = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.02, 2.34), neonM); kb.position.set(x, FY + 0.05, 0); M.add(kb);
      const ind = new THREE.Mesh(new THREE.CircleGeometry(0.07, 32), neonM); ind.position.set(x, TOP - 0.4, 1.152); M.add(ind);
      const indR = new THREE.Mesh(new THREE.RingGeometry(0.11, 0.122, 48), iceM); indR.position.set(x, TOP - 0.4, 1.152); M.add(indR);
    });
    const rdr = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.03, 0.56), dark); rdr.position.set(-2.1, TOP + 0.085, 0.55); M.add(rdr);
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.42), new THREE.MeshBasicMaterial({ color: 0xBAE6FD, toneMapped: false, transparent: true, opacity: 0.9 })); scr.rotation.x = -Math.PI / 2; scr.position.set(-2.1, TOP + 0.102, 0.55); M.add(scr);
    const scrG = glow(0xBAE6FD, 1.3, 0.55); scrG.position.set(-2.1, TOP + 0.2, 0.55); M.add(scrG);
    const anchor = new THREE.Object3D(); anchor.position.set(-2.1, TOP + 0.12, 0.55); M.add(anchor);

    const hub = new THREE.Group(); hub.position.set(-1.62, 0.12, 0); hub.rotation.z = -0.62; M.add(hub);
    const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.55, 48), body); drum.rotation.z = Math.PI / 2; hub.add(drum); pick.push(drum);
    const capM = new THREE.MeshStandardMaterial({ color: 0x050A08, emissive: neon.clone(), emissiveIntensity: 1.4, metalness: 0.3, roughness: 0.2 });
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.16, 32, 16), capM); cap.position.x = 0.31; hub.add(cap);
    const capG = glow(neon.getHex(), 1.6, 0.7); capG.position.x = 0.36; hub.add(capG);
    const spin = new THREE.Group(); spin.position.x = 0.22; hub.add(spin);
    for (let k = 0; k < 3; k++) {
      const ag = new THREE.CylinderGeometry(0.045, 0.045, 1.75, 24); ag.translate(0, 1.05, 0);
      const arm = new THREE.Mesh(ag, steel); arm.rotation.x = k * TAU / 3; spin.add(arm); pick.push(arm);
      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 12), dark); tip.position.y = 1.93; arm.add(tip);
    }

    const pl = [0.9, -0.9].map(z => { const p = new THREE.PointLight(neon.clone(), 1.3, 6.5); p.position.set(0, 0.1, z); scene.add(p); return p; });

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(26, 26), new THREE.MeshStandardMaterial({ color: 0x070B11, metalness: 0.9, roughness: 0.3, alphaMap: floorA(), transparent: true, envMapIntensity: 0.5, depthWrite: false }));
    floor.rotation.x = -Math.PI / 2; floor.position.y = FY; scene.add(floor);
    const pool = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), add(neon.clone(), 0.24, { map: radial() })); pool.rotation.x = -Math.PI / 2; pool.position.y = FY + 0.004; scene.add(pool);
    const ringM = add(neon.clone(), 0.55), ring = new THREE.Mesh(new THREE.RingGeometry(1.15, 1.17, 160), ringM); ring.rotation.x = -Math.PI / 2; ring.position.y = FY + 0.01; scene.add(ring);
    const outer = new THREE.Mesh(new THREE.RingGeometry(3.2, 3.21, 200), add(0xBAE6FD, 0.2)); outer.rotation.x = -Math.PI / 2; outer.position.y = FY + 0.008; scene.add(outer);
    const tk = []; for (let k = 0; k < 120; k++) { const a = k / 120 * TAU, l = k % 10 === 0 ? 0.28 : 0.1; tk.push(new THREE.Vector3(Math.cos(a) * 3.3, 0, Math.sin(a) * 3.3), new THREE.Vector3(Math.cos(a) * (3.3 + l), 0, Math.sin(a) * (3.3 + l))); }
    const ticks = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(tk), new THREE.LineBasicMaterial({ color: 0xBAE6FD, transparent: true, opacity: 0.3, depthWrite: false, toneMapped: false })); ticks.position.y = FY + 0.01; scene.add(ticks);
    const pulseM = add(neon.clone(), 0), pulse = new THREE.Mesh(new THREE.RingGeometry(1, 1.05, 160), pulseM); pulse.rotation.x = -Math.PI / 2; pulse.position.y = FY + 0.012; scene.add(pulse);
    const beamM = add(neon.clone(), 0, { alphaMap: vgrad() }), beam = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 2.3), beamM); beam.position.set(0, FY + 1.15, 0.15); M.add(beam);

    const halo = new THREE.Group(); halo.position.set(0, 0.1, -4.2); scene.add(halo);
    halo.add(new THREE.Mesh(new THREE.TorusGeometry(4.6, 0.006, 4, 300), add(0xBAE6FD, 0.14)));
    const dash = []; for (let k = 0; k < 72; k++) { const a0 = k / 72 * TAU, a1 = a0 + TAU / 72 * 0.55; for (let j = 0; j < 6; j++) { const u = a0 + (a1 - a0) * j / 6, v = a0 + (a1 - a0) * (j + 1) / 6; dash.push(new THREE.Vector3(Math.cos(u) * 5.9, Math.sin(u) * 5.9, 0), new THREE.Vector3(Math.cos(v) * 5.9, Math.sin(v) * 5.9, 0)); } }
    const dashed = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(dash), new THREE.LineBasicMaterial({ color: neon.clone(), transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })); halo.add(dashed);
    const haloG = glow(neon.getHex(), 16, 0.08); halo.add(haloG);

    const MN = lite ? 120 : 260, mg = new THREE.BufferGeometry(), mp = new Float32Array(MN * 3), mv = [];
    for (let i = 0; i < MN; i++) { const a = Math.random() * TAU, rr = 0.8 + Math.random() * 5; mp[i * 3] = Math.cos(a) * rr; mp[i * 3 + 1] = FY + Math.random() * 4.5; mp[i * 3 + 2] = Math.sin(a) * rr; mv.push(0.05 + Math.random() * 0.18); }
    mg.setAttribute('position', new THREE.BufferAttribute(mp, 3));
    const motes = new THREE.Points(mg, new THREE.PointsMaterial({ size: 0.06, map: radial(), color: 0xBAE6FD, transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false })); motes.frustumCulled = false; scene.add(motes);

    const tag = document.createElement('div');
    tag.style.cssText = 'position:absolute;left:0;top:0;z-index:1;pointer-events:none;display:flex;align-items:center;gap:0;will-change:transform;transition:opacity .4s';
    tag.innerHTML = '<span data-d style="width:7px;height:7px;margin:-3.5px 0 0 -3.5px;border-radius:50%;flex:none"></span><span style="width:46px;height:1px;background:rgba(186,230,253,0.4);flex:none"></span><span style="display:flex;flex-direction:column;gap:3px;padding:8px 12px;border-radius:8px;background:rgba(6,9,14,0.55);backdrop-filter:blur(10px);border:1px solid rgba(186,230,253,0.16);font-family:\'JetBrains Mono\',monospace;font-size:10.5px;letter-spacing:0.12em;white-space:nowrap"><span data-a style="color:#F0F9FF"></span><span data-b style="font-family:\'Noto Sans Georgian\',sans-serif;letter-spacing:0.02em;font-size:11.5px"></span></span>';
    el.appendChild(tag);
    const tA = tag.querySelector('[data-a]'), tB = tag.querySelector('[data-b]'), tD = tag.querySelector('[data-d]');
    let tagTxt = '';
    const setTag = (a, b, hot) => { const k = a + b + hot; if (k === tagTxt) return; tagTxt = k; tA.textContent = a; tB.textContent = b; const c = hot ? '#' + neon.getHexString() : '#A9B9CA'; tB.style.color = c; tD.style.background = '#' + neon.getHexString(); tD.style.boxShadow = '0 0 10px #' + neon.getHexString(); };

    let nx = 0, ny = 0, mx = 0, my = 0, drag = 0, dragS = null, inside = false, follow = true, w = 1, h = 1;
    const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
    const hit = (cx, cy) => { const b = r.domElement.getBoundingClientRect(); ndc.set((cx - b.left) / b.width * 2 - 1, -((cy - b.top) / b.height * 2 - 1)); ray.setFromCamera(ndc, cam); return ray.intersectObjects(pick, false).length > 0; };
    const pm = e => {
      const b = el.getBoundingClientRect();
      inside = e.clientX >= b.left && e.clientX <= b.right && e.clientY >= b.top && e.clientY <= b.bottom;
      if (e.pointerType === 'mouse') { const cx = b.left + b.width * (0.5 + shift); nx = Math.max(-1.3, Math.min(1.3, (e.clientX - cx) / (b.width / 2))); ny = Math.max(-1.3, Math.min(1.3, (e.clientY - (b.top + b.height / 2)) / (b.height / 2))); }
      if (dragS) { const dx = e.clientX - dragS.x; dragS.m = Math.max(dragS.m, Math.abs(dx) + Math.abs(e.clientY - dragS.y)); drag = dragS.d + dx * 0.008; r.domElement.style.cursor = 'grabbing'; }
      else if (inside && e.pointerType === 'mouse') r.domElement.style.cursor = hit(e.clientX, e.clientY) ? 'pointer' : 'grab';
    };
    const pd = e => { dragS = { x: e.clientX, y: e.clientY, d: drag, m: 0 }; };
    const pu = e => { if (!dragS) return; if (dragS.m < 6 && hit(e.clientX, e.clientY) && o.onPass) o.onPass(); dragS = null; r.domElement.style.cursor = 'grab'; };
    const pl2 = () => { nx = 0; ny = 0; };
    window.addEventListener('pointermove', pm); r.domElement.addEventListener('pointerdown', pd); window.addEventListener('pointerup', pu); document.documentElement.addEventListener('pointerleave', pl2);

    const fit = () => {
      w = el.clientWidth || 1; h = el.clientHeight || 1; r.setSize(w, h, false); cam.aspect = w / h;
      if (shift) cam.setViewOffset(w, h, -w * shift, 0, w, h); else cam.clearViewOffset();
      cam.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(fit); ro.observe(el); fit();
    let vis = true; const io = new IntersectionObserver(es => { vis = es[es.length - 1].isIntersecting; }); io.observe(el);

    let tr = 0, cur = 0, flash = 0, pulseT = 9, hotName = '', t = 0, raf;
    const clock = new THREE.Clock(), tmp = new THREE.Vector3(), base = new THREE.Color(), tc = new THREE.Color();
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, clock.getDelta()); if (!vis || document.hidden) return; t += dt;
      const k = K(dt, 0.02), mo = motion;
      mx = L(mx, follow ? nx : 0, K(dt, 0.04)); my = L(my, follow ? ny : 0, K(dt, 0.04));
      const sway = Math.sin(t * 0.32) * 0.12 * mo;
      M.rotation.y = L(M.rotation.y, -0.62 + drag + mx * 0.55 + sway, k);
      M.rotation.x = L(M.rotation.x, my * 0.05, k);
      const a = w / h, dist = Math.max(12.5, 3.5 / (0.268 * a * (1 - 2 * shift) * 0.9), 2.7 / (0.268 * 0.78)), p = 0.2 - my * 0.07;
      cam.position.set(Math.sin(mx * 0.08) * dist * Math.cos(p), -0.2 + dist * Math.sin(p), Math.cos(mx * 0.08) * dist * Math.cos(p));
      cam.lookAt(0, -0.25, 0);
      mouseL.position.set(mx * 4.5, 1.2 - my * 2, 3.2);
      cur = L(cur, tr, K(dt, 0.03)); spin.rotation.x = cur;
      flash = Math.max(0, flash - dt * 0.45);
      const f = flash, breathe = 0.5 + Math.sin(t * 1.6) * 0.5;
      base.copy(neon).multiplyScalar(0.62 + 0.08 * breathe + f * 1.1);
      neonM.color.copy(base); capM.emissive.copy(neon); capM.emissiveIntensity = 1.1 + f * 2.5; capG.material.color.copy(neon);
      edgeM.color.copy(neon); edgeM.opacity = 0.28 + f * 0.45;
      pl.forEach(l => { l.color.copy(neon); l.intensity = 1.1 + 0.2 * breathe + f * 3.2; });
      beamM.color.copy(neon); beamM.opacity = f * 0.22 * (0.9 + Math.sin(t * 14) * 0.1);
      pool.material.color.copy(neon); pool.material.opacity = 0.2 + f * 0.25;
      ringM.color.copy(neon); ringM.opacity = 0.45 + f * 0.5;
      pulseT += dt; const pp = Math.min(1, pulseT / 1.8); pulse.scale.setScalar(1 + pp * 2.4); pulseM.color.copy(neon); pulseM.opacity = (1 - pp) * 0.75;
      dashed.material.color.copy(neon); haloG.material.color.copy(neon);
      dashed.rotation.z += dt * 0.02 * (mo || 0.3); ticks.rotation.y -= dt * 0.01; outer.rotation.z += dt * 0.01;
      scr.material.color.copy(tc.set(0xBAE6FD).lerp(neon, f)); scr.material.opacity = 0.65 + 0.25 * breathe;
      for (let i = 0; i < MN; i++) { mp[i * 3 + 1] += mv[i] * dt * (0.3 + mo); if (mp[i * 3 + 1] > 3.2) mp[i * 3 + 1] = FY; }
      mg.attributes.position.needsUpdate = true; motes.rotation.y += dt * 0.03 * mo;
      anchor.getWorldPosition(tmp); tmp.project(cam);
      const x = (tmp.x * 0.5 + 0.5) * w, y = (-tmp.y * 0.5 + 0.5) * h;
      tag.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) translateY(-50%)';
      tag.style.opacity = o.tag === false ? 0 : 1;
      if (f > 0.25 && hotName) setTag('T-01 · ACCESS GRANTED', 'დაშვება · ' + hotName, true);
      else setTag('T-01 · TRIPOD · ONLINE', 'დააჭირეთ მოდელს — გავლა', false);
      r.render(scene, cam);
    };
    frame();

    return {
      pass(name) { tr += TAU / 3; flash = 1; pulseT = 0; hotName = name || ''; },
      setNeon(hex) { if (neon.getHex() !== hex) { neon.set(hex); tagTxt = ''; } },
      setMotion(m) { motion = m; },
      setShift(s) { if (s !== shift) { shift = s; fit(); } },
      setFollow(v) { follow = v; },
      dispose() {
        cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
        window.removeEventListener('pointermove', pm); r.domElement.removeEventListener('pointerdown', pd); window.removeEventListener('pointerup', pu); document.documentElement.removeEventListener('pointerleave', pl2);
        scene.traverse(x => { x.geometry && x.geometry.dispose(); if (x.material) [].concat(x.material).forEach(m => m.dispose()); });
        scene.environment && scene.environment.dispose(); r.dispose(); r.domElement.remove(); tag.remove();
      }
    };
  }
  window.ArtronShowroom = { create };
})();
