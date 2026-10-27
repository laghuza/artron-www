import {
  MobileTopControls,
  MobileActiveCardRail,
  MobileSlimCardCarousel,
  ArtronMobileShowcase,
  MOBILE_SCREENS_CONFIG,
  SCREEN_ORDER,
} from '@/components/landing/mobile-showcase';

describe('Phase 89 & 90: Mobile Showcase Responsive Architecture & Logic Suite', () => {
  test('Components are properly exported from mobile-showcase barrel', () => {
    expect(MobileTopControls).toBeDefined();
    expect(MobileActiveCardRail).toBeDefined();
    expect(MobileSlimCardCarousel).toBeDefined();
    expect(ArtronMobileShowcase).toBeDefined();
  });

  test('8 screens are partitioned into Group I (0-3: Access/Payment) and Group II (4-7: Progress/Control)', () => {
    const group1 = SCREEN_ORDER.filter((id) => id < 4);
    const group2 = SCREEN_ORDER.filter((id) => id >= 4);

    expect(group1).toEqual([0, 1, 2, 3]);
    expect(group2).toEqual([4, 5, 6, 7]);
  });

  test('Group toggle logic correctly identifies boundary switches', () => {
    // If on screen 1 (Group I) and clicking Group II, jump to 4
    const getTargetFromGroup = (currentId: number, targetGroup: number) => {
      if (targetGroup === 0 && currentId >= 4) return 0;
      if (targetGroup === 1 && currentId < 4) return 4;
      return currentId;
    };

    expect(getTargetFromGroup(1, 1)).toBe(4);
    expect(getTargetFromGroup(3, 1)).toBe(4);
    expect(getTargetFromGroup(5, 0)).toBe(0);
    expect(getTargetFromGroup(7, 0)).toBe(0);
    // Already in that group
    expect(getTargetFromGroup(2, 0)).toBe(2);
    expect(getTargetFromGroup(6, 1)).toBe(6);
  });

  test('Navigation wrap-around logic computes valid screen IDs in [0..7]', () => {
    const getPrev = (id: number) => (id - 1 + SCREEN_ORDER.length) % SCREEN_ORDER.length;
    const getNext = (id: number) => (id + 1) % SCREEN_ORDER.length;

    // Boundary wrapping
    expect(getPrev(0)).toBe(7);
    expect(getNext(7)).toBe(0);

    // Sequential step
    expect(getPrev(3)).toBe(2);
    expect(getNext(3)).toBe(4);
  });

  test('Every screen configuration has required UI properties for MobileActiveCardRail', () => {
    MOBILE_SCREENS_CONFIG.forEach((cfg) => {
      expect(cfg.id).toBeGreaterThanOrEqual(0);
      expect(cfg.id).toBeLessThan(8);
      expect(cfg.badge).toBeTruthy();
      expect(cfg.statusBadge).toBeTruthy();
      expect(cfg.title).toBeTruthy();
      expect(cfg.desc).toBeTruthy();
      expect(cfg.accent).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(cfg.rgb).toMatch(/^\d+,\d+,\d+$/);
    });
  });
});
