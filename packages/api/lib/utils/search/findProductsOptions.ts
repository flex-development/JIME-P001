import { EMPTY_SPACE } from '@flex-development/kustomzcore/dist/constants'
import isEmpty from 'lodash/isEmpty'
import join from 'lodash/join'
import uniq from 'lodash/uniq'
import type { FindProductsQuery as Query, SearchOptions } from '../../types'
import searchOptions from './shopifySearchOptions'

/**
 * @file Implementation - findProductsOptions
 * @module lib/utils/sales/findProductsOptions
 */

/**
 * Converts a product query object into an Algolia search options object.
 *
 * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
 *
 * @param query - Product query from API request
 * @param query.fields - Comma-separated list of product fields to include
 * @param query.handle - Find product listing by product handle
 * @param query.product_id - Find product listing by product ID
 */
const findProductsOptions = (query: Query = {}): SearchOptions => {
  const { product_id, ...rest } = query

  // Get default search options
  const options = searchOptions(rest)

  // Initialize search filters array
  const filters: string[] = options.filters?.length ? [options.filters] : []

  // Add product_id filter
  if (!isEmpty(product_id)) filters.push(`product_id = ${product_id}`)

  // Add collection_id to attributes
  const attributes = options.attributesToRetrieve?.concat(['product_id'])

  return {
    ...options,
    attributesToRetrieve: uniq(attributes),
    filters: join(filters, EMPTY_SPACE)
  }
}

export default findProductsOptions
