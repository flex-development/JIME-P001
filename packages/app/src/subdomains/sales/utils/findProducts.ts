import { axiosShopify } from '@app/config/axios'
import {
  DataArray,
  DataArrayQueryParams
} from '@flex-development/json/interfaces'
import { ArrayQueryExecutor } from '@flex-development/json/models'
import { AnyObject } from '@flex-development/json/utils/types'
import {
  IProductListing,
  IProductListingVariant,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore/types/shopify'
import omit from 'lodash/omit'
import pick from 'lodash/pick'

/**
 * @file Implementation - findProducts
 * @module subdomains/sales/utils/findProducts
 */

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
 * @return Array of product listing objects
 */
const findProducts = async (
  query: DataArrayQueryParams = {}
): Promise<DataArray<IProductListing>> => {
  const AQE = new ArrayQueryExecutor<IProductListing>()

  if (!query?.$limit) query.$limit = 250

  const { product_listings } = await axiosShopify<SAR.ProductListing>({
    method: 'get',
    params: { limit: query.$limit },
    url: 'product_listings'
  })

  // Keys of additional search properties
  const asp = ['variant_skus', 'variant_titles']

  // Add additional search functionality
  let searchable: Array<AnyObject> = []
  product_listings.forEach((product: AnyObject) => {
    const pcopy = { ...product }

    // Add properties to product listings
    const variant_skus: string[] = []
    const variant_titles: string[] = []

    pcopy.variants.forEach((variant: IProductListingVariant) => {
      variant_skus.push(variant.sku.toLowerCase())
      variant_titles.push(variant.title.toLowerCase())
    })

    // Normalize search values
    pcopy.body_html = pcopy.body_html.toLowerCase()
    pcopy.product_type = pcopy.product_type.toLowerCase()
    pcopy.tags = pcopy.tags.split(',')
    pcopy.title = pcopy.title.toLowerCase()
    pcopy.vendor = pcopy.vendor.toLowerCase()

    searchable.push({ ...pcopy, variant_skus, variant_titles })
  })

  // Execute query
  searchable = AQE.query(searchable, omit(query, ['$limit']))

  // Get data with original product props and values
  const listings: DataArray<IProductListing> = []
  searchable.forEach(({ handle }) => {
    const found = product_listings.find(listing => listing.handle === handle)

    // Add to new array of listing and remove additional search properties
    if (found) {
      query.$select = query.$select || Object.keys(found)
      listings.push(pick(omit(found, asp), query.$select))
    }
  })

  return listings
}

export default findProducts
