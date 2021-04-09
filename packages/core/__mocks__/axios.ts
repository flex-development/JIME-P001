import axios from 'axios'

/**
 * @file Mock - axios
 * @module mocks/axios
 * @see https://jestjs.io/docs/next/manual-mocks#mocking-node-modules
 * @see https://github.com/axios/axios
 */

export default (() => {
  const mockAxios = (jest.fn() as unknown) as typeof axios
  const mockInterceptor = { eject: jest.fn(), use: jest.fn() }

  mockAxios.create = jest.fn()

  mockAxios.interceptors = {
    request: mockInterceptor,
    response: mockInterceptor
  }

  return mockAxios
})()
