import { Locator, Page } from "playwright/test";

export class MenuBar {
    readonly page: Page;
    readonly shoppingCarLink: Locator;
    readonly shoppingCarBadgeNumber: Locator;
    readonly menuButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCarLink= page.locator('.shopping_cart_link');
        this.shoppingCarBadgeNumber= page.locator('.shopping_cart_badge');
        this.menuButton= page.locator('#react-burger-menu-btn');
        this.logoutButton= page.locator('#logout_sidebar_link');
    }



}

