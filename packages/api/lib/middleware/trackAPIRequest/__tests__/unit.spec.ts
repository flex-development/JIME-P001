import mockGA from '@flex-development/kustomzcore/config/google-analytics'
import APIRequest from '@kapi/tests/fixtures/APIRequest'
import subject from '..'
import { API_URL } from '../../../config/constants'

/**
 * @file Unit Tests - trackAPIRequest
 * @module lib/middleware/trackAPIRequest/tests/unit
 */

describe('unit:lib/middleware/trackAPIRequest', () => {
  it('generates pageview params object from request object', async () => {
    const spy = jest.spyOn(mockGA, 'pageview')

    const roptions = { headers: { host: API_URL }, url: `${API_URL}/products` }
    const req = new APIRequest(roptions)

    await subject(req)

    expect(spy).toBeCalledTimes(1)
    expect(spy.mock.calls[0][0]).toMatchObject({
      dl: req.url,
      documentHost: req.headers.host,
      documentPath: req.path,
      ua: undefined
    })
  })
})
