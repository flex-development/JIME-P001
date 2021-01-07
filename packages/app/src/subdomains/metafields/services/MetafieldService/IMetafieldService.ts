import { PartialOr } from '@flex-development/json'
import {
  ICollectionListing,
  IMetafield,
  IPage,
  IProductListing
} from '@flex-development/kustomzcore'

/**
 * @file Interface - MetafieldService
 * @module subdomains/store/services/MetafieldService/interface
 */

export interface IMetafieldService {
  collection(
    id: ICollectionListing['collection_id'],
    params?: FindMetafieldParams
  ): Promise<PartialOr<IMetafield>[]>
  page(
    id: IPage['id'],
    params?: FindMetafieldParams
  ): Promise<PartialOr<IMetafield>[]>
  product(
    id: IProductListing['product_id'],
    params?: FindMetafieldParams
  ): Promise<PartialOr<IMetafield>[]>
  shop(params?: FindMetafieldParams): Promise<PartialOr<IMetafield>[]>
}

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
