import type { FeathersErrorJSON } from '@feathersjs/errors'
import type { AnyObject } from '@flex-development/json'
import type { VercelResponse as Res } from '@vercel/node'
import isEmpty from 'lodash/isEmpty'
import ga from '../config/google-analytics'
import type { AlgoliaError, APIRequest as Req } from '../types'
import formatError from '../utils/formatError'

/**
 * @file Implementation - handleAPIError
 * @module lib/middleware/handleAPIError
 */

const {
  VERCEL_ENV: env = '',
  VERCEL_GIT_COMMIT_REF: branch = '',
  VERCEL_GIT_COMMIT_SHA: commit = ''
} = process.env

/**
 * Handles an API request error.
 *
 * If it isn't already, {@param err} will be converted into a
 * `FeathersErrorJSON` object.
 *
 * If {@param err.status} is greater than or equal to `500`, the exception will
 * be tracked with Google Analytics and reported to Sentry.
 *
 * @todo Sentry integration
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
  const error = formatError(err, data)

  // Attach additional arguments in Vercel environment
  if (!isEmpty(branch)) error.data.branch = branch
  if (!isEmpty(commit)) error.data.commit = commit
  if (!isEmpty(env)) error.data.env = env

  // True if Apple Music API auth or server error
  const error_apple_auth = req.path.includes('/playlist') && error.code === 401
  const error_server = error.code === 500 || error.code >= 502

  // Track and report Apple Music API auth or server errors
  if (error_server || error_apple_auth) {
    await ga.exception({
      ...error,
      exceptionDescription: error.name,
      isExceptionFatal: error_apple_auth || error.code >= 502 ? 1 : 0
    })
  }

  // Log error and return error response
  req.logger.error({ error })
  return res.status(error.code).json(error)
}

export default handleAPIError
