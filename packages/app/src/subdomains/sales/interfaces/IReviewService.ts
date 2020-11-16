import { ICustomerService } from '@app/subdomains/customers/interfaces'
import { CreateReviewRequest, IReview } from '@flex-development/types'
import { IProductService } from './IProductService'
import { IReviewRepository } from './IReviewRepository'

/**
 * @file Subdomain Interfaces - Product Review Service
 * @module subdomains/sales/interfaces/IReviewService
 */

export interface IReviewService extends IReviewRepository {
  customers: ICustomerService
  products: IProductService

  create(data: CreateReviewRequest): Promise<IReview>
}
