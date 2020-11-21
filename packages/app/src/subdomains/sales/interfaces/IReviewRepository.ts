import { IRTDRepository, Query } from '@app/subdomains/app/interfaces'
import { IReview } from '@flex-development/types'
import { IProductListing } from 'shopify-api-node'

/**
 * @file Subdomain Interfaces - Product Review Repository
 * @module subdomains/sales/interfaces/IReviewRepository
 */

export interface IReviewRepository extends IRTDRepository<IReview> {
  findByProductId(id: IProductListing['product_id']): Promise<Array<IReview>>
}

/**
 * Object representing a product review query.
 */
export type ProductReviewQuery = Query<IReview>
