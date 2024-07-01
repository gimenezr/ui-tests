// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
import "@testing-library/cypress/add-commands";

Cypress.Commands.add("login", (username, password) => {
  cy.get("[id=inputEmail]").type(username);
  cy.get("[id=inputPassword]").type(password);
  cy.get("button[type=submit]").click();
});

Cypress.Commands.add("getParagraphMessage", () => {
  return cy.findByRole("paragraph");
});

Cypress.Commands.add("getHeaderMessage", () => {
  return cy.findByRole("heading");
});

/* The cookie value is autogenerated and requires specific implementation knowledge to handle dynamically.
As a workaround, we're setting hardcoded values in the local store for testing purposes.
*/
Cypress.Commands.add("acceptCookies", () => {
  cy.setCookie(
    "osano_consentmanager",
    "TcVoStzVPLg20wI8CBHzzyCdYx4pNDATVKuKZzOzxs--Df6NRyFOAnvL1vWVhelp4LvCGWO0ymDtCMxnsUTO5qPlMeVj-OyFKNhnI5kHAFEvUzbwAjqvlhhQhg6Ow-NZ8gp1tPwRjx87DkvwSegyVzrHn_r-u5SmL59fVJWc7l7zMJxynvhS7qMXg8mclyUyw-T5g6dMbWFpQNRcGxbgXfJM1AogzaOpHuskJ4nI7fC9ssKz6PhZKopPku7LtemEtqjkRF8c79VJHwmdFMmq-it4ABw="
  );
  cy.setCookie("osano_consentmanager_uuid", "123key");
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
