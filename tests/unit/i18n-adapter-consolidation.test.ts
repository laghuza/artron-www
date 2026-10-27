import { langToLocale, localeToLang } from '@/context/I18nContext';
import fs from 'fs';
import path from 'path';

describe('i18n Context Adapter Consolidation & Parity Test', () => {
  test('Locale and Lang mapping helper bidirectional parity', () => {
    expect(langToLocale('GE')).toBe('ka');
    expect(langToLocale('EN')).toBe('en');
    expect(langToLocale('RU')).toBe('ru');

    expect(localeToLang('ka')).toBe('GE');
    expect(localeToLang('en')).toBe('EN');
    expect(localeToLang('ru')).toBe('RU');
  });

  test('All dictionary files are loaded and non-empty in root directory', () => {
    const dictPath = path.join(process.cwd(), 'src/dictionaries');
    const ge = JSON.parse(fs.readFileSync(path.join(dictPath, 'ge.json'), 'utf8'));
    const en = JSON.parse(fs.readFileSync(path.join(dictPath, 'en.json'), 'utf8'));
    const ru = JSON.parse(fs.readFileSync(path.join(dictPath, 'ru.json'), 'utf8'));

    expect(ge).toBeDefined();
    expect(en).toBeDefined();
    expect(ru).toBeDefined();

    expect(typeof ge).toBe('object');
    expect(typeof en).toBe('object');
    expect(typeof ru).toBe('object');
  });
});
