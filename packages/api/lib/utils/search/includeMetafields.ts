import type { SearchOptions } from '../../types'

/**
 * @file Implementation - includeMetafields
 * @module utils/search/includeMetafields
 */

/**
 * Returns true if the `metafield` property should be included in API
 * responses.
 *
 * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
 *
 * @param query - Query from API request
 * @param query.attributesToRetrieve - Fields to include in response
 */
const includeMetafields = (query: SearchOptions = {}): boolean => {
  const { attributesToRetrieve: attributes = [] } = query

  if (attributes.includes('-metafield')) return false

  return attributes.includes('*') || attributes.includes('metafield')
}

export default includeMetafields
