import type { APIRequestBody } from '@flex-development/kustomzcore/types'
import { ErrorStatusCode } from '@flex-development/kustomzcore/types'
import subject from '@kapi/endpoints/reviews'
import '@kapi/mixins/JudgeMe'
import { OBJECTS } from '@kapi/tests/fixtures/judgeme/reviews'
import NOT_FOUND_VALUE from '@kapi/tests/fixtures/not-found-value'
import type { SuperTestSetup } from '@kapi/tests/utils'
import { supertestSetup, testURLPath } from '@kapi/tests/utils'
import faker from 'faker'
import omit from 'lodash/omit'

/**
 * @file Integration Tests - POST /reviews
 * @module api/tests/integration/reviews/POST
 */

jest.deepUnmock('@flex-development/kustomzcore/config/vercel-env')
jest.deepUnmock('@flex-development/kustomzcore/utils/createError')

jest.mock('@kapi/mixins/JudgeMe')

let request = {} as SuperTestSetup['request']
let server = {} as SuperTestSetup['server']

describe('POST /reviews', () => {
  beforeAll(() => {
    const helpers = supertestSetup(subject)

    request = helpers.request
    server = helpers.server
  })

  afterAll(() => {
    server.close()
  })

  describe('/', () => {
    const object = OBJECTS[0]

    const data: APIRequestBody.Review.POST = {
      body: 'great product 😍 👍🏾',
      email: object.reviewer.email,
      id: object.product_external_id
    }

    describe('201 Created', () => {
      it('json response containing payload', async () => {
        const response = await request.post(testURLPath()).send(data)

        expect(response).toBeJSONResponse({ status: 201 })
        expect(response.body).toMatchObject(data)
      })
    })

    describe(`${ErrorStatusCode.BadRequest} BadRequest`, () => {
      const eresponse = { obj: true, status: ErrorStatusCode.BadRequest }

      it('email', async () => {
        const bdata = { ...data, email: faker.internet.exampleEmail() }

        const response = await request.post(testURLPath()).send(bdata)

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body.errors[0].params.email).toBe(bdata.email)
      })

      it('id', async () => {
        const bdata = { ...data, id: NOT_FOUND_VALUE.number }

        const response = await request.post(testURLPath()).send(bdata)

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body.errors[0].params.id).toBe(bdata.id)
      })

      describe('body', () => {
        const property = 'body'

        it('greater than 500 characters', async () => {
          const bdata = { ...data, body: faker.datatype.string(501) }

          const response = await request.post(testURLPath()).send(bdata)

          expect(response).toBeJSONResponse(eresponse)
          expect(response.body.errors[0].path[0]).toBe(property)
        })

        it('less than 1 character', async () => {
          const bdata = { ...data, body: '' }

          const response = await request.post(testURLPath()).send(bdata)

          expect(response).toBeJSONResponse(eresponse)
          expect(response.body.errors[0].path[0]).toBe(property)
        })

        it('undefined', async () => {
          const bdata = omit(data, [property])

          const response = await request.post(testURLPath()).send(bdata)

          expect(response).toBeJSONResponse(eresponse)
          expect(response.body.errors[0].path[0]).toBe(property)
        })
      })
    })
  })
})
