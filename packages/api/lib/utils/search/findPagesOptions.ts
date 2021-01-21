import { EMPTY_SPACE } from '@flex-development/kustomzcore'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import uniq from 'lodash/uniq'
import type { FindPagesQuery as Query, SearchOptions } from '../../types'
import searchOptions from './shopifySearchOptions'

/**
 * @file Implementation - findPagesOptions
 * @module utils/sales/findPagesOptions
 */

/**
 * Converts a page query object into an Algolia search options object.
 *
 * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
 *
 * @param query - Page query from API request
 * @param query.author - Filter pages by author
 * @param query.fields - Comma-separated list of page fields to include
 * @param query.handle - Find page by handle
 * @param query.id - Find page by ID
 */
const findPagesOptions = (query: Query = {}): SearchOptions => {
  const { author, ...rest } = query

  // Get default search options
  const options = searchOptions(rest)

  // Initialize search filters array
  const filters: string[] = options.filters?.length ? [options.filters] : []

  // Add author filter
  if (!isEmpty(author)) filters.push(`author = ${author}`)

  // Add id to attributes
  const attributes = options.attributesToRetrieve?.concat(['id'])

  return {
    ...options,
    attributesToRetrieve: uniq(attributes),
    filters: join(filters, EMPTY_SPACE)
  }
}

export default findPagesOptions
