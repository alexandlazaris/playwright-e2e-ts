import { test, expect } from '@playwright/test';

test('snapshot of landing page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot();
});


