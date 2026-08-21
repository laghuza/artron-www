import { test, expect } from '@playwright/test';

test.describe('3-Language Localization Switcher (KA / EN / RU)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript(() => {
      window.localStorage.setItem('artron_lang', 'ka');
      window.localStorage.setItem('artron_cookie_consent', JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
        version: '2026-06-22'
      }));
    });
  });

  test('should toggle between Georgian, English, and Russian seamlessly', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Scroll down to reveal Header on first section
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(600);

    // Check Header language button exists
    const langButton = page.locator('#language-switcher-btn');
    await expect(langButton).toBeVisible({ timeout: 10000 });

    // 1. Test Switching to English (EN)
    await langButton.click();
    const enOption = page.locator('[data-testid="lang-option-en"]');
    if (!(await enOption.isVisible())) {
      await langButton.click();
    }
    await expect(enOption).toBeVisible({ timeout: 5000 });
    await enOption.click();

    // Verify UI reflects EN
    await expect(langButton).toContainText('EN');

    // 2. Test Switching to Russian (RU)
    await langButton.click();
    const ruOption = page.locator('[data-testid="lang-option-ru"]');
    await expect(ruOption).toBeVisible({ timeout: 5000 });
    await ruOption.click();

    // Verify UI reflects RU
    await expect(langButton).toContainText('RU');

    // 3. Test Switching back to Georgian (KA)
    await langButton.click();
    const kaOption = page.locator('[data-testid="lang-option-ka"]');
    await expect(kaOption).toBeVisible({ timeout: 5000 });
    await kaOption.click();

    // Verify UI reflects KA
    await expect(langButton).toContainText('KA');
  });
});
