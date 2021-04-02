import subject from '..'
import mockCreateError from '../../createError'
import ERROR_WITH_STATUS_CODE from './__fixtures__/error-with-status-code'

/**
 * @file Integration Tests - onRejected
 * @module utils/onRejected/tests/integration
 */

jest.mock('../../createError')

describe('integration:utils/onRejected', () => {
  it('calls `createError` utility function', () => {
    expect(() => subject(ERROR_WITH_STATUS_CODE)).toThrow()

    expect(mockCreateError).toHaveBeenCalledTimes(1)
  })
})
