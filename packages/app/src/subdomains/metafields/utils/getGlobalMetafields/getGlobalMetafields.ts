import { objectFromArray } from '@app/subdomains/app/utils/objectFromArray'
import {
  FindMetafieldParams,
  MetafieldService
} from '@app/subdomains/metafields/services'
import { PartialOr } from '@flex-development/json'
import { IMetafield as Data } from '@flex-development/kustomzcore'

/**
 * @file Implementation - getGlobalMetafields
 * @module subdomains/metafields/utils/getGlobalMetafields/impl
 */

/**
 * Returns an object with shop resource metafields. All metafields will be from
 * the `globals` namespace.
 *
 * @param params - Request query parameters
 * @param params.created_at_max - Show metafields created before date
 * @param params.created_at_min - Show metafields created after date
 * @param params.fields - Comma-separated list of fields to show
 * @param params.key - Show metafields with given key
 * @param params.limit - Maximum number of results to show. Defaults to `250`
 * @param params.updated_at_max - Show metafields updated before date
 * @param params.updated_at_min - Show metafields updated after date
 * @param params.value_type - Show metafields with a value_type of 'integer'
 * or 'string'
 */
const getGlobalMetafields = async (
  params: Omit<FindMetafieldParams, 'namespace'> = {}
): Promise<Record<string, PartialOr<Data>>> => {
  // Initialize services
  const Metafields = new MetafieldService()

  // Get global metafields
  const metafields = await Metafields.shop({ ...params, namespace: 'globals' })

  // Return object with metafields
  return objectFromArray(metafields || [], 'key')
}

export default getGlobalMetafields
