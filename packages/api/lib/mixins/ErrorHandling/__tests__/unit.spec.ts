import ga from '@flex-development/kustomzcore/config/google-analytics'
import vercel from '@flex-development/kustomzcore/config/vercel-env'
import createError from '@flex-development/kustomzcore/utils/createError'
import APIRequest from '@kapi/tests/fixtures/APIRequest'
import VercelResponse from '@kapi/tests/fixtures/VercelResponse'
import Subject from '..'
import { API_URL } from '../../../config/constants'
import {
  ALGOLIA_API_ERROR,
  ALGOLIA_API_ERROR_INDEX_404,
  ERROR,
  ERROR_JSON,
  ERROR_JSON_WITH_DATA
} from './__fixtures__/errors'

/**
 * @file Unit Tests - ErrorHandling Mixin
 * @module lib/mixins/ErrorHandling/tests/unit
 */

const mockGA = ga as jest.Mocked<typeof ga>
const mockCreateError = createError as jest.MockedFunction<typeof createError>
const mockVercel = vercel as jest.Mocked<typeof vercel>

jest.mock('@flex-development/kustomzcore/config/vercel-env')

describe('unit:lib/mixins/ErrorHandling', () => {
  describe('.formatError', () => {
    beforeEach(() => {
      mockVercel.env = 'development'
    })

    it('AlgoliaError object', () => {
      Subject.formatError(ALGOLIA_API_ERROR)

      expect(mockCreateError).toBeCalledTimes(1)
      expect(mockCreateError).toBeCalledWith(
        ALGOLIA_API_ERROR,
        {
          created_at: undefined,
          search_index_404: undefined,
          transporterStackTrace: ALGOLIA_API_ERROR.transporterStackTrace,
          vercel: undefined
        },
        ALGOLIA_API_ERROR.status
      )
    })

    it('Error object', () => {
      Subject.formatError(ERROR)

      expect(mockCreateError).toBeCalledTimes(1)
      expect(mockCreateError).toBeCalledWith(
        ERROR,
        {
          created_at: undefined,
          search_index_404: undefined,
          transporterStackTrace: undefined,
          vercel: undefined
        },
        undefined
      )
    })

    it('ErrorJSON object', () => {
      Subject.formatError(ERROR_JSON_WITH_DATA)

      expect(mockCreateError).toBeCalledTimes(1)
      expect(mockCreateError).toBeCalledWith(
        ERROR_JSON_WITH_DATA,
        ERROR_JSON_WITH_DATA.data,
        undefined
      )
    })
  })

  describe('.handleAPIError', () => {
    const ERROR_JSON_DATA = { req: { headers: {}, query: {}, url: API_URL } }

    let req = {} as APIRequest
    let res = {} as VercelResponse

    beforeEach(() => {
      req = new APIRequest({ url: ERROR_JSON_DATA.req.url })
      res = new VercelResponse({ req })

      mockCreateError.mockReturnValue(ERROR_JSON)
    })

    it('formats error object', async () => {
      const spy = jest.spyOn(Subject, 'formatError')

      await Subject.handleAPIError(req, res, ERROR_JSON)

      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith(ERROR_JSON, ERROR_JSON_DATA)
    })

    it('logs error', async () => {
      mockVercel.env = 'test'

      const spy = jest.spyOn(req.logger, 'error')

      await Subject.handleAPIError(req, res, ERROR_JSON)

      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith({ error: ERROR_JSON })
    })

    it('sends error event to google analytics', async () => {
      const spy = jest.spyOn(Subject, 'track')

      await Subject.handleAPIError(req, res, ERROR_JSON)

      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith(ERROR_JSON, {
        method: req.method.toUpperCase(),
        path: req.path,
        ua: ERROR_JSON.data.req.headers['user-agent']
      })
    })

    it('sends error code as http status code', async () => {
      const spy = jest.spyOn(res, 'status')

      await Subject.handleAPIError(req, res, ERROR_JSON)

      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith(ERROR_JSON.code)
    })

    it('sends error object to client', async () => {
      const spy = jest.spyOn(res, 'json')

      await Subject.handleAPIError(req, res, ERROR_JSON)

      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith(ERROR_JSON)
    })
  })

  describe('.searchIndex404', () => {
    it('returns false', () => {
      expect(Subject.searchIndex404(ALGOLIA_API_ERROR)).toBeFalsy()
    })

    it('returns true', () => {
      expect(Subject.searchIndex404(ALGOLIA_API_ERROR_INDEX_404)).toBeTruthy()
    })
  })

  describe('.track', () => {
    it('calls ga.event with error EventParam object', async () => {
      await Subject.track(ERROR_JSON)

      expect(mockGA.event).toBeCalledTimes(1)

      expect(mockGA.event).toBeCalledWith({
        error: JSON.stringify(ERROR_JSON),
        eventAction: ERROR_JSON.name,
        eventCategory: mockGA.categories.responses.error,
        eventLabel: ERROR_JSON.message,
        eventValue: ERROR_JSON.code
      })
    })
  })
})
