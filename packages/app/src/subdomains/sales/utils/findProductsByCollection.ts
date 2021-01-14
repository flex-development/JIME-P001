import { axiosShopify } from '@app/config/axios'
import {
  DataArray,
  DataArrayQueryParams
} from '@flex-development/json/interfaces'
import { ArrayQueryExecutor } from '@flex-development/json/models'
import {
  ICollectionListing,
  IProductListing,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore/types/shopify'
import omit from 'lodash/omit'

/**
 * @file Implementation - findProductsByCollection
 * @module subdomains/sales/utils/findProductsByCollection
 */

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
 * @return Array of product listing objects
 * @return Array of product listing objects
 */
const findProductsByCollection = async (
  collection_id: ICollectionListing['collection_id'],
  query: DataArrayQueryParams = {}
): Promise<DataArray<IProductListing>> => {
  const AQE = new ArrayQueryExecutor<ICollectionListing>()

  if (!query?.$limit) query.$limit = 250

  const { product_listings } = await axiosShopify<SAR.ProductListing>({
    method: 'get',
    params: { collection_id, limit: query.$limit },
    url: 'product_listings'
  })

  return AQE.query(product_listings, omit(query, ['$limit']))
}

export default findProductsByCollection
