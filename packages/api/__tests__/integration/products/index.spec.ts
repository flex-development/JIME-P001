import type { APIQuery } from '@flex-development/kustomzcore/types'
import { ErrorStatusCode } from '@flex-development/kustomzcore/types'
import subject from '@kapi/endpoints/products'
import '@kapi/mixins/ShopifyAPI'
import { LIMIT_0, LIMIT_1001 } from '@kapi/tests/fixtures/bad-request-value'
import NOT_FOUND_VALUE from '@kapi/tests/fixtures/not-found-value'
import ALL_FIELDS from '@kapi/tests/fixtures/query-all-fields-value'
import OBJECTS from '@kapi/tests/fixtures/shopify/products'
import type { SuperTestSetup } from '@kapi/tests/utils'
import { supertestSetup, testURLPath } from '@kapi/tests/utils'

/**
 * @file Integration Tests - /products
 * @module api/tests/integration/products
 */

jest.deepUnmock('@flex-development/kustomzcore/config/vercel-env')
jest.deepUnmock('@flex-development/kustomzcore/utils/createError')
jest.deepUnmock('@flex-development/kustomzcore/utils/objectFromArray')

jest.mock('@kapi/mixins/ShopifyAPI')

let request = {} as SuperTestSetup['request']
let server = {} as SuperTestSetup['server']

describe('GET /products', () => {
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
      it('json response containing products array', async () => {
        const response = await request.get(testURLPath())

        expect(response).toBeJSONResponse({ array: true, status: 200 })
        expect(response.body).toEachHaveKeysLength(2)
      })
    })
  })

  describe('?fields', () => {
    describe('200 OK', () => {
      const some_fields = 'options,product_type,vendor'

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

  describe('?product_id', () => {
    describe('200 OK', () => {
      it('json response containing array with one product', async () => {
        const query: APIQuery.Product.Find = {
          product_id: OBJECTS[0].product_id
        }

        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: { length: 1 }, status: 200 })
        expect(response.body[0].product_id).toBe(query.product_id)
      })

      it('json response containing empty array', async () => {
        const query: APIQuery.Product.Find = {
          product_id: NOT_FOUND_VALUE.number
        }

        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: { length: 0 }, status: 200 })
      })
    })
  })
})
