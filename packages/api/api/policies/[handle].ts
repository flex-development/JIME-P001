import type { VercelResponse as Res } from '@vercel/node'
import pick from 'lodash/pick'
import { initPathLogger } from '../../lib/middleware'
import Service from '../../lib/services/PolicyService'
import type { GetPolicyReq as Req } from '../../lib/types'
import { formatError } from '../../lib/utils'

/**
 * @file API Endpoint - Get Policy By Handle
 * @module api/policies/[handle]
 */

/**
 * Retrieve a policy resource by handle.
 *
 * @param req - API request
 * @param req.query - Request query parameters
 * @param req.query.fields - Specify fields to include for each object
 * @param req.query.handle - Handle of policy to retrieve
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
    const error = formatError(err, { query })

    req.logger.error({ error })
    return res.status(error.code).json(error)
  }
}
