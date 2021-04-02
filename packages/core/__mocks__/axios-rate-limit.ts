import rateLimit from 'axios-rate-limit'

/**
 * @file Mock - axios-rate-limit
 * @module mocks/axios-rate-limit
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-node-modules
 * @see https://github.com/aishek/axios-rate-limit
 */

const mockRateLimit = jest.fn(rateLimit)

jest.mock('axios-rate-limit', () => () => mockRateLimit)

export default mockRateLimit
