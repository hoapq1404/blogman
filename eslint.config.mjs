import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    rules: {
      "prefer-const": "error",
      "no-const-assign": "error",
      "no-var": "error",
      "no-new-object": "error",
      "object-shorthand": ["error", "always"],
      "quote-props": ["error", "as-needed"],
      "no-prototype-builtins": "error",
      "prefer-object-spread": "error",
      "no-array-constructor": "error",
      "array-callback-return": "error",
      "prefer-destructuring": ["error", {
        object: true,
        array: true,
      }],
      "quotes": ["error", "single"], // only allow single quotes for strings
      "prefer-template": "error", // prefer template literals over string concatenation
      "template-curly-spacing": ["error", "never"], // no spaces inside template literals
      "no-eval": "error", // disallow the use of eval()
      "no-useless-escape": "error", // disallow unnecessary escape characters
      "arrow-spacing": ["error", { before: true, after: true }], // enforce spacing around arrow function arrows
    },
    
  }
];

export default eslintConfig;
