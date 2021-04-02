import createError from '@flex-development/kustomzcore/utils/createError'

/**
 * @file Mock - @flex-development/kustomzcore/utils/createError
 * @module mocks/flex-development/kustomzcore/utils/createError
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-node-modules
 */

const mock = jest.fn(createError)

jest.mock('@flex-development/kustomzcore/utils/createError', () => mock)

export default mock
