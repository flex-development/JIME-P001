import { ICMSEntity } from './ICMSEntity'
import { ICMSMenuLink } from './ICMSMenuLink'

/**
 * @file Domain Object Interfaces - CMS Menu
 * @module subdomains/cms/interfaces/ICMSMenu
 */

/**
 * Object representing a CMS menu.
 */
export interface ICMSMenu extends ICMSEntity {
  /**
   * Menu links.
   */
  links: Array<ICMSMenuLink>

  /**
   * Menu title.
   */
  title: string
}

/**
 * Object containing all the menus in the CMS database.
 */
export type CMSMenusDTO = { menus: ICMSMenu[] }
