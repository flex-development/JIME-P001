import type {
  APIQuery,
  IPolicy,
  OrNever,
  TObject as ObjectType
} from '@flex-development/kustomzcore'
import { SEARCH_INDEX_SETTINGS } from '../../config/constants'
import SEO from '../../mixins/SEO'
import ShopifyAPI from '../../mixins/ShopifyAPI'
import type { TObjectEnhanced } from '../../types'
import SearchIndexService from '../SearchIndexService'

/**
 * @file Implementation - Policy Service
 * @module lib/services/PolicyService
 */

export type TObject = ObjectType.Policy

/**
 * Handles interactions with policy resources.
 *
 * @class
 * @extends SearchIndexService
 */
export default class PolicyService extends SearchIndexService<TObject> {
  /**
   * Initializes a new Policy service instance.
   */
  constructor() {
    const { policies } = SEARCH_INDEX_SETTINGS
    super(policies.name, 'handle', PolicyService.getObjects)
  }

  /**
   * Returns an array of Shopify policy objects to populate the search index.
   *
   * @async
   * @return {Promise<TObject[]>} Promise containing initial index objects
   */
  static async getObjects(): OrNever<Promise<TObject[]>> {
    return await ShopifyAPI.policies()
  }

  /**
   * Retrieve a policy by handle.
   *
   * @async
   * @param {string} objectID - Handle of policy to retrieve
   * @param {string} [fields] - Specify fields to include
   * @return {Promise<TObjectEnhanced<TObject>>} Promise containing policy data
   */
  async get(
    objectID: IPolicy['handle'],
    fields?: APIQuery.Policy.Get['fields']
  ): OrNever<Promise<TObjectEnhanced<TObject>>> {
    const data: TObjectEnhanced<TObject> = await super.get(objectID, fields)

    if (SEO.includeSEO(fields)) {
      data.seo = await SEO.policy(data as IPolicy)
    }

    return data
  }
}
