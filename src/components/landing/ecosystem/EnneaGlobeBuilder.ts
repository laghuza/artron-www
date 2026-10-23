import * as THREE from "three";
import {
  SPHERE_R,
  latLonToVec3,
  makeLineMaterial,
  LINE_CYAN,
  DEPTH_FADE_GLSL,
} from "./EnneaMath";

export interface GlobeUniforms {
  [key: string]: THREE.IUniform<any>;
  uColor: { value: THREE.Color };
  uHot: { value: THREE.Color };
  uSize: { value: number };
  uOpacity: { value: number };
  uTime: { value: number };
  uFogDensity: { value: number };
  uBack: { value: number };
  uPixelRatio: { value: number };
  uGlobal: { value: number };
}

export interface GlobeBundle {
  globeGroup: THREE.Group;
  beaconGroup: THREE.Group;
  beaconHitMesh: THREE.Mesh;
  starFieldMesh: THREE.Points;
  uniforms: GlobeUniforms;
  shellMaterial: THREE.MeshBasicMaterial;
  latticeMaterial: THREE.LineBasicMaterial;
  starsMaterial: THREE.PointsMaterial;
  disposables: Array<{ dispose: () => void }>;
}

export function buildEnneaGlobe(accentColor: THREE.Color, titaniumColor: THREE.Color): GlobeBundle {
  const disposables: Array<{ dispose: () => void }> = [];
  const globeGroup = new THREE.Group();

  /* 1. Base Dark Shell */
  const shellGeo = new THREE.SphereGeometry(SPHERE_R * 0.975, 64, 48);
  const shellMaterial = new THREE.MeshBasicMaterial({ color: 0x0b1117, transparent: true, opacity: 1 });
  const shell = new THREE.Mesh(shellGeo, shellMaterial);
  shell.frustumCulled = false;
  shell.renderOrder = 0;
  globeGroup.add(shell);
  disposables.push(shellGeo, shellMaterial);

  /* 2. Fibonacci Point Cloud */
  const N = 2400;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const positions = new Float32Array(N * 3);
  const seeds = new Float32Array(N);
  const pts: THREE.Vector3[] = [];

  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const rad = Math.sqrt(Math.max(0, 1 - y * y));
    const th = golden * i;
    const v = new THREE.Vector3(Math.cos(th) * rad, y, Math.sin(th) * rad).multiplyScalar(SPHERE_R);
    pts.push(v);
    positions[i * 3] = v.x;
    positions[i * 3 + 1] = v.y;
    positions[i * 3 + 2] = v.z;
    seeds[i] = Math.random();
  }

  const uniforms: GlobeUniforms = {
    uColor: { value: accentColor.clone() },
    uHot: { value: titaniumColor.clone() },
    uSize: { value: 2.8 },
    uOpacity: { value: 0.92 },
    uTime: { value: 0 },
    uFogDensity: { value: 0.03 },
    uBack: { value: 0.15 },
    uPixelRatio: { value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1 },
    uGlobal: { value: 1 },
  };

  const pointGeo = new THREE.BufferGeometry();
  pointGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  pointGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  pointGeo.computeBoundingSphere();

  const pointMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms,
    vertexShader: /* glsl */ `
      attribute float aSeed;
      uniform float uSize;
      uniform float uTime;
      uniform float uPixelRatio;
      ${DEPTH_FADE_GLSL}
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
    fragmentShader: /* glsl */ `
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

  const pointCloud = new THREE.Points(pointGeo, pointMat);
  pointCloud.frustumCulled = false;
  pointCloud.renderOrder = 2;
  globeGroup.add(pointCloud);
  disposables.push(pointGeo, pointMat);

  /* 3. Lattice lines between Fibonacci neighbors */
  const segments: number[] = [];
  const maxLen = SPHERE_R * 0.115;
  for (const off of [8, 13, 21, 34, 55]) {
    for (let i = 0; i + off < N; i++) {
      const a = pts[i];
      const b = pts[i + off];
      if (a.distanceTo(b) > maxLen) continue;
      segments.push(a.x * 1.003, a.y * 1.003, a.z * 1.003, b.x * 1.003, b.y * 1.003, b.z * 1.003);
    }
  }
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(segments, 3));
  lineGeo.computeBoundingSphere();
  const latticeMaterial = makeLineMaterial(LINE_CYAN, 0.65);
  const latticeLines = new THREE.LineSegments(lineGeo, latticeMaterial);
  latticeLines.frustumCulled = false;
  latticeLines.renderOrder = 1;
  globeGroup.add(latticeLines);
  disposables.push(lineGeo, latticeMaterial);

  /* 4. Atmospheric Fresnel rim glow */
  const rimGeo = new THREE.SphereGeometry(SPHERE_R * 1.012, 64, 48);
  const rimMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide,
    uniforms: {
      uRim: { value: accentColor.clone().lerp(titaniumColor, 0.45) },
      uPower: { value: 3.4 },
      uGlobal: uniforms.uGlobal,
    },
    vertexShader: /* glsl */ `
      varying vec3 vN; varying vec3 vV;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vN = normalize(mat3(modelViewMatrix) * normal);
        vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uRim; uniform float uPower; uniform float uGlobal;
      varying vec3 vN; varying vec3 vV;
      void main() {
        float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), uPower);
        gl_FragColor = vec4(uRim, f * 0.88 * uGlobal);
      }
    `,
  });
  const rimMesh = new THREE.Mesh(rimGeo, rimMat);
  rimMesh.frustumCulled = false;
  rimMesh.renderOrder = 3;
  globeGroup.add(rimMesh);
  disposables.push(rimGeo, rimMat);

  /* 5. Georgia beacon anchor & raycast target */
  const beaconGroup = new THREE.Group();
  const beaconPos = latLonToVec3(41.7, 44.8, SPHERE_R * 1.005);
  beaconGroup.position.copy(beaconPos);
  beaconGroup.lookAt(beaconPos.clone().multiplyScalar(2));
  beaconGroup.frustumCulled = false;
  beaconGroup.renderOrder = 4;
  globeGroup.add(beaconGroup);

  const beaconHitGeo = new THREE.SphereGeometry(0.26, 14, 12);
  const beaconHitMat = new THREE.MeshBasicMaterial({ visible: false });
  const beaconHitMesh = new THREE.Mesh(beaconHitGeo, beaconHitMat);
  beaconGroup.add(beaconHitMesh);
  disposables.push(beaconHitGeo, beaconHitMat);

  /* 6. Far field stars */
  const farPos: number[] = [];
  for (let i = 0; i < 450; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(9 + Math.random() * 15);
    farPos.push(v.x, v.y, v.z);
  }
  const farGeo = new THREE.BufferGeometry();
  farGeo.setAttribute("position", new THREE.Float32BufferAttribute(farPos, 3));
  farGeo.computeBoundingSphere();
  const starsMaterial = new THREE.PointsMaterial({
    color: accentColor.getHex(),
    size: 0.055,
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
    fog: false,
  });
  const starFieldMesh = new THREE.Points(farGeo, starsMaterial);
  disposables.push(farGeo, starsMaterial);

  return {
    globeGroup,
    beaconGroup,
    beaconHitMesh,
    starFieldMesh,
    uniforms,
    shellMaterial,
    latticeMaterial,
    starsMaterial,
    disposables,
  };
}
