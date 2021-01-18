import type { PartialOr } from '@flex-development/json'
import type {
  IMetafield,
  IPage,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore'
import debug from 'debug'
import { axiosShopify } from '../../config'
import type { FindMetafieldParams } from '../../types'

/**
 * @file Implementation - pageMetafields
 * @module utils/metafields/pageMetafields
 */

/**
 * Returns an array of metafields for a page resource.
 *
 * @async
 * @param id - ID of page to get metafields for
 * @param params - Query parameters
 * @param params.created_at_max - Show metafields created before date
 * @param params.created_at_min - Show metafields created after date
 * @param params.fields - Comma-separated list of fields to show
 * @param params.key - Show metafields with given key
 * @param params.limit - Maximum number of results to show. Defaults to `250`
 * @param params.namespace - Show metafields with given namespace
 * @param params.updated_at_max - Show metafields updated before date
 * @param params.updated_at_min - Show metafields updated after date
 * @param params.value_type - Show metafields with a value_type of 'integer'
 * or 'string'
 */
const pageMetafields = async (
  id: IPage['id'],
  params: FindMetafieldParams = {}
): Promise<PartialOr<IMetafield>[]> => {
  // Build request config
  const config: Parameters<typeof axiosShopify>[0] = {
    method: 'get',
    params,
    url: `pages/${id}/metafields`
  }

  // Initialize metafields array
  let metafields: PartialOr<IMetafield>[] = []

  // Get page metafields
  try {
    metafields = (await axiosShopify<SAR.Metafields>(config)).metafields
  } catch (error) {
    debug('utils/metafields/pageMetafields')(error)
    throw error
  }

  return metafields
}

export default pageMetafields
