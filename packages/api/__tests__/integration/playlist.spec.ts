import subject from '@kapi/endpoints/playlist'
import '@kapi/mixins/ShopifyAPI'
import type { SuperTestSetup } from '@kapi/tests/utils'
import { supertestSetup, testURLPath } from '@kapi/tests/utils'

/**
 * @file Integration Tests - /playlist
 * @module api/tests/integration/playlist
 */

jest.deepUnmock('@flex-development/kustomzcore/config/vercel-env')
jest.deepUnmock('@flex-development/kustomzcore/utils/createError')
jest.deepUnmock('@flex-development/kustomzcore/utils/objectFromArray')
jest.unmock('axios')

jest.mock('@kapi/mixins/ShopifyAPI')

let request = {} as SuperTestSetup['request']
let server = {} as SuperTestSetup['server']

describe('GET /playlist', () => {
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
      it('json response containing playlist data object', async () => {
        const response = await request.get(testURLPath())
        const eresponse = {
          obj: { keys: 'attributes,href,id,relationships,type' },
          status: 200
        }

        expect(response).toBeJSONResponse(eresponse)
      })
    })
  })

  describe('?fields', () => {
    describe('200 OK', () => {
      const fields = 'attributes,id,relationships'

      it(`=${fields}`, async () => {
        const response = await request.get(testURLPath())
        const eresponse = { obj: { keys: fields, keys_length: 3 }, status: 200 }

        expect(response).toBeJSONResponse(eresponse)
      })
    })
  })
})
