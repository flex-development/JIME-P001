import { axiosShopify } from '@app/config/axios'
import { QEData } from '@app/subdomains/app/interfaces'
import { QueryExecutor } from '@app/subdomains/app/models'
import { createError, Logger } from '@app/subdomains/app/utils'
import { omit } from 'lodash'
import { ICollectionListing } from 'shopify-api-node'
import {
  CollectionQuery,
  ICollectionService,
  ListCollectionsResponse
} from '../interfaces/ICollectionService'

/**
 * @file Subdomain Services - Collection Listings
 * @module subdomains/sales/services/CollectionService
 */

export default class CollectionService
  extends QueryExecutor<ICollectionListing>
  implements ICollectionService {
  /**
   * Returns an array of `ICollectionListing` objects.
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
  async find(query: CollectionQuery = {}): Promise<QEData<ICollectionListing>> {
    if (!query?.$limit) query.$limit = 250

    const { collection_listings } = await axiosShopify<ListCollectionsResponse>(
      {
        method: 'get',
        params: { limit: query.$limit },
        url: 'collection_listings'
      }
    )

    return this.query(collection_listings, omit(query, ['$limit']))
  }

  /**
   * Retrieve a collection by ID.
   *
   * @async
   * @param id - ID of collection to retrieve
   * @throws {FeathersErrorJSON}
   */
  async get(
    id: ICollectionListing['collection_id']
  ): Promise<ICollectionListing> {
    const query: CollectionQuery = { collection_id: { $eq: id } }
    const collections = (await this.find(query)) as Array<ICollectionListing>

    if (!collections.length) {
      const data = { errors: { id } }
      const error = createError(`Collection with id ${id} not found`, data, 404)

      Logger.error({ 'CollectionService.get': error })
      throw error
    }

    return collections[0]
  }

  /**
   * Retrieve a collection by handle.
   *
   * @async
   * @param handle - Handle of collection to retrieve
   * @throws {FeathersErrorJSON}
   */
  async getByHandle(
    handle: ICollectionListing['handle']
  ): Promise<ICollectionListing> {
    const query: CollectionQuery = { handle: { $eq: handle } }
    const collections = (await this.find(query)) as Array<ICollectionListing>

    if (!collections.length) {
      const data = { errors: { handle } }
      const message = `Collection with handle ${handle} not found`
      const error = createError(message, data, 404)

      Logger.error({ 'CollectionService.getByHandle': error })
      throw error
    }

    return collections[0]
  }
}
