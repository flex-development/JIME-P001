import type { ANYTHING, NullishNumber, PartialOr } from '@flex-development/json'
import type {
  AxiosError,
  ICollectionListing,
  ICollectionListingQuery,
  ICollectionListingResFind,
  ICustomer,
  ICustomerQuery,
  ICustomerResFind,
  IImage,
  IMenu,
  IMetafield,
  IMetafieldQuery,
  IMetafieldResFind,
  IPage,
  IPageQuery,
  IPolicy,
  IPolicyResFind,
  IProductImage,
  IProductListing,
  IProductListingQuery,
  IProductListingResFind,
  IProductListingVariant,
  OrNever,
  PagePublishedStatus
} from '@flex-development/kustomzcore'
import axios, {
  interceptors as interceptorsDefault,
  request
} from '@flex-development/kustomzcore/config/axios'
import createError from '@flex-development/kustomzcore/utils/createError'
import ofa from '@flex-development/kustomzcore/utils/objectFromArray'
import onFulfilled from '@flex-development/kustomzcore/utils/onFulfilled'
import onRejected from '@flex-development/kustomzcore/utils/onRejected'
import type { AxiosRequestConfig } from 'axios'
import merge from 'lodash/merge'
import { API_URL } from '../../config/constants'
import type { ShopifyResourceWithMetafield } from '../../types'
import MENUS_FIXTURE from './__tests__/__fixtures__/menus'

/**
 * @file Implementation - Shopify REST Admin API Mixin
 * @module lib/mixins/ShopifyAPI
 * @see https://shopify.dev/docs/admin-api/rest/reference
 */

/**
 * Handles fetching data from the Shopify REST Admin API.
 *
 * @class
 */
export default class ShopifyAPI {
  /**
   * @property {string} API_KEY - Shopify API key
   */
  static API_KEY: string = process.env.SHOPIFY_API_KEY || ''

  /**
   * @property {string} NAME - Shop name
   */
  static NAME: string = process.env.SHOPIFY_SHOP_NAME || ''

  /**
   * @property {IImage} PLACEHOLDER_IMAGE - Default placeholder image properties
   */
  static PLACEHOLDER_IMAGE: IImage = {
    alt: 'Placeholder image',
    created_at: new Date().toISOString(),
    height: 1920,
    id: -1,
    src: `${API_URL}assets/placeholder`,
    updated_at: new Date().toISOString(),
    width: 1920
  }

  /**
   * @property {string} URL - Shop domain
   */
  static URL: string = `https://${ShopifyAPI.NAME}.myshopify.com`

  /**
   * @property {string} VERSION - Shopify REST Admin API version
   */
  static VERSION: string = process.env.SHOPIFY_API_VERSION || ''

  /**
   * @property {string} BASE_URL - Shopify REST Admin API base URL
   */
  static BASE_URL: string = `${ShopifyAPI.URL}/admin/api/${ShopifyAPI.VERSION}`

  /**
   * Returns an array of `ICollectionListing` objects.
   *
   * @async
   * @param {ICollectionListingQuery} [params] - Query parameters
   * @param {number} [params.limit] - Number of results to retrieve; [50, 250]
   * @return {Promise<ICollectionListing[]>} Promise containing listings
   */
  static async collectionListings(
    params: ICollectionListingQuery = {}
  ): OrNever<Promise<ICollectionListing[]>> {
    const res = await ShopifyAPI.request<ICollectionListingResFind>({
      params: { ...params, limit: params.limit ?? 250 },
      url: 'collection_listings'
    })

    return res.collection_listings
  }

  /**
   * Returns an array of `ICustomer` objects.
   *
   * @async
   * @param {ICustomerQuery} [params] - Query parameters
   * @param {string} [params.created_at_max] - Customers created before date
   * @param {string} [params.created_at_min] - Customers created after date
   * @param {string} [params.fields] - Comma-separated list of fields to show
   * @param {string} [params.ids] - Comma-separated list of customer IDs
   * @param {number} [params.limit] - Number of results to retrieve; [50,250]
   * @param {number} [params.since_id] - Results after specified customer ID
   * @param {string} [params.updated_at_max] - Customers modified before date
   * @param {string} [params.updated_at_min] - Customers modified after date
   * @return {Promise<PartialOr<ICustomer>[]>} Promise containing customers
   */
  static async customers(
    params: ICustomerQuery = {}
  ): OrNever<Promise<PartialOr<ICustomer>[]>> {
    const res = await ShopifyAPI.request<ICustomerResFind>({
      params: { ...params, limit: params.limit ?? 250 },
      url: 'customers'
    })

    return res.customers
  }

  /**
   * Searches {@param images} for the image with the id {@param image_id}.
   * If the image isn't found, placeholder image data will be returned.
   *
   * @param {number} image_id - ID of image to search for
   * @param {IImage[] | IProductImage[]} images - Array of images
   * @param {Partial<IImage>} [overrides] - Image overrides
   * @return {IImage | IProductImage} Image data
   */
  static getProductImage(
    image_id: IProductListingVariant['image_id'],
    images: IImage[] | IProductImage[] = [],
    overrides: Partial<IImage> = {}
  ): IImage | IProductImage {
    // Search for image
    let image = images.find(image => image.id === image_id)

    // Copy data or use placeholder image if image isn't found
    image = image ? Object.assign({}, image) : ShopifyAPI.PLACEHOLDER_IMAGE

    // Apply overrides
    image = merge(image, overrides)

    return image
  }

  /**
   * Returns an array of `IMenu` objects.
   *
   * @async
   * @return {Promise<IMenu[]>} Promise containing menus
   */
  static async menus(): OrNever<Promise<IMenu[]>> {
    return (await ShopifyAPI.request({}, true)).menus
  }

  /**
   * Returns an array of `IMetafield` objects.
   *
   * If {@param type} is undefined, shop-level metafields will be returned.
   *
   * @async
   * @param {ShopifyResourceWithMetafield} [type] - Type of Shopify resource
   * @param {NullishNumber} [id] - ID of Shopify resources to get metafields for
   * @param {IMetafieldQuery} [params] - Query parameters
   * @param {string} [params.created_at_max] - Metafields created before date
   * @param {string} [params.created_at_min] - Metafields created after date
   * @param {string} [params.fields] - Comma-separated list of fields to show
   * @param {string} [params.key] - Show metafields with given key
   * @param {number} [params.limit] - Max number of results. Defaults to `250`
   * @param {string} [params.namespace] - Show metafields with given namespace
   * @param {string} [params.updated_at_max] - Metafields updated before date
   * @param {string} [params.updated_at_min] - Metafields updated after date
   * @param {string} [params.value_type] - Metafields with value_type of
   * 'integer' or 'string'
   * @return {Promise<PartialOr<IMetafield>[]>} Promise containing metafields
   * @throws {ErrorJSON}
   */
  static async metafield(
    type?: ShopifyResourceWithMetafield | null,
    id?: NullishNumber,
    params: IMetafieldQuery = {}
  ): OrNever<Promise<PartialOr<IMetafield>[]>> {
    const res = await ShopifyAPI.request<IMetafieldResFind>({
      params: { ...params, limit: params.limit || 250 },
      url: !type ? 'metafields' : `${type}/${id}/metafields`
    })

    return res.metafields
  }

  /**
   * Returns an object with shop-level metafields from the `globals` namespace.
   *
   * If defined, {@param params.namespace} will be overwritten.
   *
   * @param {IMetafieldQuery} [params] - Query parameters
   * @param {string} [params.created_at_max] - Metafields created before date
   * @param {string} [params.created_at_min] - Metafields created after date
   * @param {string} [params.fields] - Comma-separated list of fields to show
   * @param {string} [params.key] - Show metafields with given key
   * @param {number} [params.limit] - Max number of results. Defaults to `250`
   * @param {string} [params.updated_at_max] - Metafields updated before date
   * @param {string} [params.updated_at_min] - Metafields updated after date
   * @param {string} [params.value_type] - Show metafields with a value_type of
   * 'integer' or 'string'
   * @return {Promise<Record<string, PartialOr<IMetafield>>>} - Promise
   * containing object with shop-level metafields
   */
  static async metafieldGlobals(
    params: Omit<IMetafieldQuery, 'namespace'> = {}
  ): OrNever<Promise<Record<string, PartialOr<IMetafield>>>> {
    const $params = { ...params, namespace: 'globals' }
    const globals = await ShopifyAPI.metafield(null, null, $params)

    return ofa<PartialOr<IMetafield>>(globals, 'key')
  }

  /**
   * Transforms an `AxiosError` into an `ErrorJSON` object.
   *
   * @param {AxiosError} error - HTTP error to transform
   * @throws {ErrorJSON}
   */
  static onRejected(error: AxiosError): void {
    if (!error.response || !error.response.data.errors) throw onRejected(error)

    const { data, status } = error.response

    const $error = createError(data.errors, { isAxiosError: true }, status)

    delete $error.data.name
    delete $error.data.stack

    throw $error
  }

  /**
   * Returns an array of `IPage` objects.
   *
   * @async
   * @param {IPageQuery} [params] - Query parameters
   * @param {string} [params.created_at_max] - Pages created before date
   * @param {string} [params.created_at_min] - Pages created after date
   * @param {string} [params.fields] - Comma-separated list of fields to show
   * @param {string} [params.handle] - Retrieve page with given handle
   * @param {string} [params.ids] - Comma-separated list of page IDs
   * @param {number} [params.limit] - Number of results to retrieve; [50, 250]
   * @param {string} [params.published_at_max] - Pages published before date
   * @param {string} [params.published_at_min] - Pages published after date
   * @param {PagePublishedStatus} [params.published_status] - Publish status
   * @param {string} [params.since_id] - Pages after specified page ID
   * @param {string} [params.title] - Retrieve pages with given title
   * @param {string} [params.updated_at_max] - Pages modified before date
   * @param {string} [params.updated_at_min] - Pages modified after date
   * @return {Promise<PartialOr<IPage>[]>} Promise containing pages
   */
  static async pages(
    params: IPageQuery = {}
  ): OrNever<Promise<PartialOr<IPage>[]>> {
    const res = await ShopifyAPI.request({
      params: { ...params, limit: params.limit ?? 250 },
      url: 'pages'
    })

    return res.pages
  }

  /**
   * Returns an array of `IPolicy` objects.
   *
   * @async
   * @return {Promise<IPolicy[]>} Promise containing policies
   */
  static async policies(): OrNever<Promise<IPolicy[]>> {
    const res = await ShopifyAPI.request<IPolicyResFind>({ url: 'policies' })

    return res.policies
  }

  /**
   * Returns an array of `IProductListing` objects.
   *
   * @async
   * @param {IProductListingQuery} [params] - Query parameters
   * @param {number} [params.collection_id] - Filter by collection
   * @param {string} [params.handle] - Filter by product handle.
   * @param {number} [params.limit] - Number of results to retrieve; [50, 250]
   * @param {string} [params.product_ids] - Comma-separated list of product IDs
   * @param {string} [params.updated_at_min] - Listings modified after date
   * @return {Promise<PartialOr<IProductListing>[]>} Promise containing listings
   */
  static async productListings(
    params: IProductListingQuery = {}
  ): OrNever<Promise<IProductListing[]>> {
    const res = await ShopifyAPI.request<IProductListingResFind>({
      params: { ...params, limit: params.limit ?? 250 },
      url: 'product_listings'
    })

    return res.product_listings
  }

  /**
   * Makes GET requests to the Shopify REST Admin API.
   *
   * If passed, {@param config.baseURL} and {@param config.method} will be
   * overriden. If not requesting the menus endpoint, the `.json`extension will
   * be appended to {@param config.url}.
   *
   * @template T - Payload type
   *
   * @async
   * @param {Omit<AxiosRequestConfig, 'baseURL'>} config - Axios request config
   * @param {boolean} menus - If menus is true, use alternate `baseURL`
   * @return {Promise<T>} Promise containing response payload
   * @throws {ErrorJSON}
   */
  static async request<T = ANYTHING>(
    config: Omit<AxiosRequestConfig, 'baseURL'> = {},
    menus: boolean = false
  ): Promise<T> {
    // ! While in development, the menus endpoint cannot be accessed
    if (menus) return (MENUS_FIXTURE as unknown) as T

    config = {
      ...config,
      auth: {
        password: process.env.SHOPIFY_PASSWORD,
        username: ShopifyAPI.API_KEY
      },
      baseURL: menus ? `https://${ShopifyAPI.URL}` : ShopifyAPI.BASE_URL,
      method: 'GET',
      url: menus ? '/pages/api-menus' : `/${config.url}.json`
    } as typeof config

    return await request<T>(config, true)
  }
}

/** @see https://github.com/axios/axios#interceptors  */
axios.interceptors.response.eject(interceptorsDefault)

// ! Replace response interceptors
export const interceptors = axios.interceptors.response.use(
  onFulfilled,
  ShopifyAPI.onRejected
)
