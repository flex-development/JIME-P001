import {
  DataArray,
  DataArrayQueryParams,
  IArrayQueryExecutor
} from '@flex-development/json'
import { ICollectionListing } from '@flex-development/kustomzcore'
import { NotFound } from '@subdomains/app'

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
  ): Promise<ICollectionListing | NotFound>
}
