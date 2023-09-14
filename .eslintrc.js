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

    // https://typescript-eslint.io/linting/configs/#recommended-configurations
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic",

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
    "no-restricted-imports": [
      "warn",
      {
        paths: [
          {
            name: "@mui/material",
            importNames: [
              "Table",
              "Dialog",
              "Tooltip",
              "Button",
              "TextField",
              "Select",
              "Switch",
              "Tab",
              "Tabs",
            ],
            message: "Please import from '@epconnect/mui-components' instead.",
          },
          {
            name: "@mui/material/Table",
            importNames: ["default"],
            message:
              "Please import Table from '@epconnect/mui-components' instead.",
          },
          {
            name: "@mui/material/Dialog",
            importNames: ["default"],
            message:
              "Please import ResponsiveDialog from '@epconnect/mui-components' instead.",
          },
          {
            name: "@mui/material/Tooltip",
            importNames: ["default"],
            message:
              "Please import Tooltip from '@epconnect/mui-components' instead.",
          },
          {
            name: "@mui/material/Button",
            importNames: ["default"],
            message:
              "Please import Button from '@epconnect/mui-components' instead.",
          },
          {
            name: "@mui/material/TextField",
            importNames: ["default"],
            message:
              "Please import TextField from '@epconnect/mui-components' instead.",
          },
          {
            name: "@mui/material/Select",
            importNames: ["default"],
            message:
              "Please import SmartSelector from '@epconnect/mui-components' instead.",
          },
          {
            name: "@mui/material/Switch",
            importNames: ["default"],
            message:
              "Please import SwitchControl from '@epconnect/mui-components' instead.",
          },
          {
            name: "@mui/material/Tab",
            importNames: ["default"],
            message:
              "Please import TabsBar from '@epconnect/mui-components' instead.",
          },
          {
            name: "@mui/material/Tabs",
            importNames: ["default"],
            message:
              "Please import TabsBar from '@epconnect/mui-components' instead.",
          },
        ],
      },
    ],

    // Relax some @typescript-eslint/recommended-type-checked rules
    // Sometimes we use any type implictely, because we don't have the type at all
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-enum-comparison": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",

    // Allow to serialize caught variables like `${err}` (because err would have unknown type by default)
    "@typescript-eslint/restrict-template-expressions": "off",

    // Relax some @typescript-eslint/stylistic rules
    // Allow to use indexed objects
    "@typescript-eslint/consistent-indexed-object-style": "off",
    // Allow to use interfaces and types
    "@typescript-eslint/consistent-type-definitions": "off",
    // Allow to use T[] and Array<T>
    "@typescript-eslint/array-type": "off",
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
        // Lots of tests can have async test callback, for consistency and easy update
        // Allow to have them without await in the callback body, because side effect in tests are minimal
        "@typescript-eslint/require-await": "off",
      },
    },
    // TSOA/Nest Overrides
    {
      files: ["**/controllers/**"],
      rules: {
        // Some annotations helpers must be used but explicitly return any
        // Disable them for those cases
        "@typescript-eslint/no-unsafe-return": "off",
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
