import type { APIQuery } from '@flex-development/kustomzcore/types'
import {
  ErrorStatusCode,
  JudgeMeReviewCuratedStatus as Curated,
  JudgeMeReviewSource as Source
} from '@flex-development/kustomzcore/types'
import subject from '@kapi/endpoints/reviews'
import '@kapi/mixins/JudgeMe'
import { LIMIT_0, LIMIT_1001 } from '@kapi/tests/fixtures/bad-request-value'
import { OBJECTS } from '@kapi/tests/fixtures/judgeme/reviews'
import NOT_FOUND_VALUE from '@kapi/tests/fixtures/not-found-value'
import ALL_FIELDS from '@kapi/tests/fixtures/query-all-fields-value'
import type { SuperTestSetup } from '@kapi/tests/utils'
import { supertestSetup, testURLPath } from '@kapi/tests/utils'

/**
 * @file Integration Tests - GET /reviews
 * @module api/tests/integration/reviews/GET
 */

jest.deepUnmock('@flex-development/kustomzcore/config/vercel-env')
jest.deepUnmock('@flex-development/kustomzcore/utils/createError')

jest.mock('@kapi/mixins/JudgeMe')

let request = {} as SuperTestSetup['request']
let server = {} as SuperTestSetup['server']

describe('GET /reviews', () => {
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
      it('json response containing reviews array', async () => {
        const response = await request.get(testURLPath())

        expect(response).toBeJSONResponse({ array: true, status: 200 })
        expect(response.body).toEachHaveKeysLength(2)
      })
    })
  })

  describe('?curated', () => {
    describe('200 OK', () => {
      it('json response containing reviews array', async () => {
        const query: APIQuery.Review.Find = {
          curated: object.curated as Curated
        }

        const filtered = OBJECTS.filter(o => o.curated === query.curated)

        const response = await request.get(testURLPath(query))
        const eresponse = { array: { length: filtered.length }, status: 200 }

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body).toEachHaveKeysLength(2)
      })
    })
  })

  describe('?featured', () => {
    describe('200 OK', () => {
      it('json response containing reviews array', async () => {
        const query: APIQuery.Review.Find = { featured: object.featured }
        const filtered = OBJECTS.filter(o => o.featured === query.featured)

        const response = await request.get(testURLPath(query))
        const eresponse = { array: { length: filtered.length }, status: 200 }

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body).toEachHaveKeysLength(2)
      })
    })
  })

  describe('?fields', () => {
    describe('200 OK', () => {
      const some_fields = 'body,created_at,rating,reviewer.name,title'

      it(`=${ALL_FIELDS}`, async () => {
        const response = await request.get(testURLPath({ fields: ALL_FIELDS }))

        expect(response).toBeJSONResponse({ array: true, status: 200 })
      })

      it(`=${some_fields}`, async () => {
        const response = await request.get(testURLPath({ fields: some_fields }))
        const efields = some_fields.replace('reviewer.name', 'reviewer')

        expect(response).toBeJSONResponse({ array: true, status: 200 })
        expect(response.body).toEachHaveKeys(efields)
        expect(response.body).toEachHaveKeysLength(7)
      })
    })
  })

  describe('?hidden', () => {
    describe('200 OK', () => {
      it('json response containing reviews array', async () => {
        const query: APIQuery.Review.Find = { hidden: object.hidden }
        const filtered = OBJECTS.filter(o => o.hidden === query.hidden)

        const response = await request.get(testURLPath(query))
        const eresponse = { array: { length: filtered.length }, status: 200 }

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body).toEachHaveKeysLength(2)
      })
    })
  })

  describe('?id', () => {
    describe('200 OK', () => {
      it('json response containing array with one review', async () => {
        const query: APIQuery.Review.Find = { id: objectID }

        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: { length: 1 }, status: 200 })
        expect(response.body[0].id).toBe(query.id)
      })

      it('json response containing empty array', async () => {
        const query: APIQuery.Review.Find = { id: NOT_FOUND_VALUE.number }

        const response = await request.get(testURLPath(query))

        expect(response).toBeJSONResponse({ array: { length: 0 }, status: 200 })
      })
    })
  })

  describe('?ip_address', () => {
    describe('200 OK', () => {
      it('json response containing reviews array', async () => {
        const query: APIQuery.Review.Find = {
          ip_address: `${object.ip_address}`
        }

        const path = `?ip_address=${query.ip_address}`

        const filtered = OBJECTS.filter(o => o.ip_address === query.ip_address)

        const response = await request.get(testURLPath(path))
        const eresponse = { array: { length: filtered.length }, status: 200 }

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body).toEachHaveKeysLength(2)
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
      it('json response containing reviews array', async () => {
        const query: APIQuery.Review.Find = {
          product_id: object.product_external_id
        }

        const filtered = OBJECTS.filter(
          o => o.product_external_id === query.product_id
        )

        const response = await request.get(testURLPath(query))
        const eresponse = { array: { length: filtered.length }, status: 200 }

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body).toEachHaveKeysLength(2)
      })
    })
  })

  describe('?rating', () => {
    describe('200 OK', () => {
      it('json response containing reviews array', async () => {
        const query: APIQuery.Review.Find = { rating: object.rating }
        const filtered = OBJECTS.filter(o => o.rating === query.rating)

        const response = await request.get(testURLPath(query))
        const eresponse = { array: { length: filtered.length }, status: 200 }

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body).toEachHaveKeysLength(2)
      })
    })
  })

  describe('?reviewer_email', () => {
    describe('200 OK', () => {
      it('json response containing reviews array', async () => {
        const query: APIQuery.Review.Find = {
          reviewer_email: object.reviewer.email
        }

        const filtered = OBJECTS.filter(
          o => o.reviewer.email === query.reviewer_email
        )

        const response = await request.get(testURLPath(query))
        const eresponse = { array: { length: filtered.length }, status: 200 }

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body).toEachHaveKeysLength(2)
      })
    })
  })

  describe('?reviewer_id', () => {
    describe('200 OK', () => {
      it('json response containing reviews array', async () => {
        const query: APIQuery.Review.Find = {
          reviewer_id: object.reviewer.id
        }

        const filtered = OBJECTS.filter(
          o => o.reviewer.id === query.reviewer_id
        )

        const response = await request.get(testURLPath(query))
        const eresponse = { array: { length: filtered.length }, status: 200 }

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body).toEachHaveKeysLength(2)
      })
    })
  })

  describe('?source', () => {
    describe('200 OK', () => {
      it('json response containing reviews array', async () => {
        const query: APIQuery.Review.Find = { source: object.source as Source }
        const filtered = OBJECTS.filter(o => o.source === query.source)

        const response = await request.get(testURLPath(query))
        const eresponse = { array: { length: filtered.length }, status: 200 }

        expect(response).toBeJSONResponse(eresponse)
        expect(response.body).toEachHaveKeysLength(2)
      })
    })
  })
})
