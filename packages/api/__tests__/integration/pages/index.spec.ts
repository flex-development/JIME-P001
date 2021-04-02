import type { APIQuery, IPage } from '@flex-development/kustomzcore/types'
import { ErrorStatusCode } from '@flex-development/kustomzcore/types'
import subject from '@kapi/endpoints/pages'
import '@kapi/mixins/ShopifyAPI'
import { LIMIT_0, LIMIT_1001 } from '@kapi/tests/fixtures/bad-request-value'
import NOT_FOUND_VALUE from '@kapi/tests/fixtures/not-found-value'
import ALL_FIELDS from '@kapi/tests/fixtures/query-all-fields-value'
import OBJECTS from '@kapi/tests/fixtures/shopify/pages'
import type { SuperTestSetup } from '@kapi/tests/utils'
import { supertestSetup, testURLPath } from '@kapi/tests/utils'

/**
 * @file Integration Tests - /pages
 * @module api/tests/integration/pages
 */

jest.deepUnmock('@flex-development/kustomzcore/config/vercel-env')
jest.deepUnmock('@flex-development/kustomzcore/utils/createError')
jest.deepUnmock('@flex-development/kustomzcore/utils/objectFromArray')

jest.mock('@kapi/mixins/ShopifyAPI')

let request = {} as SuperTestSetup['request']
let server = {} as SuperTestSetup['server']

describe('GET /pages', () => {
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
      it('json response containing pages array', async () => {
        const response = await request.get(testURLPath())

        expect(response).toBeJSONResponse({ array: true, status: 200 })
        expect(response.body).toEachHaveKeysLength(2)
      })
    })
  })

  describe('/index', () => {
    it('json response containing page object', async () => {
      const objectID = 'index'

      const response = await request.get(testURLPath(objectID))
      const eresponse = {
        obj: { keys: 'id,objectID', keys_length: 2 },
        status: 200
      }

      expect(response).toBeJSONResponse(eresponse)
      expect(response.body.objectID).toBe(objectID)
    })
  })

  describe('?author', () => {
    describe('200 OK', () => {
      const { author } = OBJECTS.find(o => o.author !== null) as IPage
      const pages = OBJECTS.filter(o => o.author === author)

      const state1 = `${pages.length} ${pages.length === 1 ? 'page' : 'pages'}`

      it(`json response containing array with ${state1}`, async () => {
        const query: APIQuery.Page.Find = { author }

        const response = await request.get(testURLPath(query))
        const eresponse = { array: { length: pages.length }, status: 200 }

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body).toEachHaveKeysLength(2)
      })

      it('json response containing empty array', async () => {
        const query: APIQuery.Page.Find = { author: NOT_FOUND_VALUE.string }

        const response = await request.get(testURLPath(query))
        const eresponse = { array: { length: 0 }, status: 200 }

        expect(response).toBeJSONResponse(eresponse)
      })
    })
  })

  describe('?fields', () => {
    describe('200 OK', () => {
      const some_fields = 'admin_graphql_api_id,template_suffix'

      it(`=${ALL_FIELDS}`, async () => {
        const response = await request.get(testURLPath({ fields: ALL_FIELDS }))

        expect(response).toBeJSONResponse({ array: true, status: 200 })
      })

      it(`=${some_fields}`, async () => {
        const response = await request.get(testURLPath({ fields: some_fields }))

        expect(response).toBeJSONResponse({ array: true, status: 200 })
        expect(response.body).toEachHaveKeys(some_fields)
        expect(response.body).toEachHaveKeysLength(4)
      })
    })
  })

  describe('?id', () => {
    describe('200 OK', () => {
      it('json response containing array with one page', async () => {
        const query: APIQuery.Page.Find = { id: OBJECTS[0].id }

        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: { length: 1 }, status: 200 })
        expect(response.body[0].id).toBe(query.id)
      })

      it('json response containing empty array', async () => {
        const query: APIQuery.Page.Find = { id: NOT_FOUND_VALUE.number }

        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: { length: 0 }, status: 200 })
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
