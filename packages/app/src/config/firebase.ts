import { FIREBASE_WEB_CONFIG } from '@flex-development/kustomzcore'
import 'firebase/analytics'
import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import { isEmpty } from 'lodash'

/**
 * @file Firebase Web Configuration
 * @module config/firebase
 */

// Don't initialize Analytics in Node environments or if config is invalid
const ANALYTICS_CONFIG_VALID = !isEmpty(FIREBASE_WEB_CONFIG.measurementId)

// True if Node devlopment enivronment
export const DEV_ENV = process.env.NODE_ENV === 'development'
export const SERVER = typeof window === 'undefined'

export const getFirebaseApp = (): Firebase.app.App => {
  if (Firebase.apps.length > 0) return Firebase.app()

  const app = Firebase.initializeApp({ ...FIREBASE_WEB_CONFIG, auth: {} })

  if (!SERVER && Firebase.analytics.isSupported() && ANALYTICS_CONFIG_VALID) {
    Firebase.analytics()
  }

  return app
}

export const firebase = getFirebaseApp()

export const auth = firebase.auth()
export const database = firebase.database()
export const storage = firebase.storage()

export default Firebase
