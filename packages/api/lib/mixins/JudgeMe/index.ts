import type { ANYTHING } from '@flex-development/json'
import type {
  AxiosError,
  JudgeMeReviewCreateDataDTO as ICreateReviewDTO,
  JudgeMeReviewCreateRes as CreateRes,
  JudgeMeReviewIndexParamsNoAuth as IndexParams,
  JudgeMeReviewIndexRes as IndexRes,
  NumberString,
  OrNever,
  ReviewRating
} from '@flex-development/kustomzcore'
import axios, { request } from '@flex-development/kustomzcore/config/axios'
import CRDTO from '@flex-development/kustomzcore/models/CreateReviewDTO'
import createError from '@flex-development/kustomzcore/utils/createError'
import onFulfilled from '@flex-development/kustomzcore/utils/onFulfilled'
import onRejected from '@flex-development/kustomzcore/utils/onRejected'
import type { AxiosRequestConfig, Method as HTTPMethod } from 'axios'
import clamp from 'lodash/clamp'
import isPlainObject from 'lodash/isPlainObject'
import merge from 'lodash/merge'
import ErrorHandling from '../ErrorHandling'
import ShopifyAPI, {
  interceptors as interceptorsShopifyAPI
} from '../ShopifyAPI'

/**
 * @file Implementation - Judge.me Mixin
 * @module lib/mixins/JudgeMe
 * @see https://judge.me/api/docs/v1
 */

/**
 * Handles creating and listing product or shop-level Judge.me reviews.
 *
 * - https://judge.me/
 * - https://judge.me/api/docs/v1
 *
 * @class
 */
export default class JudgeMe {
  /**
   * @property {string} API_TOKEN - Shop API token for authentication
   */
  static API_TOKEN: string = process.env.JUDGEME_API_TOKEN || ''

  /**
   * @property {string} BASE_URL - Judge.me v1 API Review Service endpoint
   */
  static BASE_URL: string = 'https://judge.me/api/v1/reviews'

  /**
   * @property {string} SHOP_DOMAIN - Shop domain without http/https protocol
   */
  static SHOP_DOMAIN: string = ShopifyAPI.URL.replace('https://', '')

  /**
   * Creates a product review.
   *
   * ! Currently, shop-level reviews are not being accepted. Therefore, review
   * ! bodies are required. Review titles are still optional.
   *
   * @async
   * @param {ICreateReviewDTO} data - JSON body
   * @param {string} data.body - Review body; [1,5000]
   * @param {string} data.email - Reviewer email
   * @param {NumberString} data.id - Product ID
   * @param {string} [data.ip_addr] - Reviewer's ip address
   * @param {ReviewRating} [data.rating] - Review rating; [1,5]
   * @param {string} [data.title] - Review title; [0,100]
   * @return {Promise<ICreateReviewDTO>} Promise containing validated data
   * @throws {ErrorJSON}
   */
  static async create(
    data: ICreateReviewDTO
  ): OrNever<Promise<ICreateReviewDTO>> {
    // Copy incoming data
    let dto: ICreateReviewDTO = Object.assign({}, data)

    // Remove ip address if empty string
    if (!dto.ip_addr?.trim().length) delete dto.ip_addr

    // Remove title if empty string
    if (!dto.title?.trim().length) delete dto.title

    // Parse and validate data
    try {
      dto = await CRDTO.parseAsync(dto)
    } catch (zerror) {
      throw ErrorHandling.formatValidationError(zerror, dto)
    }

    /**
     * ! NOTICE: The `picture_urls` field does not attach product images to a
     * ! product review. This is an error with the Judge.me API.
     *
     * When time allows, this issue will be investigated further.
     */
    // Get product listing
    // const listings = await ShopifyAPI.productListings()
    // const listing = listings.find(listing => listing.product_id === dto.id)

    // if (listing.images.length) {
    //   // Create product image map
    //   const picture_urls = { '0': listing.images[0].src.split('?')[0] }

    //   // Add picture urls to review
    //   dto = merge(dto, { picture_urls })
    // }

    // Create review
    await JudgeMe.request<CreateRes>({ data: dto, method: 'post' })

    // Return validated data
    return dto
  }

  /**
   * Lists all reviews.
   *
   * @async
   * @param {IndexParams} [params] - Query parameters
   * @param {number} [params.page] - Page number for reviews pagination
   * @param {number} [params.per_page] - Number of reviews per page; [1, 10]
   * @param {number} [params.product_id] - Filter reviews by product ID
   * @param {ReviewRating} [params.rating] - Filter reviews by rating; [1, 5]
   * @param {number} [params.reviewer_id] - Filter reviews by reviewer ID
   * @return {Promise<IndexRes>} Promise containing Reviews Index response
   */
  static async index(params: IndexParams = {}): OrNever<Promise<IndexRes>> {
    // Format reviews per page query
    if (params.per_page || params.per_page === 0) {
      params.per_page = clamp(JSON.parse(`${params.per_page}`), 1, 10)
    }

    // Format review rating query
    if (params.rating || params.rating === 0) {
      params.rating = clamp(JSON.parse(`${params.rating}`), 1, 5)
    }

    return await JudgeMe.request<IndexRes>({ params })
  }

  /**
   * Transforms an `AxiosError` into an `ErrorJSON` object.
   *
   * @param {AxiosError} error - HTTP error to transform
   * @throws {ErrorJSON}
   */
  static onRejected(error: AxiosError): void {
    if (!error.response) throw onRejected(error)

    const { data, status } = error.response

    const message = data.error || data.message

    if (!message || !message.length) throw onRejected(error)

    const $error = createError(message, { isAxiosError: true }, status)

    delete $error.data.name
    delete $error.data.stack

    throw $error
  }

  /**
   * Makes requests to the Judge.me v1 API.
   *
   * If passed, the base URL and the Content-Type header will be overridden.
   * Request URLs will be prefixed with `/` as well.
   *
   * When creating a new review, {@param config.data.platform} and
   * {@param config.data.url} will be overridden.
   *
   * When listing reviews, {@param config.params.api_token} and
   * {@param config.params.shop_domain} will be overriden.
   *
   * @template T - Payload type
   *
   * @async
   * @param {AxiosRequestConfig} config - Axios request config
   * @return {Promise<T>} Promise containing response payload
   * @throws {ErrorJSON}
   */
  static async request<T = ANYTHING>(
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    const method = (config.method || 'get').toUpperCase() as HTTPMethod

    const data = isPlainObject(config.data) ? config.data : {}
    const params = config.params || {}

    if (method === 'GET') {
      params.api_token = JudgeMe.API_TOKEN
      params.shop_domain = JudgeMe.SHOP_DOMAIN
    }

    if (method === 'POST') {
      data.platform = 'shopify'
      data.url = JudgeMe.SHOP_DOMAIN
    }

    return await request<T>({
      ...config,
      baseURL: JudgeMe.BASE_URL,
      data,
      headers: merge(config.headers, { 'Content-Type': 'application/json' }),
      method,
      params,
      url: `/${config.url || ''}`
    })
  }
}

/** @see https://github.com/axios/axios#interceptors  */
axios.interceptors.response.eject(interceptorsShopifyAPI)

// ! Replace response interceptors
export const interceptors = axios.interceptors.response.use(
  onFulfilled,
  JudgeMe.onRejected
)
