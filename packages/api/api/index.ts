import type { VercelResponse as Res } from '@vercel/node'
import docs from '../lib/config/openapi.json'
import routeWrapper from '../lib/middleware/routeWrapper'
import type { APIRequest as Req } from '../lib/types'

/**
 * @file Handler - API Root
 * @module api
 */

/**
 * Returns the API documentation as a JSON object.
 * Documentation follows OpenAPI Specification v3.0.0 standards.
 *
 * @async
 * @param {Req} req - API request object
 * @param {Res} res - Server response object
 * @return {Promise<Res | void>} Promise containing server response object if
 * an error is thrown, or empty promise if request completed successfully
 */
export default async (req: Req, res: Res): Promise<Res | void> => {
  return routeWrapper<Req, Res>(req, res, (req, res) => res.json(docs))
}
