import type { SearchOptions } from '@algolia/client-search'
import type { AnyObject, PartialOr } from '@flex-development/json/utils/types'
import type {
  Playlist,
  PlaylistAttributes,
  SongAttributes
} from './apple-music'
import type { JudgeMeReviewCreateParams } from './reviews'
import type {
  ICollectionListing,
  IMetafield,
  IPage,
  IPolicy,
  IProductListing,
  IProductListingVariant,
  ShopifyMenu,
  ShopifyMenuLink
} from './shopify'
import type { SEOData } from './storefront'

/**
 * @file Type Definitions - API
 * @module types/api
 */

/**
 * JSON body expected by the `/reviews` endpoint when sending a `POST` request.
 */
export type CreateReviewBody = Pick<
  JudgeMeReviewCreateParams,
  | 'body'
  | 'email'
  | 'id'
  | 'ip_addr'
  | 'picture_keys'
  | 'picture_urls'
  | 'rating'
  | 'title'
>

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
 * Query parameters accepted by the `/menus` endpoint.
 */
export type FindMenusQuery = PaginationSearchOptions & {
  fields?: string
  handle?: ShopifyMenu['handle']
  text?: SearchOptions['query']
  title?: ShopifyMenu['title']
}

/**
 * Query parameters accepted by the `/metafields/*` endpoints.
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
 * Query parameters accepted by the `/pages` endpoint.
 */
export type FindPagesQuery = PaginationSearchOptions & {
  author?: IPage['author']
  fields?: string
  handle?: IPage['handle']
  id?: IPage['id']
  text?: SearchOptions['query']
}

/**
 * Query parameters accepted by the `/policies` endpoint.
 */
export type FindPoliciesQuery = PaginationSearchOptions & {
  fields?: string
  handle?: IPolicy['handle']
  text?: SearchOptions['query']
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
 * Query parameters accepted by the `/collections/[handle]` endpoint.
 */
export type GetCollectionQuery = {
  fields?: string
  handle: ICollectionListing['handle']
}

/**
 * Shape of JSON responses from the `/collections/[handle]` endpoint.
 */
export type GetCollectionResJSON = PartialOr<
  ResourceWithSEO<
    ICollectionListing & {
      metafield?: IMetafield[]
      products?: IProductListing[]
    }
  >
>

/**
 * Shape of JSON responses from the `/metafields/globals` endpoint.
 */
export type GetGlobalMetafieldsResJSON = Record<string, IMetafield>

/**
 * Query parameters accepted by the `/assets/images/[filename]` endpoint.
 */
export type GetImageAssetQuery = {
  filename: string
  height?: number | string
  width?: number | string
}

/**
 * Shape of JSON responses from the `/layout` endpoint.
 */
export type GetLayoutDataResJSON = {
  hero: {
    subtitle: string
    title: string
  }
  playlist: GetPlaylistResJSON
  sidebar: {
    age: number
    img: string
    location: string
    menu: ShopifyMenuLink[]
    mood: string
  }
}

/**
 * Query parameters accepted by the `/menus/[handle]` endpoint.
 */
export type GetMenuQuery = {
  fields?: string
  handle: ShopifyMenu['handle']
}

/**
 * Shape of JSON responses from the `/menus/[handle]` endpoint.
 */
export type GetMenuResJSON = PartialOr<ShopifyMenu>

/**
 * Shape of JSON responses from the `/playlist` endpoint.
 */
export type GetPlaylistResJSON = {
  attributes: Pick<PlaylistAttributes, 'name' | 'url'>
  id: Playlist['id']
  tracks: SongAttributes[]
}

/**
 * Query parameters accepted by the `/pages/[handle]` endpoint.
 */
export type GetPageQuery = {
  fields?: string
  handle: IPage['handle']
}

/**
 * Shape of JSON responses from the `/pages/[handle]` endpoint.
 */
export type GetPageResJSON = PartialOr<ResourceWithSEO<IPage>>

/**
 * Query parameters accepted by the `/policies/[handle]` endpoint.
 */
export type GetPolicyQuery = {
  fields?: string
  handle: IPolicy['handle']
}

/**
 * Shape of JSON responses from the `/policies/[handle]` endpoint.
 */
export type GetPolicyResJSON = PartialOr<ResourceWithSEO<IPolicy>>

/**
 * Query parameters accepted by the `/products/[handle]` endpoint.
 */
export type GetProductQuery = {
  fields?: string
  handle: IProductListing['handle']
  sku?: IProductListingVariant['sku']
}

/**
 * Shape of JSON responses from the `/products/[handle]` endpoint.
 */
export type GetProductResJSON = PartialOr<ResourceWithSEO<IProductListing>>

/**
 * Names of Algolia pagination search parameters.
 */
export type PaginationParameter = 'hitsPerPage' | 'length' | 'page' | 'offset'

/**
 * Object containing Algolia pagination search parameters.
 */
export type PaginationSearchOptions = Pick<SearchOptions, PaginationParameter>

/**
 * Any object with `SEOData`.
 */
export type ResourceWithSEO<R = AnyObject> = R & { seo: SEOData }
