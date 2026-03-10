import { test, expect } from '@playwright/test';

test('dynamic loading example', async ({ page }) => {
    await page.goto('/dynamic_loading/2');

    await page.click('#start button');

    await expect(page.locator('#finish')).toContainText('Hello World!');
});