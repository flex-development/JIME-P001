import type { AnyObject } from '@flex-development/json'
import type {
  FindProductsQuery,
  FindSearchIndexResourceQuery,
  GetProductResJSON as TObject,
  IProductListing,
  OrNever
} from '@flex-development/kustomzcore'
import { EMPTY_SPACE } from '@flex-development/kustomzcore/config/constants'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import uniq from 'lodash/uniq'
import { SEARCH_INDEX_SETTINGS } from '../config/constants'
import ShopifyAPI from '../config/shopify-api'
import type { SearchOptions } from '../types'
import Metafields from './MetafieldService'
import SearchIndexService from './SearchIndexService'
import SEOService from './SEOService'

/**
 * @file Implementation - Product Service
 * @module services/ProductService
 */

/**
 * Handles interactions with product listing resources.
 *
 * @class
 * @extends SearchIndexService
 */
export default class ProductService extends SearchIndexService<TObject> {
  /**
   * Initializes a new Product Listing service instance.
   */
  constructor() {
    const { products } = SEARCH_INDEX_SETTINGS
    super(products.name, 'handle', ProductService.getObjects)
  }

  /**
   * Returns an array of augmented Shopify product listing objects to
   * populate the search index.
   *
   * @async
   * @return {Promise<TObject[]>} Promise containing initial index objects
   * @throws {FeathersErrorJSON}
   */
  static async getObjects(): OrNever<Promise<TObject[]>> {
    // Fetch product listings data from Shopify
    const data = await ShopifyAPI.productListing.list()

    // Get objects to populate search index
    const objects: TObject[] | Promise<TObject>[] = data.map(async obj => {
      const $obj: AnyObject = { ...obj }

      // Get metafields for each product
      $obj.metafield = await Metafields.fetch('products', $obj.product_id)

      return $obj as TObject
    })

    return await Promise.all(objects)
  }

  /**
   * Retrieve a product listing by handle.
   *
   * If including SEO data, append `.{sku}` to {@param objectID}, where `{sku}`
   * is the `sku` value of a product listing variant.
   *
   * @async
   * @param {string} objectID - Handle of product listing to retrieve
   * @param {string} [fields] - Specify fields to include
   * @return {Promise<TObject>} Promise containing product listing data
   * @throws {FeathersErrorJSON}
   */
  async get(
    objectID: IProductListing['handle'],
    fields?: FindSearchIndexResourceQuery['fields']
  ): OrNever<Promise<TObject>> {
    const { 0: handle, 1: sku } = `${objectID}`.split('.')
    const data = await super.get(handle, fields)

    if (SEOService.includeSEO(fields)) {
      data.seo = await SEOService.product(data as IProductListing, sku)
    }

    return data
  }

  /**
   * Converts a `FindProductsQuery` type object into an Algolia search
   * options object.
   *
   * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
   *
   * @param {FindProductsQuery} [query] - Query parameters object
   * @param {string} [query.fields] - Comma-separated list of fields to include
   * @param {number} [query.hitsPerPage] - Number of results per page
   * @param {number} [query.length] - Result limit (used only with offset)
   * @param {string} [query.objectID] - Find resource by search index object ID
   * @param {number} [query.offset] - Offset of the first result to return
   * @param {number} [query.page] - Specify the page to retrieve
   * @param {string} [query.product_id] - Find product listing by ID
   * @param {string} [query.text] - Text to search in index
   * @return {SearchOptions} Algolia search options object
   */
  searchOptions(query: FindProductsQuery = {}): SearchOptions {
    const { product_id, ...rest } = query

    // Get default search options
    const options = super.searchOptions(rest)

    // Initialize search filters array
    const filters: string[] = options.filters?.length ? [options.filters] : []

    // Add product_id filter
    if (!isEmpty(product_id)) filters.push(`product_id:${product_id}`)

    // Add product_id to attributes
    const attributes = options.attributesToRetrieve?.concat(['product_id'])

    return {
      ...options,
      attributesToRetrieve: uniq(attributes),
      filters: join(filters, EMPTY_SPACE)
    }
  }
}
