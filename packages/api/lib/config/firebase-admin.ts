import type { ServiceAccount } from 'firebase-admin'
import FirebaseAdmin from 'firebase-admin'

/**
 * @file Firebase Admin Configuration
 * @module lib/config/firebase-admin
 */

const {
  FIREBASE_CLIENT_EMAIL = '',
  FIREBASE_PRIVATE_KEY = '',
  FIREBASE_PROJECT_ID = ''
} = process.env

/**
 * Firebase Admin service account configuration.
 */
const SERVICE_ACCOUNT = {
  client_email: FIREBASE_CLIENT_EMAIL,
  private_key: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  project_id: FIREBASE_PROJECT_ID,
  type: 'service_account'
} as ServiceAccount

export default ((): FirebaseAdmin.app.App => {
  if (FirebaseAdmin.apps.length > 0) return FirebaseAdmin.app()

  return FirebaseAdmin.initializeApp({
    credential: FirebaseAdmin.credential.cert(SERVICE_ACCOUNT),
    databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
    storageBucket: `${FIREBASE_PROJECT_ID}.appspot.com`
  })
})()
