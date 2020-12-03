import { ServerSide404 } from '@app/subdomains/app'
import {
  DataArray,
  DataArrayQueryParams,
  IArrayQueryExecutor
} from '@flex-development/json'
import { ICollectionListing } from 'shopify-api-node'

/**
 * @file Subdomain Interface - Collection Listings Service
 * @module subdomains/sales/interfaces/ICollectionService
 */

export interface ICollectionService
  extends IArrayQueryExecutor<ICollectionListing> {
  find(query?: DataArrayQueryParams): Promise<DataArray<ICollectionListing>>
  get(id: ICollectionListing['collection_id']): Promise<ICollectionListing>
  getByHandle(
    handle: ICollectionListing['handle']
  ): Promise<ICollectionListing | ServerSide404>
}

/**
 * Object representing a response from the Shopify REST API
 * `collection_listings` endpoint.
 */
export type ListCollectionsResponse = {
  collection_listings: Array<ICollectionListing>
}
