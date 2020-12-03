import { ICustomerService } from '@app/subdomains/customers/services'
import { IReviewRepository } from '@app/subdomains/sales/repositories'
import { CreateReviewRequest, IReview } from '@flex-development/kustomzcore'
import { IProductService } from '../ProductService'

/**
 * @file Subdomain Interfaces - Product Review Service
 * @module subdomains/sales/interfaces/IReviewService
 */

export interface IReviewService extends IReviewRepository {
  customers: ICustomerService
  products: IProductService

  create(data: CreateReviewRequest): Promise<IReview>
}
