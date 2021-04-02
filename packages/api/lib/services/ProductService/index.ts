import type { AnyObject } from '@flex-development/json'
import type {
  APIQuery,
  IProductListing,
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
 * @file Implementation - Product Service
 * @module lib/services/ProductService
 */

export type TObject = ObjectType.Product

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
   */
  static async getObjects(): OrNever<Promise<TObject[]>> {
    // Fetch product listings data from Shopify
    const data = await ShopifyAPI.productListings()

    // Get objects to populate search index
    const objects: TObject[] | Promise<TObject>[] = data.map(async obj => {
      const $obj: AnyObject = { ...obj }

      // Get metafields for each product
      $obj.metafield = await ShopifyAPI.metafield('products', $obj.product_id)

      return $obj as TObject
    })

    return await Promise.all(objects)
  }

  /**
   * Performs a search for a single product listing.
   *
   * @async
   * @param {APIQuery.Product.Get} query - Query parameters
   * @param {string} [query.fields] - Comma-separated list of fields to include
   * @param {string} query.objectID - Product ID of listing to retrieve
   * @param {string} [query.sku] - SKU of variant to generate SEO for
   * @return {Promise<TObject>} Promise containing product listing
   */
  async findOne(query: APIQuery.Product.Get): OrNever<Promise<TObject>> {
    const { fields, objectID, sku } = query

    const $objectID = `${objectID}${sku ? `.${sku}` : ''}`

    return await this.get($objectID, fields)
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
   * @return {Promise<TObjectEnhanced<TObject>>} Promise containing listing
   */
  async get(
    objectID: IProductListing['handle'],
    fields?: APIQuery.Product.Get['fields']
  ): OrNever<Promise<TObjectEnhanced<TObject>>> {
    const { 0: handle, 1: sku } = `${objectID}`.split('.')

    const data: TObjectEnhanced<TObject> = await super.get(handle, fields)

    if (SEO.includeSEO(fields)) {
      data.seo = await SEO.product(data as IProductListing, sku)
    }

    return data
  }

  /**
   * Converts a `Product` service query into an Algolia search options object.
   *
   * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
   *
   * @param {APIQuery.Product.Find} [query] - Query parameters
   * @param {string} [query.fields] - Comma-separated list of fields to include
   * @param {number} [query.hitsPerPage] - Number of results per page
   * @param {number} [query.length] - Result limit (used only with offset)
   * @param {number} [query.limit] - Number of hits to retrieve
   * @param {string} [query.objectID] - Find resource by search index objectID
   * @param {number} [query.offset] - Offset of the first result to return
   * @param {number} [query.page] - Specify the page to retrieve
   * @param {string} [query.product_id] - Find product listing by ID
   * @param {string} [query.text] - Text to search in index
   * @return {SearchOptions} Algolia search options object
   */
  searchOptions(query: APIQuery.Product.Find = {}): SearchOptions {
    const { product_id = null, ...rest } = query

    // Get default search options
    const { attributesToRetrieve = [], ...options } = super.searchOptions(rest)

    // Initialize search filters array
    const filters: string[] = options.filters?.length ? [options.filters] : []

    // Add product_id filter
    if (isNumber(JSON.parse(`${product_id}`))) {
      filters.push(`product_id = ${product_id}`)
    }

    // Add product_id to attributes
    const attributes = attributesToRetrieve.concat(['product_id'])

    return {
      ...options,
      attributesToRetrieve: uniq(attributes),
      filters: join(filters, EMPTY_SPACE)
    }
  }
}
