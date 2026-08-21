import { test, expect } from '@playwright/test';

test.describe('Viewport Responsiveness & Layout Safety', () => {
  const viewports = [
    { name: 'Mobile (360px)', width: 360, height: 800 },
    { name: 'Tablet (768px)', width: 768, height: 1024 },
    { name: 'Desktop Small (1024px)', width: 1024, height: 768 },
    { name: 'Desktop Large (1440px)', width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    test(`should render correctly on ${vp.name} without horizontal overflow`, async ({ page }) => {
      // Set viewport dimensions
      await page.setViewportSize({ width: vp.width, height: vp.height });

      // Navigate to the root landing page
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      // Verify the page title/header is visible
      const logo = page.locator('text=ARTRON');
      await expect(logo.first()).toBeVisible();

      // Verify no horizontal overflow exists
      const overflowResult = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const elementsWithOverflow: string[] = [];

        // Traverse elements to see if any are wider than the viewport
        document.querySelectorAll('*').forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.right > winWidth && rect.width > winWidth) {
            elementsWithOverflow.push(`${el.tagName}.${el.className.split(' ').join('.')}`);
          }
        });

        return {
          hasOverflow: docWidth > winWidth,
          docWidth,
          winWidth,
          elementsWithOverflow: elementsWithOverflow.slice(0, 5),
        };
      });

      console.log(`[Viewport: ${vp.name}] Window width: ${overflowResult.winWidth}, Scroll width: ${overflowResult.docWidth}`);
      
      if (overflowResult.hasOverflow) {
        console.warn(`Horizontal overflow detected! Elements overflowing:`, overflowResult.elementsWithOverflow);
      }

      // Assert no horizontal scrollbar/overflow
      expect(overflowResult.hasOverflow).toBe(false);
    });
  }
});
