import { test, expect } from '@playwright/test';
import { BASE_URL, PRODUCTS, DETAILS, LOGINS } from '../constants';
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


test('complete checkout for 1 inventory items', async ({ page }) => {
  await page.goto(BASE_URL);
  await loginPage.validUserLogin(LOGINS.standard.username, LOGINS.standard.password);

  const product = await inventoryPage.addSingleProductToCart(PRODUCTS.onesie);
  const price = await inventoryPage.getProductPrice(product);

  // check cart count increases to 1
  const badgeNumber = await menuBar.shoppingCartBadgeNumber.textContent();
  expect(parseInt(badgeNumber!)).toBe(1);

  await menuBar.shoppingCarLink.click();
  await shoppingCartPage.checkoutButton.click();
  await shoppingCartPage.fillCheckoutDetails(DETAILS.firstName, DETAILS.lastName, DETAILS.postalCode);

  // checkout total matches earlier calculated price
  const priceSummaryValue = await shoppingCartPage.getProductPriceValue();
  expect(await price).toEqual(priceSummaryValue);

  await shoppingCartPage.finishButton.click();

  // check checkout success message
  expect(shoppingCartPage.finishOrderMessage).toBeVisible();
  await shoppingCartPage.goBackToProducts();

  // check cart should be empty
  expect(await menuBar.shoppingCartBadgeNumber.count()).toBe(0);
});

test('complete checkout for all inventory items', async ({ page }) => {
  await page.goto(BASE_URL);
  await loginPage.validUserLogin(LOGINS.standard.username, LOGINS.standard.password);

  const numberOfProducts = Object.keys(PRODUCTS).length;

  let product;
  let totalPriceOfInventory = 0;

  for (let [_, name] of Object.entries(PRODUCTS)) {
    product = await inventoryPage.addSingleProductToCart(name);
    let price = await inventoryPage.getProductPrice(product);
    totalPriceOfInventory += price;
  }

  // check cart count increases to the total number of products added
  const badgeNumber = await menuBar.shoppingCartBadgeNumber.textContent();
  expect(parseInt(badgeNumber!)).toBe(numberOfProducts);

  await menuBar.shoppingCarLink.click();
  await shoppingCartPage.checkoutButton.click();
  await shoppingCartPage.fillCheckoutDetails(DETAILS.firstName, DETAILS.lastName, DETAILS.postalCode);

  // checkout total matches earlier calculated price 
  const priceSummaryValue = await shoppingCartPage.getProductPriceValue();
  expect(totalPriceOfInventory).toEqual(priceSummaryValue);

  await shoppingCartPage.finishButton.click();

  // check checkout success message
  expect(shoppingCartPage.finishOrderMessage).toBeVisible();
  await shoppingCartPage.goBackToProducts();

  // check cart should be empty
  expect(await menuBar.shoppingCartBadgeNumber.count()).toBe(0);
});