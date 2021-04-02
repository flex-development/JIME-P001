import axiosKapi from '..'
import { request } from '../../axios'

/**
 * @file Integration Tests - axios-kapi
 * @module config/axios-kapi/tests/integration
 */

jest.mock('../../axios')

const mockRequest = request as jest.MockedFunction<typeof request>

describe('integration:config/axios-kapi', () => {
  const baseURL = process.env.API_URL

  it('calls `request`', async () => {
    await axiosKapi()

    expect(mockRequest).toHaveBeenCalledTimes(1)
  })

  it('calls `request` with `process.env.API_URL` as baseURL', async () => {
    await axiosKapi()

    expect(mockRequest).toHaveBeenCalledWith({ baseURL })
  })
})
