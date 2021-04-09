import type {
  OrNever,
  TObject as ObjectType
} from '@flex-development/kustomzcore'
import { SEARCH_INDEX_SETTINGS } from '../../config/constants'
import ShopifyAPI from '../../mixins/ShopifyAPI'
import SearchIndexService from '../SearchIndexService'

/**
 * @file Implementation - Menu Service
 * @module lib/services/MenuService
 */

export type TObject = ObjectType.Menu

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
   * @return {Promise<TObject[]>} Promise containing index objects
   * @throws {ErrorJSON}
   */
  static async getObjects(): OrNever<Promise<TObject[]>> {
    return await ShopifyAPI.menus()
  }
}
