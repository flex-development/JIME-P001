import { STATUS_CODES as CODES } from '@flex-development/kustomzcore/config'
import mockGA from '@flex-development/kustomzcore/config/google-analytics'
import APIRequest from '@kapi/tests/fixtures/APIRequest'
import subject from '..'
import { API_URL } from '../../../config/constants'

/**
 * @file Unit Tests - trackAPISuccessEvent
 * @module lib/middleware/trackAPISuccessEvent/tests/unit
 */

describe('unit:lib/middleware/trackAPISuccessEvent', () => {
  const spy = jest.spyOn(mockGA, 'event')

  describe('generates event params object from request object', () => {
    it('status in 200 range', async () => {
      const query = { objectID: 'objectID' }
      const status = 204

      const req = new APIRequest({ query, url: `${API_URL}/menus` })

      await subject(req, status)

      expect(spy).toBeCalledTimes(1)
      expect(spy.mock.calls[0][0]).toMatchObject({
        eventAction: CODES[status],
        eventCategory: mockGA.categories.responses.success,
        eventLabel: `GET ${req.path}`,
        eventValue: status,
        method: 'GET',
        path: req.path,
        query: JSON.stringify(req.query)
      })
    })

    it('status not in 200 range', async () => {
      const status = 500

      const req = new APIRequest({ url: `${API_URL}/menus` })

      await subject(req, status)

      expect(spy).toBeCalledTimes(1)
      expect(spy.mock.calls[0][0]).toMatchObject({ eventAction: CODES[200] })
    })
  })
})
