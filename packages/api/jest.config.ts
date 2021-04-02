import type { Config } from '@jest/types'
import baseConfig from '../../jest.config.base'
import pkg from './package.json'

/**
 * @file Jest Project Configuration
 * @see https://jestjs.io/docs/next/configuration
 * @see https://orlandobayo.com/blog/monorepo-testing-using-jest/
 */

const ROOT = `<rootDir>/${pkg.repository.directory}`

const config: Config.InitialOptions = {
  ...baseConfig,
  displayName: pkg.name.split('@flex-development/')[1],
  globals: {
    'ts-jest': {
      babelConfig: '<rootDir>/babel.config.json',
      tsconfig: `${ROOT}/tsconfig.test.json`
    }
  },
  modulePathIgnorePatterns: ['<rootDir>/packages/core/package.json'],
  roots: (baseConfig.roots as string[]).concat([ROOT]),
  setupFilesAfterEnv: [`${ROOT}/__tests__/setup.ts`],
  testEnvironment: 'node',
  testMatch: [
    `${ROOT}/__tests__/integration/**/*.spec.ts`,
    `${ROOT}/api/**/__tests__/*.spec.ts`,
    `${ROOT}/lib/**/__tests__/*.spec.ts`
  ]
}

export default config
