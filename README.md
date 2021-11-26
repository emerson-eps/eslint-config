# Shared ESLint Config

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/emerson-eps/eslint-config/Node.js%20CI)](https://github.com/emerson-eps/eslint-config/actions)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/emerson-eps/eslint-config/blob/main/LICENSE)
[![npm (scoped)](https://img.shields.io/npm/v/@emerson-eps/eslint-config)](https://www.npmjs.com/package/@emerson-eps/eslint-config)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

This is the home of the shared E&P Software ESLint configs. The default config should be used for all React Typescript projects in E&P Software.

## Usage

The ESLint config and Prettier config must both be added to get the full shared configuration. The ESLint configuration includes the prettier plugin which will load the prettier config and report issues as errors.

### (1) Install the shared Prettier and ESLint configs

```bash
npm install --save-dev @emerson-eps/prettier-config @emerson-eps/eslint-config
```

If you have not already installed `prettier` and `eslint` install those as well:

```bash
npm install --save-dev prettier eslint
```

### (2) Configure Prettier

Add `@emerson-eps/prettier-config` to your `package.json`:

```json
{
  "prettier": "@emerson-eps/prettier-config"
}
```

For more advanced setups, including how to override settings, see the instructions in the [@emerson-eps/prettier-config](https://github.com/emerson-eps/prettier-config) repository.

### (3) Configure ESLint

Specify the package in the [`extends`](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) section of your [ESLint configuration](http://eslint.org/docs/user-guide/configuring):

```js
{
  "extends": "@emerson-eps/eslint-config",
  "rules": {
    // Additional rules...
  }
}
```

### List of current rules

The list of applied rules can be found [here](./config.json)

## Running ESLint on your code

Add a lint script to your `package.json`, for example:

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

Code can then be linted with:

```sh
npm run lint
```

CI pipelines should be configured to fail on linting warnings.

## Integration with Visual Studio Code

If not already installed, install the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extensions.

## Overriding the shared configs

Try not to override the shared configs unless you really need to. If you must override them please consider proposing the override as a change to the relevant repository first to avoid divergence of code styles in different projects.
