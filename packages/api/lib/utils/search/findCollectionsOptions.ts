import { EMPTY_SPACE } from '@flex-development/kustomzcore/dist/constants'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import uniq from 'lodash/uniq'
import type { FindCollectionsQuery as Query, SearchOptions } from '../../types'
import searchOptions from './shopifySearchOptions'

/**
 * @file Implementation - findCollectionsOptions
 * @module utils/sales/findCollectionsOptions
 */

/**
 * Converts a collection query object into an Algolia search options object.
 *
 * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
 *
 * @param query - Collection query from API request
 * @param query.collection_id - Find collection listing by collection ID
 * @param query.fields - Comma-separated list of collection fields to include
 * @param query.handle - Find collection listing by collection handle
 */
const findCollectionsOptions = (query: Query = {}): SearchOptions => {
  const { collection_id, ...rest } = query

  // Get default search options
  const options = searchOptions(rest)

  // Initialize search filters array
  const filters: string[] = options.filters?.length ? [options.filters] : []

  // Add collection_id filter
  if (!isEmpty(collection_id)) filters.push(`collection_id = ${collection_id}`)

  // Add collection_id to attributes
  const attributes = options.attributesToRetrieve?.concat(['collection_id'])

  return {
    ...options,
    attributesToRetrieve: uniq(attributes),
    filters: join(filters, EMPTY_SPACE)
  }
}

export default findCollectionsOptions
