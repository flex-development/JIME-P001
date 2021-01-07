import { axiosShopify } from '@app/config/axios'
import { PartialOr } from '@flex-development/json'
import {
  createError,
  Logger,
  ShopifyAPIResponses as SAR,
  ShopifyMenu
} from '@flex-development/kustomzcore'
import { isEmpty, isString, pick } from 'lodash'
import { FindMenuParams, IMenuService } from './IMenuService'

/**
 * @file Implementation - MenuService
 * @module subdomains/cms/services/MenuService/impl
 */

export default class MenuService implements IMenuService {
  /**
   * Get all online store menus.
   *
   * @async
   * @param params - Query parameterse
   * @param params.fields - Comma-separated list of fields to show
   * @param params.handle - Retrieve pages with a given handle
   * @param params.limit - Maximum number of results to show
   * @param params.title - Retrieve pages with a given title
   * @throws {FeathersErrorJSON}
   */
  async find(params: FindMenuParams = {}): Promise<PartialOr<ShopifyMenu>[]> {
    // Build request config
    const config: Parameters<typeof axiosShopify>[0] = { method: 'get' }

    // Initialize menus array
    let menus: PartialOr<ShopifyMenu>[] = []

    try {
      // Get shop menus
      menus = (await axiosShopify<SAR.Menus>(config, true)).menus || []
    } catch (error) {
      Logger.error({ 'MenuService.find': error })
      throw error
    }

    // Handle `fields` query param
    if (isString(params.fields) && params.fields.length) {
      const fields = params.fields?.trim().split(',')
      menus = menus.map(menu => pick(menu, fields))
    }

    // Handle `handle` query param
    if (isString(params.handle) && params.handle.length) {
      menus = menus.filter(menu => menu.handle === params.handle)
    }

    // Handle `title` query param
    if (isString(params.title) && params.title.length) {
      menus = menus.filter(menu => menu.title === params.title)
    }

    // Handle `limit` query param
    menus = menus.slice(0, params.limit || menus.length)

    if (!isEmpty(params.fields)) return menus as Partial<ShopifyMenu>[]
    return menus as ShopifyMenu[]
  }

  /**
   * Retrieve a menu by handle. Throws an error if the menu isn't found.
   *
   * @async
   * @param handle - Handle of menu to find
   * @param params - Query parameters
   * @param params.fields - Comma-separated list of fields to show
   * @throws {FeathersErrorJSON}
   */
  async get(
    handle: ShopifyMenu['handle'],
    params?: Pick<FindMenuParams, 'fields'>
  ): Promise<Partial<ShopifyMenu>> {
    const menus = await this.find({ ...pick(params, ['fields']), handle })

    if (!menus.length) {
      const error_data = { handle, params }
      const error_message = `Menu with handle "${handle}" not found`

      const error = createError(error_message, error_data, 404)

      Logger.error({ 'MenuService.get': error })
      throw error
    }

    return menus[0]
  }
}
