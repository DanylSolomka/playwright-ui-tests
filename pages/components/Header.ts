import { Page, Locator } from '@playwright/test';

export class Header {
    readonly page: Page;
    readonly cartIcon: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async getCartBadgeCount(): Promise<number> {
        const text = await this.cartBadge.textContent();
        return Number(text);
    }
}