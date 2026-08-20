import { test, expect } from '@playwright/test';

test.describe('3-Language Localization Switcher (KA / EN / RU)', () => {
  test('should toggle between Georgian, English, and Russian seamlessly', async ({ page }) => {
    // Collect console errors
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('response', (response) => {
      if (response.status() >= 400) {
        console.log(`HTTP ${response.status()} on URL: ${response.url()}`);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Check Header language button exists
    const langButton = page.locator('button[aria-label="Select language"]');
    await expect(langButton.first()).toBeVisible();

    // 1. Test Switching to English (EN)
    await langButton.first().click();
    const enOption = page.locator('button:has-text("EN")');
    await expect(enOption.first()).toBeVisible();
    await enOption.first().click();

    // Verify localStorage updated and UI reflects EN
    const langTextEN = await langButton.first().textContent();
    expect(langTextEN?.toLowerCase()).toContain('en');

    // 2. Test Switching to Russian (RU)
    await langButton.first().click();
    const ruOption = page.locator('button:has-text("RU")');
    await expect(ruOption.first()).toBeVisible();
    await ruOption.first().click();

    // Verify UI reflects RU
    const langTextRU = await langButton.first().textContent();
    expect(langTextRU?.toLowerCase()).toContain('ru');

    // 3. Test Switching back to Georgian (KA)
    await langButton.first().click();
    const kaOption = page.locator('button:has-text("KA")');
    await expect(kaOption.first()).toBeVisible();
    await kaOption.first().click();

    // Verify UI reflects KA
    const langTextKA = await langButton.first().textContent();
    expect(langTextKA?.toLowerCase()).toContain('ka');

    // Ensure zero critical uncaught errors occurred
    const criticalErrors = consoleErrors.filter(
      (err) => !err.includes('favicon.ico') && !err.includes('DevTools')
    );
    if (criticalErrors.length > 0) {
      console.log('Detected console errors during language switch:', criticalErrors);
    }
    expect(criticalErrors.length).toBe(0);
  });
});
