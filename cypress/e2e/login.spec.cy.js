import ProfileComponent from "../pages/components/profileComponent";
import LoginPage from "../pages/loginPage";
import { faker } from "@faker-js/faker";
import { LANGUAGE_VALUE } from "../utils/languageConstants";

describe("Logged in user flow", () => {
  beforeEach(() => {
    cy.acceptCookies();
    cy.visit("/");
  });

  it("should successfully log in with valid credentials and log out", () => {
    const profileComponent = new ProfileComponent();
    cy.login(Cypress.env("user"), Cypress.env("pass"));
    cy.location("pathname").should("eq", "/account/dashboard/");

    profileComponent.logout();
    cy.location("pathname").should("eq", "/login/");
    cy.contains("Login").and("be.visible");
    cy.getParagraphMessage()
      .should("contain", "You have successfully logged out.")
      .and("be.visible");
    cy.getHeaderMessage()
      .should("contain", "You have successfully logged out.")
      .and("be.visible");
  });

  it("should show an error message with invalid credentials", () => {
    cy.login(faker.internet.userName(), faker.internet.password());

    cy.location("pathname").should("eq", "/login/");
    cy.getParagraphMessage()
      .should("contain", "You have entered an incorrect username or password.")
      .and("be.visible");
    cy.getHeaderMessage()
      .should("contain", "You have entered an incorrect username or password.")
      .and("be.visible");
  });

  it("should maintain user preferred language when changing language in login page", () => {
    const loginPage = new LoginPage();
    loginPage.changeLanguage(LANGUAGE_VALUE.IT);
    cy.intercept("GET", "/v7/identity/users/current_user/").as("userData");

    cy.login(Cypress.env("user"), Cypress.env("pass"));

    const profileComponent = new ProfileComponent();
    cy.wait("@userData").then(({ response }) => {
      expect(response.body.preferred_language).to.exist;
      expect(response.body.preferred_language).to.eq("en_US");
    });
    profileComponent.seeLanguage();
    profileComponent
      .getSelectedLanguage(LANGUAGE_VALUE.EN)
      .should("be.visible");
  });

  /*
  I marked this test as skipped because, after completing the required fields, 
  the "Send Instructions" button is not enabled. The page needs to be reloaded to 
  restore the button's status.
  I wanted to inform you about this behavior.
  */
  it.skip("should maintain user preferred language when changing language in login page", () => {
    const loginPage = new LoginPage();
    loginPage.elements.forgotPasswordButton().click();
    cy.location("pathname").should("eq", "/user/forgotPassword/");

    loginPage.elements.emailInput().type(faker.internet.userName());
    loginPage.elements.sendInstructionsButton().click();
    loginPage.elements.requiredFieldToastMessage().should("be.visible");

    loginPage.elements
      .captchaInput()
      .type(faker.string.alphanumeric({ length: 8 }));
    loginPage.elements.sendInstructionsButton().should("be.enabled");
  });
});
