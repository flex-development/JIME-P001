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
  customers: {
    attributesForFaceting: [
      'filterOnly(accepts_marketing)',
      'filterOnly(email)',
      'filterOnly(first_name)',
      'filterOnly(id)',
      'filterOnly(last_name)',
      'filterOnly(last_order_id)',
      'filterOnly(last_order_name)',
      'filterOnly(marketing_opt_in_level)',
      'filterOnly(orders_count)',
      'filterOnly(phone)',
      'filterOnly(state)',
      'filterOnly(total_spent)',
      'filterOnly(verified_email)'
    ],
    name: 'customers'
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
