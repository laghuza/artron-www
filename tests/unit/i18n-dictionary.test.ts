import * as fs from 'fs';
import * as path from 'path';

describe('i18n Localization Dictionaries Integrity (KA / EN / RU)', () => {
  const dictPath = path.join(process.cwd(), 'src/dictionaries');
  
  let geDict: Record<string, any>;
  let enDict: Record<string, any>;
  let ruDict: Record<string, any>;

  beforeAll(() => {
    const geRaw = fs.readFileSync(path.join(dictPath, 'ge.json'), 'utf8');
    const enRaw = fs.readFileSync(path.join(dictPath, 'en.json'), 'utf8');
    const ruRaw = fs.readFileSync(path.join(dictPath, 'ru.json'), 'utf8');

    expect(() => { geDict = JSON.parse(geRaw); }).not.toThrow();
    expect(() => { enDict = JSON.parse(enRaw); }).not.toThrow();
    expect(() => { ruDict = JSON.parse(ruRaw); }).not.toThrow();
  });

  test('All 3 dictionaries must be valid non-empty objects', () => {
    expect(typeof geDict).toBe('object');
    expect(typeof enDict).toBe('object');
    expect(typeof ruDict).toBe('object');
    expect(Object.keys(geDict).length).toBeGreaterThan(0);
    expect(Object.keys(enDict).length).toBeGreaterThan(0);
    expect(Object.keys(ruDict).length).toBeGreaterThan(0);
  });

  test('Core system namespace must be present and fully populated in KA, EN, and RU', () => {
    const essentialSystemKeys = [
      'title',
      'subtitle',
      'status',
      'privacy',
      'terms',
      'corporate_entity_val',
      'registry_code_val',
      'general_email',
      'security_email',
      'legal_email'
    ];

    for (const key of essentialSystemKeys) {
      expect(geDict.system?.[key]).toBeDefined();
      expect(typeof geDict.system?.[key]).toBe('string');
      expect(geDict.system?.[key].trim().length).toBeGreaterThan(0);

      expect(enDict.system?.[key]).toBeDefined();
      expect(typeof enDict.system?.[key]).toBe('string');
      expect(enDict.system?.[key].trim().length).toBeGreaterThan(0);

      expect(ruDict.system?.[key]).toBeDefined();
      expect(typeof ruDict.system?.[key]).toBe('string');
      expect(ruDict.system?.[key].trim().length).toBeGreaterThan(0);
    }
  });

  test('Legal entity details and ID must match exact corporate registration in all languages', () => {
    expect(geDict.system.registry_code_val).toBe('412799431');
    expect(enDict.system.registry_code_val).toBe('412799431');
    expect(ruDict.system.registry_code_val).toBe('412799431');

    expect(geDict.system.general_email).toBe('info@artron.ge');
    expect(enDict.system.general_email).toBe('info@artron.ge');
    expect(ruDict.system.general_email).toBe('info@artron.ge');
  });

  test('No empty string values in top-level system strings', () => {
    const checkNoEmptyStrings = (obj: any, prefix = ''): string[] => {
      const emptyKeys: string[] = [];
      for (const [k, v] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${k}` : k;
        if (typeof v === 'string') {
          if (v.trim() === '') {
            emptyKeys.push(fullKey);
          }
        } else if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
          emptyKeys.push(...checkNoEmptyStrings(v, fullKey));
        }
      }
      return emptyKeys;
    };

    const geEmpty = checkNoEmptyStrings(geDict.system, 'ge.system');
    const enEmpty = checkNoEmptyStrings(enDict.system, 'en.system');
    const ruEmpty = checkNoEmptyStrings(ruDict.system, 'ru.system');

    expect(geEmpty).toEqual([]);
    expect(enEmpty).toEqual([]);
    expect(ruEmpty).toEqual([]);
  });

  test('ps5_onboarding namespace must be fully populated and parity-matched across KA, EN, and RU', () => {
    expect(geDict.ps5_onboarding).toBeDefined();
    expect(enDict.ps5_onboarding).toBeDefined();
    expect(ruDict.ps5_onboarding).toBeDefined();

    const geKeys = Object.keys(geDict.ps5_onboarding);
    const enKeys = Object.keys(enDict.ps5_onboarding);
    const ruKeys = Object.keys(ruDict.ps5_onboarding);

    expect(geKeys.length).toBeGreaterThanOrEqual(40);
    expect(enKeys.length).toBeGreaterThanOrEqual(40);
    expect(ruKeys.length).toBeGreaterThanOrEqual(40);

    // Verify 100% key parity
    const missingInEn = geKeys.filter(k => !(k in enDict.ps5_onboarding));
    const missingInRu = geKeys.filter(k => !(k in ruDict.ps5_onboarding));

    expect(missingInEn).toEqual([]);
    expect(missingInRu).toEqual([]);

    // Check specific essential keys
    const sampleKeys = [
      'page_title_register',
      'hud_step1',
      'hud_step2',
      'facility_gym_label',
      'facility_pool_label',
      'step2_turnstiles_label',
      'legal_llc',
      'admin_pid_label',
      'step5_trophy_title',
      'dock_enter',
      'demo_headline',
    ];

    for (const key of sampleKeys) {
      expect(typeof geDict.ps5_onboarding[key]).toBe('string');
      expect(geDict.ps5_onboarding[key].trim().length).toBeGreaterThan(0);

      expect(typeof enDict.ps5_onboarding[key]).toBe('string');
      expect(enDict.ps5_onboarding[key].trim().length).toBeGreaterThan(0);

      expect(typeof ruDict.ps5_onboarding[key]).toBe('string');
      expect(ruDict.ps5_onboarding[key].trim().length).toBeGreaterThan(0);
    }
  });
});
