import { PartialOr } from '@flex-development/json'
import { IPolicy } from '@flex-development/kustomzcore'
import Shopify from 'shopify-api-node'

/**
 * @file Interface - PolicyService
 * @module subdomains/store/services/PolicyService/interface
 */

export interface IPolicyService {
  Policies: Shopify['policy']

  find(): Promise<PartialOr<IPolicy>[]>
  get(
    handle: IPolicy['handle'],
    params?: Pick<FindPolicyParams, 'fields'>
  ): Promise<PartialOr<IPolicy>>
}

export type FindPolicyParams = {
  /**
   * Show only certain fields, specified by a comma-separated list of field
   * names.
   */
  fields?: string

  /**
   * Retrieve pages with a given handle.
   */
  handle?: IPolicy['handle']

  /**
   * The maximum number of results to show.
   *
   * - (default: 50, maximum: 250)
   *
   * @default 50
   */
  limit?: number

  /**
   * Retrieve pages with a given title.
   */
  title?: IPolicy['title']
}
