import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import cypress from "eslint-plugin-cypress";

export default defineConfig([
  // Configuração para arquivos JavaScript gerais
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    }
  },

  // Configuração específica para Cypress
  {
    files: ["cypress/**/*.js", "cypress.config.js"],
    plugins: {
      cypress
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        describe: "readonly",
        context: "readonly",
        it: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        before: "readonly",
        after: "readonly",
        cy: "readonly",
        expect: "readonly",
        assert: "readonly"
      }
    },
    rules: {
      "cypress/no-assigning-return-values": "error",
      "cypress/no-unnecessary-waiting": "error",
      "cypress/assertion-before-screenshot": "warn",
      "cypress/no-force": "warn",
      "cypress/no-async-tests": "error",
      "cypress/no-pause": "error",
      "Cypress": "no-undef"
    }
  }
]);
