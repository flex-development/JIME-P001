import { axiosShopify } from '@app/config/axios'
import { PartialOr } from '@flex-development/json'
import {
  ICollectionListing,
  IMetafield,
  IPage,
  IProductListing,
  Logger,
  ShopifyAPIResponses as SAR
} from '@flex-development/kustomzcore'
import { isEmpty } from 'lodash'
import { FindMetafieldParams, IMetafieldService } from './IMetafieldService'

/**
 * @file Implementation - MetafieldService
 * @module subdomains/store/services/MetafieldService/impl
 */

export default class MetafieldService implements IMetafieldService {
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
  async collection(
    id: ICollectionListing['collection_id'],
    params: FindMetafieldParams = {}
  ): Promise<PartialOr<IMetafield>[]> {
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
      Logger.error({ 'MetafieldService.collection': error })
      throw error
    }

    if (!isEmpty(params.fields)) return metafields as Partial<IMetafield>[]
    return metafields as IMetafield[]
  }

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
  async page(
    id: IPage['id'],
    params: FindMetafieldParams = {}
  ): Promise<PartialOr<IMetafield>[]> {
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
      Logger.error({ 'MetafieldService.page': error })
      throw error
    }

    if (!isEmpty(params.fields)) return metafields as Partial<IMetafield>[]
    return metafields as IMetafield[]
  }

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
  async product(
    id: IProductListing['product_id'],
    params: FindMetafieldParams = {}
  ): Promise<PartialOr<IMetafield>[]> {
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

    if (!isEmpty(params.fields)) return metafields as Partial<IMetafield>[]
    return metafields as IMetafield[]
  }

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
  async shop(
    params: FindMetafieldParams = {}
  ): Promise<PartialOr<IMetafield>[]> {
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
      Logger.error({ 'MetafieldService.shop': error })
      throw error
    }

    if (!isEmpty(params.fields)) return metafields as Partial<IMetafield>[]
    return metafields as IMetafield[]
  }
}
