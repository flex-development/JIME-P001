import type { APIQuery } from '@flex-development/kustomzcore/types'
import { ErrorStatusCode } from '@flex-development/kustomzcore/types'
import subject from '@kapi/endpoints/customers/[objectID]'
import MockShopifyAPI from '@kapi/mixins/ShopifyAPI'
import NOT_FOUND_VALUE from '@kapi/tests/fixtures/not-found-value'
import OBJECTS from '@kapi/tests/fixtures/shopify/customers'
import type { SuperTestSetup } from '@kapi/tests/utils'
import { supertestSetup, testURLPath } from '@kapi/tests/utils'

/**
 * @file Integration Tests - /customers/[objectID]
 * @module api/tests/integration/customers/objectID
 */

jest.deepUnmock('@flex-development/kustomzcore/config/vercel-env')
jest.deepUnmock('@flex-development/kustomzcore/utils/createError')

jest.mock('@kapi/mixins/ShopifyAPI')

let request = {} as SuperTestSetup['request']
let server = {} as SuperTestSetup['server']

describe('GET /customers/[objectID]', () => {
  const object = OBJECTS[OBJECTS.length - 1]
  const objectID = object.id

  const userToken = MockShopifyAPI.API_KEY

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
      it('json response containing customer object', async () => {
        // ! shouldn't have to do this
        const query: APIQuery.Customer.Get = { objectID, userToken }

        const response = await request.get(testURLPath(query.objectID, query))
        const eresponse = {
          obj: { keys: 'email,id,objectID', keys_length: 3 },
          status: 200
        }

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body.email).toBe(object.email)
        expect(response.body.objectID).toBe(`${objectID}`)
        expect(response.body.id).toBe(objectID)
      })
    })

    describe(`${ErrorStatusCode.NotAuthenticated} NotAuthenticated`, () => {
      it('json response containing error object', async () => {
        const response = await request.get(testURLPath({ objectID }))
        const eresponse = {
          obj: true,
          status: ErrorStatusCode.NotAuthenticated
        }

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body.message).toBe('Invalid API key')
      })
    })

    describe(`${ErrorStatusCode.NotFound} NotFound`, () => {
      it('json response containing error object', async () => {
        const query: APIQuery.Customer.Get = {
          objectID: NOT_FOUND_VALUE.number,
          userToken
        }

        const response = await request.get(testURLPath(query.objectID, query))
        const eresponse = { obj: true, status: ErrorStatusCode.NotFound }

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body.message).toMatch(new RegExp(`${query.objectID}`))
      })
    })
  })
})
