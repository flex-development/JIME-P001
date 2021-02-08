import type { VercelResponse as Res } from '@vercel/node'
import { initPathLogger } from '../../lib/middleware'
import Service from '../../lib/services/PolicyService'
import type { FindPoliciesReq as Req } from '../../lib/types'
import { formatError } from '../../lib/utils'

/**
 * @file API Endpoint - Find Policies
 * @module api/policies
 */

export default async (req: Req, res: Res): Promise<Res> => {
  // ! Attach `logger` and `path` to API request object
  initPathLogger(req)

  // Convert query into search options object
  const options = Service.searchOptions(req.query)

  try {
    return res.json(await Service.find(req.query.text, options))
  } catch (err) {
    const error = formatError(err, { query: req.query })

    req.logger.error({ error })
    return res.status(error.code).json(error)
  }
}
