import { Locator, Page } from "playwright/test";

export class InventoryPage {
    readonly page: Page;
    readonly allInventoryItems: Locator;
    readonly inventoryItem: Locator;
    readonly inventoryItemPrice: Locator;
    readonly inventoryItemAddToCart: Locator;
    readonly inventoryItemLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.allInventoryItems = page.locator('.inventory_item_description')
        this.inventoryItem = page.locator('.inventory_item_name');
        this.inventoryItemPrice = page.locator('.inventory_item_price');
        this.inventoryItemAddToCart = page.locator('.btn_inventory');
        this.inventoryItemLabel = page.locator('.inventory_item_label');
    }

    async addSingleProductToCart(productName: string) {
        const matchingProduct = this.allInventoryItems.filter({ has: this.inventoryItem.getByText(productName) });
        const addButton = matchingProduct.locator(this.inventoryItemAddToCart)
        await addButton.click();
        return matchingProduct;
    }

    async getProductPrice(product: Locator):Promise<number> {
        let productPriceString = await product.locator(this.inventoryItemPrice).textContent();
        let price = parseFloat(productPriceString?.split("$")[1]?.trim() ?? "0");
        return price;
    }
}