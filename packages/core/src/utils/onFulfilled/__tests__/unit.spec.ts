import type { AxiosResponse } from 'axios'
import subject from '..'
import type { EmptyObject } from '../../../types/utils'

/**
 * @file Unit Tests - onFulfilled
 * @module utils/onFulfilled/tests/unit
 */

describe('unit:utils/onFulfilled', () => {
  it('exports default function', () => {
    expect(typeof subject === 'function').toBeTruthy()
  })

  it('returns the response data', () => {
    const response: AxiosResponse<EmptyObject> = {
      config: {},
      data: {},
      headers: {},
      status: 200,
      statusText: 'OK'
    }

    expect(subject(response)).toMatchObject(response.data)
  })
})
