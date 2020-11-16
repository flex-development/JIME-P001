import FirebaseAdmin, { auth } from '@app/config/firebase-admin'
import Logger from '@app/subdomains/app/utils/logger'
import { NullishString } from '@flex-development/types'
import { isNumber } from 'lodash'

/**
 * @file Create or update a Firebase user
 * @module subdomains/users/utils/upsertFirebaseUser
 */

/**
 * Creates or updates a Firebase user.
 *
 * @async
 * @param uid - Unique user id
 * @param displayName - User display name
 * @param email - User email
 * @param photoURL - Profile photo URL
 */
const upsertFirebaseUser = async (
  uid: string | number,
  displayName: NullishString,
  email?: string,
  photoURL?: string
): Promise<FirebaseAdmin.auth.UserRecord> => {
  uid = isNumber(uid) ? `${uid}` : uid

  const data = {
    displayName,
    email,
    photoURL,
    uid
  }

  let user: FirebaseAdmin.auth.UserRecord | null = null

  try {
    user = await auth.getUser(uid)
  } catch (error) {
    if (error.code !== 'auth/user-not-found') {
      Logger.error({ 'subdomains/users/utils/upsertFirebaseUser': error })
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
    Logger.error({ 'subdomains/users/utils/upsertFirebaseUser': error })
    throw error
  }

  return user
}

export default upsertFirebaseUser
