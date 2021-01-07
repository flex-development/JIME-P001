import { axiosShopify } from '@app/config/axios'
import { MetafieldService } from '@app/subdomains/metafields/services'
import { PartialOr } from '@flex-development/json'
import {
  createError,
  IObjectMetafield,
  IPage,
  Logger,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore'
import { isEmpty, pick } from 'lodash'
import { FindPageParams, IPageService } from './IPageService'

/**
 * @file Implementation - PageService
 * @module subdomains/cms/services/PageService/impl
 */

export default class PageService implements IPageService {
  Metafields: IPageService['Metafields']

  /**
   * Creates a new `PageService` instance.
   */
  constructor() {
    this.Metafields = new MetafieldService()
  }

  /**
   * Get all online store pages.
   *
   * @async
   * @param params - Query parameters
   * @param params.created_at_max - Show pages created before date
   * @param params.created_at_min - Show pages created after date
   * @param params.fields - Comma-separated list of fields to show
   * @param params.handle - Retrieve pages with a given handle
   * @param params.limit - Maximum number of results to show. Defaults to `250`
   * @param params.published_at_max - Show pages published before date
   * @param params.published_at_min - Show pages published after date
   * @param params.published_status - Restrict results to pages with a given
   * published status: `any` | `published` | `unpublished`. Defaults to `any`
   * @param params.since_id - Restrict results to after the specified ID
   * @param params.title - Retrieve pages with a given title
   * @param params.updated_at_max - Show pages updated before date
   * @param params.updated_at_min - Show pages updated after date
   * @throws {FeathersErrorJSON}
   */
  async find(params: FindPageParams = {}): Promise<PartialOr<IPage>[]> {
    // Build request config
    const config: Parameters<typeof axiosShopify>[0] = {
      method: 'get',
      params: { ...params, limit: params.limit || 250 },
      url: 'pages'
    }

    // Initialize pages array
    let pages: PartialOr<IPage>[] = []

    // Get pages
    try {
      pages = (await axiosShopify<SAR.Pages>(config)).pages
    } catch (error) {
      Logger.error({ 'PageService.find': error })
      throw error
    }

    /**
     * Retrieves the metafields for each page in the `pages` array.
     *
     * @async
     * @param pages - Array of pages to get metafields for
     */
    const getPageMetafields = (pages: IPage[]) => {
      return pages.map(async page => {
        const metafield = await this.Metafields.page((page as IPage).id)
        return { ...page, metafield: metafield as IObjectMetafield[] }
      })
    }

    // Get page metafields for each page
    pages = await Promise.all(getPageMetafields(pages as IPage[]))

    if (!isEmpty(params.fields)) return pages as Partial<IPage>[]
    return pages as IPage[]
  }

  /**
   * Find a page by handle. Returns `null` if the page isn't found.
   *
   * @async
   * @param handle - Handle of page to find
   * @param params - Query parameters
   * @param params.fields - Comma-separated list of fields to show
   */
  async findByHandle(
    handle: IPage['handle'],
    params?: Pick<FindPageParams, 'fields'>
  ): Promise<PartialOr<IPage> | null> {
    const pages = await this.find({ ...pick(params, ['fields']), handle })
    return pages[0] || null
  }

  /**
   * Retrieves a page by handle. Throws an error if the page isn't found.
   *
   * @async
   * @param handle - Handle of page to get
   * @param params - Query parameters
   * @param params.fields - Comma-separated list of fields to show
   * @throws {FeathersErrorJSON}
   */
  async get(
    handle: IPage['handle'],
    params?: Pick<FindPageParams, 'fields'>
  ): Promise<PartialOr<IPage>> {
    const page = await this.findByHandle(handle, params)

    if (!page) {
      const error_data = { handle, params }
      const error_message = `Page with handle "${handle}" not found.`
      const error = createError(error_message, error_data, 404)

      Logger.error({ 'PageService.get': error })
      throw error
    }

    return page
  }
}
