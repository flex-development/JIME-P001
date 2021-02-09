import { createError } from '@flex-development/kustomzcore'
import type { Algorithm, SignOptions } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
import isEmpty from 'lodash/isEmpty'

/**
 * @file Implementation - appleDeveloperToken
 * @module lib/utils/appleDeveloperToken
 */

const {
  APPLE_AUTHKEY_MUSICKIT: private_key,
  APPLE_AUTHKEY_MUSICKIT_KEY_ID: kid,
  APPLE_TEAM_ID: issuer
} = process.env

/**
 * Returns a signed JSON web token to authenticate with the Apple Music API.
 *
 * @throws {FeathersErrorJSON}
 */
const appleDeveloperToken = (): string => {
  // Throw errors if missing Apple Music API credentials
  if (isEmpty(private_key)) throw createError('Missing APPLE_AUTHKEY_MUSICKIT')
  if (isEmpty(kid)) throw createError('Missing APPLE_AUTHKEY_MUSICKIT_KEY_ID')
  if (isEmpty(issuer)) throw createError('Missing APPLE_TEAM_ID')

  /**
   * NOTICE: Apple Music supports only developer tokens that are signed with the
   * ES256 algorithm. Unsecured JWTs, or JWTs signed with other algorithms, are
   * rejected and result in a `403` error code.
   */
  const algorithm: Algorithm = 'ES256'

  // Token signing options
  const options: SignOptions = {
    algorithm,
    expiresIn: '180d',
    header: { alg: algorithm, kid },
    issuer
  }

  // Return signed token
  return jwt.sign({}, private_key?.replace(/\\n/g, '\n') ?? '', options)
}

export default appleDeveloperToken
