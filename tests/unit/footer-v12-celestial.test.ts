import geDict from '@/dictionaries/ge.json';
import enDict from '@/dictionaries/en.json';
import ruDict from '@/dictionaries/ru.json';
import { CONTACT_CONFIG } from '@/config/contact';

describe('Footer v12 (Celestial Arch & Cosmic Canvas) System Tests', () => {
  const dictionaries = [
    { lang: 'ge', dict: geDict },
    { lang: 'en', dict: enDict },
    { lang: 'ru', dict: ruDict },
  ];

  const mandatoryFooterKeys = [
    'footer_slogan',
    'footer_app_title',
    'footer_app_os',
    'footer_download',
    'footer_available',
    'footer_soon',
    'footer_toast_tag',
    'footer_toast_msg',
    'footer_col_eco',
    'footer_eco_b2b',
    'footer_eco_app',
    'footer_col_legal',
    'footer_col_legal_entity',
    'footer_company_name',
    'footer_tax_id_label',
    'footer_copied',
    'footer_delete_account',
    'footer_manage_cookies',
    'footer_col_contact',
    'footer_company_id',
    'footer_address',
    'footer_cookie_prefs',
    'footer_social_follow',
    'footer_all_rights',
  ];

  test.each(dictionaries)('Language ($lang) has all required footer dictionary keys', ({ lang, dict }) => {
    mandatoryFooterKeys.forEach((key) => {
      const val = (dict as Record<string, string>)[key];
      expect(val).toBeDefined();
      expect(typeof val).toBe('string');
      expect(val.trim().length).toBeGreaterThan(0);
    });
  });

  test('Preserves correct legal company credentials and contact configurations', () => {
    expect(CONTACT_CONFIG.phone.dialUrl).toBe('tel:+995599528155');
    expect(CONTACT_CONFIG.phone.display).toContain('599 52 81 55');
    expect(CONTACT_CONFIG.email.primary).toBe('info@artron.ge');
    expect(CONTACT_CONFIG.social.linkedin).toContain('linkedin.com');
    expect(CONTACT_CONFIG.social.facebook).toContain('facebook.com');
  });

  test('Georgian slogan strictly matches brand ethos', () => {
    expect(geDict.footer_slogan).toBe('მოძრაობა იბადება კავშირში');
    expect(enDict.footer_slogan).toBe('Movement is Born in Connection');
    expect(ruDict.footer_slogan).toBe('Движение рождается в связи');
  });

  test('App store release message exists in all languages', () => {
    expect(geDict.footer_toast_tag).toBe('[ RELEASE IN PROGRESS ]');
    expect(geDict.footer_toast_msg).toContain('iOS & Android');
    expect(enDict.footer_toast_msg).toContain('iOS & Android');
    expect(ruDict.footer_toast_msg).toContain('iOS');
    expect(ruDict.footer_toast_msg).toContain('Android');
  });
});
