import { IPolicy } from '@flex-development/kustomzcore/types/shopify'

/**
 * @file Utility Types
 * @module subdomains/store/utils/types
 */

export type FindPolicyParams = {
  /**
   * Show only certain fields, specified by a comma-separated list of field
   * names.
   */
  fields?: string

  /**
   * Retrieve pages with a given handle.
   */
  handle?: IPolicy['handle']

  /**
   * The maximum number of results to show.
   *
   * - (default: 50, maximum: 250)
   *
   * @default 50
   */
  limit?: number

  /**
   * Retrieve pages with a given title.
   */
  title?: IPolicy['title']
}
