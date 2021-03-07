import type { PaginationParameter } from '@flex-development/kustomzcore'
import type { SearchIndexName, SearchIndexSettings } from '../types'

/**
 * @file Config - Constant Values
 * @module lib/config/constants
 */

const { VERCEL_ENV: ENV, VERCEL_URL } = process.env

export const API_URL = `http${ENV === 'development' ? '' : 's'}://${VERCEL_URL}`

export const DEFAULT_SEARCH_OPTIONS = {
  attributesToHighlight: [],
  attributesToRetrieve: ['objectID'],
  attributesToSnippet: []
}

export const DEFAULT_IMAGE_URL = `${API_URL}/assets/images/placeholder.webp`

export const DEFAULT_SEO_IMAGE = `${API_URL}/assets/images/morena.webp`

export const DEFAULT_SEO_IMAGE_DATA = {
  height: 1920,
  src: DEFAULT_SEO_IMAGE,
  width: 1920
}

export const INDEX_SETTINGS: Record<
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
  }
}

export const PAGINATION_PARAMS: PaginationParameter[] = [
  'hitsPerPage',
  'length',
  'page',
  'offset'
]
