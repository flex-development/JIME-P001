import type { APIQuery } from '@flex-development/kustomzcore/types'
import { ErrorStatusCode } from '@flex-development/kustomzcore/types'
import subject from '@kapi/endpoints/menus/[objectID]'
import '@kapi/mixins/ShopifyAPI'
import MENUS from '@kapi/mixins/ShopifyAPI/__tests__/__fixtures__/menus'
import NOT_FOUND_VALUE from '@kapi/tests/fixtures/not-found-value'
import type { SuperTestSetup } from '@kapi/tests/utils'
import { supertestSetup, testURLPath } from '@kapi/tests/utils'

/**
 * @file Integration Tests - /menus/[objectID]
 * @module api/tests/integration/menus/objectID
 */

jest.deepUnmock('@flex-development/kustomzcore/config/vercel-env')
jest.deepUnmock('@flex-development/kustomzcore/utils/createError')
jest.deepUnmock('@flex-development/kustomzcore/utils/objectFromArray')

jest.mock('@kapi/mixins/ShopifyAPI')

let request = {} as SuperTestSetup['request']
let server = {} as SuperTestSetup['server']

describe('GET /menus/[objectID]', () => {
  const OBJECTS = MENUS.menus
  const object = OBJECTS[0]
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
      it('json response containing menu object', async () => {
        // ! shouldn't have to do this
        const query: APIQuery.Menu.Get = { objectID }

        const response = await request.get(testURLPath(query.objectID, query))
        const eresponse = {
          obj: { keys: 'objectID', keys_length: 1 },
          status: 200
        }

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body.objectID).toBe(objectID)
      })
    })

    describe(`${ErrorStatusCode.NotFound} NotFound`, () => {
      it('json response containing error object', async () => {
        const query: APIQuery.Menu.Get = {
          objectID: NOT_FOUND_VALUE.string
        }

        const response = await request.get(testURLPath(query.objectID, query))
        const eresponse = { obj: true, status: ErrorStatusCode.NotFound }

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body.message).toMatch(new RegExp(query.objectID))
      })
    })
  })
})
