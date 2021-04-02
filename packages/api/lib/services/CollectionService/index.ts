import type { AnyObject } from '@flex-development/json'
import type {
  APIQuery,
  ICollectionListing,
  OrNever,
  TObject as ObjectType
} from '@flex-development/kustomzcore'
import { EMPTY_SPACE } from '@flex-development/kustomzcore/config/constants'
import isNumber from 'lodash/isNumber'
import join from 'lodash/join'
import uniq from 'lodash/uniq'
import { SEARCH_INDEX_SETTINGS } from '../../config/constants'
import SEO from '../../mixins/SEO'
import ShopifyAPI from '../../mixins/ShopifyAPI'
import type { SearchOptions, TObjectEnhanced } from '../../types'
import SearchIndexService from '../SearchIndexService'

/**
 * @file Implementation - Collection Listing Service
 * @module lib/services/CollectionService
 */

export type TObject = ObjectType.Collection

/**
 * Handles interactions with collection listing resources.
 *
 * @class
 * @extends SearchIndexService
 */
export default class CollectionService extends SearchIndexService<TObject> {
  /**
   * Initializes a new Collection Listing service instance.
   */
  constructor() {
    const { collections } = SEARCH_INDEX_SETTINGS
    super(collections.name, 'handle', CollectionService.getObjects)
  }

  /**
   * Returns an array of augmented Shopify collection listing objects to
   * populate the search index.
   *
   * @async
   * @return {Promise<TObject[]>} Promise containing initial index objects
   * @throws {ErrorJSON}
   */
  static async getObjects(): OrNever<Promise<TObject[]>> {
    // Fetch collection listings data from Shopify
    const data = await ShopifyAPI.collectionListings()

    // Get objects to populate search index
    const objects: TObject[] | Promise<TObject>[] = data.map(async obj => {
      const $obj: AnyObject = { ...obj }

      const { collection_id } = $obj

      // Get metafields for each collection
      $obj.metafield = await ShopifyAPI.metafield('collections', collection_id)

      // Get products for each collection
      $obj.products = await ShopifyAPI.productListings({ collection_id })

      return $obj as TObject
    })

    return await Promise.all(objects)
  }

  /**
   * Retrieve a collection listing by handle.
   *
   * @async
   * @param {string} objectID - Handle of collection listing to retrieve
   * @param {string} [fields] - Specify fields to include
   * @return {TObjectEnhanced<TObject>} Promise containing collection listing
   */
  async get(
    objectID: ICollectionListing['handle'],
    fields?: APIQuery.Collection.Get['fields']
  ): OrNever<Promise<TObjectEnhanced<TObject>>> {
    const data: TObjectEnhanced<TObject> = await super.get(objectID, fields)

    if (SEO.includeSEO(fields)) {
      data.seo = await SEO.collection(data, data.products)
    }

    return data
  }

  /**
   * Converts a `Collections` service query object into an Algolia search
   * options object.
   *
   * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
   *
   * @param {APIQuery.Collection.Find} [query] - Query parameters
   * @param {string} [query.collection_id] - Find collection listing by ID
   * @param {string} [query.fields] - Comma-separated list of fields to include
   * @param {number} [query.hitsPerPage] - Number of results per page
   * @param {number} [query.length] - Result limit (used only with offset)
   * @param {number} [query.limit] - Number of hits to retrieve
   * @param {string} [query.objectID] - Find resource by search index objectID
   * @param {number} [query.offset] - Offset of the first result to return
   * @param {number} [query.page] - Specify the page to retrieve
   * @param {string} [query.text] - Text to search in index
   * @return {SearchOptions} Algolia search options object
   */
  searchOptions(query: APIQuery.Collection.Find = {}): SearchOptions {
    const { collection_id = null, ...rest } = query

    // Get default search options
    const { attributesToRetrieve = [], ...options } = super.searchOptions(rest)

    // Initialize search filters array
    const filters: string[] = options.filters?.length ? [options.filters] : []

    // Add collection_id filter
    if (isNumber(JSON.parse(`${collection_id}`))) {
      filters.push(`collection_id = ${collection_id}`)
    }

    // Add collection_id to attributes
    const attributes = attributesToRetrieve.concat(['collection_id'])

    return {
      ...options,
      attributesToRetrieve: uniq(attributes),
      filters: join(filters, EMPTY_SPACE)
    }
  }
}
