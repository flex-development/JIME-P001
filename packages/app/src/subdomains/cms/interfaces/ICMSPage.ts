import {
  IndexTemplateProps,
  PageTemplateProps
} from '@flex-development/kustomzdesign'
import { AnyObject } from '@flex-development/kustomzdesign/types'
import { ICMSEntity } from './ICMSEntity'

/**
 * @file Domain Object Interfaces - Basic CMS Page
 * @module subdomains/cms/interfaces/ICMSPage
 */

/**
 * Object representing marketing site page data.
 *
 * @todo Implement `ICMSPageMetadata`
 */
export interface ICMSPage extends ICMSEntity {
  /**
   * Display name of template component.
   */
  component: 'IndexTemplate' | 'PageTemplate'

  /**
   * String or an object with template data.
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
