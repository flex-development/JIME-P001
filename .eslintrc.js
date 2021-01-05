/**
 * @file ESLint Configuration
 * @module eslint-config
 * @see https://eslint.org/docs/user-guide/configuring
 */

const EXTENDS_CONFIG = [
  'eslint:recommended',
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:react/recommended',
  'plugin:jsx-a11y/recommended',
  'plugin:prettier/recommended',
  'prettier/@typescript-eslint',
  'prettier/react'
]

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: EXTENDS_CONFIG,
  globals: {
    loadCSS: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true
    },
    ecmaVersion: 2020,
    project: ['./tsconfig.json', './packages/**/tsconfig.json'],
    sourceType: 'module'
  },
  plugins: ['react-hooks'],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/ban-types': 1,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        multiline: {
          delimiter: 'none',
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-useless-constructor': 1,
    eqeqeq: 1,
    'jsx-a11y/accessible-emoji': 0,
    'jsx-a11y/anchor-is-valid': [
      1,
      {
        components: ['Link'],
        specialLink: ['kind', 'overrideParams', 'story', 'to']
      }
    ],
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        controlComponents: ['Input'],
        depth: 3,
        labelAttributes: ['label'],
        labelComponents: ['Label']
      }
    ],
    'no-ex-assign': 0,
    'prefer-arrow-callback': 2,
    'prettier/prettier': [
      2,
      {
        usePrettierrc: true
      }
    ],
    'react/display-name': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx']
      }
    ],
    'react/jsx-fragments': 0,
    'react/jsx-uses-react': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/self-closing-comp': 1,
    'react-hooks/exhaustive-deps': 2,
    'react-hooks/rules-of-hooks': 1,
    'sort-keys': [
      1,
      'asc',
      {
        caseSensitive: true,
        minKeys: 2,
        natural: true
      }
    ],
    'space-before-function-paren': [
      2,
      {
        anonymous: 'never',
        asyncArrow: 'always',
        named: 'never'
      }
    ]
  },
  overrides: [
    {
      files: ['**/__tests__/**', '*.spec.ts', '*.spec.tsx'],
      env: {
        es6: true,
        'jest/globals': true,
        node: true
      },
      extends: EXTENDS_CONFIG.splice(1, 0, 'plugin:jest/recommended'),
      rules: {
        'jest/no-mocks-import': 0
      }
    },
    {
      files: ['**/*.js'],
      parser: 'babel-eslint',
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-var-requires': 0,
        'require-jsdoc': 1,
        'valid-jsdoc': 2
      }
    },
    {
      files: ['**/.eslintrc.js', '**/webpack.*.js'],
      rules: {
        'sort-keys': 0
      }
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        'prettier/prettier': 0
      }
    }
  ],
  settings: {
    react: {
      version: 'detect'
    }
  }
}
