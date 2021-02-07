import type { PartialOr } from '@flex-development/json'
import type {
  ICollectionListing,
  IMetafield,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore'
import axiosShopify from '../../config/axios-shopify'
import type { FindMetafieldParams } from '../../types'

/**
 * @file Implementation - collectionMetafields
 * @module utils/metafields/collectionMetafields
 */

/**
 * Returns an array of metafields for a collection resource.
 *
 * @async
 * @param id - ID of collection to get metafields for
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
const collectionMetafields = async (
  id: ICollectionListing['collection_id'],
  params: FindMetafieldParams = {}
): Promise<PartialOr<IMetafield>[]> => {
  // Build request config
  const config: Parameters<typeof axiosShopify>[0] = {
    method: 'get',
    params,
    url: `collections/${id}/metafields`
  }

  return (await axiosShopify<SAR.Metafields>(config)).metafields
}

export default collectionMetafields
