import type { AnyObject } from '@flex-development/json'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import pick from 'lodash/pick'
import { DEFAULT_SEARCH_OPTIONS as DSO, PAGINATION_PARAMS } from '../../config'
import type { SearchOptions } from '../../types'

/**
 * @file Implementation - shopifySearchOptions
 * @module utils/search/shopifySearchOptions
 */

/**
 * Returns an object with default search options for Shopify resources.
 *
 * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
 *
 * @param query - Query from API request
 * @param query.fields - Comma-separated list of resource fields to include
 * @param query.handle - Find resource by handle
 */
const shopifySearchOptions = (query: AnyObject = {}): SearchOptions => {
  const { fields, handle, ...rest } = query

  // Initialize search filters array
  const filters: string[] = []

  // Update default attributes to retrieve
  let attributesToRetrieve = DSO.attributesToRetrieve

  // Add attributes from query
  if (fields?.trim().length) {
    attributesToRetrieve = fields.trim().split(',').flat()
  }

  // Add handle filter
  if (!isEmpty(handle)) filters.push(`handle:${handle}`)

  return {
    ...DSO,
    ...pick(rest, PAGINATION_PARAMS),
    attributesToRetrieve,
    filters: join(filters, ' ')
  }
}

export default shopifySearchOptions
