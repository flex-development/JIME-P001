const rootConfig = require('../../.eslintrc')

/**
 * @file ESLint Configuration
 * @see https://eslint.org/docs/user-guide/configuring
 */

module.exports = {
  ...rootConfig,
  parserOptions: {
    ...rootConfig.parserOptions,
    project: ['./tsconfig.json', './tsconfig.test.json']
  },
  overrides: rootConfig.overrides.concat([
    {
      files: ['lib/mixins/ShopifyAPI/__tests__/__fixtures__/menus.ts'],
      rules: {
        'sort-keys': 0
      }
    },
    {
      files: ['./**'],
      rules: {
        'tree-shaking/no-side-effects-in-initialization': 0
      }
    }
  ])
}
