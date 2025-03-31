import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

const jsRecommended = js.configs.recommended;
const tsRecommended = ts.configs.recommended;
const prettierConfig = {
  plugins: { prettier: prettierPlugin },
  rules: { "prettier/prettier": "error" },
};
const reactHooksRecommended = {
  plugins: { "react-hooks": reactHooks },
  rules: { ...reactHooks.configs.recommended.rules },
};

export default [
  // Base JavaScript config for both frontend and backend
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...jsRecommended.rules,
      "no-console": "warn", // Example shared rule
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.es2021,
      },
    },
    ignores: ["**/node_modules/**"],
  },
  // Backend-specific TypeScript config
  {
    files: ["backend/**/*.ts"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: "./backend/tsconfig.json",
      },
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsRecommended.rules,
      // Backend-specific rules
    },
    ignores: ["backend/node_modules/**"],
  },
  // Frontend-specific TypeScript/JSX config
  {
    files: ["frontend/**/*.{ts,tsx}"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: "./frontend/tsconfig.json",
        jsx: true,
      },
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsRecommended.rules,
      ...reactHooksRecommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": "error",
    },
    ignores: ["frontend/node_modules/**"],
  },
  // Apply Prettier configuration
  {
    ...prettierConfig,
    files: ["**/*.js", "**/*.cjs", "**/*.mjs", "**/*.ts", "**/*.tsx"],
  },
  // Apply eslint-config-prettier to disable conflicting rules
  {
    ...configPrettier,
    files: ["**/*.js", "**/*.cjs", "**/*.mjs", "**/*.ts", "**/*.tsx"],
  },
];
