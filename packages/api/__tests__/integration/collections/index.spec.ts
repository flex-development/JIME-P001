import type { APIQuery } from '@flex-development/kustomzcore/types'
import { ErrorStatusCode } from '@flex-development/kustomzcore/types'
import subject from '@kapi/endpoints/collections'
import '@kapi/mixins/ShopifyAPI'
import { LIMIT_0, LIMIT_1001 } from '@kapi/tests/fixtures/bad-request-value'
import NOT_FOUND_VALUE from '@kapi/tests/fixtures/not-found-value'
import ALL_FIELDS from '@kapi/tests/fixtures/query-all-fields-value'
import OBJECTS from '@kapi/tests/fixtures/shopify/collections'
import type { SuperTestSetup } from '@kapi/tests/utils'
import { supertestSetup, testURLPath } from '@kapi/tests/utils'

/**
 * @file Integration Tests - /collections
 * @module api/tests/integration/collections
 */

jest.deepUnmock('@flex-development/kustomzcore/config/vercel-env')
jest.deepUnmock('@flex-development/kustomzcore/utils/createError')
jest.deepUnmock('@flex-development/kustomzcore/utils/objectFromArray')

jest.mock('@kapi/mixins/ShopifyAPI')

let request = {} as SuperTestSetup['request']
let server = {} as SuperTestSetup['server']

describe('GET /collections', () => {
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
      it('json response containing collections array', async () => {
        const response = await request.get(testURLPath())

        expect(response).toBeJSONResponse({ array: true, status: 200 })
        expect(response.body).toEachHaveKeysLength(2)
      })
    })
  })

  describe('?collection_id', () => {
    describe('200 OK', () => {
      it('json response containing array with one collection', async () => {
        const query: APIQuery.Collection.Find = {
          collection_id: OBJECTS[0].collection_id
        }

        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: { length: 1 }, status: 200 })
        expect(response.body[0].collection_id).toBe(query.collection_id)
      })

      it('json response containing empty array', async () => {
        const query: APIQuery.Collection.Find = {
          collection_id: NOT_FOUND_VALUE.number
        }

        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: { length: 0 }, status: 200 })
      })
    })
  })

  describe('?fields', () => {
    describe('200 OK', () => {
      const some_fields = 'default_product_image,handle,sort_order'

      it(`=${ALL_FIELDS}`, async () => {
        const response = await request.get(testURLPath({ fields: ALL_FIELDS }))

        expect(response).toBeJSONResponse({ array: true, status: 200 })
      })

      it(`=${some_fields}`, async () => {
        const response = await request.get(testURLPath({ fields: some_fields }))

        expect(response).toBeJSONResponse({ array: true, status: 200 })
        expect(response.body).toEachHaveKeys(some_fields)
        expect(response.body).toEachHaveKeysLength(5)
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
