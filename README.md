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


## Built with 

- nvm: to manage global node/npm versions, `0.40.3`
- yarn: `v4.10.3`
- node: `v24`
- playwright: `v1.56.1`

## Running

1. `yarn install`
2. now you're ready to run tests

### Run examples

- `yarn playwright test --project=chromium --headed`  
- `yarn playwright test`
- `yarn playwright test --ui`

> [!CAUTION]
> I've found playwright's UI trace viewer feature to be of poor quality. I see certain test steps are excluded from logging and it's unclear how to resolve that in the UI itself.

## Scenarios

- complete checkout for 1 inventory items
- complete checkout for all inventory items