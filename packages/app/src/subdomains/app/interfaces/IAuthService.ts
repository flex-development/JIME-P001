import admin from 'firebase-admin'
import { Session } from 'next-auth/client'
import { SessionBase } from 'next-auth/_utils'

/**
 * @file Subdomain Interfaces - Authentication Service
 * @module subdomains/cms/interfaces/IAuthService
 */

export interface IAuthService {
  admin: admin.auth.Auth

  createJWT(access_token: string, profile: OAuthProfile): Promise<JWT>
  createSession(session: Session, user: JWT): Promise<ProviderSession>
  signIn(access_token: string, profile?: OAuthProfile): Promise<boolean | JWT>
}

/**
 * JSON web token with user's access token, id, and sign-in method.
 */
export interface JWT {
  access_token: string
  id: number | string
  provider: 'github' | string
}

/**
 * Default JSON web token.
 */
export type JWTDefault = {
  email: string | null
  exp?: number
  iat?: number
  name: string | null
  picture?: string | null
}

/**
 * Common properties of OAuth profiles.
 */
export interface OAuthProfile {
  id: number | string
}

/**
 * Data returned by an OAuth provider account.
 */
export interface ProviderAccount {
  accessToken: string
  accessTokenExpires: number | null
  id: JWT['id']
  provider: JWT['provider']
  refreshToken?: string
}

/**
 * Session created by Authentication services.
 */
export interface ProviderSession {
  access_token: JWT['access_token']
  expires: SessionBase['expires']
  firebase_token: string
  provider: ProviderAccount['provider']
  user: Omit<JWT, 'access_token' | 'provider'>
}
