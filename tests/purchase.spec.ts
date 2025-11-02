import { test, expect } from '@playwright/test';
import { BASE_URL, PRODUCTS } from '../constants';
import { LoginPage } from '../pageObjects/login';
import { InventoryPage } from '../pageObjects/inventory';
import { MenuBar } from '../pageObjects/menu';
import { ShoppingCartPage } from '../pageObjects/shoppingCart';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let menuBar: MenuBar;
let shoppingCartPage: ShoppingCartPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  menuBar = new MenuBar(page);
  shoppingCartPage = new ShoppingCartPage(page);
});


test('add 1 product to cart from inventory list and complete purchase', async ({ page }) => {
  await page.goto(BASE_URL);
  await loginPage.validUserLogin('standard_user', 'secret_sauce');

  const product = await inventoryPage.addSingleProductToCart(PRODUCTS.bikeLight);
  const productPrice = await inventoryPage.getProductPrice(product);

  // check cart count increases to 1
  const badgeNumber = await menuBar.shoppingCartBadgeNumber.textContent();
  expect(parseInt(badgeNumber!)).toBe(1);

  await menuBar.shoppingCarLink.click();
  await shoppingCartPage.checkoutButton.click();
  await shoppingCartPage.fillCheckoutDetails("tom", "jerry", "9876");

  // check product price hasn't changed
  const priceSummaryValue = await shoppingCartPage.getProductPriceValue();
  expect(await productPrice).toEqual(priceSummaryValue);

  await shoppingCartPage.finishButton.click();

  // check checkout success message
  expect(shoppingCartPage.finishOrderMessage).toBeVisible();
  await shoppingCartPage.goBackToProducts();

  // check cart should be empty
  expect(await menuBar.shoppingCartBadgeNumber.count()).toBe(0);
});
