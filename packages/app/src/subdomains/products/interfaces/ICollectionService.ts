import { IQueryExecutor, QEData, Query } from '@app/subdomains/app'
import { CollectionResource } from '@flex-development/kustomzdesign/types'
import ShopifyBuy from 'shopify-buy'

/**
 * @file Subdomain Interfaces - Collection Service
 * @module subdomains/products/interfaces/ICollectionService
 */

export interface ICollectionService extends IQueryExecutor<CollectionResource> {
  shopify: ShopifyBuy.CollectionResource

  find(query?: CollectionQuery): Promise<QEData<CollectionResource>>
  get(id: CollectionResource['id']): Promise<CollectionResource>
  getByHandle(handle: CollectionResource['handle']): Promise<CollectionResource>
}

/**
 * Object representing a collection query.
 */
export type CollectionQuery = Query<CollectionResource>
