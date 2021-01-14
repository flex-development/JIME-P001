import { PartialOr } from '@flex-development/json/utils/types'
import { IMetafield } from '@flex-development/kustomzcore/types/shopify'
import objectFromArray from '@subdomains/app/utils/objectFromArray'
import shopMetafields from './shopMetafields'
import { FindMetafieldParams } from './types'

/**
 * @file Implementation - globalMetafields
 * @module subdomains/metafields/utils/globalMetafields
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
const globalMetafields = async (
  params: Omit<FindMetafieldParams, 'namespace'> = {}
): Promise<Record<string, PartialOr<IMetafield>>> => {
  // Get global metafields
  const fields = await shopMetafields({ ...params, namespace: 'globals' })

  // Return object with metafields
  return objectFromArray(fields || [], 'key')
}

export default globalMetafields
