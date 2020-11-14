import firebase, { auth } from '@app/config/firebase'
import { NullishString } from '@flex-development/kustomzdesign/types'
import { isString } from 'lodash'
import { useEffect, useState } from 'react'

/**
 * @file Sign in a Firebase user with a custom token
 * @module subdomains/cms/hooks/useSignInWithCustomToken
 * @see https://firebase.google.com/docs/reference/js/firebase.auth
 */

type FirebaseAuthError = firebase.auth.Error
type FirebaseUserCredential = firebase.auth.UserCredential
type UserCredentialState = FirebaseUserCredential | null

export type UseSignInWithCustomToken = {
  /**
   * Error thrown if custom token is invalid, expired, or not accepted by the
   * Firebase Auth service.
   */
  error: FirebaseAuthError | null

  /**
   * A structure containing a User, an AuthCredential, the operationType, and
   * any additional user information that was returned from the identity
   * provider.
   */
  user_credential: UserCredentialState
}

/**
 * Signs the user in with a custom token. Custom tokens are used to grant access
 * to database and storage resources to CMS admins and app users.
 *
 * @async
 * @param token - Custom token to sign-in with
 */
export const useSignInWithCustomToken = (
  token?: NullishString
): UseSignInWithCustomToken => {
  // Get user credentials after successful sign-in
  const [credential, setCredential] = useState<UserCredentialState>(null)

  // Handle Firebase auth error
  const [error, setError] = useState<FirebaseAuthError | null>(null)

  useEffect(() => {
    // If no token, do nothing
    if (!isString(token) || !token.length) {
      return
    } /* eslint-disable prettier/prettier */
    ; (async () => {
      try {
        setCredential(await auth.signInWithCustomToken(token))
      } catch (error) {
        setError(error)
      }
    })()

    /* eslint-enable prettier/prettier */
  }, [setCredential, token])

  return { error, user_credential: credential }
}
