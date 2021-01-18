import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import pick from 'lodash/pick'
import { DEFAULT_SEARCH_OPTIONS as DSO, PAGINATION_PARAMS } from '../../config'
import type { FindCollectionsQuery as Query, SearchOptions } from '../../types'

/**
 * @file Implementation - findCollectionsOptions
 * @module utils/collections/findCollectionsOptions
 */

/**
 * Converts a collection query object into an Algolia search options object.
 *
 * If defined, {@param query.collection_id} and {@param query.handle} will be
 * used to append search filters to the search options object.
 *
 * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
 *
 * @param query - Collection query from API request
 * @param query.collection_id - Filter results by collection ID
 * @param query.fields - Comma-separated list of collection fields to include
 * @param query.handle - Filter results by collection handle
 */
const findCollectionsOptions = (query: Query = {}): SearchOptions => {
  const { collection_id, fields, handle, ...rest } = query

  // Initialize search filters array
  const filters: string[] = []

  // Add collection_id filter
  if (!isEmpty(collection_id)) filters.push(`collection_id = ${collection_id}`)

  // Add handle filter
  if (!isEmpty(handle)) filters.push(`handle:${handle}`)

  // Update default attributes to retrieve
  let attributesToRetrieve = DSO.attributesToRetrieve

  // Add attributes from query
  if (fields?.trim().length) {
    attributesToRetrieve = DSO.attributesToRetrieve.concat(fields.split(','))
  }

  return {
    ...DSO,
    ...pick(rest, PAGINATION_PARAMS),
    attributesToRetrieve,
    filters: join(filters, ' ')
  }
}

export default findCollectionsOptions
