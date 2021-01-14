import { PartialOr } from '@flex-development/json/utils/types'
import Logger from '@flex-development/kustomzcore/config/logger'
import { ShopifyMenu } from '@flex-development/kustomzcore/types/shopify'
import { createError } from '@flex-development/kustomzcore/utils/createError'
import findMenus from '@subdomains/cms/utils/findMenus'
import { FindMenuParams } from '@subdomains/cms/utils/types'
import pick from 'lodash/pick'

/**
 * @file Implementation - getMenu
 * @module subdomains/cms/utils/getMenu
 */

/**
 * Retrieve a menu by handle. Throws an error if the menu isn't found.
 *
 * @async
 * @param handle - Handle of menu to find
 * @param params - Query parameters
 * @param params.fields - Comma-separated list of fields to show
 * @throws {FeathersErrorJSON}
 */
const getMenu = async (
  handle: ShopifyMenu['handle'],
  params?: Pick<FindMenuParams, 'fields'>
): Promise<PartialOr<ShopifyMenu>> => {
  const menus = await findMenus({ ...pick(params, ['fields']), handle })

  if (!menus.length) {
    const error_data = { handle, params }
    const error_message = `Menu with handle "${handle}" not found`

    const error = createError(error_message, error_data, 404)

    Logger.error({ getMenu: error })
    throw error
  }

  return menus[0]
}

export default getMenu
