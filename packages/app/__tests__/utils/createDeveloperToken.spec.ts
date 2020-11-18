import { createDeveloperToken } from '@app/subdomains/streaming/utils'
import { isString } from 'lodash'

/**
 * @file Unit Tests - createDeveloperToken
 * @module tests/utils/createDeveloperToken
 */

describe('createDeveloperToken', () => {
  it('creates a signed developer token', () => {
    const token = createDeveloperToken()

    expect(isString(token)).toBeTruthy()
  })
})
