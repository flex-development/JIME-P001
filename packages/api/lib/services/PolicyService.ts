import type { AnyObject } from '@flex-development/json'
import { createError, IPolicy } from '@flex-development/kustomzcore'
import merge from 'lodash/merge'
import { stripHtml } from 'string-strip-html'
import { INDEX_SETTINGS, ShopifyAPI } from '../config'
import type {
  FindPoliciesQuery as Query,
  GetPolicyResJSON as TObject,
  SearchIndexName,
  SearchOptions,
  SEOData
} from '../types'
import { globalSEO, search, shopifySearchOptions, toJSX } from '../utils'

/**
 * @file Implementation - Policy Service
 * @module lib/services/PolicyService
 */

export default class PolicyService {
  static api = ShopifyAPI.policy
  static index_name: SearchIndexName = INDEX_SETTINGS.policies.name

  /**
   * Executes a policy resource search.
   *
   * @async
   * @param query - Search index query text
   * @param options - Search index options
   */
  static async find(
    query = '',
    options: SearchOptions = {}
  ): Promise<TObject[]> {
    const objects = await PolicyService.indexObjects()
    return search(PolicyService.index_name, objects, query, options)
  }

  /**
   * Retrieve a policy by handle.
   *
   * @async
   * @param handle - Handle of policy to retrieve
   * @param fields - Specify fields to include for each object
   * @throws {FeathersErrorJSON}
   */
  static async get(
    handle: NonNullable<Query['handle']>,
    fields?: Query['fields']
  ): Promise<TObject> {
    // Get search index options
    const options = PolicyService.searchOptions({ fields, handle })

    // Execute search
    const results = await PolicyService.find('', options)

    // Throw error if resource isn't found
    if (!results.length) {
      const data = { errors: { handle }, fields }
      const message = `Policy with handle "${handle}" not found`

      throw createError(message, data, 404)
    }

    return results[0]
  }

  /**
   * Returns an array of objects to populate the search index.
   *
   * @async
   */
  static async indexObjects(): Promise<TObject[]> {
    // Fetch policy data from Shopify
    const data = await PolicyService.api.list()

    // Get objects to populate search index
    const objects: TObject[] | Promise<TObject>[] = data.map(async obj => {
      // Keep objectID consistent with policy ID
      const $obj: AnyObject = { ...obj, objectID: (obj as IPolicy).handle }

      // Parse MDX body content
      $obj.body = await toJSX($obj.body)

      // Get SEO data for each policy
      $obj.seo = await PolicyService.seo($obj as IPolicy)

      return $obj as TObject
    })

    return await Promise.all(objects)
  }

  /**
   * Converts a policy query object into an Algolia search options object.
   *
   * @see https://www.algolia.com/doc/api-reference/api-parameters/filters/
   *
   * @param query - Policy query from API request
   * @param query.fields - Comma-separated list of fields to include
   * @param query.handle - Find policy by handle
   * @param query.id - Find policy by ID
   */
  static searchOptions(query: Query = {}): SearchOptions {
    return shopifySearchOptions(query)
  }

  /**
   * Returns an object with SEO data for a policy resource.
   *
   * @async
   * @param policy - Policy resource data
   */
  static async seo(policy: IPolicy | Promise<IPolicy>): Promise<SEOData> {
    const { body, title } = await policy

    const description = stripHtml(body).result
    const globals = await globalSEO()

    return merge(globals, { description, title })
  }
}
