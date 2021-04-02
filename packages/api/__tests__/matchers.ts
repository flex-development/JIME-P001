import type { AnyObject, ANYTHING, NullishNumber } from '@flex-development/json'
import M from 'expect/build/matchers'
import isPlainObject from 'lodash/isPlainObject'
import type { Response } from 'supertest'

/**
 * @file Custom Matchers
 * @module tests/matchers
 * @see https://jestjs.io/docs/expect#expectextendmatchers
 */

/**
 * Expects {@param received} to be an array.
 *
 * @param {ANYTHING[]} received - Test value
 * @param {jest.ToBeArrayOptions} [options] - Options object
 * @param {number} [options.length] - Expected array length
 * @return {jest.CustomMatcherResult} Custom matcher result
 */
export const toBeArray = (
  received: unknown,
  options: jest.ToBeArrayOptions = {}
): jest.CustomMatcherResult => {
  const { length = null } = options

  const arrayToBe = `array ${length === null ? '' : `with ${length} items`}`

  const fail: jest.CustomMatcherResult = {
    message: () => `Expected: received value to be an ${arrayToBe}`,
    pass: false
  }

  const pass: jest.CustomMatcherResult = {
    message: () => fail.message().replace('be', 'not be'),
    pass: true
  }

  // @ts-expect-error matcher must not have an expected argument
  const { pass: isArray } = M.toBeTruthy(Array.isArray(received)) as AnyObject

  const arr = received as ANYTHING[]
  const valid = length === null ? isArray : isArray && arr.length === length

  return valid ? pass : fail
}

/**
 * Expects {@param received} to be a `supertest.Response` object with a
 * `content-type` header value that matches `/json/`.
 *
 * @param {Response} received - `supertest.Response`  object
 * @param {jest.ToBeJSONResponseOptions} [options] - Additional test options
 * @param {jest.ToBeArrayOptions} [options.array] - Expect body to be array
 * @param {jest.ToBePlainObjectOptions} [options.obj] - Expect body to be object
 * @param {number} [options.status] - If response has specified status
 * @return {jest.CustomMatcherResult} Custom matcher result
 */
export const toBeJSONResponse = (
  received: unknown,
  options: jest.ToBeJSONResponseOptions
): jest.CustomMatcherResult => {
  const { array, obj, status } = options

  const fail: jest.CustomMatcherResult = {
    message: () => 'Expected: received to be json response',
    pass: false
  }

  const pass: jest.CustomMatcherResult = {
    message: () => fail.message().replace('be', 'not be'),
    pass: true
  }

  const response = received as Response

  let passes = toHaveContentType(response.headers).pass

  if (array) passes = toBeArray(response.body, array === true ? {} : array).pass
  if (obj) passes = toBePlainObject(response.body, obj === true ? {} : obj).pass
  if (status) passes = toHaveStatus(response, status).pass

  return passes ? pass : fail
}

/**
 * Expects {@param received} to be a plain object.
 *
 * @param {AnyObject} received - Test value
 * @param {jest.ToBePlainObjectOptions} [options] - Additional test options
 * @param {string} [options.keys] - Comma-separated list of expected keys
 * @param {number} [options.length] - Expected number of keys
 * @return {jest.CustomMatcherResult} Custom matcher result
 */
export const toBePlainObject = (
  received: unknown,
  options: jest.ToBePlainObjectOptions = {}
): jest.CustomMatcherResult => {
  const { keys = null, keys_length = null } = options

  let toBe = `${keys === null ? '' : ` with keys ${keys}`}`
  toBe = keys_length === null ? toBe : ` and ${keys_length} number of keys`

  const fail: jest.CustomMatcherResult = {
    message: () => `Expected: received to be a plain object${toBe}`,
    pass: false
  }

  const pass: jest.CustomMatcherResult = {
    message: () => fail.message().replace('be', 'not be'),
    pass: true
  }

  // @ts-expect-error matcher must not have an expected argument
  let passes = (M.toBeTruthy(isPlainObject(received)) as AnyObject).pass

  if (keys) passes = toHaveKeys(received, keys).pass
  if (keys_length) passes = toHaveKeysLength(received, keys_length)

  return passes ? pass : fail
}

/**
 * Expects {@param received} to be an array where each object has the fields
 * listed in {@param keys}, a comma-separated list of expected property names.
 *
 * @param {AnyObject[]} received - Test value
 * @param {string} keys - Expected property names
 * @return {jest.CustomMatcherResult} Custom matcher result
 */
export const toEachHaveKeys = (
  received: unknown,
  keys: string
): jest.CustomMatcherResult => {
  const keysarr = keys.split(',')

  const fail: jest.CustomMatcherResult = {
    message: () => `Expected: each object to have keys ${keysarr}`,
    pass: false
  }

  const pass: jest.CustomMatcherResult = {
    message: () => fail.message().replace('have', 'not have'),
    pass: true
  }

  if (!Array.isArray(received)) return fail

  const results: boolean[] = []
  const receivedarr = received as AnyObject[]

  receivedarr.forEach(o => results.push(toHaveKeys(o, keys).pass))

  return results.includes(false) ? fail : pass
}

/**
 * Expects {@param received} to be an array where each object has {@param keys}
 * number of keys.
 *
 * @param {AnyObject[]} received - Test value
 * @param {number} keys - Expected number of keys for each object
 * @return {jest.CustomMatcherResult} Custom matcher result
 */
export const toEachHaveKeysLength = (
  received: unknown,
  keys: number
): jest.CustomMatcherResult => {
  const fail: jest.CustomMatcherResult = {
    message: () => `Expected: each object to have ${keys} number of keys`,
    pass: false
  }

  const pass: jest.CustomMatcherResult = {
    message: () => fail.message().replace('have', 'not have'),
    pass: true
  }

  if (!Array.isArray(received)) return fail

  const results: boolean[] = []
  const receivedarr = received as AnyObject[]

  receivedarr.forEach(o => results.push(toHaveKeysLength(o, keys).pass))

  return results.includes(false) ? fail : pass
}

/**
 * Expects {@param received} to be a `supertest.Response` headers object with a
 * `content-type` property that matches {@param expected}.
 *
 * @param {AnyObject} received - `supertest.Response` headers object
 * @param {RegExp | string} [expected] - Expected Content-Type header
 * @return {jest.CustomMatcherResult} Custom matcher result
 */
export const toHaveContentType = (
  received: unknown,
  expected: RegExp | string = /json/
): jest.CustomMatcherResult => {
  const fail: jest.CustomMatcherResult = {
    message: () => 'Expected: Content-Type header to match /json/',
    pass: false
  }

  const pass: jest.CustomMatcherResult = {
    message: () => fail.message().replace('match', 'not match'),
    pass: true
  }

  const hasContentType = () => {
    if (!received) return false

    const headers = received as Response['headers']
    const type = headers['content-type'] || headers['Content-Type']

    return type ? (M.toMatch(type, expected) as AnyObject).pass : false
  }

  return hasContentType() ? pass : fail
}

/**
 * Expects {@param received} to have the fields listed in {@param keys}, a
 * comma-separated list of expected fields.
 *
 * @param {AnyObject} received - Test value
 * @param {string} keys - Expected fields
 * @return {jest.CustomMatcherResult} Custom matcher result
 */
export const toHaveKeys = (
  received: unknown,
  keys: string
): jest.CustomMatcherResult => {
  const keysarr = keys.split(',').sort()

  const fail: jest.CustomMatcherResult = {
    message: () => `Expected: received value to have keys [${keysarr}]`,
    pass: false
  }

  const pass: jest.CustomMatcherResult = {
    message: () => fail.message().replace('have', 'not have'),
    pass: true
  }

  if (!toBePlainObject(received).pass) return fail

  const received_fields = Object.keys(received as AnyObject)

  return keysarr.every(field => received_fields.includes(field)) ? pass : fail
}

/**
 * Expects {@param received} to {@param keys} number of keys.
 *
 * @param {AnyObject} received - Test value
 * @param {number} keys - Expected number of keys
 * @return {jest.CustomMatcherResult} Custom matcher result
 */
export const toHaveKeysLength = (
  received: unknown,
  keys: number
): jest.CustomMatcherResult => {
  const fail: jest.CustomMatcherResult = {
    message: () => `Expected: object to have ${keys} number of keys`,
    pass: false
  }

  const pass: jest.CustomMatcherResult = {
    message: () => fail.message().replace('have', 'not have'),
    pass: true
  }

  if (!toBePlainObject(received).pass) return fail

  return Object.keys(received as AnyObject).length === keys ? pass : fail
}

/**
 * Expects {@param received} to be a `supertest.Response` where the status is a
 * HTTP status, {@param expected}.
 *
 * @param {ANYTHING} received - `supertest.Response` object
 * @param {NullishNumber} expected - Expected HTTP status
 * @return {jest.CustomMatcherResult} Custom matcher result
 */
export const toHaveStatus = (
  received: unknown,
  expected: NullishNumber
): jest.CustomMatcherResult => {
  const fail: jest.CustomMatcherResult = {
    message: () => `Expected: status to be ${expected}`,
    pass: false
  }

  const pass: jest.CustomMatcherResult = {
    message: () => fail.message().replace('be', 'not be'),
    pass: true
  }

  const hasStatus = () => {
    if (!received) return false

    const response = received as Response

    return (M.toBe(response.status, expected) as AnyObject).pass
  }

  return hasStatus() ? pass : fail
}
