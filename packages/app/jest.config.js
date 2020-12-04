const path = require('path')

/**
 * @file Jest Configuration
 * @see https://jestjs.io/docs/en/configuration
 */

module.exports = {
  globals: {
    'ts-jest': {
      babelConfig: '<rootDir>/babel.config.js',
      tsconfig: '<rootDir>/tsconfig.dev.json'
    }
  },
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/$1',
    '^@app-tests/(.*)$': '<rootDir>/__tests__/$1',
    '^@subdomains/(.*)$': '<rootDir>/src/subdomains/$1'
  },
  prettierPath: path.join(__dirname, '../../node_modules/prettier'),
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['__mocks__', '.next/', 'node_modules/', '(.*).d.ts'],
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest'
  },
  verbose: true
}
