import type {
  FindSearchIndexResourceQuery,
  GetPolicyResJSON as TObject,
  IPolicy,
  OrNever
} from '@flex-development/kustomzcore'
import { SEARCH_INDEX_SETTINGS } from '../config/constants'
import ShopifyAPI from '../config/shopify-api'
import SearchIndexService from './SearchIndexService'
import SEOService from './SEOService'

/**
 * @file Implementation - Policy Service
 * @module services/PolicyService
 */

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
   * @throws {FeathersErrorJSON}
   */
  static async getObjects(): OrNever<Promise<TObject[]>> {
    // Fetch page data from Shopify
    return await ShopifyAPI.policy.list()
  }

  /**
   * Retrieve a policy by handle.
   *
   * @async
   * @param {string} objectID - Handle of policy to retrieve
   * @param {string} [fields] - Specify fields to include
   * @return {Promise<TObject>} Promise containing policy data
   * @throws {FeathersErrorJSON}
   */
  async get(
    objectID: IPolicy['handle'],
    fields?: FindSearchIndexResourceQuery['fields']
  ): OrNever<Promise<TObject>> {
    const data = await super.get(objectID, fields)

    if (SEOService.includeSEO(fields)) {
      data.seo = await SEOService.policy(data as IPolicy)
    }

    return data
  }
}
