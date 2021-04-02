import subject from '..'
import type { ErrorJSON } from '../../../types/errors'
import ERROR_NO_RESPONSE from './__fixtures__/error-no-response'
import ERROR_WITH_STATUS_CODE from './__fixtures__/error-with-status-code'

/**
 * @file Unit Tests - onRejected
 * @module utils/onRejected/tests/unit
 */

jest.mock('http')

describe('unit:utils/onRejected', () => {
  it('exports default function', () => {
    expect(typeof subject === 'function').toBeTruthy()
  })

  it('throws error json object from axios error with status code', () => {
    let ejson = {} as ErrorJSON

    try {
      subject(ERROR_WITH_STATUS_CODE)
    } catch (err) {
      ejson = err
    }

    expect(ejson.code).toBe(ERROR_WITH_STATUS_CODE.response?.status)
    expect(ejson.data.isAxiosError).toBeTruthy()
    expect(ejson.message).toBe(ERROR_WITH_STATUS_CODE.message)
  })

  it('throws error json object from axios error without response', () => {
    let ejson = {} as ErrorJSON

    try {
      subject(ERROR_NO_RESPONSE)
    } catch (err) {
      ejson = err
    }

    expect(ejson.code).toBe(500)
    expect(ejson.data.isAxiosError).toBeTruthy()
    expect(ejson.data.$message).toBe(ERROR_NO_RESPONSE.message)
    expect(ejson.message).toBe('No response received.')
  })
})
