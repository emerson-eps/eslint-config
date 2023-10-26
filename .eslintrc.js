/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// https://eslint.org/docs/developer-guide/shareable-configs#publishing-a-shareable-config
module.exports = {
  parser: "@typescript-eslint/parser",
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
    browser: true,
    commonjs: true,
  },
  ignorePatterns: [
    // same as exclude in tsconfig.json
    "/build",
    "/coverage",
    "/dist",
    "/doc",
    "/node_modules",
    "/tmp",
  ],
  plugins: [
    "@typescript-eslint",
    "flowtype",
    "import",
    "jsx-a11y",
    "react",
    "react-hooks",
    "sonarjs",
  ],
  extends: [
    // Base recommended set of rules
    "eslint:recommended",
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/configs
    // recommended extends @typescript-eslint/eslint-recommended which disables some of eslint:recommended
    "plugin:@typescript-eslint/recommended",
    // Additional recommended react rules
    "plugin:react/recommended",
    // Additional recommended react-hooks rules
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
    curly: "warn",
    // Force import first
    "import/first": "warn",
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external"],
        pathGroups: [
          {
            pattern: "@epconnect/**",
            group: "external",
            position: "after",
          },
        ],
        "newlines-between": "always-and-inside-groups",
      },
    ],
    // Set console calls to emit warnings as not enabled by eslint:recommended
    "no-console": "warn",
    // enforce types
    "@typescript-eslint/no-explicit-any": "warn",
    // Bans specific types from being used (e.g. builtin types)
    "@typescript-eslint/ban-types": "warn",
    // enforce typed exports
    "@typescript-eslint/explicit-module-boundary-types": "warn",
    // enforce clean code
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    // Keep naming convention for later
    // enforce interface naming convention
    // "@typescript-eslint/naming-convention": [
    //   "warn",
    //   {
    //     selector: "interface",
    //     format: ["PascalCase"],
    //     custom: {
    //       regex: "^I[A-Z]",
    //       match: true,
    //     },
    //   },
    //   {
    //     selector: "typeAlias",
    //     format: ["PascalCase"],
    //     custom: {
    //       regex: "^T[A-Z]",
    //       match: true,
    //     },
    //   },
    // ],
    // enforce import ordering
    "sort-imports": [
      "warn",
      {
        allowSeparatedGroups: true,
        memberSyntaxSortOrder: ["none", "all", "single", "multiple"],
        ignoreCase: false,
      },
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
      files: ["**/*.test.{j,t}s?(x)", "**/__*tests__/*"],
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
        // Default complexity is 15 but since cypress test have some before and after hooks, let's increase a little bit
        "sonarjs/cognitive-complexity": ["warn", 20],
        // Allow assertion operator in unit tests because TS does not recognize
        // jest expects such as toBeDefined() or not.toBeNull() as type-validating
        "@typescript-eslint/no-non-null-assertion": "off",
      },
    },
  ],
  reportUnusedDisableDirectives: true,
};
