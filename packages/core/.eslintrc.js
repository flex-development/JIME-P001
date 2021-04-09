const rootConfig = require('../../.eslintrc')

/**
 * @file ESLint Configuration
 * @see https://eslint.org/docs/user-guide/configuring
 */

module.exports = {
  ...rootConfig,
  parserOptions: {
    ...rootConfig.parserOptions,
    project: ['./tsconfig.json', './tsconfig.prod.json'],
    tsconfigRootDir: __dirname
  },
  overrides: rootConfig.overrides.concat([
    {
      files: ['src/config/**', 'src/models/CreateReviewDTO/index.ts'],
      rules: {
        'tree-shaking/no-side-effects-in-initialization': 0
      }
    }
  ])
}
