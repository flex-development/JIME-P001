import { NullishString } from '@flex-development/json'
import { Logger } from '@flex-development/kustomzcore'
import admin from 'firebase-admin'
import { isNumber } from 'lodash'

/**
 * @file Create or update a Firebase user
 * @module subdomains/firebase/utils/upsertFirebaseUser/impl
 */

/**
 * Creates or updates a Firebase user.
 *
 * @async
 * @param uid - Unique user id
 * @param displayName - User display name
 * @param email - User email
 * @param photoURL - Profile photo URL
 * @param auth - Firebase Admin Auth service to use instead of default
 * @returns Firebase admin user record
 */
const upsertFirebaseUser = async (
  uid: string | number,
  displayName: NullishString,
  email?: string,
  photoURL?: string,
  auth?: admin.auth.Auth
): Promise<admin.auth.UserRecord> => {
  // Dynamically import admin auth service
  if (!auth) auth = (await import('@app/subdomains/firebase/config/admin')).auth

  // UIDs must be strings
  uid = isNumber(uid) ? `${uid}` : uid

  const data = {
    displayName,
    email,
    photoURL,
    uid
  }

  let user: admin.auth.UserRecord | null = null

  try {
    user = await auth.getUser(uid)
  } catch (error) {
    if (error.code !== 'auth/user-not-found') {
      Logger.error({ 'subdomains/cms/utils/upsertFirebaseUser': error })
      throw error
    }
  }

  try {
    if (user) {
      user = await auth.updateUser(uid, data)
    } else {
      user = await auth.createUser(data)
    }
  } catch (error) {
    Logger.error({ 'subdomains/cms/utils/upsertFirebaseUser': error })
    throw error
  }

  return user
}

export default upsertFirebaseUser
