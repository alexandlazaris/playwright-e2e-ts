import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/login';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
});

type Login = {
    username: string,
    password: string,
    errorMessage: string
}

const errorLogins: Login[] = [
    {
        username: "locked_out_user",
        password: "secret_sauce",
        errorMessage: "Epic sadface: Sorry, this user has been locked out."
    },
    {
        username: "user_does_not_exist",
        password: "secret_sauce",
        errorMessage: "Epic sadface: Username and password do not match any user in this service"
    }
]

for (let data of errorLogins) {
    test(`validate error message state for ${data.username}`, async ({ page }) => {
        await page.goto("/");
        await loginPage.inputLoginAndSubmit(data.username, data.password);
        expect(loginPage.errorMessage).toHaveText(data.errorMessage);
    });
}
