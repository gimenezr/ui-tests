class LoginPage {
  elements = {
    paragraphMessage: () => cy.findByRole("paragraph"),
    changeLanguageButton: () => cy.findByRole("link", { name: "Language" }),
    forgotPasswordButton: () =>
      cy.findByRole("link", { name: "Lost password?" }),
    emailInput: () => cy.get("#forgotPassword"),
    sendInstructionsButton: () => cy.get("#sendPassword"),
    requiredFieldToastMessage: () => cy.findByText("This field is required."),
    captchaInput: () => cy.findByPlaceholderText("Enter above word(s)"),
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
