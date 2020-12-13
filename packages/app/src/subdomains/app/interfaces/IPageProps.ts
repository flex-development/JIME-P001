import { AnyObject } from '@flex-development/json'
import {
  CollectionTemplateProps,
  ProductTemplateProps,
  SearchTemplateProps
} from '@flex-development/kustomzdesign'
import { ICMSPageIndex, ICMSPageSlug } from '@subdomains/cms/models/CMSPage'

/**
 * @file Subdomain Interfaces - Next.js Page Props
 * @module subdomains/app/interfaces/IPageProps
 */

/**
 * Props passed to Next.js page components.
 */
export interface IPageProps {
  /**
   * Page data for a collection, production, or online store page.
   *
   * @see https://shopify.dev/docs/admin-api/rest/reference/online-store
   */
  page: AnyObject
}

/**
 * Props passed to product collection pages.
 */
export interface IPagePropsCollection extends IPageProps {
  page: CollectionTemplateProps
}

/**
 * Props passed to CMS pages.
 */
export interface IPagePropsCMS extends IPageProps {
  page: ICMSPageIndex | ICMSPageSlug
}

/**
 * Props passed to the index page.
 */
export interface IPagePropsIndex extends IPageProps {
  page: ICMSPageIndex
}

/**
 * Props passed to product and collection product pages.
 */
export interface IPagePropsProduct extends IPageProps {
  page: ProductTemplateProps
}

/**
 * Props passed to the product search page.
 */
export interface IPagePropsSearch extends IPageProps {
  page: SearchTemplateProps
}

/**
 * Props passed to dynamic `[slug]` pages.
 */
export interface IPagePropsSlug extends IPageProps {
  page: ICMSPageSlug
}
