const path = require('path')

/**
 * @file Jest Configuration
 * @see {@link https://jestjs.io/docs/en/configuration}
 */

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'identity-obj-proxy',
    '^.+\\.(css|sass|scss|less)$': 'identity-obj-proxy',
    '^@kustomz/(.*)$': '<rootDir>/src/$1'
  },
  prettierPath: path.join(__dirname, '../../node_modules/prettier'),
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    './jest.setup.ts'
  ],
  testPathIgnorePatterns: ['/build/', '/dist/', '/node_modules/'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
    '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true
}
