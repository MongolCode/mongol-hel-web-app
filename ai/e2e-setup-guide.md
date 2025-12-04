# E2E Testing Setup Guide: Cypress + Cucumber (Legacy)

This guide outlines the steps to set up End-to-End (E2E) testing using Cypress and the legacy `cypress-cucumber-preprocessor`.

## 1. Install Dependencies

Install Cypress and the legacy Cucumber preprocessor.

```bash
npm install -D cypress cypress-cucumber-preprocessor
```

## 2. Initialize Cypress

Run Cypress for the first time to generate the initial folder structure.

```bash
npx cypress open
```

This will create a `cypress` folder and a `cypress.config.ts` file. You can close the Cypress window after it opens.

## 3. Configure Cypress

Edit `cypress.config.ts` to set up the Cucumber preprocessor and base URL.

```typescript
import { defineConfig } from 'cypress';
const cucumber = require('cypress-cucumber-preprocessor').default;

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: '**/*.feature',
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber({
        typescript: require.resolve('typescript')
      }));
      return config;
    },
  },
});
```

## 4. Configure Cucumber Preprocessor

Add the configuration to your `package.json` to specify where step definitions are located.

Open `package.json` and add:

```json
"cypress-cucumber-preprocessor": {
  "nonGlobalStepDefinitions": true,
  "stepDefinitions": "cypress/e2e"
}
```

*Note: `nonGlobalStepDefinitions: true` is recommended for better organization, allowing step definitions to be near their feature files.*

## 5. Create a Test

### Feature File
Create a file `cypress/e2e/home.feature`:

```gherkin
Feature: Home Page

  Scenario: Visits the home page
    Given I visit the home page
    Then I should see the title "Mongol"
```

### Step Definitions
Create a file `cypress/e2e/home/home.ts` (folder name matches feature file name):

```typescript
import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I visit the home page', () => {
  cy.visit('/');
});

Then('I should see the title {string}', (title: string) => {
  cy.contains(title).should('be.visible');
});
```

## 6. Update TypeScript Config

Create `cypress/tsconfig.json` to include the necessary types and ensure compatibility.

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress", "node"],
    "esModuleInterop": true
  },
  "include": ["**/*.ts"]
}
```

## 7. Run Tests

To run the tests in interactive mode:
```bash
npx cypress open
```

To run the tests in headless mode:
```bash
npx cypress run --headless
```

## 8. Add Scripts to package.json

Add these scripts to your `package.json` for convenience:

```json
"scripts": {
  ...
  "e2e": "ng e2e",
  "cypress:open": "cypress open",
  "cypress:run": "cypress run"
}
```
