import { ICMSMenu } from '@app/subdomains/cms/models'
import { useNavigationForm } from '../useNavigationForm'

/**
 * @file Get site navigation as menu links
 * @module subdomains/cms/hooks/useMenus/impl
 */

export type UseMenus = {
  /**
   * Main menu links.
   */
  main: ICMSMenu['links']
}

/**
 * Registers a new `NavigationFormPlugin` instance and returns an object with
 * the links for the main menu.
 *
 * @returns Object with main menu links
 */
export const useMenus = (): UseMenus => {
  // Load menus from CMS
  const { modified: menus = [] } = useNavigationForm()

  // Find menus (links) for marketing site
  const menu = (id: string): ICMSMenu['links'] => {
    return menus.find(menu => menu.id === id)?.links ?? []
  }

  return { main: menu('main') }
}
