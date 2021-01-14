import { AnyObject } from '@flex-development/json/utils/types'
import {
  ICollectionListing,
  IPage,
  IProductListing,
  IProductListingVariant
} from '@flex-development/kustomzcore/types'
import { Redirect } from 'next'
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
 * Object indicating that the user should be redirected to the `/404` page.
 */
export type NotFound = { notFound: true }

/**
 * Online store page route parameters.
 */
export interface HandlePageParams extends ParsedUrlQuery {
  [x: string]: string

  handle: IPage['handle']
}

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

/**
 * Shopify API response.
 */
export type ShopifyAPIRes<T extends AnyObject = AnyObject> = T | ShopifyErrorRes

/**
 * Shopify API error response.
 */
export type ShopifyErrorRes = { errors: string }
