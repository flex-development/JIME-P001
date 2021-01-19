import type { PaginationParameter } from '../types'

/**
 * @file Config - Constant Values
 * @module config/constants
 */

const { VERCEL_ENV: ENV, VERCEL_URL } = process.env

export const API_URL = `http${ENV === 'development' ? '' : 's'}://${VERCEL_URL}`

export const DEFAULT_SEARCH_OPTIONS = {
  attributesToHighlight: [],
  attributesToRetrieve: ['*', '-_tags'],
  attributesToSnippet: []
}

export const INDEX_SETTINGS = {
  collection_listings: {
    attributesForFaceting: ['collection_id', 'handle'],
    name: 'collection_listings'
  },
  product_listings: {
    attributesForFaceting: [
      'handle',
      'product_id',
      'product_type',
      'title',
      'vendor'
    ],
    name: 'product_listings'
  }
}

export const PAGINATION_PARAMS: PaginationParameter[] = [
  'hitsPerPage',
  'length',
  'page',
  'offset'
]
