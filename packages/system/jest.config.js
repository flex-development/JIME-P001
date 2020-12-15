const path = require('path')
const { animated } = require('react-spring')

/**
 * @file Jest Configuration
 * @see https://jestjs.io/docs/en/configuration
 */

module.exports = {
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
      babelConfig: '<rootDir>/babel.config.js',
      tsconfig: '<rootDir>/tsconfig.json'
    }
  },
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'identity-obj-proxy',
    '^.+\\.(css|sass|scss|less)$': 'identity-obj-proxy',
    '^@app-mocks/(.*)$': '<rootDir>/../app/__mocks__/$1',
    '^@system/(.*)$': '<rootDir>/src/$1',
    '^@system-mocks/(.*)$': '<rootDir>/__tests__/__mocks__/$1'
  },
  prettierPath: path.join(__dirname, '../../node_modules/prettier'),
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    './jest.setup.ts'
  ],
  testPathIgnorePatterns: [
    'build/',
    'dist/',
    'node_modules/',
    '__tests__/__mocks__/',
    '(.*).d.ts'
  ],
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest'
  },
  verbose: true
}
