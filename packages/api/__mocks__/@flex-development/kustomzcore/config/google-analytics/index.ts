import * as ga from '@flex-development/kustomzcore/config/google-analytics'

/**
 * @file Mock - @flex-development/kustomzcore/config/google-analytics
 * @module mocks/flex-development/kustomzcore/config/google-analytics
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-node-modules
 */

const name = '@flex-development/kustomzcore/config/google-analytics'

export const initializeAnalytics = jest.fn(ga.initializeAnalytics)

export default { ...jest.createMockFromModule<typeof ga>(name).default }
