import { test, expect } from '@playwright/test';

const baseUrl = 'https://the-internet.herokuapp.com';

// @ts-ignore
test('1. Form Authentication - successful login', async ({ page }) => {
    await page.goto(`${baseUrl}/login`);

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await expect(page.locator('.flash.success')).toContainText('You logged into a secure area!');
});

// @ts-ignore
test('2. Checkboxes - select checkbox', async ({ page }) => {
    await page.goto(`${baseUrl}/checkboxes`);

    const checkbox = page.locator('input[type="checkbox"]').nth(0);
    await checkbox.check();

    await expect(checkbox).toBeChecked();
});

// @ts-ignore
test('3. Dropdown - select option', async ({ page }) => {
    await page.goto(`${baseUrl}/dropdown`);

    await page.selectOption('#dropdown', '2');

    await expect(page.locator('#dropdown')).toHaveValue('2');
});

// @ts-ignore
test('4. Add/Remove Elements - add and remove button', async ({ page }) => {
    await page.goto(`${baseUrl}/add_remove_elements/`);

    await page.click('text=Add Element');
    const deleteButton = page.locator('text=Delete');

    await expect(deleteButton).toHaveCount(1);

    await deleteButton.click();
    await expect(deleteButton).toHaveCount(0);
});

// @ts-ignore
test('5. JavaScript Alerts - handle alert', async ({ page }) => {
    await page.goto(`${baseUrl}/javascript_alerts`);

    // @ts-ignore
    page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('I am a JS Alert');
        await dialog.accept();
    });

    await page.click('text=Click for JS Alert');

    await expect(page.locator('#result')).toContainText('You successfully clicked an alert');
});