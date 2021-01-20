import type { IPolicy } from '@flex-development/kustomzcore'
import { axios, createError } from '@flex-development/kustomzcore'
import type { VercelResponse as Res } from '@vercel/node'
import debug from 'debug'
import pick from 'lodash/pick'
import { API_URL } from '../../lib/config'
import type { GetPolicyReq as Req, ResourceWithSEO } from '../../lib/types'

/**
 * @file API Endpoint - Get Policy By Handle
 * @module api/policies/[handle]
 */

export default async ({ query }: Req, res: Res): Promise<Res> => {
  const params = pick(query, ['fields', 'handle'])

  try {
    const policies = await axios<ResourceWithSEO<IPolicy>[]>({
      params,
      url: `${API_URL}/policies`
    })

    if (!policies.length) {
      const data = { errors: { handle: query.handle }, query: params }
      const message = `Policy with handle "${query.handle}" not found`
      const error = createError(message, data, 404)

      debug('api/policies/[handle]')(error)
      return res.status(error.code).json(error)
    }

    return res.json(policies[0])
  } catch (error) {
    debug('api/policies/[handle]')(error)
    return res.status(error.code).json(error)
  }
}
