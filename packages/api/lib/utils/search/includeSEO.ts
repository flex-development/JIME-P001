import type { SearchOptions } from '../../types'

/**
 * @file Implementation - includeSEO
 * @module utils/search/includeSEO
 */

/**
 * Returns true if the `seo` property should be included in an API response.
 *
 * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
 *
 * @param query - Query from API request
 * @param query.attributesToRetrieve - Fields to include in response
 */
const includeSEO = (query: SearchOptions = {}): boolean => {
  const { attributesToRetrieve: attributes = [] } = query

  if (attributes.includes('-seo')) return false

  return attributes.includes('*') || attributes.includes('seo')
}

export default includeSEO
