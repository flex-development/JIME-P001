import type { IPage } from '@flex-development/kustomzcore'
import { axios, createError } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import debug from 'debug'
import pick from 'lodash/pick'
import { API_URL } from '../../lib/config'
import type { GetPageReq as Req, ResourceWithSEO } from '../../lib/types'

/**
 * @file API Endpoint - Get Page By Handle
 * @module api/pages/[handle]
 */

export default async ({ query }: Req, res: Res): Promise<Res> => {
  const params = pick(query, ['fields', 'handle'])

  try {
    const pages = await axios<ResourceWithSEO<IPage>[]>({
      params,
      url: `${API_URL}/pages`
    })

    if (!pages.length) {
      const data = { errors: { handle: query.handle }, query: params }
      const message = `Page with handle "${query.handle}" not found`
      const error = createError(message, data, 404)

      debug('api/pages/[handle]')(error)
      return res.status(error.code).json(error)
    }

    return res.json(pages[0])
  } catch (error) {
    debug('api/pages/[handle]')(error)
    return res.status(error.code).json(error)
  }
}
