import fs from 'fs';
import path from 'path';
import { VERTICAL_DETAILS, PRICING_TIERS_BY_VERTICAL, CUSTOM_MODULES, MODULE_CATEGORIES } from '../../src/data/pricingData';

describe('Artron SaaS Pricing Architecture & UI Implementation Tests (Phase 28)', () => {
  const pricingSectionPath = path.resolve(process.cwd(), 'src/components/landing/PricingSection.tsx');
  const selectorPath = path.resolve(process.cwd(), 'src/components/landing/pricing/PricingVerticalSelector.tsx');
  const tiersViewPath = path.resolve(process.cwd(), 'src/components/landing/pricing/PricingTiersView.tsx');
  const tierCardPath = path.resolve(process.cwd(), 'src/components/landing/pricing/PricingTierCard.tsx');
  const customBuilderPath = path.resolve(process.cwd(), 'src/components/landing/pricing/PricingCustomBuilder.tsx');
  const builderSummaryPath = path.resolve(process.cwd(), 'src/components/landing/pricing/PricingBuilderSummary.tsx');
  const demoModalPath = path.resolve(process.cwd(), 'src/components/landing/pricing/PricingDemoModal.tsx');

  test('All pricing components exist and respect the maximum line limit (< 300 lines)', () => {
    const files = [
      pricingSectionPath,
      selectorPath,
      tiersViewPath,
      tierCardPath,
      customBuilderPath,
      builderSummaryPath,
      demoModalPath,
    ];

    files.forEach((filePath) => {
      expect(fs.existsSync(filePath)).toBe(true);
      const lines = fs.readFileSync(filePath, 'utf-8').split('\n').length;
      expect(lines).toBeLessThanOrEqual(300);
    });
  });

  test('Verticals data contains exact 3 industry categories with accurate minimum price floors', () => {
    expect(VERTICAL_DETAILS.studio.minPrice).toBe(365);
    expect(VERTICAL_DETAILS.gym.minPrice).toBe(565);
    expect(VERTICAL_DETAILS.pool.minPrice).toBe(745);
  });

  test('Pricing tiers enforce 70 / 200 / 600+ member limits and hardware specifications', () => {
    // Studio
    const studioTiers = PRICING_TIERS_BY_VERTICAL.studio;
    expect(studioTiers.length).toBe(3);
    expect(studioTiers[0].limits.members).toBe('70');
    expect(studioTiers[1].limits.members).toBe('200');
    expect(studioTiers[2].limits.members).toBe('600+');

    // Gym
    const gymTiers = PRICING_TIERS_BY_VERTICAL.gym;
    expect(gymTiers.length).toBe(3);
    expect(gymTiers[0].basePrice).toBe(565);
    expect(gymTiers[0].limits.turnstiles).toBe('1');
    expect(gymTiers[1].basePrice).toBe(745);
    expect(gymTiers[2].basePrice).toBe(1150);

    // Pool
    const poolTiers = PRICING_TIERS_BY_VERTICAL.pool;
    expect(poolTiers.length).toBe(3);
    expect(poolTiers[0].basePrice).toBe(745);
    expect(poolTiers[1].basePrice).toBe(980);
    expect(poolTiers[2].basePrice).toBe(1450);
  });

  test('Custom Plan Builder contains exactly 17 modules across 5 defined categories', () => {
    expect(CUSTOM_MODULES.length).toBe(17);
    expect(MODULE_CATEGORIES.length).toBe(5);

    const coreModules = CUSTOM_MODULES.filter((m) => m.category === 'core');
    const accessModules = CUSTOM_MODULES.filter((m) => m.category === 'access');
    const mobileModules = CUSTOM_MODULES.filter((m) => m.category === 'mobile');
    const commerceModules = CUSTOM_MODULES.filter((m) => m.category === 'commerce');
    const analyticsModules = CUSTOM_MODULES.filter((m) => m.category === 'analytics');

    expect(coreModules.length).toBe(3);
    expect(accessModules.length).toBe(3);
    expect(mobileModules.length).toBe(3);
    expect(commerceModules.length).toBe(3);
    expect(analyticsModules.length).toBe(5);
  });

  test('3-Language dictionaries (ge, en, ru) contain all necessary pricing and module keys', () => {
    const ge = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src/dictionaries/ge.json'), 'utf-8'));
    const en = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src/dictionaries/en.json'), 'utf-8'));
    const ru = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'src/dictionaries/ru.json'), 'utf-8'));

    const requiredKeys = [
      'pricing_title',
      'pricing_select_vertical_label',
      'pricing_vert_studio_title',
      'pricing_vert_gym_title',
      'pricing_vert_pool_title',
      'pricing_mode_tiers',
      'pricing_mode_builder',
      'pricing_hw_qr_only',
      'pricing_hw_turnstile_one',
      'mod_core_crm_name',
      'mod_turnstile_relay_name',
      'mod_mobile_app_name',
      'mod_ai_churn_prediction_name',
      'pricing_modal_title',
      'pricing_builder_btn_request',
    ];

    requiredKeys.forEach((key) => {
      expect(ge[key]).toBeDefined();
      expect(en[key]).toBeDefined();
      expect(ru[key]).toBeDefined();
    });
  });
});
