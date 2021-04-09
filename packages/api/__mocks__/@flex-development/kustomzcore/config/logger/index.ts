import createLogger from '@flex-development/kustomzcore/config/logger'

/**
 * @file Mock - @flex-development/kustomzcore/config/logger
 * @module mocks/flex-development/kustomzcore/config/logger
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-node-modules
 */

const moduleName = '@flex-development/kustomzcore/config/logger'

export default jest.fn(createLogger).mockReturnValue({
  ...jest.requireActual(moduleName).default(),
  debug: jest.fn(),
  error: jest.fn(),
  fatal: jest.fn(),
  log: jest.fn(),
  trace: jest.fn(),
  warn: jest.fn()
})
