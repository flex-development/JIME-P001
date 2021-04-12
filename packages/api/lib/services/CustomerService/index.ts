import type {
  APIQuery,
  CustomerMarketingOptInLevel as MOIL,
  CustomerState,
  OrNever,
  TObject as ObjectType
} from '@flex-development/kustomzcore'
import { EMPTY_SPACE } from '@flex-development/kustomzcore/config/constants'
import createError from '@flex-development/kustomzcore/utils/createError'
import isBoolean from 'lodash/isBoolean'
import isEmpty from 'lodash/isEmpty'
import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
import join from 'lodash/join'
import uniq from 'lodash/uniq'
import { SEARCH_INDEX_SETTINGS } from '../../config/constants'
import ShopifyAPI from '../../mixins/ShopifyAPI'
import type { SearchOptions, SearchOptionsA } from '../../types'
import SearchIndexService from '../SearchIndexService'

/**
 * @file Implementation - Customer Service
 * @module lib/services/CustomerService
 */

export type TObject = ObjectType.Customer

/**
 * Handles interactions with customer resources.
 *
 * @class
 * @extends SearchIndexService
 */
export default class CustomerService extends SearchIndexService<TObject> {
  /**
   * Initializes a new Customer service instance.
   */
  constructor() {
    const { customers } = SEARCH_INDEX_SETTINGS
    super(customers.name, 'id', CustomerService.getObjects)
  }

  /**
   * Returns an array of Shopify Customer objects to populate the search index.
   *
   * @async
   * @return {Promise<TObject[]>} Promise containing index objects
   * @throws {ErrorJSON}
   */
  static async getObjects(): OrNever<Promise<TObject[]>> {
    return (await ShopifyAPI.customers()) as TObject[]
  }

  /**
   * Performs a search for a single customer resource.
   *
   * @async
   * @param {APIQuery.Customer.Get} query - Query parameters
   * @param {string} [query.fields] - Comma-separated list of fields to include
   * @param {string} query.objectID - ID of resource to retrieve
   * @param {string} query.userToken - Shopify API key
   * @return {Promise<TObject>} Promise containing customer object
   */
  async findOne(query: APIQuery.Customer.Get): OrNever<Promise<TObject>> {
    const { fields, objectID, userToken } = query

    return super.get(`${objectID}`, fields, { userToken })
  }

  /**
   * Executes a search against the index.
   *
   * If {@param query.userToken} is missing or invalid, a `401 NotAuthenticated`
   * error will be thrown.
   *
   * @async
   * @param {string} [query] - Text to search in the current index
   * @param {SearchOptionsA} options - Search index options
   * @param {string} options.userToken - Shopify API key
   * @return {Promise<TObject[]>} Array of search results
   * @throws {ErrorJSON}
   */
  async search(
    query: string = '',
    options: SearchOptionsA
  ): OrNever<Promise<TObject[]>> {
    const { userToken = '' } = options

    if (isEmpty(userToken) || userToken !== ShopifyAPI.API_KEY) {
      const data = { errors: { userToken }, options, query }
      throw createError('Invalid API key', data, 401)
    }

    return await super.search(query, options)
  }

  /**
   * Converts a `Customer` service query object into an Algolia search
   * options object.
   *
   * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
   *
   * @param {APIQuery.Customer.Find} [query] - Query parameters
   * @param {boolean} [query.accepts_marketing] - Filter by customers who have
   * consented to receive marketing material via email
   * @param {string} [query.email] - Find customer by email address
   * @param {string} [query.fields] - Comma-separated list of fields to include
   * @param {string} [query.first_name] - Filter by first name
   * @param {number} [query.hitsPerPage] - Number of results per page
   * @param {number} [query.id] - Find customer by ID
   * @param {string} [query.last_name] - Filter by last name
   * @param {number} [query.last_order_id] - Find customer by ID of last order
   * @param {string} [query.last_order_name] - Filter by name of last order
   * @param {number} [query.length] - Result limit (used only with offset)
   * @param {number} [query.limit] - Number of hits to retrieve
   * @param {MOIL} [query.moil] - Filter by marketing opt-in level
   * @param {string} [query.objectID] - Find resource by search index objectID
   * @param {number} [query.offset] - Offset of the first result to return
   * @param {number} [query.orders_count] - Filter by number of orders
   * @param {number} [query.page] - Specify the page to retrieve
   * @param {string} [query.phone] - Find customer by phone number
   * @param {CustomerState} [query.state] - Find by customer state
   * @param {string} [query.total_spent] - Filter by total spent
   * @param {string} [query.text] - Text to search in index
   * @param {string} [query.userToken] - User identifier
   * @param {string} [query.verified_email] - Filter by email verification
   * @return {SearchOptions} Algolia search options object
   */
  searchOptions(query: APIQuery.Customer.Find = {}): SearchOptions {
    const {
      accepts_marketing,
      email,
      first_name,
      id = null,
      last_name,
      last_order_id: lorder_id,
      last_order_name,
      moil,
      orders_count = null,
      phone,
      state,
      total_spent,
      verified_email,
      ...rest
    } = query

    // Get default search options
    const { attributesToRetrieve = [], ...options } = super.searchOptions(rest)

    // Initialize search filters array
    const filters: string[] = options.filters?.length ? [options.filters] : []

    // Add `accepts_marketing` filter
    if (isBoolean(accepts_marketing)) {
      filters.push(`accepts_marketing:${accepts_marketing}`)
    }

    // Add `email` filter
    if (isString(email)) filters.push(`email:${email}`)

    // Add `last_name` filter
    if (isString(last_name)) filters.push(`last_name:"${last_name}"`)

    // Add `id` filter
    if (isNumber(JSON.parse(`${id}`))) filters.push(`id = ${id}`)

    // Add `first_name` filter
    if (isString(first_name)) filters.push(`first_name:"${first_name}"`)

    // Add `last_order_id` filter
    if (isNumber(JSON.parse(`${lorder_id || 'null'}`))) {
      filters.push(`last_order_id = ${lorder_id}`)
    }

    // Add `last_order_name` filter
    if (isString(last_order_name)) {
      filters.push(`last_order_name:"${last_order_name}"`)
    }

    // Add `orders_count` filter
    if (isNumber(JSON.parse(`${orders_count}`))) {
      filters.push(`orders_count = ${orders_count}`)
    }

    // Add `marketing_opt_in_level` filter
    if (isString(moil)) filters.push(`marketing_opt_in_level:${moil}`)

    // Add `phone` filter
    if (isString(phone)) filters.push(`phone:${phone}`)

    // Add `state` filter
    if (isString(state)) filters.push(`state:${state}`)

    // Add `total_spent` filter
    if (isString(total_spent)) filters.push(`total_spent:${total_spent}`)

    // Add `verified_email` filter
    if (isBoolean(verified_email)) {
      filters.push(`verified_email:${verified_email}`)
    }

    // Add customer email and id to attributes
    const attributes = attributesToRetrieve.concat(['email', 'id'])

    return {
      ...options,
      attributesToRetrieve: uniq(attributes),
      filters: join(filters, EMPTY_SPACE)
    }
  }
}
