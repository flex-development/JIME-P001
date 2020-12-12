import * as FirebaseTesting from '@firebase/rules-unit-testing'
import { AnyObject } from '@flex-development/json'
import FirebaseAdmin from 'firebase-admin'
import Firebase from 'firebase/app'
import { Redirect } from 'next'
import { ParsedUrlQuery } from 'querystring'
import {
  ICollectionListing,
  IProductListing,
  IProductListingVariant
} from 'shopify-api-node'

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
 * Types of Firebase modules.
 */
export type FirebaseAdaptor =
  | typeof Firebase
  | typeof FirebaseAdmin
  | FirebaseTestApp

/**
 * Firebase or Firebase Admin Realtime Database service.
 */
export type FirebaseAdaptorDatabase = ReturnType<FirebaseAdaptor['database']>

/**
 * Firebase or Firebase Admin RTD query object.
 */
export type FirebaseAdaptorDatabaseQuery =
  | FirebaseAdmin.database.Query
  | Firebase.database.Query

/**
 * Firebase or Firebase Admin RTD reference.
 */
export type FirebaseAdaptorReference = ReturnType<
  FirebaseAdaptorDatabase['ref']
>

/**
 * Application returned by `@firebase/rules-unit-testing` module.
 *
 * @see https://www.npmjs.com/package/@firebase/rules-unit-testing
 */
export type FirebaseTestApp =
  | ReturnType<typeof FirebaseTesting.initializeTestApp>
  | ReturnType<typeof FirebaseTesting.initializeAdminApp>

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
