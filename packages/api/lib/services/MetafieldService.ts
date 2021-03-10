import type { PartialOr } from '@flex-development/json'
import type {
  GetGlobalMetafieldsQuery as FindMetafieldParams,
  GetGlobalMetafieldsResJSON,
  IMetafield,
  OrNever,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore'
import axiosShopify from '@flex-development/kustomzcore/config/axios-shopify'
import ofa from '@flex-development/kustomzcore/utils/objectFromArray'
import type { AxiosRequestConfig } from 'axios'
import type { ShopifyResourceWithMetafield } from '../types'

/**
 * @file Implementation - MetafieldService
 * @module services/MetafieldService
 */

/**
 * Handles interactions with Shopify metafields.
 *
 * @class
 */
class MetafieldService {
  /**
   * Returns an array of metafields.
   *
   * If {@param type} is undefined, shop-level metafields will be returned.
   *
   * @async
   * @param {ShopifyResourceWithMetafield} [type] - Type of Shopify resource
   * @param {number} [id] - ID of Shopify resources to get metafields for
   * @param {FindMetafieldParams} [params] - Query parameters
   * @param {string} [params.created_at_max] - Metafields created before date
   * @param {string} [params.created_at_min] - Metafields created after date
   * @param {string} [params.fields] - Comma-separated list of fields to show
   * @param {string} [params.key] - Show metafields with given key
   * @param {number} [params.limit] - Max number of results. Defaults to `250`
   * @param {string} [params.namespace] - Show metafields with given namespace
   * @param {string} [params.updated_at_max] - Metafields updated before date
   * @param {string} [params.updated_at_min] - Metafields updated after date
   * @param {string} [params.value_type] - Show metafields with a value_type of
   * 'integer' or 'string'
   * @return {Promise<PartialOr<IMetafield>[]>} Promise containing metafields
   * @throws {FeathersErrorJSON}
   */
  static async fetch(
    type?: ShopifyResourceWithMetafield,
    id?: number,
    params: FindMetafieldParams = {}
  ): OrNever<Promise<PartialOr<IMetafield>[]>> {
    const config = MetafieldService.getRequestConfig(type, id, params)
    return (await axiosShopify<SAR.Metafields>(config)).metafields
  }

  /**
   * Returns the configuration object needed to request Shopify metafields.
   *
   * If {@param type} is undefined, the configuration to request shop-level
   * metafields will be returned.
   *
   * @param {ShopifyResourceWithMetafield} [type] - Type of Shopify resource
   * @param {number} [id] - ID of Shopify resources to get metafields for
   * @param {FindMetafieldParams} [params] - Query parameters
   * @param {string} [params.created_at_max] - Metafields created before date
   * @param {string} [params.created_at_min] - Metafields created after date
   * @param {string} [params.fields] - Comma-separated list of fields to show
   * @param {string} [params.key] - Show metafields with given key
   * @param {number} [params.limit] - Max number of results. Defaults to `250`
   * @param {string} [params.namespace] - Show metafields with given namespace
   * @param {string} [params.updated_at_max] - Metafields updated before date
   * @param {string} [params.updated_at_min] - Metafields updated after date
   * @param {string} [params.value_type] - Show metafields with a value_type of
   * 'integer' or 'string'
   * @return {AxiosRequestConfig} Axios config object
   */
  static getRequestConfig(
    type?: ShopifyResourceWithMetafield,
    id?: number,
    params: FindMetafieldParams = {}
  ): AxiosRequestConfig {
    return {
      method: 'get',
      params: { ...params, limit: params.limit || 250 },
      url: !type ? 'metafields' : `${type}/${id}/metafields`
    }
  }

  /**
   * Returns an object with shop-level metafields.
   * All metafields will be from the `globals` namespace.
   *
   * If defined, {@param params.namespace} will be overwritten.
   *
   * @param {FindMetafieldParams} [params] - Query parameters
   * @param {string} [params.created_at_max] - Metafields created before date
   * @param {string} [params.created_at_min] - Metafields created after date
   * @param {string} [params.fields] - Comma-separated list of fields to show
   * @param {string} [params.key] - Show metafields with given key
   * @param {number} [params.limit] - Max number of results. Defaults to `250`
   * @param {string} [params.updated_at_max] - Metafields updated before date
   * @param {string} [params.updated_at_min] - Metafields updated after date
   * @param {string} [params.value_type] - Show metafields with a value_type of
   * 'integer' or 'string'
   * @return {Promise<Record<string, PartialOr<IMetafield>>>} - Promise
   * containing object with shop-level metafields
   */
  static async globals(
    params: Omit<FindMetafieldParams, 'namespace'> = {}
  ): OrNever<Promise<GetGlobalMetafieldsResJSON>> {
    const $params = { ...params, namespace: 'globals' }
    const globals = await MetafieldService.fetch(undefined, undefined, $params)

    return ofa<PartialOr<IMetafield>>(globals || [], 'key')
  }
}

export default MetafieldService
