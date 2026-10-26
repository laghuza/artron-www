import { ALL_DIMENSIONS } from '@/components/landing/pure-sports-mirror/data';
import { MirrorMobileSubNavLens } from '@/components/landing/pure-sports-mirror/hud/MirrorMobileSubNavLens';
import { MirrorDimensionPills } from '@/components/landing/pure-sports-mirror/hud/MirrorDimensionPills';

describe('SPORT-OS Mobile Hybrid Lens Navigation: Specifications & Integrity', () => {
  it('should have shortName defined for all 3 dimensions to prevent mobile clipping', () => {
    expect(ALL_DIMENSIONS).toHaveLength(3);
    expect(ALL_DIMENSIONS[0].shortName).toBe('სივრცეები');
    expect(ALL_DIMENSIONS[1].shortName).toBe('კაპიტალი');
    expect(ALL_DIMENSIONS[2].shortName).toBe('ოსტატობა');
  });

  it('should export MirrorMobileSubNavLens and MirrorDimensionPills components', () => {
    expect(MirrorMobileSubNavLens).toBeDefined();
    expect(typeof MirrorMobileSubNavLens).toBe('function');
    expect(MirrorDimensionPills).toBeDefined();
    expect(typeof MirrorDimensionPills).toBe('function');
  });

  it('each dimension should contain exactly 5 modules for the lens dock', () => {
    ALL_DIMENSIONS.forEach((dim) => {
      expect(dim.modules).toHaveLength(5);
    });
  });
});
