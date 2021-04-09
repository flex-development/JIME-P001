import type { APIQuery } from '@flex-development/kustomzcore/types'
import { ErrorStatusCode } from '@flex-development/kustomzcore/types'
import subject from '@kapi/endpoints/reviews/[objectID]'
import '@kapi/mixins/ShopifyAPI'
import { OBJECTS } from '@kapi/tests/fixtures/judgeme/reviews'
import NOT_FOUND_VALUE from '@kapi/tests/fixtures/not-found-value'
import type { SuperTestSetup } from '@kapi/tests/utils'
import { supertestSetup, testURLPath } from '@kapi/tests/utils'

/**
 * @file Integration Tests - /reviews/[objectID]
 * @module api/tests/integration/reviews/objectID
 */

jest.deepUnmock('@flex-development/kustomzcore/config/vercel-env')
jest.deepUnmock('@flex-development/kustomzcore/utils/createError')

jest.mock('@kapi/mixins/JudgeMe')

let request = {} as SuperTestSetup['request']
let server = {} as SuperTestSetup['server']

describe('GET /reviews/[objectID]', () => {
  const object = OBJECTS[0]
  const objectID = object.id

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
      it('json response containing review object', async () => {
        // ! shouldn't have to do this
        const query: APIQuery.Review.Get = { objectID }

        const response = await request.get(testURLPath(query.objectID, query))
        const eresponse = {
          obj: { keys: 'id,objectID', keys_length: 2 },
          status: 200
        }

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body.objectID).toBe(`${objectID}`)
        expect(response.body.id).toBe(object.id)
      })
    })

    describe(`${ErrorStatusCode.NotFound} NotFound`, () => {
      it('json response containing error object', async () => {
        const query: APIQuery.Review.Get = {
          objectID: NOT_FOUND_VALUE.number
        }

        const response = await request.get(testURLPath(query.objectID, query))
        const eresponse = { obj: true, status: ErrorStatusCode.NotFound }

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body.message).toMatch(new RegExp(`${query.objectID}`))
      })
    })
  })
})
