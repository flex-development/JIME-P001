import type { ShopifyAPIResponses as SAR } from '@flex-development/kustomzcore'
import { createError } from '@flex-development/kustomzcore'
import { axiosShopify, INDEX_SETTINGS } from '../config'
import type {
  FindMenusQuery as Query,
  GetMenuResJSON as TObject,
  SearchIndexName,
  SearchOptions
} from '../types'
import { search, shopifySearchOptions } from '../utils'

/**
 * @file Implementation - Menu Service
 * @module lib/services/MenuService
 */

export default class MenuService {
  static index_name: SearchIndexName = INDEX_SETTINGS.menus.name

  /**
   * Executes a menu resource search.
   *
   * @async
   * @param query - Search index query text
   * @param options - Search index options
   */
  static async find(
    query = '',
    options: SearchOptions = {}
  ): Promise<TObject[]> {
    const objects = await MenuService.indexObjects()
    return search(MenuService.index_name, objects, query, options)
  }

  /**
   * Retrieve a menu by handle.
   *
   * @async
   * @param handle - Handle of menu to retrieve
   * @param fields - Specify fields to include for each object
   * @throws {FeathersErrorJSON}
   */
  static async get(
    handle: NonNullable<Query['handle']>,
    fields?: Query['fields']
  ): Promise<TObject> {
    // Get search index options
    const options = MenuService.searchOptions({ fields, handle })

    // Execute search
    const results = await MenuService.find('', options)

    // Throw error if resource isn't found
    if (!results.length) {
      const data = { errors: { handle }, fields }
      const message = `Menu with handle "${handle}" not found`

      throw createError(message, data, 404)
    }

    return results[0]
  }

  /**
   * Returns an array of objects to populate the search index.
   *
   * @async
   */
  static async indexObjects(): Promise<TObject[]> {
    // Fetch menus data from Shopify
    const data = (await axiosShopify<SAR.Menus>({}, true)).menus || []

    // Keep objectID consistent with collection listing ID
    return data.map(obj => ({ ...obj, objectID: obj.handle }))
  }

  /**
   * Converts a menus query object into an Algolia search options object.
   *
   * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
   *
   * @param query - Collection query from API request
   * @param query.fields - Comma-separated list of fields to include
   * @param query.handle - Find menu by handle
   * @param query.id - Find menu by ID
   */
  static searchOptions(query: Query = {}): SearchOptions {
    return shopifySearchOptions(query)
  }
}
