import type { Config } from '@jest/types'
import omit from 'lodash/omit'
import baseConfig from './jest.config.base'

/**
 * @file Jest Root Configuration
 * @see https://jestjs.io/docs/next/configuration
 * @see https://orlandobayo.com/blog/monorepo-testing-using-jest/
 */

const config: Config.InitialOptions = {
  ...omit(baseConfig, ['rootDir']),
  prettierPath: '<rootDir>/node_modules/prettier',
  projects: ['<rootDir>/packages/*/jest.config.ts']
}

export default config
