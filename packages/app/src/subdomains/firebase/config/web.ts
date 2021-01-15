import { FIREBASE_WEB_CONFIG as CONFIG } from '@flex-development/kustomzcore/constants'
import 'firebase/analytics'
import Firebase from 'firebase/app'

/**
 * @file Firebase Web Configuration
 * @module subdomains/firebase/config/web
 */

// Don't initialize Analytics in Node environments or if config is invalid
const ANALYTICS_CONFIG_VALID = Object.keys(CONFIG.measurementId).length > 0

// True if Node devlopment enivronment
export const DEV_ENV = process.env.NODE_ENV === 'development'
export const SERVER = typeof window === 'undefined'

export const getFirebaseApp = (): Firebase.app.App => {
  if (Firebase.apps.length > 0) return Firebase.app()

  const app = Firebase.initializeApp({ ...CONFIG, auth: {} })

  if (!SERVER && Firebase.analytics.isSupported() && ANALYTICS_CONFIG_VALID) {
    Firebase.analytics()
  }

  return app
}

export const app = getFirebaseApp()

export default Firebase
