import * as FirebaseTesting from '@firebase/rules-unit-testing'
import { ANYTHING } from '@flex-development/types'
import FirebaseAdmin from 'firebase-admin'
import Firebase from 'firebase/app'

/**
 * @file Subdomain Utility Types - App
 * @module subdomains/app/types
 */

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
 * Type that accepts one piece of data or an array of data.
 */
export type OneOrMany<T = ANYTHING> = T | Array<T>

/**
 * Sort types.
 *
 * @see https://lodash.com/docs/4.17.15#orderBy
 */
export enum SortOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc'
}
