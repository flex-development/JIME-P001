import { axiosShopify } from '@app/config/axios'
import { PartialOr } from '@flex-development/json/utils/types'
import Logger from '@flex-development/kustomzcore/config/logger'
import {
  IPolicy,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore/types'
import { FindPolicyParams } from '@subdomains/store/utils/types'
import pick from 'lodash/pick'

/**
 * @file Implementation - findPolicies
 * @module subdomains/store/utils/findPolicies
 */

/**
 * Returns an array of store policies.
 *
 * @async
 * @param params - Query parameters
 * @param params.fields - Comma-separated list of fields to show
 * @param params.handle - Retrieve pages with a given handle
 * @param params.title - Retrieve pages with a given title
 * @throws {FeathersErrorJSON}
 */
const findPolicies = async (
  params: FindPolicyParams = {}
): Promise<PartialOr<IPolicy>[]> => {
  // Build request config
  const config: Parameters<typeof axiosShopify>[0] = {
    method: 'get',
    params,
    url: 'policies'
  }

  // Initialize polciies array
  let policies: PartialOr<IPolicy>[] = []

  // Populate policies array
  try {
    policies = (await axiosShopify<SAR.Policies>(config)).policies
  } catch (err) {
    const error = (err.message, { name: err.name, params })

    Logger.error({ 'PolicyService.find': error })
    throw error
  }

  // Handle `fields` query param
  if (typeof params.fields === 'string' && params.fields.length) {
    const fields = params.fields?.trim().split(',')
    policies = policies.map(menu => pick(menu, fields))
  }

  // Handle `handle` query param
  if (typeof params.handle === 'string' && params.handle.length) {
    policies = policies.filter(policy => policy.handle === params.handle)
  }

  return policies
}

export default findPolicies
