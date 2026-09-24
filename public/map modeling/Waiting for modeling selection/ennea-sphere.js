import * as THREE from 'three';

const R = 2.0;
const BG = 0x0a0d12;
const ICE = new THREE.Color(0x7fd4ff);
const TITANIUM = new THREE.Color(0xc9d8e0);

const GEORGIA = { lat: 41.7, lon: 44.8 };

/* ── Georgia drill-down data ── */
const ADM1_URL = 'https://media.githubusercontent.com/media/wmgeolab/geoBoundaries/9469f09/releaseData/gbOpen/GEO/ADM1/geoBoundaries-GEO-ADM1_simplified.geojson';
const HUBS = [
  { id: 'tbilisi', name: 'Tbilisi Hub', shapes: ['Tbilisi'] },
  { id: 'imereti', name: 'Imereti / Kutaisi Hub', shapes: ['Imereti'] },
];
const TURNSTILE = 'ZKTeco IoT Turnstiles';
const GATEWAY = 'Bank of Georgia 1-Click Gateway';
const STATUS = 'LIVE IN PRODUCTION // 24/7 ACTIVE';
const VENUES = [
  { id: 'x-area', name: 'X AREA GYM', hub: 'tbilisi', category: 'Premium Club', city: 'Tbilisi', lat: 41.7245, lon: 44.7735, accent: '#CCFF00', members: '11,000+', status: STATUS, turnstile: TURNSTILE, gateway: GATEWAY },
  { id: 'flex', name: 'Flex Fitness', hub: 'tbilisi', category: 'Premium Club', city: 'Tbilisi', lat: 41.7168, lon: 44.7948, accent: '#00D2FF', members: '3,000+', status: STATUS, turnstile: TURNSTILE, gateway: GATEWAY },
  { id: 'pixl', name: 'PIXL Fitness', hub: 'tbilisi', category: 'Functional Gym', city: 'Tbilisi', lat: 41.7402, lon: 44.7431, accent: '#FF4D4D', members: '2,800+', status: STATUS, turnstile: TURNSTILE, gateway: GATEWAY },
  { id: 'zona-15', name: 'Fitness Zona 15', hub: 'tbilisi', category: 'Functional Gym', city: 'Tbilisi', lat: 41.7042, lon: 44.7592, accent: '#22C55E', members: '1,400+', status: STATUS, turnstile: TURNSTILE, gateway: GATEWAY },
  { id: 'athletic', name: 'Athletic.\u10d0\u10d7\u10da\u10d4\u10e2\u10d8\u10d9\u10d8', hub: 'imereti', category: 'Performance Gym', city: 'Kutaisi', lat: 42.2471, lon: 42.6693, accent: '#FF9900', members: '840+', status: STATUS, turnstile: TURNSTILE, gateway: GATEWAY },
];

const MAP_SCALE = 34;
const MAP_CENTER = { lat: 42.05, lon: 43.5 };
const DEPTH_INERT = 0.09;
const DEPTH_LIVE = 0.24;
const PIN_H = 0.42;
const CHIP_H = 44;
const TRANSITION_S = 1.35;
const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const LINE_LIFT = 1.003;

/* depth-safe line defaults: no z-fighting against the shell / map faces */
function hardenLine(m) {
  m.transparent = true;
  m.depthWrite = false; // fixes z-fighting / per-frame border dropouts
  m.depthTest = true;
  m.blending = THREE.AdditiveBlending;
  m.needsUpdate = true;
}

/* never cull — fast angular spins used to pop geometry out of frame */
function pinInFrustum(root) {
  root.frustumCulled = false;
  root.traverse((o) => {
    o.frustumCulled = false;
    if (o.geometry && o.geometry.isBufferGeometry && !o.geometry.boundingSphere) o.geometry.computeBoundingSphere();
  });
}

function mercator(lon, lat) {
  const la = (Math.max(-85, Math.min(85, lat)) * Math.PI) / 180;
  return [(lon * Math.PI) / 180, Math.log(Math.tan(Math.PI / 4 + la / 2))];
}
const MAP_ORIGIN = mercator(MAP_CENTER.lon, MAP_CENTER.lat);
function projectFlat(lon, lat) {
  const m = mercator(lon, lat);
  return [(m[0] - MAP_ORIGIN[0]) * MAP_SCALE, (m[1] - MAP_ORIGIN[1]) * MAP_SCALE];
}
function projectWorld(lon, lat, y) {
  const p = projectFlat(lon, lat);
  return new THREE.Vector3(p[0], y, -p[1]);
}
function ringPoints(ring) {
  const out = [];
  for (let i = 0; i < ring.length; i++) {
    const p = projectFlat(ring[i][0], ring[i][1]);
    out.push(new THREE.Vector2(p[0], p[1]));
  }
  return out;
}
function featureShapes(feature) {
  const g = feature.geometry;
  if (!g) return [];
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  const shapes = [];
  (polys || []).forEach((poly) => {
    const outer = poly && poly[0];
    if (!outer || outer.length < 4) return;
    const shape = new THREE.Shape(ringPoints(outer));
    for (let i = 1; i < poly.length; i++) {
      if (poly[i].length > 3) shape.holes.push(new THREE.Path(ringPoints(poly[i])));
    }
    shapes.push(shape);
  });
  return shapes;
}
function outlinePositions(shapes, y) {
  const pos = [];
  const push = (pts) => {
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 1) % pts.length];
      pos.push(a.x, y, -a.y, b.x, y, -b.y);
    }
  };
  shapes.forEach((s) => {
    push(s.getPoints(2));
    s.holes.forEach((h) => push(h.getPoints(2)));
  });
  return pos;
}

function latLon(lat, lon, r = R) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function glowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, 'rgba(226,244,255,1)');
  grd.addColorStop(0.22, 'rgba(127,212,255,0.5)');
  grd.addColorStop(1, 'rgba(127,212,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// shared chunk: 1.0 in front of the sphere, 0.15 behind it (kills the Necker illusion)
const FADE_GLSL = `
  uniform float uFogDensity;
  uniform float uBack;
  varying float vFade;
  float depthFade(vec4 mv, vec3 nrmWorld) {
    vec3 n = normalize(mat3(modelViewMatrix) * nrmWorld);
    vec3 v = normalize(-mv.xyz);
    float facing = dot(n, v);
    float f = mix(uBack, 1.0, smoothstep(-0.25, 0.5, facing));
    float d = -mv.z;
    float fog = exp(-uFogDensity * uFogDensity * d * d);
    return f * fog;
  }
`;

class EnneaSphere extends HTMLElement {
  connectedCallback() {
    if (this._built) return;
    this._built = true;
    this.style.display = 'block';
    this.style.position = 'relative';
    if (!this.style.width) this.style.width = '100%';
    if (!this.style.height) this.style.height = '100%';
    this._activeCore = -1;
    this._selected = false;
    this._mode = 'GLOBE';
    this._venue = null;
    this._region = null;
    this._hoverRegion = null;
    this._dead = false;
    this._build();
  }

  disconnectedCallback() { this._teardown && this._teardown(); }

  _build() {
    const accent = new THREE.Color(this.getAttribute('accent') || '#7fd4ff');
    const N = parseInt(this.getAttribute('points') || '2400', 10);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(BG, 0.03);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.near = 0.1;
    camera.far = 100.0;
    camera.updateProjectionMatrix();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance', stencil: false });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const cv = renderer.domElement;
    cv.style.position = 'absolute';
    cv.style.inset = '0';
    cv.style.width = '100%';
    cv.style.height = '100%';
    cv.style.zIndex = '0';
    cv.style.cursor = 'grab';
    cv.style.touchAction = 'none';
    this.appendChild(cv);
    this._renderer = renderer;

    const world = new THREE.Group();
    world.name = 'ennea-world';
    scene.add(world);
    const globe = new THREE.Group();
    globe.name = 'ennea-globe';
    world.add(globe);

    const disposables = [];

    // ── inner shell: gives the point cloud a solid, non-transparent body ──
    const shellGeo = new THREE.SphereGeometry(R * 0.975, 64, 48);
    const shellMat = new THREE.MeshBasicMaterial({ color: 0x0b1117, fog: true, transparent: true });
    shellMat.name = 'core-shell';
    const shell = new THREE.Mesh(shellGeo, shellMat);
    shell.name = 'core-shell';
    globe.add(shell);
    disposables.push(shellGeo, shellMat);

    // ── Fibonacci spiral point mesh ──
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pos = new Float32Array(N * 3);
    const seed = new Float32Array(N);
    const pts = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const th = golden * i;
      const v = new THREE.Vector3(Math.cos(th) * rad, y, Math.sin(th) * rad).multiplyScalar(R);
      pts.push(v);
      pos[i * 3] = v.x; pos[i * 3 + 1] = v.y; pos[i * 3 + 2] = v.z;
      seed[i] = Math.random();
    }

    const uniforms = {
      uColor: { value: accent.clone() },
      uHot: { value: TITANIUM.clone() },
      uSize: { value: 2.6 },
      uOpacity: { value: 0.92 },
      uTime: { value: 0 },
      uFogDensity: { value: 0.03 },
      uBack: { value: Math.max(0.05, Math.min(1, parseFloat(this.getAttribute('depthfade')) || 0.15)) },
      uPixelRatio: { value: Math.min(devicePixelRatio, 2) },
      uGlobal: { value: 1 },
    };

    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    ptGeo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    ptGeo.computeBoundingSphere();
    const ptMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms,
      vertexShader: `
        attribute float aSeed;
        uniform float uSize;
        uniform float uTime;
        uniform float uPixelRatio;
        ${FADE_GLSL}
        varying float vSeed;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vFade = depthFade(mv, normalize(position));
          vSeed = aSeed;
          float tw = 0.75 + 0.45 * sin(uTime * 1.4 + aSeed * 31.4);
          gl_PointSize = uSize * tw * uPixelRatio * (6.5 / max(0.001, -mv.z));
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uHot;
        uniform float uOpacity;
        uniform float uGlobal;
        varying float vFade;
        varying float vSeed;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;
          float shape = smoothstep(0.5, 0.05, d);
          vec3 col = mix(uColor, uHot, step(0.93, vSeed));
          gl_FragColor = vec4(col, shape * vFade * uOpacity * uGlobal);
        }
      `,
    });
    ptMat.name = 'fibonacci-points';
    const points = new THREE.Points(ptGeo, ptMat);
    points.name = 'fibonacci-point-mesh';
    globe.add(points);
    disposables.push(ptGeo, ptMat);

    // ── hexagonal connection lines (Fibonacci-lattice neighbours) ──
    const segs = [];
    const maxLen = R * 0.115;
    [34, 55].forEach((off) => {
      for (let i = 0; i + off < N; i += 1) {
        const a = pts[i], b = pts[i + off];
        if (a.distanceTo(b) > maxLen) continue;
        // lift 0.3% off the point shell so lines can never z-fight the surface
        segs.push(a.x * LINE_LIFT, a.y * LINE_LIFT, a.z * LINE_LIFT, b.x * LINE_LIFT, b.y * LINE_LIFT, b.z * LINE_LIFT);
      }
    });
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(segs, 3));
    lineGeo.computeBoundingSphere();
    const lineMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms,
      vertexShader: `
        ${FADE_GLSL}
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vFade = depthFade(mv, normalize(position));
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uGlobal;
        varying float vFade;
        void main() { gl_FragColor = vec4(uColor, vFade * 0.16 * uGlobal); }
      `,
    });
    lineMat.name = 'hex-mesh';
    hardenLine(lineMat);
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    lines.name = 'hex-connection-lines';
    globe.add(lines);
    disposables.push(lineGeo, lineMat);

    // ── Fresnel rim (titanium / ice-blue silhouette glow) ──
    const rimGeo = new THREE.SphereGeometry(R * 1.012, 64, 48);
    const rimMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
      uniforms: { uRim: { value: accent.clone().lerp(TITANIUM, 0.45) }, uPower: { value: 3.4 }, uGlobal: uniforms.uGlobal },
      vertexShader: `
        varying vec3 vN; varying vec3 vV;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vN = normalize(mat3(modelViewMatrix) * normal);
          vV = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uRim; uniform float uPower; uniform float uGlobal;
        varying vec3 vN; varying vec3 vV;
        void main() {
          float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), uPower);
          gl_FragColor = vec4(uRim, f * 0.85 * uGlobal);
        }
      `,
    });
    rimMat.name = 'fresnel-rim';
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.name = 'fresnel-rim';
    globe.add(rim);
    disposables.push(rimGeo, rimMat);

    // ── Georgia beacon [41.7N / 44.8E] ──
    const tex = glowTexture();
    disposables.push(tex);
    const beacon = new THREE.Group();
    beacon.name = 'georgia-beacon';
    const bp = latLon(GEORGIA.lat, GEORGIA.lon, R * 1.005);
    beacon.position.copy(bp);
    beacon.lookAt(bp.clone().multiplyScalar(2));
    globe.add(beacon);

    const bCoreGeo = new THREE.SphereGeometry(0.032, 18, 14);
    const bCoreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    bCoreMat.name = 'beacon-core';
    const bCore = new THREE.Mesh(bCoreGeo, bCoreMat);
    bCore.name = 'beacon-core';
    beacon.add(bCore);
    disposables.push(bCoreGeo, bCoreMat);

    const ringGeo = new THREE.TorusGeometry(0.075, 0.005, 8, 48);
    const ringMat = new THREE.MeshBasicMaterial({ color: accent.getHex(), transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false });
    ringMat.name = 'beacon-ring';
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.name = 'beacon-ring';
    beacon.add(ring);
    disposables.push(ringGeo, ringMat);

    const pulseMat = ringMat.clone();
    pulseMat.name = 'beacon-pulse';
    const pulse = new THREE.Mesh(ringGeo, pulseMat);
    pulse.name = 'beacon-pulse';
    beacon.add(pulse);
    disposables.push(pulseMat);

    const haloMat = new THREE.SpriteMaterial({ map: tex, color: accent.getHex(), transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false });
    haloMat.name = 'beacon-halo';
    const halo = new THREE.Sprite(haloMat);
    halo.scale.setScalar(0.46);
    halo.name = 'beacon-halo';
    beacon.add(halo);
    disposables.push(haloMat);

    // five venue micro-nodes clustered around the capital
    const venueMat = new THREE.MeshBasicMaterial({ color: TITANIUM.getHex(), transparent: true, opacity: 0.8 });
    venueMat.name = 'venue-node';
    const venueGeo = new THREE.SphereGeometry(0.014, 10, 8);
    disposables.push(venueGeo, venueMat);
    const venues = [];
    [[42.3, 43.0], [41.6, 41.6], [41.9, 45.5], [42.1, 44.0], [41.4, 45.9]].forEach(([la, lo], i) => {
      const m = new THREE.Mesh(venueGeo, venueMat);
      m.name = 'venue-' + (i + 1);
      m.position.copy(latLon(la, lo, R * 1.004));
      globe.add(m);
      venues.push(m);
    });

    // generous invisible hit sphere so the Georgia node itself is clickable
    const bHitGeo = new THREE.SphereGeometry(0.16, 12, 10);
    const bHitMat = new THREE.MeshBasicMaterial({ visible: false });
    const bHit = new THREE.Mesh(bHitGeo, bHitMat);
    bHit.name = 'beacon-hit';
    beacon.add(bHit);
    disposables.push(bHitGeo, bHitMat);

    /* ════════════ STAGE 2 · GEORGIA EXTRUDED VECTOR MAP ════════════ */

    scene.add(new THREE.AmbientLight(0x93b6c9, 0.75));
    const keyLight = new THREE.DirectionalLight(0xdff2ff, 1.15);
    keyLight.position.set(2.6, 5.2, 3.1);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(accent.getHex(), 0.5);
    fillLight.position.set(-3.4, 2.2, -2.8);
    scene.add(fillLight);

    const mapStage = new THREE.Group();
    mapStage.name = 'georgia-map-stage';
    mapStage.visible = false;
    world.add(mapStage);

    const regionEntries = [];
    const pinEntries = [];
    const mapMeshes = [];
    const pinHits = [];
    const fadeMats = [];
    const baseOpacity = new Map();
    const registerFade = (m, base) => {
      m.transparent = true;
      baseOpacity.set(m, base === undefined ? m.opacity : base);
      fadeMats.push(m);
    };

    // crisp HTML labels over the WebGL map
    const hud = document.createElement('div');
    hud.style.cssText = 'position:absolute;inset:0;z-index:9;pointer-events:none;overflow:hidden';
    this.appendChild(hud);
    this._hud = hud;

    const mkLabel = (html, interactive) => {
      const el = document.createElement('div');
      // wrapper stays hit-transparent: the painted box carries the transform,
      // so the click target must live on the child, not here
      el.style.cssText = 'position:absolute;left:0;top:0;opacity:0;pointer-events:none;will-change:transform,opacity;font-variant-numeric:tabular-nums;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale';
      el.innerHTML = html;
      if (interactive && el.firstElementChild) {
        el.firstElementChild.style.pointerEvents = 'auto';
        el.firstElementChild.style.cursor = 'pointer';
      }
      hud.appendChild(el);
      return el;
    };

    const hubFor = (shapeName) => HUBS.find((h) => h.shapes.some((s) => s.toLowerCase() === String(shapeName).toLowerCase())) || null;

    const buildPin = (v, top, idx, siblings) => {
      const col = new THREE.Color(v.accent);
      const g = new THREE.Group();
      g.name = 'pin-' + v.id;
      // venues inside one city sit metres apart — fan them on a small ring
      // around the hub centroid so every pin stays individually clickable
      const hubEntry = regionEntries.find((r) => r.id === v.hub);
      if (siblings > 1 && hubEntry) {
        const a = -Math.PI / 2 + (idx * 2 * Math.PI) / siblings;
        g.position.set(hubEntry.center.x + Math.cos(a) * 0.105, top, hubEntry.center.z + Math.sin(a) * 0.105);
      } else {
        g.position.copy(projectWorld(v.lon, v.lat, top));
      }
      mapStage.add(g);

      const stemGeo = new THREE.CylinderGeometry(0.006, 0.006, PIN_H, 6, 1, true);
      const stemMat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.y = PIN_H / 2;
      g.add(stem);
      disposables.push(stemGeo, stemMat);
      registerFade(stemMat, 0.55);

      const headGeo = new THREE.OctahedronGeometry(0.042, 0);
      const headMat = new THREE.MeshBasicMaterial({ color: col, transparent: true });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = PIN_H;
      g.add(head);
      disposables.push(headGeo, headMat);
      registerFade(headMat, 1);

      const hMat = new THREE.SpriteMaterial({ map: tex, color: col, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false });
      const hSprite = new THREE.Sprite(hMat);
      hSprite.scale.setScalar(0.3);
      hSprite.position.y = PIN_H;
      g.add(hSprite);
      disposables.push(hMat);
      registerFade(hMat, 0.75);

      const rGeo = new THREE.RingGeometry(0.05, 0.062, 40);
      const rMat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.8, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false });
      const gRing = new THREE.Mesh(rGeo, rMat);
      gRing.rotation.x = -Math.PI / 2;
      gRing.position.y = 0.004;
      g.add(gRing);
      disposables.push(rGeo, rMat);
      registerFade(rMat, 0.8);

      const hitGeo = new THREE.SphereGeometry(0.115, 10, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hit = new THREE.Mesh(hitGeo, hitMat);
      hit.position.y = PIN_H;
      hit.userData = { hit: 'PIN', venueId: v.id };
      g.add(hit);
      pinHits.push(hit);
      disposables.push(hitGeo, hitMat);

      const label = mkLabel(
        '<div style="transform:translate(12px,calc(-100% - ' + (14 + idx * 50) + 'px));white-space:nowrap;padding:6px 10px;background:rgba(13,17,23,0.78);border:1px solid rgba(255,255,255,0.12);box-shadow:0 10px 26px rgba(0,0,0,0.45);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);cursor:pointer">' +
          '<div style="display:flex;align-items:center;gap:8px"><span style="width:6px;height:6px;border-radius:50%;background:' + v.accent + '"></span>' +
          '<span style="font-family:\'IBM Plex Mono\',monospace;font-size:10.5px;font-weight:500;letter-spacing:0.08em;color:#EAF4FF">' + v.name + '</span></div>' +
          '<div style="margin-top:2px;font-family:\'IBM Plex Mono\',monospace;font-size:9px;letter-spacing:0.14em;color:#7FA6BA">' + v.members + ' \u00B7 ' + v.city + '</div>' +
        '</div>',
        true
      );
      label.firstElementChild.addEventListener('click', () => this.selectVenue(this._venue === v.id ? null : v.id));

      // chips for one hub stack from a single anchor so they never collide
      const labelAnchor = siblings > 1 && hubEntry
        ? hubEntry.center.clone().setY(top + PIN_H)
        : g.position.clone().setY(top + PIN_H);
      pinEntries.push({ id: v.id, def: v, group: g, head, ring: gRing, ringMat: rMat, haloMat: hMat, label, box: label.firstElementChild, fan: 14 + idx * 50, slot: idx, down: siblings === 1, anchor: labelAnchor, seed: Math.random() * 6.28 });
    };

    const buildMap = (features) => {
      const seen = new Set();
      features.forEach((feature) => {
        const shapeName = String((feature.properties && feature.properties.shapeName) || '');
        const shapes = featureShapes(feature);
        if (!shapes.length) return;
        const hub = hubFor(shapeName);
        const live = !!hub;
        const top = live ? DEPTH_LIVE : DEPTH_INERT;

        const geo = new THREE.ExtrudeGeometry(shapes, { depth: top, bevelEnabled: false, curveSegments: 2 });
        geo.rotateX(-Math.PI / 2);
        geo.computeVertexNormals();
        geo.computeBoundingSphere();
        const faceMat = new THREE.MeshStandardMaterial({
          color: live ? 0x16222c : 0x0f171e,
          roughness: 0.66,
          metalness: 0.22,
          emissive: new THREE.Color(live ? accent.getHex() : 0x0a1016),
          emissiveIntensity: live ? 0.14 : 0.04,
          transparent: true,
        });
        faceMat.name = 'region-' + (hub ? hub.id : shapeName.toLowerCase());
        const mesh = new THREE.Mesh(geo, faceMat);
        mesh.name = faceMat.name;
        mesh.userData = { hit: 'REGION', regionId: hub ? hub.id : null };
        mapStage.add(mesh);
        mapMeshes.push(mesh);
        disposables.push(geo, faceMat);
        registerFade(faceMat, 1);

        const bGeo = new THREE.BufferGeometry();
        bGeo.setAttribute('position', new THREE.Float32BufferAttribute(outlinePositions(shapes, top + 0.004), 3));
        bGeo.computeBoundingSphere();
        const borderMat = new THREE.LineBasicMaterial({ color: live ? 0xffffff : 0xe8f8ff, transparent: true, opacity: live ? 0.95 : 0.3, depthWrite: false, blending: THREE.AdditiveBlending });
        borderMat.name = 'border-' + (hub ? hub.id : 'inert');
        hardenLine(borderMat);
        mapStage.add(new THREE.LineSegments(bGeo, borderMat));
        disposables.push(bGeo, borderMat);
        registerFade(borderMat, live ? 0.95 : 0.3);

        // additive twin, lifted a hair — reads as a glowing boundary
        const glowMat = new THREE.LineBasicMaterial({ color: accent.getHex(), transparent: true, opacity: live ? 0.55 : 0.16, blending: THREE.AdditiveBlending, depthWrite: false });
        hardenLine(glowMat);
        const glowLines = new THREE.LineSegments(bGeo, glowMat);
        glowLines.position.y = 0.008;
        mapStage.add(glowLines);
        disposables.push(glowMat);
        registerFade(glowMat, live ? 0.55 : 0.16);

        const center = new THREE.Box3().setFromObject(mesh).getCenter(new THREE.Vector3());
        center.y = top;

        if (hub && !seen.has(hub.id)) {
          seen.add(hub.id);
          const label = mkLabel(
            '<div style="transform:translate(-50%,24px);white-space:nowrap;padding:4px 10px;background:rgba(13,17,23,0.6);border:1px solid rgba(255,255,255,0.15);font-family:\'IBM Plex Mono\',monospace;font-size:9.5px;letter-spacing:0.2em;text-transform:uppercase;color:#CFE6F2;backdrop-filter:blur(6px)">' + hub.name + '</div>',
            false
          );
          regionEntries.push({ id: hub.id, name: hub.name, live, mesh, faceMat, borderMat, glowMat, top, center, label });
        }
      });

      VENUES.forEach((v) => {
        const entry = regionEntries.find((r) => r.id === v.hub);
        const sibs = VENUES.filter((x) => x.hub === v.hub);
        buildPin(v, entry ? entry.top : DEPTH_LIVE, sibs.indexOf(v), sibs.length);
      });

      const grid = new THREE.GridHelper(14, 28, accent.getHex(), 0x16222c);
      grid.material.opacity = 0.055;
      hardenLine(grid.material);
      grid.position.y = -0.01;
      mapStage.add(grid);
      registerFade(grid.material, 0.055);
      disposables.push(grid.geometry, grid.material);

      pinInFrustum(mapStage);
      this._mapReady = true;
      this.dispatchEvent(new CustomEvent('mapstatus', { detail: { status: 'READY', venues: VENUES.length }, bubbles: true }));
      if (this._mode === 'GEORGIA_DETAIL') mix = 1;
    };

    this.dispatchEvent(new CustomEvent('mapstatus', { detail: { status: 'LOADING' }, bubbles: true }));
    fetch(ADM1_URL)
      .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then((json) => {
        if (this._dead) return;
        const feats = (json && json.features) || [];
        if (!feats.length) throw new Error('empty');
        buildMap(feats);
      })
      .catch(() => {
        if (!this._dead) this.dispatchEvent(new CustomEvent('mapstatus', { detail: { status: 'ERROR' }, bubbles: true }));
      });

    // far field
    const farPos = [];
    for (let i = 0; i < 420; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(9 + Math.random() * 14);
      farPos.push(v.x, v.y, v.z);
    }
    const farGeo = new THREE.BufferGeometry();
    farGeo.setAttribute('position', new THREE.Float32BufferAttribute(farPos, 3));
    farGeo.computeBoundingSphere();
    const farMat = new THREE.PointsMaterial({ color: accent.getHex(), size: 0.05, transparent: true, opacity: 0.3, depthWrite: false, fog: false });
    farMat.name = 'star-field';
    const field = new THREE.Points(farGeo, farMat);
    field.name = 'star-field';
    world.add(field);
    pinInFrustum(globe);
    pinInFrustum(field);
    disposables.push(farGeo, farMat);

    // ── damped orbit (no pan, clamped zoom) ──
    // frame the Georgia beacon on first paint (slightly off-centre, tilted toward the equator)
    const gv = latLon(GEORGIA.lat, GEORGIA.lon, 1).normalize();
    const HOME = {
      theta: Math.atan2(gv.x, gv.z) - 0.3,
      phi: Math.min(Math.PI - 0.4, Math.acos(Math.max(-1, Math.min(1, gv.y))) + 0.24),
      dist: 6.0,
    };
    const cam = { ...HOME };
    const target = { ...HOME };
    const MIN_D = 3.8, DAMP = 0.05;
    let MAX_D = 8.5;

    // map-stage camera home + per-mode orbit limits
    const MAP_HOME = { theta: 0.09, phi: 0.78, dist: 4.9 };
    /** orbit pivot — origin on the globe, hub/venue centroid in map mode */
    const off = new THREE.Vector3();
    const offTarget = new THREE.Vector3();
    const limits = () => (this._mode === 'GEORGIA_DETAIL'
      ? { min: 2.2, max: 9, phiMin: 0.18, phiMax: 1.27 }
      : { min: MIN_D, max: MAX_D, phiMin: 0.35, phiMax: Math.PI - 0.35 });
    /** 0 = globe owns the frame, 1 = the Georgia map owns it. */
    let mix = 0;
    let trans = null;

    const applyMix = () => {
      uniforms.uGlobal.value = 1 - mix;
      shellMat.opacity = 1 - mix;
      const b = 1 - mix;
      bCoreMat.opacity = b;
      bCoreMat.transparent = true;
      ringMat.opacity *= b;
      pulseMat.opacity *= b;
      haloMat.opacity *= b;
      venueMat.opacity *= b;
      globe.visible = mix < 0.985;
      mapStage.visible = mix > 0.015;
      hud.style.opacity = mix.toFixed(3);
      hud.style.visibility = mix > 0.02 ? 'visible' : 'hidden';
      farMat.opacity = 0.3 * (1 - mix * 0.45);
      for (let i = 0; i < fadeMats.length; i++) {
        const m = fadeMats[i];
        m.opacity = (baseOpacity.get(m) || 1) * mix;
      }
    };

    const flyTo = (mode) => {
      if (this._mode === mode) return;
      this._mode = mode;
      trans = { t: 0, to: mode, phaseB: false };
      /* lock input for the whole move — drag inertia fighting the tween reads as shake */
      dragging = false;
      cv.style.cursor = 'default';
      this._userZoomed = mode === 'GEORGIA_DETAIL';
      // phase A — dive down the Georgia surface normal
      const v = bp.clone().normalize();
      target.phi = Math.acos(Math.max(-1, Math.min(1, v.y)));
      target.theta = Math.atan2(v.x, v.z);
      target.dist = mode === 'GEORGIA_DETAIL' ? 3.2 : 3.6;
      offTarget.set(0, 0, 0);
      this.dispatchEvent(new CustomEvent('viewmode', { detail: { mode }, bubbles: true }));
    };

    const focusRegion = (id) => {
      const r = regionEntries.find((x) => x.id === id);
      if (!r) {
        offTarget.set(0, 0, 0);
        target.theta = MAP_HOME.theta; target.phi = MAP_HOME.phi; target.dist = MAP_HOME.dist;
        return;
      }
      offTarget.copy(r.center);
      target.theta = MAP_HOME.theta;
      target.phi = 0.7;
      target.dist = 2.4;
    };

    const focusVenue = (id) => {
      const p = pinEntries.find((x) => x.id === id);
      if (!p) return;
      // bias right so the selected pin lands clear of the detail card
      offTarget.set(p.group.position.x + 0.5, p.group.position.y + 0.22, p.group.position.z);
      target.phi = 0.66;
      target.dist = Math.min(target.dist, 2.3);
    };

    this._flyTo = flyTo;
    this._focusRegion = focusRegion;
    this._focusVenue = focusVenue;

    const applyCam = () => {
      const s = Math.sin(cam.phi);
      camera.position.set(
        off.x + cam.dist * s * Math.sin(cam.theta),
        off.y + cam.dist * Math.cos(cam.phi),
        off.z + cam.dist * s * Math.cos(cam.theta)
      );
      camera.lookAt(off.x, off.y, off.z);
    };
    applyCam();

    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const castFrom = (e) => {
      const rect = cv.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
    };

    let dragging = false, lx = 0, ly = 0, moved = 0;
    const onDown = (e) => {
      if (trans) return;
      dragging = true; moved = 0; lx = e.clientX; ly = e.clientY;
      cv.setPointerCapture(e.pointerId); cv.style.cursor = 'grabbing';
    };
    const onMove = (e) => {
      if (!dragging) {
        if (trans) return;
        castFrom(e);
        if (this._mode === 'GEORGIA_DETAIL') {
          if (raycaster.intersectObjects(pinHits, false).length) {
            cv.style.cursor = 'pointer';
            if (this._hoverRegion) { this._hoverRegion = null; }
            return;
          }
          const rh = raycaster.intersectObjects(mapMeshes, false)[0];
          const id = (rh && rh.object.userData.regionId) || null;
          cv.style.cursor = id ? 'pointer' : 'grab';
          this._hoverRegion = id;
        } else {
          cv.style.cursor = raycaster.intersectObject(bHit, false).length ? 'pointer' : 'grab';
        }
        return;
      }
      const dx = e.clientX - lx, dy = e.clientY - ly;
      if (trans) { dragging = false; return; }
      moved += Math.abs(dx) + Math.abs(dy);
      const L = limits();
      target.theta -= dx * 0.005;
      target.phi = Math.max(L.phiMin, Math.min(L.phiMax, target.phi - dy * 0.004));
      lx = e.clientX; ly = e.clientY;
    };
    const onUp = (e) => {
      if (!dragging) return;
      dragging = false;
      cv.style.cursor = 'grab';
      if (moved > 6 || trans) return;
      castFrom(e);
      if (this._mode !== 'GEORGIA_DETAIL') {
        if (raycaster.intersectObject(bHit, false).length) flyTo('GEORGIA_DETAIL');
        return;
      }
      const ph = raycaster.intersectObjects(pinHits, false)[0];
      if (ph) {
        const vid = ph.object.userData.venueId;
        this.selectVenue(this._venue === vid ? null : vid);
        return;
      }
      const rh = raycaster.intersectObjects(mapMeshes, false)[0];
      const rid = (rh && rh.object.userData.regionId) || null;
      if (rid) this.selectRegion(this._region === rid ? null : rid);
      else this.selectVenue(null);
    };
    const onWheel = (e) => {
      e.preventDefault();
      if (trans) return;
      this._userZoomed = true;
      const L = limits();
      target.dist = Math.max(L.min, Math.min(L.max, target.dist + e.deltaY * 0.0032));
    };
    cv.addEventListener('pointerdown', onDown);
    cv.addEventListener('pointermove', onMove);
    cv.addEventListener('pointerup', onUp);
    cv.addEventListener('pointercancel', onUp);
    cv.addEventListener('wheel', onWheel, { passive: false });

    const resize = () => {
      const width = this.clientWidth || 720, height = this.clientHeight || 560;
      const pixelRatio = Math.min(window.devicePixelRatio, 2);
      const w = width, h = height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false); // false: never let three.js write inline canvas styles
      uniforms.uPixelRatio.value = pixelRatio;
      cv.style.width = '100%';
      cv.style.height = '100%';
      // fit the full silhouette with ~22% margin whatever the pane aspect is
      const half = Math.tan((camera.fov * Math.PI) / 360);
      const fit = (R * 1.22) / (half * Math.min(1, camera.aspect));
      MAX_D = Math.max(8.5, fit + 0.8);
      HOME.dist = Math.min(MAX_D, fit);
      if (!this._userZoomed) { target.dist = HOME.dist; cam.dist = HOME.dist; applyCam(); }
    };
    this._ro = new ResizeObserver(resize);
    this._ro.observe(this);
    resize();

    // beacon → screen projection, published as CSS vars for the DOM badge
    const wp = new THREE.Vector3();
    const camDir = new THREE.Vector3();
    const projV = new THREE.Vector3();
    let last = performance.now(), t = 0;

    const placeLabel = (el, point, opacity, rect) => {
      if (!el) return null;
      projV.copy(point).project(camera);
      // snap to whole pixels — sub-pixel transforms blur the chip typography
      const x = Math.round((projV.x * 0.5 + 0.5) * rect.width);
      const y = Math.round((-projV.y * 0.5 + 0.5) * rect.height);
      el.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      el.style.opacity = projV.z > 1 ? '0' : opacity.toFixed(3);
      return { x, y };
    };

    const tick = () => {
      this._raf = requestAnimationFrame(tick);
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      uniforms.uTime.value = t;

      if (!dragging && !trans && this._mode !== 'GEORGIA_DETAIL' && this.getAttribute('autorotate') !== 'off') target.theta += dt * 0.045;

      if (trans) {
        trans.t = Math.min(1, trans.t + dt / TRANSITION_S);
        const e = easeInOut(trans.t);
        mix = trans.to === 'GEORGIA_DETAIL' ? Math.min(1, e * 1.25) : 1 - Math.min(1, e * 1.25);
        if (!trans.phaseB && trans.t > 0.42) {
          trans.phaseB = true;
          const H = trans.to === 'GEORGIA_DETAIL' ? MAP_HOME : HOME;
          target.theta = H.theta; target.phi = H.phi; target.dist = H.dist;
        }
        if (trans.t >= 1) { trans = null; this._userZoomed = this._mode === 'GEORGIA_DETAIL'; cv.style.cursor = 'grab'; }
      }
      cam.theta += (target.theta - cam.theta) * (1 - Math.pow(1 - DAMP, dt * 60));
      cam.phi += (target.phi - cam.phi) * (1 - Math.pow(1 - DAMP, dt * 60));
      cam.dist += (target.dist - cam.dist) * (1 - Math.pow(1 - DAMP, dt * 60));
      off.lerp(offTarget, 1 - Math.pow(1 - DAMP, dt * 60));
      applyCam();
      field.rotation.y -= dt * 0.006;

      const hot = this._selected || this._activeCore >= 0;
      ring.rotation.z += dt * (hot ? 1.2 : 0.35);
      ring.material.opacity = hot ? 1 : 0.8;
      halo.material.opacity = (hot ? 0.95 : 0.6) + Math.sin(t * 1.8) * 0.06;
      halo.scale.setScalar(hot ? 0.62 : 0.46);
      const cyc = (t % (hot ? 1.1 : 1.9)) / (hot ? 1.1 : 1.9);
      pulse.scale.setScalar(1 + cyc * 3.4);
      pulse.material.opacity = (1 - cyc) * (hot ? 0.65 : 0.35);
      venues.forEach((m, i) => {
        m.material.opacity = 0.55 + Math.sin(t * 2 + i) * 0.2;
      });

      // ── map stage: hub emphasis, pin pulses, HTML label anchors ──
      const mrect = this.getBoundingClientRect();
      for (let i = 0; i < regionEntries.length; i++) {
        const r = regionEntries[i];
        const on = this._hoverRegion === r.id || this._region === r.id;
        const k = Math.min(1, dt * 8);
        r.faceMat.emissiveIntensity += ((on ? 0.46 : r.live ? 0.14 : 0.04) - r.faceMat.emissiveIntensity) * k;
        baseOpacity.set(r.borderMat, on ? 1 : r.live ? 0.95 : 0.3);
        baseOpacity.set(r.glowMat, on ? 0.95 : r.live ? 0.55 : 0.16);
        r.mesh.scale.y += ((on ? 1.35 : 1) - r.mesh.scale.y) * Math.min(1, dt * 7);
        if (mix > 0.02) placeLabel(r.label, r.center, mix * (on ? 1 : 0.55), mrect);
        else r.label.style.opacity = '0';
      }
      for (let i = 0; i < pinEntries.length; i++) {
        const p = pinEntries[i];
        const sel = this._venue === p.id;
        const beat = (t * (sel ? 1.5 : 0.85) + p.seed) % 1;
        p.ring.scale.setScalar(1 + beat * (sel ? 2.6 : 1.8));
        baseOpacity.set(p.ringMat, (1 - beat) * (sel ? 0.95 : 0.6));
        baseOpacity.set(p.haloMat, sel ? 1 : 0.7);
        p.head.rotation.y += dt * (sel ? 2.4 : 0.9);
        p.head.position.y = PIN_H + Math.sin(t * 1.7 + p.seed) * 0.012 + (sel ? 0.05 : 0);
        if (p.box) {
          p.box.style.borderColor = sel ? p.def.accent : 'rgba(255,255,255,0.12)';
          p.box.style.boxShadow = sel ? '0 0 22px -6px ' + p.def.accent : '0 10px 26px rgba(0,0,0,0.45)';
        }
        if (mix > 0.02) {
          const at = placeLabel(p.label, p.anchor, mix * (sel ? 1 : 0.85), mrect);
          if (at && p.box) {
            // reserve the top-left chrome band (breadcrumb + hub panel) and keep the
            // upward stack inside the HUD box — otherwise the stack flips downward
            const topLimit = at.x < 600 ? 170 : 56;
            const flipDown = p.down || at.y - p.fan - CHIP_H < topLimit;
            const yOff = flipDown ? 34 + p.slot * 50 + 'px' : 'calc(-100% - ' + p.fan + 'px)';
            const xShift = (flipDown && at.x > 200) || at.x > mrect.width - 200 ? 'calc(-100% - 12px)' : '12px';
            p.box.style.transform = 'translate(' + xShift + ',' + yOff + ')';
          }
        } else p.label.style.opacity = '0';
      }
      applyMix();

      beacon.getWorldPosition(wp);
      const rect = this.getBoundingClientRect();
      camera.getWorldDirection(camDir);
      const facing = mix < 0.05 && wp.clone().normalize().dot(camDir) < -0.08;
      const p = wp.clone().project(camera);
      const x = (p.x * 0.5 + 0.5) * rect.width;
      const y = (-p.y * 0.5 + 0.5) * rect.height;
      // flip the leader line / badge inward when the beacon nears an edge
      const flipX = x > rect.width - 320;
      const flipY = y < 130;
      const rot = flipX ? (flipY ? 135 : -135) : (flipY ? 45 : -45);
      this.style.setProperty('--bx', x.toFixed(1) + 'px');
      this.style.setProperty('--by', y.toFixed(1) + 'px');
      this.style.setProperty('--brot', rot + 'deg');
      this.style.setProperty('--blx', (flipX ? -74 : 74) + 'px');
      this.style.setProperty('--bty', (flipY ? 74 : -74) + 'px');
      this.style.setProperty('--bsx', flipX ? '-100%' : '0%');
      this.style.setProperty('--bsy', flipY ? '0%' : '-100%');
      this.style.setProperty('--bvis', facing ? '1' : '0');
      if (this._facing !== facing) {
        this._facing = facing;
        this.dispatchEvent(new CustomEvent('beaconvisibility', { detail: { visible: facing }, bubbles: true }));
      }

      renderer.render(scene, camera);
    };
    tick();

    this._api = {
      zoom: (d) => {
        this._userZoomed = true;
        const L = limits();
        target.dist = Math.max(L.min, Math.min(L.max, target.dist + d));
      },
      reset: () => {
        if (this._mode === 'GEORGIA_DETAIL') {
          this.selectVenue(null);
          this.selectRegion(null);
          offTarget.set(0, 0, 0);
          target.theta = MAP_HOME.theta; target.phi = MAP_HOME.phi; target.dist = MAP_HOME.dist;
          return;
        }
        this._userZoomed = false;
        target.theta = HOME.theta; target.phi = HOME.phi; target.dist = HOME.dist;
      },
      focus: () => {
        this._userZoomed = true;
        const v = bp.clone().normalize();
        target.phi = Math.acos(Math.max(-1, Math.min(1, v.y)));
        target.theta = Math.atan2(v.x, v.z);
        target.dist = 4.4;
      },
      accent: (hex) => {
        const c = new THREE.Color(hex);
        uniforms.uColor.value.copy(c);
        rimMat.uniforms.uRim.value.copy(c.clone().lerp(TITANIUM, 0.45));
        ringMat.color.copy(c); pulseMat.color.copy(c); haloMat.color.copy(c); farMat.color.copy(c);
      },
      density: (v) => { uniforms.uOpacity.value = v; lineMat.uniforms.uOpacity && 0; },
      backfade: (v) => { uniforms.uBack.value = Math.max(0.05, Math.min(1, v)); },
    };

    this._teardown = () => {
      this._dead = true;
      cancelAnimationFrame(this._raf);
      this._ro && this._ro.disconnect();
      cv.removeEventListener('pointerdown', onDown);
      cv.removeEventListener('pointermove', onMove);
      cv.removeEventListener('pointerup', onUp);
      cv.removeEventListener('pointercancel', onUp);
      cv.removeEventListener('wheel', onWheel);
      disposables.forEach((d) => d.dispose && d.dispose());
      hud.remove();
      renderer.dispose();
      scene.clear();
    };
  }

  // public API used by the HTML shell
  zoomIn() { this._api && this._api.zoom(-0.7); }
  zoomOut() { this._api && this._api.zoom(0.7); }
  resetView() { this._api && this._api.reset(); }
  focusGeorgia() { this._api && this._api.focus(); }
  enterGeorgia() { this._flyTo && this._flyTo('GEORGIA_DETAIL'); }
  exitToGlobe() {
    this.selectVenue(null);
    this.selectRegion(null);
    this._hoverRegion = null;
    this._flyTo && this._flyTo('GLOBE');
  }
  selectRegion(id) {
    this._region = id || null;
    this._focusRegion && this._focusRegion(this._region);
    this.dispatchEvent(new CustomEvent('regionselect', { detail: { id: this._region }, bubbles: true }));
  }
  selectVenue(id) {
    this._venue = id || null;
    const def = VENUES.find((v) => v.id === this._venue) || null;
    if (def) { this._region = def.hub; this._focusVenue && this._focusVenue(def.id); }
    this.dispatchEvent(new CustomEvent('venueselect', { detail: { venue: def }, bubbles: true }));
  }
  get venues() { return VENUES; }
  get hubs() { return HUBS; }
  setSelected(v) { this._selected = !!v; }
  /** back-hemisphere node visibility: 0.15 = deep fade, 1 = flat (no fade) */
  setDepthFade(v) { this._api && this._api.backfade(Number(v)); }
  setActiveCore(i) { this._activeCore = typeof i === 'number' ? i : -1; }

  static get observedAttributes() { return ['accent', 'depthfade']; }
  attributeChangedCallback(n, o, v) {
    if (n === 'accent' && v && this._api) this._api.accent(v);
    if (n === 'depthfade' && v && this._api) this._api.backfade(Number(v));
  }
}

if (!customElements.get('ennea-sphere')) customElements.define('ennea-sphere', EnneaSphere);
