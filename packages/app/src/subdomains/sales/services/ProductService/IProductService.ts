import { ServerSide404 } from '@app/subdomains/app'
import {
  DataArray,
  DataArrayQueryParams,
  IArrayQueryExecutor
} from '@flex-development/json'
import { ICollectionListing, IProductListing } from 'shopify-api-node'

/**
 * @file Subdomain Interface - Product Listings Service
 * @module subdomains/sales/interfaces/IProductService
 */

export interface IProductService extends IArrayQueryExecutor<IProductListing> {
  find(query?: DataArrayQueryParams): Promise<DataArray<IProductListing>>
  findByCollection(
    collection_id: ICollectionListing['collection_id'],
    query?: DataArrayQueryParams
  ): Promise<DataArray<IProductListing>>
  get(id: IProductListing['product_id']): Promise<IProductListing>
  getByHandle(
    handle: IProductListing['handle']
  ): Promise<IProductListing | ServerSide404>
  getFromCollection(
    collection_id: ICollectionListing['collection_id'],
    handle: IProductListing['handle']
  ): Promise<IProductListing>
}

/**
 * Object representing a response from the Shopify REST API `product_listings`
 * endpoint.
 */
export type ListProductsResponse = {
  product_listings: Array<IProductListing>
}
