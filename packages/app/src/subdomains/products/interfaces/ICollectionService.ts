import { IQueryExecutor, QEData, Query } from '@app/subdomains/app'
import { ICollectionListing } from 'shopify-api-node'

/**
 * @file Subdomain Interfaces - Collection Service
 * @module subdomains/products/interfaces/ICollectionService
 */

export interface ICollectionService extends IQueryExecutor<ICollectionListing> {
  find(query?: CollectionQuery): Promise<QEData<ICollectionListing>>
  get(id: ICollectionListing['collection_id']): Promise<ICollectionListing>
  getByHandle(handle: ICollectionListing['handle']): Promise<ICollectionListing>
}

/**
 * Object representing a collection query.
 */
export type CollectionQuery = Query<ICollectionListing>

/**
 * Object representing a response from the Shopify REST API
 * `collection_listings` endpoint.
 */
export type ListCollectionsResponse = {
  collection_listings: Array<ICollectionListing>
}
