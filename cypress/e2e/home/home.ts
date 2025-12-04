import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I visit the home page', () => {
    cy.visit('/');
});

Then('I should see the title {string}', (title: string) => {
    cy.contains(title).should('be.visible');
});