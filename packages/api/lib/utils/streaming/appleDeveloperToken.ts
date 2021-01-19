import { createError } from '@flex-development/kustomzcore'
import debug from 'debug'
import jwt, { Algorithm, SignOptions } from 'jsonwebtoken'
import isEmpty from 'lodash/isEmpty'

/**
 * @file Implementation - appleDeveloperToken
 * @module utils/streaming/appleDeveloperToken
 */

const logger = debug('utils/streaming/appleDeveloperToken')

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
    const error = createError('Missing APPLE_TEAM_ID', { payload })

    logger(error)
    throw error
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
    const message = 'Missing APPLE_AUTHKEY_MUSICKIT_KEY_ID'
    const error = createError(message, { options })

    logger(error)
    throw error
  }

  let private_key = process.env.APPLE_AUTHKEY_MUSICKIT?.replace(/\\n/g, '\n')
  private_key = private_key || ''

  if (isEmpty(private_key)) {
    const message = 'Missing APPLE_AUTHKEY_MUSICKIT'
    const error = createError(message, { options, payload })

    logger(error)
    throw error
  }

  return jwt.sign({}, private_key, options as SignOptions)
}

export default appleDeveloperToken
