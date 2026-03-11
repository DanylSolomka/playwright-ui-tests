import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }

    async open() {
        await this.page.goto('/cart.html');
    }

    async expectOpened() {
        await expect(this.page).toHaveURL(/cart.html/);
    }

    async expectItemVisible(name: string) {
        await expect(this.page.locator('.inventory_item_name', { hasText: name })).toBeVisible();
    }

    async removeItem(name: string) {
        const item = this.page.locator('.cart_item', { hasText: name });
        await item.locator('button', { hasText: 'Remove' }).click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async checkout() {
        await this.checkoutButton.click();
    }
}