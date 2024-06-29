const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://wave-trial.getbynder.com/login/",
    watchForFileChanges: false,
  },
});
