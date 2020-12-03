import { ICMSEntity } from '../CMSEntity/ICMSEntity'
import { ICMSMenuLink } from '../CMSMenuLink/ICMSMenuLink'

/**
 * @file Subdomain Interface - CMS Menu
 * @module subdomains/cms/models/CMSMenu/interface
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
