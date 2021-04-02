import type { AnyObject } from '@flex-development/json'
import OBJECTS from '@kapi/tests/fixtures/shopify/pages'
import Subject from '..'
import '../../../config/algolia'
import { SEARCH_INDEX_SETTINGS } from '../../../config/constants'
import MockSEO from '../../../mixins/SEO'
import MockSearchIndexService from '../../SearchIndexService'

/**
 * @file Unit Tests - PageService
 * @module lib/services/PageService/tests/unit
 */

jest.mock('../../../config/algolia')
jest.mock('../../../mixins/ShopifyAPI')
jest.mock('../../../mixins/SEO')
jest.mock('../../SearchIndexService')

describe('unit:lib/services/PageService', () => {
  const object = OBJECTS[0]
  const objectID = object.handle

  describe('constructor', () => {
    it('calls SearchIndexService class constructor', () => {
      new Subject()

      const { constructor } = MockSearchIndexService.prototype
      const { name } = SEARCH_INDEX_SETTINGS.pages

      expect(constructor).toBeCalledTimes(1)
      expect(constructor).toBeCalledWith(name, 'handle', Subject.getObjects)
    })
  })

  describe('.getObjects', () => {
    it('does not include "API - Menus" page', async () => {
      const objects = await Subject.getObjects()

      objects.forEach(obj => expect(obj.handle).not.toBe('api-menus'))
    })

    it('fetches page metafields', async () => {
      const objects = await Subject.getObjects()

      objects.forEach(obj => expect(obj.metafield).toBeDefined())
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

    it('fetches seo data for page', async () => {
      const SEOpage = jest.spyOn(MockSEO, 'page')
      const includeSEO = jest.spyOn(MockSEO, 'includeSEO')

      includeSEO.mockReturnValue(true)
      SEOpage.mockReturnValue(Promise.resolve({}))

      const fields = 'body_html,metafield,seo'

      const result = await service.get(objectID, fields)

      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith(objectID, fields)

      expect(SEOpage).toBeCalledTimes(1)
      expect(SEOpage).toBeCalledWith((object as AnyObject).metafield)

      expect(result.seo).toBeDefined()
    })
  })

  describe('#searchOptions', () => {
    const service = new Subject()

    const spy = jest.spyOn(MockSearchIndexService.prototype, 'searchOptions')

    beforeEach(() => {
      spy.mockReturnValue({})
    })

    it('formats query.author', () => {
      const query = { author: 'foo' }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`author:"${query.author}"`)
    })

    it('formats query.id', () => {
      const query = { id: object.id }

      const options = service.searchOptions(query)

      expect(options.filters).toBe(`id = ${query.id}`)
    })
  })
})
