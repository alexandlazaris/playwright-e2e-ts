import { Locator, Page } from "playwright/test";

export class ShoppingCartPage {
    readonly page: Page;
    readonly cartItem: Locator;
    readonly checkoutButton: Locator;
    readonly detailsFirstName: Locator;
    readonly detailsLastName: Locator;
    readonly detailsPostalCode: Locator;
    readonly continueButton: Locator;
    readonly priceSummary: Locator;
    readonly priceTax: Locator;
    readonly priceTotal: Locator;
    readonly finishButton: Locator;
    readonly finishOrderMessage: Locator;
    readonly backToProductsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItem = page.locator('.cart_item');
        this.checkoutButton = page.locator('#checkout');
        this.detailsFirstName = page.locator('#first-name');
        this.detailsLastName = page.locator('#last-name');
        this.detailsPostalCode = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.priceSummary = page.locator('.summary_subtotal_label');
        this.priceTax = page.locator('.summary_tax_label');
        this.priceTotal = page.locator('.summary_total_label');
        this.finishButton = page.locator('#finish');
        this.finishOrderMessage = page.locator('.complete-header');
        this.backToProductsButton = page.locator('#back-to-products');
    }

    async proceedThroughCheckout() {
        await this.checkoutButton.click();
    }

    async fillCheckoutDetails(firstName: string, lastName: string, postalCode: string) {
        await this.detailsFirstName.fill(firstName);
        await this.detailsLastName.fill(lastName);
        await this.detailsPostalCode.fill(postalCode);
        await this.continueButton.click();
    }

    async goBackToProducts() {
        await this.backToProductsButton.click();
    }

    async getProductPriceValue() {
        const priceSummaryLabel = (await this.priceSummary.textContent())!;
        const priceSummaryValue = priceSummaryLabel.split(":")[1]?.trim();
        return priceSummaryValue;
    }

}

