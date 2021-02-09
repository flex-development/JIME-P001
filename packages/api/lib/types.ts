import type { SearchOptions } from '@algolia/client-search'
import type {
  AnyObject,
  ANYTHING,
  NullishString,
  PartialOr
} from '@flex-development/json'
import type {
  ICollectionListing,
  IMetafield,
  IPage,
  IPolicy,
  IProductListing,
  IProductListingVariant,
  Playlist,
  PlaylistAttributes,
  ShopifyMenu,
  ShopifyMenuLink,
  SongAttributes
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
export interface FindCollectionsReq extends APIRequest {
  query: FindCollectionsQuery
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
 * Shape of requests sent to the `/menus` endpoint.
 */
export interface FindMenusReq extends APIRequest {
  query: FindMenusQuery
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
 * Shape of requests sent to the `/pages` endpoint.
 */
export interface FindPagesReq extends APIRequest {
  query: FindPagesQuery
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
 * Shape of requests sent to the `/collections/[handle]` endpoint.
 */
export interface GetCollectionReq extends APIRequest {
  query: GetCollectionQuery
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
 * Shape of requests sent to the `/metafields/globals` endpoint.
 */
export interface GetGlobalMetafieldsReq extends APIRequest {
  query: Omit<FindMetafieldParams, 'namespace'>
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
 * Shape of requests sent to the `/menus/[handle]` endpoint.
 */
export interface GetMenuReq extends APIRequest {
  query: GetMenuQuery
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
 * Shape of requests sent to the `/pages/[handle]` endpoint.
 */
export interface GetPageReq extends APIRequest {
  query: GetPageQuery
}

/**
 * Shape of JSON responses from the `/pages/*` endpoint.
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
 * Shape of requests sent to the `/policies/[handle]` endpoint.
 */
export interface GetPolicyReq extends APIRequest {
  query: GetPolicyQuery
}

/**
 * Shape of JSON responses from the `/pages/*` endpoint.
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
 * Shape of requests sent to the `/products/[handle]` endpoint.
 */
export interface GetProductReq extends APIRequest {
  query: GetProductQuery
}

/**
 * Shape of JSON responses from the `/products/*` endpoint.
 */
export type GetProductResJSON = PartialOr<ResourceWithSEO<IProductListing>>

/**
 * Query parameters accepted by the `/assets/*` endpoints.
 */
export type GetStaticAssetQuery = {
  filename: string
  height?: number | string
  width?: number | string
}

/**
 * Shape of requests sent to the the `/assets/*` endpoints.
 */
export interface GetStaticAssetReq extends APIRequest {
  query: GetStaticAssetQuery
}

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

/**
 * Object representing SEO data.
 */
export type SEOData = {
  /**
   * Description of the page in less than 150 characters.
   *
   * @default ''
   */
  description?: string

  /**
   * Comma-delimitted list of SEO keywords.
   *
   * @default ''
   */
  keywords?: string

  /**
   * Object containing Open Graph metadata.
   *
   * @default {}
   */
  og?: {
    category?: NullishString
    image?: NullishString
    'image:alt'?: NullishString
    'image:height'?: NullishString | number
    'image:secure_url'?: NullishString
    'image:width'?: NullishString | number
    'product:availability'?: NullishString
    'product:brand'?: NullishString
    'product:condition'?: NullishString
    'product:price:amount'?: NullishString
    'product:price:currency'?: NullishString
    'product:item_group_id'?: NullishString
    'product:retailer_item_id'?: NullishString
  }

  /**
   * A title is used on all pages (SEO: Google calculates the pixel width of the
   * characters used in the title, and it cuts off between 472 and 482 pixels.
   * The average character limit would be around 55-characters).
   *
   * The value `| Morena's Kustomz` will be appended to the title if defined.
   *
   * @default "Morena's Kustomz"
   */
  title?: string

  /**
   * Object containing Twitter social metadata.
   *
   * @default {}
   */
  twitter?: {
    [x: string]: NullishString | undefined

    card?: 'app' | 'player' | 'summary' | 'summary_large_image' | null
    creator?: string
    image?: string
    site?: string
  }
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
