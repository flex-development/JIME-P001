import type { ApiError as AlgoliaError } from '@algolia/transporter'
import type { AnyObject, ANYTHING } from '@flex-development/json'
import type {
  APIQuery,
  APIRequestBody,
  ErrorJSON,
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
export type APIError = AlgoliaError | ErrorJSON | Error

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
 * Shape of requests handled by the `Collection` service.
 */
export namespace CollectionReq {
  export interface Find extends APIRequest {
    query: APIQuery.Collection.Find
  }

  export interface Get extends APIRequest {
    query: APIQuery.Collection.Get
  }
}

/**
 * Shape of requests handled by the `Menu` service.
 */
export namespace MenuReq {
  export interface Find extends APIRequest {
    query: APIQuery.Menu.Find
  }

  export interface Get extends APIRequest {
    query: APIQuery.Menu.Get
  }
}

/**
 * Shape of requests handled by the `Page` service.
 */
export namespace PageReq {
  export interface Find extends APIRequest {
    query: APIQuery.Page.Find
  }

  export interface Get extends APIRequest {
    query: APIQuery.Page.Get
  }
}

/**
 * Shape of requests handled by the `Playlist` service.
 */
export namespace PlaylistReq {
  export interface Get extends APIRequest {
    query: APIQuery.Playlist.Get
  }
}

/**
 * Shape of requests handled by the `Policie` service.
 */
export namespace PolicyReq {
  export interface Find extends APIRequest {
    query: APIQuery.Policy.Find
  }

  export interface Get extends APIRequest {
    query: APIQuery.Policy.Get
  }
}

/**
 * Shape of requests handled by the `Product` service.
 */
export namespace ProductReq {
  export interface Find extends APIRequest {
    query: APIQuery.Product.Find
  }

  export interface Get extends APIRequest {
    query: APIQuery.Product.Get
  }
}

/**
 * Shape of requests handled by the `Review` service.
 */
export namespace ReviewReq {
  export interface Create extends APIRequest {
    body: APIRequestBody.Review.POST
  }

  export interface Find extends APIRequest {
    query: APIQuery.Review.Find
  }

  export interface Get extends APIRequest {
    query: APIQuery.Review.Get
  }
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
  | 'reviews'

/**
 * Search index object that can have additional properties appended to it after
 * it retrieved from the search index.
 */
export type TObjectEnhanced<TObject = AnyObject> = TObject & {
  [x: string]: ANYTHING
}

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
