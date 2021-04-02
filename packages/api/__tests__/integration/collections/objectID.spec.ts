import type { APIQuery } from '@flex-development/kustomzcore/types'
import { ErrorStatusCode } from '@flex-development/kustomzcore/types'
import subject from '@kapi/endpoints/collections/[objectID]'
import '@kapi/mixins/ShopifyAPI'
import NOT_FOUND_VALUE from '@kapi/tests/fixtures/not-found-value'
import OBJECTS from '@kapi/tests/fixtures/shopify/collections'
import type { SuperTestSetup } from '@kapi/tests/utils'
import { supertestSetup, testURLPath } from '@kapi/tests/utils'

/**
 * @file Integration Tests - /collections/[objectID]
 * @module api/tests/integration/collections/objectID
 */

jest.deepUnmock('@flex-development/kustomzcore/config/vercel-env')
jest.deepUnmock('@flex-development/kustomzcore/utils/createError')
jest.deepUnmock('@flex-development/kustomzcore/utils/objectFromArray')

jest.mock('@kapi/mixins/ShopifyAPI')

let request = {} as SuperTestSetup['request']
let server = {} as SuperTestSetup['server']

describe('GET /collections/[objectID]', () => {
  const object = OBJECTS[OBJECTS.length - 1]
  const objectID = object.handle

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
      it('json response containing collection object', async () => {
        const response = await request.get(testURLPath(objectID))
        const eresponse = {
          obj: { keys: 'collection_id,objectID', keys_length: 2 },
          status: 200
        }

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body.objectID).toBe(objectID)
        expect(response.body.collection_id).toBe(object.collection_id)
      })
    })

    describe(`${ErrorStatusCode.NotFound} NotFound`, () => {
      it('json response containing error object', async () => {
        const query: APIQuery.Collection.Get = {
          objectID: NOT_FOUND_VALUE.string
        }

        const response = await request.get(testURLPath(query.objectID, query))
        const eresponse = { obj: true, status: ErrorStatusCode.NotFound }

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body.message).toMatch(new RegExp(query.objectID))
      })
    })
  })

  describe('?fields', () => {
    describe('200 OK', () => {
      const fields = 'body_html,products,seo,title'

      it(`=${fields}`, async () => {
        const query = { fields: fields, objectID }

        const response = await request.get(testURLPath(query.objectID, query))
        const eresponse = { obj: { keys: fields, keys_length: 6 }, status: 200 }

        expect(response).toBeJSONResponse(eresponse)
      })
    })
  })
})
