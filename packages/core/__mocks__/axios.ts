import type axios from 'axios'

/**
 * @file Mock - axios
 * @module mocks/axios
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-node-modules
 * @see https://github.com/axios/axios
 */

export default jest.createMockFromModule<typeof axios>('axios')
