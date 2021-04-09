import type { PaginationParameter } from '@flex-development/kustomzcore'
import type { SearchIndexName, SearchIndexSettings } from '../types'

/**
 * @file Config - Constant Values
 * @module config/constants
 */

const { VERCEL_ENV: ENV, VERCEL_URL } = process.env

export const API_URL = `http${ENV === 'development' ? '' : 's'}://${VERCEL_URL}`

export const PAGINATION_PARAMS: PaginationParameter[] = [
  'hitsPerPage',
  'length',
  'page',
  'offset'
]

/**
 * Object mapping search index names to settings.
 *
 * - https://www.algolia.com/doc/api-reference/settings-api-parameters/
 */
export const SEARCH_INDEX_SETTINGS: Record<
  SearchIndexName,
  SearchIndexSettings & { name: SearchIndexName }
> = {
  collections: {
    attributesForFaceting: [
      'filterOnly(collection_id)',
      'filterOnly(handle)',
      'filterOnly(objectID)'
    ],
    name: 'collections'
  },
  menus: {
    attributesForFaceting: [
      'filterOnly(handle)',
      'filterOnly(objectID)',
      'filterOnly(title)'
    ],
    name: 'menus'
  },
  pages: {
    attributesForFaceting: [
      'filterOnly(author)',
      'filterOnly(handle)',
      'filterOnly(id)',
      'filterOnly(title)'
    ],
    name: 'pages'
  },
  policies: {
    attributesForFaceting: [
      'filterOnly(handle)',
      'filterOnly(objectID)',
      'filterOnly(title)'
    ],
    name: 'policies'
  },
  products: {
    attributesForFaceting: [
      'filterOnly(handle)',
      'filterOnly(objectID)',
      'filterOnly(product_id)',
      'filterOnly(product_type)',
      'filterOnly(title)'
    ],
    name: 'products'
  },
  reviews: {
    attributesForFaceting: [
      'filterOnly(curated)',
      'filterOnly(featured)',
      'filterOnly(hidden)',
      'filterOnly(id)',
      'filterOnly(ip_address)',
      'filterOnly(product_external_id)',
      'filterOnly(reviewer.email)',
      'filterOnly(reviewer.id)',
      'filterOnly(source)'
    ],
    name: 'reviews'
  }
}
