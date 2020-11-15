import ShopifyBuy, { ShopifyBuyClient } from '@app/config/shopify-buy'
import { createError, Logger, QEData, QueryExecutor } from '@app/subdomains/app'
import {
  AnyObject,
  CollectionResource
} from '@flex-development/kustomzdesign/types'
import {
  CollectionQuery,
  ICollectionService
} from '../interfaces/ICollectionService'
import { toImageResource } from '../utils'
import ProductService from './ProductService'

/**
 * @file Subdomain Services - Collection Service
 * @module subdomains/products/services/CollectionService
 */

/**
 * Faciliates all actions with Shopify product resources.
 *
 * @class CollectionService
 */
export default class CollectionService
  extends QueryExecutor<CollectionResource>
  implements ICollectionService {
  shopify: ShopifyBuy.CollectionResource

  /**
   * Creates a new Collection service instance.
   */
  constructor() {
    super()
    this.shopify = ShopifyBuyClient.collection
  }

  /**
   * Converts a GraphQL collection object from the Shopify JS Buy SDK into a
   * `CollectionResource` object.
   *
   * @param collection - Serialized GraphQL product object
   * @returns Formatted product resource object
   */
  static toCollectionResource(
    collection: ShopifyBuy.Collection
  ): CollectionResource {
    // Type cast required because shopify-buy@2.11.0 type defs are not correct
    const {
      description,
      handle,
      id,
      image,
      products,
      title
    } = collection as AnyObject

    return {
      description,
      handle,
      id,
      image: toImageResource(image),
      products: products.map((product: ShopifyBuy.Product) => {
        return ProductService.toProductResource(product)
      }),
      title
    }
  }

  /**
   * Returns an array of `CollectionResource` objects.
   * Data can be sorted, filtered, and paginated using {@param query}.
   *
   * @async
   * @param query - Query parameters
   * @param query.$limit - Maximum number of items to return. To return data
   * from the end of the array, pass a negative value
   * @param query.$select - Pick which fields to include in the result
   * @param query.$skip - Skip the specified number of results
   * @param query.$sort - Property to sort by mapped and order (1 asc, -1 des)
   * @param query[foo] - Object containing queries for specified property
   * @param query[foo].$eq - Matches values that are equal to a specified value
   * @param query[foo].$gt - Matches values where value > query.$gt
   * @param query[foo].$gte - Matches values where value >= query.$gte
   * @param query[foo].$in - Matches any of the values specified in an array
   * @param query[foo].$lt - Matches values where value < query.$lt
   * @param query[foo].$lte - Matches values where value <= query.$lte
   * @param query[foo].$ne - Matches all values where value !== query.$ne
   * @param query[foo].$nin - Matches none of the values specified in an array
   * @returns Array of Collection resource objects
   */
  async find(query: CollectionQuery = {}): Promise<QEData<CollectionResource>> {
    if (!query?.$limit) query.$limit = 250

    const data = await this.shopify.fetchAllWithProducts().then(c => c)
    const collections = data.map(c => CollectionService.toCollectionResource(c))

    return collections
  }

  /**
   * Retrieve a collection by ID.
   *
   * @async
   * @param id - ID of collection to retrieve
   * @throws {FeathersErrorJSON}
   */
  async get(id: string): Promise<CollectionResource> {
    const collections = await this.find({ id: { $eq: id } })

    if (!collections.length) {
      const data = { errors: { id } }
      const error = createError(`Collection with id ${id} not found`, data, 404)

      Logger.error({ 'CollectionService.get': error })
      throw error
    }

    return collections[0] as CollectionResource
  }

  /**
   * Retrieve a collection by handle.
   *
   * @async
   * @param handle - Handle of collection to retrieve
   * @throws {FeathersErrorJSON}
   */
  async getByHandle(handle: string): Promise<CollectionResource> {
    const collections = await this.find({ handle: { $eq: handle } })

    if (!collections.length) {
      const data = { errors: { handle } }
      const message = `Collection with handle ${handle} not found`
      const error = createError(message, data, 404)

      Logger.error({ 'CollectionService.getByHandle': error })
      throw error
    }

    return collections[0] as CollectionResource
  }
}
