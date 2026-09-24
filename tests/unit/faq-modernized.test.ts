import { FAQ_DATA } from '@/components/landing/faqData';
import geDict from '@/dictionaries/ge.json';
import enDict from '@/dictionaries/en.json';
import ruDict from '@/dictionaries/ru.json';

describe('Modernized FAQ Section & Data Unit Tests (Phase 47)', () => {
  test('FAQ_DATA contains all 8 questions with valid categories', () => {
    expect(FAQ_DATA.length).toBe(8);

    const ids = FAQ_DATA.map((item) => item.id);
    expect(ids).toEqual([1, 2, 3, 4, 8, 5, 6, 7]);

    FAQ_DATA.forEach((item) => {
      expect(['b2b', 'b2c', 'hybrid']).toContain(item.category);
      expect(item.refCode).toMatch(/^#0[1-8]$/);
      expect(item.keywords.length).toBeGreaterThan(0);
    });
  });

  test('All 8 questions have complete translations in ka, en, and ru', () => {
    FAQ_DATA.forEach((item) => {
      expect(item.q.ka.length).toBeGreaterThan(5);
      expect(item.q.en.length).toBeGreaterThan(5);
      expect(item.q.ru.length).toBeGreaterThan(5);

      expect(item.a.ka.length).toBeGreaterThan(10);
      expect(item.a.en.length).toBeGreaterThan(10);
      expect(item.a.ru.length).toBeGreaterThan(10);

      expect(item.points.ka.length).toBeGreaterThanOrEqual(3);
      expect(item.points.en.length).toBeGreaterThanOrEqual(3);
      expect(item.points.ru.length).toBeGreaterThanOrEqual(3);

      expect(item.basis.ka.length).toBeGreaterThan(3);
      expect(item.basis.en.length).toBeGreaterThan(3);
      expect(item.basis.ru.length).toBeGreaterThan(3);
    });
  });

  test('Question 8 specifically addresses old turnstiles compatibility', () => {
    const q8 = FAQ_DATA.find((i) => i.id === 8);
    expect(q8).toBeDefined();
    expect(q8?.category).toBe('b2b');
    expect(q8?.q.ka).toContain('ძველი ტურნიკეტები');
    expect(q8?.a.ka).toContain('Came, ZKTeco, Hikvision');
    expect(q8?.basis.ka).toContain('95%+ თავსებადობა');
  });

  test('Dictionaries contain all necessary FAQ UI strings in ka, en, ru', () => {
    const requiredKeys = [
      'faq_eyebrow',
      'faq_title',
      'faq_subtitle',
      'faq_tab_all',
      'faq_tab_b2b',
      'faq_tab_b2c',
      'faq_search_placeholder',
      'faq_basis_label',
      'faq_empty',
      'faq_ask_bot',
      'faq_cta_title',
      'faq_cta_subtitle',
      'faq_cta_button',
      'faq_copy_link',
      'faq_link_copied',
      'faq_q1',
      'faq_q8',
    ];

    requiredKeys.forEach((key) => {
      expect((geDict as unknown as Record<string, any>)[key]).toBeDefined();
      expect((enDict as unknown as Record<string, any>)[key]).toBeDefined();
      expect((ruDict as unknown as Record<string, any>)[key]).toBeDefined();
    });
  });
});
