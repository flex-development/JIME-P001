import type { SearchOptions } from '@algolia/client-search'
import type {
  ICollectionListing,
  IMetafield,
  IProductListing
} from '@flex-development/kustomzcore'
import type { VercelRequest as Req } from '@vercel/node'

/**
 * @file Type Declarations
 * @module types
 */

/**
 * Query parameters accepted by the `/collections/[handle]` endpoint.
 */
export type GetCollectionQuery = {
  fields?: string
  handle: ICollectionListing['handle']
}

/**
 * Query parameters accepted by the `/products/[handle]` endpoint.
 */
export type GetProductQuery = {
  fields?: string
  handle: IProductListing['handle']
}

/**
 * Shape of requests sent to the `/collections/[handle]` endpoint.
 */
export interface GetCollectionReq extends Omit<Req, 'query'> {
  query: GetCollectionQuery
}

/**
 * Shape of requests sent to the `/products/[handle]` endpoint.
 */
export interface GetProductReq extends Omit<Req, 'query'> {
  query: GetProductQuery
}

/**
 * Query parameters accepted by the `/collections` endpoint.
 */
export type FindCollectionsQuery = PaginationSearchOptions & {
  collection_id?: ICollectionListing['collection_id']
  fields?: string
  handle?: ICollectionListing['handle']
  text?: SearchOptions['query']
}

/**
 * Shape of requests sent to the `/collections` endpoint.
 */
export interface FindCollectionsReq extends Omit<Req, 'query'> {
  query: FindCollectionsQuery
}

/**
 * Query parameters accepted by the Shopify API Metafields endpoint.
 */
export type FindMetafieldParams = {
  /**
   * Show metafields created before date (format: 2014-04-25T16:15:47-04:00).
   */
  created_at_max?: IMetafield['created_at']

  /**
   * Show metafields created after date (format: 2014-04-25T16:15:47-04:00).
   */
  created_at_min?: IMetafield['created_at']

  /**
   * Show only certain fields, specified by a comma-separated list of field
   * names.
   */
  fields?: string

  /**
   * Show metafields with given key.
   */
  key?: string

  /**
   * The maximum number of results to show.
   *
   * - (default: 250, maximum: 250)
   *
   * @default 250
   */
  limit?: number

  /**
   * Show metafields with given namespace.
   */
  namespace?: string

  /**
   * Show metafields last updated before date (format:
   * 2014-04-25T16:15:47-04:00).
   */
  updated_at_max?: IMetafield['updated_at']

  /**
   * Show metafields last updated after date (format:
   * 2014-04-25T16:15:47-04:00).
   */
  updated_at_min?: IMetafield['updated_at']

  /**
   * Show metafields with a given value_type:
   *
   * - `integer`: Show only metafields with integer value types
   * - `string`: Show only metafields with string value types
   */
  value_type?: 'integer' | 'string'
}

/**
 * Query parameters accepted by the `/products` endpoint.
 */
export type FindProductsQuery = PaginationSearchOptions & {
  fields?: string
  handle?: IProductListing['handle']
  product_id?: IProductListing['product_id']
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
export type {
  SearchOptions,
  Settings as IndexSettings
} from '@algolia/client-search'
export type {
  ApiError as AlgoliaError,
  RequestOptions
} from '@algolia/transporter'

/* eslint-disable prettier/prettier */
