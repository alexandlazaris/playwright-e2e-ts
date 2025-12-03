import { expect } from '@playwright/test';
import { PRODUCTS, DETAILS } from '../../constants';
import { InventoryPage } from '../pageObjects/inventory';
import { MenuBar } from '../pageObjects/menu';
import { ShoppingCartPage } from '../pageObjects/shoppingCart';
import { test } from '../fixtures/login';

let inventoryPage: InventoryPage;
let menuBar: MenuBar;
let shoppingCartPage: ShoppingCartPage;

test.beforeEach(async ({ page }) => {
  inventoryPage = new InventoryPage(page);
  menuBar = new MenuBar(page);
  shoppingCartPage = new ShoppingCartPage(page);
});


test('complete checkout for 1 inventory items', async ({ }) => {
  // add 1 product, get the price & check cart count increases to 1
  const inventoryProduct = await inventoryPage.addSingleProductToCart(PRODUCTS.onesie);
  const inventoryItemPrice = await inventoryPage.getProductPrice(inventoryProduct);
  expect(await menuBar.shoppingCartBadgeNumber).toHaveText("1");

  // proceed through pages to checkout details
  await menuBar.shoppingCarLink.click();
  await shoppingCartPage.checkoutButton.click();
  await shoppingCartPage.fillCheckoutDetails(DETAILS.firstName, DETAILS.lastName, DETAILS.postalCode);

  // checkout total price matches earlier inventory price
  const checkoutItemPrice = await shoppingCartPage.getProductPriceValue();
  expect(checkoutItemPrice).toBe(inventoryItemPrice);

  await shoppingCartPage.finishButton.click();

  // check checkout success message
  expect(shoppingCartPage.finishOrderMessage).toBeVisible();
  await shoppingCartPage.goBackToProducts();

  // check cart should be empty
  expect(await menuBar.shoppingCartBadgeNumber.count()).toBe(0);
});

test('complete checkout for all inventory items', async ({ page }) => {
  const numberOfProducts = Object.keys(PRODUCTS).length;

  let product;
  let totalPriceOfInventory = 0;

  for (let [_, name] of Object.entries(PRODUCTS)) {
    let inventoryProduct = await inventoryPage.addSingleProductToCart(name);
    let inventoryPrice = await inventoryPage.getProductPrice(inventoryProduct);
    totalPriceOfInventory += inventoryPrice;
  }

  // check cart count increases to the total number of products added
  expect(await menuBar.shoppingCartBadgeNumber).toHaveText(numberOfProducts.toString());

  // proceed through pages to checkout details
  await menuBar.shoppingCarLink.click();
  await shoppingCartPage.checkoutButton.click();
  await shoppingCartPage.fillCheckoutDetails(DETAILS.firstName, DETAILS.lastName, DETAILS.postalCode);

  // checkout total matches earlier calculated price 
  const checkoutSummaryPrice = await shoppingCartPage.getProductPriceValue();
  expect(totalPriceOfInventory).toEqual(checkoutSummaryPrice);

  await shoppingCartPage.finishButton.click();

  // check checkout success message
  expect(shoppingCartPage.finishOrderMessage).toBeVisible();
  await shoppingCartPage.goBackToProducts();

  // check cart should be empty
  expect(await menuBar.shoppingCartBadgeNumber.count()).toBe(0);
});