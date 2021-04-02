import type { Config } from '@jest/types'
import { jsWithTsESM as preset } from 'ts-jest/presets'
import { pathsToModuleNameMapper } from 'ts-jest/utils'
import { compilerOptions } from './tsconfig.json'

/**
 * @file Jest Base Configuration
 * @see https://jestjs.io/docs/next/configuration
 * @see https://orlandobayo.com/blog/monorepo-testing-using-jest/
 */

const PREFIX = '<rootDir>/'

const config: Config.InitialOptions = {
  ...preset,
  clearMocks: true,
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: PREFIX }),
    '^@mdx\\-js/react$': `${PREFIX}node_modules/@mdx-js/react/dist/cjs`,
    '^react\\-hanger/(.*)$': `${PREFIX}node_modules/react-hanger/$1`,
    '^react\\-use/(.*)$': `${PREFIX}node_modules/react-use/lib/$1`
  },
  rootDir: '../..',
  roots: [PREFIX.slice(0, PREFIX.length - 1)],
  testPathIgnorePatterns: [
    '__mocks__/',
    '__tests__/__fixtures__/',
    '__tests__/setup.ts',
    '__tests__/utils.(ts|tsx)',
    'dist/',
    'node_modules/',
    'public/',
    '(.*).d.ts'
  ],
  verbose: true
}

export default config
