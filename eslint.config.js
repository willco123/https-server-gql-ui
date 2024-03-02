import stylistic from "@stylistic/eslint-plugin";
import parserTs from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      "@stylistic": stylistic,
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    parser: parserTs,
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "double"],
    },
  },
];
