import FirebaseAdmin, { ServiceAccount } from 'firebase-admin'

/**
 * @file Firebase Admin Configuration
 * @module config/firebase-admin
 */

/**
 * Firebase Admin service account configuration.
 */
const SERVICE_ACCOUNT = {
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  project_id: process.env.FIREBASE_PROJECT_ID,
  type: 'service_account'
} as ServiceAccount

export const getFirebaseAdminApp = (): FirebaseAdmin.app.App => {
  if (FirebaseAdmin.apps.length > 0) return FirebaseAdmin.app()

  return FirebaseAdmin.initializeApp({
    credential: FirebaseAdmin.credential.cert(SERVICE_ACCOUNT),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  })
}

export const admin = getFirebaseAdminApp()
export const auth = admin.auth()

export default FirebaseAdmin
