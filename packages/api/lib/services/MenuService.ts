import type {
  GetMenuResJSON as TObject,
  OrNever,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore'
import axiosShopify from '@flex-development/kustomzcore/config/axios-shopify'
import { SEARCH_INDEX_SETTINGS } from '../config/constants'
import SearchIndexService from './SearchIndexService'

/**
 * @file Implementation - Menu Service
 * @module services/MenuService
 */

/**
 * Handles interactions with Shopify menu resources.
 *
 * @class
 * @extends SearchIndexService
 */
export default class MenuService extends SearchIndexService<TObject> {
  /**
   * Initializes a new Menu service instance.
   */
  constructor() {
    super(SEARCH_INDEX_SETTINGS.menus.name, 'handle', MenuService.getObjects)
  }

  /**
   * Fetches menus data from Shopify and returns an array of objects to populate
   * the search index.
   *
   * @async
   * @return {Promise<TObject[]>} Promise containing initial index objects
   * @throws {FeathersErrorJSON}
   */
  static async getObjects(): OrNever<Promise<TObject[]>> {
    return (await axiosShopify<SAR.Menus>({}, true)).menus || []
  }
}
