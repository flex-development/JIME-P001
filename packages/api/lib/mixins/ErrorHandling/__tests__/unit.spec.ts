import ga from '@flex-development/kustomzcore/config/google-analytics'
import vercel from '@flex-development/kustomzcore/config/vercel-env'
import {
  ErrorClassName,
  ErrorStatusCode
} from '@flex-development/kustomzcore/types/errors'
import createError from '@flex-development/kustomzcore/utils/createError'
import { API_URL } from '@kapi/config/constants'
import APIRequest from '@kapi/tests/fixtures/APIRequest'
import VercelResponse from '@kapi/tests/fixtures/VercelResponse'
import Subject from '..'
import {
  ALGOLIA_API_ERROR,
  ALGOLIA_API_ERROR_INDEX_404
} from './__fixtures__/algolia-errors'
import ERROR from './__fixtures__/error'
import { ERROR_JSON, ERROR_JSON_WITH_DATA } from './__fixtures__/error-json'
import ZOD_ERROR from './__fixtures__/zod-error'

/**
 * @file Unit Tests - ErrorHandling Mixin
 * @module lib/mixins/ErrorHandling/tests/unit
 */

const mockGA = ga as jest.Mocked<typeof ga>
const mockCreateError = createError as jest.MockedFunction<typeof createError>
const mockVercel = vercel as jest.Mocked<typeof vercel>

jest.mock('@flex-development/kustomzcore/config/vercel-env')

describe('unit:lib/mixins/ErrorHandling', () => {
  describe('.formatAPIError', () => {
    beforeEach(() => {
      mockVercel.env = 'development'
    })

    it('AlgoliaError object', () => {
      Subject.formatAPIError(ALGOLIA_API_ERROR)

      expect(mockCreateError).toBeCalledTimes(1)
      expect(mockCreateError).toBeCalledWith(
        ALGOLIA_API_ERROR,
        {
          created_at: undefined,
          name: ALGOLIA_API_ERROR.name,
          search_index_404: undefined,
          stack: ALGOLIA_API_ERROR.stack,
          transporterStackTrace: ALGOLIA_API_ERROR.transporterStackTrace,
          vercel: undefined
        },
        ALGOLIA_API_ERROR.status
      )
    })

    it('Error object', () => {
      Subject.formatAPIError(ERROR)

      expect(mockCreateError).toBeCalledTimes(1)
      expect(mockCreateError).toBeCalledWith(
        ERROR,
        {
          created_at: undefined,
          name: ERROR.name,
          search_index_404: undefined,
          stack: ERROR.stack,
          transporterStackTrace: undefined,
          vercel: undefined
        },
        undefined
      )
    })

    it('ErrorJSON object', () => {
      Subject.formatAPIError(ERROR_JSON_WITH_DATA)

      expect(mockCreateError).toBeCalledTimes(1)
      expect(mockCreateError).toBeCalledWith(
        ERROR_JSON_WITH_DATA,
        ERROR_JSON_WITH_DATA.data,
        undefined
      )
    })
  })

  describe('.formatValidationError', () => {
    const estatus = ErrorStatusCode.BadRequest

    describe('error with empty issues array', () => {
      const edata = {}

      beforeAll(() => {
        mockCreateError.mockRestore()
      })

      it('group === true', () => {
        Subject.formatValidationError()

        const emessage = 'Unknown validation errors.'

        expect(mockCreateError).toBeCalledWith(emessage, edata, estatus)
      })

      it('group === false', () => {
        Subject.formatValidationError(undefined, undefined, false)

        const emessage = 'Unknown validation error.'

        expect(mockCreateError).toBeCalledWith(emessage, edata, estatus)
      })
    })

    describe('error with non-empty issues array', () => {
      it('group === false', () => {
        const emessage = ZOD_ERROR.issues[0].message
        const edata = { errors: ZOD_ERROR.issues[0] }

        mockCreateError.mockReturnValue({
          className: ErrorClassName.BadRequest,
          code: estatus,
          data: {},
          errors: edata.errors,
          message: emessage,
          name: 'BadRequest'
        })

        Subject.formatValidationError(ZOD_ERROR, undefined, false)

        expect(mockCreateError).toBeCalledWith(emessage, edata, estatus)
      })

      it('group === true', () => {
        const fields = Object.keys(ZOD_ERROR.flatten().fieldErrors).sort()

        const emessage = `Validation errors: [${fields}]`
        const edata = { errors: ZOD_ERROR.issues }

        mockCreateError.mockReturnValue({
          className: ErrorClassName.BadRequest,
          code: estatus,
          data: {},
          errors: edata.errors,
          message: emessage,
          name: 'BadRequest'
        })

        Subject.formatValidationError(ZOD_ERROR)

        expect(mockCreateError).toBeCalledWith(emessage, edata, estatus)
      })
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
      const spy = jest.spyOn(Subject, 'formatAPIError')

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
