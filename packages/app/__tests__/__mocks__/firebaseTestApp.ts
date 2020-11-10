import { FirebaseAdaptor } from '@app/subdomains/app'
import * as testing from '@firebase/rules-unit-testing'

/**
 * @file Initialize Firebase testing app
 * @module tests/__mocks__/firebaseTestApp
 */

// Set Firestore emulator host
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080'

/**
 * Firebase testing credentials.
 */
export const FIREBASE_TEST_CONFIG = {
  databaseName: 'firebase-testing',
  projectId: 'firebase-testing'
}

/**
 * Initializes a Firebase application for testing purposes.
 *
 * @see https://firebase.google.com/docs/rules/unit-tests#test_sdk_methods
 *
 * @param admin - If true, initialize Admin testing app
 * @returns Firebase test app
 */
export const firebaseTestApp = (admin?: boolean): FirebaseAdaptor => {
  if (admin) return testing.initializeAdminApp(FIREBASE_TEST_CONFIG)
  return testing.initializeTestApp(FIREBASE_TEST_CONFIG)
}

export default firebaseTestApp
