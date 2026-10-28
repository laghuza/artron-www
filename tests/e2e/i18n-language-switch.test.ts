import { test, expect } from '@playwright/test';

test.describe('3-Language PS5 Localization Switcher (KA / EN / RU)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript(() => {
      window.localStorage.setItem('artron_lang', 'ka');
      window.localStorage.setItem(
        'artron_cookie_consent',
        JSON.stringify({
          necessary: true,
          analytics: true,
          marketing: true,
          version: '2026-06-22',
        })
      );
    });
  });

  test('should toggle between Georgian, English, and Russian seamlessly via PS5 Language Selector', async ({
    page,
  }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Scroll down past Kinetic Hero threshold so Header slides down into interactive state
    await page.evaluate(() => {
      window.scrollTo(0, 1600);
      window.dispatchEvent(new CustomEvent('artron-hero-progress', { detail: { progress: 1 } }));
    });

    const langButton = page.locator('#ps5-language-switcher-btn');
    await expect(langButton).toBeVisible({ timeout: 10000 });

    // 1. Switch to English (EN)
    await langButton.click();
    const enOption = page.locator('[data-testid="ps5-lang-option-en"]');
    await expect(enOption).toBeVisible({ timeout: 5000 });
    await enOption.click();
    await expect(langButton).toContainText('EN');

    // 2. Switch to Russian (RU)
    await langButton.click();
    const ruOption = page.locator('[data-testid="ps5-lang-option-ru"]');
    await expect(ruOption).toBeVisible({ timeout: 5000 });
    await ruOption.click();
    await expect(langButton).toContainText('RU');

    // 3. Switch back to Georgian (KA)
    await langButton.click();
    const kaOption = page.locator('[data-testid="ps5-lang-option-ka"]');
    await expect(kaOption).toBeVisible({ timeout: 5000 });
    await kaOption.click();
    await expect(langButton).toContainText('KA');
  });
});
