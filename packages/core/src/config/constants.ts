/**
 * @file Constant Values
 * @module config/constants
 */

export const CART_PKEY = 'morenaskustomz-cart'

export const CHECKOUT_BASE_URL = '/checkouts'

const FIREBASE_API_KEY = 'AIzaSyDNl_K5dReovDsT4w8osSRVz2D2pSyK5A0'
const FIREBASE_APP_ID = '1:1099150772855:web:c61ca4f74fd5ae10bf5472'
const FIREBASE_PROJECT_ID = 'morenaskustomz'
const FIREBASE_MEASUREMENT_ID = 'G-N03EBN1N7J'
const FIREBASE_MESSAGING_SENDER_ID = '1099150772855'

export const FIREBASE_WEB_CONFIG = {
  apiKey: FIREBASE_API_KEY,
  appId: FIREBASE_APP_ID,
  authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
  measurementId: FIREBASE_MEASUREMENT_ID,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: `${FIREBASE_PROJECT_ID}.appspot.com`
}
