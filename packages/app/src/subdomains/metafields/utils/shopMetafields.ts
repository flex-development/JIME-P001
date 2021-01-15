import { axiosShopify } from '@app/config/axios'
import { PartialOr } from '@flex-development/json/utils/types'
import {
  IMetafield,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore/types/shopify'
import { FindMetafieldParams } from '@subdomains/metafields/utils/types'
import debug from 'debug'

/**
 * @file Implementation - shopMetafields
 * @module subdomains/metafields/utils/shopMetafields
 */

/**
 * Returns an array of metafields for the shop resource.
 *
 * @async
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
const shopMetafields = async (
  params: FindMetafieldParams = {}
): Promise<PartialOr<IMetafield>[]> => {
  // Build request config
  const config: Parameters<typeof axiosShopify>[0] = {
    method: 'get',
    params,
    url: 'metafields'
  }

  // Initialize metafields array
  let metafields: PartialOr<IMetafield>[] = []

  // Get shop metafields
  try {
    metafields = (await axiosShopify<SAR.Metafields>(config)).metafields
  } catch (error) {
    debug('subdomains/metafields/utils/shopMetafields')(error)
    throw error
  }

  return metafields
}

export default shopMetafields
