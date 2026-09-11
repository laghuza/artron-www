import fs from 'fs';
import path from 'path';
import { SECTION_NODES } from '@/components/navigation/elevatorSections';

describe('B2B Dashboard Consolidation (Approach B: 2 Categories, 6 Master Nodes)', () => {
  const geDict = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/dictionaries/ge.json'), 'utf8'));
  const enDict = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/dictionaries/en.json'), 'utf8'));
  const ruDict = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/dictionaries/ru.json'), 'utf8'));

  test('Both categories must exist across all 3 languages (KA, EN, RU)', () => {
    const categories = ['dashboardFeatures_cat_operations', 'dashboardFeatures_cat_growth'];

    categories.forEach((catKey) => {
      expect(geDict[catKey]).toBeDefined();
      expect(enDict[catKey]).toBeDefined();
      expect(ruDict[catKey]).toBeDefined();

      expect(typeof geDict[catKey]).toBe('string');
      expect(typeof enDict[catKey]).toBe('string');
      expect(typeof ruDict[catKey]).toBe('string');
    });
  });

  test('All 6 feature titles and descriptions must be defined and non-empty in all 3 dictionaries', () => {
    for (let i = 1; i <= 6; i++) {
      const titleKey = `dashboardFeatures_feat${i}_title`;
      const descKey = `dashboardFeatures_feat${i}_desc`;

      // Check Georgian
      expect(geDict[titleKey]).toBeDefined();
      expect(geDict[titleKey].length).toBeGreaterThan(3);
      expect(geDict[descKey]).toBeDefined();
      expect(geDict[descKey].length).toBeGreaterThan(10);

      // Check English
      expect(enDict[titleKey]).toBeDefined();
      expect(enDict[titleKey].length).toBeGreaterThan(3);
      expect(enDict[descKey]).toBeDefined();
      expect(enDict[descKey].length).toBeGreaterThan(10);

      // Check Russian
      expect(ruDict[titleKey]).toBeDefined();
      expect(ruDict[titleKey].length).toBeGreaterThan(3);
      expect(ruDict[descKey]).toBeDefined();
      expect(ruDict[descKey].length).toBeGreaterThan(10);
    }
  });

  test('Merged Feature 4 represents Financial Analytics, Multi-Branch & ROI', () => {
    expect(geDict['dashboardFeatures_feat4_title']).toContain('ფინანსური ანალიტიკა');
    expect(enDict['dashboardFeatures_feat4_title']).toContain('Financial Analytics');
    expect(ruDict['dashboardFeatures_feat4_title']).toContain('Финансовая аналитика');
  });

  test('Feature 5 represents Multimodal AI 5-second onboarding', () => {
    expect(geDict['dashboardFeatures_feat5_title']).toContain('რეგისტრაცია 5 წამში');
    expect(enDict['dashboardFeatures_feat5_title']).toContain('5-Second Registration');
    expect(ruDict['dashboardFeatures_feat5_title']).toContain('Регистрация за 5 секунд');
  });

  test('Feature 6 represents Control Panel Defense and Zero-Fraud', () => {
    expect(geDict['dashboardFeatures_feat6_title']).toContain('სამართავი პანელის თავდაცვა');
    expect(enDict['dashboardFeatures_feat6_title']).toContain('Control Panel Defense');
    expect(ruDict['dashboardFeatures_feat6_title']).toContain('Защита панели управления');
  });

  test('Elevator navigation nodes must cleanly transition from B2B Control Hub (03) to B2C Mobile App (04) to Multimodal AI (05) to Pricing (06)', () => {
    const hubNode = SECTION_NODES.find((node) => node.index === '03');
    const mobileNode = SECTION_NODES.find((node) => node.index === '04');
    const aiNode = SECTION_NODES.find((node) => node.index === '05');
    const pricingNode = SECTION_NODES.find((node) => node.index === '06');

    expect(hubNode).toBeDefined();
    expect(hubNode?.id).toBe('dashboard-features');

    expect(mobileNode).toBeDefined();
    expect(mobileNode?.id).toBe('mobile-app');

    expect(aiNode).toBeDefined();
    expect(aiNode?.id).toBe('ai-intelligence');

    expect(pricingNode).toBeDefined();
    expect(pricingNode?.id).toBe('pricing');
  });

  test('Multimodal AI nav title is localized across all 3 languages', () => {
    expect(geDict['nav_ai']).toBe('AI ასისტენტი');
    expect(enDict['nav_ai']).toBe('AI Assistant');
    expect(ruDict['nav_ai']).toBe('AI Ассистент');
  });
});
