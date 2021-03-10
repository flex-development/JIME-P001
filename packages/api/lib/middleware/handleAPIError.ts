import type { AnyObject } from '@flex-development/json'
import ErrorService from '@flex-development/kustomzcore/services/ErrorService'
import type { VercelResponse } from '@vercel/node'
import pick from 'lodash/pick'
import type { APIError, APIRequest } from '../../lib/types'

/**
 * @file Implementation - handleAPIError
 * @module lib/middleware/handleAPIError
 */

/**
 * Handles an API request error.
 *
 * Errors will be logged and tracked with Google Analytics.
 *
 * @template Req - API request object
 * @template Res - Server response object
 *
 * @async
 * @param {Req} req - API request object
 * @param {Res} res - Server response object
 * @param {APIError} err - Request error object
 * @param {AnyObject} [data] - Additional error data
 * @return {Promise<Res>} Promise containing server response object
 */
async function handleAPIError<
  Req extends APIRequest = APIRequest,
  Res extends VercelResponse = VercelResponse
>(req: Req, res: Res, err: APIError, data: AnyObject = {}): Promise<Res> {
  // Convert into `FeathersErrorJSON` object
  const error = ErrorService.format(err, {
    ...data,
    req: pick(req, ['headers', 'query', 'url'])
  })

  // Log error
  req.logger.error({ error })

  // Track error with Google Analytics
  await ErrorService.track(error, {
    method: req.method.toUpperCase(),
    path: req.path,
    ua: error.data.req.headers['user-agent']
  })

  // Return error response
  return res.status(error.code).json(error) as Res
}

export default handleAPIError
