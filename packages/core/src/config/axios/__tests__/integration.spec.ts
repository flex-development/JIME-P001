import axios from 'axios'

/**
 * @file Integration Tests - axios
 * @module config/axios/tests/integration
 */

const mockInterceptors = {
  response: axios.interceptors.response as jest.Mocked<
    typeof axios.interceptors.response
  >
}

describe('integration:config/axios', () => {
  describe('response interceptors', () => {
    it('calls `axios.interceptors.response.use`', async () => {
      await import('..')

      const { 0: first_call } = mockInterceptors.response.use.mock.calls

      expect(mockInterceptors.response.use).toBeCalledTimes(1)

      expect(first_call[0]?.name as string).toBe('onFulfilled')
      expect(first_call[1]?.name as string).toBe('onRejected')
    })
  })
})
