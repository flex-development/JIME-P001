import type { VercelResponse as Res } from '@vercel/node'
import pick from 'lodash/pick'
import { initPathLogger } from '../../lib/middleware'
import Service from '../../lib/services/MenuService'
import type { GetMenuReq as Req } from '../../lib/types'
import { formatError } from '../../lib/utils'

/**
 * @file API Endpoint - Get Menu By Handle
 * @module api/menus/[handle]
 */

/**
 * Retrieve a menu resource by handle.
 *
 * @param req - API request
 * @param req.query - Request query parameters
 * @param req.query.fields - Specify fields to include
 * @param req.query.handle - Handle of menu to retrieve
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
