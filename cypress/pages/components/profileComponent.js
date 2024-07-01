class ProfileComponent {
  elements = {
    profileLink: () => cy.get('.admin-options a[href="#"]'),
    logoutButton: () => cy.get('[type="submit"]'),
    changeLanguageButton: () => cy.findByRole("link", { name: "Language" }),
  };

  logout() {
    this.elements.profileLink().click();
    this.elements.logoutButton().click();
  }

  seeLanguage() {
    this.elements.profileLink().click();
    this.elements.changeLanguageButton().click();
  }

  getSelectedLanguage(language) {
    return cy
      .findByRole("link", { name: `${language}` })
      .find(".language-switch__selected-indicator");
  }
}

export default ProfileComponent;
