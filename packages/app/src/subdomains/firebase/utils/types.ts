import * as FirebaseTesting from '@firebase/rules-unit-testing'
import FirebaseAdmin from 'firebase-admin'
import Firebase from 'firebase/app'

/**
 * @file Subdomain Utility Types - Firebase
 * @module subdomains/firebase/types
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
 * Application returned by `@firebase/rules-unit-testing` module.
 *
 * @see https://www.npmjs.com/package/@firebase/rules-unit-testing
 */
export type FirebaseTestApp =
  | ReturnType<typeof FirebaseTesting.initializeTestApp>
  | ReturnType<typeof FirebaseTesting.initializeAdminApp>
