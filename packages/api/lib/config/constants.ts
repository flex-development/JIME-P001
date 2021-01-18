import type { PaginationParameter } from '../types'

/**
 * @file Config - Constant Values
 * @module config/constants
 */

export const DEFAULT_SEARCH_OPTIONS = {
  attributesToHighlight: [],
  attributesToRetrieve: ['*', '-_tags'],
  attributesToSnippet: []
}

export const PAGINATION_PARAMS: PaginationParameter[] = [
  'hitsPerPage',
  'length',
  'page',
  'offset'
]
