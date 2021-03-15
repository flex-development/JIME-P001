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
        'src/hooks/useSanitizedProps/useSanitizedProps.tsx',
        'src/lib/**/*.props.ts',
        'src/types/props.ts'
      ],
      rules: {
        'jsdoc/check-indentation': 0
      }
    },
    {
      // Storybook Docs doesn't properly format JSDoc comments
      files: ['src/lib/**/*.tsx'],
      rules: {
        'jsdoc/require-param': 0,
        'jsdoc/require-returns': 0
      }
    },
    {
      files: ['.storybook/config/viewports'],
      rules: {
        'sort-keys': 0
      }
    },
    {
      files: [
        'src/config/constants.ts',
        'src/hooks/useCart/useCart.ts',
        'src/lib/**/*.tsx',
        'src/schema/*.ts',
        '*.stories.tsx'
      ],
      rules: {
        'tree-shaking/no-side-effects-in-initialization': 0
      }
    }
  ])
}
