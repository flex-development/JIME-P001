import { axiosShopify } from '@app/config/axios'
import { PartialOr } from '@flex-development/json/utils/types'
import {
  ICollectionListing,
  IMetafield,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore/types/shopify'
import { FindMetafieldParams } from '@subdomains/metafields/utils/types'
import debug from 'debug'

/**
 * @file Implementation - collectionMetafields
 * @module subdomains/metafields/utils/collectionMetafields
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

  // Initialize metafields array
  let metafields: PartialOr<IMetafield>[] = []

  // Get collection metafields
  try {
    metafields = (await axiosShopify<SAR.Metafields>(config)).metafields
  } catch (error) {
    debug('subdomains/metafields/utils/collectionMetafields')(error)
    throw error
  }

  return metafields
}

export default collectionMetafields
