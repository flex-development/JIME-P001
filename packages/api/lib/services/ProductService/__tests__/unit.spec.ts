import type { APIQuery } from '@flex-development/kustomzcore/types'
import OBJECTS from '@kapi/tests/fixtures/shopify/products'
import Subject from '..'
import '../../../config/algolia'
import { SEARCH_INDEX_SETTINGS } from '../../../config/constants'
import MockSEO from '../../../mixins/SEO'
import MockShopifyAPI from '../../../mixins/ShopifyAPI'
import MockSearchIndexService from '../../SearchIndexService'

/**
 * @file Unit Tests - ProductService
 * @module lib/services/ProductService/tests/unit
 */

jest.mock('../../../config/algolia')
jest.mock('../../../mixins/ShopifyAPI')
jest.mock('../../../mixins/SEO')
jest.mock('../../SearchIndexService')

describe('unit:lib/services/ProductService', () => {
  const object = OBJECTS[0]
  const objectID = object.handle

  describe('constructor', () => {
    it('calls SearchIndexService class constructor', () => {
      new Subject()

      const { constructor } = MockSearchIndexService.prototype
      const { name } = SEARCH_INDEX_SETTINGS.products

      expect(constructor).toBeCalledTimes(1)
      expect(constructor).toBeCalledWith(name, 'handle', Subject.getObjects)
    })
  })

  describe('.getObjects', () => {
    it('fetches product metafields', async () => {
      const objects = await Subject.getObjects()

      expect(MockShopifyAPI.metafield).toBeCalledTimes(OBJECTS.length)

      objects.forEach(obj => expect(obj.metafield).toBeDefined())
    })
  })

  describe('#findOne', () => {
    const service = new Subject()

    const spy = jest.spyOn(service, 'get')

    it('calls #get with product listing handle', async () => {
      const query: APIQuery.Product.Get = { objectID }

      await service.findOne(query)

      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith(query.objectID, undefined)
    })

    it('calls #get with product listing handle and variant sku', async () => {
      const query: APIQuery.Product.Get = {
        objectID,
        sku: object.variants[0].sku
      }

      const objectIDWithSKU = `${query.objectID}.${query.sku}`

      const spy = jest.spyOn(service, 'get')

      await service.findOne(query)

      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith(objectIDWithSKU, undefined)
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

    describe('fetches seo data for product listing', () => {
      const SEOproduct = jest.spyOn(MockSEO, 'product')
      const includeSEO = jest.spyOn(MockSEO, 'includeSEO')

      const fields = 'available,body_html,handle,images,seo,tags,title,variants'

      beforeEach(() => {
        includeSEO.mockReturnValue(true)
        SEOproduct.mockReturnValue(Promise.resolve({}))
      })

      it('with sku', async () => {
        const { sku } = object.variants[0]

        const objectIDWithSKU = `${objectID}.${sku}`

        const result = await service.get(objectIDWithSKU, fields)

        expect(spy).toBeCalledTimes(1)
        expect(spy).toBeCalledWith(objectID, fields)

        expect(SEOproduct).toBeCalledTimes(1)
        expect(SEOproduct).toBeCalledWith(object, sku)

        expect(result.seo).toBeDefined()
      })

      it('without sku', async () => {
        const result = await service.get(objectID, fields)

        expect(spy).toBeCalledTimes(1)
        expect(spy).toBeCalledWith(objectID, fields)

        expect(SEOproduct).toBeCalledTimes(1)
        expect(SEOproduct).toBeCalledWith(object, undefined)

        expect(result.seo).toBeDefined()
      })
    })
  })

  describe('#searchOptions', () => {
    const service = new Subject()

    const spy = jest.spyOn(MockSearchIndexService.prototype, 'searchOptions')

    beforeEach(() => {
      spy.mockReturnValue({})
    })

    it('formats query.product_id', () => {
      const query = { product_id: object.product_id }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`product_id = ${query.product_id}`)
    })
  })
})
