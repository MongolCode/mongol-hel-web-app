import { defineConfig } from "cypress";
const cucumber = require('cypress-cucumber-preprocessor').default;

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber({
        typescript: require.resolve('typescript')
      }));
      return config;
    },
  },
});
