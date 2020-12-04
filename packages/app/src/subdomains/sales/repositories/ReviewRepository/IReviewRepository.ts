import { DataArray } from '@flex-development/json'
import { IReview } from '@flex-development/kustomzcore'
import { IRTDRepository } from '@subdomains/app/models/RTDRepository'
import { IProductListing } from 'shopify-api-node'

/**
 * @file Subdomain Interfaces - Product Review Repository
 * @module subdomains/sales/interfaces/IReviewRepository
 */

export interface IReviewRepository extends IRTDRepository<IReview> {
  findByProductId(
    id: IProductListing['product_id']
  ): Promise<DataArray<IReview>>
}
