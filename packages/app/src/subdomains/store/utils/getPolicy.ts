import kapi from '@app/config/axios-kapi'
import type { GetPolicyQuery, GetPolicyResJSON } from '@kapi/types'
import type { NotFound } from '@subdomains/app/types'
import debug from 'debug'

/**
 * @file Implementation - getPolicy
 * @module subdomains/store/utils/getPolicy
 */

/**
 * Retrieve a policy by handle.
 * Returns `{ notFound: true }` if the policy isn't found.
 *
 * @async
 * @param query - Query parameters
 * @param query.handle - Handle of policy to retrieve
 * @param query.fields - Comma-separated list of fields to show
 */
const getPolicy = async (
  query: GetPolicyQuery
): Promise<GetPolicyResJSON | NotFound> => {
  const { handle, ...params } = query

  try {
    return await kapi<GetPolicyResJSON>({
      method: 'get',
      params,
      url: `/policies/${handle}`
    })
  } catch (error) {
    debug('subdomains/cms/utils/getPolicy')(error)
    return { notFound: true }
  }
}

export default getPolicy
