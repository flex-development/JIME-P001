import { AnyObject } from '@flex-development/json'
import {
  IndexTemplateProps,
  PageTemplateProps
} from '@flex-development/kustomzdesign'
import { ICMSEntity } from '../CMSEntity'

/**
 * @file Subdomain Interface - Basic CMS Page
 * @module subdomains/cms/models/CMSPage/interface
 */

/**
 * Object representing marketing site page data.
 */
export interface ICMSPage extends ICMSEntity {
  /**
   * Display name of template component.
   */
  component: 'IndexTemplate' | 'PageTemplate'

  /**
   * Object with template data.
   */
  content: IndexTemplateProps | PageTemplateProps

  /**
   * True if page shouldn't be published.
   */
  draft: boolean

  /**
   * Object containing SEO information for the page.
   */
  metadata: AnyObject

  /**
   * Path page can be accessed from.
   */
  path: string

  /**
   * Title of the page.
   */
  title: string
}

/**
 * Object representing page data passed to the `Index` page component.
 */
export interface ICMSPageIndex extends ICMSPage {
  content: IndexTemplateProps
}

/**
 * Object representing page data passed to the dynamic page components.
 */
export interface ICMSPageSlug extends ICMSPage {
  /**
   * String or an object with template data.
   */
  content: PageTemplateProps
}

/**
 * Display names of template components.
 */
export enum CMSPageComponents {
  IndexTemplate,
  PageTemplate
}

/**
 * Object containing all the pages in the CMS database.
 */
export type CMSPagesDTO = { pages: ICMSPage[] }
