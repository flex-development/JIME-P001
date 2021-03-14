import type { ApiError as AlgoliaError } from '@algolia/transporter'
import type { FeathersErrorJSON } from '@feathersjs/errors'
import type { AnyObject, ANYTHING } from '@flex-development/json'
import type {
  FindCollectionsQuery,
  FindPagesQuery,
  FindProductsQuery,
  FindSearchIndexResourceQuery,
  GetGlobalMetafieldsQuery,
  GetImageAssetQuery,
  GetPlaylistQuery,
  GetProductQuery,
  GetSearchIndexResourceQuery,
  OrNever,
  OrPromise
} from '@flex-development/kustomzcore'
import type { VercelRequest } from '@vercel/node'
import type { Logger } from 'pino'

/**
 * @file Type Definitions
 * @module lib/types
 */

/**
 * Shape of API error objects (with or without formatting).
 */
export type APIError = Error | AlgoliaError | FeathersErrorJSON

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
  query: FindSearchIndexResourceQuery
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
  query: FindSearchIndexResourceQuery
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
  query: GetSearchIndexResourceQuery
}

/**
 * Shape of requests sent to the `/metafields/globals` endpoint.
 */
export interface GetGlobalMetafieldsReq extends APIRequest {
  query: GetGlobalMetafieldsQuery
}

/**
 * Shape of requests sent to the `/assets/images/[filename]` endpoint.
 */
export interface GetImageAssetReq extends APIRequest {
  query: GetImageAssetQuery
}

/**
 * Shape of requests sent to the `/menus/[handle]` endpoint.
 */
export interface GetMenuReq extends APIRequest {
  query: GetSearchIndexResourceQuery
}

/**
 * Shape of requests sent to the `/pages/[handle]` endpoint.
 */
export interface GetPageReq extends APIRequest {
  query: GetSearchIndexResourceQuery
}

/**
 * Shape of requests sent to the `/playlist` endpoint.
 */
export interface GetPlaylistReq extends APIRequest {
  query: GetPlaylistQuery
}

/**
 * Shape of requests sent to the `/policies/[handle]` endpoint.
 */
export interface GetPolicyReq extends APIRequest {
  query: GetSearchIndexResourceQuery
}

/**
 * Shape of requests sent to the `/products/[handle]` endpoint.
 */
export interface GetProductReq extends APIRequest {
  query: GetProductQuery
}

/**
 * Search index names.
 */
export type SearchIndexName =
  | 'collections'
  | 'menus'
  | 'pages'
  | 'policies'
  | 'products'

/**
 * Function to populate search index.
 */
export type SearchIndexObjectsFN<TObject = AnyObject> = {
  (): OrNever<OrPromise<TObject[]>>
}

/**
 * Shopify resources that have a `metafield` property.
 */
export type ShopifyResourceWithMetafield = 'collections' | 'pages' | 'products'

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
