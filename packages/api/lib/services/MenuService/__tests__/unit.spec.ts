import Subject from '..'
import '../../../config/algolia'
import { SEARCH_INDEX_SETTINGS } from '../../../config/constants'
import MockShopifyAPI from '../../../mixins/ShopifyAPI'
import MockSearchIndexService from '../../SearchIndexService'

/**
 * @file Unit Tests - MenuService
 * @module lib/services/MenuService/tests/unit
 */

jest.mock('../../../config/algolia')
jest.mock('../../../mixins/ShopifyAPI')
jest.mock('../../SearchIndexService')

describe('unit:lib/services/MenuService', () => {
  describe('constructor', () => {
    it('calls SearchIndexService class constructor', () => {
      new Subject()

      const { constructor } = MockSearchIndexService.prototype
      const { name } = SEARCH_INDEX_SETTINGS.menus

      expect(constructor).toBeCalledTimes(1)
      expect(constructor).toBeCalledWith(name, 'handle', Subject.getObjects)
    })
  })

  describe('.getObjects', () => {
    it('sources data from shopify api', async () => {
      await Subject.getObjects()

      expect(MockShopifyAPI.menus).toBeCalledTimes(1)
    })
  })
})
