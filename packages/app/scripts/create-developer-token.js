const { GeneralError: Error } = require('@feathersjs/errors')
const jwt = require('jsonwebtoken')

/**
 * @file Implementation - createDeveloperToken
 * @module scripts/create-developer-token
 */

/**
 * Returns a signed JSON web token to authenticate with the Apple Music API.
 *
 * @see https://developer.apple.com/documentation/applemusicapi
 *
 * @param {string} iss - Apple Team ID
 * @param {string} kid -Apple Auth Key identifier
 * @param {string} private_key - Apple Auth Key
 * @return {string} Signed JWT
 * @throws {FeathersErrorJSON}
 */
const createDeveloperToken = (iss = '', kid = '', private_key = '') => {
  const algorithm = 'ES256'

  const payload = { exp: 15777000, iat: new Date().valueOf(), iss }

  if (!payload.iss?.length) {
    const error = new Error('Missing Apple Team ID', { payload })

    console.error({ 'scripts/createDeveloperToken': error })
    throw error
  }

  const options = {
    algorithm,
    expiresIn: payload.exp,
    header: { alg: algorithm, kid: kid },
    issuer: payload.iss
  }

  if (!options.header.kid?.length) {
    const error = new Error('Missing Apple Auth Key identifier', { options })

    console.error({ 'scripts/createDeveloperToken': error })
    throw error
  }

  private_key = private_key?.replace(/\\n/g, '\n')

  if (!private_key.length) {
    const error = new Error('Missing Apple Auth Key', { options, payload })

    console.error({ 'scripts/createDeveloperToken': error })
    throw error
  }

  return jwt.sign({}, private_key, options)
}

module.exports = createDeveloperToken
