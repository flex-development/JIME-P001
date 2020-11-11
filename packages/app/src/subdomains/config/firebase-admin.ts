import admin, { ServiceAccount } from 'firebase-admin'

/**
 * @file Firebase Admin Configuration
 * @module subdomains/config/firebase-admin
 */

/**
 * Firebase Admin service account configuration.
 */
const SERVICE_ACCOUNT = {
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  project_id: process.env.FIREBASE_PROJECT_ID,
  type: 'service_account'
}

if (typeof window === 'undefined' && SERVICE_ACCOUNT.project_id) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(SERVICE_ACCOUNT as ServiceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    })
  } catch (error) {
    /*
     * Skip the "already exists" message which is not an actual error when we're
     * hot-reloading.
     */
    if (!/already exists/u.test(error.message)) {
      console.error('Firebase initialization error', error.stack)
    }
  }
}

export default admin

export const auth = admin.auth()
