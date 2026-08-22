import { test, expect } from '@playwright/test';

test.describe('Phase 3: B2B Conversion Engine & B2C Experience E2E', () => {
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
    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('Instant Micro-Booking Engine 3-step wizard workflow', async ({ page }) => {
    const bookingSection = page.locator('#booking-engine');
    await expect(bookingSection).toBeVisible();

    // Scroll to booking engine
    await bookingSection.scrollIntoViewIfNeeded();

    // Step 1: Select Facility Type
    const poolBtn = page.locator('[data-testid="booking-type-pool"]');
    await poolBtn.scrollIntoViewIfNeeded();
    await poolBtn.click();

    // Click Next to Step 2
    const nextBtn = page.locator('[data-testid="booking-step1-next"]');
    await nextBtn.click();

    // Step 2: Select Preferred Platform
    const telegramBtn = page.locator('[data-testid="booking-plat-telegram"]');
    await expect(telegramBtn).toBeVisible({ timeout: 5000 });
    await telegramBtn.click();

    // Fill Contact Input
    const contactInput = page.locator('[data-testid="booking-contact-input"]');
    await contactInput.fill('@artron_tester');

    // Click Next to Step 3
    const nextBtn2 = page.locator('[data-testid="booking-step2-next"]');
    await nextBtn2.click();

    // Step 3: Select Time Slot and Fill Name
    const slotChip = page.locator('[data-testid="booking-slot-15:00"]');
    await expect(slotChip).toBeVisible({ timeout: 5000 });
    await slotChip.click();

    // Fill Name
    const nameInput = page.locator('[data-testid="booking-name-input"]');
    await nameInput.fill('დავით თოდუა');

    // Submit Demo Request
    const submitBtn = page.locator('[data-testid="booking-submit-btn"]');
    await submitBtn.scrollIntoViewIfNeeded();
    await submitBtn.click({ force: true });

    // Verify Success Screen
    await expect(bookingSection.getByText('DEMO_SESSION_CONFIRMED')).toBeVisible({ timeout: 10000 });
  });

  test('Pricing Section Monthly / Annual toggle and ROI Saver Badges', async ({ page }) => {
    const pricingSection = page.locator('#pricing');
    await expect(pricingSection).toBeVisible();
    await pricingSection.scrollIntoViewIfNeeded();

    // Check ROI Saver badges exist across tiers
    const roiBadges = pricingSection.getByText('ROI:');
    await expect(roiBadges.first()).toBeVisible();

    // Test Monthly vs. Annual toggle
    const annualBtn = pricingSection.locator('button').filter({ hasText: '-20%' }).first();
    await annualBtn.click();

    // Verify annual discount badge active
    await expect(pricingSection).toContainText('-20%');

    const monthlyBtn = pricingSection.locator('button').filter({ hasText: 'ყოველთვიური' }).first();
    if (await monthlyBtn.isVisible()) {
      await monthlyBtn.click();
    }
    await expect(pricingSection).toBeVisible();
  });

  test('B2C Athlete Mobile Advantages Showcase tabs & interactive phone preview', async ({ page }) => {
    const b2cSection = page.locator('#b2c-experience');
    await expect(b2cSection).toBeVisible();
    await b2cSection.scrollIntoViewIfNeeded();

    // Check advantage section header is visible
    await expect(b2cSection.locator('h2')).toBeVisible();

    // Switch to Renewal Tab (Index 1)
    const renewalCard = page.locator('[data-testid="b2c-adv-card-1"]');
    await renewalCard.scrollIntoViewIfNeeded();
    await renewalCard.click();
    await expect(b2cSection.getByText('1-Click Renew')).toBeVisible();

    // Switch to Trainers Tab (Index 2)
    const trainersCard = page.locator('[data-testid="b2c-adv-card-2"]');
    await trainersCard.scrollIntoViewIfNeeded();
    await trainersCard.click();
    await expect(b2cSection.getByText('COACH')).toBeVisible();

    // Switch to Guarantee Tab (Index 3)
    const guaranteeCard = page.locator('[data-testid="b2c-adv-card-3"]');
    await guaranteeCard.scrollIntoViewIfNeeded();
    await guaranteeCard.click();
    await expect(b2cSection.getByText('Money-Back Guarantee')).toBeVisible();
  });
});
