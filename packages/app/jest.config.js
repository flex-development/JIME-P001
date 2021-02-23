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
    'ts-jest': {
      babelConfig: '<rootDir>/babel.config.js',
      tsconfig: '<rootDir>/tsconfig.test.json'
    }
  },
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix }),
    '^react\\-hanger/(.*)$': `${prefix}node_modules/react-hanger/$1`,
    '^react\\-use/(.*)$': `${prefix}node_modules/react-use/lib/$1`
  },
  prettierPath: `${prefix}node_modules/prettier`,
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '__tests__/__fixtures__/',
    '__tests__/__mocks__/',
    '__tests__/setup.ts',
    '.next/',
    'node_modules/',
    'public/',
    '(.*).d.ts'
  ],
  verbose: true
}
