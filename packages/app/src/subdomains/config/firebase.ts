import 'firebase/analytics'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { isEmpty } from 'lodash'

/**
 * @file Firebase Web Configuration
 * @module subdomains/config/firebase
 */

// True if Node devlopment enivronment
export const DEV_ENV = process.env.NODE_ENV === 'development'

// Test app database url
export const LOCAL_DB_URL = 'http://localhost:5000?ns=cosparkdev'

/**
 * Firebase Web configuration.
 */
export const FIREBASE_WEB_CONFIG = {
  apiKey: process.env.FIREBASE_API_KEY,
  appId: process.env.FIREBASE_APP_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
}

// Don't initialize Analytics in Node environments or if config is invalid
const ANALYTICS_CONFIG_VALID = !isEmpty(FIREBASE_WEB_CONFIG.measurementId)

try {
  firebase.initializeApp(FIREBASE_WEB_CONFIG)

  if (!DEV_ENV && firebase.analytics.isSupported() && ANALYTICS_CONFIG_VALID) {
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

export const auth = firebase.auth()
export const database = firebase.database()
export const storage = firebase.storage()
