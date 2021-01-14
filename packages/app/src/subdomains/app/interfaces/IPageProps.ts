import { FeathersErrorJSON } from '@feathersjs/errors'
import { PartialOr } from '@flex-development/json/utils/types'
import {
  ICollectionListing,
  IMetafield,
  IPage,
  IPolicy,
  IProductListing
} from '@flex-development/kustomzcore/types/shopify'
import {
  CollectionTemplateProps,
  IndexTemplateProps,
  PageTemplateProps,
  ProductTemplateProps,
  SearchTemplateProps
} from '@lib/templates'
import { SEOProps } from '@subdomains/app/components/SEO'

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
}

/**
 * Props passed to product collection pages.
 */
export interface IPagePropsCollection extends IPageProps {
  collection: ICollectionListing
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
  page: IPage | IPolicy
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
 * Props passed to store policy pages.
 */
export interface IPagePropsPolicy extends IPageProps {
  policy: IPolicy
  seo: SEOProps
  template: PageTemplateProps
}

/**
 * Props passed to product and collection product pages.
 */
export interface IPagePropsProduct extends IPageProps {
  product: IProductListing
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
