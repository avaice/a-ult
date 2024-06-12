import pluginJs from "@eslint/js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tailwind from "eslint-plugin-tailwindcss";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    languageOptions: { globals: globals.browser },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  ...tailwind.configs["flat/recommended"]

];