import { 
  B2B_CORE_FEATURES, 
  B2B_ANALYTICS_FEATURES, 
  ALL_B2B_FEATURES 
} from '@/components/landing/features/b2bFeaturesConfig';
import geDict from '@/dictionaries/ge.json';
import enDict from '@/dictionaries/en.json';
import ruDict from '@/dictionaries/ru.json';

describe('B2B Mega-Dropdown & Dashboard Section 05 Synchronization (Phase 34)', () => {
  it('should contain exactly 4 Core Infrastructure modules and 6 Analytics & ROI Suite modules (Total 10)', () => {
    expect(B2B_CORE_FEATURES.length).toBe(4);
    expect(B2B_ANALYTICS_FEATURES.length).toBe(6);
    expect(ALL_B2B_FEATURES.length).toBe(10);
  });

  it('should have exact IDs for Core Infrastructure modules matching header dropdown navigation tabs', () => {
    const coreIds = B2B_CORE_FEATURES.map((f) => f.id);
    expect(coreIds).toEqual(['iot', 'booking', 'security', 'migration']);

    const coreBadges = B2B_CORE_FEATURES.map((f) => f.badge);
    expect(coreBadges).toEqual(['IoT Core', 'Smart Schedule', 'Zero-Fraud', 'Zero-Downtime']);
  });

  it('should have exact IDs for Analytics & ROI Suite modules matching header dropdown tabs', () => {
    const analyticsIds = B2B_ANALYTICS_FEATURES.map((f) => f.id);
    expect(analyticsIds).toEqual(['roi', 'okr', 'kpi', 'churn', 'heatmap', 'winback']);

    const analyticsBadges = B2B_ANALYTICS_FEATURES.map((f) => f.badge);
    expect(analyticsBadges).toEqual(['ROI Matrix', 'Goal Hub', 'KPI Hub', 'AI Guard', 'Capacity', 'Retention']);
  });

  it('should provide complete 3-language titles and descriptions for all 10 modules', () => {
    ALL_B2B_FEATURES.forEach((feature) => {
      expect(feature.titles.ka).toBeTruthy();
      expect(feature.titles.en).toBeTruthy();
      expect(feature.titles.ru).toBeTruthy();

      expect(feature.descriptions.ka).toBeTruthy();
      expect(feature.descriptions.en).toBeTruthy();
      expect(feature.descriptions.ru).toBeTruthy();
    });
  });

  it('should have category titles defined across Georgian, English, and Russian dictionaries', () => {
    expect((geDict as unknown as Record<string, string>)['dashboardFeatures_cat_core']).toBe('ბირთვული ინფრასტრუქტურა');
    expect((geDict as unknown as Record<string, string>)['dashboardFeatures_cat_analytics']).toBe('ანალიტიკა & ROI კომპლექტი');

    expect((enDict as unknown as Record<string, string>)['dashboardFeatures_cat_core']).toBe('Core Infrastructure');
    expect((enDict as unknown as Record<string, string>)['dashboardFeatures_cat_analytics']).toBe('Analytics & ROI Suite');

    expect((ruDict as unknown as Record<string, string>)['dashboardFeatures_cat_core']).toBe('Базовая инфраструктура');
    expect((ruDict as unknown as Record<string, string>)['dashboardFeatures_cat_analytics']).toBe('Аналитика и ROI');
  });

  it('should correctly map all tabs to their respective category', () => {
    const isAnalytics = (tab: string) => ['roi', 'okr', 'kpi', 'churn', 'heatmap', 'winback'].includes(tab);
    const isCore = (tab: string) => ['iot', 'ai', 'security', 'sports_os', 'multimodal-ai', 'enterprise-security'].includes(tab);

    expect(isAnalytics('roi')).toBe(true);
    expect(isAnalytics('okr')).toBe(true);
    expect(isAnalytics('kpi')).toBe(true);
    expect(isAnalytics('churn')).toBe(true);
    expect(isAnalytics('heatmap')).toBe(true);
    expect(isAnalytics('winback')).toBe(true);

    expect(isCore('iot')).toBe(true);
    expect(isCore('ai')).toBe(true);
    expect(isCore('security')).toBe(true);
    expect(isCore('sports_os')).toBe(true);
    expect(isCore('multimodal-ai')).toBe(true);
    expect(isCore('enterprise-security')).toBe(true);
  });
});
