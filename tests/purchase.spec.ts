import { test, expect } from '@playwright/test';
import { BASE_URL, PRODUCTS } from '../constants';
import { LoginPage } from '../pageObjects/login';
import { InventoryPage } from '../pageObjects/inventory';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
});


test('add 1 product to cart from inventory list and complete purchase', async ({ page }) => {

  await page.goto(BASE_URL);
  await loginPage.validUserLogin('standard_user', 'secret_sauce');
  await inventoryPage.addSingleProductToCart(PRODUCTS.bikeLight);

  // TODO: add assertions
});
