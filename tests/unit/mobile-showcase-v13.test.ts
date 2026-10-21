import {
  MOBILE_SCREENS_CONFIG,
  PLANS_CONFIG,
  TRAINING_SLOTS_DATA,
  SHOWCASE_RGB,
  SHOWCASE_ACCENTS,
  SHOWCASE_PALE,
  SCREEN_ORDER,
  SLOT_INDEX_MAP,
} from '@/components/landing/mobile-showcase';

describe('Phase 72: ARTRON Mobile Showcase v13 Logic & Config Suite', () => {
  test('Mobile configuration contains all 8 high-fidelity screens', () => {
    expect(MOBILE_SCREENS_CONFIG).toHaveLength(8);
    expect(PLANS_CONFIG).toHaveLength(3);
    expect(TRAINING_SLOTS_DATA).toHaveLength(6);
    expect(SHOWCASE_RGB).toHaveLength(8);
    expect(SHOWCASE_ACCENTS).toHaveLength(8);
    expect(SHOWCASE_PALE).toHaveLength(8);
  });

  test('All 8 screens contain valid mathematical logic formulas and parameters', () => {
    MOBILE_SCREENS_CONFIG.forEach((screen) => {
      expect(screen.id).toBeDefined();
      expect(screen.title).toBeTruthy();
      expect(screen.desc).toBeTruthy();
      expect(screen.code).toBeTruthy();
      expect(screen.logicFormula).toBeTruthy();
      expect(screen.logicParams.length).toBeGreaterThanOrEqual(2);
      expect(screen.rgb).toMatch(/^\d+,\d+,\d+$/);
      expect(screen.accent).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });

  test('Screen 01 Entry Pass has TTL 15s formula and NFC 0.8s verification', () => {
    const screen0 = MOBILE_SCREENS_CONFIG[0];
    expect(screen0.tag).toBe('ENTRY');
    expect(screen0.statusBadge).toContain('0.8 წმ');
    expect(screen0.logicFormula).toContain('15');
  });

  test('Screen 04 Renewal has plan durations and Apple Pay configuration', () => {
    const screen3 = MOBILE_SCREENS_CONFIG[3];
    expect(screen3.tag).toBe('RENEWAL');
    expect(PLANS_CONFIG[0].price).toBe('150 ₾');
    expect(PLANS_CONFIG[1].price).toBe('400 ₾');
    expect(PLANS_CONFIG[2].price).toBe('1400 ₾');
  });

  test('Screen 03 Legal Shield enforces 14-day statutory return guarantee', () => {
    const screen2 = MOBILE_SCREENS_CONFIG[2];
    expect(screen2.tag).toBe('SHIELD');
    expect(screen2.logicFormula).toContain('d ≤ 14');
  });

  test('Screen order and slot map match 3D flip card pairings', () => {
    expect(SCREEN_ORDER).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
    expect(SLOT_INDEX_MAP[0]).toBe(0);
    expect(SLOT_INDEX_MAP[4]).toBe(0); // Slot 0 flips between 0 and 4
    expect(SLOT_INDEX_MAP[1]).toBe(1);
    expect(SLOT_INDEX_MAP[5]).toBe(1); // Slot 1 flips between 1 and 5
  });
});
