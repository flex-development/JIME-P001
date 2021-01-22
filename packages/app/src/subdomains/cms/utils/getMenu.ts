import kapi from '@app/config/axios-kapi'
import type { PartialOr } from '@flex-development/json/utils/types'
import type { ShopifyMenu } from '@flex-development/kustomzcore/types'
import type { GetMenuQuery } from '@kapi/types'
import debug from 'debug'

/**
 * @file Implementation - getMenu
 * @module subdomains/cms/utils/getMenu
 */

/**
 * Retrieve a menu by handle. Throws an error if the menu isn't found.
 *
 * @async
 * @param handle - Handle of menu to retrieve
 * @param params - Query parameters
 * @param params.fields - Comma-separated list of fields to show
 * @throws {FeathersErrorJSON}
 */
const getMenu = async (
  handle: ShopifyMenu['handle'],
  fields?: GetMenuQuery['fields']
): Promise<PartialOr<ShopifyMenu>> => {
  try {
    return await kapi<PartialOr<ShopifyMenu>>({
      method: 'get',
      params: { fields },
      url: `/menus/${handle}`
    })
  } catch (error) {
    debug('subdomains/cms/utils/getMenu')(error)
    throw error
  }
}

export default getMenu
