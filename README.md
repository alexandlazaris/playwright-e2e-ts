# playwright-e2e-ts
Playwright tests in TypeScript targeting a demo web app.

Target app: https://www.saucedemo.com/

## Objective:

Develop an end-to-end test scenario for the successful purchase of any one of the listed products.

Tasks:
1. Document Test Scenarios:
- Outline the end-to-end test scenarios to achieve the objective.
- Include clear verification points for each stage of the purchase process.

2. Automate the Test Scenarios:
- Develop code to automate the documented scenarios.

3. Integrate with CI/CD Pipeline:
- Create a Cl configuration file to ensure the automated test runs as part of the pipeline.

Notes:

Use the following valid credentials for testing:
- Username: standard_user


## Local deps

- nvm: manages global node/npm versions, `0.40.3`
- yarn: `v4.10.3`
- node: `v24`

## Running

1. `yarn install`
2. now you're ready to run tests

### Run examples

- yarn playwright test --project=chromium --headed 
- yarn playwright test
- yarn playwright test --ui

## Scenarios needed

### add 1 product to cart from inventory list and complete purchase

1. login with valid user, confirm user is now in logged in state
2. add a product to cart from product list, confirm cart number updates
3. select shopping cart button, confirm selected product & details are stored
4. start checkout process, submit user details
5. confirm checkout overview invoice contains all the expected details & calcs
6. finish & confirm thank you message is shown, cart is now empty, press back home
7. log out of session, confirm logged out state

### add product to cart from product detail and complete purchase

1. login with valid user, confirm user is now in logged in state
2. select a product to open product detail
3. add product to cart from product detail page, confirm cart number updates
4. select shopping cart button, confirm selected product & details are stored
5. start checkout process, submit user details
6. confirm checkout overview invoice contains all the expected details & calcs
7. finish & confirm thank you message is shown, cart is now empty, press back home
8. log out of session, confirm logged out state