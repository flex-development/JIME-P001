import type {
  CollectionTemplateProps,
  IndexTemplateProps,
  PageTemplateProps,
  ProductTemplateProps,
  SearchTemplateProps
} from '@components/templates'
import type { FeathersErrorJSON } from '@feathersjs/errors'
import type {
  ICollectionListing,
  IProductListing,
  IProductListingVariant
} from '@flex-development/kustomzcore'
import type { GetLayoutDataResJSON, SEOData } from '@kapi/types'
import type { NextComponentType, NextPageContext as PageContext } from 'next'
import type { AppContext } from 'next/app'
import type { Router } from 'next/dist/client/router'
import type { ParsedUrlQuery } from 'querystring'

/**
 * @file Subdomain Utility Types - App
 * @module types
 */

/**
 * Next.js app component type.
 */
export type AppComponent = NextComponentType<
  AppContext,
  IAppInitialProps,
  IAppProps
>

/**
 * Collection page route parameters.
 */
export interface CollectionPageParams extends ParsedUrlQuery {
  [x: string]: string | undefined

  collection: ICollectionListing['handle']
}

/**
 * Online store page route parameters.
 */
export interface HandlePageParams extends ParsedUrlQuery {
  [x: string]: string

  handle: string
}

/**
 * Props passed from Next.js data-fetching methods.
 */
export interface IAppInitialProps {
  addthis: boolean
  layout: GetLayoutDataResJSON
  pageProps: IPageProps
  ua?: string
}

/**
 * Props passed from Next.js data-fetching methods.
 */
export interface IAppProps extends IAppInitialProps {
  Component: NextComponentType<
    PageContext,
    IAppInitialProps,
    IAppInitialProps['pageProps']
  >
  router: Router
  __N_SSG?: boolean
  __N_SSP?: boolean
}

/**
 * Props passed to Next.js page components.
 */
export interface IPageProps {
  seo: SEOData
}

/**
 * Props passed to product collection pages.
 */
export interface IPagePropsCollection extends IPageProps {
  template: CollectionTemplateProps
}

/**
 * Props passed to the `Error` page.
 */
export interface IPagePropsError {
  error: FeathersErrorJSON
}

/**
 * Props passed to dynamic `[handle]` (online store) pages.
 */
export interface IPagePropsHandle extends IPageProps {
  template: PageTemplateProps
}

/**
 * Props passed to the index page.
 */
export interface IPagePropsIndex extends IPageProps {
  template: IndexTemplateProps
}

/**
 * Props passed to store policy pages.
 */
export interface IPagePropsPolicy extends IPageProps {
  template: PageTemplateProps
}

/**
 * Props passed to product and collection product pages.
 */
export interface IPagePropsProduct extends IPageProps {
  template: ProductTemplateProps
}

/**
 * Props passed to the product search page.
 */
export interface IPagePropsSearch extends IPageProps {
  template: SearchTemplateProps
}

/**
 * Object indicating that the user should be redirected to the `/404` page.
 */
export type NotFound = { notFound: true }

/* eslint-disable prettier/prettier */

/**
 * Next.js page component that renders a collection, production, or online store
 * page.
 */
export type PageComponent<
  P extends IPageProps = IPageProps
> = NextComponentType<PageContext, IAppInitialProps, P>

/* eslint-enable prettier/prettier */

/**
 * Product page route parameters.
 */
export interface ProductPageParams extends ParsedUrlQuery {
  [x: string]: string | undefined

  collection: CollectionPageParams['collection']
  product: IProductListing['handle']
}

/**
 * Product page URL query parameters.
 */
export interface ProductPageUrlQuery extends ProductPageParams {
  sku?: IProductListingVariant['sku']
}

/**
 * Product page URL query parameters.
 */
export interface SearchPageUrlQuery extends ParsedUrlQuery {
  [x: string]: string | undefined

  term?: string
}
