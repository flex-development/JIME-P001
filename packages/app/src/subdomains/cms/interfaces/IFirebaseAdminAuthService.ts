import { NullishString } from '@flex-development/kustomzdesign/types'
import admin from 'firebase-admin'

/**
 * @file Subdomain Interfaces - Firebase Admin Authentication
 * @module subdomains/cms/interfaces/IFirebaseAdminAuthService
 */

export interface IFirebaseAdminAuthService {
  auth: admin.auth.Auth

  createUser(
    uid: string | number,
    displayName: NullishString,
    email?: string,
    photoURL?: string
  ): Promise<admin.auth.UserRecord>
}
