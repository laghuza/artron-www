import { ALL_DIMENSIONS, SPEC_TILE_CATEGORIES } from '@/components/landing/pure-sports-mirror/data';
import { SCENE_VIEWS, TILE_FOCUS_POSES } from '@/components/landing/pure-sports-mirror/scene3d/sceneConfig';

describe('SPORT-OS Console Design 2: 3D Digital Twins & Specifications', () => {
  describe('Master Dimensions & Data Parity', () => {
    it('should have exactly 3 master dimensions (Venues, Workforce, Mastery)', () => {
      expect(ALL_DIMENSIONS).toHaveLength(3);
      expect(ALL_DIMENSIONS.map((d) => d.id)).toEqual(['venues', 'workforce', 'mastery']);
    });

    it('each dimension should contain exactly 5 modules (total 15 digital twins)', () => {
      ALL_DIMENSIONS.forEach((dim) => {
        expect(dim.modules).toHaveLength(5);
        dim.modules.forEach((mod) => {
          expect(mod.id).toBeDefined();
          expect(mod.name).toBeDefined();
          expect(mod.kicker).toBeDefined();
          expect(mod.sceneVariant).toBeDefined();
          expect(mod.headline).toBeDefined();
          expect(mod.description).toBeDefined();
          expect(mod.specRows).toHaveLength(4);
        });
      });
    });

    it('should have 4 standard spec tile categories', () => {
      expect(SPEC_TILE_CATEGORIES).toHaveLength(4);
      expect(SPEC_TILE_CATEGORIES[0].title).toBe('მასშტაბი');
      expect(SPEC_TILE_CATEGORIES[1].title).toBe('დისციპლინები');
      expect(SPEC_TILE_CATEGORIES[2].title).toBe('საკვანძო ტექნოლოგია');
      expect(SPEC_TILE_CATEGORIES[3].title).toBe('უმაღლესი სტანდარტი');
    });
  });

  describe('3D Scene Configurations', () => {
    it('should provide camera poses and views for all 15 variants', () => {
      const allVariants = ALL_DIMENSIONS.flatMap((d) => d.modules.map((m) => m.sceneVariant));
      expect(allVariants).toHaveLength(15);

      allVariants.forEach((v) => {
        expect(SCENE_VIEWS[v]).toBeDefined();
        expect(SCENE_VIEWS[v]).toHaveLength(3);
        expect(TILE_FOCUS_POSES[v]).toBeDefined();
        expect(TILE_FOCUS_POSES[v]).toHaveLength(4);
      });
    });
  });
});

