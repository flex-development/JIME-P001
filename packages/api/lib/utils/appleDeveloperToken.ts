import createError from '@flex-development/kustomzcore/dist/utils/createError'
import jwt, { Algorithm, SignOptions } from 'jsonwebtoken'
import isEmpty from 'lodash/isEmpty'

/**
 * @file Implementation - appleDeveloperToken
 * @module lib/utils/appleDeveloperToken
 */

/**
 * Returns a signed JSON web token to authenticate with the Apple Music API.
 *
 * @throws {FeathersErrorJSON}
 */
const appleDeveloperToken = (): string => {
  const algorithm: Algorithm = 'ES256'

  const payload = {
    exp: 15777000,
    iat: new Date().valueOf(),
    iss: process.env.APPLE_TEAM_ID || ''
  }

  if (isEmpty(payload.iss)) {
    throw createError('Missing APPLE_TEAM_ID', { payload })
  }

  const options = {
    algorithm,
    expiresIn: payload.exp,
    header: {
      alg: algorithm,
      kid: process.env.APPLE_AUTHKEY_MUSICKIT_KEY_ID || ''
    },
    issuer: payload.iss
  }

  if (isEmpty(options.header.kid)) {
    throw createError('Missing APPLE_AUTHKEY_MUSICKIT_KEY_ID', { options })
  }

  let private_key = process.env.APPLE_AUTHKEY_MUSICKIT?.replace(/\\n/g, '\n')
  private_key = private_key || ''

  if (isEmpty(private_key)) {
    throw createError('Missing APPLE_AUTHKEY_MUSICKIT', { options, payload })
  }

  return jwt.sign({}, private_key, options as SignOptions)
}

export default appleDeveloperToken
