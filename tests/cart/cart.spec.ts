import { test, expect } from '../../fixtures/baseTest';

test.describe('@cart Cart functionality', () => {

    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.open();
    });

    test('Add one item → badge = 1 → item in cart', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addItem('Sauce Labs Backpack');

        await inventoryPage.expectCartBadge(1);

        await inventoryPage.openCart();

        await cartPage.expectOpened();
        await cartPage.expectItemVisible('Sauce Labs Backpack');
    });

    test('Add two items → badge = 2 → both in cart', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addItem('Sauce Labs Backpack');
        await inventoryPage.addItem('Sauce Labs Bike Light');

        await inventoryPage.expectCartBadge(2);

        await inventoryPage.openCart();

        await cartPage.expectItemVisible('Sauce Labs Backpack');
        await cartPage.expectItemVisible('Sauce Labs Bike Light');
    });

    test('Remove item from Inventory → badge updates', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addItem('Sauce Labs Backpack');
        await inventoryPage.addItem('Sauce Labs Bike Light');

        await inventoryPage.removeItem('Sauce Labs Bike Light');

        await inventoryPage.expectCartBadge(1);

        await inventoryPage.openCart();

        await cartPage.expectItemVisible('Sauce Labs Backpack');
    });

    test('Remove item from Cart → badge updates', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addItem('Sauce Labs Backpack');
        await inventoryPage.addItem('Sauce Labs Bike Light');

        await inventoryPage.openCart();

        await cartPage.removeItem('Sauce Labs Bike Light');

        await inventoryPage.header.cartIcon.click();

        await expect(inventoryPage.header.cartBadge).toHaveText('1');
    });

    test('Continue Shopping returns to Inventory', async ({ inventoryPage, cartPage, page }) => {
        await inventoryPage.addItem('Sauce Labs Backpack');

        await inventoryPage.openCart();

        await cartPage.continueShopping();

        await expect(page).toHaveURL(/inventory.html/);

        await inventoryPage.expectCartBadge(1);
    });

});