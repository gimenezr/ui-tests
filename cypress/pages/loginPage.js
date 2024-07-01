class LoginPage {
  elements = {
    username: () => cy.get("[id=inputEmail]"),
    password: () => cy.get("[id=inputPassword]"),
    loginButton: () => cy.get("button[type=submit]"),
    paragraphMessage: () => cy.findByRole("paragraph"),
    changeLanguageButton: () => cy.findByRole("link", { name: "Language" }),
  };

  doLogin(username, password) {
    this.elements.username().type(username);
    this.elements.password().type(password);
    this.elements.loginButton().click();
  }

  getNotificationMessage() {
    return this.elements.paragraphMessage();
  }

  changeLanguage(language) {
    this.elements.changeLanguageButton().click();
    cy.findByRole("link", { name: `${language}` }).click();
  }
}

export default LoginPage;
