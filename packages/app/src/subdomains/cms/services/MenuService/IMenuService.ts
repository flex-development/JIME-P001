import { PartialOr } from '@flex-development/json'
import { ShopifyMenu } from '@flex-development/kustomzcore'

/**
 * @file Interface - MenuService
 * @module subdomains/cms/services/MenuService/interface
 */

export interface IMenuService {
  find(params?: FindMenuParams): Promise<PartialOr<ShopifyMenu>[]>
  get(
    handle: ShopifyMenu['handle'],
    params?: Pick<FindMenuParams, 'fields'>
  ): Promise<PartialOr<ShopifyMenu>>
}

export type FindMenuParams = {
  /**
   * Show only certain fields, specified by a comma-separated list of field
   * names.
   */
  fields?: string

  /**
   * Retrieve menus with a given handle.
   */
  handle?: ShopifyMenu['handle']

  /**
   * The maximum number of results to show.
   */
  limit?: number

  /**
   * Retrieve menus with a given title.
   */
  title?: ShopifyMenu['title']
}
