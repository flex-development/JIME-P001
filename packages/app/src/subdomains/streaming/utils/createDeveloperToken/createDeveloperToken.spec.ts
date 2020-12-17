import { isString } from 'lodash'
import createDeveloperToken from './createDeveloperToken'

/**
 * @file Tests - createDeveloperToken
 * @module subdomains/streaming/utils/createDeveloperToken/spec
 */

describe('createDeveloperToken', () => {
  it('creates a signed developer token', () => {
    const token = createDeveloperToken()

    expect(isString(token)).toBeTruthy()
  })
})
