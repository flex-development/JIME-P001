const path = require('path')

/**
 * @file Jest Configuration
 * @see https://jestjs.io/docs/en/configuration
 */

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1',
    '^@app-tests/(.*)$': '<rootDir>/__tests__/$1'
  },
  prettierPath: path.join(__dirname, '../../node_modules/prettier'),
  setupFilesAfterEnv: [],
  testPathIgnorePatterns: [
    '.next/',
    'node_modules/',
    '__tests__/__mocks__/',
    '(.*).d.ts'
  ],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest'
  },
  verbose: true
}
