import isPlainObject from 'lodash/isPlainObject'
import subject from '..'
import { ErrorClassName, ErrorStatusCode } from '../../../types/errors'
import NOT_FOUND_ERROR from './__fixtures__/not-found-error'

/**
 * @file Unit Tests - createError
 * @module utils/createError/tests/unit
 */

describe('unit:utils/createError', () => {
  it('exports default function', () => {
    expect(typeof subject === 'function').toBeTruthy()
  })

  it('creates GeneralError by default', () => {
    const result = subject()

    // Expect result properties to match GeneralError properties
    expect(result.className).toBe(ErrorClassName.GeneralError)
    expect(result.code).toBe(ErrorStatusCode.GeneralError)
    expect(isPlainObject(result.data)).toBeTruthy()
    expect(result.message).toMatch('Unknown error')
    expect(result.name).toMatch('GeneralError')

    // Expect that string was converted to Error object
    expect(result.data.name).toBe('Error')
  })

  it('only merges error data if args[0] is an error json object', () => {
    const data = { test: true }

    const result = subject(NOT_FOUND_ERROR, data)

    // Check that defaults were not be used
    expect(result.className).toBe(NOT_FOUND_ERROR.className)
    expect(result.code).toBe(NOT_FOUND_ERROR.code)
    expect(result.name).toBe(NOT_FOUND_ERROR.name)

    // Check if data was merged
    expect(result.data).toMatchObject(data)
  })
})
