import type {
  APIPayload,
  ErrorJSON,
  ICollectionListing,
  IProductListing,
  IProductListingVariant,
  SEOData
} from '@core/types'
import type {
  CollectionTemplateProps,
  IndexTemplateProps,
  PageTemplateProps,
  ProductTemplateProps,
  SearchTemplateProps
} from '@design/lib/templates'
import type {
  GetServerSidePropsContext,
  NextComponentType,
  NextPageContext as PageContext
} from 'next'
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
 * Next.js page component passed as an initial App prop.
 */
export type AppPropsComponent = NextComponentType<
  PageContext,
  IAppInitialProps,
  IAppInitialProps['pageProps']
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
  layout: APIPayload.Layout
  pageProps: IPageProps
  ua?: string
}

/**
 * Props passed from Next.js data-fetching methods.
 */
export interface IAppProps extends IAppInitialProps {
  Component: AppPropsComponent
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
  error: ErrorJSON
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
 * Shape of incoming HTTP request objects.
 */
export type NextIncomingMessage = GetServerSidePropsContext['req']

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
