const { jsWithTsESM: preset } = require('ts-jest/presets')
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('../../tsconfig.json')

/**
 * @file Jest Configuration
 * @see https://jestjs.io/docs/en/configuration
 */

const prefix = '<rootDir>/../../'

module.exports = {
  ...preset,
  globals: {
    animated: {
      a: 'a',
      aside: 'aside',
      button: 'button',
      details: 'details',
      dialog: 'dialog',
      div: 'div',
      footer: 'footer',
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      header: 'header',
      img: 'img',
      input: 'input',
      label: 'label',
      li: 'li',
      main: 'main',
      nav: 'nav',
      ol: 'ol',
      option: 'option',
      p: 'p',
      section: 'section',
      select: 'select',
      span: 'span',
      summary: 'summary',
      textarea: 'textarea',
      ul: 'ul'
    },
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json'
    }
  },
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix }),
    '^@mdx\\-js/react$': `${prefix}node_modules/@mdx-js/react/dist/cjs`,
    '^react\\-hanger/(.*)$': `${prefix}node_modules/react-hanger/$1`,
    '^react\\-use/(.*)$': `${prefix}node_modules/react-use/lib/$1`
  },
  prettierPath: `${prefix}node_modules/prettier`,
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '__tests__/__fixtures__/',
    '__tests__/__mocks__/',
    '__tests__/utils.tsx',
    '__tests__/setup.ts',
    'dist/',
    'node_modules/',
    'public/',
    '(.*).d.ts'
  ],
  verbose: true
}
