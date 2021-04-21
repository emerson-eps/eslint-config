/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// https://eslint.org/docs/developer-guide/shareable-configs#publishing-a-shareable-config
module.exports = {
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/parser/README.md
  // No need to define @typescript-eslint/parser as the react-app config specifies
  // it as an override for all ts and tsx files, otherwise babel-eslint is used.
  // parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    node: true,
    es6: true,
    jest: true,
    jasmine: true,
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "prettier"],
  extends: [
    // Base recommended set of rules
    "eslint:recommended",
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/configs
    // recommended extends @typescript-eslint/eslint-recommended which disables some of eslint:recommended
    "plugin:@typescript-eslint/recommended",
    // Set of rules defined by create-react-app
    // Enables some of the react and react-hooks plugins rules but the set
    // is not as extensive as react/recommended and react-hooks/recommended
    // https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app
    "react-app",
    // Additional recommended react rules not all included in react-app
    "plugin:react/recommended",
    // Additional recommended react-hooks rules not all included in react-app
    "plugin:react-hooks/recommended",
    // Prettier config comes last as it disables conflicting ESLint rules enabled by other sets
    "plugin:prettier/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // Disallow console as not enabled by eslint:recommended contrary to docs
    "no-console": "error",
    // Increase react-hooks/exhaustive-deps from warning to error
    "react-hooks/exhaustive-deps": "error",
  },
  overrides: [
    // Typescript overrides
    {
      files: ["**/*.ts?(x)"],
      rules: {
        "react/prop-types": "off", // Not necessary in Typescript
      },
    },
    // Test overrides
    {
      files: ["**/*.test.{j,t}s?(x)"],
      rules: {
        // Allow assertion operator in unit tests because TS does not recognize
        // jest expects such as toBeDefined() or not.toBeNull() as type-validating
        "@typescript-eslint/no-non-null-assertion": "off",
      },
    },
    // Storybook overrides
    {
      files: ["**/*.stories.{j,t}s?(x)"],
      rules: {
        "import/no-anonymous-default-export": "off", // Not helpful
      },
    },
  ],
  reportUnusedDisableDirectives: true,
};
