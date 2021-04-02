import { ErrorStatusCode } from '@flex-development/kustomzcore/types'
import subject from '@kapi/endpoints/policies'
import '@kapi/mixins/ShopifyAPI'
import { LIMIT_0, LIMIT_1001 } from '@kapi/tests/fixtures/bad-request-value'
import ALL_FIELDS from '@kapi/tests/fixtures/query-all-fields-value'
import OBJECTS from '@kapi/tests/fixtures/shopify/policies'
import type { SuperTestSetup } from '@kapi/tests/utils'
import { supertestSetup, testURLPath } from '@kapi/tests/utils'

/**
 * @file Integration Tests - /policies
 * @module api/tests/integration/policies
 */

jest.deepUnmock('@flex-development/kustomzcore/config/vercel-env')
jest.deepUnmock('@flex-development/kustomzcore/utils/createError')
jest.deepUnmock('@flex-development/kustomzcore/utils/objectFromArray')

jest.mock('@kapi/mixins/ShopifyAPI')

let request = {} as SuperTestSetup['request']
let server = {} as SuperTestSetup['server']

describe('GET /policies', () => {
  beforeAll(() => {
    const helpers = supertestSetup(subject)

    request = helpers.request
    server = helpers.server
  })

  afterAll(() => {
    server.close()
  })

  describe('/', () => {
    describe('200 OK', () => {
      it('json response containing policies array', async () => {
        const response = await request.get(testURLPath())

        expect(response).toBeJSONResponse({ array: true, status: 200 })
        expect(response.body).toEachHaveKeysLength(1)
      })
    })
  })

  describe('?fields', () => {
    describe('200 OK', () => {
      const some_fields = 'title,url'

      it(`=${ALL_FIELDS}`, async () => {
        const response = await request.get(testURLPath({ fields: ALL_FIELDS }))

        expect(response).toBeJSONResponse({ array: true, status: 200 })
      })

      it(`=${some_fields}`, async () => {
        const response = await request.get(testURLPath({ fields: some_fields }))

        expect(response).toBeJSONResponse({ array: true, status: 200 })
        expect(response.body).toEachHaveKeys(some_fields)
        expect(response.body).toEachHaveKeysLength(3)
      })
    })
  })

  describe('?limit', () => {
    describe('200 OK', () => {
      const limit = OBJECTS.length - 1

      it(`=${limit}`, async () => {
        const response = await request.get(testURLPath({ limit }))
        const eresponse = { array: { length: limit }, status: 200 }

        expect(response).toBeJSONResponse(eresponse)
      })
    })

    describe(`${ErrorStatusCode.BadRequest} BadRequest`, () => {
      const eresponse = { obj: true, status: ErrorStatusCode.BadRequest }

      it(`=${LIMIT_0}`, async () => {
        const response = await request.get(testURLPath({ limit: LIMIT_0 }))

        expect(response).toBeJSONResponse(eresponse)
      })

      it(`=${LIMIT_1001}`, async () => {
        const response = await request.get(testURLPath({ limit: LIMIT_1001 }))

        expect(response).toBeJSONResponse(eresponse)
      })
    })
  })
})
