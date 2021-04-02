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
      tsconfig: `${ROOT}/tsconfig.test.json`
    }
  },
  roots: (baseConfig.roots as string[]).concat([ROOT]),
  setupFilesAfterEnv: [`${ROOT}/__tests__/setup.ts`],
  testEnvironment: 'jsdom',
  testMatch: [`${ROOT}/**/*.spec.ts?(x)`, `${ROOT}/**/__tests__/*.spec.ts?(x)`]
}

export default config
