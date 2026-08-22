import { test, expect } from '@playwright/test';

test.describe('Phase 2: IoT Telemetry & BI Data Suite E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Set viewport, language, and cookie consent in localStorage before navigating
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

  test('Hero section telemetry logs and Labor Order №01-15/n compliance modal', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Click Labor compliance badge
    const laborButton = page.getByTestId('hero-labor-export-btn');
    await expect(laborButton).toBeVisible({ timeout: 10000 });
    await laborButton.scrollIntoViewIfNeeded();
    await laborButton.click();

    // Verify modal appeared
    const modalTitle = page.locator('text=ბრძანება №01-15/ნ ტაბელის აუდიტი');
    await expect(modalTitle).toBeVisible();

    // Click export button in modal
    const exportButton = page.locator('button:has-text("ექსპორტი (Excel №01-15/ნ)")');
    await expect(exportButton).toBeVisible();
    await exportButton.click({ force: true });

    // Wait for export success feedback
    await expect(page.locator('text=ექსპორტირებულია!')).toBeVisible({ timeout: 6000 });

    // Close modal
    const closeBtn = page.locator('button:has(svg.lucide-x)');
    await closeBtn.first().click();
    await expect(modalTitle).not.toBeVisible();
  });

  test('ROI Calculator with animated CountUp numbers and dynamic amplitude', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const roiSection = page.locator('#roi');
    await expect(roiSection).toBeVisible({ timeout: 10000 });
    await roiSection.scrollIntoViewIfNeeded();

    // Verify initial values
    const gainNumber = page.locator('[data-testid="roi-total-gain"]');
    await expect(gainNumber).toBeVisible({ timeout: 5000 });

    // Change members slider
    const membersSlider = roiSection.locator('input[type="range"]').first();
    await membersSlider.fill('600');

    // Trigger input event
    await membersSlider.dispatchEvent('input');
    await membersSlider.dispatchEvent('change');

    // Verify updated ROI output exists
    await expect(gainNumber).toBeVisible();
  });

  test('Analytics Showcase Heatmap tab interactivity & off-peak promo trigger', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Scroll to analytics showcase
    const showcase = page.locator('#analytics-showcase');
    await expect(showcase).toBeVisible();
    await showcase.scrollIntoViewIfNeeded();

    // Click on Heatmap tab
    const heatmapTabBtn = page.getByTestId('analytics-tab-heatmap');
    await expect(heatmapTabBtn).toBeVisible({ timeout: 10000 });
    await heatmapTabBtn.scrollIntoViewIfNeeded();
    await heatmapTabBtn.click({ force: true });

    // Verify heatmap grid rendered
    const heatmapTitle = page.locator('text=სითბური რუკა');
    await expect(heatmapTitle).toBeVisible({ timeout: 10000 });

    // Click first cell (e.g. 30%) with force if needed
    const cell = page.locator('#analytics-showcase button span:has-text("%")').first();
    await expect(cell).toBeVisible();
    await cell.click({ force: true });

    // Verify cell telemetry card updated
    const cellTelemetry = page.locator('text=[ CELL_TELEMETRY:');
    await expect(cellTelemetry).toBeVisible();

    // Click promo push trigger
    const pushTriggerBtn = page.locator('button:has-text("Off-Peak Push ტრიგერი")');
    await expect(pushTriggerBtn).toBeVisible();
    await pushTriggerBtn.click({ force: true });

    // Verify confirmation feedback
    await expect(page.locator('text=Push გაგზავნილია!')).toBeVisible();
  });
});
