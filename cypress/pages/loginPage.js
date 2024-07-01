class LoginPage {
  elements = {
    paragraphMessage: () => cy.findByRole("paragraph"),
    changeLanguageButton: () => cy.findByRole("link", { name: "Language" }),
  };

  getNotificationMessage() {
    return this.elements.paragraphMessage();
  }

  changeLanguage(language) {
    this.elements.changeLanguageButton().click();
    cy.findByRole("link", { name: `${language}` }).click();
  }
}

export default LoginPage;
