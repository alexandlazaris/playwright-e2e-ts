import { test as base } from '@playwright/test';
import { LoginPage } from '../pageObjects/login';
import { getLoginCredsFromEnv } from '../utils/getCredsFromEnv';

// use fixtures as modular setup/teardown functions, reducing duplication in tests
export const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: [async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await page.goto("/");
    let creds = getLoginCredsFromEnv()
    await loginPage.inputLoginAndSubmit(creds.usernameKey, creds.passwordKey);
    await use(loginPage);
  }, { auto: true }], 
});