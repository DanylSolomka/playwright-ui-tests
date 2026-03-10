import { test, expect } from '@playwright/test';

test('checkbox interaction', async ({ page }) => {
    await page.goto('/checkboxes');

    const checkbox1 = page.locator('input[type="checkbox"]').first();

    await checkbox1.check();

    await expect(checkbox1).toBeChecked();
});