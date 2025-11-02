import { Locator, Page } from "playwright/test";

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
        return matchingProduct;
    }

    async getProductPrice(product:Locator) {
        const productPrice = product.locator(this.inventoryItemPrice).textContent();
        return productPrice;
    }

    async showProductPreview() {
        // const imgLink = matchingProduct.locator('a')
        // await imgLink.click();
    }
}