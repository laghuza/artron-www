'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AboutVisionCanvasProps {
  scrollStateRef: React.MutableRefObject<{ state: number; active: number }>;
}

export const AboutVisionCanvas: React.FC<AboutVisionCanvasProps> = ({ scrollStateRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth <= 900 || window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const COUNT = Math.round(15000 * (isMobile ? 0.4 : 1));

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 12);

    // Target shapes helpers
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const gauss = () => {
      let u = 0, v = 0;
      while (!u) u = Math.random();
      while (!v) v = Math.random();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    };

    function edgeList(geo: THREE.BufferGeometry) {
      const e = new THREE.EdgesGeometry(geo).attributes.position.array;
      const out: number[][] = [];
      for (let i = 0; i < e.length; i += 6) {
        out.push([e[i], e[i + 1], e[i + 2], e[i + 3], e[i + 4], e[i + 5]]);
      }
      return out;
    }

    const outerEdges = edgeList(new THREE.IcosahedronGeometry(2.1, 0));
    const innerEdges = edgeList(new THREE.DodecahedronGeometry(1.05, 0));
    const icoVerts = (() => {
      const g = new THREE.IcosahedronGeometry(2.1, 0).toNonIndexed().attributes.position.array;
      const m = new Map<string, number[]>();
      for (let i = 0; i < g.length; i += 3) {
        const k = `${g[i].toFixed(3)},${g[i + 1].toFixed(3)},${g[i + 2].toFixed(3)}`;
        m.set(k, [g[i], g[i + 1], g[i + 2]]);
      }
      return [...m.values()];
    })();

    const latLines: number[][] = [];
    const P = [-2, -2 / 3, 2 / 3, 2];
    for (const a of P) {
      for (const b of P) {
        latLines.push([-2, a, b, 2, a, b], [a, -2, b, a, 2, b], [a, b, -2, a, b, 2]);
      }
    }

    const onSeg = (L: number[], j: number) => {
      const t = Math.random();
      return [
        L[0] + (L[3] - L[0]) * t + gauss() * j,
        L[1] + (L[4] - L[1]) * t + gauss() * j,
        L[2] + (L[5] - L[2]) * t + gauss() * j,
      ];
    };

    const chaos = new Float32Array(COUNT * 3);
    const core = new Float32Array(COUNT * 3);
    const lat = new Float32Array(COUNT * 3);
    const inf = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const rnd = new Float32Array(COUNT * 2);

    const pal: [THREE.Color, number][] = [
      [new THREE.Color(0xE2E8F0), 0.70],
      [new THREE.Color(0x94A3B8), 0.15],
      [new THREE.Color(0x10B981), 0.09],
      [new THREE.Color(0xCD7F32), 0.04],
      [new THREE.Color(0xD4AF37), 0.02],
    ];

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      if (Math.random() < 0.6) {
        const k = Math.floor(Math.random() * 5);
        const u = rand(-1.2, 1.2);
        chaos.set([
          u * 10,
          Math.sin(u * 2.1 + k * 1.3) * 1.8 + (k - 2) * 1.1 + gauss() * 0.35,
          Math.cos(u * 1.4 + k) * 2.4 - 1.5 + gauss() * 0.4,
        ], i3);
      } else {
        chaos.set([rand(-11, 11), rand(-6.5, 6.5), rand(-8, 3)], i3);
      }

      const q = Math.random();
      let c: number[];
      if (q < 0.5) c = onSeg(outerEdges[Math.floor(Math.random() * outerEdges.length)], 0.012);
      else if (q < 0.78) c = onSeg(innerEdges[Math.floor(Math.random() * innerEdges.length)], 0.01);
      else if (q < 0.9) {
        const v = icoVerts[Math.floor(Math.random() * icoVerts.length)];
        c = [v[0] + gauss() * 0.05, v[1] + gauss() * 0.05, v[2] + gauss() * 0.05];
      } else {
        const d = new THREE.Vector3(gauss(), gauss(), gauss()).normalize().multiplyScalar(rand(2.6, 3.4));
        c = [d.x, d.y, d.z];
      }
      core.set(c, i3);

      lat.set(onSeg(latLines[Math.floor(Math.random() * latLines.length)], 0.01), i3);
      inf.set([Math.random() * Math.PI * 2, Math.abs(gauss()) * 0.16, Math.random() * Math.PI * 2], i3);

      const r = Math.random();
      let acc = 0;
      let cc = pal[0][0];
      for (const [cl, w] of pal) {
        acc += w;
        if (r <= acc) { cc = cl; break; }
      }
      col.set([cc.r, cc.g, cc.b], i3);
      rnd.set([Math.random(), Math.floor(Math.random() * 9)], i * 2);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(chaos, 3));
    geo.setAttribute('aCore', new THREE.BufferAttribute(core, 3));
    geo.setAttribute('aLat', new THREE.BufferAttribute(lat, 3));
    geo.setAttribute('aInf', new THREE.BufferAttribute(inf, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    geo.setAttribute('aRand', new THREE.BufferAttribute(rnd, 2));

    const uniforms = {
      uTime: { value: 0 },
      uState: { value: 0 },
      uPixel: { value: renderer.getPixelRatio() },
      uSize: { value: isMobile ? 2.6 : 2.2 },
      uFit: { value: 1 },
      uActive: { value: -1 },
      uMouse: { value: new THREE.Vector2(99, 99) },
      uGold: { value: new THREE.Color(0xD4AF37) },
    };

    const mat = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute vec3 aCore, aLat, aInf, aColor;
        attribute vec2 aRand;
        uniform float uTime, uState, uPixel, uSize, uFit, uActive;
        uniform vec2 uMouse;
        uniform vec3 uGold;
        varying vec3 vColor;
        varying float vAlpha;
        vec3 rY(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(c*p.x+s*p.z, p.y, -s*p.x+c*p.z); }
        vec3 rX(vec3 p, float a){ float c=cos(a), s=sin(a); return vec3(p.x, c*p.y-s*p.z, s*p.y+c*p.z); }
        void main(){
          float r = aRand.x;
          vec3 c = position;
          c.x += sin(c.y*.5 + uTime*.16 + r*6.28) * .7;
          c.y += cos(c.x*.33 + uTime*.13 + r*3.1) * .45;
          c.z += sin(c.x*.22 + uTime*.1) * .6;
          vec3 coreP = rX(rY(aCore * (1. + .015*sin(uTime*.8)), uTime*.12), .35) * uFit;
          vec3 latP = rX(rY(aLat, uTime*.07 + .6), .42) * uFit;
          float t = aInf.x + uTime*.05, s = sin(t), co = cos(t), d = 1. + s*s;
          vec3 infP = vec3(4.3*co/d, 2.6*s*co/d, 0.) + vec3(0., cos(aInf.z), sin(aInf.z)) * aInf.y;
          infP = rX(infP, .3) * uFit;
          float k = r * .35;
          float t1 = smoothstep(k, .62 + k, uState);
          float t2 = smoothstep(1. + k, 1.62 + k, uState);
          float t3 = smoothstep(2. + k, 2.62 + k, uState);
          vec3 p = mix(mix(mix(c, coreP, t1), latP, t2), infP, t3);
          float fl = t1*(1. - t1) + t2*(1. - t2) + t3*(1. - t3);
          p += vec3(sin(r*41. + uTime*.7), cos(r*33. + uTime*.6), sin(r*21. + uTime*.5)) * fl * 1.4;
          vec4 w = modelMatrix * vec4(p, 1.);
          vec2 dd = w.xy - uMouse;
          float dist = length(dd);
          w.xy += normalize(dd + 1e-4) * smoothstep(1.9, 0., dist) * .75;
          vec4 mv = viewMatrix * w;
          gl_Position = projectionMatrix * mv;
          float node = step(abs(aRand.y - uActive), .5) * step(fract(r*13.7), .4) * t1 * (1. - t2);
          vColor = mix(aColor, uGold, node);
          gl_PointSize = uSize * (.55 + r*.9) * (1. + node*.9) * uPixel * (11. / -mv.z);
          vAlpha = (.3 + .7*fract(r*7.31)) * (.72 + .28*sin(uTime*1.3 + r*50.)) * mix(.75, 1., t1) + node*.3;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main(){
          float d = length(gl_PointCoord - .5);
          float a = 1. - smoothstep(.28, .5, d);
          if(a < .01) discard;
          gl_FragColor = vec4(vColor, a * vAlpha);
        }
      `,
    });

    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;

    // Solid kinetic core artifact
    const artifact = new THREE.Group();
    const iron = new THREE.MeshStandardMaterial({
      color: 0x23262e,
      metalness: 0.92,
      roughness: 0.36,
      flatShading: true,
      transparent: true,
      opacity: 0,
    });
    const glass = new THREE.MeshStandardMaterial({
      color: 0xa9bccf,
      metalness: 0.2,
      roughness: 0.05,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const bronzeLine = new THREE.LineBasicMaterial({
      color: 0xCD7F32,
      transparent: true,
      opacity: 0,
    });
    const heart = new THREE.Mesh(new THREE.DodecahedronGeometry(0.5, 0), iron);
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(2.08, 0), glass);
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.1, 0)), bronzeLine);
    artifact.add(heart, shell, edges);

    const world = new THREE.Group();
    world.add(points, artifact);
    scene.add(world);

    scene.add(new THREE.AmbientLight(0x6b7a99, 0.5));
    const keyLight = new THREE.DirectionalLight(0xffe2b8, 2.4);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x5f8cff, 1.6);
    rimLight.position.set(-5, -2, -4);
    scene.add(rimLight);

    // Inputs & interaction
    const mouseN = new THREE.Vector2(9, 9);
    const par = new THREE.Vector2();
    let hasPointer = false;

    const onPointerMove = (e: PointerEvent) => {
      hasPointer = true;
      mouseN.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
      par.copy(mouseN);
    };
    const onPointerLeave = () => { hasPointer = false; };
    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null) return;
      par.set(THREE.MathUtils.clamp(e.gamma / 35, -1, 1), THREE.MathUtils.clamp(((e.beta || 0) - 45) / 35, -1, 1));
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });

    const ray = new THREE.Vector3();
    const mouseW = new THREE.Vector2(99, 99);

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      uniforms.uFit.value = Math.min(1, camera.aspect / 1.15);
    }
    window.addEventListener('resize', resize);
    resize();

    // IntersectionObserver to pause loop when not visible
    let isVisible = true;
    let animId = 0;
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.05 });
    if (containerRef.current) observer.observe(containerRef.current);

    const clock = new THREE.Clock();
    let st = 0;
    let gx = 0;

    function frame() {
      animId = requestAnimationFrame(frame);
      if (!isVisible) return;

      const dt = Math.min(clock.getDelta(), 0.05);
      uniforms.uTime.value += dt * (reduced ? 0.25 : 1);
      const targetState = scrollStateRef.current.state;
      st += (targetState - st) * Math.min(1, dt * 2.2);
      uniforms.uState.value = st;
      uniforms.uActive.value = scrollStateRef.current.active;

      const halfW = Math.tan(THREE.MathUtils.degToRad(17.5)) * camera.position.z * camera.aspect;
      const wCore = Math.max(0, 1 - Math.abs(st - 1));
      const tx = (window.innerWidth > 900 ? halfW * 0.42 : 0) * wCore;
      gx += (tx - gx) * Math.min(1, dt * 2.5);
      world.position.x = gx;
      world.position.y = (window.innerWidth > 900 ? 0 : -0.2) * wCore;

      const coreVis = Math.pow(wCore, 3);
      iron.opacity = coreVis;
      glass.opacity = coreVis * 0.07;
      bronzeLine.opacity = coreVis * 0.42;
      artifact.visible = coreVis > 0.01;
      artifact.rotation.set(0.35, uniforms.uTime.value * 0.12, 0);
      heart.rotation.set(uniforms.uTime.value * 0.3, uniforms.uTime.value * 0.2, 0);

      camera.position.x += (par.x * 0.45 - camera.position.x) * dt * 1.5;
      camera.position.y += (par.y * 0.3 - camera.position.y) * dt * 1.5;
      camera.lookAt(0, 0, 0);

      if (hasPointer) {
        ray.set(mouseN.x, mouseN.y, 0.5).unproject(camera).sub(camera.position).normalize();
        const d = -camera.position.z / ray.z;
        mouseW.lerp(new THREE.Vector2(camera.position.x + ray.x * d, camera.position.y + ray.y * d), Math.min(1, dt * 8));
      } else {
        mouseW.lerp(new THREE.Vector2(99, 99), dt * 0.5);
      }
      uniforms.uMouse.value.copy(mouseW);

      renderer.render(scene, camera);
    }
    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('deviceorientation', onDeviceOrientation);
      window.removeEventListener('resize', resize);
      geo.dispose();
      mat.dispose();
      iron.dispose();
      glass.dispose();
      bronzeLine.dispose();
      renderer.dispose();
    };
  }, [scrollStateRef]);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full block" aria-hidden="true" />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(120% 90% at 50% 40%, transparent 40%, rgba(9,10,15,0.75) 100%)',
        }}
      />
    </div>
  );
};
