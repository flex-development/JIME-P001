import { axiosShopify } from '@app/config/axios'
import { PartialOr } from '@flex-development/json/utils/types'
import {
  IObjectMetafield,
  IPage,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore/types/shopify'
import { FindPageParams } from '@subdomains/cms/utils/types'
import pageMetafields from '@subdomains/metafields/utils/pageMetafields'
import debug from 'debug'

/**
 * @file Implementation - findPages
 * @module subdomains/cms/utils/findPages
 */

/**
 * Returns an array of online store pages.
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
const findPages = async (
  params: FindPageParams = {}
): Promise<PartialOr<IPage>[]> => {
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
    debug('subdomains/cms/utils/findPages')(error)
    throw error
  }

  /**
   * Retrieves the metafields for each page in the `pages` array.
   *
   * @async
   * @param pages - Array of pages to get metafields for
   */
  const metafields = (pages: IPage[]) => {
    return pages.map(async page => {
      const metafield = await pageMetafields((page as IPage).id)
      return { ...page, metafield: metafield as IObjectMetafield[] }
    })
  }

  // Get page metafields for each page
  return await Promise.all(metafields(pages as IPage[]))
}

export default findPages
