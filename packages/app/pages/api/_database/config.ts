import admin, { ServiceAccount } from 'firebase-admin'
import * as fireorm from 'fireorm'

/**
 * @file Firestore Configuration
 * @module modules/database
 */

const {
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  FIREBASE_AUTH_URI,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID,
  FIREBASE_CLIENT_X509_CERT_URL,
  FIREBASE_PRIVATE_KEY = '',
  FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_TOKEN_URI
} = process.env

const serviceAccount = {
  auth_provider_x509_cert_url: FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  auth_uri: FIREBASE_AUTH_URI,
  client_email: FIREBASE_CLIENT_EMAIL,
  client_id: FIREBASE_CLIENT_ID,
  client_x509_cert_url: FIREBASE_CLIENT_X509_CERT_URL,
  private_key: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  private_key_id: FIREBASE_PRIVATE_KEY_ID,
  project_id: FIREBASE_PROJECT_ID,
  token_uri: FIREBASE_TOKEN_URI,
  type: 'service_account'
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  })
}

const firestore = admin.firestore()

fireorm.initialize(firestore, { validateModels: true })
