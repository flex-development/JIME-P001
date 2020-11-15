import { IQueryExecutor, OneOrMany, QEData, Query } from '@app/subdomains/app'
import { ProductResource } from '@flex-development/kustomzdesign/types'
import ShopifyBuy from 'shopify-buy'

/**
 * @file Subdomain Interfaces - Product Service
 * @module subdomains/products/interfaces/IProductService
 */

export interface IProductService extends IQueryExecutor<ProductResource> {
  shopify: ShopifyBuy.ProductResource

  find(query?: ProductQuery): Promise<QEData<ProductResource>>
  get(id: ProductResource['id']): Promise<ProductResource>
  getByHandle(handle: ProductResource['handle']): Promise<ProductResource>
}

/**
 * Object representing a product query.
 */
export type ProductQuery = Query<ProductResource>

/**
 * Object representing product search parameters.
 */
export type ProductSearchParams = {
  description?: OneOrMany<ProductResource['description']>
  handle?: OneOrMany<ProductResource['handle']>
  id?: OneOrMany<ProductResource['id']>
  title?: OneOrMany<ProductResource['title']>
}
