import type { PartialOr } from '@flex-development/json'
import type { IMetafield } from '@flex-development/kustomzcore'
import { axios } from '@flex-development/kustomzcore'
import { API_URL } from '../../config'
import type { FindMetafieldParams } from '../../types'

/**
 * @file Implementation - globalMetafields
 * @module utils/metafields/globalMetafields
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
  return await axios<Record<string, PartialOr<IMetafield>>>({
    params,
    url: `${API_URL}/metafields/globals`
  })
}

export default globalMetafields
