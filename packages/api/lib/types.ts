import type { ANYTHING } from '@flex-development/json'
import type {
  FindCollectionsQuery,
  FindMenusQuery,
  FindMetafieldParams,
  FindPagesQuery,
  FindPoliciesQuery,
  FindProductsQuery,
  GetCollectionQuery,
  GetImageAssetQuery,
  GetMenuQuery,
  GetPageQuery,
  GetPolicyQuery,
  GetProductQuery
} from '@flex-development/kustomzcore'
import type { VercelRequest } from '@vercel/node'
import type { Logger } from 'pino'

/**
 * @file Type Declarations
 * @module types
 */

/**
 * Shape of the API `req` object.
 */
export interface APIRequest extends VercelRequest {
  logger: Logger
  method: string
  path: string
  query: Record<string, ANYTHING>
  url: string
}

/**
 * Shape of requests sent to the `/collections` endpoint.
 */
export interface FindCollectionsReq extends APIRequest {
  query: FindCollectionsQuery
}

/**
 * Shape of requests sent to the `/menus` endpoint.
 */
export interface FindMenusReq extends APIRequest {
  query: FindMenusQuery
}

/**
 * Shape of requests sent to the `/pages` endpoint.
 */
export interface FindPagesReq extends APIRequest {
  query: FindPagesQuery
}

/**
 * Shape of requests sent to the `/policies` endpoint.
 */
export interface FindPoliciesReq extends APIRequest {
  query: FindPoliciesQuery
}

/**
 * Shape of requests sent to the `/products` endpoint.
 */
export interface FindProductsReq extends APIRequest {
  query: FindProductsQuery
}

/**
 * Shape of requests sent to the `/collections/[handle]` endpoint.
 */
export interface GetCollectionReq extends APIRequest {
  query: GetCollectionQuery
}

/**
 * Shape of requests sent to the `/metafields/globals` endpoint.
 */
export interface GetGlobalMetafieldsReq extends APIRequest {
  query: Omit<FindMetafieldParams, 'namespace'>
}

/**
 * Shape of requests sent to the `/menus/[handle]` endpoint.
 */
export interface GetMenuReq extends APIRequest {
  query: GetMenuQuery
}

/**
 * Shape of requests sent to the `/pages/[handle]` endpoint.
 */
export interface GetPageReq extends APIRequest {
  query: GetPageQuery
}

/**
 * Shape of requests sent to the `/policies/[handle]` endpoint.
 */
export interface GetPolicyReq extends APIRequest {
  query: GetPolicyQuery
}

/**
 * Shape of requests sent to the `/products/[handle]` endpoint.
 */
export interface GetProductReq extends APIRequest {
  query: GetProductQuery
}

/**
 * Shape of requests sent to the `/assets/images/[filename]` endpoint.
 */
export interface GetImageAssetReq extends APIRequest {
  query: GetImageAssetQuery
}

/**
 * Search index names.
 */
export type SearchIndexName =
  | 'collection_listings'
  | 'menus'
  | 'pages'
  | 'policies'
  | 'product_listings'

// Algolia types
export type {
  Hit,
  SearchOptions,
  Settings as SearchIndexSettings
} from '@algolia/client-search'
export type {
  ApiError as AlgoliaError,
  RequestOptions
} from '@algolia/transporter'
export type { SearchIndex } from 'algoliasearch'

/* eslint-disable prettier/prettier */
