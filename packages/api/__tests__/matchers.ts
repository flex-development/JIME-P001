import type { AnyObject, ANYTHING, NullishNumber } from '@flex-development/json'
import { toBeArray, toBePlainObject } from '@tests/matchers'
import M from 'expect/build/matchers'
import type { Response } from 'supertest'

/**
 * @file Custom Matchers
 * @module tests/matchers
 * @see https://jestjs.io/docs/expect#expectextendmatchers
 */

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
