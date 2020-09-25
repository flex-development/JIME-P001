/**
 * @file Jest Configuration
 * @see {@link https://jestjs.io/docs/en/configuration}
 */

/* eslint-disable prettier/prettier */

const media =
  '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$'

/* eslint-enable prettier/prettier */

const stylesheets = '^.+\\.(css|sass|scss|less)$'

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    [media]: 'identity-obj-proxy',
    [stylesheets]: 'identity-obj-proxy'
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    'jest.setup.ts'
  ],
  testMatch: ['__tests__/*.spec.ts'],
  testPathIgnorePatterns: ['/build/', '/dist/', '/node_modules/'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
    '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true
}
