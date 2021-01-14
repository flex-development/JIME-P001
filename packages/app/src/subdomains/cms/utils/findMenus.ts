import { axiosShopify } from '@app/config/axios'
import { PartialOr } from '@flex-development/json/utils/types'
import Logger from '@flex-development/kustomzcore/config/logger'
import {
  ShopifyAPIResponses as SAR,
  ShopifyMenu
} from '@flex-development/kustomzcore/types/shopify'
import { FindMenuParams } from '@subdomains/cms/utils/types'
import pick from 'lodash/pick'

/**
 * @file Implementation - findMenus
 * @module subdomains/cms/utils/findMenus
 */

/**
 * Returns an array of online store menus.
 *
 * @async
 * @param params - Query parameterse
 * @param params.fields - Comma-separated list of fields to show
 * @param params.handle - Retrieve pages with a given handle
 * @param params.limit - Maximum number of results to show
 * @param params.title - Retrieve pages with a given title
 * @throws {FeathersErrorJSON}
 */
const findMenus = async (
  params: FindMenuParams = {}
): Promise<PartialOr<ShopifyMenu>[]> => {
  // Build request config
  const config: Parameters<typeof axiosShopify>[0] = { method: 'get' }

  // Initialize menus array
  let menus: PartialOr<ShopifyMenu>[] = []

  try {
    // Get shop menus
    menus = (await axiosShopify<SAR.Menus>(config, true)).menus || []
  } catch (error) {
    Logger.error({ findMenus: error })
    throw error
  }

  // Handle `fields` query param
  if (typeof params.fields === 'string' && params.fields.length) {
    const fields = params.fields?.trim().split(',')
    menus = menus.map(menu => pick(menu, fields))
  }

  // Handle `handle` query param
  if (typeof params.handle === 'string' && params.handle.length) {
    menus = menus.filter(menu => menu.handle === params.handle)
  }

  // Handle `title` query param
  if (typeof params.title === 'string' && params.title.length) {
    menus = menus.filter(menu => menu.title === params.title)
  }

  // Handle `limit` query param
  menus = menus.slice(0, params.limit || menus.length)

  return menus
}

export default findMenus
