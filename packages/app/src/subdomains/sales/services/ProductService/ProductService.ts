import { axiosShopify } from '@app/config/axios'
import {
  AnyObject,
  ArrayQueryExecutor,
  DataArray,
  DataArrayQueryParams
} from '@flex-development/json'
import {
  createError,
  ICollectionListing,
  IProductListing,
  IProductListingVariant,
  Logger
} from '@flex-development/kustomzcore'
import { NotFound } from '@subdomains/app/utils'
import { omit, pick } from 'lodash'
import { IProductService, ListProductsResponse } from './IProductService'

/**
 * @file Subdomain Service - Product Listings
 * @module subdomains/sales/services/ProductService/impl
 */

export default class ProductService
  extends ArrayQueryExecutor<IProductListing>
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
   * @return Array of product listing objects
   */
  async find(
    query: DataArrayQueryParams = {}
  ): Promise<DataArray<IProductListing>> {
    if (!query?.$limit) query.$limit = 250

    const { product_listings } = await axiosShopify<ListProductsResponse>({
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
    searchable = this.query(searchable, omit(query, ['$limit']))

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
  async findByCollection(
    collection_id: ICollectionListing['collection_id'],
    query: DataArrayQueryParams = {}
  ): Promise<DataArray<IProductListing>> {
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
    const query: DataArrayQueryParams = { product_id: { $eq: id } }
    const products = await this.find(query)

    if (!products.length) {
      const data = { errors: { id } }
      const error = createError(`Product with id "${id}" not found`, data, 404)

      Logger.error({ 'ProductService.get': error })
      throw error
    }

    return products[0] as IProductListing
  }

  /**
   * Retrieve a product by handle.
   *
   * @async
   * @param handle - Handle of product to retrieve
   */
  async getByHandle(handle: string): Promise<IProductListing | NotFound> {
    const query: DataArrayQueryParams = { handle: { $eq: handle } }
    const products = await this.find(query)

    if (!products.length) {
      const data = { errors: { handle } }
      const message = `Product with handle "${handle}" not found`
      const error = createError(message, data, 404)

      Logger.error({ 'ProductService.getByHandle': error })
      return { notFound: true }
    }

    return products[0] as IProductListing
  }

  /**
   * Searches the products of the collection with the id {@param collection_id}
   * the product with the handle {@param handle}.
   *
   * An error will be thrown if the product isn't found.
   *
   * @async
   * @param collection_id - ID of collection to search
   * @param handle - Handle of product to find
   */
  async getFromCollection(
    collection_id: ICollectionListing['collection_id'],
    handle: IProductListing['handle']
  ): Promise<IProductListing> {
    const products = await this.findByCollection(collection_id)
    const product = products.find(p => p.handle === handle)

    if (!product) {
      const data = { errors: { collection_id, product: handle } }
      const message = `Product with handle "${handle}" not found in collection.`
      const error = createError(message, data, 404)

      Logger.error({ 'ProductService.getFromCollection': error })
      throw error
    }

    return product as IProductListing
  }
}
