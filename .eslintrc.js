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
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  env: {
    node: true,
    es6: true,
    jest: true,
    jasmine: true,
  },
  ignorePatterns: [
    // same as exclude in tsconfig.json
    "build",
    "coverage",
    "dist*",
    "doc",
    "node_modules",
    "tmp",
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks", "sonarjs"],
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
    // SonarJS recommended set
    "plugin:sonarjs/recommended",
    // Prettier config comes last as it disables conflicting ESLint rules enabled by other sets
    "prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    //************************************************************************
    // Enforced
    //
    // Set console calls to emit warnings as not enabled by eslint:recommended
    "no-console": "error",
    // Increase react-hooks/exhaustive-deps from warning to error
    "react-hooks/exhaustive-deps": "error",
    // enforce types
    "@typescript-eslint/no-explicit-any": "error",
    // enforce typed exports
    "@typescript-eslint/explicit-module-boundary-types": "error",
    // enforce clean code
    "@typescript-eslint/no-unused-vars": "error",
    // enforce interface naming convention
    "@typescript-eslint/naming-convention": [
       "error",
       {
         "selector": "interface",
         "format": ["PascalCase"],
         "custom": {
           "regex": "^I[A-Z]",
           "match": true
         }
       },
       {
         "selector": "typeAlias",
         "format": ["PascalCase"],
         "custom": {
           "regex": "^T[A-Z]",
           "match": true
         }
       }
    ],
    // enforce import ordering
    "sort-imports": [
       "error",
       {
         "allowSeparatedGroups": true,
         "memberSyntaxSortOrder": ["none", "all", "single", "multiple"],
         "ignoreCase": false
       }
    ],
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
    // Cypress overrides
    {
      files: ["cypress/**/*.{j,t}s?(x)"],
      plugins: ["cypress"],
      extends: ["plugin:cypress/recommended"],
      rules: {
        //https://github.com/SonarSource/eslint-plugin-sonarjs/issues/176
        //https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/src/rules/no-duplicate-string.ts
        //not compatible with asserts like should("be.visible")
        // > 10 chars and contains a separator "." so it would have to follow the no-duplicate-string rule
        "sonarjs/no-duplicate-string": "off",
        //Default complexity is 15 but since cypress test have some before and after hooks, let's increase a little bit
        "sonarjs/cognitive-complexity": ["error", 20],
      },
    },
  ],
  reportUnusedDisableDirectives: true,
};
