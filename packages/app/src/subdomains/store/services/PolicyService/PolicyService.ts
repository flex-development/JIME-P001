import { axiosShopify } from '@app/config/axios'
import { PartialOr } from '@flex-development/json'
import {
  createError,
  IPolicy,
  Logger,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore'
import { isEmpty, isString, pick } from 'lodash'
import { FindPolicyParams, IPolicyService } from './IPolicyService'

/**
 * @file Implementation - PolicyService
 * @module subdomains/store/services/PolicyService/impl
 */

export default class PolicyService implements IPolicyService {
  Policies: IPolicyService['Policies']

  /**
   * Creates a new `PolicyService` instance.
   */
  constructor() {
    let Policies = {} as IPolicyService['Policies']

    import('@app/config/shopify').then(mod => (Policies = mod.default.policy))

    this.Policies = Policies
  }

  /**
   * Get all store policies.
   *
   * @async
   * @param params - Query parameterse
   * @param params.fields - Comma-separated list of fields to show
   * @param params.handle - Retrieve pages with a given handle
   * @param params.title - Retrieve pages with a given title
   * @throws {FeathersErrorJSON}n - Show pages updated after date
   * @throws {FeathersErrorJSON}
   */
  async find(params: FindPolicyParams = {}): Promise<PartialOr<IPolicy>[]> {
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
    if (isString(params.fields) && params.fields.length) {
      const fields = params.fields?.trim().split(',')
      policies = policies.map(menu => pick(menu, fields))
    }

    // Handle `handle` query param
    if (isString(params.handle) && params.handle.length) {
      policies = policies.filter(policy => policy.handle === params.handle)
    }

    if (!isEmpty(params.fields)) return policies as PartialOr<IPolicy>[]
    return policies as IPolicy[]
  }

  /**
   * Retrieve a policy by handle. Throws an error if the policy isn't found.
   *
   * @async
   * @param handle - Handle of policy to find
   * @param params - Query parameters
   * @param params.fields - Comma-separated list of fields to show
   * @throws {FeathersErrorJSON}
   */
  async get(
    handle: IPolicy['handle'],
    params?: Pick<FindPolicyParams, 'fields'>
  ): Promise<PartialOr<IPolicy>> {
    const policies = await this.find({ ...params, handle })

    if (!policies.length) {
      const error_data = { handle, params }
      const error_message = `Policy with handle "${handle}" not found`

      const error = createError(error_message, error_data, 404)

      Logger.error({ 'PolicyService.get': error })
      throw error
    }

    return policies[0]
  }
}
