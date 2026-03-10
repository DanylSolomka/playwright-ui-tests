import { test, expect } from '@playwright/test';

test('add and remove element', async ({ page }) => {
    await page.goto('/add_remove_elements/');

    await page.click('text=Add Element');

    const deleteButton = page.locator('text=Delete');

    await expect(deleteButton).toBeVisible();

    await deleteButton.click();

    await expect(deleteButton).toHaveCount(0);
});