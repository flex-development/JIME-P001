import OBJECTS from '@kapi/tests/fixtures/shopify/collections'
import Subject from '..'
import '../../../config/algolia'
import { SEARCH_INDEX_SETTINGS } from '../../../config/constants'
import MockSEO from '../../../mixins/SEO'
import MockShopifyAPI from '../../../mixins/ShopifyAPI'
import MockSearchIndexService from '../../SearchIndexService'

/**
 * @file Unit Tests - CollectionService
 * @module lib/services/CollectionService/tests/unit
 */

jest.mock('../../../config/algolia')
jest.mock('../../../mixins/ShopifyAPI')
jest.mock('../../../mixins/SEO')
jest.mock('../../SearchIndexService')

describe('unit:lib/services/CollectionService', () => {
  const object = OBJECTS[0]
  const objectID = object.handle

  describe('constructor', () => {
    it('calls SearchIndexService class constructor', () => {
      new Subject()

      const { constructor } = MockSearchIndexService.prototype
      const { name } = SEARCH_INDEX_SETTINGS.collections

      expect(constructor).toBeCalledTimes(1)
      expect(constructor).toBeCalledWith(name, 'handle', Subject.getObjects)
    })
  })

  describe('.getObjects', () => {
    it('fetches collection metafields', async () => {
      const objects = await Subject.getObjects()

      expect(MockShopifyAPI.metafield).toBeCalledTimes(OBJECTS.length)

      objects.forEach(obj => expect(obj.metafield).toBeDefined())
    })

    it('fetches collection products', async () => {
      const objects = await Subject.getObjects()

      expect(MockShopifyAPI.productListings).toBeCalledTimes(OBJECTS.length)

      objects.forEach(obj => expect(obj.products).toBeDefined())
    })
  })

  describe('#get', () => {
    const service = new Subject()

    const spy = jest.spyOn(MockSearchIndexService.prototype, 'get')

    beforeEach(() => {
      spy.mockReturnValue(Promise.resolve(object))
    })

    it('fetches search index object', async () => {
      const result = await service.get(objectID)

      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith(objectID, undefined)

      expect(result).toMatchObject(object)
    })

    it('fetches seo data for collection listing', async () => {
      const SEOcollection = jest.spyOn(MockSEO, 'collection')
      const includeSEO = jest.spyOn(MockSEO, 'includeSEO')

      includeSEO.mockReturnValue(true)
      SEOcollection.mockReturnValue(Promise.resolve({}))

      const fields = 'body_html,products,seo,title'

      const result = await service.get(objectID, fields)

      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith(objectID, fields)

      expect(SEOcollection).toBeCalledTimes(1)
      expect(SEOcollection).toBeCalledWith(object, undefined)

      expect(result.seo).toBeDefined()
    })
  })

  describe('#searchOptions', () => {
    const service = new Subject()

    const query = { collection_id: object.collection_id }

    const spy = jest.spyOn(MockSearchIndexService.prototype, 'searchOptions')

    beforeEach(() => {
      spy.mockReturnValue({})
    })

    it('formats query.collection_id', () => {
      const options = service.searchOptions(query)

      expect(options.filters).toBe(`collection_id = ${query.collection_id}`)
    })

    it('pushes `collection_id` into options.attributesToRetrieve', () => {
      const options = service.searchOptions(query)

      expect(options.attributesToRetrieve).toContain('collection_id')
    })
  })
})
