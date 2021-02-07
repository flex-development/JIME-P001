import { axios, createError } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import pick from 'lodash/pick'
import { API_URL } from '../../lib/config'
import { initPathLogger } from '../../lib/middleware'
import type { GetPageReq as Req, GetPageResJSON } from '../../lib/types'

/**
 * @file API Endpoint - Get Page By Handle
 * @module api/pages/[handle]
 */

export default async (req: Req, res: Res): Promise<Res> => {
  // ! Attach `logger` and `path` to API request object
  initPathLogger(req)

  // Get request query parameters
  const params = pick(req.query, ['fields', 'handle'])

  try {
    const pages = await axios<GetPageResJSON[]>({
      params,
      url: `${API_URL}/pages`
    })

    if (!pages.length) {
      const data = { errors: { handle: params.handle }, query: params }
      const message = `Page with handle "${params.handle}" not found`
      const error = createError(message, data, 404)

      req.logger.error({ error })
      return res.status(error.code).json(error)
    }

    return res.json(pages[0])
  } catch (error) {
    req.logger.error({ error })
    return res.status(error.code).json(error)
  }
}
