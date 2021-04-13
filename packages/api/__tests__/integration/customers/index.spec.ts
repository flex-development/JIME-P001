import type { APIQuery } from '@flex-development/kustomzcore/types'
import { ErrorStatusCode } from '@flex-development/kustomzcore/types'
import subject from '@kapi/endpoints/customers'
import MockShopifyAPI from '@kapi/mixins/ShopifyAPI'
import { LIMIT_0, LIMIT_1001 } from '@kapi/tests/fixtures/bad-request-value'
import NOT_FOUND_VALUE from '@kapi/tests/fixtures/not-found-value'
import ALL_FIELDS from '@kapi/tests/fixtures/query-all-fields-value'
import OBJECTS from '@kapi/tests/fixtures/shopify/customers'
import type { SuperTestSetup } from '@kapi/tests/utils'
import { supertestSetup, testURLPath } from '@kapi/tests/utils'

/**
 * @file Integration Tests - /customers
 * @module api/tests/integration/customers
 */

jest.deepUnmock('@flex-development/kustomzcore/config/vercel-env')
jest.deepUnmock('@flex-development/kustomzcore/utils/createError')

jest.mock('@kapi/mixins/ShopifyAPI')

let request = {} as SuperTestSetup['request']
let server = {} as SuperTestSetup['server']

describe('GET /customers', () => {
  const QUERY: APIQuery.Customer.Find = { userToken: MockShopifyAPI.API_KEY }

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
      it('json response containing customers array', async () => {
        const response = await request.get(testURLPath(QUERY))

        expect(response).toBeJSONResponse({ array: true, status: 200 })
        expect(response.body).toEachHaveKeysLength(3)
      })
    })

    describe(`${ErrorStatusCode.NotAuthenticated} NotAuthenticated`, () => {
      it('json response containing error object', async () => {
        const response = await request.get(testURLPath({}))
        const eresponse = {
          obj: true,
          status: ErrorStatusCode.NotAuthenticated
        }

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body.message).toBe('Invalid API key')
      })
    })
  })

  describe('?accepts_marketing', () => {
    describe('200 OK', () => {
      it('json response containing customers array', async () => {
        const query: APIQuery.Customer.Find = {
          ...QUERY,
          accepts_marketing: OBJECTS[0].accepts_marketing
        }

        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: true, status: 200 })
        expect(response.body).toEachHaveKeysLength(3)
      })
    })
  })

  describe('?email', () => {
    describe('200 OK', () => {
      it('json response containing array with one customer', async () => {
        const query: APIQuery.Customer.Find = {
          ...QUERY,
          email: OBJECTS[0].email
        }

        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: { length: 1 }, status: 200 })
        expect(response.body).toEachHaveKeysLength(3)
      })
    })
  })

  describe('?fields', () => {
    describe('200 OK', () => {
      const some_fields = 'first_name,last_name'

      it(`=${ALL_FIELDS}`, async () => {
        const query = { ...QUERY, fields: ALL_FIELDS }
        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: true, status: 200 })
      })

      it(`=${some_fields}`, async () => {
        const query = { ...QUERY, fields: some_fields }
        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: true, status: 200 })
        expect(response.body).toEachHaveKeys(some_fields)
        expect(response.body).toEachHaveKeysLength(5)
      })
    })
  })

  describe('?first_name', () => {
    describe('200 OK', () => {
      it('json response containing customers array', async () => {
        const query: APIQuery.Customer.Find = {
          ...QUERY,
          first_name: OBJECTS[0].first_name
        }

        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: true, status: 200 })
        expect(response.body).toEachHaveKeysLength(3)
      })
    })
  })

  describe('?id', () => {
    describe('200 OK', () => {
      it('json response containing array with one customer', async () => {
        const query: APIQuery.Customer.Find = { ...QUERY, id: OBJECTS[0].id }

        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: { length: 1 }, status: 200 })
        expect(response.body[0].id).toBe(query.id)
      })

      it('json response containing empty array', async () => {
        const query: APIQuery.Customer.Find = {
          ...QUERY,
          id: NOT_FOUND_VALUE.number
        }

        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: { length: 0 }, status: 200 })
      })
    })
  })

  describe('?last_name', () => {
    describe('200 OK', () => {
      it('json response containing customers array', async () => {
        const query: APIQuery.Customer.Find = {
          ...QUERY,
          last_name: OBJECTS[0].last_name
        }

        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: true, status: 200 })
        expect(response.body).toEachHaveKeysLength(3)
      })
    })
  })

  describe('?last_order_id', () => {
    describe('200 OK', () => {
      it('json response containing customers array', async () => {
        const query: APIQuery.Customer.Find = {
          ...QUERY,
          last_order_id: OBJECTS[0].last_order_id
        }

        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: true, status: 200 })
        expect(response.body).toEachHaveKeysLength(3)
      })
    })
  })

  describe('?limit', () => {
    describe('200 OK', () => {
      const limit = OBJECTS.length - 1

      it(`=${limit}`, async () => {
        const response = await request.get(testURLPath({ ...QUERY, limit }))
        const eresponse = { array: { length: limit }, status: 200 }

        expect(response).toBeJSONResponse(eresponse)
      })
    })

    describe(`${ErrorStatusCode.BadRequest} BadRequest`, () => {
      const eresponse = { obj: true, status: ErrorStatusCode.BadRequest }

      it(`=${LIMIT_0}`, async () => {
        const query = { ...QUERY, limit: LIMIT_0 }
        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse(eresponse)
      })

      it(`=${LIMIT_1001}`, async () => {
        const query = { ...QUERY, limit: LIMIT_1001 }
        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse(eresponse)
      })
    })
  })

  describe('?moil', () => {
    describe('200 OK', () => {
      it('json response containing customers array', async () => {
        const query: APIQuery.Customer.Find = {
          ...QUERY,
          moil: OBJECTS[0].marketing_opt_in_level
        }

        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: true, status: 200 })
        expect(response.body).toEachHaveKeysLength(3)
      })
    })
  })

  describe('?orders_count', () => {
    describe('200 OK', () => {
      it('json response containing customers array', async () => {
        const query: APIQuery.Customer.Find = {
          ...QUERY,
          orders_count: OBJECTS[0].orders_count
        }

        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: true, status: 200 })
        expect(response.body).toEachHaveKeysLength(3)
      })
    })
  })

  describe('?phone', () => {
    describe('200 OK', () => {
      it('json response containing array with one customer', async () => {
        const query: APIQuery.Customer.Find = {
          ...QUERY,
          phone: OBJECTS[0].phone
        }

        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: { length: 1 }, status: 200 })
        expect(response.body).toEachHaveKeysLength(3)
      })
    })
  })

  describe('?state', () => {
    describe('200 OK', () => {
      it('json response containing customers array', async () => {
        const query: APIQuery.Customer.Find = {
          ...QUERY,
          state: OBJECTS[0].state
        }

        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: true, status: 200 })
        expect(response.body).toEachHaveKeysLength(3)
      })
    })
  })

  describe('?total_spent', () => {
    describe('200 OK', () => {
      it('json response containing customers array', async () => {
        const query: APIQuery.Customer.Find = {
          ...QUERY,
          total_spent: OBJECTS[0].total_spent
        }

        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: true, status: 200 })
        expect(response.body).toEachHaveKeysLength(3)
      })
    })
  })
})
