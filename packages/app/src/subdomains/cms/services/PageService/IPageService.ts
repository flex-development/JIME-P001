import { IMetafieldService } from '@app/subdomains/metafields'
import { PartialOr } from '@flex-development/json'
import { IPage } from '@flex-development/kustomzcore'

/**
 * @file Interface - PageService
 * @module subdomains/cms/services/PageService/interface
 */

export interface IPageService {
  Metafields: IMetafieldService

  find(params?: FindPageParams): Promise<PartialOr<IPage>[]>
  findByHandle(
    handle: IPage['handle'],
    params?: Pick<FindPageParams, 'fields'>
  ): Promise<PartialOr<IPage> | null>
  get(
    handle: IPage['handle'],
    params?: Pick<FindPageParams, 'fields'>
  ): Promise<PartialOr<IPage>>
}

export type FindPageParams = {
  /**
   * Show pages created before date (format: 2008-12-31).
   */
  created_at_max?: IPage['created_at']

  /**
   * Show pages created after date (format: 2008-12-31).
   */
  created_at_min?: IPage['created_at']

  /**
   * Show only certain fields, specified by a comma-separated list of field
   * names.
   */
  fields?: string

  /**
   * Retrieve pages with a given handle.
   */
  handle?: IPage['handle']

  /**
   * The maximum number of results to show.
   *
   * - (default: 50, maximum: 250)
   *
   * @default 50
   */
  limit?: number

  /**
   * Show pages published before date (format: 2008-12-31).
   */
  published_at_max?: IPage['published_at']

  /**
   * Show pages published after date (format: 2008-12-31).
   */
  published_at_min?: IPage['published_at']

  /**
   * Restrict results to pages with a given published status:
   *
   * - `any`: Show published and unpublished pages
   * - `published`: Show only published pages
   * - `unpublished`: Show only unpublished pages
   *
   * @default 'any'
   */
  published_status?: 'any' | 'published' | 'unpublished'

  /**
   * Restrict results to after the specified ID.
   */
  since_id?: number

  /**
   * Retrieve pages with a given title.
   */
  title?: IPage['title']

  /**
   * Show pages updated before date (format: 2008-12-31).
   */
  updated_at_max?: IPage['updated_at']

  /**
   * Show pages updated after date (format: 2008-12-31).
   */
  updated_at_min?: IPage['updated_at']
}

/**
 * Type of data returned from the Shopify `/pages` endpoint.
 */
export type ShopifyPageRes = { page: IPage }

/**
 * Type of data returned from the Shopify `/pages` endpoint.
 */
export type ShopifyPagesRes = { pages: IPage[] }
