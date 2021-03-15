import type { AnyObject } from '@flex-development/json'
import type {
  FindCollectionsQuery,
  FindSearchIndexResourceQuery,
  GetCollectionResJSON as TObject,
  ICollectionListing,
  IProductListing,
  OrNever,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore'
import axiosShopify from '@flex-development/kustomzcore/config/axios-shopify'
import { EMPTY_SPACE } from '@flex-development/kustomzcore/config/constants'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import uniq from 'lodash/uniq'
import { SEARCH_INDEX_SETTINGS } from '../config/constants'
import ShopifyAPI from '../config/shopify-api'
import type { SearchOptions } from '../types'
import Metafields from './MetafieldService'
import SearchIndexService from './SearchIndexService'
import SEO from './SEOService'

/**
 * @file Implementation - Collection Listing Service
 * @module services/CollectionService
 */

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
   * @throws {FeathersErrorJSON}
   */
  static async getObjects(): OrNever<Promise<TObject[]>> {
    // Fetch collection listings data from Shopify
    let data = await ShopifyAPI.collectionListing.list()

    // Remove unpublished collections
    data = data.filter(data => data.published_at !== null)

    // Get objects to populate search index
    const objects: TObject[] | Promise<TObject>[] = data.map(async obj => {
      const $obj: AnyObject = { ...obj }

      // Get metafields for each collection
      $obj.metafield = await Metafields.fetch('collections', $obj.collection_id)

      // Get products for each collection
      $obj.products = await CollectionService.products($obj.collection_id)

      return $obj as TObject
    })

    return await Promise.all(objects)
  }

  /**
   * Returns an array of product listings for a collection resource.
   *
   * @async
   * @param {number} id - ID of collection to get product listings for
   * @param {number} [limit] - Max number of results. Defaults to `250`
   * @return {Promise<IProductListing[]>} Promise containing collection products
   * @throws {FeathersErrorJSON}
   */
  static async products(
    id: ICollectionListing['collection_id'],
    limit?: number
  ): OrNever<Promise<IProductListing[]>> {
    const { product_listings } = await axiosShopify<SAR.ProductListing>({
      method: 'get',
      params: { collection_id: id, limit: limit || 250 },
      url: 'product_listings'
    })

    return product_listings
  }

  /**
   * Retrieve a collection listing by handle.
   *
   * @async
   * @param {string} objectID - Handle of collection listing to retrieve
   * @param {string} [fields] - Specify fields to include
   * @return {Promise<TObject>} Promise containing collection listing data
   * @throws {FeathersErrorJSON}
   */
  async get(
    objectID: ICollectionListing['handle'],
    fields?: FindSearchIndexResourceQuery['fields']
  ): OrNever<Promise<TObject>> {
    const data = await super.get(objectID, fields)
    const listing = data as ICollectionListing

    if (SEO.includeSEO(fields)) {
      data.seo = await SEO.collection(listing, data.products)
    }

    return data
  }

  /**
   * Converts a `FindCollectionsQuery` type object into an Algolia search
   * options object.
   *
   * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
   *
   * @param {FindCollectionsQuery} [query] - Query parameters object
   * @param {string} [query.collection_id] - Find collection listing by ID
   * @param {string} [query.fields] - Comma-separated list of fields to include
   * @param {number} [query.hitsPerPage] - Number of results per page
   * @param {number} [query.length] - Result limit (used only with offset)
   * @param {string} [query.objectID] - Find resource by search index object ID
   * @param {number} [query.offset] - Offset of the first result to return
   * @param {number} [query.page] - Specify the page to retrieve
   * @param {string} [query.text] - Text to search in index
   * @return {SearchOptions} Algolia search options object
   */
  searchOptions(query: FindCollectionsQuery = {}): SearchOptions {
    const { collection_id, ...rest } = query

    // Get default search options
    const options = super.searchOptions(rest)

    // Initialize search filters array
    const filters: string[] = options.filters?.length ? [options.filters] : []

    // Add collection_id filter
    if (!isEmpty(collection_id)) filters.push(`collection_id:${collection_id}`)

    // Add collection_id to attributes
    const attributes = options.attributesToRetrieve?.concat(['collection_id'])

    return {
      ...options,
      attributesToRetrieve: uniq(attributes),
      filters: join(filters, EMPTY_SPACE)
    }
  }
}
