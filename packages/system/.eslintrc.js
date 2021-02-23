const rootConfig = require('../../.eslintrc')

/**
 * @file ESLint Configuration
 * @see https://eslint.org/docs/user-guide/configuring
 */

module.exports = {
  ...rootConfig,
  parserOptions: {
    ...rootConfig.parserOptions,
    project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.prod.json']
  },
  overrides: rootConfig.overrides.concat([
    {
      files: [
        './src/config/constants.ts',
        './src/lib/**/*.tsx',
        './src/schema/*.ts',
        '*.stories.tsx'
      ],
      rules: {
        'tree-shaking/no-side-effects-in-initialization': 0
      }
    },
    {
      files: ['.storybook/config/viewports'],
      rules: {
        'sort-keys': 0
      }
    }
  ])
}
