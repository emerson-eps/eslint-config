import pluginCypress from "eslint-plugin-cypress";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { flatConfigs as importConfigs } from "eslint-plugin-import-x";
// enable jsdoc later
// import jsdoc from "eslint-plugin-jsdoc";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import { default as reactHooksPlugin } from "eslint-plugin-react-hooks";
import { configs as sonarjsConfigs } from "eslint-plugin-sonarjs";
import { configs as tsConfigs } from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

import testingLibrary from "eslint-plugin-testing-library";

export default defineConfig([
  globalIgnores(["build", "coverage", "dist", "doc", "node_modules", "tmp"]),
  eslint.configs.recommended,
  tsConfigs.recommended,
  eslintConfigPrettier,
  // enable jsdoc later
  // jsdoc.configs["flat/recommended"],
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  //reactHooks.configs['recommended-latest'],
  importConfigs.recommended,
  jsxA11y.flatConfigs.recommended,
  sonarjsConfigs.recommended,
  {
    files: ["**/*.ts?(x)"],
    plugins: {
      "react-hooks": reactHooksPlugin,
    },
    extends: [importConfigs.recommended, importConfigs.typescript],

    settings: {
      react: { version: "detect" },
      "import-x/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {
      // To replace
      // //extends: ["react-hooks/recommended"],
      // which does not work with flat config yet
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",

      // enable jsdoc rules later
      // "jsdoc/check-alignment": "warn",
      // "jsdoc/check-indentation": "warn",
      // "jsdoc/newline-after-description": "warn",
      // "jsdoc/require-description": "warn",
      // "jsdoc/check-values": "warn",

      // some sonarjs rules are too strict
      "sonarjs/todo-tag": "off",
      "sonarjs/fixme-tag": "off",
      "sonarjs/no-nested-functions": ["warn", { threshold: 5 }],
      "sonarjs/no-os-command-from-path": "off",

      curly: "warn",

      "import-x/first": "warn",

      "import-x/order": [
        "warn",
        {
          groups: ["builtin", "external"],
          pathGroups: [
            { pattern: "@epconnect/**", group: "external", position: "after" },
          ],

          "newlines-between": "always-and-inside-groups",
        },
      ],

      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-restricted-types": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "error",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

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
              message:
                "Please import from '@epconnect/mui-components' instead.",
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
    },
  },
  {
    files: ["**/*.ts?(x)"],
    rules: { "react/prop-types": "off" },
  },
  {
    files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    ...testingLibrary.configs["flat/react"],
    rules: { "@typescript-eslint/no-non-null-assertion": "off" },
  },
  {
    files: ["**/*.stories.{j,t}s?(x)"],
    rules: { "import-x/no-anonymous-default-export": "off" },
  },
  {
    files: ["cypress/**/*.{j,t}s?(x)"],
    plugins: { 
      cypress: pluginCypress 
    },
    extends: [
      pluginCypress.configs.recommended
    ],
    rules: {
      "sonarjs/no-duplicate-string": "off",
      "sonarjs/cognitive-complexity": ["warn", 20],
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
]);
