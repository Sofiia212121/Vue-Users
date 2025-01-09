import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,vue}"] },
  { languageOptions: { globals: { ...globals.browser, bootstrap: "readonly" } } },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],

  {
    files: ["cypress/**/*.js", "cypress/**/*.ts", "cypress/**/*.vue"],
    languageOptions: {
      globals: {
        ...globals.browser,
        describe: "readonly",
        it: "readonly",
        cy: "readonly",
        Cypress: "readonly",
      },
    },
  },

  {
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
];
