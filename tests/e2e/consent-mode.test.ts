import { test, expect } from '@playwright/test';

test.describe('Google Consent Mode v2 & Cookie Consent Banner', () => {
  test.beforeEach(async ({ page }) => {
    // Start with fresh localStorage and force Georgian locale
    await page.addInitScript(() => {
      localStorage.clear();
      localStorage.setItem('artron_lang', 'ka');
    });
    await page.goto('/', { waitUntil: 'load' });
  });

  test('should show the cookie consent banner by default', async ({ page }) => {
    // The banner should be visible
    const banner = page.locator('#artron-cookie-consent-banner');
    await expect(banner).toBeVisible();

    // Local storage should not have consent decisions yet
    const consent = await page.evaluate(() => localStorage.getItem('artron_cookie_consent'));
    expect(consent).toBeNull();
  });

  test('should grant all consent types when clicking Accept All', async ({ page }) => {
    // Click the "Accept All" button (ყველას მიღება in Georgian)
    const acceptAllBtn = page.getByRole('button', { name: 'ყველას მიღება', exact: true });
    await expect(acceptAllBtn).toBeVisible();
    await acceptAllBtn.click();

    // The banner should hide after consent is given
    const banner = page.locator('#artron-cookie-consent-banner');
    await expect(banner).toBeHidden({ timeout: 5000 });

    // Verify localStorage state
    const consentJson = await page.evaluate(() => localStorage.getItem('artron_cookie_consent'));
    expect(consentJson).not.toBeNull();
    const consent = JSON.parse(consentJson!);
    expect(consent.preferences.necessary).toBe(true);
    expect(consent.preferences.analytics).toBe(true);
    expect(consent.preferences.marketing).toBe(true);

    // Verify that the audit trail logs are saved in localStorage
    const logsJson = await page.evaluate(() => localStorage.getItem('artron_consent_logs'));
    expect(logsJson).not.toBeNull();
    const logs = JSON.parse(logsJson!);
    expect(logs.length).toBeGreaterThan(0);
    const lastLog = logs[logs.length - 1];
    expect(lastLog.categories_granted).toContain('NECESSARY');
    expect(lastLog.categories_granted).toContain('ANALYTICS');
    expect(lastLog.categories_granted).toContain('MARKETING');
    expect(lastLog.policy_version).toBe('2026-06-22');
  });

  test('should deny analytics and marketing consent types when clicking Decline All', async ({ page }) => {
    // Click the "Decline All" button (ყველაზე უარი in Georgian)
    const declineAllBtn = page.getByRole('button', { name: 'ყველაზე უარი', exact: true });
    await expect(declineAllBtn).toBeVisible();
    await declineAllBtn.click();

    // The banner should hide
    const banner = page.locator('#artron-cookie-consent-banner');
    await expect(banner).toBeHidden({ timeout: 5000 });

    // Verify localStorage state
    const consentJson = await page.evaluate(() => localStorage.getItem('artron_cookie_consent'));
    expect(consentJson).not.toBeNull();
    const consent = JSON.parse(consentJson!);
    expect(consent.preferences.necessary).toBe(true);
    expect(consent.preferences.analytics).toBe(false);
    expect(consent.preferences.marketing).toBe(false);

    // Verify audit trail shows only necessary
    const logsJson = await page.evaluate(() => localStorage.getItem('artron_consent_logs'));
    expect(logsJson).not.toBeNull();
    const logs = JSON.parse(logsJson!);
    const lastLog = logs[logs.length - 1];
    expect(lastLog.categories_granted).toEqual(['NECESSARY']);
  });

  test('should allow custom cookie settings selection', async ({ page }) => {
    // Click the "Settings" button (პარამეტრები in Georgian) inside the banner
    const settingsBtn = page.locator('#artron-cookie-consent-banner').getByRole('button', { name: 'პარამეტრები', exact: true });
    await expect(settingsBtn).toBeVisible();
    await settingsBtn.click({ force: true });

    // Verify that the setting panels are revealed
    await expect(page.locator('h4').filter({ hasText: 'აუცილებელი' })).toBeVisible({ timeout: 5000 });
    await expect(page.locator('h4').filter({ hasText: 'ანალიტიკა' })).toBeVisible();
    await expect(page.locator('h4').filter({ hasText: 'მარკეტინგი' })).toBeVisible();

    // Toggle analytics to true, marketing remains false
    const analyticsToggle = page.locator('button[aria-label="Toggle Analytics Cookies"]');
    await analyticsToggle.click({ force: true });

    // Save selection (არჩევანის შენახვა in Georgian)
    const saveBtn = page.getByRole('button', { name: 'არჩევანის შენახვა', exact: true });
    await expect(saveBtn).toBeVisible({ timeout: 5000 });
    await saveBtn.click({ force: true });

    // The banner should hide
    const banner = page.locator('#artron-cookie-consent-banner');
    await expect(banner).toBeHidden({ timeout: 5000 });

    // Verify localStorage state
    const consentJson = await page.evaluate(() => localStorage.getItem('artron_cookie_consent'));
    expect(consentJson).not.toBeNull();
    const consent = JSON.parse(consentJson!);
    expect(consent.preferences.necessary).toBe(true);
    expect(consent.preferences.analytics).toBe(true);
    expect(consent.preferences.marketing).toBe(false);
  });
});
