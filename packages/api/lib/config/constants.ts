import type {
  PaginationParameter,
  SearchIndexName,
  SearchIndexSettings
} from '../types'

/**
 * @file Config - Constant Values
 * @module lib/config/constants
 */

const { VERCEL_ENV: ENV, VERCEL_URL } = process.env

export const API_URL = `http${ENV === 'development' ? '' : 's'}://${VERCEL_URL}`

export const DEFAULT_SEARCH_OPTIONS = {
  attributesToHighlight: [],
  attributesToRetrieve: ['handle'],
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
  collection_listings: {
    attributesForFaceting: ['collection_id', 'handle'],
    name: 'collection_listings'
  },
  menus: {
    attributesForFaceting: ['handle', 'title'],
    name: 'menus'
  },
  pages: {
    attributesForFaceting: ['author', 'handle', 'id', 'title'],
    name: 'pages'
  },
  policies: {
    attributesForFaceting: ['handle', 'title'],
    name: 'policies'
  },
  product_listings: {
    attributesForFaceting: ['handle', 'product_id', 'product_type', 'title'],
    name: 'product_listings'
  }
}

export const PAGINATION_PARAMS: PaginationParameter[] = [
  'hitsPerPage',
  'length',
  'page',
  'offset'
]
