import type { Hit, SearchOptions } from '@algolia/client-search'
import type { AnyObject, PartialOr } from '@flex-development/json'
import type {
  Playlist,
  PlaylistAttributes,
  SongAttributes
} from './apple-music'
import type { JudgeMeReview, JudgeMeReviewCreateParams } from './reviews'
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
import type { NumberString } from './utils'

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
export interface FindCollectionsQuery extends FindSearchIndexResourceQuery {
  collection_id?: ICollectionListing['collection_id']
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
  fields?: FindSearchIndexResourceQuery['fields']

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
export interface FindPagesQuery extends FindSearchIndexResourceQuery {
  author?: IPage['author']
  id?: IPage['id']
}

/**
 * Query parameters accepted by the `/products` endpoint.
 */
export interface FindProductsQuery extends FindSearchIndexResourceQuery {
  product_id?: IProductListing['product_id']
}

/**
 * Query parameters accepted by the `/reviews` endpoint.
 */
export interface FindReviewsQuery extends FindSearchIndexResourceQuery {
  created_at?: JudgeMeReview['created_at']
  curated?: JudgeMeReview['curated']
  featured?: JudgeMeReview['featured']
  hidden?: JudgeMeReview['hidden']
  id?: JudgeMeReview['id']
  ip_address?: JudgeMeReview['ip_address']
  product_id?: JudgeMeReview['product_id']
  reviewer_id?: JudgeMeReview['reviewer_id']
  source?: JudgeMeReview['source']
  updated_at?: JudgeMeReview['updated_at']
  verified?: JudgeMeReview['verified']
}

/**
 * Query parameters accepted by endpoints that handle search index resources.
 */
export interface FindSearchIndexResourceQuery extends PaginationSearchOptions {
  /**
   * Comma-separated list of property fields to show.
   */
  fields?: string

  /**
   * Find resource by search index object ID.
   */
  objectID?: Hit<AnyObject>['objectID']

  /**
   * Text to query search index.
   */
  text?: SearchOptions['query']
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
 * Query parameters accepted by the `/metafields/globals` endpoint.
 */
export type GetGlobalMetafieldsQuery = Omit<FindMetafieldParams, 'namespace'>

/**
 * Shape of JSON responses from the `/metafields/globals` endpoint.
 */
export type GetGlobalMetafieldsResJSON = Record<string, PartialOr<IMetafield>>

/**
 * Query parameters accepted by the `/assets/images/[filename]` endpoint.
 */
export type GetImageAssetQuery = {
  filename: string
  height?: NumberString
  width?: NumberString
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
  seo: SEOData
  sidebar: {
    age: number
    img: string
    location: string
    menu: ShopifyMenuLink[]
    mood: string
  }
}

/**
 * Shape of JSON responses from the `/menus/[handle]` endpoint.
 */
export type GetMenuResJSON = PartialOr<ShopifyMenu>

/**
 * Shape of JSON responses from the `/pages/[handle]` endpoint.
 */
export type GetPageResJSON = PartialOr<ResourceWithSEO<IPage>>

/**
 * Query parameters accepted by the `/playlist` endpoint.
 */
export type GetPlaylistQuery = {
  fields?: GetSearchIndexResourceQuery['fields']
}

/**
 * Shape of JSON responses from the `/policies/[handle]` endpoint.
 */
export type GetPolicyResJSON = PartialOr<ResourceWithSEO<IPolicy>>

/**
 * Shape of JSON responses from the `/playlist` endpoint.
 */
export type GetPlaylistResJSON = {
  attributes: Pick<PlaylistAttributes, 'name' | 'url'>
  id: Playlist['id']
  tracks: SongAttributes[]
}

/**
 * Query parameters accepted by the `/products/[handle]` endpoint.
 */
export interface GetProductQuery extends GetSearchIndexResourceQuery {
  handle: IProductListing['handle']
  sku?: IProductListingVariant['sku']
}

/**
 * Shape of JSON responses from the `/products/[handle]` endpoint.
 */
export type GetProductResJSON = PartialOr<ResourceWithSEO<IProductListing>>

/**
 * Query parameters accepted by endpoints that return one search index resource.
 */
export type GetSearchIndexResourceQuery = Pick<
  FindSearchIndexResourceQuery,
  'fields' | 'objectID'
>

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
