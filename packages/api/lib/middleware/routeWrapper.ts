import type { ANYTHING } from '@flex-development/json'
import type { OrPromise } from '@flex-development/kustomzcore/types'
import type { VercelResponse } from '@vercel/node'
import type { APIRequest } from '../types'
import handleAPIError from './handleAPIError'
import initRoute from './initRoute'
import trackAPIRequest from './trackAPIRequest'
import trackAPISuccessEvent from './trackAPISuccessEvent'

/**
 * @file Implementation - routeWrapper
 * @module lib/middleware/routeWrapper
 */

/**
 * Initializes an API route and tracks the initial request wih Google Analytics.
 *
 * If {@param handleRequest} is not a function, `null` will be returned to the
 * client. If an error is thrown by {@param handleRequest} it will be caught the
 * API error handling middleware.
 *
 * @template Req - API request object
 * @template Res - Server response object
 *
 * @async
 * @param {APIRequest} req - API request object
 * @param {Res} res - Server response object
 * @param {Function} handleRequest - API route logic
 * @return {Promise<Res | void>} Promise containing server response object if an
 * error is thrown, or empty promise if request completed successfully
 */
async function routeWrapper<
  Req extends APIRequest = APIRequest,
  Res extends VercelResponse = VercelResponse
>(
  req: Req,
  res: Res,
  handleRequest?: (req: Req, response: Res) => OrPromise<ANYTHING>
): Promise<Res | void> {
  // Initialize API route
  initRoute(req)

  // Send `pageview` hit to Google Analytics
  await trackAPIRequest(req)

  try {
    handleRequest ? await handleRequest(req, res) : res.json(null)
  } catch (err) {
    return (handleAPIError(req, res, err) as unknown) as Res
  }

  // Send success `event` hit to Google Analytics
  await trackAPISuccessEvent(req)
  return res.end()
}

export default routeWrapper
