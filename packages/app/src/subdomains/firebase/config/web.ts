import { FIREBASE_WEB_CONFIG } from '@flex-development/kustomzcore'
import 'firebase/analytics'
import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import { isEmpty } from 'lodash'

/**
 * @file Firebase Web Configuration
 * @module subdomains/firebase/config/web
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

export const app = getFirebaseApp()

export const auth = app.auth()
export const database = app.database()
export const storage = app.storage()

export default Firebase
