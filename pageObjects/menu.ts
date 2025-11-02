import { Locator, Page } from "playwright/test";

export class MenuBar {
    readonly page: Page;
    readonly shoppingCarLink: Locator;
    readonly shoppingCartBadgeNumber: Locator;
    readonly menuButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCarLink = page.locator('.shopping_cart_link');
        this.shoppingCartBadgeNumber = page.locator('.shopping_cart_badge');
        this.menuButton = page.locator('button#react-burger-menu-btn');
        this.logoutButton = page.locator('#logout_sidebar_link');
    }

    async logoutOfApp() {
        await this.menuButton.click();
        await this.logoutButton.click();
    }
}

