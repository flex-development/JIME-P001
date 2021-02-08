import { axios } from '@flex-development/kustomzcore/dist/axios'
import { API_URL } from '../config/constants'
import type { FindMetafieldParams, GetGlobalMetafieldsResJSON } from '../types'

/**
 * @file Implementation - metafieldsGlobal
 * @module lib/utils/metafieldsGlobal
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
const metafieldsGlobal = async (
  params: Omit<FindMetafieldParams, 'namespace'> = {}
): Promise<GetGlobalMetafieldsResJSON> => {
  return await axios<GetGlobalMetafieldsResJSON>({
    params,
    url: `${API_URL}/metafields/globals`
  })
}

export default metafieldsGlobal
