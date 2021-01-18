import type { SearchOptions } from '@algolia/client-search'
import type { ICollectionListing } from '@flex-development/kustomzcore'
import type { VercelRequest as Req } from '@vercel/node'

/**
 * @file Type Declarations
 * @module types
 */

/**
 * Shape of requests sent to the `/collections` endpoint.
 */
export interface FindCollectionsReq extends Omit<Req, 'query'> {
  query: FindCollectionsQuery
}

/**
 * Query parameters accepted by the `/collections` endpoint.
 */
export type FindCollectionsQuery = PaginationSearchOptions & {
  collection_id?: ICollectionListing['collection_id']
  handle?: ICollectionListing['handle']
  text?: SearchOptions['query']
}

/**
 * Names of Algolia pagination search parameters.
 */
export type PaginationParameter = 'hitsPerPage' | 'length' | 'page' | 'offset'

/**
 * Object containing Algolia pagination search parameters.
 */
export type PaginationSearchOptions = Pick<SearchOptions, PaginationParameter>

// Algolia types
export type { SearchOptions } from '@algolia/client-search'
