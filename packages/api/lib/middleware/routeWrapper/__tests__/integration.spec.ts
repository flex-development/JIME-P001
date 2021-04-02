import APIRequest from '@kapi/tests/fixtures/APIRequest'
import VercelResponse from '@kapi/tests/fixtures/VercelResponse'
import subject from '..'
import { API_URL } from '../../../config/constants'
import MockErrorHandling from '../../../mixins/ErrorHandling'
import mockTrackAPISuccessEvent from '../../trackAPISuccessEvent'

/**
 * @file Integration Tests - routeWrapper
 * @module lib/middleware/routeWrapper/tests/integration
 */

jest.mock('../../../mixins/ErrorHandling')
jest.mock('../../trackAPISuccessEvent')

describe('integration:lib/middleware/routeWrapper', () => {
  const next = jest.fn()

  let req = {} as APIRequest
  let res = {} as VercelResponse

  beforeEach(async () => {
    req = new APIRequest({ url: `${API_URL}/collections` })
    res = new VercelResponse({ req })
  })

  it('if route handler does not throw', async () => {
    await subject(req, res, next)

    expect(mockTrackAPISuccessEvent).toBeCalledTimes(1)
    expect(mockTrackAPISuccessEvent).toBeCalledWith(req)
  })

  it('if route handler throws', async () => {
    const spy = jest.spyOn(MockErrorHandling, 'handleAPIError')
    const error = new Error()

    next.mockRejectedValue(error)

    await subject(req, res, next)

    expect(spy).toBeCalledWith(req, res, error)
    expect(mockTrackAPISuccessEvent).not.toBeCalled()
  })
})
