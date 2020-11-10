import { IPageProps } from '@app/subdomains/app'
import { uuid } from '@flex-development/kustomzdesign'
import { ICMSMenu } from '../interfaces'
import { useNavigationForm } from './useNavigationForm'

/**
 * @file Get site navigation as menu links
 * @module hooks/useMenus
 */

export type UseMenus = {
  /**
   * Footer menu links.
   */
  footer: ICMSMenu['links']

  /**
   * Main menu links.
   */
  main: ICMSMenu['links']

  /**
   * Social menu links.
   */
  social: ICMSMenu['links']
}

/**
 * Registers a new `NavigationFormPlugin` instance and returns an object with
 * the links for the main, footer, and social menus.
 *
 * @param session - Current user session
 * @returns Object with main, footer, and social menu links
 */
export const useMenus = (session?: IPageProps['session']): UseMenus => {
  // Load menus from CMS
  const { modified: menus = [] } = useNavigationForm()

  // Find menus (links) for marketing site
  const menu = (id: string): ICMSMenu['links'] => {
    return menus.find(menu => menu.id === id)?.links ?? []
  }

  return {
    footer: menu('footer').concat([
      {
        href: '/api/auth/signin',
        title: 'Get Started',
        uuid: uuid()
      }
    ]),
    main: menu('main').concat([
      {
        href: `/api/auth/${session ? 'signout' : 'signin'}`,
        title: session ? 'Logout' : 'Login',
        uuid: uuid()
      }
    ]),
    social: menu('social')
  }
}
