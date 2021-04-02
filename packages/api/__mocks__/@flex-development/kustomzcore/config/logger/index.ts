import createLogger from '@flex-development/kustomzcore/config/logger'

/**
 * @file Mock - @flex-development/kustomzcore/config/logger
 * @module mocks/flex-development/kustomzcore/config/logger
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-node-modules
 */

const actual = jest.requireActual('@flex-development/kustomzcore/config/logger')

const mock = jest.fn(createLogger).mockReturnValue({
  ...actual.default(),
  debug: jest.fn(),
  error: jest.fn(),
  fatal: jest.fn(),
  log: jest.fn(),
  trace: jest.fn(),
  warn: jest.fn()
})

jest.mock('@flex-development/kustomzcore/config/logger', () => mock)

export default mock
