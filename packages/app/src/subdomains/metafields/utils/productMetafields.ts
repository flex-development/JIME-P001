import { axiosShopify } from '@app/config/axios'
import { PartialOr } from '@flex-development/json/utils/types'
import Logger from '@flex-development/kustomzcore/config/logger'
import {
  IMetafield,
  IProductListing,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore/types/shopify'
import { FindMetafieldParams } from '@subdomains/metafields/utils/types'

/**
 * @file Implementation - productMetafields
 * @module subdomains/metafields/utils/productMetafields
 */

/**
 * Returns an array of metafields for a product resource.
 *
 * @async
 * @param id - ID of product to get metafields for
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
const productMetafields = async (
  id: IProductListing['product_id'],
  params: FindMetafieldParams = {}
): Promise<PartialOr<IMetafield>[]> => {
  // Build request config
  const config: Parameters<typeof axiosShopify>[0] = {
    method: 'get',
    params,
    url: `products/${id}/metafields`
  }

  // Initialize metafields array
  let metafields: PartialOr<IMetafield>[] = []

  // Get product metafields
  try {
    metafields = (await axiosShopify<SAR.Metafields>(config)).metafields
  } catch (error) {
    Logger.error({ 'MetafieldService.product': error })
    throw error
  }

  return metafields
}

export default productMetafields
