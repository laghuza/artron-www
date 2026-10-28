import { test, expect } from '@playwright/test';

test.describe('Phase 2: 10-Node B2B Command Cockpit, IoT Telemetry & BI Suite E2E', () => {
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

  test('Node 01: Live Turnstile Telemetry Showroom, IoT Sensor status & Order №01-15/n', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });

    // Verify Order №01-15/n timesheet badge in Dual-Core Admin panel
    await expect(page.getByText(/№01-15\/ნ/).first()).toBeVisible();

    const b2bCockpit = page.locator('#dashboard-features');
    await expect(b2bCockpit).toBeVisible({ timeout: 10000 });
    await b2bCockpit.scrollIntoViewIfNeeded();

    // Verify Node 01 Turnstile & IoT status indicators are visible
    await expect(b2bCockpit.getByText('4 / 4 ონლაინ').first()).toBeVisible();
    await expect(b2bCockpit.getByText('AES-256 · TLS 1.3').first()).toBeVisible();
  });

  test('Node 05: ROI Calculator stage with interactive sliders and financial KPI', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });

    const b2bCockpit = page.locator('#dashboard-features');
    await expect(b2bCockpit).toBeVisible({ timeout: 10000 });
    await b2bCockpit.scrollIntoViewIfNeeded();

    // Switch to Node 05 (05 ეკონომია / ROI Calculator)
    const roiTabBtn = b2bCockpit.getByRole('button', { name: /05 ეკონომია/ });
    await expect(roiTabBtn).toBeVisible();
    await roiTabBtn.dispatchEvent('click');

    // Wait for RoiCalculatorStage to mount
    await expect(b2bCockpit.getByText('ვიზიტი დღეში')).toBeVisible({ timeout: 5000 });
    const sliders = b2bCockpit.locator('input[type="range"]');
    await expect(sliders.first()).toBeVisible();

    await sliders.first().fill('450');
    await sliders.first().dispatchEvent('change');
    await expect(b2bCockpit.getByText('450', { exact: true })).toBeVisible();
  });

  test('Node 09 & Node 10: Load Heatmap & Winback Matrix interactivity', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });

    const b2bCockpit = page.locator('#dashboard-features');
    await expect(b2bCockpit).toBeVisible({ timeout: 10000 });
    await b2bCockpit.scrollIntoViewIfNeeded();

    // Switch to Node 09 (09 პიკი - Load Heatmap)
    const heatmapBtn = b2bCockpit.getByRole('button', { name: /09 პიკი/ });
    await heatmapBtn.dispatchEvent('click');
    await expect(b2bCockpit.getByRole('heading', { name: 'პიკური საათები' })).toBeVisible({ timeout: 5000 });

    // Switch to Node 10 (10 კამპანია - Win-Back Matrix)
    const winbackBtn = b2bCockpit.getByRole('button', { name: /10 კამპანია/ });
    await winbackBtn.dispatchEvent('click');
    await expect(b2bCockpit.getByRole('heading', { name: 'დაბრუნების კამპანია' })).toBeVisible({ timeout: 5000 });
  });
});
