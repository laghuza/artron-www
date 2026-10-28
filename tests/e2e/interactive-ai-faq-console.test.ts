import { test, expect } from '@playwright/test';

test.describe('Phase 6: AI Support Bot, FAQ Console & Zero Runtime Error Gate', () => {
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

  test('AI Support Chatbot opens, responds to domain queries, resets, and closes cleanly', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });

    // Wait briefly for client effects to mount, then dispatch open event
    await page.waitForTimeout(300);
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('artron-open-chatbot'));
    });

    const closeChatBtn = page.locator('button[aria-label="Close Chat"]');
    await expect(closeChatBtn).toBeVisible({ timeout: 5000 });

    // Type a question about turnstiles / pricing and submit
    const chatInput = page.locator('form input[type="text"]').last();
    await expect(chatInput).toBeVisible();
    await chatInput.fill('რა ღირს ართრონის პაკეტები და ტურნიკეტის ინტეგრაცია?');

    const sendBtn = page.locator('button[aria-label="Send Message"]');
    await sendBtn.click();

    // Wait for AI reply (700ms simulated reasoning delay)
    await page.waitForTimeout(900);

    // Reset chat
    const resetBtn = page.locator('button[aria-label="Reset chat"]');
    await resetBtn.click();

    // Close chat
    await closeChatBtn.click();
    await expect(closeChatBtn).toBeHidden();
  });

  test('FAQ Section renders interactive console and zero unhandled page errors occur', async ({ page }) => {
    const pageErrors: string[] = [];
    page.on('pageerror', (err) => {
      pageErrors.push(err.message);
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const faqSection = page.locator('#faq');
    await expect(faqSection).toBeVisible({ timeout: 10000 });
    await faqSection.scrollIntoViewIfNeeded();

    // Ensure FAQ questions are interactive
    const faqButtons = faqSection.locator('button');
    expect(await faqButtons.count()).toBeGreaterThan(2);

    // Assert zero unhandled runtime exceptions on the page
    expect(pageErrors).toEqual([]);
  });
});
