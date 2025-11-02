import { Locator, Page, expect } from "playwright/test";

export class InventoryPage {
    readonly page: Page;
    readonly inventoryItem: Locator;
    readonly inventoryItemPrice: Locator;
    readonly inventoryItemAddToCart: Locator;
    readonly inventoryItemLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItem = page.locator('.inventory_item_name');
        this.inventoryItemPrice = page.locator('.inventory_item_price');
        this.inventoryItemAddToCart = page.locator('.btn');
        this.inventoryItemLabel = page.locator('.inventory_item_label');
    }

    async addSingleProductToCart(productName: string) { 
        const allProducts = this.page.locator('.inventory_item_description');
        const matchingProduct = allProducts.filter({ has: this.page.locator('.inventory_item_name').getByText(productName) });
        const addButton = matchingProduct.locator('.btn_inventory')
        await addButton.click();
    }

    async showProductPreview() {
        // const imgLink = matchingProduct.locator('a')
        // await imgLink.click();
    }

    async openProductDetail(productName: string) {

    }
}