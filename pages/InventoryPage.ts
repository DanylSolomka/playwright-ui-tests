import { Page, expect } from '@playwright/test';
import { Header } from './components/Header';

export class InventoryPage {
    readonly page: Page;
    readonly header: Header;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
    }

    async open() {
        await this.page.goto('/inventory.html');
    }

    async addItem(name: string) {
        const item = this.page.locator('.inventory_item').filter({ hasText: name });
        await item.getByRole('button', { name: 'Add to cart' }).click();
    }

    async removeItem(name: string) {
        const item = this.page.locator('.inventory_item', { hasText: name });
        await item.locator('button', { hasText: 'Remove' }).click();
    }

    async expectCartBadge(count: number) {
        await expect(this.header.cartBadge).toHaveText(String(count));
    }

    async openCart() {
        await this.header.openCart();
    }
}