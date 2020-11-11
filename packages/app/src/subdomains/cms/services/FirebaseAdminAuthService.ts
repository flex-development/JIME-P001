import { Logger } from '@app/subdomains/app'
import admin, { auth as AdminAuth } from '@app/subdomains/config/firebase-admin'
import { NullishString } from '@flex-development/kustomzdesign/types'
import { isNumber } from 'lodash'
import { IFirebaseAdminAuthService } from '../interfaces'

/**
 * @file Subdomain Services - Firebase Admin Authentication
 * @module subdomains/services/FirebaseAdminAuthService
 */

/**
 * Interacts with the Firebase Admin authentication service module.
 * This service should be used server-side only.
 *
 * @class FirebaseAdminAuthService
 */
export default class FirebaseAdminAuthService
  implements IFirebaseAdminAuthService {
  /**
   * Firebase Admin authentication service.
   */
  auth: admin.auth.Auth

  /**
   * Creates a new `FirebaseAdminAuthService` instance.
   *
   *
   * @param auth - Firebase Admin service module to use instead of default
   */
  constructor(auth?: admin.auth.Auth) {
    this.auth = auth || AdminAuth
  }

  /**
   * Creates a new Firebase user.
   *
   * If a user with the {@param uid} already exists, the user data will be
   * returned instead.
   *
   * @param uid - Unique user id
   * @param displayName - User display name
   * @param email - User email
   * @param photoURL - Profile photo URL
   */
  async createUser(
    uid: string | number,
    displayName: NullishString,
    email?: string,
    photoURL?: string
  ): Promise<admin.auth.UserRecord> {
    uid = isNumber(uid) ? `${uid}` : uid

    try {
      const exists = await this.auth.getUser(uid)
      if (exists) return exists
    } catch (error) {
      if (error.code !== 'auth/user-not-found') {
        Logger.error({ 'FirebaseAdminAuthService.createUser': error })
        throw error
      }
    }

    try {
      return await this.auth.createUser({
        displayName,
        email,
        photoURL,
        uid
      })
    } catch (error) {
      Logger.error({ 'FirebaseAdminAuthService.createFirebaseUser': error })
      throw error
    }
  }
}
