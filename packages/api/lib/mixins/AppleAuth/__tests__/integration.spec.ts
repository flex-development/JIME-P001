import { verify } from 'jsonwebtoken'
import Subject from '..'

/**
 * @file Integration Tests - Apple Authentication Mixin
 * @module lib/mixins/AppleAuth/tests/integration
 */

jest.unmock('@flex-development/kustomzcore/config/axios')
jest.unmock('axios')

describe('integration:lib/mixins/AppleAuth', () => {
  const pkey = process.env.APPLE_AUTHKEY_MUSICKIT?.replace(/\\n/gm, '\n') ?? ''

  describe('.developerToken', () => {
    it('fetches verifiable developer token', async () => {
      const token = await Subject.developerToken()

      expect(typeof token === 'string').toBeTruthy()
      expect(() => verify(token, pkey, { algorithms: ['ES256'] })).not.toThrow()
    })
  })
})
