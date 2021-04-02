import OBJECTS from '@kapi/tests/fixtures/shopify/policies'
import Subject from '..'
import '../../../config/algolia'
import { SEARCH_INDEX_SETTINGS } from '../../../config/constants'
import MockSEO from '../../../mixins/SEO'
import MockShopifyAPI from '../../../mixins/ShopifyAPI'
import MockSearchIndexService from '../../SearchIndexService'

/**
 * @file Unit Tests - PolicyService
 * @module lib/services/PolicyService/tests/unit
 */

jest.mock('../../../config/algolia')
jest.mock('../../../mixins/ShopifyAPI')
jest.mock('../../../mixins/SEO')
jest.mock('../../SearchIndexService')

describe('unit:lib/services/PolicyService', () => {
  const object = OBJECTS[0]
  const objectID = object.handle

  describe('constructor', () => {
    it('calls SearchIndexService class constructor', () => {
      new Subject()

      const { constructor } = MockSearchIndexService.prototype
      const { name } = SEARCH_INDEX_SETTINGS.policies

      expect(constructor).toBeCalledTimes(1)
      expect(constructor).toBeCalledWith(name, 'handle', Subject.getObjects)
    })
  })

  describe('.getObjects', () => {
    it('sources data from shopify api', async () => {
      await Subject.getObjects()

      expect(MockShopifyAPI.policies).toBeCalledTimes(1)
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

    it('fetches seo data for policy', async () => {
      const SEOpolicy = jest.spyOn(MockSEO, 'policy')
      const includeSEO = jest.spyOn(MockSEO, 'includeSEO')

      includeSEO.mockReturnValue(true)
      SEOpolicy.mockReturnValue(Promise.resolve({}))

      const fields = 'body,seo,title'

      const result = await service.get(objectID, fields)

      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith(objectID, fields)

      expect(SEOpolicy).toBeCalledTimes(1)
      expect(SEOpolicy).toBeCalledWith(object)

      expect(result.seo).toBeDefined()
    })
  })
})
