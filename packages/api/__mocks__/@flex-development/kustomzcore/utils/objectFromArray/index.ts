import ofa from '@flex-development/kustomzcore/utils/objectFromArray'

/**
 * @file Mock - @flex-development/kustomzcore/utils/objectFromArray
 * @module mocks/flex-development/kustomzcore/utils/objectFromArray
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-node-modules
 */

const mock = jest.fn(ofa)

jest.mock('@flex-development/kustomzcore/utils/objectFromArray', () => mock)

export default mock
