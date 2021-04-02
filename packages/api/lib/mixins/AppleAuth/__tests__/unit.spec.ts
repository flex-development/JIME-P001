import { request } from '@flex-development/kustomzcore/config/axios'
import Subject from '..'
import DEVELOPER_TOKEN_CONFIG from './__fixtures__/developer-token-config'

/**
 * @file Unit Tests - Apple Authentication Mixin
 * @module lib/services/AppleAuth/tests/unit
 */

const mockRequest = request as jest.MockedFunction<typeof request>

describe('unit:lib/mixins/AppleAuth', () => {
  describe('.developerToken', () => {
    it('calls `request` with correct config', async () => {
      await Subject.developerToken()

      expect(mockRequest).toHaveBeenCalledTimes(1)
      expect(mockRequest).toHaveBeenCalledWith(DEVELOPER_TOKEN_CONFIG)
    })
  })
})
