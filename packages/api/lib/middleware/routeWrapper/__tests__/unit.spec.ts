import APIRequest from '@kapi/tests/fixtures/APIRequest'
import VercelResponse from '@kapi/tests/fixtures/VercelResponse'
import subject from '..'
import { API_URL } from '../../../config/constants'
import mockEnhanceRequest from '../../enhanceRequest'
import mockTrackAPIRequest from '../../trackAPIRequest'
import mockTrackAPISuccessEvent from '../../trackAPISuccessEvent'

/**
 * @file Unit Tests - routeWrapper
 * @module lib/middleware/routeWrapper/tests/unit
 */

jest.mock('../../../mixins/ErrorHandling')
jest.mock('../../enhanceRequest')
jest.mock('../../trackAPIRequest')
jest.mock('../../trackAPISuccessEvent')

describe('unit:lib/middleware/routeWrapper', () => {
  const next = jest.fn()

  let req = {} as APIRequest
  let res = {} as VercelResponse

  beforeEach(async () => {
    req = new APIRequest({ url: `${API_URL}/playlist` })
    res = new VercelResponse({ req })
  })

  it('enhances request object and tracks api request', async () => {
    await subject(req, res)

    expect(mockEnhanceRequest).toBeCalledTimes(1)
    expect(mockEnhanceRequest).toBeCalledWith(req)

    expect(mockTrackAPIRequest).toBeCalledTimes(1)
    expect(mockTrackAPIRequest).toBeCalledWith(req)
  })

  describe('next', () => {
    it('calls route handler', async () => {
      await subject(req, res, next)

      expect(next).toBeCalledTimes(1)

      expect(mockTrackAPISuccessEvent).toBeCalledTimes(1)
      expect(mockTrackAPISuccessEvent).toBeCalledWith(req)
    })

    it('sends null to client if route handler is undefined', async () => {
      const spy = jest.spyOn(res, 'json')

      await subject(req, res)

      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith(null)

      expect(mockTrackAPISuccessEvent).toBeCalledTimes(1)
      expect(mockTrackAPISuccessEvent).toBeCalledWith(req)
    })
  })
})
