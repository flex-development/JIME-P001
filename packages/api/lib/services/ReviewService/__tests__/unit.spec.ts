import {
  NUM_FAKE_REQUESTS,
  REVIEWS as OBJECTS
} from '@kapi/tests/fixtures/judgeme/reviews'
import PRODUCT from '@kapi/tests/fixtures/shopify/products/ash-tray'
import Subject from '..'
import mockAlgolia from '../../../config/algolia'
import { SEARCH_INDEX_SETTINGS } from '../../../config/constants'
import MockJudgeMe from '../../../mixins/JudgeMe'
import MockSearchIndexService from '../../SearchIndexService'

/**
 * @file Unit Tests - ReviewService
 * @module lib/services/ReviewService/tests/unit
 */

jest.mock('../../../config/algolia')
jest.mock('../../../mixins/JudgeMe')
jest.mock('../../SearchIndexService')

describe('unit:lib/services/ReviewService', () => {
  const oidk = 'id'

  const object = OBJECTS[0]
  const objectID = object[oidk]

  describe('constructor', () => {
    it('calls SearchIndexService class constructor', () => {
      new Subject()

      const { constructor } = MockSearchIndexService.prototype
      const { name } = SEARCH_INDEX_SETTINGS.reviews

      expect(constructor).toBeCalledTimes(1)
      expect(constructor).toBeCalledWith(name, oidk, Subject.getObjects)
    })
  })

  describe('.getObjects', () => {
    it('fetches data from each page of reviews', async () => {
      await Subject.getObjects()

      expect(MockJudgeMe.index).toBeCalledTimes(NUM_FAKE_REQUESTS)
    })

    it('removes unpublished reviews', async () => {
      const objects = await Subject.getObjects()

      objects.forEach(o => expect(o.hidden === false).toBeTruthy())
    })
  })

  describe('#create', () => {
    const service = new Subject()

    const spyObjects = jest.spyOn(service, 'objects')

    const data = {
      body: 'love it 😍 😍 😍',
      email: object.reviewer.email,
      id: PRODUCT.product_id
    }

    beforeAll(async () => {
      // @ts-expect-error mock index property
      service.index = mockAlgolia.initIndex(SEARCH_INDEX_SETTINGS.reviews.name)
      service.oidk = 'id'

      const objects = await Subject.getObjects()
      const sobjects = objects.map(o => ({ ...object, objectID: `${o[oidk]}` }))

      spyObjects.mockReturnValue(Promise.resolve(sobjects))
    })

    it('creates review', async () => {
      await service.create(data)

      expect(MockJudgeMe.create).toBeCalledTimes(1)
      expect(MockJudgeMe.create).toBeCalledWith(data)
    })

    it('updates reviews index', async () => {
      // @ts-expect-error testing invocation
      const spySaveObjects = jest.spyOn(service.index, 'saveObjects')

      await service.create(data)

      expect(spySaveObjects).toBeCalledTimes(1)
    })
  })

  describe('#searchOptions', () => {
    const service = new Subject()

    const spy = jest.spyOn(MockSearchIndexService.prototype, 'searchOptions')

    beforeEach(() => {
      spy.mockReturnValue({})
    })

    it('formats query.curated', () => {
      const query = { curated: object.curated }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`curated:${query.curated}`)
    })

    it('formats query.featured', () => {
      const query = { featured: object.featured }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`featured:${query.featured}`)
    })

    it('formats query.hidden', () => {
      const query = { hidden: object.hidden }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`hidden:${query.hidden}`)
    })

    it('formats query.id', () => {
      const query = { id: objectID }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`id = ${query.id}`)
    })

    it('formats query.ip_address', () => {
      const query = { ip_address: object.ip_address }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`ip_address:${query.ip_address}`)
    })

    it('formats query.product_id', () => {
      const query = { product_id: object.product_external_id }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`product_external_id = ${query.product_id}`)
    })

    it('formats query.rating', () => {
      const query = { rating: object.rating }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`rating = ${query.rating}`)
    })

    it('formats query.reviewer_email', () => {
      const query = { reviewer_email: object.reviewer.email }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`reviewer.email:${query.reviewer_email}`)
    })

    it('formats query.reviewer_id', () => {
      const query = { reviewer_id: object.reviewer.id }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`reviewer.id = ${query.reviewer_id}`)
    })

    it('formats query.source', () => {
      const query = { source: object.source }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`source:${query.source}`)
    })

    it('pushes `id` into options.attributesToRetrieve', () => {
      const options = service.searchOptions({})

      expect(options.attributesToRetrieve).toContain('id')
    })
  })
})
