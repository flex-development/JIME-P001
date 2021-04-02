import subject from '@kapi/endpoints/layout'
import '@kapi/mixins/ShopifyAPI'
import type { SuperTestSetup } from '@kapi/tests/utils'
import { supertestSetup, testURLPath } from '@kapi/tests/utils'

/**
 * @file Integration Tests - /layout
 * @module api/tests/integration/layout
 */

jest.deepUnmock('@flex-development/kustomzcore/config/axios')
jest.deepUnmock('@flex-development/kustomzcore/config/vercel-env')
jest.deepUnmock('@flex-development/kustomzcore/utils/createError')
jest.deepUnmock('@flex-development/kustomzcore/utils/objectFromArray')
jest.unmock('axios')

jest.mock('@kapi/mixins/ShopifyAPI')

let request = {} as SuperTestSetup['request']
let server = {} as SuperTestSetup['server']

describe('GET /layout', () => {
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
      it('json response containing layout data object', async () => {
        const response = await request.get(testURLPath())
        const eresponse = {
          obj: { keys: 'hero,playlist,seo,sidebar', keys_length: 4 },
          status: 200
        }

        expect(response).toBeJSONResponse(eresponse)
      })
    })
  })
})
