import type { FeathersErrorJSON } from '@feathersjs/errors'
import type { AnyObject } from '@flex-development/json'
import type { VercelResponse as Res } from '@vercel/node'
import pick from 'lodash/pick'
import URI from 'urijs'
import ga from '../config/google-analytics'
import vercel from '../config/vercel-env'
import type { AlgoliaError, APIRequest as Req } from '../types'
import formatError from '../utils/formatError'

/**
 * @file Implementation - handleAPIError
 * @module lib/middleware/handleAPIError
 */

/**
 * Handles an API request error.
 *
 * If {@param err.status} is greater than or equal to `500`, the an error
 * `event` hit will be sent to Google Analytics.
 *
 * @async
 * @param req - API request object
 * @param res - API response object
 * @param err - API request error
 * @param data - Additional error data
 */
const handleAPIError = async (
  req: Req,
  res: Res,
  err: Error | AlgoliaError | FeathersErrorJSON,
  data: AnyObject = {}
): Promise<Res> => {
  // Convert into `FeathersErrorJSON` object
  const error = formatError(err, { ...data, vercel })

  // Timestamp error
  error.data.created_at = new Date().valueOf()

  // Attach data from request headers
  error.data.headers = pick(req.headers, ['host', 'user-agent'])

  // True if Apple Music API auth or server error
  const error_apple_auth = req.path.includes('/playlist') && error.code === 401
  const error_server = error.code === 500 || error.code >= 502

  // Track and report Apple Music API auth or server errors
  if (error_server || error_apple_auth) {
    const uri = new URI(req.url)

    await ga.event({
      error: JSON.stringify(error),
      eventAction: error.name,
      eventCategory: uri.directory() || uri.path(),
      eventLabel: error.message,
      eventValue: error.code,
      method: req.method.toUpperCase(),
      path: uri.path(),
      ua: error.data.headers['user-agent']
    })
  }

  // Log error and return error response
  req.logger.error({ error })
  return res.status(error.code).json(error)
}

export default handleAPIError
