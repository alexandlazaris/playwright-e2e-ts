import { test } from '../../fixtures/login';
import { expect } from '@playwright/test';

test('snapshot of home inventory page', async ({ page }) => {
  await expect(page).toHaveScreenshot();
});


