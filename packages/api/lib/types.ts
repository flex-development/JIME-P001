import type { SearchOptions } from '@algolia/client-search'
import type { AnyObject, NullishString } from '@flex-development/json'
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
