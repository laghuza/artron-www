import { test, expect } from '@playwright/test';

test.describe('Phase 4: Legal Compliance Pages & Account Erasure SLA E2E', () => {
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

  const legalRoutes = [
    { path: '/privacy', name: 'Privacy Policy' },
    { path: '/terms', name: 'Terms of Service' },
    { path: '/cookie-policy', name: 'Cookie Policy' },
    { path: '/b2b-agreement', name: 'B2B Master SaaS Agreement' },
    { path: '/delete-account', name: 'Account & Biometric Deletion' },
  ];

  for (const route of legalRoutes) {
    test(`[Legal Compliance] ${route.name} (${route.path}) renders without horizontal overflow`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: 'domcontentloaded' });

      const mainHeading = page.locator('h1').first();
      await expect(mainHeading).toBeVisible({ timeout: 10000 });

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(hasOverflow).toBe(false);
    });
  }

  test('Account Deletion (/delete-account) validates required fields & completes 15-day/3-year SLA flow', async ({
    page,
  }) => {
    await page.goto('/delete-account', { waitUntil: 'domcontentloaded' });

    const formSection = page.locator('#sec_form');
    await expect(formSection).toBeVisible({ timeout: 10000 });
    await formSection.scrollIntoViewIfNeeded();

    const submitBtn = formSection.locator('button[type="submit"]');
    await expect(submitBtn).toBeVisible();

    // 1. Submit empty form -> should trigger validation errors for identity and checkboxes
    await submitBtn.click();
    const identityInput = page.locator('#identity');
    await expect(identityInput).toHaveClass(/border-red-500/);

    // 2. Fill valid identity & reason
    await identityInput.fill('athlete.test@artron.ge');
    const reasonInput = page.locator('#reason');
    await reasonInput.fill('E2E Compliance Automated Test - Right to be Forgotten');

    // 3. Check both mandatory checkboxes (15-day grace period & 3-year tax archival)
    const checkboxes = formSection.locator('input[type="checkbox"]');
    expect(await checkboxes.count()).toBe(2);
    await checkboxes.nth(0).check({ force: true });
    await checkboxes.nth(1).check({ force: true });

    // 4. Submit form and verify success confirmation state
    await submitBtn.click();
    const successCard = formSection.locator('h3');
    await expect(successCard).toBeVisible({ timeout: 6000 });
  });
});

