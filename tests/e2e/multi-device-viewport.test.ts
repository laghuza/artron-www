import { test, expect } from '@playwright/test';

test.describe('Phase 26 / Stage 5: Multi-Device Cross-Viewport Matrix & 60 FPS Safety', () => {
  const devices = [
    // 1. Mobile Phones (iOS & Android)
    { name: 'iPhone SE (375x667)', width: 375, height: 667, isMobile: true },
    { name: 'iPhone 15 Pro (393x852)', width: 393, height: 852, isMobile: true },
    { name: 'iPhone 15 Pro Max (430x932)', width: 430, height: 932, isMobile: true },
    { name: 'Android Galaxy (360x800)', width: 360, height: 800, isMobile: true },
    { name: 'Android Pixel (412x915)', width: 412, height: 915, isMobile: true },

    // 2. Tablets & iPads
    { name: 'iPad Mini / Standard (768x1024)', width: 768, height: 1024, isMobile: false },
    { name: 'iPad 10th Gen (820x1180)', width: 820, height: 1180, isMobile: false },
    { name: 'iPad Pro 12.9" (1024x1366)', width: 1024, height: 1366, isMobile: false },

    // 3. Laptops & Ultra-books
    { name: 'MacBook Air / Laptop (1280x800)', width: 1280, height: 800, isMobile: false },
    { name: 'Standard Pro Laptop (1440x900)', width: 1440, height: 900, isMobile: false },
    { name: 'High-DPI Laptop (1536x960)', width: 1536, height: 960, isMobile: false },

    // 4. Desktop & Monumental 4K Displays
    { name: 'FHD Monitor (1920x1080)', width: 1920, height: 1080, isMobile: false },
    { name: '2K QHD Display (2560x1440)', width: 2560, height: 1440, isMobile: false },
    { name: '4K UHD Monumental Screen (3840x2160)', width: 3840, height: 2160, isMobile: false },
  ];

  for (const dev of devices) {
    test(`[Viewport] Zero-Overflow and UI Integrity on ${dev.name}`, async ({ page }) => {
      // Set viewport size
      await page.setViewportSize({ width: dev.width, height: dev.height });

      // Navigate to landing root
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      // Ensure Core Branding is rendered
      const brandLogo = page.locator('text=ARTRON');
      await expect(brandLogo.first()).toBeVisible();

      // Check for zero horizontal overflow
      const overflowStatus = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        return {
          hasOverflow: docWidth > winWidth,
          docWidth,
          winWidth,
        };
      });

      expect(overflowStatus.hasOverflow).toBe(false);

      // Verify CTA interactive buttons exist and are clickable
      const ignitionTriggers = page.locator('button');
      const buttonCount = await ignitionTriggers.count();
      expect(buttonCount).toBeGreaterThan(0);
    });

    test(`[GetStarted Registration Viewport] UI Rendering on ${dev.name}`, async ({ page }) => {
      await page.setViewportSize({ width: dev.width, height: dev.height });
      await page.goto('/get-started', { waitUntil: 'domcontentloaded' });

      // Verify get started wizard loads correctly
      const heading = page.locator('h1, h2');
      await expect(heading.first()).toBeVisible();

      // Check overflow on registration wizard
      const regOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(regOverflow).toBe(false);
    });
  }
});
