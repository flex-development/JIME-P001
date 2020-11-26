const path = require('path')

/**
 * @file Jest Configuration
 * @see https://jestjs.io/docs/en/configuration
 */

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'identity-obj-proxy',
    '^.+\\.(css|sass|scss|less)$': 'identity-obj-proxy',
    '^@app/(.*)$': '<rootDir>/../app/src/$1',
    '^@app-mocks/(.*)$': '<rootDir>/../app/__tests__/__mocks__/$1',
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
    '^.+\\.[tj]sx?$': 'babel-jest'
  },
  verbose: true
}
