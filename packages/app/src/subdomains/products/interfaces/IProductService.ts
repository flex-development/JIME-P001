import { ProductResource } from '@flex-development/kustomzdesign/types'
import ShopifyBuy from 'shopify-buy'

/**
 * @file Subdomain Interfaces - Product Service
 * @module subdomains/products/interfaces/IProductService
 */

export interface IProductService {
  shopify: ShopifyBuy.ProductResource

  find($limit?: number): Promise<Array<ProductResource>>
  get(id: ProductResource['id']): Promise<ProductResource>
  getByHandle(handle: ProductResource['handle']): Promise<ProductResource>
}
