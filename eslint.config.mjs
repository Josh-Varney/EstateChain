import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {
    languageOptions:
    { 
      globals: globals.browser,
      ...globals.node, // Include Node.js globals
    },
    rules: {
      semi: "error",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginJs.configs.recommended, // JavaScript linting rules
  tseslint.configs.recommended, // TypeScript linting rules
  pluginReact.configs.flat.recommended, // React-specific linting rules
];