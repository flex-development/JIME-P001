import mockCreateLogger from '@flex-development/kustomzcore/config/logger'
import APIRequest from '@kapi/tests/fixtures/APIRequest'
import VercelRequest from '@kapi/tests/fixtures/VercelRequest'
import subject from '..'
import { API_URL } from '../../../config/constants'

/**
 * @file Unit Tests - enhanceRequest
 * @module lib/middleware/enhanceRequest/tests/unit
 */

describe('unit:lib/middleware/enhanceRequest', () => {
  describe('req.path', () => {
    it('is defined', () => {
      const req = new VercelRequest({ url: API_URL })

      subject(req)

      expect((req as APIRequest).path).toBeDefined()
    })
  })

  describe('req.logger', () => {
    it('generated using req.path', () => {
      const req = new VercelRequest({ url: `${API_URL}/playlist` })

      subject(req)

      expect(mockCreateLogger).toBeCalledWith((req as APIRequest).path)
      expect((req as APIRequest).logger).toBeDefined()
    })

    it('is defined', () => {
      const req = new VercelRequest({ url: `${API_URL}/products` })

      subject(req)

      expect(mockCreateLogger).toBeCalledWith((req as APIRequest).path)
      expect((req as APIRequest).logger).toBeDefined()
    })
  })
})
