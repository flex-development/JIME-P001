import { FeathersErrorJSON } from '@feathersjs/errors'
import { ShopifyMenu as Menu } from '@flex-development/kustomzcore'
import { MenuService } from '@subdomains/cms/services'
import { pick } from 'lodash'
import useSWR, { ConfigInterface } from 'swr'

/**
 * @file Implementation - useMenu
 * @module subdomains/cms/hooks/useMenu/impl
 */

// Initialize services
const Menus = new MenuService()

/**
 * `useSWR` configuration.
 */
const CONFIG: ConfigInterface<Menu, FeathersErrorJSON> = {
  fetcher: async (handle: Menu['handle']) => (await Menus.get(handle)) as Menu,
  refreshWhenHidden: true
}

/**
 * `useMenu` return type.
 */
export type UseMenu = {
  error?: FeathersErrorJSON
  data?: Menu
  isValidating: boolean
}

/**
 * Fetches a store menu.
 *
 * @param handle - Handle of menu to get
 */
export const useMenu = (handle: Menu['handle']): UseMenu => {
  const menus = useSWR<Menu, FeathersErrorJSON>(handle, CONFIG.fetcher, CONFIG)
  return pick(menus, ['data', 'error', 'isValidating'])
}
