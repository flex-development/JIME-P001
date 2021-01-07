import { FeathersErrorJSON } from '@feathersjs/errors'
import { AnyObject, PartialOr } from '@flex-development/json'
import {
  ICollectionListing,
  IMetafield,
  IPage,
  IProductListing
} from '@flex-development/kustomzcore'
import {
  CollectionTemplateProps,
  IndexTemplateProps,
  PageTemplateProps,
  ProductTemplateProps,
  SearchTemplateProps
} from '@flex-development/kustomzdesign'
import { SEOProps } from '../components'

/**
 * @file Subdomain Interfaces - Next.js Page Props
 * @module subdomains/app/interfaces/IPageProps
 */

/**
 * Props passed to Next.js page components.
 */
export interface IPageProps {
  /**
   * Global shop metafields.
   */
  globals: Record<string, PartialOr<IMetafield>>

  /**
   * Page data for a collection, product, policy, or online store page.
   *
   * @see https://shopify.dev/docs/admin-api/rest/reference/online-store
   */
  page?: AnyObject

  /**
   * `SEO` component properties.
   */
  seo?: SEOProps
}

/**
 * Props passed to product collection pages.
 */
export interface IPagePropsCollection extends IPageProps {
  page: ICollectionListing
  seo: SEOProps
  template: CollectionTemplateProps
}

/**
 * Props passed to the `Error` page.
 */
export interface IPagePropsError {
  globals: IPageProps['globals']
  error: FeathersErrorJSON
}

/**
 * Props passed to dynamic `[handle]` (online store) pages.
 */
export interface IPagePropsHandle extends IPageProps {
  page: IPage
  seo: SEOProps
  template: PageTemplateProps
}

/**
 * Props passed to the index page.
 */
export interface IPagePropsIndex extends IPageProps {
  page: IPage
  seo: SEOProps
  template: IndexTemplateProps
}

/**
 * Props passed to product and collection product pages.
 */
export interface IPagePropsProduct extends IPageProps {
  page: IProductListing
  seo: SEOProps
  template: ProductTemplateProps
}

/**
 * Props passed to the product search page.
 */
export interface IPagePropsSearch extends IPageProps {
  seo: SEOProps
  template: SearchTemplateProps
}
