import { IMetafield } from '@flex-development/kustomzcore/types/shopify'

/**
 * @file Utility Types
 * @module subdomains/metafields/utils/types
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
