import { PartialOr } from '@flex-development/json/utils/types'
import { IPolicy } from '@flex-development/kustomzcore/types'
import { createError } from '@flex-development/kustomzcore/utils/createError'
import { NotFound } from '@subdomains/app/utils/types'
import { FindPolicyParams } from '@subdomains/store/utils/types'
import debug from 'debug'
import pick from 'lodash/pick'
import findPolicies from './findPolicies'

/**
 * @file Implementation - getPolicyByHandle
 * @module subdomains/store/utils/getPolicyByHandle
 */

/**
 * Find a policy by handle.
 * Returns `{ notFound: true }` if the collection isn't found.
 *
 * @async
 * @param handle - Handle of policy to find
 * @param params - Query parameters
 * @param params.fields - Comma-separated list of fields to show
 */
const getPolicyByHandle = async (
  handle: IPolicy['handle'],
  params?: Pick<FindPolicyParams, 'fields'>
): Promise<PartialOr<IPolicy> | NotFound> => {
  const policies = await findPolicies({ ...pick(params, ['fields']), handle })

  if (!policies.length) {
    const data = { errors: { handle } }
    const message = `Policy with handle "${handle}" not found`
    const error = createError(message, data, 404)

    debug('subdomains/store/utils/getPolicyByHandle')(error)
    return { notFound: true }
  }

  return policies[0]
}

export default getPolicyByHandle
