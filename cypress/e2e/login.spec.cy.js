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
    const loginPage = new LoginPage();
    loginPage.doLogin(Cypress.env("user"), Cypress.env("pass"));
    profileComponent.logout();
    cy.contains("Login").and("be.visible");
    cy.getParagraphMessage()
      .should("contain", "You have successfully logged out.")
      .and("be.visible");
    cy.getHeaderMessage()
      .should("contain", "You have successfully logged out.")
      .and("be.visible");
  });

  it("should show an error message with invalid credentials", () => {
    const loginPage = new LoginPage();
    loginPage.doLogin(faker.internet.userName(), faker.internet.password());
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

    loginPage.doLogin(Cypress.env("user"), Cypress.env("pass"));
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
});
