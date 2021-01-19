import type { SearchOptions } from '../../types'

/**
 * @file Implementation - includeProducts
 * @module utils/search/includeProducts
 */

/**
 * Returns true if the `products` property should be included in a
 * `/collections` endpoint API response.
 *
 * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
 *
 * @param query - Query from API request
 * @param query.attributesToRetrieve - Fields to include in response
 */
const includeProducts = (query: SearchOptions = {}): boolean => {
  const { attributesToRetrieve: attributes = [] } = query

  if (attributes.includes('-products')) return false

  return attributes.includes('*') || attributes.includes('products')
}

export default includeProducts
