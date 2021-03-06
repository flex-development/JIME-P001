import type { PartialOr } from '@flex-development/json'
import type {
  FindMetafieldParams,
  IMetafield,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore'
import axiosShopify from '../config/axios-shopify'

/**
 * @file Implementation - metafieldsShop
 * @module lib/utils/metafieldsShop
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
const metafieldsShop = async (
  params: FindMetafieldParams = {}
): Promise<PartialOr<IMetafield>[]> => {
  // Build request config
  const config: Parameters<typeof axiosShopify>[0] = {
    method: 'get',
    params,
    url: 'metafields'
  }

  // Get shop metafields
  return (await axiosShopify<SAR.Metafields>(config)).metafields
}

export default metafieldsShop
