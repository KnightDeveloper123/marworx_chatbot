import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */


export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "react/prop-types": "off",
      "no-undef": "error"
    }
  },
  {
    files: ["backend/**/*.{js,cjs}"],
    languageOptions: {
      globals: globals.node,
      sourceType: "commonjs", // ✅ Use CommonJS in backend
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      "no-unused-vars": "warn",
    },
  },
];
