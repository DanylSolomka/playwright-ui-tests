import { test, expect } from '@playwright/test';

test('select dropdown option', async ({ page }) => {
    await page.goto('/dropdown');

    await page.selectOption('#dropdown', '1');

    await expect(page.locator('#dropdown')).toHaveValue('1');
});