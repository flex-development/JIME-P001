const path = require('path')

/**
 * @file Jest Configuration
 * @see {@link https://jestjs.io/docs/en/configuration}
 */

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  prettierPath: path.join(__dirname, '../../node_modules/prettier'),
  setupFilesAfterEnv: [],
  testPathIgnorePatterns: ['.next/', 'node_modules/', '(.*).d.ts'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true
}
