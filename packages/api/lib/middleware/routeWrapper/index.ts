import type { ANYTHING } from '@flex-development/json'
import type { OrPromise } from '@flex-development/kustomzcore/types'
import type { VercelResponse } from '@vercel/node'
import isFunction from 'lodash/isFunction'
import ErrorHandling from '../../mixins/ErrorHandling'
import type { APIRequest } from '../../types'
import enhanceRequest from '../enhanceRequest'
import trackAPIRequest from '../trackAPIRequest'
import trackAPISuccessEvent from '../trackAPISuccessEvent'

/**
 * @file Implementation - routeWrapper
 * @module lib/middleware/routeWrapper
 */

/**
 * Initializes an API route and tracks the initial request wih Google Analytics.
 *
 * If {@param next} is not a function, `null` will be returned to the client.
 *
 * If an error is thrown by {@param next} it will be caught, logged, and
 * tracked with our error handling mixin.
 *
 * @template Req - API request object
 * @template Res - Server response object
 *
 * @async
 * @param {APIRequest} req - API request object
 * @param {Res} res - Server response object
 * @param {Function} next - API route logic
 * @return {Promise<void>} Empty promise
 */
async function routeWrapper<
  Req extends APIRequest = APIRequest,
  Res extends VercelResponse = VercelResponse
>(
  req: Req,
  res: Res,
  next?: (req: Req, response: Res) => OrPromise<ANYTHING>
): Promise<void> {
  // Initialize API route
  enhanceRequest(req)

  // Send `pageview` hit to Google Analytics
  await trackAPIRequest(req)

  try {
    isFunction(next) ? await next(req, res) : res.json(null)
  } catch (err) {
    ErrorHandling.handleAPIError(req, res, err)
    return
  }

  // Send success `event` hit to Google Analytics
  await trackAPISuccessEvent(req)

  /**
   * In `test` environments, micro`, a dependency of `vercel-node-server`,
   * throws `[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to
   * the client` when `res.end` is returned.
   *
   * @see https://github.com/zyedidia/micro
   * @see https://github.com/ctrlplusb/vercel-node-server
   */
  if (process.env.NODE_ENV !== 'test') return res.end()
  return
}

export default routeWrapper
