import { CollectionResource } from '@flex-development/kustomzdesign/types'
import ShopifyBuy from 'shopify-buy'

/**
 * @file Subdomain Interfaces - Collection Service
 * @module subdomains/products/interfaces/ICollectionService
 */

export interface ICollectionService {
  shopify: ShopifyBuy.CollectionResource

  find($limit?: number): Promise<Array<CollectionResource>>
  get(id: CollectionResource['id']): Promise<CollectionResource>
  getByHandle(handle: CollectionResource['handle']): Promise<CollectionResource>
}
