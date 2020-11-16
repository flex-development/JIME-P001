import { axiosShopify } from '@app/config/axios'
import { QEData } from '@app/subdomains/app/interfaces'
import { QueryExecutor } from '@app/subdomains/app/models'
import { createError, Logger } from '@app/subdomains/app/utils'
import { omit } from 'lodash'
import { ICollectionListing, IProductListing } from 'shopify-api-node'
import {
  IProductService,
  ListProductsResponse,
  ProductQuery
} from '../interfaces/IProductService'

/**
 * @file Subdomain Services - Product Listings
 * @module subdomains/sales/services/ProductService
 */

export default class ProductService
  extends QueryExecutor<IProductListing>
  implements IProductService {
  /**
   * Returns an array of `IProductListing` objects.
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
   * @returns Array of product listing objects
   */
  async find(query: ProductQuery = {}): Promise<QEData<IProductListing>> {
    if (!query?.$limit) query.$limit = 250

    const { product_listings } = await axiosShopify<ListProductsResponse>({
      method: 'get',
      params: { limit: query.$limit },
      url: 'product_listings'
    })

    return this.query(product_listings, omit(query, ['$limit']))
  }

  /**
   * Returns an array of `IProductListing` objects for the collection with the
   * id {@param collection_id}.
   *
   * Data can be sorted, filtered, and paginated using {@param query}.
   *
   * @async
   * @param collection_id - ID of collection to get products for
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
   * @returns Array of product listing objects
   * @returns Array of product listing objects
   */
  async findByCollection(
    collection_id: ICollectionListing['collection_id'],
    query: ProductQuery = {}
  ): Promise<QEData<IProductListing>> {
    if (!query?.$limit) query.$limit = 250

    const { product_listings } = await axiosShopify<ListProductsResponse>({
      method: 'get',
      params: { collection_id, limit: query.$limit },
      url: 'product_listings'
    })

    return this.query(product_listings, omit(query, ['$limit']))
  }

  /**
   * Retrieve a product by ID.
   *
   * @async
   * @param id - ID of product to retrieve
   * @throws {FeathersErrorJSON}
   */
  async get(id: IProductListing['product_id']): Promise<IProductListing> {
    const query: ProductQuery = { product_id: { $eq: id } }
    const products = (await this.find(query)) as Array<IProductListing>

    if (!products.length) {
      const data = { errors: { id } }
      const error = createError(`Product with id ${id} not found`, data, 404)

      Logger.error({ 'ProductService.get': error })
      throw error
    }

    return products[0]
  }

  /**
   * Retrieve a product by handle.
   *
   * @async
   * @param handle - Handle of product to retrieve
   * @throws {FeathersErrorJSON}
   */
  async getByHandle(handle: string): Promise<IProductListing> {
    const query: ProductQuery = { handle: { $eq: handle } }
    const products = (await this.find(query)) as Array<IProductListing>

    if (!products.length) {
      const data = { errors: { handle } }
      const message = `Product with handle ${handle} not found`
      const error = createError(message, data, 404)

      Logger.error({ 'ProductService.getByHandle': error })
      throw error
    }

    return products[0]
  }
}
