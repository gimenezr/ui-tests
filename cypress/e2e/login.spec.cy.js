import ProfileComponent from "../pages/components/profileComponent";
import LoginPage from "../pages/loginPage";
import { LANGUAGE_VALUE } from "../utils/languageConstants";

describe("User access to the app", () => {
  before(() => {
    

    // cy.visit("/");
    
    // cy.get("button[type=submit]").click();
    // cy.location("pathname").should("to.eq", "/account/dashboard/");
    cy.setCookie(
      "osano_consentmanager",
      "Y-2LQKHu5l8pKISjBI0luyEyEPtc5MphuRgXDxmhq7qLNIGmRqZnXbYwPnmwZ9Ppc0WpWu51nRWKYBfoHSAP6pfdY-YMXjPF2XLUGeAN2nMHqY-euby0spvUlTQX3X7YTZ_UHWspbyfTuBp9tQ8UtORUYpnm07Kq_sdFX6kS6xGAPNe0w5j3YoiwhobtIXJ7oaWHID260lZ_mCcn8eAsKPhKFbLx3d5zxMCtNCqmtIuCHLuGEYENdO-_59cBCq0zNDJZJQDaEQiNj0YDeWax9r7UmsBar_-GLhn6dA=="
    );
    cy.setCookie(
      "osano_consentmanager_uuid",
      "ccff8d73-3ca7-48b7-865b-d64efc82c674"
    );
  });

  // it("should successfully log in with valid credentials and log out", () => {
  //   cy.visit("/");
  //   const profileComponent = new ProfileComponent();
  //   profileComponent.logout();
  //   cy.contains("Login").and("be.visible");
  //   cy.findByRole("paragraph")
  //     .should("contain", "You have successfully logged out.")
  //     .and("be.visible");
  //   //getByRole('paragraph')
  //   ///getByRole('heading', { name: 'You have entered an incorrect' })
  // });

  // it("should show an error message with invalid credentials", () => {
  //   cy.visit("/");
  //   const loginPage = new LoginPage();
  //   loginPage.login("notAUser", "wrong pass");
  //   cy.get(".cbox_messagebox_error")
  //     .should("contain", "You have entered an incorrect username or password.")
  //     .and("be.visible");
  // });

  it("should maintain user preferred language when changing language in login page", () => {
    cy.visit("/");
    const loginPage = new LoginPage();
    loginPage.changeLanguage(LANGUAGE_VALUE.IT);
    cy.intercept("GET", "/v7/identity/users/current_user/").as("userData");
    
    const profileComponent = new ProfileComponent();
    cy.wait("@userData").then(({ response }) => {
      cy.log(response);
      expect(response.body.preferred_language).to.exist;
      expect(response.body.preferred_language).to.eq("en_US");
    });
    profileComponent.seeLanguage();
    cy.get('[id=en_US-language-item-form]').find(
      ".language-switch__selected-indicator"
    );
  });
});
