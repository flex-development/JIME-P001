/**
 * @file ESLint Configuration
 * @module eslint-config
 * @see https://eslint.org/docs/user-guide/configuring
 */

module.exports = {
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true
    },
    ecmaVersion: 2020,
    project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.prod.json'],
    sourceType: 'module'
  },
  rules: {
    'tree-shaking/no-side-effects-in-initialization': 1
  },
  overrides: [
    {
      files: [
        './scripts/*',
        '.eslintrc.js',
        'babel.*',
        'jest.*',
        'webpack.*',
        '*.spec.ts',
        '*.spec.tsx',
        '*.stories.tsx'
      ],
      rules: {
        'tree-shaking/no-side-effects-in-initialization': 0
      }
    }
  ]
}
