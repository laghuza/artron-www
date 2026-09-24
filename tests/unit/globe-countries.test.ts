// Mock 'three' to enable running in Jest Node environment without WebGL/ESM errors
jest.mock('three', () => {
  class MockVector3 {
    x = 0; y = 0; z = 0;
    constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
    set(x: number, y: number, z: number) { this.x = x; this.y = y; this.z = z; return this; }
    distanceTo(v: { x: number; y: number; z: number }) {
      const dx = this.x - v.x;
      const dy = this.y - v.y;
      const dz = this.z - v.z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    clone() {
      return new MockVector3(this.x, this.y, this.z);
    }
    normalize() {
      const len = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z) || 1;
      this.x /= len;
      this.y /= len;
      this.z /= len;
      return this;
    }
    multiplyScalar(s: number) {
      this.x *= s;
      this.y *= s;
      this.z *= s;
      return this;
    }
    lerpVectors(v1: { x: number; y: number; z: number }, v2: { x: number; y: number; z: number }, alpha: number) {
      this.x = v1.x + (v2.x - v1.x) * alpha;
      this.y = v1.y + (v2.y - v1.y) * alpha;
      this.z = v1.z + (v2.z - v1.z) * alpha;
      return this;
    }
  }
  class MockVector2 {
    x = 0; y = 0;
    constructor(x = 0, y = 0) { this.x = x; this.y = y; }
  }
  class MockBufferAttribute {
    count: number;
    data: number[];
    constructor(array: number[], itemSize: number) {
      this.data = array;
      this.count = Math.floor(array.length / itemSize);
    }
    getX(i: number) { return this.data[i * 3] ?? 0; }
    getY(i: number) { return this.data[i * 3 + 1] ?? 0; }
    getZ(i: number) { return this.data[i * 3 + 2] ?? 0; }
    setXYZ(i: number, x: number, y: number, z: number) {
      this.data[i * 3] = x;
      this.data[i * 3 + 1] = y;
      this.data[i * 3 + 2] = z;
    }
  }
  class MockBufferGeometry {
    attributes: Record<string, MockBufferAttribute> = {};
    setAttribute(name: string, attr: MockBufferAttribute) { this.attributes[name] = attr; }
    computeBoundingSphere() {}
    computeVertexNormals() {}
    dispose() {}
  }
  class MockShapeGeometry extends MockBufferGeometry {
    constructor(shape: unknown, curveSegments = 1) {
      super();
      // Mock 3 vertices for triangulated shape
      this.attributes['position'] = new MockBufferAttribute([44.7, 41.6, 0, 44.9, 41.6, 0, 44.8, 41.8, 0], 3);
    }
  }
  class MockMaterial {
    opacity = 1;
    transparent = true;
    visible = true;
    dispose() {}
    clone() { return new MockMaterial(); }
  }
  class MockMesh {
    geometry: unknown;
    material: MockMaterial;
    frustumCulled = false;
    renderOrder = 0;
    scale = {
      setScalar: (_s: number) => {},
      set: (_x: number, _y: number, _z: number) => {},
    };
    position = {
      set: (_x: number, _y: number, _z: number) => {},
      copy: (_v: unknown) => {},
    };
    constructor(geo: unknown, mat: MockMaterial) { this.geometry = geo; this.material = mat; }
  }
  class MockLineSegments {
    geometry: unknown;
    material: MockMaterial;
    frustumCulled = false;
    renderOrder = 0;
    constructor(geo: unknown, mat: MockMaterial) { this.geometry = geo; this.material = mat; }
  }
  class MockGroup {
    children: unknown[] = [];
    visible = true;
    name = '';
    add(obj: unknown) { this.children.push(obj); }
  }
  class MockShape {
    points: MockVector2[];
    holes: unknown[] = [];
    constructor(points: MockVector2[]) { this.points = points; }
  }
  class MockPath {
    points: MockVector2[];
    constructor(points: MockVector2[]) { this.points = points; }
  }
  class MockColor {
    hex: string;
    constructor(hex = '#00A3FF') { this.hex = hex; }
  }
  class MockShaderMaterial extends MockMaterial {
    uniforms: Record<string, unknown>;
    constructor(opts: { uniforms?: Record<string, unknown> } = {}) {
      super();
      this.uniforms = opts.uniforms || {};
    }
  }

  return {
    Vector3: MockVector3,
    Vector2: MockVector2,
    BufferGeometry: MockBufferGeometry,
    Float32BufferAttribute: MockBufferAttribute,
    ShapeGeometry: MockShapeGeometry,
    Shape: MockShape,
    Path: MockPath,
    MeshBasicMaterial: MockMaterial,
    LineBasicMaterial: MockMaterial,
    ShaderMaterial: MockShaderMaterial,
    CanvasTexture: MockMaterial,
    SpriteMaterial: MockMaterial,
    Sprite: MockMesh,
    Color: MockColor,
    Mesh: MockMesh,
    LineSegments: MockLineSegments,
    Group: MockGroup,
    AdditiveBlending: 2,
    DoubleSide: 2,
    MathUtils: {
      clamp: (x: number, min: number, max: number) => Math.min(Math.max(x, min), max),
    },
  };
});

import {
  NETWORK_COUNTRIES,
  createSphericalCountryMesh,
} from '@/components/landing/ecosystem/EnneaGlobeCountries';
import { Adm1Feature } from '@/components/landing/ecosystem/EnneaMath';

describe('Phase 43: 3D Globe Spherical Country Contour & Network Expansion Suite', () => {
  describe('1. Active Countries Registry', () => {
    test('should have Georgia registered as the primary LIVE active core', () => {
      const geo = NETWORK_COUNTRIES.find((c) => c.id === 'GEO');
      expect(geo).toBeDefined();
      expect(geo?.status).toBe('LIVE');
      expect(geo?.center.lat).toBeCloseTo(41.7, 1);
      expect(geo?.center.lon).toBeCloseTo(44.8, 1);
      expect(geo?.venuesCount).toBeGreaterThanOrEqual(1);
    });

    test('should provide localized country names in KA, EN, and RU', () => {
      const geo = NETWORK_COUNTRIES.find((c) => c.id === 'GEO');
      expect(geo?.nameKa).toBe('საქართველო');
      expect(geo?.nameEn).toBe('Georgia');
      expect(geo?.nameRu).toBe('Грузия');
    });
  });

  describe('2. Spherical 3D Contour & Mesh Generation', () => {
    const mockFeature: Adm1Feature = {
      properties: { shapeName: 'Tbilisi' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [44.7, 41.6],
            [44.9, 41.6],
            [44.9, 41.8],
            [44.7, 41.8],
            [44.7, 41.6],
          ],
        ],
      },
    };

    test('should create a valid 3D spherical mesh group from GeoJSON features', () => {
      const visual = createSphericalCountryMesh([mockFeature], 0x00e5ff);
      expect(visual.group).toBeDefined();
      expect(visual.group.children.length).toBeGreaterThanOrEqual(2); // core lines + halo lines + skin
      expect(visual.materials.length).toBeGreaterThan(0);
      expect(visual.disposables.length).toBeGreaterThan(0);
    });

    test('should modulate opacity smoothly during transitions', () => {
      const visual = createSphericalCountryMesh([mockFeature], 0x00e5ff);
      visual.setOpacity(0);
      expect(visual.group.visible).toBe(false);

      visual.setOpacity(1);
      expect(visual.group.visible).toBe(true);
    });

    test('should execute tick animations without errors', () => {
      const visual = createSphericalCountryMesh([mockFeature], 0x00e5ff);
      expect(() => {
        visual.tick(1.5, true);
        visual.tick(2.0, false);
      }).not.toThrow();
    });
  });
});
