# eslint-config changelog

## v1.0.0

### Summary

The initial configuration is mostly based on the ui-components ESLint setup (excluding [eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs) which may be added later) with a small number of additions:

- Added [eslint-config-react-app](https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/index.js) from create-react-app to ensure we are at least as strict
- Added [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to disable rules conflicting with prettier
- A small number of agreed overrides, for example [no-console](https://eslint.org/docs/rules/no-console)
