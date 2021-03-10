const rootConfig = require('../../.eslintrc')

/**
 * @file ESLint Configuration
 * @see https://eslint.org/docs/user-guide/configuring
 */

module.exports = {
  ...rootConfig,
  parserOptions: {
    ...rootConfig.parserOptions,
    project: ['./tsconfig.json', './tsconfig.dev.json', './tsconfig.prod.json']
  },
  overrides: rootConfig.overrides.concat([
    {
      files: ['next.config.js', 'robots-txt.config.js'],
      rules: {
        'tree-shaking/no-side-effects-in-initialization': 0
      }
    }
  ])
}
