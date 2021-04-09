import { request as $request } from '@flex-development/kustomzcore/config/axios'

/**
 * @file Mock - @flex-development/kustomzcore/config/axios
 * @module mocks/flex-development/kustomzcore/config/axios
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-node-modules
 * @see https://github.com/axios/axios
 */

export const request = jest.fn($request)

export default (() => {
  const mockInterceptor = { eject: jest.fn(), use: jest.fn() }

  return {
    interceptors: { request: mockInterceptor, response: mockInterceptor }
  }
})()
