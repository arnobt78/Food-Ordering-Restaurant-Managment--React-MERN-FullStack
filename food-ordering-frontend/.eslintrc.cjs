module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "off",
    // Ignore unused imports and variables to prevent deployment issues
    "@typescript-eslint/no-unused-vars": "off",
    "no-unused-vars": "off",
    // Allow console statements for debugging
    "no-console": "off",
    // Allow any type usage
    "@typescript-eslint/no-explicit-any": "off",
    // Allow non-null assertion
    "@typescript-eslint/no-non-null-assertion": "off",
    // Allow empty functions
    "@typescript-eslint/no-empty-function": "off",
    // Allow unused expressions
    "@typescript-eslint/no-unused-expressions": "off",
  },
};
