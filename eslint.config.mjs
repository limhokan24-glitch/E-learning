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
    rules: {
      // Allow 'any' type in TypeScript
      "@typescript-eslint/no-explicit-any": "off",
      
      // Warn instead of error for unused vars
      "@typescript-eslint/no-unused-vars": "warn",
      
      // Allow standard <img> tags
      "@next/next/no-img-element": "off",
      
      // Allow images without alt text
      "jsx-a11y/alt-text": "off"
    },
  },
];

export default eslintConfig;
