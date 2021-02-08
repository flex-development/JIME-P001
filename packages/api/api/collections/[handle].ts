import type { VercelResponse as Res } from '@vercel/node'
import pick from 'lodash/pick'
import { handleAPIError, initPathLogger } from '../../lib/middleware'
import Service from '../../lib/services/CollectionService'
import type { GetCollectionReq as Req } from '../../lib/types'

/**
 * @file API Endpoint - Get Collection By Handle
 * @module api/collections/[handle]
 */

/**
 * Retrieve a collection listing resource by handle.
 *
 * @param req - API request
 * @param req.query - Request query parameters
 * @param req.query.fields - Specify fields to include for each object
 * @param req.query.handle - Handle of collection to retrieve
 * @param res - API response object
 */
export default async (req: Req, res: Res): Promise<Res> => {
  // ! Attach `logger` and `path` to API request object
  initPathLogger(req)

  // Get request query parameters
  const query = pick(req.query, ['fields', 'handle'])

  try {
    return res.json(await Service.get(query.handle, query.fields))
  } catch (err) {
    return handleAPIError(req, res, err, { query: req.query })
  }
}
