import { IQueryExecutor, QEData, Query } from '@app/subdomains/app'
import { ICollectionListing, IProductListing } from 'shopify-api-node'

/**
 * @file Subdomain Interfaces - Product Service
 * @module subdomains/sales/interfaces/IProductService
 */

export interface IProductService extends IQueryExecutor<IProductListing> {
  find(query?: ProductQuery): Promise<QEData<IProductListing>>
  findByCollection(
    collection_id: ICollectionListing['collection_id'],
    query?: ProductQuery
  ): Promise<QEData<IProductListing>>
  get(id: IProductListing['product_id']): Promise<IProductListing>
  getByHandle(handle: IProductListing['handle']): Promise<IProductListing>
}

/**
 * Object representing a response from the Shopify REST API `product_listings`
 * endpoint.
 */
export type ListProductsResponse = { product_listings: Array<IProductListing> }

/**
 * Object representing a product listing query.
 */
export type ProductQuery = Query<IProductListing>
