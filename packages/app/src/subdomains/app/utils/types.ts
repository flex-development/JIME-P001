import { ProviderSessionGitHub } from '@app/subdomains/cms/services'
import { AnyObject } from '@flex-development/json'
import {
  ICollectionListing,
  IProductListing,
  IProductListingVariant
} from '@flex-development/kustomzcore'
import { Redirect } from 'next'
import { DocumentInitialProps as InitialProps } from 'next/document'
import { ParsedUrlQuery } from 'querystring'

/**
 * @file Subdomain Utility Types - App
 * @module subdomains/app/types
 */

/**
 * Collection page route parameters.
 */
export interface CollectionPageParams extends ParsedUrlQuery {
  [x: string]: string | undefined

  collection: ICollectionListing['handle']
}

/**
 * Collection product page route parameters.
 */
export interface CollectionProductPageParams extends CollectionPageParams {
  product: ProductPageUrlQuery['handle']
}

/**
 * Collection product page URL query parameters.
 */
export interface CollectionProductPageUrlQuery
  extends CollectionProductPageParams {
  sku?: ProductPageUrlQuery['sku']
}

/**
 * CMS page route parameters.
 */
export interface CMSPageParams extends ParsedUrlQuery {
  [x: string]: string

  slug: string
}

/**
 * Initial `Document` props.
 */
export type DocumentInitialProps = InitialProps & {
  session: ProviderSessionGitHub
}

/**
 * Object indicating that the user should be redirected to the `/404` page.
 */
export type NotFound = { notFound: true }

/**
 * Product page route parameters.
 */
export interface ProductPageParams extends ParsedUrlQuery {
  [x: string]: string | undefined

  handle: IProductListing['handle']
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

/**
 * Object representing a URL redirect from a `getServerSideProps` call.
 */
export type ServerSideRedirect = { redirect: Redirect }

/**
 * Object containing props to be passed to server-side rendered CMS pages.
 */
export type ServerSidePageProps<P extends AnyObject = AnyObject> = { props: P }
