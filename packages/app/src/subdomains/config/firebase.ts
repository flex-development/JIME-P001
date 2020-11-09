import 'firebase/analytics'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { isEmpty } from 'lodash'

/**
 * @file Firebase Configuration
 * @module subdomains/config/firebase
 */

/**
 * Firebase Web configuration.
 */
export const FIREBASE_CREDENTIALS = {
  apiKey: process.env.FIREBASE_API_KEY,
  appId: process.env.FIREBASE_APP_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
}

const ANALYTICS_CONFIGURATION = !isEmpty(FIREBASE_CREDENTIALS.measurementId)
const DEV_ENV = process.env.NODE_ENV === 'development'
const IS_BROWSER = typeof window !== 'undefined'

try {
  firebase.initializeApp(FIREBASE_CREDENTIALS)

  if (IS_BROWSER && !DEV_ENV && ANALYTICS_CONFIGURATION) {
    firebase.analytics()
  }
} catch (error) {
  /*
   * Skip the "already exists" message which is not an actual error when we're
   * hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    console.error('Firebase initialization error', error.stack)
  }
}

export default firebase
