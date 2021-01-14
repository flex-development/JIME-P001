import { FeathersErrorJSON } from '@feathersjs/errors'
import { PartialOr } from '@flex-development/json/utils/types'
import { ShopifyMenu } from '@flex-development/kustomzcore/types/shopify'
import fetcher from '@subdomains/cms/utils/getMenu'
import pick from 'lodash/pick'
import useSWR from 'swr/use-swr'

/**
 * @file Implementation - useMenu
 * @module subdomains/cms/hooks/useMenu/impl
 */

export type Menu = PartialOr<ShopifyMenu>

export type UseMenu = {
  error?: FeathersErrorJSON
  data?: Menu
  isValidating: boolean
}

/**
 * Fetches a store menu.
 *
 * @param handle - Handle of menu to find
 * @param params - Query parameters
 * @param params.fields - Comma-separated list of fields to show
 */
export const useMenu = (
  handle: Parameters<typeof fetcher>[0],
  params?: Parameters<typeof fetcher>[1]
): UseMenu => {
  const menus = useSWR<Menu, FeathersErrorJSON>([handle, params], fetcher, {
    refreshWhenHidden: true
  })

  return pick(menus, ['data', 'error', 'isValidating'])
}
