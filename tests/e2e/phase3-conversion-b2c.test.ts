import { test, expect } from '@playwright/test';

test.describe('Phase 3: Dual-Core Ecosystem, B2B Booking Scheduler & B2C Mobile Showcase E2E', () => {
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
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('Node 02 & Node 03: B2B Booking Scheduler & Cyber Defense offline queue stages', async ({ page }) => {
    const b2bCockpit = page.locator('#dashboard-features');
    await expect(b2bCockpit).toBeVisible({ timeout: 10000 });
    await b2bCockpit.scrollIntoViewIfNeeded();

    const navButtons = b2bCockpit.locator('nav[aria-label="ARTRON B2B Suite ლოგიკები"] button');

    // Node 02: Booking Scheduler
    await navButtons.nth(1).click();
    await expect(b2bCockpit.getByText('LIVE').first()).toBeVisible();

    // Node 03: Cyber Defense
    await navButtons.nth(2).click();
    await expect(b2bCockpit.getByText('LIVE').first()).toBeVisible();
  });

  test('Multimodal AI Neural Engine Section tabs (OCR / VOICE / CONCIERGE)', async ({ page }) => {
    const aiHeading = page.getByText('პირადობის & პასპორტის OCR').first();
    await aiHeading.scrollIntoViewIfNeeded();
    await expect(aiHeading).toBeVisible();

    // Switch to Voice Onboarding tab
    const voiceTab = page.getByText('ქართული ხმოვანი რეგისტრაცია').first();
    await voiceTab.click();
    await expect(voiceTab).toBeVisible();

    // Switch to 24/7 Concierge & Churn Radar tab
    const conciergeTab = page.getByText('24/7 ვირტუალური კონსიერჟი & Churn Radar').first();
    await conciergeTab.click();
    await expect(conciergeTab).toBeVisible();
  });

  test('B2C Athlete Mobile Advantages Showcase 3D Flip Deck & interactive phone preview', async ({ page }) => {
    const b2cSection = page.locator('#b2c-experience');
    await expect(b2cSection).toBeVisible();
    await b2cSection.scrollIntoViewIfNeeded();

    await expect(b2cSection.locator('h2')).toBeVisible();

    // Switch to Mentor Card (Index 1)
    const mentorCard = page.locator('[data-testid="b2c-adv-card-1"]');
    await mentorCard.scrollIntoViewIfNeeded();
    await mentorCard.click();
    await expect(mentorCard).toContainText('მწვრთნელის განრიგი და ჯავშნები');

    // Switch to Legal Shield Card (Index 2)
    const shieldCard = page.locator('[data-testid="b2c-adv-card-2"]');
    await shieldCard.scrollIntoViewIfNeeded();
    await shieldCard.click();
    await expect(shieldCard).toContainText('14-დღიანი გარანტია');

    // Switch to Online Renewal Card (Index 3)
    const renewalCard = page.locator('[data-testid="b2c-adv-card-3"]');
    await renewalCard.scrollIntoViewIfNeeded();
    await renewalCard.click();
    await expect(renewalCard).toContainText('აბონემენტის ონლაინ განახლება');
  });
});
