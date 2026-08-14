import { test, expect } from '@playwright/test';

test.describe('Google Consent Mode v2 & Cookie Consent Banner', () => {
  test.beforeEach(async ({ page }) => {
    // Start with fresh localStorage and force Georgian locale
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem('artron_lang', 'ka');
    });
    // Reload page to apply forced locale
    await page.goto('/');
  });

  test('should show the cookie consent banner by default', async ({ page }) => {
    // The banner should be visible
    const banner = page.locator('text=ქუქი-ფაილების და კონფიდენციალურობის მართვა');
    await expect(banner).toBeVisible();

    // Local storage should not have consent decisions yet
    const consent = await page.evaluate(() => localStorage.getItem('artron_cookie_consent'));
    expect(consent).toBeNull();
  });

  test('should grant all consent types when clicking Accept All', async ({ page }) => {
    // Click the "Accept All" button (ყველას მიღება in Georgian)
    const acceptAllBtn = page.locator('button:text-is("ყველას მიღება")');
    await expect(acceptAllBtn).toBeVisible();
    await acceptAllBtn.click();

    // The banner should hide after consent is given
    const banner = page.locator('text=ქუქი-ფაილების და კონფიდენციალურობის მართვა');
    await expect(banner).not.toBeVisible();

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
    const declineAllBtn = page.locator('button:text-is("ყველაზე უარი")');
    await expect(declineAllBtn).toBeVisible();
    await declineAllBtn.click();

    // The banner should hide
    const banner = page.locator('text=ქუქი-ფაილების და კონფიდენციალურობის მართვა');
    await expect(banner).not.toBeVisible();

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
    // Click the "Settings" button (პარამეტრები in Georgian)
    const settingsBtn = page.locator('button:text-is("პარამეტრები")');
    await expect(settingsBtn).toBeVisible();
    await settingsBtn.click();

    // Verify that the setting panels are revealed
    await expect(page.locator('text=აუცილებელი')).toBeVisible();
    await expect(page.locator('text=ანალიტიკა')).toBeVisible();
    await expect(page.locator('text=მარკეტინგი')).toBeVisible();

    // Toggle analytics to true, marketing remains false
    const analyticsToggle = page.locator('button[aria-label="Toggle Analytics Cookies"]');
    await analyticsToggle.click();

    // Save selection (არჩევანის შენახვა in Georgian)
    const saveBtn = page.locator('button:text-is("არჩევანის შენახვა")');
    await saveBtn.click();

    // The banner should hide
    const banner = page.locator('text=ქუქი-ფაილების და კონფიდენციალურობის მართვა');
    await expect(banner).not.toBeVisible();

    // Verify localStorage state
    const consentJson = await page.evaluate(() => localStorage.getItem('artron_cookie_consent'));
    expect(consentJson).not.toBeNull();
    const consent = JSON.parse(consentJson!);
    expect(consent.preferences.necessary).toBe(true);
    expect(consent.preferences.analytics).toBe(true);
    expect(consent.preferences.marketing).toBe(false);
  });
});
